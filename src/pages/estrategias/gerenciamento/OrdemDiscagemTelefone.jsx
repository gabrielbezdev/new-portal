import { useState } from "react";
import PageToolbar from "../../../components/PageToolbar";
import DataTable from "../../../components/DataTable";
import Pagination from "../../../components/Pagination";
import TableActions from "../../../components/TableActions";

export default function OrdemDiscagemTelefone() {
  const [page, setPage] = useState(1);

  const columns = [
    { key: "id", header: "ID", width: 260 },
    { key: "grupo", header: "Grupo", width: 260 },
  ];

  const data = [
    { id: 1, grupo: "Grupo 1"},
    { id: 2, grupo: "Grupo 2"}
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
    console.log("Nova Ordem de Discagem");
  }

  return (
    <div className="page">
      <div className="page-titlebar">
        <PageToolbar
          onSearch={handleSearch}
          searchPlaceholder="Pesquisar nome"
          buttons={[
            { label: "Nova Ordem de Discagem", onClick: handleNovaRenitencia },
          ]}
        />
      </div>

      <DataTable columns={columns} data={data} actions={actions} />

      <Pagination page={page} pageSize={5} total={data.length} onChange={setPage} />
    </div>
  );
}
