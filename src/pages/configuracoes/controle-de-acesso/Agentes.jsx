import { useMemo, useState } from "react";
import PageToolbar from "../../../components/PageToolbar";
import DataTable from "../../../components/DataTable";
import Pagination from "../../../components/Pagination";
import TableActions from "../../../components/TableActions";
import Drawer from "../../../components/Drawer";

import {
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowRight,
  MdKeyboardArrowLeft,
  MdKeyboardDoubleArrowLeft
} from "react-icons/md";

function NovoAgenteForm({ initial = {}, onChange }) {
  const [form, setForm] = useState({
    nome: initial.nome ?? "",
    matriculaAgente: initial.matriculaAgente ?? "",
    matricula: initial.matricula ?? "",
    cpf: initial.cpf ?? "",
    senha: "",
    usuario: initial.usuario ?? "",
    supervisor: initial.supervisor ?? "",
    bloqueioManual: initial.bloqueioManual ?? "Não",
  });

  useMemo(() => { onChange?.(form); }, [form, onChange]);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <form>
      <div className="field">
        <label className="label">Nome</label>
        <input className="input" value={form.nome} onChange={update("nome")} data-autofocus />
      </div>

      <div className="field">
        <label className="label">Matrícula Agente</label>
        <input className="input" value={form.matriculaAgente} onChange={update("matriculaAgente")} />
      </div>

      <div className="field">
        <label className="label">Matrícula</label>
        <input className="input" value={form.matricula} onChange={update("matricula")} />
      </div>

      <div className="field">
        <label className="label">CPF</label>
        <input className="input" value={form.cpf} onChange={update("cpf")} placeholder="123.456.789-00" />
      </div>

      <div className="field">
        <label className="label">Senha</label>
        <input className="input" type="password" value={form.senha} onChange={update("senha")} />
      </div>

      <div className="field">
        <label className="label">Usuário</label>
        <input className="input" value={form.usuario} onChange={update("usuario")} />
      </div>

      <div className="field">
        <label className="label">Supervisor</label>
        <select className="select" value={form.supervisor} onChange={update("supervisor")}>
          <option value="">Selecione</option>
          <option value="Supervisor 1">Supervisor 1</option>
          <option value="Supervisor 2">Supervisor 2</option>
        </select>
      </div>

      <div className="field">
        <label className="label">Bloqueio Manual</label>
        <select className="select" value={form.bloqueioManual} onChange={update("bloqueioManual")}>
          <option>Não</option>
          <option>Sim</option>
        </select>
      </div>
    </form>
  );
}

/* Dual list (transfer) */
function DualList({ initialLeft = [], initialRight = [] }) {
  const [left, setLeft] = useState(initialLeft);     // disponíveis
  const [right, setRight] = useState(initialRight);  // associados
  const [qLeft, setQLeft] = useState("");
  const [qRight, setQRight] = useState("");
  const [selLeft, setSelLeft] = useState(new Set());
  const [selRight, setSelRight] = useState(new Set());

  const fltLeft = left.filter(a => a.toLowerCase().includes(qLeft.toLowerCase()));
  const fltRight = right.filter(a => a.toLowerCase().includes(qRight.toLowerCase()));

  const moveSelected = (from, to, setFrom, setTo, setSel, selectedSet) => {
    const moving = (from).filter(a => selectedSet.has(a));
    if (!moving.length) return;
    setFrom(from.filter(a => !selectedSet.has(a)));
    setTo([...to, ...moving]);
    setSel(new Set());
  };

  const moveAll = (from, to, setFrom, setTo, setSel) => {
    if (!from.length) return;
    setFrom([]);
    setTo([...to, ...from]);
    setSel(new Set());
  };

  return (
    <div className="transfer">
      <div className="transfer-col">
        <div className="transfer-title">Agentes disponíveis</div>
        <div className="transfer-search">
          <input
            className="input"
            placeholder="Buscar agente"
            value={qLeft}
            onChange={(e) => setQLeft(e.target.value)}
          />
        </div>
        <div className="transfer-list">
          {fltLeft.map((a) => (
            <label key={a} className="transfer-item">
              <input
                type="checkbox"
                checked={selLeft.has(a)}
                onChange={(e) => {
                  const n = new Set(selLeft);
                  e.target.checked ? n.add(a) : n.delete(a);
                  setSelLeft(n);
                }}
              />
              <span>{a}</span>
            </label>
          ))}
          {fltLeft.length === 0 && <div className="transfer-empty">Sem agentes</div>}
        </div>
      </div>

      <div className="transfer-actions">
  <button
    type="button"
    className="transfer-btn"
    onClick={() => moveSelected(left, right, setLeft, setRight, setSelLeft, selLeft)}
    title="Mover selecionados para a direita"
    aria-label="Mover selecionados para a direita"
  >
    <MdKeyboardArrowRight size={22} />
  </button>

  <button
    type="button"
    className="transfer-btn"
    onClick={() => moveAll(left, right, setLeft, setRight, setSelLeft)}
    title="Mover todos para a direita"
    aria-label="Mover todos para a direita"
  >
    <MdKeyboardDoubleArrowRight size={22} />
  </button>

  <button
    type="button"
    className="transfer-btn"
    onClick={() => moveAll(right, left, setRight, setLeft, setSelRight)}
    title="Mover todos para a esquerda"
    aria-label="Mover todos para a esquerda"
  >
    <MdKeyboardDoubleArrowLeft size={22} />
  </button>

  <button
    type="button"
    className="transfer-btn"
    onClick={() => moveSelected(right, left, setRight, setLeft, setSelRight, selRight)}
    title="Mover selecionados para a esquerda"
    aria-label="Mover selecionados para a esquerda"
  >
    <MdKeyboardArrowLeft size={22} />
  </button>
</div>

      <div className="transfer-col">
        <div className="transfer-title">Agentes associados</div>
        <div className="transfer-search">
          <input
            className="input"
            placeholder="Buscar agente"
            value={qRight}
            onChange={(e) => setQRight(e.target.value)}
          />
        </div>
        <div className="transfer-list">
          {fltRight.map((a) => (
            <label key={a} className="transfer-item">
              <input
                type="checkbox"
                checked={selRight.has(a)}
                onChange={(e) => {
                  const n = new Set(selRight);
                  e.target.checked ? n.add(a) : n.delete(a);
                  setSelRight(n);
                }}
              />
              <span>{a}</span>
            </label>
          ))}
          {fltRight.length === 0 && <div className="transfer-empty">Sem agentes</div>}
        </div>
      </div>
    </div>
  );
}

