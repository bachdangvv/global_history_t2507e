function getCellValue(row, column) {
  if (typeof column.render === "function") {
    return column.render(row);
  }

  if (typeof column.accessor === "function") {
    return column.accessor(row);
  }

  return row[column.key];
}

export default function AdminTable({
  columns,
  rows,
  emptyTitle = "No data found",
  emptyText = "There is nothing to show in this table yet.",
}) {
  return (
    <div className="table-shell">
      <table className="admin-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key || column.header} className={column.headerClassName || ""}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length ? (
            rows.map((row) => (
              <tr key={row.id}>
                {columns.map((column) => (
                  <td key={column.key || column.header} className={column.cellClassName || ""}>
                    {getCellValue(row, column)}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length}>
                <div className="table-empty-state">
                  <h3>{emptyTitle}</h3>
                  <p>{emptyText}</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
