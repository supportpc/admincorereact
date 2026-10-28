
import { useEffect, useRef, useState } from 'react';

/**
 * DataGrid - reusable table: row checkboxes, column sorting, pagination, rows-per-page.
 *
 * Filtering and sorting are controlled by the parent (so it can export exactly what is shown):
 *   data      rows ALREADY filtered + sorted (use sortRows below)
 *   columns   [{ id, name, sortable, cell(row), align, width }]
 *   sort      { id, dir: 'asc' | 'desc' }      onSort(columnId)
 *   selected  Set of selected row keys         onSelectedChange(newSet)
 */
export function sortRows(rows, columns, sort) {
  const col = columns.find((c) => c.id === sort?.id);
  if (!col || !col.sortValue) return rows;
  const dir = sort.dir === 'asc' ? 1 : -1;
  return [...rows].sort((a, b) => {
    const x = col.sortValue(a);
    const y = col.sortValue(b);
    if (typeof x === 'number' && typeof y === 'number') return (x - y) * dir;
    return String(x).localeCompare(String(y), 'id', { numeric: true }) * dir;
  });
}

function pageList(cur, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const set = new Set([1, total, cur, cur - 1, cur + 1]);
  if (cur <= 3) [2, 3, 4].forEach((n) => set.add(n));
  if (cur >= total - 2) [total - 1, total - 2, total - 3].forEach((n) => set.add(n));
  const nums = [...set].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b);
  const out = [];
  nums.forEach((n, i) => {
    if (i && n - nums[i - 1] > 1) out.push('…' + n);
    out.push(n);
  });
  return out;
}

export default function DataGrid({
  columns,
  data,
  rowKey = (r) => r.id,
  selectable = true,
  selected = new Set(),
  onSelectedChange = () => {},
  sort,
  onSort = () => {},
  rowsPerPageOptions = [10, 15, 30, 50, 100],
  resetKey = '',
  emptyText = 'Tidak ada data yang cocok.',
}) {
  const [perPage, setPerPage] = useState(rowsPerPageOptions[0]);
  const [page, setPage] = useState(1);
  const headCheck = useRef(null);

  useEffect(() => setPage(1), [resetKey, perPage]);

  const total = data.length;
  const pages = Math.max(1, Math.ceil(total / perPage));
  const cur = Math.min(page, pages);
  const start = (cur - 1) * perPage;
  const rows = data.slice(start, start + perPage);

  const pageKeys = rows.map(rowKey);
  const selectedOnPage = pageKeys.filter((k) => selected.has(k)).length;
  const allOnPage = rows.length > 0 && selectedOnPage === rows.length;

  useEffect(() => {
    if (headCheck.current) headCheck.current.indeterminate = selectedOnPage > 0 && !allOnPage;
  }, [selectedOnPage, allOnPage]);

  const togglePage = () => {
    const next = new Set(selected);
    pageKeys.forEach((k) => (allOnPage ? next.delete(k) : next.add(k)));
    onSelectedChange(next);
  };
  const toggleRow = (k) => {
    const next = new Set(selected);
    next.has(k) ? next.delete(k) : next.add(k);
    onSelectedChange(next);
  };
  const selectAllResults = () => onSelectedChange(new Set(data.map(rowKey)));

  return (
    <div className="dg">
      {selectable && allOnPage && total > rows.length && (
        <div className="dg-banner">
          {selected.size >= total ? (
            <>
              Semua <b>{total}</b> hasil dipilih. <button onClick={() => onSelectedChange(new Set())}>Batalkan pilihan</button>
            </>
          ) : (
            <>
              {rows.length} baris di halaman ini dipilih. <button onClick={selectAllResults}>Pilih semua {total} hasil</button>
            </>
          )}
        </div>
      )}

      <div className="dg-scroll">
        <table className="dg-table">
          <thead>
            <tr>
              {selectable && (
                <th className="dg-check">
                  <input
                    ref={headCheck}
                    className="form-check-input"
                    type="checkbox"
                    checked={allOnPage}
                    onChange={togglePage}
                    aria-label="Select page"
                  />
                </th>
              )}
              {columns.map((c) => {
                const active = sort?.id === c.id;
                return (
                  <th
                    key={c.id}
                    style={{ width: c.width, textAlign: c.align }}
                    className={`${c.sortable ? 'dg-sortable' : ''}${active ? ' is-sorted' : ''}`}
                    onClick={c.sortable ? () => onSort(c.id) : undefined}
                  >
                    <span>{c.name}</span>
                    {c.sortable && (
                      <i
                        className={`fa-solid ${active ? (sort.dir === 'asc' ? 'fa-arrow-up' : 'fa-arrow-down') : 'fa-sort'} dg-sort-icon`}
                      />
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const k = rowKey(row);
              const isSel = selected.has(k);
              return (
                <tr key={k} className={isSel ? 'selected' : ''}>
                  {selectable && (
                    <td className="dg-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={isSel}
                        onChange={() => toggleRow(k)}
                        aria-label={`Select ${k}`}
                      />
                    </td>
                  )}
                  {columns.map((c) => (
                    <td key={c.id} style={{ textAlign: c.align }}>
                      {c.cell(row)}
                    </td>
                  ))}
                </tr>
              );
            })}
            {rows.length === 0 && (
              <tr className="dg-empty">
                <td colSpan={columns.length + (selectable ? 1 : 0)}>
                  <div className="empty-state">
                    <i className="fa-solid fa-inbox icon-lg mb-3" />
                    <div>{emptyText}</div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="dg-footer">
        <div className="dg-rpp">
          <span>Baris per halaman</span>
          <select className="form-control" value={perPage} onChange={(e) => setPerPage(Number(e.target.value))}>
            {rowsPerPageOptions.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
        <div className="dg-range">
          {total === 0 ? (
            '0 data'
          ) : (
            <>
              {start + 1}–{Math.min(start + perPage, total)} dari <b>{total}</b>
            </>
          )}
        </div>
        <div className="dg-pages">
          <button className="page-btn" disabled={cur === 1} onClick={() => setPage(1)} title="Pertama">
            <i className="fa-solid fa-angles-left" />
          </button>
          <button className="page-btn" disabled={cur === 1} onClick={() => setPage(cur - 1)} title="Sebelumnya">
            <i className="fa-solid fa-angle-left" />
          </button>
          {pageList(cur, pages).map((p) =>
            typeof p === 'string' ? (
              <span key={p} className="dg-dots">
                …
              </span>
            ) : (
              <button key={p} className={`page-btn${p === cur ? ' active' : ''}`} onClick={() => setPage(p)}>
                {p}
              </button>
            ),
          )}
          <button className="page-btn" disabled={cur === pages} onClick={() => setPage(cur + 1)} title="Berikutnya">
            <i className="fa-solid fa-angle-right" />
          </button>
          <button className="page-btn" disabled={cur === pages} onClick={() => setPage(pages)} title="Terakhir">
            <i className="fa-solid fa-angles-right" />
          </button>
        </div>
      </div>
    </div>
  );
}
