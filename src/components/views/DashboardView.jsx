import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useAdmin } from '../AdminProvider';

function RevenueChart() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const chart = new Chart(canvasRef.current, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
        datasets: [
          {
            label: 'Revenue',
            data: [12, 16.5, 10.5, 21, 25.5, 18],
            backgroundColor: 'rgba(37, 99, 235, 0.7)',
            borderColor: 'rgba(37, 99, 235, 1)',
            borderWidth: 1,
            borderRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: 'rgba(0,0,0,0.06)' },
            ticks: { callback: (v) => 'Rp ' + v + 'jt' },
          },
          x: { grid: { display: false } },
        },
      },
    });
    return () => chart.destroy();
  }, []);

  return (
    <div style={{ position: 'relative', height: 220, width: '100%' }}>
      <canvas id="revenueChart" ref={canvasRef} />
    </div>
  );
}

const stats = [
  { title: 'Total User', value: '12.450', icon: 'fa-users', color: 'blue', up: true, trend: '15%' },
  { title: 'Revenue', value: 'Rp 45,2jt', icon: 'fa-money-bill-trend-up', color: 'green', up: true, trend: '8,2%' },
  { title: 'Active Sessions', value: '3.124', icon: 'fa-eye', color: 'orange', up: false, trend: '2,1%' },
  { title: 'Conversion', value: '4,8%', icon: 'fa-chart-simple', color: 'purple', up: true, trend: '1,2%' },
];

const activities = [
  { dot: undefined, title: 'User baru terdaftar', meta: '5 menit lalu • Jane Smith' },
  { dot: 'var(--success)', title: 'Pembayaran berhasil', meta: '1 jam lalu • INV-1234' },
  { dot: 'var(--warning)', title: 'Role kasir diubah', meta: 'Kemarin • Super Admin' },
  { dot: 'var(--danger)', title: 'Login gagal 5x', meta: '2 hari lalu • 103.88.xxx' },
];

export default function DashboardView() {
  const { openModal, openUserModal, showToast, goTo } = useAdmin();

  return (
    <section id="page-dashboard" className="page-view active">
      <div className="page-head">
        <div>
          <h1 className="page-title">Dashboard Overview</h1>
          <p className="page-desc">Ringkasan performa sistem, aktivitas terbaru, dan shortcut operasional.</p>
        </div>
        <button className="btn btn-primary" onClick={() => openModal('modalQuickCreate')}>
          + Quick Create
        </button>
      </div>

      <div className="grid-4 mb-6">
        {stats.map((s) => (
          <div className="stat-card" key={s.title}>
            <div className="stat-header">
              <div>
                <div className="stat-title">{s.title}</div>
                <div className="stat-value">{s.value}</div>
              </div>
              <div className={`stat-icon ${s.color}`}>
                <i className={`fa-solid ${s.icon}`} />
              </div>
            </div>
            <div className="stat-trend">
              <span className={s.up ? 'trend-up' : 'trend-down'}>
                {s.up ? '▲' : '▼'} {s.trend}
              </span>{' '}
              vs bulan lalu
            </div>
          </div>
        ))}
      </div>

      <div className="grid-main mb-6">
        <div className="card">
          <div className="card-header">
            Revenue Overview
            <select className="form-control" style={{ width: 145 }} defaultValue="6 bulan">
              <option>6 bulan</option>
              <option>12 bulan</option>
            </select>
          </div>
          <div className="card-body">
            <p className="text-sm text-muted">Grafik revenue 6 bulan terakhir (Chart.js).</p>
            <RevenueChart />
          </div>
        </div>

        <div className="card">
          <div className="card-header">Recent Activity</div>
          <div className="card-body">
            <div className="activity-list">
              {activities.map((a) => (
                <div className="activity-item" key={a.title}>
                  <div className="activity-dot" style={a.dot ? { background: a.dot } : undefined} />
                  <div>
                    <p className="font-bold text-sm">{a.title}</p>
                    <span className="text-xs text-muted">{a.meta}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid-3">
        <div className="quick-action">
          <div>
            <b>Tambah User</b>
            <p className="text-xs text-muted">Buat akun admin/staff</p>
          </div>
          <button className="btn btn-primary btn-sm" onClick={() => openUserModal()}>
            Buka
          </button>
        </div>
        <div className="quick-action">
          <div>
            <b>Export Laporan</b>
            <p className="text-xs text-muted">CSV / Excel dummy</p>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={() => showToast('Laporan diexport')}>
            Export
          </button>
        </div>
        <div className="quick-action">
          <div>
            <b>Cek Audit</b>
            <p className="text-xs text-muted">Riwayat aktivitas</p>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={() => goTo('page-audit')}>
            Lihat
          </button>
        </div>
      </div>
    </section>
  );
}
