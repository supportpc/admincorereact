import { useAdmin } from '@/components/AdminProvider';
import DropzoneBox from '@/components/DropzoneBox';

export default function FileManagerView() {
  const { showToast } = useAdmin();
  return (
    <section id="page-file-manager" className="page-view active">
      <div className="page-head">
        <div>
          <h1 className="page-title">File Manager</h1>
          <p className="page-desc">Template upload dokumen, preview file, progress upload, dan media library.</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => {
            showToast('File picker dibuka');
          }}
        >
          <i className="fa-solid fa-upload" /> Upload File
        </button>
      </div>
      <DropzoneBox id="fileDropzone" className="dropzone mb-6" accepted=".jpg,.jpeg,.png,.pdf,.xlsx,.docx,.doc,.csv">
        <div className="dz-message" data-dz-message="">
          <i className="fa-solid fa-cloud-arrow-up icon-lg mb-3" />
          <h3>Upload dokumen atau gambar</h3>
          <p className="text-sm text-muted mt-2">
            Drag & drop file ke area ini. Cocok untuk avatar, bukti bayar, invoice, dokumen legal, atau media produk.
          </p>
        </div>
      </DropzoneBox>
      <div className="grid-main">
        <div className="card">
          <div className="card-header">Media Library</div>
          <div className="card-body">
            <div className="grid-2">
              <div className="file-card">
                <div className="file-thumb">
                  <i className="fa-solid fa-file-pdf" />
                </div>
                <div style={{ flex: '1' }}>
                  <b>invoice-may.pdf</b>
                  <p className="text-xs text-muted">PDF • 240 KB</p>
                </div>
                <button className="btn btn-secondary btn-sm">View</button>
              </div>
              <div className="file-card">
                <div className="file-thumb">
                  <i className="fa-solid fa-image" />
                </div>
                <div style={{ flex: '1' }}>
                  <b>avatar-admin.png</b>
                  <p className="text-xs text-muted">PNG • 80 KB</p>
                </div>
                <button className="btn btn-secondary btn-sm">View</button>
              </div>
              <div className="file-card">
                <div className="file-thumb">
                  <i className="fa-solid fa-file-excel" />
                </div>
                <div style={{ flex: '1' }}>
                  <b>report.xlsx</b>
                  <p className="text-xs text-muted">XLSX • 1.2 MB</p>
                </div>
                <button className="btn btn-secondary btn-sm">View</button>
              </div>
              <div className="file-card">
                <div className="file-thumb">
                  <i className="fa-solid fa-file-lines" />
                </div>
                <div style={{ flex: '1' }}>
                  <b>contract.docx</b>
                  <p className="text-xs text-muted">DOCX • 530 KB</p>
                </div>
                <button className="btn btn-secondary btn-sm">View</button>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header">Upload Progress</div>
          <div className="card-body">
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <b>evidence-payment.jpg</b>
                <span className="text-sm text-muted">64%</span>
              </div>
              <div className="progress">
                <div className="progress-fill" style={{ width: '64%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <b>merchant-doc.pdf</b>
                <span className="text-sm text-muted">100%</span>
              </div>
              <div className="progress">
                <div className="progress-fill" style={{ width: '100%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
