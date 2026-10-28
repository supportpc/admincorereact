
import { useState } from 'react';
import { useAdmin } from '@/components/AdminProvider';

export default function SettingsView() {
  const { setTheme, showToast, theme } = useAdmin();
  const [tab, setTab] = useState('general');
  return (
    <section id="page-settings" className="page-view active">
      <div className="page-head">
        <div>
          <h1 className="page-title">Settings</h1>
          <p className="page-desc">Pengaturan umum aplikasi, keamanan, email, dan preferensi UI.</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => {
            showToast('Settings disimpan');
          }}
        >
          Simpan
        </button>
      </div>
      <div className="tabs">
        <button className={`tab-btn${tab === 'general' ? ' active' : ''}`} onClick={() => setTab('general')}>
          General
        </button>
        <button className={`tab-btn${tab === 'security' ? ' active' : ''}`} onClick={() => setTab('security')}>
          Security
        </button>
        <button className={`tab-btn${tab === 'email' ? ' active' : ''}`} onClick={() => setTab('email')}>
          Email
        </button>
        <button className={`tab-btn${tab === 'appearance' ? ' active' : ''}`} onClick={() => setTab('appearance')}>
          Appearance
        </button>
      </div>
      <div className={`card settings-tab${tab === 'general' ? '' : ' hidden'}`} id="tab-general">
        <div className="card-header">General Settings</div>
        <div className="card-body">
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Nama Aplikasi</label>
              <input className="form-control" defaultValue="ReactCore" />
            </div>
            <div className="form-group">
              <label className="form-label">Timezone</label>
              <select className="form-control">
                <option>Asia/Jakarta</option>
                <option>UTC</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Deskripsi</label>
            <textarea className="form-control" rows="3" defaultValue={'Complete admin panel untuk kebutuhan operasional.'} />
          </div>
        </div>
      </div>
      <div className={`card settings-tab${tab === 'security' ? '' : ' hidden'}`} id="tab-security">
        <div className="card-header">Security</div>
        <div className="card-body">
          <div className="quick-action">
            <div>
              <b>Two Factor Authentication</b>
              <p className="text-xs text-muted">Wajibkan 2FA untuk semua admin.</p>
            </div>
            <label className="switch">
              <input type="checkbox" defaultChecked />
              <span className="slider" />
            </label>
          </div>
          <div className="quick-action">
            <div>
              <b>Session Timeout</b>
              <p className="text-xs text-muted">Logout otomatis jika idle.</p>
            </div>
            <select className="form-control" style={{ width: '160px' }}>
              <option>30 menit</option>
              <option>1 jam</option>
            </select>
          </div>
        </div>
      </div>
      <div className={`card settings-tab${tab === 'email' ? '' : ' hidden'}`} id="tab-email">
        <div className="card-header">Email SMTP</div>
        <div className="card-body">
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">SMTP Host</label>
              <input className="form-control" placeholder="smtp.example.com" />
            </div>
            <div className="form-group">
              <label className="form-label">SMTP Port</label>
              <input className="form-control" defaultValue="587" />
            </div>
            <div className="form-group">
              <label className="form-label">Username</label>
              <input className="form-control" />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" />
            </div>
          </div>
        </div>
      </div>
      <div className={`card settings-tab${tab === 'appearance' ? '' : ' hidden'}`} id="tab-appearance">
        <div className="card-header">Appearance</div>
        <div className="card-body">
          <div className="quick-action">
            <div>
              <b>Dark Mode</b>
              <p className="text-xs text-muted">Ubah tampilan admin panel menjadi gelap atau terang.</p>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                id="appearanceThemeSwitch"
                checked={theme === 'dark'}
                onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
              />
              <span className="slider" />
            </label>
          </div>
          <div className="quick-action">
            <div>
              <b>Compact Table</b>
              <p className="text-xs text-muted">Tampilkan data lebih rapat.</p>
            </div>
            <label className="switch">
              <input type="checkbox" />
              <span className="slider" />
            </label>
          </div>
          <div className="quick-action">
            <div>
              <b>Sidebar Collapsed by Default</b>
              <p className="text-xs text-muted">Simpan preferensi sidebar.</p>
            </div>
            <label className="switch">
              <input type="checkbox" />
              <span className="slider" />
            </label>
          </div>
        </div>
      </div>
    </section>
  );
}
