import { useMemo, useState } from "react";
import PageToolbar from "../../../components/PageToolbar";
import DataTable from "../../../components/DataTable";
import Pagination from "../../../components/Pagination";
import TableActions from "../../../components/TableActions";
import Drawer from "../../../components/Drawer";
import { MENU } from "../../../routes/menuConfig";


function PerfilForm({ initial = {}, onChange }) {
  const [form, setForm] = useState({
    perfil: initial.perfil ?? "",
    status: (initial.status ?? "Ativo") === "Ativo",
    todosAgentes: !!initial.todosAgentes,
    todosGrupos: !!initial.todosGrupos,
    todasCampanhas: !!initial.todasCampanhas,
    alertaPausa: !!initial.alertaPausa,
  });

  useMemo(() => { onChange?.(form); }, [form, onChange]);

  const update = (key) => (e) => {
    const value = e?.target?.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [key]: value }));
  };

  return (
    <form>
      <div className="field">
        <label className="label">Perfil</label>
        <input className="input" value={form.perfil} onChange={update("perfil")} data-autofocus />
      </div>

      <div className="field">
        <label className="label">Status</label>
        <label className="switch">
          <input type="checkbox" checked={form.status} onChange={update("status")} />
          <span className="slider" />
        </label>
      </div>

      <div className="field">
        <label className="label">Opções</label>
        <div className="checks-col">
          <label className="check">
            <input type="checkbox" checked={form.todosAgentes} onChange={update("todosAgentes")} />
            <span>Todos os agentes</span>
          </label>
          <label className="check">
            <input type="checkbox" checked={form.todosGrupos} onChange={update("todosGrupos")} />
            <span>Todos os grupos</span>
          </label>
          <label className="check">
            <input type="checkbox" checked={form.todasCampanhas} onChange={update("todasCampanhas")} />
            <span>Todas as campanhas</span>
          </label>
          <label className="check">
            <input type="checkbox" checked={form.alertaPausa} onChange={update("alertaPausa")} />
            <span>Alerta de pausa</span>
          </label>
        </div>
      </div>
    </form>
  );
}

function buildTreeFromMenu(menu) {
  const mapItem = (it) => ({
    id: it.path || it.label,  
    label: it.label,
    path: it.path || null,
    children: it.items ? it.items.map(mapItem) : [],
  });
  return menu.map(mapItem);
}
function toggleCascade(node, checked, set) {
  set((prev) => {
    const next = new Set(prev);
    const walk = (n) => {
      if (n.path) {
        if (checked) next.add(n.path);
        else next.delete(n.path);
      }
      n.children?.forEach(walk);
    };
    walk(node);
    return next;
  });
}

