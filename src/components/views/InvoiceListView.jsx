
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { calcInvoice, fmtDate, idr, STATUS_BADGE } from '@/lib/invoices';

export default function InvoiceListView({ invoices }) {
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('');

  const rows = invoices
    .map((inv) => ({ inv, c: calcInvoice(inv) }))
    .filter(({ inv, c }) => (!status || c.status === status) && (inv.id + inv.customer.name).toLowerCase().includes(q.toLowerCase()));

  const totals = rows.reduce((a, { c }) => ({ total: a.total + c.total, due: a.due + c.due }), { total: 0, due: 0 });

  return (
    <section id="page-invoice-list" className="page-view active">
      <div className="page-head">
        <div>
          <h1 className="page-title">Invoices</h1>
          <p className="page-desc">Daftar invoice. Klik invoice untuk melihat, print, atau mengunduh PDF.</p>
        </div>
      </div>

      <div className="grid-3 mb-5">
        <div className="stat-card">
          <div className="stat-title">Total Tagihan</div>
          <div className="stat-value">{idr(totals.total)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Belum Terbayar</div>
          <div className="stat-value" style={{ color: 'var(--danger)' }}>
            {idr(totals.due)}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Jumlah Invoice</div>
          <div className="stat-value">{rows.length}</div>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="toolbar">
            <div className="search-box">
              <span>
                <i className="fa-solid fa-magnifying-glass" />
              </span>
              <input className="form-control" placeholder="Cari invoice / customer..." value={q} onChange={(e) => setQ(e.target.value)} />
            </div>
            <select className="form-control" style={{ maxWidth: 170 }} value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="">Semua Status</option>
              <option>Paid</option>
              <option>Partial</option>
              <option>Unpaid</option>
              <option>Overdue</option>
            </select>
          </div>
        </div>
        <div className="table-responsive table-card-view">
          <table className="table">
            <thead>
              <tr>
                <th>Invoice</th>
                <th>Customer</th>
                <th>Tanggal</th>
                <th>Jatuh Tempo</th>
                <th>Total</th>
                <th>Sisa</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ inv, c }) => (
                <tr key={inv.id}>
                  <td data-label="Invoice">
                    <b>{inv.id}</b>
                  </td>
                  <td data-label="Customer">{inv.customer.name}</td>
                  <td data-label="Tanggal">{fmtDate(inv.issueDate)}</td>
                  <td data-label="Jatuh Tempo">{fmtDate(inv.dueDate)}</td>
                  <td data-label="Total">
                    <b>{idr(c.total)}</b>
                  </td>
                  <td data-label="Sisa">{idr(c.due)}</td>
                  <td data-label="Status">
                    <span className={`badge ${STATUS_BADGE[c.status]}`}>{c.status}</span>
                  </td>
                  <td data-label="Aksi">
                    <Link className="btn btn-secondary btn-sm" to={`/invoice/${inv.id}`}>
                      Lihat
                    </Link>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={8}>
                    <div className="empty-state">Invoice tidak ditemukan.</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
