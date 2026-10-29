import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { initialUsers } from '@/lib/data';

const AdminContext = createContext(null);

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin must be used inside <AdminProvider>');
  return ctx;
}

const emptyUserForm = { name: '', email: '', role: 'Admin', area: '', status: 'Active' };

export default function AdminProvider({ children }) {
  const navigate = useNavigate();

  /* ---------- Toast ---------- */
  const [toast, setToast] = useState({ msg: '', show: false });
  const toastTimer = useRef(null);
  const showToast = useCallback((msg) => {
    clearTimeout(toastTimer.current);
    setToast({ msg, show: true });
    toastTimer.current = setTimeout(() => setToast((t) => ({ ...t, show: false })), 2200);
  }, []);

  /* ---------- Theme ---------- */
  const [theme, setThemeState] = useState('light');
  const [themeReady, setThemeReady] = useState(false);

  useEffect(() => {
    let saved = 'light';
    try {
      saved = localStorage.getItem('admincore-theme') || 'light';
    } catch (e) {}
    setThemeState(saved);
    setThemeReady(true);
  }, []);

  useEffect(() => {
    if (!themeReady) return;
    document.body.classList.toggle('dark-mode', theme === 'dark');
  }, [theme, themeReady]);

  const setTheme = useCallback(
    (next) => {
      try {
        localStorage.setItem('admincore-theme', next);
      } catch (e) {}
      setThemeState(next);
      showToast(next === 'dark' ? 'Dark mode aktif' : 'Light mode aktif');
    },
    [showToast],
  );

  const toggleTheme = useCallback(() => setTheme(theme === 'dark' ? 'light' : 'dark'), [theme, setTheme]);

  /* ---------- Layout: sidebar / collapsed / top-nav ---------- */
  const [layout, setLayout] = useState('sidebar');
  const [collapsed, setCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); // mobile drawer
  const [layoutReady, setLayoutReady] = useState(false);

  const applyLayout = useCallback((name) => {
    setLayout(name);
    setCollapsed(name === 'collapsed');
  }, []);

  useEffect(() => {
    let saved = 'sidebar';
    try {
      saved = localStorage.getItem('admincore-layout') || 'sidebar';
    } catch (e) {}
    if (saved === 'top-nav' && window.innerWidth > 768) applyLayout('top-nav');
    else if (saved === 'collapsed') applyLayout('collapsed');
    else applyLayout('sidebar');
    setLayoutReady(true);

    const onResize = () => {
      if (window.innerWidth > 768) setSidebarOpen(false);
      else setLayout((l) => (l === 'top-nav' ? 'sidebar' : l)); // checkMobileLayout()
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [applyLayout]);

  useEffect(() => {
    if (!layoutReady) return;
    document.body.classList.toggle('top-nav', layout === 'top-nav');
  }, [layout, layoutReady]);

  const toggleSidebar = useCallback(() => {
    if (window.innerWidth <= 768) setSidebarOpen((o) => !o);
    else setCollapsed((c) => !c);
  }, []);
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);

  const applySidebarLayout = useCallback(() => applyLayout('sidebar'), [applyLayout]);
  const applyCollapsedLayout = useCallback(() => applyLayout('collapsed'), [applyLayout]);
  const toggleTopNav = useCallback(() => applyLayout(layout === 'top-nav' ? 'sidebar' : 'top-nav'), [layout, applyLayout]);
  const saveLayoutPreference = useCallback(() => {
    try {
      localStorage.setItem('admincore-layout', layout);
    } catch (e) {}
    showToast('Layout preference saved');
  }, [layout, showToast]);

  /* ---------- Navigation helper (replaces goTo('page-xxx')) ---------- */
  const goTo = useCallback(
    (targetId) => {
      navigate('/' + String(targetId).replace('page-', ''));
    },
    [navigate],
  );

  /* ---------- Modals ---------- */
  const [modals, setModals] = useState({});
  const openModal = useCallback((id) => setModals((m) => ({ ...m, [id]: true })), []);
  const closeModal = useCallback((id) => setModals((m) => ({ ...m, [id]: false })), []);

  /* ---------- Command palette ---------- */
  const [cmdOpen, setCmdOpen] = useState(false);
  const openCommandPalette = useCallback(() => setCmdOpen(true), []);
  const closeCommandPalette = useCallback(() => setCmdOpen(false), []);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCmdOpen(true);
      }
      if (e.key === 'Escape') setCmdOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  /* ---------- Users (shared so the modal works from any page) ---------- */
  const [users, setUsers] = useState(initialUsers);
  const [userForm, setUserForm] = useState(emptyUserForm);
  const [editingUserId, setEditingUserId] = useState(null);
  const nextUserId = useRef(initialUsers.length + 1);

  // openUserModal() => create, openUserModal(id) => edit
  const openUserModal = useCallback(
    (id) => {
      if (typeof id === 'number') {
        const u = users.find((x) => x.id === id);
        if (!u) return;
        setEditingUserId(id);
        setUserForm({ name: u.name, email: u.email, role: u.role, area: u.area, status: u.status });
      } else {
        setEditingUserId(null);
        setUserForm(emptyUserForm);
      }
      openModal('modalUser');
    },
    [users, openModal],
  );

  const saveUser = useCallback(() => {
    const data = {
      name: userForm.name || 'New User',
      email: userForm.email || 'new@example.com',
      role: userForm.role,
      area: userForm.area || 'Global',
      status: userForm.status,
    };
    if (editingUserId !== null) {
      setUsers((list) => list.map((u) => (u.id === editingUserId ? { ...u, ...data } : u)));
    } else {
      setUsers((list) => [{ id: nextUserId.current++, ...data, last: 'Belum login' }, ...list]);
    }
    closeModal('modalUser');
    showToast('User berhasil disimpan');
  }, [userForm, editingUserId, closeModal, showToast]);

  const deleteUser = useCallback(
    (id) => {
      setUsers((list) => list.filter((u) => u.id !== id));
      showToast('User dihapus');
    },
    [showToast],
  );

  /* ---------- Toast variants (success / error / warning / info, auto dismiss 4s) ---------- */
  const [toastVariants, setToastVariants] = useState([]);
  const variantId = useRef(0);
  const dismissToastVariant = useCallback((id) => setToastVariants((v) => v.filter((x) => x.id !== id)), []);
  const showToastVariant = useCallback((type, message) => {
    const id = ++variantId.current;
    setToastVariants((v) => [...v, { id, type, message }]);
    setTimeout(() => setToastVariants((v) => v.filter((x) => x.id !== id)), 4000);
  }, []);

  const value = {
    toastVariants,
    showToastVariant,
    dismissToastVariant,
    toast,
    showToast,
    theme,
    setTheme,
    toggleTheme,
    layout,
    collapsed,
    sidebarOpen,
    toggleSidebar,
    closeSidebar,
    applyLayout,
    applySidebarLayout,
    applyCollapsedLayout,
    toggleTopNav,
    saveLayoutPreference,
    goTo,
    modals,
    openModal,
    closeModal,
    cmdOpen,
    openCommandPalette,
    closeCommandPalette,
    users,
    userForm,
    setUserForm,
    editingUserId,
    openUserModal,
    saveUser,
    deleteUser,
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}