function PermissionsForm({ perfis = [], initialPerfil = "", initialChecked = new Set(), onChangePerfil, onChangeChecked }) {
  const [perfilSel, setPerfilSel] = useState(initialPerfil || "");
  const [checked, setChecked] = useState(new Set(initialChecked));
  const tree = useMemo(() => buildTreeFromMenu(MENU), []);

  useMemo(() => { onChangePerfil?.(perfilSel); }, [perfilSel, onChangePerfil]);
  useMemo(() => { onChangeChecked?.(checked); }, [checked, onChangeChecked]);

  const handleToggle = (node, e) => {
    const isChecked = e.target.checked;
    toggleCascade(node, isChecked, setChecked);
  };

  const renderNode = (node, depth = 0) => {
    const hasChildren = node.children && node.children.length > 0;
    const isChecked = node.path ? checked.has(node.path) : false;

    return (
      <div key={node.id} className="perm-node" style={{ paddingLeft: depth * 16 }}>
        {node.path ? (
          <label className="check">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => handleToggle(node, e)}
            />
            <span>{node.label}</span>
          </label>
        ) : (
          <div className="perm-group">{node.label}</div>
        )}
        {hasChildren && (
          <div className="perm-children">
            {node.children.map((c) => renderNode(c, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <form>
      <div className="field">
        <label className="label">Perfil</label>
        <select
          className="select"
          value={perfilSel}
          onChange={(e) => setPerfilSel(e.target.value)}
          data-autofocus
        >
          <option value="">Selecione um perfil</option>
          {perfis.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      {perfilSel && (
        <div className="field">
          <div className="label">Listagem de menus</div>
          <div className="perm-box">
            {tree.map((n) => renderNode(n))}
          </div>
        </div>
      )}
    </form>
  );
}

export default function Perfis() {
  const [page, setPage] = useState(1);

  // drawers
  const [openNew, setOpenNew] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openPerms, setOpenPerms] = useState(false);

  const [editing, setEditing] = useState(null);
  const [payload, setPayload] = useState(null);

  const [permPerfil, setPermPerfil] = useState("");
  const [permChecked, setPermChecked] = useState(new Set());

  const columns = [
    { key: "perfil", header: "Perfil", width: 180 },
    { key: "data", header: "Data Criação", width: 180 },
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
    { id: 1, perfil: "Administrador", data: "28/07/2025", status: "Ativo" },
    { id: 2, perfil: "Suporte",       data: "28/07/2025", status: "Inativo" },
  ];

  const perfisNomes = data.map(d => d.perfil);

  const actions = (row) => (
    <TableActions
      onInfo={() => console.log("detalhes", row)}
      onEdit={() => { setEditing(row); setOpenEdit(true); }}
      onKey={() => { setPermPerfil(row.perfil); setOpenPerms(true); }}
      onDelete={() => console.log("excluir", row)}
    />
  );

  function handleSearch(value) { console.log("buscar:", value); }
  function abrirNovo() { setEditing(null); setOpenNew(true); }

  function salvarNovo() { console.log("salvar novo perfil:", payload); setOpenNew(false); }
  function salvarEdicao() { console.log("salvar edição:", editing?.id, payload); setOpenEdit(false); }
  function salvarPermissoes() {
    console.log("salvar permissões do perfil:", permPerfil, Array.from(permChecked));
    setOpenPerms(false);
  }

  return (
    <div className="page">
      <div className="page-titlebar">
        <PageToolbar
          onSearch={handleSearch}
          searchPlaceholder="Pesquisar nome"
          buttons={[{ label: "Novo Perfil", onClick: abrirNovo }]}
        />
      </div>

      <DataTable columns={columns} data={data} actions={actions} />
      <Pagination page={page} pageSize={5} total={data.length} onChange={setPage} />

      {/* Drawer - Novo Perfil */}
      <Drawer
        open={openNew}
        onClose={() => setOpenNew(false)}
        title="Cadastrar Perfil"
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setOpenNew(false)}>Cancelar</button>
            <button className="btn btn-primary" onClick={salvarNovo}>Salvar</button>
          </>
        }
      >
        <PerfilForm initial={{}} onChange={setPayload} />
      </Drawer>

      {/* Drawer - Editar Perfil */}
      <Drawer
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        title="Editar Perfil"
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setOpenEdit(false)}>Cancelar</button>
            <button className="btn btn-primary" onClick={salvarEdicao}>Salvar</button>
          </>
        }
      >
        <PerfilForm initial={editing || {}} onChange={setPayload} />
      </Drawer>

      {/* Drawer - Permissões do Perfil */}
      <Drawer
        open={openPerms}
        onClose={() => setOpenPerms(false)}
        title="Permissões de Perfil"
        width={520}
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setOpenPerms(false)}>Cancelar</button>
            <button className="btn btn-primary" onClick={salvarPermissoes}>Salvar</button>
          </>
        }
      >
        <PermissionsForm
          perfis={perfisNomes}
          initialPerfil={permPerfil}
          initialChecked={permChecked}
          onChangePerfil={setPermPerfil}
          onChangeChecked={setPermChecked}
        />
      </Drawer>
    </div>
  );
}
