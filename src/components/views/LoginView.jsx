
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginView() {
  const navigate = useNavigate();
  const [toast, setToast] = useState({ msg: '', show: false });
  const timer = useRef(null);

  const showToast = (msg) => {
    clearTimeout(timer.current);
    setToast({ msg, show: true });
    timer.current = setTimeout(() => setToast((t) => ({ ...t, show: false })), 2200);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-brand">
          <div className="brand-icon">
            <i className="fa-solid fa-cube" />
          </div>
          <h1>NusaCore</h1>
          <p>Panel administrasi all-in-one untuk kelola user, transaksi, laporan, dan pengaturan sistem.</p>
          <div className="brand-features">
            <span>
              <i className="fa-solid fa-check-circle" /> Manajemen User &amp; Role
            </span>
            <span>
              <i className="fa-solid fa-check-circle" /> Monitoring Transaksi Real-time
            </span>
            <span>
              <i className="fa-solid fa-check-circle" /> Laporan &amp; Audit Trail
            </span>
            <span>
              <i className="fa-solid fa-check-circle" /> Multi-level Permission
            </span>
          </div>
        </div>
        <div className="login-form">
          <h2>Sign in</h2>
          <p className="form-subtitle">Masuk ke admin panel Anda</p>

          <div className="social-login">
            <button className="btn btn-secondary" onClick={() => showToast('Google login')}>
              <i className="fa-brands fa-google" /> Google
            </button>
            <button className="btn btn-secondary" onClick={() => showToast('GitHub login')}>
              <i className="fa-brands fa-github" /> GitHub
            </button>
          </div>

          <div className="auth-divider">atau login dengan email</div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-control" type="email" placeholder="admin@example.com" autoComplete="email" />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input className="form-control" type="password" placeholder="••••••••" autoComplete="current-password" />
          </div>

          <label className="form-check">
            <input className="form-check-input" type="checkbox" defaultChecked />
            <span className="form-check-label">Remember me</span>
          </label>

          <button className="btn btn-primary login-btn" onClick={() => navigate('/dashboard')}>
            Login ke Dashboard
          </button>

          <div className="form-footer">
            <a href="#">Lupa password?</a>
            <a href="#">Buat akun baru</a>
          </div>
        </div>
      </div>
      <div className={`toast${toast.show ? ' show' : ''}`} id="toast">
        {toast.msg}
      </div>
    </div>
  );
}
