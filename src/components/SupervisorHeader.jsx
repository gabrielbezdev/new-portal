import "./styles/supervisorHeader.css";

export default function SupervisorHeader({ user }) {
  return (
    <div className="supervisor-header">
      <h1 className="supervisor-title">
        Bem-vindo, {user?.name ?? "Gabriel Bezerra"}!
      </h1>
      <p className="supervisor-subtitle">
        Visão geral do desempenho da sua equipe
      </p>
    </div>
  );
}
