import { Routes, Route, Navigate } from "react-router-dom";

// supervisor
import PainelSupervisor from "../pages/supervisor/PainelSupervisor";

// gravações
import Gravacoes from "../pages/gravacoes/Gravacoes";

// configurações
import ControleDeAcesso from "../pages/configuracoes/ControleDeAcesso";
import Usuarios from "../pages/configuracoes/controle-de-acesso/Usuarios";   
import Perfis from "../pages/configuracoes/controle-de-acesso/Perfis";
import AgentesCA from "../pages/configuracoes/controle-de-acesso/Agentes";


import Carreiras from "../pages/configuracoes/Carreiras";
import Template from "../pages/configuracoes/Template";
import Renitencia from "../pages/configuracoes/template/Renitencia";
import Horarios from "../pages/configuracoes/template/Horarios";
import Tabulacao from "../pages/configuracoes/template/Tabulacao";
import PausasTemplate from "../pages/configuracoes/template/Pausas";
import AlertaAgentes from "../pages/configuracoes/template/AlertaAgentes";

import Blacklist from "../pages/configuracoes/Blacklist";
import Leis from "../pages/configuracoes/blacklist/Leis";
import Bloqueio from "../pages/configuracoes/blacklist/Bloqueio";
import CPF from "../pages/configuracoes/blacklist/CPF";

import ControleOperadora from "../pages/configuracoes/ControleOperadora";
import LCR from "../pages/configuracoes/controle-operadora/LCR";
import Rotas from "../pages/configuracoes/controle-operadora/Rotas";
import ReceptivoCO from "../pages/configuracoes/controle-operadora/Receptivo";

// estratégias
import Gerenciamento from "../pages/estrategias/Gerenciamento";
import Estrategias from "../pages/estrategias/gerenciamento/Estrategias";
import OrdemDiscagemTelefone from "../pages/estrategias/gerenciamento/OrdemDiscagemTelefone";

import Importacoes from "../pages/estrategias/Importacoes";
import ImportacaoManual from "../pages/estrategias/importacoes/Manual";

import Monitoramento from "../pages/estrategias/Monitoramento";

// relatórios
import Campanhas from "../pages/relatorios/Campanhas";
import Agentes from "../pages/relatorios/Agentes";
import Mailing from "../pages/relatorios/Mailing";
import Pausas from "../pages/relatorios/Pausas";
import Receptivo from "../pages/relatorios/Receptivo";
import Personalizados from "../pages/relatorios/Personalizados";
import Licencas from "../pages/relatorios/Licencas";

import NotFound from "../pages/tratativas/NotFound";

export default function RoutesIndex() {
  return (
    <Routes>
      {/* redireciona raiz para o Painel */}
      <Route path="/" element={<Navigate to="/painel-do-supervisor" replace />} />

      {/* supervisor */}
      <Route path="/painel-do-supervisor" element={<PainelSupervisor />} />

      {/* gravações */}
      <Route path="/gravacoes" element={<Gravacoes />} />

      {/* configurações */}
      {/* <Route path="/controle-de-acesso" element={<ControleDeAcesso />} /> */}
      <Route path="/controle-de-acesso/usuarios" element={<Usuarios />} />
      <Route path="/controle-de-acesso/perfis" element={<Perfis />} />
      <Route path="/controle-de-acesso/agentes" element={<AgentesCA />} />
      
      <Route path="/carreiras" element={<Carreiras />} />

      {/* <Route path="/template" element={<Template />} /> */}
      <Route path="/template/renitencia" element={<Renitencia />} />
      <Route path="/template/horarios" element={<Horarios />} />
      <Route path="/template/tabulacao" element={<Tabulacao />} />
      <Route path="/template/pausas" element={<PausasTemplate />} />
      <Route path="/template/alerta-agentes" element={<AlertaAgentes />} />

      {/* <Route path="/blacklist" element={<Blacklist />} /> */}
      <Route path="/blacklist/leis" element={<Leis />} />
      <Route path="/blacklist/bloqueio" element={<Bloqueio />} />
      <Route path="/blacklist/cpf" element={<CPF />} />

      {/* <Route path="/controle-operadora" element={<ControleOperadora />} /> */}
      <Route path="/controle-operadora/lcr" element={<LCR />} />
      <Route path="/controle-operadora/rotas" element={<Rotas />} />
      <Route path="/controle-operadora/receptivo" element={<ReceptivoCO />} />

      {/* estratégias */}
      {/* <Route path="/gerenciamento" element={<Gerenciamento />} /> */}
      <Route path="/gerenciamento/estrategias" element={<Estrategias />} />
      <Route path="/gerenciamento/ordem-discagem-telefone" element={<OrdemDiscagemTelefone />} />

      {/* <Route path="/importacoes" element={<Importacoes />} /> */}
      <Route path="/importacoes/manual" element={<ImportacaoManual />} />

      <Route path="/monitoramento" element={<Monitoramento />} />

      {/* relatórios */}
      <Route path="/campanhas" element={<Campanhas />} />
      <Route path="/agentes" element={<Agentes />} />
      <Route path="/mailing" element={<Mailing />} />
      <Route path="/pausas" element={<Pausas />} />
      <Route path="/receptivo" element={<Receptivo />} />
      <Route path="/personalizados" element={<Personalizados />} />
      <Route path="/licencas" element={<Licencas />} />

      {/* fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

