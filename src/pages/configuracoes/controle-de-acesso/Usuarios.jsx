import { useMemo, useState } from "react";
import PageToolbar from "../../../components/PageToolbar";
import DataTable from "../../../components/DataTable";
import Pagination from "../../../components/Pagination";
import TableActions from "../../../components/TableActions";
import Drawer from "../../../components/Drawer";

function UserForm({ initial = {}, onChange }) {
  const [form, setForm] = useState({
    usuario: initial.usuario ?? "",
    nome: initial.nome ?? "",
    cpf: initial.cpf ?? "",
    email: initial.email ?? "",
    senha: "",
    perfil: initial.perfil ?? "Administrador",
    status: (initial.status ?? "Ativo") === "Ativo",
  });

  useMemo(() => { onChange?.(form); }, [form, onChange]);

  const update = (key) => (e) => {
    const value = e?.target?.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [key]: value }));
  };

  return (
    <form>
      <div className="field">
        <label className="label">Usuário</label>
        <input className="input" value={form.usuario} onChange={update("usuario")} data-autofocus />
      </div>

      <div className="field">
        <label className="label">Nome</label>
        <input className="input" value={form.nome} onChange={update("nome")} />
      </div>

      <div className="field">
        <label className="label">CPF</label>
        <input className="input" value={form.cpf} onChange={update("cpf")} placeholder="123.456.789-00" />
      </div>

      <div className="field">
        <label className="label">E-mail</label>
        <input className="input" type="email" value={form.email} onChange={update("email")} />
      </div>

      <div className="field">
        <label className="label">Senha</label>
        <input className="input" type="password" value={form.senha} onChange={update("senha")} />
      </div>

      <div className="field">
        <label className="label">Perfil</label>
        <select className="select" value={form.perfil} onChange={update("perfil")}>
          <option>Administrador</option>
          <option>Suporte</option>
          <option>Supervisor</option>
          <option>Agente</option>
        </select>
      </div>

      <div className="field">
        <label className="label">Status</label>
        <label className="switch">
          <input type="checkbox" checked={form.status} onChange={update("status")} />
          <span className="slider" />
        </label>
      </div>
    </form>
  );
}

export default function Usuarios() {
  const [page, setPage] = useState(1);
  const [openNew, setOpenNew] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editing, setEditing] = useState(null);
  const [payload, setPayload] = useState(null);

  const columns = [
    { key: "perfil", header: "Perfil", width: 180 },
    { key: "nome", header: "Nome", width: 180 },
    {
      key: "status",
      header: "Status",
      width: 120,
      render: (row) => (
        <span className="badge-dot">
          <span className="dot" style={{ background: row.status === "Ativo" ? "#16a34a" : "#dc2626" }} />
          {row.status}
        </span>
      ),
    },
  ];

  const data = [
    { id: 1, usuario: "ftiago", perfil: "Administrador", nome: "Francisco Tiago", cpf: "123.456.789-00", email: "francisco@empresa.com", status: "Ativo" },
    { id: 2, usuario: "jsantiago", perfil: "Suporte", nome: "Junior Santiago", cpf: "987.654.321-00", email: "junior@empresa.com", status: "Inativo" },
  ];

  const actions = (row) => (
    <TableActions
      onInfo={() => console.log("detalhes", row)}
      onEdit={() => { setEditing(row); setOpenEdit(true); }}
      onKey={() => console.log("permissões/chave", row)}
      onDelete={() => console.log("excluir", row)}
    />
  );

  function handleSearch(value) {
    console.log("buscar:", value);
  }
  function abrirNovo() {
    setEditing(null);
    setOpenNew(true);
  }
  function salvarNovo() {
    console.log("salvar novo:", payload);
    setOpenNew(false);
  }
  function salvarEdicao() {
    console.log("salvar edição de:", editing?.id, payload);
    setOpenEdit(false);
  }

  return (
    <div className="page">
      <div className="page-titlebar">
        <PageToolbar
          onSearch={handleSearch}
          searchPlaceholder="Pesquisar nome"
          buttons={[{ label: "Novo Usuário", onClick: abrirNovo }]}
        />
      </div>

      <DataTable className="usuarios-table" columns={columns} data={data} actions={actions} />
      <Pagination page={page} pageSize={5} total={data.length} onChange={setPage} />

      {/* Drawer - Novo Usuário */}
      <Drawer
        open={openNew}
        onClose={() => setOpenNew(false)}
        title="Cadastrar Usuário"
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setOpenNew(false)}>Cancelar</button>
            <button className="btn btn-primary" onClick={salvarNovo}>Salvar</button>
          </>
        }
      >
        <UserForm initial={{}} onChange={setPayload} />
      </Drawer>

      {/* Drawer - Editar Usuário (mesma UI, preenchida) */}
      <Drawer
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        title="Editar Usuário"
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setOpenEdit(false)}>Cancelar</button>
            <button className="btn btn-primary" onClick={salvarEdicao}>Salvar</button>
          </>
        }
      >
        <UserForm initial={editing || {}} onChange={setPayload} />
      </Drawer>
    </div>
  );
}
