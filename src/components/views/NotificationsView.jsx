
import { useState } from 'react';
import { useAdmin } from '@/components/AdminProvider';

export default function NotificationsView() {
  const { openModal, showToast } = useAdmin();
  const [filter, setFilter] = useState('all');
  const visible = (type, isNew) => filter === 'all' || (filter === 'unread' && isNew) || filter === type;
  return (
    <section id="page-notifications" className="page-view active">
      <div className="page-head">
        <div>
          <h1 className="page-title">Notifications</h1>
          <p className="page-desc">Notifikasi sistem, broadcast, dan pengumuman internal.</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => {
            openModal('modalNotification');
          }}
        >
          <i className="fa-solid fa-plus" /> Buat Notifikasi
        </button>
      </div>
      <div className="page-filter-bar" style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
        <button
          className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
          id="notifFilterAll"
          onClick={() => setFilter('all')}
        >
          Semua
        </button>
        <button
          className={`btn ${filter === 'unread' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
          id="notifFilterUnread"
          onClick={() => setFilter('unread')}
        >
          Belum Dibaca
        </button>
        <button
          className={`btn ${filter === 'info' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
          id="notifFilterInfo"
          onClick={() => setFilter('info')}
        >
          Info
        </button>
        <button
          className={`btn ${filter === 'alert' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
          id="notifFilterAlert"
          onClick={() => setFilter('alert')}
        >
          Peringatan
        </button>
      </div>
      <div id="notificationList">
        <div className="notif-card" data-type="info" style={{ display: visible('info', true) ? 'flex' : 'none' }}>
          <div className="notif-icon info">
            <i className="fa-solid fa-circle-info" />
          </div>
          <div className="notif-body">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <b>Sistem Update v2.4.1 Tersedia</b>
              <span className="notif-time">5 menit lalu</span>
            </div>
            <p>Pembaruan sistem mencakup perbaikan bug keamanan dan peningkatan performa pada modul transaksi.</p>
            <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
              <span className="notif-badge new">Baru</span>
              <span className="notif-badge info">Update</span>
            </div>
          </div>
        </div>
        <div className="notif-card" data-type="alert" style={{ display: visible('alert', false) ? 'flex' : 'none' }}>
          <div className="notif-icon error">
            <i className="fa-solid fa-triangle-exclamation" />
          </div>
          <div className="notif-body">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <b>Maintenance Terjadwal</b>
              <span className="notif-time">1 jam lalu</span>
            </div>
            <p>Sistem akan menjalani maintenance pada pukul 23:00 - 02:00 WIB. Semua layanan tidak tersedia sementara.</p>
            <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
              <span className="notif-badge urgent">Urgent</span>
            </div>
          </div>
        </div>
        <div className="notif-card" data-type="info" style={{ display: visible('info', false) ? 'flex' : 'none' }}>
          <div className="notif-icon success">
            <i className="fa-solid fa-check-circle" />
          </div>
          <div className="notif-body">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <b>120 Notifikasi Berhasil Dikirim</b>
              <span className="notif-time">3 jam lalu</span>
            </div>
            <p>Broadcast notifikasi promo akhir bulan ke seluruh user berhasil dikirim tanpa kendala.</p>
            <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
              <span className="notif-badge info">Sistem</span>
            </div>
          </div>
        </div>
        <div className="notif-card" data-type="alert" style={{ display: visible('alert', false) ? 'flex' : 'none' }}>
          <div className="notif-icon warning">
            <i className="fa-solid fa-exclamation" />
          </div>
          <div className="notif-body">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <b>Peringatan Kuota Storage</b>
              <span className="notif-time">5 jam lalu</span>
            </div>
            <p>Storage server telah terisi 78%. Segera lakukan upgrade paket untuk menghindari gangguan layanan.</p>
            <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
              <span className="notif-badge warning">Storage</span>
            </div>
          </div>
        </div>
        <div className="notif-card" data-type="info" style={{ display: visible('info', true) ? 'flex' : 'none' }}>
          <div className="notif-icon bell">
            <i className="fa-solid fa-bell" />
          </div>
          <div className="notif-body">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <b>Selamat Datang di NusaCore!</b>
              <span className="notif-time">1 hari lalu</span>
            </div>
            <p>Terima kasih telah menggunakan template admin panel. Jelajahi semua fitur yang tersedia di sidebar.</p>
            <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
              <span className="notif-badge new">Baru</span>
            </div>
          </div>
        </div>
        <div className="notif-card" data-type="info" style={{ display: visible('info', false) ? 'flex' : 'none' }}>
          <div className="notif-icon error">
            <i className="fa-solid fa-user-lock" />
          </div>
          <div className="notif-body">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <b>5 Percobaan Login Mencurigakan</b>
              <span className="notif-time">1 hari lalu</span>
            </div>
            <p>Terdeteksi 5 percobaan login gagal dari IP 114.10.10.7. Akun terkait telah dikunci sementara.</p>
            <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
              <span className="notif-badge urgent">Security</span>
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
        <button
          className="btn btn-secondary"
          onClick={() => {
            showToast('Memuat notifikasi lama...');
          }}
        >
          Muat Lebih Banyak
        </button>
      </div>
    </section>
  );
}
