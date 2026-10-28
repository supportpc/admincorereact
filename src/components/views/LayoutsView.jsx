
import { useAdmin } from '@/components/AdminProvider';

export default function LayoutsView() {
  const { applyCollapsedLayout, applySidebarLayout, layout, saveLayoutPreference, toggleTopNav } = useAdmin();
  return (
    <section id="page-layouts" className="page-view active">
      <div className="page-head">
        <div>
          <h1 className="page-title">Layout Variants</h1>
          <p className="page-desc">
            Alternatif layout admin panel: sidebar full, collapsed, top navigation, full width, compact mode, dan sticky header.
          </p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => {
            saveLayoutPreference();
          }}
        >
          Save Preference
        </button>
      </div>
      <div className="grid-3">
        <div className="layout-sample">
          <h3 className="mb-3">Sidebar Layout</h3>
          <div className="layout-frame sidebar-layout">
            <div className="layout-sidebar" />
            <div className="layout-topbar" />
            <div className="layout-content" />
          </div>
          <button
            className="btn btn-secondary w-full mt-2"
            onClick={() => {
              applySidebarLayout();
            }}
          >
            Apply Full Sidebar
          </button>
        </div>
        <div className="layout-sample">
          <h3 className="mb-3">Collapsed Sidebar</h3>
          <div className="layout-frame compact-layout">
            <div className="layout-sidebar" />
            <div className="layout-content" />
          </div>
          <button
            className="btn btn-secondary w-full mt-2"
            onClick={() => {
              applyCollapsedLayout();
            }}
          >
            Apply Collapsed
          </button>
        </div>
        <div className="layout-sample">
          <h3 className="mb-3">Top Navigation</h3>
          <div className="layout-frame top-layout">
            <div className="layout-topbar" />
            <div className="layout-content" />
          </div>
          <button
            className="btn btn-secondary w-full mt-2"
            id="applyTopNav"
            onClick={() => {
              toggleTopNav();
            }}
          >
            {layout === 'top-nav' ? 'Revert to Sidebar' : 'Apply Top Navigation'}
          </button>
        </div>
      </div>
    </section>
  );
}
