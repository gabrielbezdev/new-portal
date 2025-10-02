import { useState } from "react";
import PageToolbar from "../../../components/PageToolbar";
import DataTable from "../../../components/DataTable";
import Pagination from "../../../components/Pagination";
import TableActions from "../../../components/TableActions";

export default function Bloqueio() {
  const [page, setPage] = useState(1);

  const columns = [
    { key: "nome", header: "Nome", width: 260 },
    { key: "telefone", header: "Telefone", width: 260 },
    {
      key: "status",
      header: "Status",
      width: 160,
      render: (row) => (
        <span className="badge-dot">
          <span
            className="dot"
            style={{
              background: row.status === "Ativo" ? "#16a34a" : "#dc2626",
            }}
          />
          {row.status}
        </span>
      ),
    },
  ];

  const data = [
    { id: 1, nome: "Agente 1", telefone: "(88) 9 9874-1452", status: "Ativo" },
    { id: 2, nome: "Agente 2", telefone: "(11) 9 9874-1452", status: "Inativo" },
  ];

  const actions = (row) => (
    <TableActions
      onInfo={() => console.log("detalhes", row)}
      onEdit={() => console.log("editar", row)}
      onDelete={() => console.log("excluir", row)}
    />
  );

  function handleSearch(value) {
    console.log("buscar:", value);
  }
  function abrirFiltros() {
    console.log("abrir filtros");
  }
  function handleNovoBloqueio() {
    console.log("Novo bloqueio");
  }

  return (
    <div className="page">
      <div className="page-titlebar">
        <PageToolbar
          onSearch={handleSearch}
          searchPlaceholder="Pesquisar nome"
          buttons={[
            { label: "Filtros", onClick: abrirFiltros, variant: "secondary" },
            { label: "Novo Bloqueio", onClick: handleNovoBloqueio },
          ]}
        />
      </div>

      <DataTable columns={columns} data={data} actions={actions} />

      <Pagination
        page={page}
        pageSize={5}
        total={data.length}
        onChange={setPage}
      />
    </div>
  );
}
