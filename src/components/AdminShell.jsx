import { Link, useLocation } from 'react-router-dom';
import { useAdmin } from './AdminProvider';
import { navSections, findNavLabel } from '@/lib/nav';
import Modals from './Modals';
import CommandPalette from './CommandPalette';

const isActive = (pathname, href) => pathname === href || pathname.startsWith(href + '/');

function TopNavbar({ pathname }) {
  return (
    <nav className="top-navbar" id="topNavbar">
      {navSections.map((section, i) => (
        <span key={section.title} style={{ display: 'contents' }}>
          {i > 0 && <span className="top-nav-sep" />}
          {section.items.map((item) => (
            <Link key={item.href} to={item.href} className={`top-nav-item${isActive(pathname, item.href) ? ' active' : ''}`}>
              <i className={`fa-solid ${item.icon}`} />
              <span className="nav-text">{item.label}</span>
              {item.pill && <span className="nav-pill">{item.pill}</span>}
            </Link>
          ))}
        </span>
      ))}
    </nav>
  );
}

export default function AdminShell({ children }) {
  const { pathname } = useLocation();
  const { theme, toggleTheme, layout, collapsed, sidebarOpen, toggleSidebar, closeSidebar, openCommandPalette, goTo, toast } = useAdmin();

  const isDark = theme === 'dark';

  return (
    <>
      <aside className={`sidebar${sidebarOpen ? ' open' : ''}${collapsed ? ' collapsed' : ''}`} id="sidebar">
        <div className="sidebar-content">
          <div className="sidebar-logo">
            <div className="brand-wrapper">
              <div className="logo-icon">A</div>
              <div className="brand-text">
                <div className="logo-text">NusaCore</div>
                <div className="logo-sub">Complete Panel Kit</div>
              </div>
            </div>
            <button id="sidebarToggle" className="btn btn-secondary btn-icon" title="Collapse sidebar" onClick={toggleSidebar}>
              <i className="fa-solid fa-bars top-icon" />
            </button>
          </div>

          {navSections.map((section) => (
            <div key={section.title}>
              <p className="menu-title">{section.title}</p>
              <nav>
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`nav-item${isActive(pathname, item.href) ? ' active' : ''}`}
                    onClick={closeSidebar}
                  >
                    <i className={`fa-solid ${item.icon} nav-icon`} />
                    <span className="nav-text">{item.label}</span>
                    {item.pill && <span className="nav-pill">{item.pill}</span>}
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>
      </aside>
      <div id="sidebarBackdrop" className={`sidebar-backdrop${sidebarOpen ? ' show' : ''}`} onClick={closeSidebar} />

      <main className="main-wrapper">
        <div className="main-container">
          <header className="topbar">
            <div className="flex items-center gap-3">
              <button id="topbarToggle" className="btn btn-secondary btn-icon" onClick={toggleSidebar}>
                <i className="fa-solid fa-bars top-icon" />
              </button>
              <div className="breadcrumb">
                <span>Admin</span>
                <span>/</span>
                <span className="current" id="breadcrumb-current">
                  {findNavLabel(pathname)}
                </span>
              </div>
            </div>
            <div className="top-actions">
              <button className="btn btn-secondary btn-icon hide-mobile" onClick={openCommandPalette}>
                <i className="fa-solid fa-magnifying-glass top-icon" />
              </button>
              <button className="btn btn-secondary theme-toggle" id="themeToggle" onClick={toggleTheme}>
                <i className={isDark ? 'fa-solid fa-sun top-icon' : 'fa-solid fa-moon top-icon'} id="themeIcon" />
                <span id="themeText">{isDark ? 'Light' : 'Dark'}</span>
              </button>
              <button className="btn btn-secondary btn-icon" onClick={() => goTo('page-notifications')}>
                <i className="fa-solid fa-bell top-icon" />
              </button>
              <div className="user-profile" onClick={() => goTo('page-profile')}>
                <img src="https://ui-avatars.com/api/?name=Admin+User&background=2563eb&color=fff" alt="Admin" />
                <span className="text-sm font-bold">Admin User</span>
              </div>
            </div>
          </header>

          {layout === 'top-nav' && <TopNavbar pathname={pathname} />}

          <div className="inner-content">{children}</div>
        </div>
      </main>

      <Modals />
      <CommandPalette />
      <ToastVariants />
      <div className={`toast${toast.show ? ' show' : ''}`} id="toast">
        {toast.msg}
      </div>
    </>
  );
}

const VARIANT_ICONS = {
  success: 'fa-check-circle',
  error: 'fa-circle-xmark',
  warning: 'fa-triangle-exclamation',
  info: 'fa-circle-info',
};

function ToastVariants() {
  const { toastVariants, dismissToastVariant } = useAdmin();
  if (!toastVariants.length) return null;
  return (
    <div
      id="toastVariantContainer"
      style={{ position: 'fixed', right: 16, bottom: 16, zIndex: 200, display: 'flex', flexDirection: 'column', gap: 6 }}
    >
      {toastVariants.map((t) => (
        <div key={t.id} className={`toast-variant toast-${t.type}`}>
          <i className={`fa-solid ${VARIANT_ICONS[t.type] || 'fa-circle-info'}`} /> {t.message}
          <button
            onClick={() => dismissToastVariant(t.id)}
            style={{ marginLeft: 'auto', background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontSize: 16 }}
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  );
}
