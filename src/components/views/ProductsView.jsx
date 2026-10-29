import { useState } from 'react';
import { useAdmin } from '@/components/AdminProvider';
import { catalog, idr } from '@/lib/products';

const STAT_FILTERS = [
  { key: 'all', title: 'Semua', value: 28, icon: 'fa-box', color: 'blue' },
  { key: 'active', title: 'Active', value: 22, icon: 'fa-check-circle', color: 'green' },
  { key: 'draft', title: 'Draft', value: 3, icon: 'fa-pen', color: 'orange' },
  { key: 'low', title: 'Stok Menipis', value: 5, icon: 'fa-exclamation-triangle', color: 'red' },
];

const emptyForm = { name: '', sku: '', category: 'Elektronik', price: '', stock: '', status: 'Active' };

export default function ProductsView() {
  const { showToast } = useAdmin();
  const [items, setItems] = useState(catalog);
  const [view, setView] = useState('grid');
  const [filter, setFilter] = useState('all');
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const q = search.toLowerCase();
  const rows = items.filter((p) => {
    if (filter === 'active' && p.status !== 'Active') return false;
    if (filter === 'draft' && p.status !== 'Draft') return false;
    if (filter === 'low' && !(p.stock > 0 && p.stock <= 5)) return false;
    if (category && p.category !== category) return false;
    return p.name.toLowerCase().includes(q);
  });

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const openProductModal = () => {
    setForm(emptyForm);
    setModalOpen(true);
  };

  const saveProduct = () => {
    if (!form.name) {
      showToast('Nama produk harus diisi');
      return;
    }
    setItems((l) => [
      {
        id: Date.now(),
        icon: 'fa-box',
        name: form.name,
        sku: form.sku || 'SKU-NEW',
        category: form.category,
        price: Number(form.price) || 0,
        stock: Number(form.stock) || 0,
        status: form.status,
      },
      ...l,
    ]);
    setModalOpen(false);
    showToast('Produk "' + form.name + '" berhasil disimpan');
  };

  return (
    <>
      <section id="page-products" className="page-view active">
        <div className="page-head">
          <div>
            <h1 className="page-title">Products / Catalog</h1>
            <p className="page-desc">Kelola katalog produk, stok, dan harga.</p>
          </div>
          <div className="flex gap-2">
            <div className="view-toggle">
              <button className={view === 'grid' ? 'active' : ''} onClick={() => setView('grid')} title="Grid view">
                <i className="fa-solid fa-grip" />
              </button>
              <button className={view === 'list' ? 'active' : ''} onClick={() => setView('list')} title="List view">
                <i className="fa-solid fa-list" />
              </button>
            </div>
            <button className="btn btn-primary" onClick={openProductModal}>
              + Tambah Produk
            </button>
          </div>
        </div>

        <div className="stat-filters">
          {STAT_FILTERS.map((s) => (
            <div key={s.key} className={`stat-card${filter === s.key ? ' active' : ''}`} onClick={() => setFilter(s.key)}>
              <div className="stat-header">
                <div>
                  <div className="stat-title">{s.title}</div>
                  <div className="stat-value">{s.value}</div>
                </div>
                <div className={`stat-icon ${s.color}`}>
                  <i className={`fa-solid ${s.icon}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="toolbar">
          <div className="search-box">
            <span>
              <i className="fa-solid fa-search" />
            </span>
            <input
              className="form-control"
              id="productSearch"
              placeholder="Cari produk..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <select className="form-control" style={{ width: 140 }} value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">Semua Kategori</option>
              <option>Elektronik</option>
              <option>Fashion</option>
              <option>Makanan</option>
              <option>Aksesoris</option>
            </select>
          </div>
        </div>

        {/* Grid view */}
        <div className={`product-grid${view === 'grid' ? '' : ' hidden'}`} id="productGrid">
          {rows.map((p) => (
            <div className="product-card" key={p.id}>
              <div className="product-img">
                <i className={`fa-solid ${p.icon}`} />
              </div>
              <div className="product-body">
                <div className="product-name">{p.name}</div>
                <div className="product-sku">SKU: {p.sku}</div>
                <span className={`badge ${p.status === 'Active' ? 'badge-success' : 'badge-gray'}`}>{p.status}</span>
                <div className="product-meta">
                  <span className="product-price">{idr(p.price)}</span>
                  <span className={`product-stock ${p.stock <= 5 && p.stock > 0 ? 'low' : 'ok'}`}>Stok: {p.stock}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* List view */}
        <div className={`table-responsive table-list-view${view === 'list' ? ' active' : ''}`} id="productList">
          <table className="table">
            <thead>
              <tr>
                <th>Produk</th>
                <th>SKU</th>
                <th>Kategori</th>
                <th>Harga</th>
                <th>Stok</th>
                <th>Status</th>
                <th style={{ width: 80 }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((p) => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>{p.sku}</td>
                  <td>{p.category}</td>
                  <td>{idr(p.price)}</td>
                  <td className={p.stock > 0 && p.stock <= 5 ? 'text-danger font-bold' : ''}>{p.stock}</td>
                  <td>
                    <span className={`badge ${p.status === 'Active' ? 'badge-success' : 'badge-gray'}`}>{p.status}</span>
                  </td>
                  <td>
                    <button className="btn btn-secondary btn-sm" onClick={() => showToast('Edit produk')}>
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {rows.length === 0 && <div className="empty-state">Produk tidak ditemukan.</div>}
      </section>

      {/* Product modal */}
      <div className={`modal-backdrop${modalOpen ? ' show' : ''}`} id="modalProduct">
        <div className="modal">
          <div className="modal-header">
            <h3 id="modalProductTitle">Tambah Produk</h3>
            <button onClick={() => setModalOpen(false)}>
              <i className="fa-solid fa-xmark" />
            </button>
          </div>
          <div className="modal-body">
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Nama Produk</label>
                <input className="form-control" id="productNameInput" placeholder="Nama produk" value={form.name} onChange={set('name')} />
              </div>
              <div className="form-group">
                <label className="form-label">SKU</label>
                <input className="form-control" id="productSkuInput" placeholder="SKU-001" value={form.sku} onChange={set('sku')} />
              </div>
              <div className="form-group">
                <label className="form-label">Kategori</label>
                <select className="form-control" id="productCategoryInput" value={form.category} onChange={set('category')}>
                  <option>Elektronik</option>
                  <option>Fashion</option>
                  <option>Makanan</option>
                  <option>Aksesoris</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Harga</label>
                <input
                  className="form-control"
                  id="productPriceInput"
                  placeholder="Rp"
                  type="number"
                  value={form.price}
                  onChange={set('price')}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Stok</label>
                <input
                  className="form-control"
                  id="productStockInput"
                  placeholder="0"
                  type="number"
                  value={form.stock}
                  onChange={set('stock')}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Status</label>
                <select className="form-control" id="productStatusInput" value={form.status} onChange={set('status')}>
                  <option>Active</option>
                  <option>Draft</option>
                </select>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={() => setModalOpen(false)}>
              Batal
            </button>
            <button className="btn btn-primary" onClick={saveProduct}>
              Simpan Produk
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
