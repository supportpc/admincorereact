
import { useAdmin } from '@/components/AdminProvider';
import CleaveInput from '@/components/CleaveInput';
import DropzoneBox from '@/components/DropzoneBox';
import QuillEditor from '@/components/QuillEditor';

export default function AdvancedFormsView() {
  const { showToast } = useAdmin();
  return (
    <section id="page-advanced-forms" className="page-view active">
      <div className="page-head">
        <div>
          <h1 className="page-title">Advanced Forms</h1>
          <p className="page-desc">
            Komponen form lanjutan: currency, phone, date range, tag input, file upload, validation state, dan rich textarea.
          </p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => {
            showToast('Advanced form saved');
          }}
        >
          Simpan Form
        </button>
      </div>
      <div className="card">
        <div className="card-body">
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Currency Input (Cleave.js)</label>
              <CleaveInput className="form-control currency-input" kind="currency" defaultValue="1250000" />
            </div>
            <div className="form-group">
              <label className="form-label">Phone Input (Cleave.js)</label>
              <CleaveInput className="form-control phone-input" kind="phone" defaultValue="6281200000000" />
            </div>
            <div className="form-group">
              <label className="form-label">Date Input (Cleave.js)</label>
              <CleaveInput className="form-control date-input" kind="date" defaultValue="2026-05-25" />
            </div>
            <div className="form-group">
              <label className="form-label">Multi Select Mockup</label>
              <select className="form-control">
                <option>Admin, Operator, Cashier</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Success State</label>
              <input className="form-control validation-success" defaultValue="Valid input" />
              <p className="form-help" style={{ color: 'var(--success)' }}>
                Input valid dan siap disimpan.
              </p>
            </div>
            <div className="form-group">
              <label className="form-label">Error State</label>
              <input className="form-control validation-error" defaultValue="invalid-email" />
              <p className="form-help" style={{ color: 'var(--danger)' }}>
                Format email tidak valid.
              </p>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Tag Input</label>
            <div className="tag-input">
              <span className="tag">
                Finance <i className="fa-solid fa-xmark" />
              </span>
              <span className="tag">
                Priority <i className="fa-solid fa-xmark" />
              </span>
              <span className="tag">
                Internal <i className="fa-solid fa-xmark" />
              </span>
              <input
                style={{ border: '0', outline: '0', flex: '1', background: 'transparent', color: 'var(--text-main)' }}
                placeholder="Tambah tag..."
              />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Rich Text Editor (Quill.js)</label>
            <QuillEditor id="quillEditor" style={{ height: '200px', marginBottom: '12px', borderRadius: '12px' }} />
          </div>
          <DropzoneBox id="advFormDropzone" className="dropzone" accepted=".jpg,.jpeg,.png,.pdf,.xlsx,.docx">
            <div className="dz-message" data-dz-message="">
              <i className="fa-solid fa-cloud-arrow-up icon-lg mb-3" />
              <h3>Drag & drop file di sini</h3>
              <p className="text-sm text-muted mt-2">Atau klik untuk memilih file. Support JPG, PNG, PDF, XLSX.</p>
            </div>
          </DropzoneBox>
        </div>
      </div>
    </section>
  );
}
