import { useLocation } from "react-router-dom";
import PageHeader from "./PageHeader";  
import SupervisorHeader from "./SupervisorHeader";

export default function SubHeader() {
  const { pathname } = useLocation();
  const isSupervisor = pathname === "/painel-do-supervisor";

  return isSupervisor ? <SupervisorHeader /> : <PageHeader />;
}