
import { useEffect, useMemo, useRef, useState } from 'react';
import { useAdmin } from '@/components/AdminProvider';
import DataGrid, { sortRows } from '@/components/DataGrid';
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal';
import { buildProducts, CATEGORIES, STATUSES, categoryIcon, idr } from '@/lib/tableData';

const ROWS_PER_PAGE = [10, 15, 30, 50, 100];
const emptyFilters = { search: '', category: '', status: '', stock: '', min: '', max: '', topOnly: false };
const emptyForm = { name: '', sku: '', category: CATEGORIES[0], price: '', stock: '', status: 'Active' };
const STATUS_BADGE = { Active: 'badge-success', Draft: 'badge-warning', Archived: 'badge-gray' };

// where the ID link goes (original: /shop/products/:id)
const productHref = (row) => `/products?id=${row.id}`;

const stockState = (n) => (n === 0 ? 'out' : n <= 5 ? 'low' : 'ok');

export default function DataTableView() {
  const { showToast } = useAdmin();
  const [products, setProducts] = useState(buildProducts);
  const [filters, setFilters] = useState(emptyFilters);
  const [sort, setSort] = useState({ id: 'id', dir: 'desc' });
  const [selected, setSelected] = useState(() => new Set());
  const [hidden, setHidden] = useState(() => new Set());
  const [colMenu, setColMenu] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null); // { ids: [], name }
  const [editor, setEditor] = useState(null); // { id|null, form }
  const colRef = useRef(null);

  useEffect(() => {
    if (!colMenu) return;
    const close = (e) => colRef.current && !colRef.current.contains(e.target) && setColMenu(false);
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [colMenu]);

  /* ---------- actions ---------- */
  const toggleTop = (row) => {
    setProducts((l) => l.map((p) => (p.id === row.id ? { ...p, main: !p.main } : p)));
    showToast(row.main ? `"${row.name}" dihapus dari Top Product` : `"${row.name}" dijadikan Top Product`);
  };

  const openEdit = (row) =>
    setEditor({
      id: row.id,
      form: {
        name: row.name,
        sku: row.sku,
        category: row.category,
        price: String(row.price),
        stock: String(row.stock),
        status: row.status,
      },
    });
  const openCreate = () => setEditor({ id: null, form: emptyForm });

  const saveEditor = () => {
    const f = editor.form;
    if (!f.name.trim()) return showToast('Nama produk harus diisi');
    const data = {
      name: f.name.trim(),
      sku: f.sku || 'SKU-NEW',
      category: f.category,
      price: Number(f.price) || 0,
      stock: Number(f.stock) || 0,
      status: f.status,
    };
    if (editor.id === null) {
      const nextId = Math.max(0, ...products.map((p) => p.id)) + 1;
      setProducts((l) => [{ id: nextId, main: false, created: new Date().toISOString().slice(0, 10), ...data }, ...l]);
      showToast('Produk berhasil ditambahkan');
    } else {
      setProducts((l) => l.map((p) => (p.id === editor.id ? { ...p, ...data } : p)));
      showToast('Produk berhasil diperbarui');
    }
    setEditor(null);
  };

  const confirmDelete = () => {
    const ids = new Set(deleteTarget.ids);
    setProducts((l) => l.filter((p) => !ids.has(p.id)));
    setSelected((s) => new Set([...s].filter((id) => !ids.has(id))));
    showToast(`${ids.size} produk dihapus`);
    setDeleteTarget(null);
  };

  /* ---------- columns ---------- */
  const allColumns = [
    {
      id: 'id',
      name: 'ID',
      sortable: true,
      width: 90,
      sortValue: (r) => r.id,
      cell: (r) => (
        <a className="dg-id" href={productHref(r)} target="_blank" rel="noreferrer">
          #{r.id}
        </a>
      ),
    },
    {
      id: 'name',
      name: 'PRODUCT',
      sortable: true,
      sortValue: (r) => r.name,
      cell: (r) => (
        <div className="dg-product">
          <div className="dg-thumb">
            <i className={`fa-solid ${categoryIcon(r.category)}`} />
          </div>
          <div>
            <div className="dg-name">{r.name}</div>
            <div className="dg-sub">SKU: {r.sku}</div>
          </div>
        </div>
      ),
    },
    { id: 'price', name: 'PRICE', sortable: true, sortValue: (r) => r.price, cell: (r) => <b>{idr(r.price)}</b> },
    {
      id: 'category',
      name: 'CATEGORY',
      sortable: true,
      sortValue: (r) => r.category,
      cell: (r) => <span className="badge badge-primary">{r.category}</span>,
    },
    {
      id: 'stock',
      name: 'STOCK',
      sortable: true,
      sortValue: (r) => r.stock,
      cell: (r) => <span className={`dg-stock ${stockState(r.stock)}`}>{r.stock === 0 ? 'Habis' : r.stock}</span>,
    },
    {
      id: 'status',
      name: 'STATUS',
      sortable: true,
      sortValue: (r) => r.status,
      cell: (r) => <span className={`badge ${STATUS_BADGE[r.status]}`}>{r.status}</span>,
    },
    {
      id: 'created',
      name: 'CREATED',
      sortable: true,
      sortValue: (r) => r.created,
      cell: (r) => <span className="text-muted">{r.created}</span>,
    },
    {
      id: 'actions',
      name: 'ACTIONS',
      width: 110,
      toggle: false,
      cell: (r) => (
        <div className="dg-actions">
          <button className={`dg-icon dg-tip${r.main ? ' on' : ''}`} data-tip="Top Product" onClick={() => toggleTop(r)}>
            <i className={`${r.main ? 'fa-solid' : 'fa-regular'} fa-star`} />
          </button>
          <button className="dg-icon dg-tip" data-tip="Edit" onClick={() => openEdit(r)}>
            <i className="fa-solid fa-pen" />
          </button>
        </div>
      ),
    },
    {
      id: 'delete',
      name: 'DELETE',
      width: 80,
      align: 'center',
      toggle: false,
      cell: (r) => (
        <button className="dg-icon danger dg-tip" data-tip="Delete" onClick={() => setDeleteTarget({ ids: [r.id], name: r.name })}>
          <i className="fa-solid fa-trash" />
        </button>
      ),
    },
  ];
  const columns = allColumns.filter((c) => !hidden.has(c.id));

  /* ---------- filter -> sort ---------- */
  const filtered = useMemo(() => {
    const q = filters.search.trim().toLowerCase();
    const min = filters.min === '' ? null : Number(filters.min);
    const max = filters.max === '' ? null : Number(filters.max);
    return products.filter((p) => {
      if (q && ![p.id, p.name, p.sku, p.category].join(' ').toLowerCase().includes(q)) return false;
      if (filters.category && p.category !== filters.category) return false;
      if (filters.status && p.status !== filters.status) return false;
      if (filters.stock && stockState(p.stock) !== filters.stock) return false;
      if (min !== null && p.price < min) return false;
      if (max !== null && p.price > max) return false;
      if (filters.topOnly && !p.main) return false;
      return true;
    });
  }, [products, filters]);

  const sorted = useMemo(() => sortRows(filtered, allColumns, sort), [filtered, sort]); // eslint-disable-line react-hooks/exhaustive-deps

  // keep the selection limited to rows that are still visible
  useEffect(() => {
    const visible = new Set(filtered.map((p) => p.id));
    setSelected((s) => {
      const next = new Set([...s].filter((id) => visible.has(id)));
      return next.size === s.size ? s : next;
    });
  }, [filtered]);

  const setF = (k) => (e) => setFilters((f) => ({ ...f, [k]: e.target.value }));
  const activeFilters = Object.entries(filters).filter(([k, v]) => (k === 'topOnly' ? v : v !== '')).length;
  const onSort = (id) => setSort((s) => (s.id === id ? { id, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { id, dir: 'asc' }));

  /* ---------- export to Excel ---------- */
  const exportToExcel = async () => {
    const source = selected.size ? sorted.filter((p) => selected.has(p.id)) : sorted;
    if (!source.length) return showToast('Tidak ada data untuk diexport');
    const XLSX = await import('xlsx');
    const rows = source.map((p) => ({
      ID: p.id,
      Product: p.name,
      SKU: p.sku,
      Price: p.price,
      Category: p.category,
      Stock: p.stock,
      Status: p.status,
      'Top Product': p.main ? 'Yes' : 'No',
      Created: p.created,
    }));
    const ws = XLSX.utils.json_to_sheet(rows);
    ws['!cols'] = [{ wch: 8 }, { wch: 28 }, { wch: 12 }, { wch: 14 }, { wch: 14 }, { wch: 8 }, { wch: 10 }, { wch: 12 }, { wch: 12 }];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Products');
    XLSX.writeFile(wb, `products-${new Date().toISOString().slice(0, 10)}.xlsx`);
    showToast(`${rows.length} baris diexport ke Excel`);
  };

  const stats = {
    total: products.length,
    active: products.filter((p) => p.status === 'Active').length,
    low: products.filter((p) => p.stock > 0 && p.stock <= 5).length,
    top: products.filter((p) => p.main).length,
  };

  const setForm = (k) => (e) => setEditor((ed) => ({ ...ed, form: { ...ed.form, [k]: e.target.value } }));

  return (
    <section id="page-data-table" className="page-view active">
      <div className="page-head">
        <div>
          <h1 className="page-title">Data Table</h1>
          <p className="page-desc">Tabel lengkap: pencarian, filter, sorting, checkbox, pagination, bulk action, dan export Excel.</p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-secondary" onClick={exportToExcel}>
            <i className="fa-solid fa-file-excel" /> Export to Excel{selected.size > 0 && ` (${selected.size})`}
          </button>
          <button className="btn btn-primary" onClick={openCreate}>
            + Tambah Produk
          </button>
        </div>
      </div>

      <div className="grid-4 mb-5">
        {[
          ['Total Produk', stats.total, 'fa-box', 'blue'],
          ['Active', stats.active, 'fa-circle-check', 'green'],
          ['Stok Menipis', stats.low, 'fa-triangle-exclamation', 'red'],
          ['Top Product', stats.top, 'fa-star', 'orange'],
        ].map(([t, v, icon, color]) => (
          <div className="stat-card" key={t}>
            <div className="stat-header">
              <div>
                <div className="stat-title">{t}</div>
                <div className="stat-value">{v}</div>
              </div>
              <div className={`stat-icon ${color}`}>
                <i className={`fa-solid ${icon}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card dg-card">
        {/* toolbar */}
        <div className="dg-toolbar">
          <div className="search-box">
            <span>
              <i className="fa-solid fa-magnifying-glass" />
            </span>
            <input
              className="form-control"
              placeholder="Cari ID, produk, SKU, kategori..."
              value={filters.search}
              onChange={setF('search')}
            />
          </div>
          <select className="form-control dg-filter" value={filters.category} onChange={setF('category')}>
            <option value="">Semua Kategori</option>
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <select className="form-control dg-filter" value={filters.status} onChange={setF('status')}>
            <option value="">Semua Status</option>
            {STATUSES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <select className="form-control dg-filter" value={filters.stock} onChange={setF('stock')}>
            <option value="">Semua Stok</option>
            <option value="ok">Tersedia</option>
            <option value="low">Menipis (≤5)</option>
            <option value="out">Habis</option>
          </select>
          <div className="dg-price">
            <input className="form-control" type="number" min="0" placeholder="Harga min" value={filters.min} onChange={setF('min')} />
            <span>–</span>
            <input className="form-control" type="number" min="0" placeholder="Harga max" value={filters.max} onChange={setF('max')} />
          </div>
          <label className={`dg-chip${filters.topOnly ? ' on' : ''}`}>
            <input type="checkbox" checked={filters.topOnly} onChange={(e) => setFilters((f) => ({ ...f, topOnly: e.target.checked }))} />
            <i className="fa-solid fa-star" /> Top only
          </label>

          <div className="dg-menu" ref={colRef}>
            <button className="btn btn-secondary" onClick={() => setColMenu((o) => !o)}>
              <i className="fa-solid fa-table-columns" /> Kolom
            </button>
            {colMenu && (
              <div className="dg-menu-pop">
                {allColumns
                  .filter((c) => c.toggle !== false)
                  .map((c) => (
                    <label key={c.id} className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={!hidden.has(c.id)}
                        onChange={() =>
                          setHidden((h) => {
                            const n = new Set(h);
                            n.has(c.id) ? n.delete(c.id) : n.add(c.id);
                            return n;
                          })
                        }
                      />
                      <span className="form-check-label">{c.name}</span>
                    </label>
                  ))}
              </div>
            )}
          </div>
          {activeFilters > 0 && (
            <button className="btn btn-outline" onClick={() => setFilters(emptyFilters)}>
              <i className="fa-solid fa-filter-circle-xmark" /> Reset ({activeFilters})
            </button>
          )}
        </div>

        {/* bulk bar */}
        {selected.size > 0 && (
          <div className="dg-bulk">
            <span>
              <b>{selected.size}</b> dipilih
            </span>
            <div className="flex gap-2">
              <button className="btn btn-secondary btn-sm" onClick={exportToExcel}>
                <i className="fa-solid fa-file-excel" /> Export terpilih
              </button>
              <button className="btn btn-danger btn-sm" onClick={() => setDeleteTarget({ ids: [...selected], name: '' })}>
                <i className="fa-solid fa-trash" /> Hapus terpilih
              </button>
              <button className="btn btn-secondary btn-sm" onClick={() => setSelected(new Set())}>
                Batal
              </button>
            </div>
          </div>
        )}

        <DataGrid
          columns={columns}
          data={sorted}
          selected={selected}
          onSelectedChange={setSelected}
          sort={sort}
          onSort={onSort}
          rowsPerPageOptions={ROWS_PER_PAGE}
          resetKey={JSON.stringify(filters)}
        />
      </div>

      <ConfirmDeleteModal
        show={!!deleteTarget}
        onHide={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        productName={deleteTarget?.name}
        count={deleteTarget?.ids.length}
      />

      {/* create / edit modal */}
      <div className={`modal-backdrop${editor ? ' show' : ''}`}>
        {editor && (
          <div className="modal" style={{ width: 'min(560px,100%)' }}>
            <div className="modal-header">
              <h3>{editor.id === null ? 'Tambah Produk' : `Edit Produk #${editor.id}`}</h3>
              <button onClick={() => setEditor(null)}>
                <i className="fa-solid fa-xmark" />
              </button>
            </div>
            <div className="modal-body">
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Nama Produk</label>
                  <input className="form-control" value={editor.form.name} onChange={setForm('name')} />
                </div>
                <div className="form-group">
                  <label className="form-label">SKU</label>
                  <input className="form-control" value={editor.form.sku} onChange={setForm('sku')} />
                </div>
                <div className="form-group">
                  <label className="form-label">Kategori</label>
                  <select className="form-control" value={editor.form.category} onChange={setForm('category')}>
                    {CATEGORIES.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Harga</label>
                  <input className="form-control" type="number" value={editor.form.price} onChange={setForm('price')} />
                </div>
                <div className="form-group">
                  <label className="form-label">Stok</label>
                  <input className="form-control" type="number" value={editor.form.stock} onChange={setForm('stock')} />
                </div>
                <div className="form-group">
                  <label className="form-label">Status</label>
                  <select className="form-control" value={editor.form.status} onChange={setForm('status')}>
                    {STATUSES.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setEditor(null)}>
                Batal
              </button>
              <button className="btn btn-primary" onClick={saveEditor}>
                Simpan
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
