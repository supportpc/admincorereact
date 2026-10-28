
import { useState } from 'react';
import { useAdmin } from '@/components/AdminProvider';
import { transactions as allTransactions, badgeClass } from '@/lib/data';

export default function TransactionsView() {
  const { showToast } = useAdmin();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const q = search.toLowerCase();
  const rows = allTransactions.filter((t) => (!status || t.status === status) && Object.values(t).join(' ').toLowerCase().includes(q));
  return (
    <section id="page-transactions" className="page-view active">
      <div className="page-head">
        <div>
          <h1 className="page-title">Transaksi</h1>
          <p className="page-desc">Monitoring pembayaran, refund, status settlement, dan export.</p>
        </div>
        <button
          className="btn btn-secondary"
          onClick={() => {
            showToast('Export transaksi diproses');
          }}
        >
          Export
        </button>
      </div>
      <div className="card">
        <div className="card-body">
          <div className="toolbar">
            <div className="search-box">
              <span>
                <i className="fa-solid fa-magnifying-glass" />
              </span>
              <input
                className="form-control"
                id="trxSearch"
                placeholder="Cari invoice / customer..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <select
              className="form-control"
              style={{ maxWidth: '170px' }}
              id="trxStatus"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">Semua Status</option>
              <option>Paid</option>
              <option>Pending</option>
              <option>Failed</option>
              <option>Refunded</option>
            </select>
          </div>
        </div>
        <div className="table-responsive table-card-view">
          <table className="table">
            <thead>
              <tr>
                <th>Invoice</th>
                <th>Customer</th>
                <th>Metode</th>
                <th>Total</th>
                <th>Status</th>
                <th>Tanggal</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody id="trxTbody">
              {rows.map((t) => (
                <tr key={t.inv}>
                  <td data-label="Invoice">
                    <b>{t.inv}</b>
                  </td>
                  <td data-label="Customer">{t.cust}</td>
                  <td data-label="Metode">{t.method}</td>
                  <td data-label="Total">
                    <b>{t.total}</b>
                  </td>
                  <td data-label="Status">
                    <span className={`badge ${badgeClass(t.status)}`}>{t.status}</span>
                  </td>
                  <td data-label="Tanggal">{t.date}</td>
                  <td data-label="Aksi">
                    <button className="btn btn-secondary btn-sm" onClick={() => showToast('Detail ' + t.inv)}>
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={7}>
                    <div className="empty-state">Transaksi tidak ditemukan.</div>
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
