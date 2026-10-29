import { useAdmin } from './AdminProvider';

// The 6 auth screens that app.js rendered via authTemplates[...]
export default function AuthForm({ type, setType }) {
  const { showToast } = useAdmin();

  switch (type) {
    case 'register':
      return (
        <>
          <h3>Create account</h3>
          <p className="text-sm text-muted mb-4">Daftar akun baru untuk mulai menggunakan admin panel.</p>
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Nama</label>
              <input className="form-control" placeholder="Nama lengkap" />
            </div>
            <div className="form-group">
              <label className="form-label">Bisnis</label>
              <input className="form-control" placeholder="Nama bisnis" />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-control" placeholder="owner@example.com" />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" placeholder="Minimal 8 karakter" />
          </div>
          <label className="form-check mb-4">
            <input className="form-check-input" type="checkbox" /> Saya setuju dengan terms &amp; privacy policy
          </label>
          <button className="btn btn-primary w-full" onClick={() => showToast('Register submitted')}>
            Register
          </button>
        </>
      );
    case 'forgot':
      return (
        <>
          <h3>Forgot password</h3>
          <p className="text-sm text-muted mb-4">Masukkan email, sistem akan mengirim link reset password.</p>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input className="form-control" placeholder="email@example.com" />
          </div>
          <button className="btn btn-primary w-full" onClick={() => showToast('Reset link dikirim')}>
            Send reset link
          </button>
          <button className="btn btn-secondary w-full mt-2" onClick={() => setType('login')}>
            Back to login
          </button>
        </>
      );
    case 'reset':
      return (
        <>
          <h3>Reset password</h3>
          <p className="text-sm text-muted mb-4">Buat password baru untuk akun Anda.</p>
          <div className="form-group">
            <label className="form-label">New Password</label>
            <input type="password" className="form-control" placeholder="Password baru" />
          </div>
          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input type="password" className="form-control" placeholder="Ulangi password" />
          </div>
          <button className="btn btn-primary w-full" onClick={() => showToast('Password direset')}>
            Update password
          </button>
        </>
      );
    case 'twofa':
      return (
        <>
          <h3>Two-factor verification</h3>
          <p className="text-sm text-muted mb-4">Masukkan 6 digit kode dari authenticator app atau email.</p>
          <div className="grid-3">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <input key={i} className="form-control" maxLength={1} placeholder="0" />
            ))}
          </div>
          <button className="btn btn-primary w-full mt-2" onClick={() => showToast('2FA verified')}>
            Verify
          </button>
          <button className="btn btn-secondary w-full mt-2">Use recovery code</button>
        </>
      );
    case 'verify':
      return (
        <>
          <h3>Verify your email</h3>
          <p className="text-sm text-muted mb-4">
            Kami sudah mengirim link verifikasi ke email Anda. Klik link tersebut untuk mengaktifkan akun.
          </p>
          <div className="empty-state">
            <div className="setup-icon" style={{ margin: '0 auto 14px' }}>
              <i className="fa-solid fa-envelope-circle-check" />
            </div>
            <b>Cek inbox atau folder spam</b>
            <p className="text-sm text-muted mt-2">Link biasanya aktif selama 30 menit.</p>
          </div>
          <button className="btn btn-primary w-full" onClick={() => showToast('Email verifikasi dikirim ulang')}>
            Resend verification email
          </button>
        </>
      );
    case 'login':
    default:
      return (
        <>
          <h3>Sign in</h3>
          <p className="text-sm text-muted mb-4">Masuk ke admin panel Anda.</p>
          <div className="social-login mb-3">
            <button className="btn btn-secondary">
              <i className="fa-brands fa-google" /> Google
            </button>
            <button className="btn btn-secondary">
              <i className="fa-brands fa-github" /> GitHub
            </button>
          </div>
          <div className="auth-divider">atau</div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-control" placeholder="admin@example.com" />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" placeholder="••••••••" />
          </div>
          <div className="flex justify-between items-center mb-4">
            <label className="form-check">
              <input className="form-check-input" type="checkbox" /> Remember me
            </label>
            <a
              className="text-sm"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setType('forgot');
              }}
            >
              Lupa password?
            </a>
          </div>
          <button className="btn btn-primary w-full" onClick={() => showToast('Login submitted')}>
            Login
          </button>
        </>
      );
  }
}
