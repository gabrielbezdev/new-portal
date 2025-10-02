import "./styles/dataTable.css";

export default function DataTable({
  columns = [],
  data = [],
  actions,
  emptyText = "Nenhum registro encontrado.",
}) {
  return (
    <div className="dt">
      <div className="dt-header">
        {columns.map((col) => (
          <div
            key={col.key}
            className="dt-hcell"
            style={{ width: col.width ?? "auto" }}
          >
            {col.header}
          </div>
        ))}
        {actions && <div className="dt-hcell dt-hcell-actions">Ações</div>}
      </div>

      <div className="dt-body">
        {data.length === 0 ? (
          <div className="dt-empty">{emptyText}</div>
        ) : (
          data.map((row, idx) => (
            <div key={idx} className="dt-row">
              {columns.map((col) => (
                <div
                  key={col.key}
                  className="dt-cell"
                  style={{ width: col.width ?? "auto" }}
                >
                  {col.render ? col.render(row) : row[col.key]}
                </div>
              ))}
              {actions && (
                <div className="dt-cell dt-cell-actions">{actions(row)}</div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
