import PageToolbar from "../../components/PageToolbar";

export default function Monitoramento() {
    //filtro de busca
    function handleSearch(value) {
      console.log("buscar:", value);
    }
    //modal de nova importação
    function handleNovaImportacao() {
      console.log("nova importação");
    }
  
    return (
      <div>
        <PageToolbar
          title="Importação"
          onSearch={handleSearch}
          searchPlaceholder="Pesquisar nome"
          buttonLabel="Nova importação"
          onButtonClick={handleNovaImportacao}
        />
  
      </div>
    );
}
