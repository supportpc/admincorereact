import { useState } from 'react';
import { useAdmin } from '@/components/AdminProvider';

export default function OnboardingView() {
  const { showToast } = useAdmin();
  const [step, setStep] = useState(0);
  const next = () => (step < 3 ? setStep(step + 1) : showToast('Onboarding selesai'));
  const prev = () => (step > 0 ? setStep(step - 1) : showToast('Sudah di step pertama'));
  const reset = () => {
    setStep(0);
    showToast('Wizard direset');
  };
  return (
    <section id="page-onboarding" className="page-view active">
      <div className="page-head">
        <div>
          <h1 className="page-title">Onboarding Wizard</h1>
          <p className="page-desc">Wizard setup awal aplikasi dalam 4 langkah.</p>
        </div>
        <button className="btn btn-secondary" onClick={reset}>
          <i className="fa-solid fa-rotate-left" /> Reset
        </button>
      </div>
      <div className="wizard-steps">
        <div className={`wizard-step${step === 0 ? ' active' : ''}${step > 0 ? ' done' : ''}`}>
          <div className="wizard-number">1</div>
          <div>
            <b>Welcome</b>
          </div>
        </div>
        <div className={`wizard-step${step === 1 ? ' active' : ''}${step > 1 ? ' done' : ''}`}>
          <div className="wizard-number">2</div>
          <div>
            <b>Workspace</b>
          </div>
        </div>
        <div className={`wizard-step${step === 2 ? ' active' : ''}${step > 2 ? ' done' : ''}`}>
          <div className="wizard-number">3</div>
          <div>
            <b>Team</b>
          </div>
        </div>
        <div className={`wizard-step${step === 3 ? ' active' : ''}${step > 3 ? ' done' : ''}`}>
          <div className="wizard-number">4</div>
          <div>
            <b>Selesai</b>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <div className={`wizard-panel${step === 0 ? ' active' : ''}`}>
            <div>
              <h2 className="mb-2">Selamat datang</h2>
              <p className="text-muted mb-4">Siapkan workspace kamu dalam 4 langkah mudah.</p>
              <div className="grid-3">
                <div className="setup-card">
                  <div className="setup-icon">
                    <i className="fa-solid fa-building" />
                  </div>
                  <b>Bisnis</b>
                  <p className="text-sm text-muted mt-2">Nama, kategori, timezone, currency.</p>
                </div>
                <div className="setup-card">
                  <div className="setup-icon">
                    <i className="fa-solid fa-users-gear" />
                  </div>
                  <b>Team</b>
                  <p className="text-sm text-muted mt-2">Invite admin, operator, staff.</p>
                </div>
                <div className="setup-card">
                  <div className="setup-icon">
                    <i className="fa-solid fa-sliders" />
                  </div>
                  <b>Preferensi</b>
                  <p className="text-sm text-muted mt-2">Mode tampilan, notifikasi, security.</p>
                </div>
              </div>
            </div>
          </div>
          <div className={`wizard-panel${step === 1 ? ' active' : ''}`}>
            <h2 className="mb-4">Workspace</h2>
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Nama Bisnis</label>
                <input className="form-control" placeholder="Cth: Toko Komputer Jaya" />
              </div>
              <div className="form-group">
                <label className="form-label">Kategori</label>
                <select className="form-control">
                  <option>Retail / POS</option>
                  <option>Jasa / Service</option>
                  <option>Sekolah</option>
                  <option>Finance</option>
                  <option>PPOB</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Timezone</label>
                <select className="form-control">
                  <option>Asia/Jakarta</option>
                  <option>Asia/Makassar</option>
                  <option>Asia/Jayapura</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Currency</label>
                <select className="form-control">
                  <option>IDR - Rupiah</option>
                  <option>USD - Dollar</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Alamat</label>
              <textarea className="form-control" rows="3" placeholder="Alamat workspace" />
            </div>
          </div>
          <div className={`wizard-panel${step === 2 ? ' active' : ''}`}>
            <h2 className="mb-4">Team & Akses</h2>
            <div className="grid-2">
              <div className="setup-card">
                <b>Owner</b>
                <p className="text-sm text-muted mt-2">Akses penuh ke semua menu.</p>
                <input className="form-control mt-2" placeholder="owner@example.com" />
              </div>
              <div className="setup-card">
                <b>Admin</b>
                <p className="text-sm text-muted mt-2">Kelola data, transaksi, laporan.</p>
                <input className="form-control mt-2" placeholder="admin@example.com" />
              </div>
              <div className="setup-card">
                <b>Staff</b>
                <p className="text-sm text-muted mt-2">Akses transaksi terbatas.</p>
                <input className="form-control mt-2" placeholder="staff@example.com" />
              </div>
              <div className="setup-card">
                <b>Permission</b>
                <p className="text-sm text-muted mt-2">Preset role preference.</p>
                <select className="form-control mt-2">
                  <option>Balanced</option>
                  <option>Strict</option>
                  <option>Open Internal</option>
                </select>
              </div>
            </div>
          </div>
          <div className={`wizard-panel${step === 3 ? ' active' : ''}`}>
            <div className="empty-state">
              <div className="setup-icon" style={{ margin: '0 auto 14px' }}>
                <i className="fa-solid fa-circle-check" />
              </div>
              <h2>Hampir selesai</h2>
              <p className="text-muted mt-2">Review konfigurasi workspace kamu.</p>
              <div className="grid-3 mt-2">
                <div className="setup-card">
                  <b>Workspace</b>
                  <p className="text-sm text-muted mt-2">Toko Komputer Jaya</p>
                </div>
                <div className="setup-card">
                  <b>Plan</b>
                  <p className="text-sm text-muted mt-2">Starter</p>
                </div>
                <div className="setup-card">
                  <b>Security</b>
                  <p className="text-sm text-muted mt-2">2FA optional</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <button className="btn btn-secondary" onClick={prev}>
            <i className="fa-solid fa-arrow-left" /> Back
          </button>
          <button className="btn btn-primary" onClick={next}>
            Next <i className="fa-solid fa-arrow-right" />
          </button>
        </div>
      </div>
    </section>
  );
}
