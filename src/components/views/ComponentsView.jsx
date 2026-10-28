
import { AlertDemoCard, DateRangeCard, ColorPickerCard, RangeSliderCard, TabsCard } from '@/components/ComponentsDemos';

export default function ComponentsView() {
  return (
    <section id="page-components" className="page-view active">
      <div className="page-head">
        <div>
          <h1 className="page-title">UI Components</h1>
          <p className="page-desc">Koleksi komponen UI siap pakai untuk admin panel.</p>
        </div>
      </div>
      <div className="component-group">
        <div className="grid-2">
          <div className="card">
            <div className="card-header">Buttons</div>
            <div className="card-body flex gap-2" style={{ flexWrap: 'wrap' }}>
              <button className="btn btn-primary">Primary</button>
              <button className="btn btn-secondary">Secondary</button>
              <button className="btn btn-success">Success</button>
              <button className="btn btn-warning">Warning</button>
              <button className="btn btn-danger">Danger</button>
              <button className="btn btn-outline">Outline</button>
              <button className="btn btn-primary btn-sm">Small</button>
              <button className="btn btn-secondary btn-icon">
                <i className="fa-solid fa-plus" />
              </button>
            </div>
          </div>
          <div className="card">
            <div className="card-header">Badges</div>
            <div className="card-body flex gap-2" style={{ flexWrap: 'wrap' }}>
              <span className="badge badge-primary">Primary</span>
              <span className="badge badge-success">Success</span>
              <span className="badge badge-warning">Pending</span>
              <span className="badge badge-danger">Failed</span>
              <span className="badge badge-gray">Draft</span>
              <span className="badge badge-purple">Premium</span>
              <span className="badge badge-primary" style={{ borderRadius: '99px' }}>
                Pill
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="component-group">
        <AlertDemoCard />
      </div>
      <div className="component-group">
        <div className="grid-2">
          <div className="card">
            <div className="card-header">Toggle Switch</div>
            <div className="card-body">
              <div className="toggle-wrap mb-3">
                <input type="checkbox" id="tog1" />
                <label className="toggle-slider" htmlFor="tog1" />
                <span>Notifications</span>
              </div>
              <div className="toggle-wrap mb-3">
                <input type="checkbox" id="tog2" defaultChecked />
                <label className="toggle-slider" htmlFor="tog2" />
                <span>Dark Mode</span>
              </div>
              <div className="toggle-wrap">
                <input type="checkbox" id="tog3" defaultChecked />
                <label className="toggle-slider" htmlFor="tog3" />
                <span>Email Reports</span>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header">Progress Bar</div>
            <div className="card-body">
              <div className="mb-3">
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Storage</span>
                  <span className="text-sm text-muted">78%</span>
                </div>
                <div className="progress">
                  <div className="progress-fill" style={{ width: '78%' }} />
                </div>
              </div>
              <div className="mb-3">
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Bandwidth</span>
                  <span className="text-sm text-muted">45%</span>
                </div>
                <div className="progress">
                  <div className="progress-fill" style={{ width: '45%', background: 'var(--warning)' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Completed</span>
                  <span className="text-sm text-muted">100%</span>
                </div>
                <div className="progress">
                  <div className="progress-fill" style={{ width: '100%', background: 'var(--success)' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="component-group">
        <div className="grid-2">
          <DateRangeCard /> <ColorPickerCard />
        </div>
      </div>
      <div className="component-group">
        <div className="grid-2">
          <RangeSliderCard /> <TabsCard />
        </div>
      </div>
      <div className="component-group">
        <div className="grid-2">
          <div className="card">
            <div className="card-header">Avatar</div>
            <div className="card-body">
              <div className="flex items-center gap-3 mb-3">
                <div className="avatar" style={{ width: '32px', height: '32px', fontSize: '11px' }}>
                  AH
                </div>
                <div className="avatar" style={{ width: '40px', height: '40px' }}>
                  JD
                </div>
                <div className="avatar" style={{ width: '48px', height: '48px', fontSize: '16px' }}>
                  AK
                </div>
                <div
                  className="avatar"
                  style={{ width: '56px', height: '56px', fontSize: '20px', background: 'var(--purple)', color: '#fff' }}
                >
                  SA
                </div>
              </div>
              <p className="text-xs text-muted">Avatar otomatis mengambil inisial. Ukuran: 32, 40, 48, 56px.</p>
            </div>
          </div>
          <div className="card">
            <div className="card-header">Pagination</div>
            <div className="card-body">
              <div className="pagination-demo">
                <button className="page-btn" disabled>
                  <i className="fa-solid fa-chevron-left" />
                </button>
                <button className="page-btn active">1</button>
                <button className="page-btn">2</button>
                <button className="page-btn">3</button>
                <button className="page-btn">...</button>
                <button className="page-btn">10</button>
                <button className="page-btn">
                  <i className="fa-solid fa-chevron-right" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="component-group">
        <div className="grid-2">
          <div className="card">
            <div className="card-header">Tooltips</div>
            <div className="card-body flex gap-3">
              <div className="tooltip-demo">
                Hover saya<span className="tooltip-text">Ini tooltip!</span>
              </div>
              <div className="tooltip-demo">
                Info lebih lanjut<span className="tooltip-text">Detail ada di sini</span>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header">Form Controls</div>
            <div className="card-body">
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Text Input</label>
                  <input className="form-control" placeholder="Type here" />
                </div>
                <div className="form-group">
                  <label className="form-label">Select</label>
                  <select className="form-control">
                    <option>Option 1</option>
                    <option>Option 2</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Textarea</label>
                <textarea className="form-control" rows="2" placeholder="Multi line text..." />
              </div>
              <div className="flex gap-3 mt-2">
                <label className="form-check">
                  <input className="form-check-input" type="checkbox" defaultChecked />
                  <span className="form-check-label">Checkbox</span>
                </label>
                <label className="form-check">
                  <input className="form-check-input" type="radio" name="radioGroup" defaultChecked />
                  <span className="form-check-label">Radio 1</span>
                </label>
                <label className="form-check">
                  <input className="form-check-input" type="radio" name="radioGroup" />
                  <span className="form-check-label">Radio 2</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
