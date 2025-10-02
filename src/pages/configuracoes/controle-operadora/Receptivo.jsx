import { useState } from "react";
import PageToolbar from "../../../components/PageToolbar";
import DataTable from "../../../components/DataTable";
import Pagination from "../../../components/Pagination";
import TableActions from "../../../components/TableActions";

export default function Receptivo() {
  const [page, setPage] = useState(1);

  const columns = [
    { key: "did", header: "DID", width: 180 },
    { key: "direcao", header: "Direção", width: 120 },
    {
      key: "status", header: "Status", width: 160,
      render: (row) => (
        <span className="badge-dot">
          <span
            className="dot"
            style={{ background: row.status === "Ativo" ? "#16a34a" : "#dc2626" }}
          />
          {row.status}
        </span>
      )
    },
  ];

  const data = [
    { id: 1, did: "11999999999", direcao: "Receptivo", status: "Ativo" },
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
  function handleNovaImportacao() {
    console.log("nova importação");
  }

  return (
    <div className="page">
      <div className="page-titlebar">
        <PageToolbar
          onSearch={handleSearch}
          searchPlaceholder="Pesquisar DID"
          buttonLabel="Novo DID"
          onButtonClick={handleNovaImportacao}
        />
      </div>

      <DataTable columns={columns} data={data} actions={actions} />

      <Pagination page={page} pageSize={5} total={42} onChange={setPage} />
    </div>
  );
}
