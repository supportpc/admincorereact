import { useEffect } from 'react';

// Confirm-delete popup. Props mirror the original React-Bootstrap one:
// show / onHide / onConfirm / productName  (+ optional count for bulk delete)
export default function ConfirmDeleteModal({ show, onHide, onConfirm, productName, count }) {
  useEffect(() => {
    if (!show) return;
    const onKey = (e) => e.key === 'Escape' && onHide();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [show, onHide]);

  const bulk = count && count > 1;

  return (
    <div className={`modal-backdrop${show ? ' show' : ''}`} onClick={(e) => e.target === e.currentTarget && onHide()}>
      <div className="modal" style={{ borderTop: '4px solid var(--danger)', width: 'min(450px,100%)' }}>
        <div className="modal-header">
          <h3 style={{ color: 'var(--danger)' }}>{bulk ? 'Hapus Beberapa Data' : 'Hapus Data'}</h3>
          <button onClick={onHide}>
            <i className="fa-solid fa-xmark" />
          </button>
        </div>
        <div className="modal-body">
          <div className="flex items-center gap-3">
            <i className="fa-solid fa-triangle-exclamation" style={{ fontSize: 28, color: 'var(--danger)', flexShrink: 0 }} />
            <p className="text-sm">
              {bulk ? (
                <>
                  Anda akan menghapus <b>{count} produk</b> terpilih.
                </>
              ) : (
                <>
                  Anda akan menghapus <b>{productName}</b>.
                </>
              )}{' '}
              Data yang sudah dihapus tidak dapat dikembalikan.
            </p>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onHide}>
            Batal
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            <i className="fa-solid fa-trash" /> Ya, Hapus
          </button>
        </div>
      </div>
    </div>
  );
}