export default function Agentes() {
  const [page, setPage] = useState(1);

  /* drawers */
  const [openNovo, setOpenNovo] = useState(false);
  const [openAssoc, setOpenAssoc] = useState(false);
  const [payloadNovo, setPayloadNovo] = useState(null);

  const columns = [
    { key: "nome", header: "Nome", width: 180 },
    { key: "username", header: "Username", width: 180 },
    { key: "supervisor", header: "Supervisor", width: 180 },
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
    { id: 1, nome: "AGVLA_0001", username: "AGVLA_0001", supervisor: "Supervisor 1", status: "Ativo" },
    { id: 2, nome: "AGVLA_0002", username: "AGVLA_0002", supervisor: "Supervisor 2", status: "Inativo" },
  ];

  const actions = (row) => (
    <TableActions
      onInfo={() => console.log("detalhes", row)}
      onEdit={() => setOpenNovo(true)}     
      onUsers={() => setOpenAssoc(true)}     
      onDelete={() => console.log("excluir", row)}
    />
  );

  function handleSearch(value) { console.log("buscar:", value); }
  function abrirNovo() { setOpenNovo(true); }
  function salvarNovo() { console.log("novo agente:", payloadNovo); setOpenNovo(false); }

  return (
    <div className="page">
      <div className="page-titlebar">
        <PageToolbar
          onSearch={handleSearch}
          searchPlaceholder="Pesquisar nome"
          buttons={[
            { label: "Associar Grupo", onClick: () => setOpenAssoc(true), variant: "secondary" },
            { label: "Novo Agente", onClick: abrirNovo },
          ]}
        />
      </div>

      <DataTable columns={columns} data={data} actions={actions} />
      <Pagination page={page} pageSize={5} total={data.length} onChange={setPage} />

      {/* Drawer: Novo Agente */}
      <Drawer
        open={openNovo}
        onClose={() => setOpenNovo(false)}
        title="Cadastrar Agente"
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setOpenNovo(false)}>Cancelar</button>
            <button className="btn btn-primary" onClick={salvarNovo}>Salvar</button>
          </>
        }
      >
        <NovoAgenteForm initial={{}} onChange={setPayloadNovo} />
      </Drawer>

      {/* Drawer: Associar Grupo (dual list) */}
      <Drawer
        open={openAssoc}
        onClose={() => setOpenAssoc(false)}
        title="Associar Grupo"
        width={560}
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setOpenAssoc(false)}>Cancelar</button>
            <button className="btn btn-primary" onClick={() => setOpenAssoc(false)}>Salvar</button>
          </>
        }
      >
        {/* por hora, usando os dois agentes mockados */}
        <DualList
          initialLeft={["AGVLA_0002"]}
          initialRight={["AGVLA_0001"]}
        />
      </Drawer>
    </div>
  );
}
