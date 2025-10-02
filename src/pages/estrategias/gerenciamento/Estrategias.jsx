import { useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import PageToolbar from "../../../components/PageToolbar";
import DataTable from "../../../components/DataTable";
import Pagination from "../../../components/Pagination";
import TableActions from "../../../components/TableActions";

export default function Estrategias() {
  const [page, setPage] = useState(1);
  const [carteira, setCarteira] = useState("");
  const [q, setQ] = useState("");

  const columns = [
    { key: "id", header: "ID", width: 50 },
    { key: "grupo", header: "Grupo", width: 100 },
    { key: "importado", header: "Importado", width: 100 },
    { key: "trabalhado", header: "Trabalhado", width: 100 },
    { key: "disponivel", header: "Disponível", width: 100 },
    { key: "agendamento", header: "Agendamento Discador", width: 160 },
    { key: "finalizados", header: "Finalizados Discador", width: 160 },
  ];

  const data = [
    { id: 1, grupo: "Grupo 1", importado: "100000", trabalhado: "100000", disponivel: "100000", agendamento: "100000", finalizados: "100000" },
    { id: 2, grupo: "Grupo 2", importado: "100000", trabalhado: "100000", disponivel: "100000", agendamento: "100000", finalizados: "100000" },
  ];

  function submitBusca() {
    console.log("buscar", { carteira, q });
  }

    const actions = (row) => (
      <TableActions
        onInfo={() => console.log("detalhes", row)}
        onEdit={() => console.log("editar", row)}
        onDelete={() => console.log("excluir", row)}
      />
    );

  return (
    <div className="page">
      <div className="page-titlebar">
        <PageToolbar
          showTitle={true}  // se quiser esconder o título neste layout
          rightContent={
            <div className="pt-inline">
              <span className="pt-field-label">Carteira</span>

              <select
                className="pt-select"
                value={carteira}
                onChange={(e) => setCarteira(e.target.value)}
              >
                <option value="">Selecione uma carteira</option>
                <option value="c1">Carteira 1</option>
                <option value="c2">Carteira 2</option>
              </select>

              <div className="pt-search">
                <input
                  type="text"
                  placeholder="Pesquisar"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  aria-label="Pesquisar"
                />
                <span className="pt-search-icon" aria-hidden>
                  <SearchIcon size={16} />
                </span>
              </div>

              <button className="pt-iconbtn" onClick={submitBusca} aria-label="Buscar">
                <SearchIcon size={18} />
              </button>
            </div>
          }
        />
      </div>

      <DataTable columns={columns} data={data} actions={actions}/>
      <Pagination page={page} pageSize={5} total={data.length} onChange={setPage} />
    </div>
  );
}
