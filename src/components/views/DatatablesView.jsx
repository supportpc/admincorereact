import { useRef } from 'react';
import { useAdmin } from '@/components/AdminProvider';
import DataTableBox from '@/components/DataTableBox';

export default function DatatablesView() {
  const { showToast } = useAdmin();
  const dtRef = useRef(null);
  return (
    <section id="page-datatables" className="page-view active">
      <div className="page-head">
        <div>
          <h1 className="page-title">DataTables Integration</h1>
          <p className="page-desc">
            Halaman khusus untuk integrasi jQuery DataTables, server-side processing, export button, dan mapping endpoint backend.
          </p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => {
            showToast('Contoh DataTables siap dipakai');
          }}
        >
          <i className="fa-solid fa-plug" /> Ready
        </button>
      </div>
      <div className="grid-2 mb-6">
        <div className="card">
          <div className="card-header">DataTables Sudah Aktif</div>
          <div className="card-body">
            <div className="integration-note mb-3">
              <b>Status:</b>
              <p className="text-sm text-muted mt-2">
                jQuery 3.7.1 + DataTables 2.1.8 sudah terintegrasi. Table di bawah sudah memiliki sorting, search, pagination, dan bisa
                di-customize.
              </p>
            </div>
            <div className="integration-note">
              <b>Fitur:</b>
              <p className="text-sm text-muted mt-2">
                Search otomatis, sort per kolom, page length, dan export siap ditambahkan. Gunakan <span className="kbd">buttons</span>{' '}
                ekstensi untuk export Excel/PDF.
              </p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header">Catatan Integrasi</div>
          <div className="card-body">
            <div className="integration-note mb-3">
              <b>Rekomendasi:</b>
              <p className="text-sm text-muted mt-2">
                Gunakan halaman ini sebagai template khusus table besar. Untuk data kecil, table native seperti menu User/Transaksi masih
                cukup.
              </p>
            </div>
            <div className="integration-note">
              <b>Server-side:</b>
              <p className="text-sm text-muted mt-2">
                Backend perlu menerima parameter DataTables seperti <span className="kbd">draw</span>, <span className="kbd">start</span>,{' '}
                <span className="kbd">length</span>, <span className="kbd">search[value]</span>, dan <span className="kbd">order</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-header">
          <span>Contoh Table DataTables (Aktif)</span>
          <div className="datatable-actions">
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => {
                dtRef.current?.draw(false);
                showToast('DataTables reloaded');
              }}
            >
              <i className="fa-solid fa-rotate" /> Reload
            </button>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => {
                showToast('Config sudah aktif - sorting, search, pagination berfungsi');
              }}
            >
              <i className="fa-solid fa-check" /> Status OK
            </button>
          </div>
        </div>
        <div className="table-responsive">
          <DataTableBox id="datatableExample" className="table" instanceRef={dtRef}>
            <thead>
              <tr>
                <th>No</th>
                <th>Invoice</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>INV-2026-001</td>
                <td>PT Sinar Jaya</td>
                <td>Rp 2.500.000</td>
                <td>
                  <span className="badge badge-success">Paid</span>
                </td>
                <td>25 Mei 2026</td>
                <td>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => {
                      showToast('Detail INV-2026-001');
                    }}
                  >
                    Detail
                  </button>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>INV-2026-002</td>
                <td>CV Maju Lancar</td>
                <td>Rp 450.000</td>
                <td>
                  <span className="badge badge-warning">Pending</span>
                </td>
                <td>25 Mei 2026</td>
                <td>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => {
                      showToast('Detail INV-2026-002');
                    }}
                  >
                    Detail
                  </button>
                </td>
              </tr>
              <tr>
                <td>3</td>
                <td>INV-2026-003</td>
                <td>Budi Santoso</td>
                <td>Rp 125.000</td>
                <td>
                  <span className="badge badge-danger">Failed</span>
                </td>
                <td>24 Mei 2026</td>
                <td>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => {
                      showToast('Detail INV-2026-003');
                    }}
                  >
                    Detail
                  </button>
                </td>
              </tr>
              <tr>
                <td>4</td>
                <td>INV-2026-004</td>
                <td>Toko Elektronik ABC</td>
                <td>Rp 3.200.000</td>
                <td>
                  <span className="badge badge-success">Paid</span>
                </td>
                <td>24 Mei 2026</td>
                <td>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => {
                      showToast('Detail INV-2026-004');
                    }}
                  >
                    Detail
                  </button>
                </td>
              </tr>
              <tr>
                <td>5</td>
                <td>INV-2026-005</td>
                <td>CV Berkah Makmur</td>
                <td>Rp 875.000</td>
                <td>
                  <span className="badge badge-warning">Pending</span>
                </td>
                <td>23 Mei 2026</td>
                <td>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => {
                      showToast('Detail INV-2026-005');
                    }}
                  >
                    Detail
                  </button>
                </td>
              </tr>
              <tr>
                <td>6</td>
                <td>INV-2026-006</td>
                <td>PT Indah Permai</td>
                <td>Rp 1.750.000</td>
                <td>
                  <span className="badge badge-gray">Refunded</span>
                </td>
                <td>23 Mei 2026</td>
                <td>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => {
                      showToast('Detail INV-2026-006');
                    }}
                  >
                    Detail
                  </button>
                </td>
              </tr>
              <tr>
                <td>7</td>
                <td>INV-2026-007</td>
                <td>UD Sumber Rejeki</td>
                <td>Rp 5.400.000</td>
                <td>
                  <span className="badge badge-success">Paid</span>
                </td>
                <td>22 Mei 2026</td>
                <td>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => {
                      showToast('Detail INV-2026-007');
                    }}
                  >
                    Detail
                  </button>
                </td>
              </tr>
              <tr>
                <td>8</td>
                <td>INV-2026-008</td>
                <td>CV Karya Mandiri</td>
                <td>Rp 2.100.000</td>
                <td>
                  <span className="badge badge-danger">Failed</span>
                </td>
                <td>22 Mei 2026</td>
                <td>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => {
                      showToast('Detail INV-2026-008');
                    }}
                  >
                    Detail
                  </button>
                </td>
              </tr>
              <tr>
                <td>9</td>
                <td>INV-2026-009</td>
                <td>Ahmad Fauzi</td>
                <td>Rp 340.000</td>
                <td>
                  <span className="badge badge-warning">Pending</span>
                </td>
                <td>21 Mei 2026</td>
                <td>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => {
                      showToast('Detail INV-2026-009');
                    }}
                  >
                    Detail
                  </button>
                </td>
              </tr>
              <tr>
                <td>10</td>
                <td>INV-2026-010</td>
                <td>PT Bumi Sejahtera</td>
                <td>Rp 8.900.000</td>
                <td>
                  <span className="badge badge-success">Paid</span>
                </td>
                <td>21 Mei 2026</td>
                <td>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => {
                      showToast('Detail INV-2026-010');
                    }}
                  >
                    Detail
                  </button>
                </td>
              </tr>
              <tr>
                <td>11</td>
                <td>INV-2026-011</td>
                <td>CV Tunas Bangsa</td>
                <td>Rp 1.200.000</td>
                <td>
                  <span className="badge badge-gray">Refunded</span>
                </td>
                <td>20 Mei 2026</td>
                <td>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => {
                      showToast('Detail INV-2026-011');
                    }}
                  >
                    Detail
                  </button>
                </td>
              </tr>
              <tr>
                <td>12</td>
                <td>INV-2026-012</td>
                <td>PT Global Solusi</td>
                <td>Rp 4.500.000</td>
                <td>
                  <span className="badge badge-success">Paid</span>
                </td>
                <td>20 Mei 2026</td>
                <td>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => {
                      showToast('Detail INV-2026-012');
                    }}
                  >
                    Detail
                  </button>
                </td>
              </tr>
              <tr>
                <td>13</td>
                <td>INV-2026-013</td>
                <td>Rina Wijaya</td>
                <td>Rp 210.000</td>
                <td>
                  <span className="badge badge-warning">Pending</span>
                </td>
                <td>19 Mei 2026</td>
                <td>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => {
                      showToast('Detail INV-2026-013');
                    }}
                  >
                    Detail
                  </button>
                </td>
              </tr>
              <tr>
                <td>14</td>
                <td>INV-2026-014</td>
                <td>CV Sinar Mas</td>
                <td>Rp 650.000</td>
                <td>
                  <span className="badge badge-success">Paid</span>
                </td>
                <td>19 Mei 2026</td>
                <td>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => {
                      showToast('Detail INV-2026-014');
                    }}
                  >
                    Detail
                  </button>
                </td>
              </tr>
              <tr>
                <td>15</td>
                <td>INV-2026-015</td>
                <td>PT Teknologi Nusantara</td>
                <td>Rp 12.000.000</td>
                <td>
                  <span className="badge badge-danger">Failed</span>
                </td>
                <td>18 Mei 2026</td>
                <td>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => {
                      showToast('Detail INV-2026-015');
                    }}
                  >
                    Detail
                  </button>
                </td>
              </tr>
              <tr>
                <td>16</td>
                <td>INV-2026-016</td>
                <td>Dewi Sartika</td>
                <td>Rp 780.000</td>
                <td>
                  <span className="badge badge-warning">Pending</span>
                </td>
                <td>18 Mei 2026</td>
                <td>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => {
                      showToast('Detail INV-2026-016');
                    }}
                  >
                    Detail
                  </button>
                </td>
              </tr>
              <tr>
                <td>17</td>
                <td>INV-2026-017</td>
                <td>CV Mitra Abadi</td>
                <td>Rp 3.600.000</td>
                <td>
                  <span className="badge badge-success">Paid</span>
                </td>
                <td>17 Mei 2026</td>
                <td>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => {
                      showToast('Detail INV-2026-017');
                    }}
                  >
                    Detail
                  </button>
                </td>
              </tr>
              <tr>
                <td>18</td>
                <td>INV-2026-018</td>
                <td>PT Agung Mandiri</td>
                <td>Rp 1.450.000</td>
                <td>
                  <span className="badge badge-gray">Refunded</span>
                </td>
                <td>17 Mei 2026</td>
                <td>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => {
                      showToast('Detail INV-2026-018');
                    }}
                  >
                    Detail
                  </button>
                </td>
              </tr>
              <tr>
                <td>19</td>
                <td>INV-2026-019</td>
                <td>Bambang Susilo</td>
                <td>Rp 920.000</td>
                <td>
                  <span className="badge badge-success">Paid</span>
                </td>
                <td>16 Mei 2026</td>
                <td>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => {
                      showToast('Detail INV-2026-019');
                    }}
                  >
                    Detail
                  </button>
                </td>
              </tr>
              <tr>
                <td>20</td>
                <td>INV-2026-020</td>
                <td>CV Purnama Jaya</td>
                <td>Rp 2.800.000</td>
                <td>
                  <span className="badge badge-warning">Pending</span>
                </td>
                <td>16 Mei 2026</td>
                <td>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => {
                      showToast('Detail INV-2026-020');
                    }}
                  >
                    Detail
                  </button>
                </td>
              </tr>
            </tbody>
          </DataTableBox>
        </div>
      </div>
      <div className="card">
        <div className="card-header">DataTables Initialization</div>
        <div className="card-body">
          <pre className="code-block">
            <code>
              {
                "$(document).ready(function() {\n  $('#datatableExample').DataTable({\n    pageLength: 10,\n    lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, \"All\"]],\n    language: {\n      url: 'https://cdn.datatables.net/plug-ins/2.1.8/i18n/id.json'\n    }\n  });\n});"
              }
            </code>
          </pre>
        </div>
      </div>
    </section>
  );
}
