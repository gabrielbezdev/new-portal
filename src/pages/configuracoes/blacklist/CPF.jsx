import { useState } from "react";
import PageToolbar from "../../../components/PageToolbar";
import DataTable from "../../../components/DataTable";
import Pagination from "../../../components/Pagination";

export default function CPF() {
  const [page, setPage] = useState(1);

  const columns = [
    { key: "cpf", header: "CPF", width: 180 },
    { key: "campanha", header: "Campanha", width: 220 },
    { key: "dataCadastro", header: "Data de cadastro", width: 200 },
    { key: "dataExpiracao", header: "Data de expiração", width: 200 },
  ];

  const data = [
    {
      id: 1,
      cpf: "123.456.789-00",
      campanha: "Campanha 1",
      dataCadastro: "12/08/2025",
      dataExpiracao: "12/11/2025",
    },
    {
      id: 2,
      cpf: "987.654.321-00",
      campanha: "Campanha 2",
      dataCadastro: "28/09/2025",
      dataExpiracao: "28/10/2025",
    },
  ];

  function handleSearch(value) {
    console.log("buscar:", value);
  }
  function abrirFiltros() {
    console.log("abrir filtros");
  }
  function handleNovoCPF() {
    console.log("Novo Blocklist CPF");
  }

  return (
    <div className="page">
      <div className="page-titlebar">
        <PageToolbar
          onSearch={handleSearch}
          searchPlaceholder="Pesquisar CPF ou campanha"
          buttons={[
            { label: "Filtros", onClick: abrirFiltros, variant: "secondary" },
            { label: "Novo Blocklist CPF", onClick: handleNovoCPF },
          ]}
        />
      </div>

      <DataTable columns={columns} data={data} />

      <Pagination
        page={page}
        pageSize={5}
        total={data.length}
        onChange={setPage}
      />
    </div>
  );
}
