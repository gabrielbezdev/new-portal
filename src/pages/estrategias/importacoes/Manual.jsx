import { useState } from "react";
import PageToolbar from "../../../components/PageToolbar";
import DataTable from "../../../components/DataTable";
import Pagination from "../../../components/Pagination";
import TableActions from "../../../components/TableActions";

export default function ImportacaoManual() {
  const [page, setPage] = useState(1);

  const columns = [
    { key: "id", header: "ID", width: 260 },
    { key: "grupo", header: "Grupo", width: 260 },
    {
      key: "status",
      header: "Status",
      width: 160,
      render: (row) => (
        <span className="badge-dot">
          <span
            className="dot"
            style={{ background: row.status === "Ativo" ? "#16a34a" : "#dc2626" }}
          />
          {row.status}
        </span>
      ),
    },
  ];

  const data = [
    { id: 1, grupo: "Nome 1", status: "Ativo" },
    { id: 2, grupo: "Nome 2", status: "Inativo" }
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
  function handleNovaRenitencia() {
    console.log("Nova Importação");
  }

  return (
    <div className="page">
      <div className="page-titlebar">
        <PageToolbar
          onSearch={handleSearch}
          searchPlaceholder="Pesquisar nome"
          buttons={[
            { label: "Nova Importação", onClick: handleNovaRenitencia },
          ]}
        />
      </div>

      <DataTable columns={columns} data={data} actions={actions} />

      <Pagination page={page} pageSize={5} total={data.length} onChange={setPage} />
    </div>
  );
}
