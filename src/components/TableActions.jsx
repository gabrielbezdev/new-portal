import { FaInfoCircle, FaEdit, FaTrash, FaUsers, FaKey } from "react-icons/fa";
import "./styles/tableActions.css";

export default function TableActions({
  onInfo,
  onEdit,
  onDelete,
  onUsers,   // novo
  onKey      // novo
}) {
  return (
    <div className="table-actions">
      <button
        type="button"
        title="Detalhes"
        onClick={onInfo}
        className="ta-btn"
      >
        <FaInfoCircle size={16} />
      </button>
      <button
        type="button"
        title="Editar"
        onClick={onEdit}
        className="ta-btn"
      >
        <FaEdit size={16} />
      </button>

      {/* novos botões - só aparecem se a prop for passada */}
      {onUsers && (
        <button
          type="button"
          title="Gerenciar usuários"
          onClick={onUsers}
          className="ta-btn"
        >
          <FaUsers size={16} />
        </button>
      )}
      {onKey && (
        <button
          type="button"
          title="Permissões / Chave"
          onClick={onKey}
          className="ta-btn"
        >
          <FaKey size={16} />
        </button>
      )}

      <button
        type="button"
        title="Excluir"
        onClick={onDelete}
        className="ta-btn"
      >
        <FaTrash size={16} />
      </button>
    </div>
  );
}
