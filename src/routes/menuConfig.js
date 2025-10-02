import {
  Gauge,
  Settings,
  Users,
  Briefcase,
  FileText,
  Ban,
  Wrench,
  ChartNoAxesCombined,
  List,
  Upload,
  Monitor,
  BarChart2,
  Megaphone,
  User,
  Mail,
  Pause,
  Phone,
  ClipboardList,
  Key,
  Mic,
  LogOut, RefreshCcw, Clock, ListChecks, Bell, Fingerprint, Shuffle, GitBranch, Target, PhoneCall, FileUp, UserCog, Shield, Scale
} from "lucide-react";

import { FaGear, FaSheetPlastic } from "react-icons/fa6";
import { FaUsersCog, FaBriefcase, FaPhoneSlash } from "react-icons/fa";
import { BiBlock } from 'react-icons/bi';


export const MENU = [
  { label: "Painel do Supervisor", path: "/painel-do-supervisor", icon: Gauge },

  {
    label: "Configurações", icon: FaGear, items: [
      {
        label: "Controle de Acesso", path: "/controle-de-acesso", disabled: true, icon: FaUsersCog,
        pluralLabel: "controles de acesso", gender: "m",
        items: [
          { label: "Usuários", path: "/controle-de-acesso/usuarios", icon: User, pluralLabel: "usuários", gender: "m" },
          { label: "Perfis",   path: "/controle-de-acesso/perfis",   icon: UserCog, pluralLabel: "perfis", gender: "m" },
          { label: "Agentes",  path: "/controle-de-acesso/agentes",  icon: Shield,  pluralLabel: "agentes", gender: "m" },
        ]
      },
      {
        label: "Carreiras", path: "/carreiras", icon: FaBriefcase,
        pluralLabel: "carreiras", gender: "f"
      },
      {
        label: "Template", path: "/template", disabled: true, icon: FaSheetPlastic,
        pluralLabel: "templates", gender: "m",
        items: [
          { label: "Renitência", path: "/template/renitencia", icon: RefreshCcw, pluralLabel: "renitências", gender: "f" },
          { label: "Horários",   path: "/template/horarios",   icon: Clock,      pluralLabel: "horários",    gender: "m" },
          { label: "Tabulação",  path: "/template/tabulacao",  icon: ListChecks, pluralLabel: "tabulações",  gender: "f" },
          { label: "Pausas",     path: "/template/pausas",     icon: Pause,      pluralLabel: "pausas",      gender: "f" },
          { label: "Alerta Agentes", path: "/template/alerta-agentes", icon: Bell, pluralLabel: "alertas de agentes", gender: "m" },
        ]
      },
      {
        label: "Blacklist", path: "/blacklist", disabled: true, icon: BiBlock,
        pluralLabel: "blacklists", gender: "f",
        items: [
          { label: "Leis",     path: "/blacklist/leis",     icon: Scale,       pluralLabel: "leis",     gender: "f" },
          { label: "Bloqueio", path: "/blacklist/bloqueio", icon: Ban,         pluralLabel: "bloqueios", gender: "m" },
          { label: "Blocklist CPF",      path: "/blacklist/cpf",      icon: Fingerprint, pluralLabel: "CPFs",     gender: "m" },
        ]
      },
      {
        label: "Controle Operadora", path: "/controle-operadora", disabled: true, icon: FaPhoneSlash,
        pluralLabel: "controles de operadora", gender: "m",
        items: [
          { label: "Low Cost Route (LCR)",       path: "/controle-operadora/lcr",       icon: Shuffle,   pluralLabel: "regras LCR", gender: "f" },
          { label: "Rotas",     path: "/controle-operadora/rotas",     icon: GitBranch, pluralLabel: "rotas",      gender: "f" },
          { label: "Receptivo", path: "/controle-operadora/receptivo", icon: Phone,     pluralLabel: "configurações de receptivo", gender: "f" },
        ]
      },
    ]
  },

  {
    label: "Estratégias", icon: ChartNoAxesCombined, items: [
      {
        label: "Gerenciamento", path: "/gerenciamento", disabled: true, icon: List,
        pluralLabel: "gerenciamentos", gender: "m",
        items: [
          { label: "Estratégias", path: "/gerenciamento/estrategias", icon: Target,   pluralLabel: "estratégias", gender: "f" },
          { label: "Ordem de discagem por telefone", path: "/gerenciamento/ordem-discagem-telefone", icon: PhoneCall, pluralLabel: "ordens de discagem por telefone", gender: "f" },
        ]
      },
      {
        label: "Importações", path: "/importacoes", disabled: true, icon: Upload,
        pluralLabel: "importações", gender: "f",
        items: [
          { label: "Importação Manual", path: "/importacoes/manual", icon: FileUp, pluralLabel: "importações manuais", gender: "f" }
        ]
      },
      { label: "Monitoramento", path: "/monitoramento", icon: Monitor, pluralLabel: "monitoramentos", gender: "m" },
    ]
  },

  {
    label: "Relatórios", icon: BarChart2, items: [
      { label: "Campanhas",      path: "/campanhas",      icon: Megaphone,     pluralLabel: "relatórios de campanhas", gender: "m" },
      { label: "Agentes",        path: "/agentes",        icon: User,          pluralLabel: "relatórios de agentes",   gender: "m" },
      { label: "Mailing",        path: "/mailing",        icon: Mail,          pluralLabel: "relatórios de mailing",   gender: "m" },
      { label: "Pausas",         path: "/pausas",         icon: Pause,         pluralLabel: "relatórios de pausas",    gender: "m" },
      { label: "Receptivo",      path: "/receptivo",      icon: Phone,         pluralLabel: "relatórios receptivo",    gender: "m" },
      { label: "Personalizados", path: "/personalizados", icon: ClipboardList, pluralLabel: "relatórios personalizados", gender: "m" },
      { label: "Licenças",       path: "/licencas",       icon: Key,           pluralLabel: "relatórios de licenças",  gender: "m" },
    ]
  },

  { label: "Gravações", path: "/gravacoes", icon: Mic, pluralLabel: "gravações", gender: "f" },
  { label: "Sair", path: "/logout", icon: LogOut },
];
