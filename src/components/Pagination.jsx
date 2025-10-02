import "./styles/pagination.css";

export default function Pagination({
  page = 1,
  pageSize = 10,
  total = 0,
  onChange = () => {},
  maxPagesToShow = 5,
}) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const current = Math.min(page, totalPages);

  const pages = (() => {
    const half = Math.floor(maxPagesToShow / 2);
    let start = Math.max(1, current - half);
    let end = Math.min(totalPages, start + maxPagesToShow - 1);
    if (end - start + 1 < maxPagesToShow) start = Math.max(1, end - maxPagesToShow + 1);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  })();

  return (
    <div className="pg">
      <span className="pg-info">
        Mostrando {(current - 1) * pageSize + 1}
        {"-"}
        {Math.min(current * pageSize, total)} de {total} registros
      </span>

      <div className="pg-nav">
        <button className="pg-btn" disabled={current === 1} onClick={() => onChange(1)}>&laquo;</button>
        <button className="pg-btn" disabled={current === 1} onClick={() => onChange(current - 1)}>&lsaquo;</button>

        {pages.map((p) => (
          <button
            key={p}
            className={"pg-page" + (p === current ? " is-active" : "")}
            onClick={() => onChange(p)}
          >
            {p}
          </button>
        ))}

        <button className="pg-btn" disabled={current === totalPages} onClick={() => onChange(current + 1)}>&rsaquo;</button>
        <button className="pg-btn" disabled={current === totalPages} onClick={() => onChange(totalPages)}>&raquo;</button>
      </div>
    </div>
  );
}
