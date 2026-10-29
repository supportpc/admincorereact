import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAdmin } from '@/components/AdminProvider';
import InvoiceDocument from '@/components/InvoiceDocument';
import { calcInvoice, idr, STATUS_BADGE } from '@/lib/invoices';

export default function InvoiceView({ invoice }) {
  const { showToast } = useAdmin();
  const [extra, setExtra] = useState([]); // payments added from the UI
  const live = { ...invoice, payments: [...invoice.payments, ...extra] };
  const c = calcInvoice(live);

  const markPaid = () => {
    if (c.due <= 0) return;
    setExtra((l) => [...l, { date: new Date().toISOString().slice(0, 10), method: 'Manual', ref: `MAN-${l.length + 1}`, amount: c.due }]);
    showToast('Invoice ditandai lunas');
  };

  return (
    <section id="page-invoice" className="page-view active">
      <div className="page-head inv-actions">
        <div>
          <h1 className="page-title">Invoice {invoice.id}</h1>
          <p className="page-desc">
            {invoice.customer.name} · <span className={`badge ${STATUS_BADGE[c.status]}`}>{c.status}</span> · Sisa {idr(c.due)}
          </p>
        </div>
        <div className="flex gap-2" style={{ flexWrap: 'wrap' }}>
          <Link to="/invoice" className="btn btn-secondary">
            <i className="fa-solid fa-arrow-left" /> Semua Invoice
          </Link>
          <button className="btn btn-secondary" onClick={() => showToast(`Invoice dikirim ke ${invoice.customer.email}`)}>
            <i className="fa-solid fa-envelope" /> Kirim Email
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => {
              showToast('Pilih "Save as PDF" pada dialog print');
              setTimeout(() => window.print(), 300);
            }}
          >
            <i className="fa-solid fa-file-pdf" /> Download PDF
          </button>
          {c.due > 0 && (
            <button className="btn btn-success" onClick={markPaid}>
              <i className="fa-solid fa-check" /> Tandai Lunas
            </button>
          )}
          <button className="btn btn-primary" onClick={() => window.print()}>
            <i className="fa-solid fa-print" /> Print
          </button>
        </div>
      </div>

      <InvoiceDocument invoice={live} />
    </section>
  );
}
