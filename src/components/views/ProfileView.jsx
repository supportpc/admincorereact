import { useAdmin } from '@/components/AdminProvider';

export default function ProfileView() {
  const { showToast } = useAdmin();
  return (
    <section id="page-profile" className="page-view active">
      <div className="page-head">
        <div>
          <h1 className="page-title">Profile</h1>
          <p className="page-desc">Data profil admin dan preferensi akun.</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => {
            showToast('Profile updated');
          }}
        >
          Update Profile
        </button>
      </div>
      <div className="grid-main">
        <div className="card">
          <div className="profile-cover" />
          <div className="profile-card">
            <div className="profile-big-avatar">AU</div>
            <h2 className="mt-2">Admin User</h2>
            <p className="text-muted text-sm">admin@example.com • Super Admin</p>
          </div>
          <div className="card-body">
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Nama</label>
                <input className="form-control" defaultValue="Admin User" />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input className="form-control" defaultValue="admin@example.com" />
              </div>
              <div className="form-group">
                <label className="form-label">Phone</label>
                <input className="form-control" defaultValue="+62 812 0000 0000" />
              </div>
              <div className="form-group">
                <label className="form-label">Role</label>
                <input className="form-control" defaultValue="Super Admin" disabled />
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header">Account Security</div>
          <div className="card-body">
            <button className="btn btn-secondary w-full mb-3">Change Password</button>
            <button className="btn btn-secondary w-full mb-3">Manage Sessions</button>
            <button className="btn btn-danger w-full">Logout All Devices</button>
          </div>
        </div>
      </div>
    </section>
  );
}
