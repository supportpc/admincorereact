import { calcInvoice, fmtDate, idr, terbilang, STATUS_LABEL } from '@/lib/invoices';

/**
 * Printable ERP invoice. Pure + data-driven: pass any invoice object (see lib/invoices.js).
 * Always rendered as white "paper" (also in dark mode) so it prints correctly.
 */
export default function InvoiceDocument({ invoice }) {
  const c = calcInvoice(invoice);
  const co = invoice.company;
  const cu = invoice.customer;

  return (
    <div className={`inv-paper status-${c.status.toLowerCase()}`} id="invoicePaper">
      <div className="inv-watermark">{STATUS_LABEL[c.status]}</div>

      {/* header */}
      <div className="inv-header">
        <div className="inv-brand">
          <div className="inv-logo">N</div>
          <div>
            <div className="inv-company">{co.name}</div>
            <div className="inv-tagline">{co.tagline}</div>
            <div className="inv-small">
              {co.address.map((l) => (
                <div key={l}>{l}</div>
              ))}
              <div>NPWP: {co.npwp}</div>
              <div>
                {co.phone} · {co.email}
              </div>
            </div>
          </div>
        </div>
        <div className="inv-title">
          <h1>INVOICE</h1>
          <div className="inv-number">{invoice.id}</div>
          <span className={`inv-status ${c.status.toLowerCase()}`}>{STATUS_LABEL[c.status]}</span>
        </div>
      </div>

      {/* meta */}
      <div className="inv-meta">
        <div>
          <span>Tanggal Invoice</span>
          <b>{fmtDate(invoice.issueDate)}</b>
        </div>
        <div>
          <span>Jatuh Tempo</span>
          <b>{fmtDate(invoice.dueDate)}</b>
        </div>
        <div>
          <span>Termin</span>
          <b>{invoice.paymentTerms}</b>
        </div>
        <div>
          <span>No. PO</span>
          <b>{invoice.poNumber || '-'}</b>
        </div>
        <div>
          <span>Sales</span>
          <b>{invoice.salesperson || '-'}</b>
        </div>
      </div>

      {/* parties */}
      <div className="inv-parties">
        <div>
          <div className="inv-label">Ditagihkan Kepada</div>
          <div className="inv-party-name">{cu.name}</div>
          <div className="inv-small">
            <div>Attn: {cu.contact}</div>
            {cu.address.map((l) => (
              <div key={l}>{l}</div>
            ))}
            <div>NPWP: {cu.npwp}</div>
            <div>
              {cu.phone} · {cu.email}
            </div>
          </div>
        </div>
        <div>
          <div className="inv-label">Dikirim Ke</div>
          <div className="inv-party-name">{invoice.shipTo.name}</div>
          <div className="inv-small">
            {invoice.shipTo.address.map((l) => (
              <div key={l}>{l}</div>
            ))}
          </div>
        </div>
      </div>

      {/* items */}
      <table className="inv-table">
        <thead>
          <tr>
            <th style={{ width: 34 }}>No</th>
            <th>Deskripsi</th>
            <th className="r" style={{ width: 70 }}>
              Qty
            </th>
            <th className="r" style={{ width: 110 }}>
              Harga
            </th>
            <th className="r" style={{ width: 60 }}>
              Disc
            </th>
            <th className="r" style={{ width: 60 }}>
              PPN
            </th>
            <th className="r" style={{ width: 130 }}>
              Jumlah
            </th>
          </tr>
        </thead>
        <tbody>
          {c.lines.map((l, i) => (
            <tr key={l.sku}>
              <td>{i + 1}</td>
              <td>
                <b>{l.name}</b>
                <div className="inv-small">
                  {l.sku} · {l.desc}
                </div>
              </td>
              <td className="r">
                {l.qty} {l.unit}
              </td>
              <td className="r">{idr(l.price)}</td>
              <td className="r">{l.discountPct ? `${l.discountPct}%` : '-'}</td>
              <td className="r">{l.taxPct ? `${l.taxPct}%` : '-'}</td>
              <td className="r">
                <b>{idr(l.net)}</b>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* totals + notes */}
      <div className="inv-bottom">
        <div className="inv-left">
          <div className="inv-label">Terbilang</div>
          <div className="inv-words">{terbilang(c.total)} rupiah</div>

          {invoice.notes && (
            <>
              <div className="inv-label">Catatan</div>
              <div className="inv-small mb">{invoice.notes}</div>
            </>
          )}

          <div className="inv-label">Informasi Pembayaran</div>
          <div className="inv-small mb">
            <div>
              <b>{invoice.bank.bank}</b> · {invoice.bank.branch}
            </div>
            <div>
              No. Rekening: <b>{invoice.bank.account}</b>
            </div>
            <div>a/n {invoice.bank.holder}</div>
          </div>

          {invoice.payments.length > 0 && (
            <>
              <div className="inv-label">Riwayat Pembayaran</div>
              <table className="inv-pay">
                <tbody>
                  {invoice.payments.map((p) => (
                    <tr key={p.ref}>
                      <td>{fmtDate(p.date)}</td>
                      <td>{p.method}</td>
                      <td>{p.ref}</td>
                      <td className="r">{idr(p.amount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>

        <div className="inv-totals">
          <div>
            <span>Subtotal</span>
            <b>{idr(c.subtotal)}</b>
          </div>
          {c.discount > 0 && (
            <div>
              <span>Diskon</span>
              <b>- {idr(c.discount)}</b>
            </div>
          )}
          <div>
            <span>DPP (Dasar Pengenaan Pajak)</span>
            <b>{idr(c.taxable)}</b>
          </div>
          <div>
            <span>PPN 11%</span>
            <b>{idr(c.tax)}</b>
          </div>
          {c.shipping > 0 && (
            <div>
              <span>Ongkos Kirim</span>
              <b>{idr(c.shipping)}</b>
            </div>
          )}
          <div className="grand">
            <span>TOTAL</span>
            <b>{idr(c.total)}</b>
          </div>
          {c.paid > 0 && (
            <div>
              <span>Sudah Dibayar</span>
              <b>- {idr(c.paid)}</b>
            </div>
          )}
          <div className={`due${c.due === 0 ? ' zero' : ''}`}>
            <span>Sisa Tagihan</span>
            <b>{idr(c.due)}</b>
          </div>
        </div>
      </div>

      {/* terms + signature */}
      <div className="inv-foot">
        <div>
          <div className="inv-label">Syarat & Ketentuan</div>
          <ol className="inv-terms">
            {invoice.terms.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ol>
        </div>
        <div className="inv-sign">
          <div className="inv-small">Hormat kami,</div>
          <div className="inv-sign-space" />
          <b>{co.name}</b>
          <div className="inv-small">Finance Department</div>
        </div>
      </div>

      <div className="inv-end">Invoice ini dibuat oleh sistem dan sah tanpa tanda tangan basah. · {co.website}</div>
    </div>
  );
}
