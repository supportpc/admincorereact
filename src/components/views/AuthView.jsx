
import { useState } from 'react';
import { useAdmin } from '@/components/AdminProvider';
import AuthForm from '@/components/AuthForms';

export default function AuthView() {
  const { showToast } = useAdmin();
  const [auth, setAuth] = useState('login');
  return (
    <section id="page-auth" className="page-view active">
      <div className="page-head">
        <div>
          <h1 className="page-title">Authentication Pages</h1>
          <p className="page-desc">Template halaman login, register, forgot password, reset password, 2FA, dan email verification.</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => {
            showToast('Auth page preview siap');
          }}
        >
          <i className="fa-solid fa-shield-keyhole" /> Auth Ready
        </button>
      </div>
      <div className="auth-screen-tabs">
        <button className={`auth-screen-btn${auth === 'login' ? ' active' : ''}`} onClick={() => setAuth('login')}>
          Login
        </button>{' '}
        <button className={`auth-screen-btn${auth === 'register' ? ' active' : ''}`} onClick={() => setAuth('register')}>
          Register
        </button>{' '}
        <button className={`auth-screen-btn${auth === 'forgot' ? ' active' : ''}`} onClick={() => setAuth('forgot')}>
          Forgot Password
        </button>{' '}
        <button className={`auth-screen-btn${auth === 'reset' ? ' active' : ''}`} onClick={() => setAuth('reset')}>
          Reset Password
        </button>{' '}
        <button className={`auth-screen-btn${auth === 'twofa' ? ' active' : ''}`} onClick={() => setAuth('twofa')}>
          2FA
        </button>{' '}
        <button className={`auth-screen-btn${auth === 'verify' ? ' active' : ''}`} onClick={() => setAuth('verify')}>
          Verify Email
        </button>
      </div>
      <div className="auth-preview">
        <div className="auth-brand">
          <div>
            <div className="logo-icon mb-4">A</div>
            <h2>Secure Admin Access</h2>
            <p>Area authentication untuk admin panel. Gunakan sebagai referensi layout sebelum masuk ke aplikasi utama.</p>
          </div>
          <div>
            <p>
              <i className="fa-solid fa-lock" /> Protected session
            </p>
            <p>
              <i className="fa-solid fa-fingerprint" /> 2FA supported
            </p>
            <p>
              <i className="fa-solid fa-envelope-circle-check" /> Email verification flow
            </p>
          </div>
        </div>
        <div className="auth-form" id="authPreviewArea">
          <AuthForm type={auth} setType={setAuth} />
        </div>
      </div>
      <div className="grid-3 mt-2">
        <div className="integration-note">
          <b>Login Flow</b>
          <p className="text-sm text-muted mt-2">Email/password → validasi → optional 2FA → redirect dashboard.</p>
        </div>
        <div className="integration-note">
          <b>Register Flow</b>
          <p className="text-sm text-muted mt-2">Buat akun → verify email → setup workspace → pilih role awal.</p>
        </div>
        <div className="integration-note">
          <b>Security Flow</b>
          <p className="text-sm text-muted mt-2">Rate limit login, lock account, remember me, revoke session.</p>
        </div>
      </div>
    </section>
  );
}
