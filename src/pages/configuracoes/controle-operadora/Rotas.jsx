import { useState } from "react";
import PageToolbar from "../../../components/PageToolbar";
import DataTable from "../../../components/DataTable";
import Pagination from "../../../components/Pagination";
import TableActions from "../../../components/TableActions";

export default function Rotas() {
  const [page, setPage] = useState(1);

  const columns = [
    { key: "nome", header: "Nome", width: 200 },
    { key: "csp", header: "CSP", width: 120 },
    { key: "ipDns", header: "IP/DNS", width: 120 },
    { key: "techPrefix", header: "Tech-prefix", width: 120 },
    {
      key: "status",
      header: "Status",
      width: 100,
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
    { id: 1, nome: "Operadora 1", csp: "---", ipDns: "10.10.10.10", techPrefix: "1010", status: "Ativo" },
    { id: 2, nome: "Operadora 2", csp: "---", ipDns: "10.10.10.10", techPrefix: "1010", status: "Inativo" },
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
    console.log("Nova Rota");
  }

  return (
    <div className="page">
      <div className="page-titlebar">
        <PageToolbar
          onSearch={handleSearch}
          searchPlaceholder="Pesquisar nome"
          buttons={[
            { label: "Filtros", onClick: abrirFiltros, variant: "secondary" },
            { label: "Nova Rota", onClick: handleNovoBloqueio },
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
