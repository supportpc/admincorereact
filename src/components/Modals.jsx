import { useAdmin } from './AdminProvider';

export default function Modals() {
  const { modals, closeModal, openUserModal, showToast, userForm, setUserForm, editingUserId, saveUser } = useAdmin();

  const set = (key) => (e) => setUserForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <>
      {/* ---- User modal (create / edit) ---- */}
      <div className={`modal-backdrop${modals.modalUser ? ' show' : ''}`} id="modalUser">
        <div className="modal">
          <div className="modal-header">
            <h3 id="modalUserTitle">{editingUserId !== null ? 'Edit User' : 'Tambah User'}</h3>
            <button onClick={() => closeModal('modalUser')}>
              <i className="fa-solid fa-xmark" />
            </button>
          </div>
          <div className="modal-body">
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Nama Lengkap</label>
                <input className="form-control" id="userNameInput" placeholder="Nama user" value={userForm.name} onChange={set('name')} />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  className="form-control"
                  id="userEmailInput"
                  placeholder="email@example.com"
                  value={userForm.email}
                  onChange={set('email')}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Role</label>
                <select className="form-control" id="userRoleInput" value={userForm.role} onChange={set('role')}>
                  <option>Admin</option>
                  <option>Cashier</option>
                  <option>Operator</option>
                  <option>Super Admin</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Area</label>
                <input
                  className="form-control"
                  id="userAreaInput"
                  placeholder="Opsional / Global"
                  value={userForm.area}
                  onChange={set('area')}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Status</label>
                <select className="form-control" id="userStatusInput" value={userForm.status} onChange={set('status')}>
                  <option>Active</option>
                  <option>Pending</option>
                  <option>Banned</option>
                </select>
              </div>
            </div>
            <div className="alert alert-info">Untuk backend, form ini tinggal dihubungkan ke endpoint create/update user.</div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={() => closeModal('modalUser')}>
              Batal
            </button>
            <button className="btn btn-primary" onClick={saveUser}>
              Simpan
            </button>
          </div>
        </div>
      </div>

      {/* ---- Quick create ---- */}
      <div className={`modal-backdrop${modals.modalQuickCreate ? ' show' : ''}`} id="modalQuickCreate">
        <div className="modal">
          <div className="modal-header">
            <h3>Quick Create</h3>
            <button onClick={() => closeModal('modalQuickCreate')}>
              <i className="fa-solid fa-xmark" />
            </button>
          </div>
          <div className="modal-body">
            <div className="grid-3">
              <button
                className="quick-action"
                onClick={() => {
                  closeModal('modalQuickCreate');
                  openUserModal();
                }}
              >
                <b>
                  <i className="fa-solid fa-user-plus" /> User
                </b>
                <span>›</span>
              </button>
              <button className="quick-action" onClick={() => showToast('Invoice dibuat')}>
                <b>
                  <i className="fa-solid fa-file-invoice-dollar" /> Invoice
                </b>
                <span>›</span>
              </button>
              <button className="quick-action" onClick={() => showToast('Ticket dibuat')}>
                <b>
                  <i className="fa-solid fa-ticket" /> Ticket
                </b>
                <span>›</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ---- Create notification ---- */}
      <div className={`modal-backdrop${modals.modalNotification ? ' show' : ''}`} id="modalNotification">
        <div className="modal">
          <div className="modal-header">
            <h3>Buat Notifikasi</h3>
            <button onClick={() => closeModal('modalNotification')}>
              <i className="fa-solid fa-xmark" />
            </button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Judul</label>
              <input className="form-control" placeholder="Judul notifikasi" />
            </div>
            <div className="form-group">
              <label className="form-label">Target</label>
              <select className="form-control">
                <option>Semua user</option>
                <option>Admin only</option>
                <option>Cashier only</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Pesan</label>
              <textarea className="form-control" rows={4} placeholder="Isi pesan..." />
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={() => closeModal('modalNotification')}>
              Batal
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                closeModal('modalNotification');
                showToast('Notifikasi dikirim');
              }}
            >
              Kirim
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
