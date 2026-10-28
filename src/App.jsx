import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet, useParams } from 'react-router-dom';
import AdminProvider from '@/components/AdminProvider';
import AdminShell from '@/components/AdminShell';
import { getInvoiceById, getInvoices } from '@/lib/invoices';

const AdvancedFormsView = lazy(() => import('@/components/views/AdvancedFormsView'));
const ApiIntegrationsView = lazy(() => import('@/components/views/ApiIntegrationsView'));
const AuditView = lazy(() => import('@/components/views/AuditView'));
const AuthView = lazy(() => import('@/components/views/AuthView'));
const BillingView = lazy(() => import('@/components/views/BillingView'));
const ComponentsView = lazy(() => import('@/components/views/ComponentsView'));
const DashboardView = lazy(() => import('@/components/views/DashboardView'));
const DataTableView = lazy(() => import('@/components/views/DataTableView'));
const DatatablesView = lazy(() => import('@/components/views/DatatablesView'));
const DetailsView = lazy(() => import('@/components/views/DetailsView'));
const DocsView = lazy(() => import('@/components/views/DocsView'));
const ErrorPagesView = lazy(() => import('@/components/views/ErrorPagesView'));
const FileManagerView = lazy(() => import('@/components/views/FileManagerView'));
const LayoutsView = lazy(() => import('@/components/views/LayoutsView'));
const ModalsView = lazy(() => import('@/components/views/ModalsView'));
const NotificationsView = lazy(() => import('@/components/views/NotificationsView'));
const OnboardingView = lazy(() => import('@/components/views/OnboardingView'));
const OrdersView = lazy(() => import('@/components/views/OrdersView'));
const PermissionPreviewView = lazy(() => import('@/components/views/PermissionPreviewView'));
const ProductsView = lazy(() => import('@/components/views/ProductsView'));
const ProfileView = lazy(() => import('@/components/views/ProfileView'));
const ReportsView = lazy(() => import('@/components/views/ReportsView'));
const RolesView = lazy(() => import('@/components/views/RolesView'));
const SettingsView = lazy(() => import('@/components/views/SettingsView'));
const StatesView = lazy(() => import('@/components/views/StatesView'));
const TransactionsView = lazy(() => import('@/components/views/TransactionsView'));
const UsersView = lazy(() => import('@/components/views/UsersView'));
const InvoiceListView = lazy(() => import('@/components/views/InvoiceListView'));
const InvoiceView = lazy(() => import('@/components/views/InvoiceView'));
const LoginView = lazy(() => import('@/components/views/LoginView'));
const NotFoundView = lazy(() => import('@/components/views/NotFoundView'));

// sets <title> per page (replaces Next.js `metadata`)
function Page({ title, children }) {
  useEffect(() => {
    document.title = title;
  }, [title]);
  return children;
}

const Loading = () => (
  <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}>
    <div className="loading-spinner" />
  </div>
);

// Shared shell (sidebar, topbar, modals, toast, command palette) for every admin page
function AdminLayout() {
  return (
    <AdminProvider>
      <AdminShell>
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </AdminShell>
    </AdminProvider>
  );
}

// /invoice/:id -> data from getInvoiceById() (replace with your API call)
function InvoiceDetailRoute() {
  const { id } = useParams();
  const invoice = getInvoiceById(id);
  if (!invoice) return <NotFoundView />;
  return (
    <Page title={`Invoice ${id} - ReactCore`}>
      <InvoiceView key={id} invoice={invoice} />
    </Page>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/login" element={<Page title="Login - ReactCore"><LoginView /></Page>} />
          <Route element={<AdminLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="advanced-forms" element={<Page title="Advanced Forms - ReactCore"><AdvancedFormsView /></Page>} />
            <Route path="api-integrations" element={<Page title="API & Integrations - ReactCore"><ApiIntegrationsView /></Page>} />
            <Route path="audit" element={<Page title="Audit Log - ReactCore"><AuditView /></Page>} />
            <Route path="auth" element={<Page title="Authentication Pages - ReactCore"><AuthView /></Page>} />
            <Route path="billing" element={<Page title="Billing & Subscription - ReactCore"><BillingView /></Page>} />
            <Route path="components" element={<Page title="UI Components - ReactCore"><ComponentsView /></Page>} />
            <Route path="dashboard" element={<Page title="Dashboard Overview - ReactCore"><DashboardView /></Page>} />
            <Route path="data-table" element={<Page title="Data Table - ReactCore"><DataTableView /></Page>} />
            <Route path="datatables" element={<Page title="DataTables Integration - ReactCore"><DatatablesView /></Page>} />
            <Route path="details" element={<Page title="Detail Pages - ReactCore"><DetailsView /></Page>} />
            <Route path="docs" element={<Page title="Documentation - ReactCore"><DocsView /></Page>} />
            <Route path="error-pages" element={<Page title="Error & System Pages - ReactCore"><ErrorPagesView /></Page>} />
            <Route path="file-manager" element={<Page title="File Manager - ReactCore"><FileManagerView /></Page>} />
            <Route path="invoice" element={<Page title="Invoices - ReactCore"><InvoiceListView invoices={getInvoices()} /></Page>} />
            <Route path="invoice/:id" element={<InvoiceDetailRoute />} />
            <Route path="layouts" element={<Page title="Layout Variants - ReactCore"><LayoutsView /></Page>} />
            <Route path="modals" element={<Page title="Modals - ReactCore"><ModalsView /></Page>} />
            <Route path="notifications" element={<Page title="Notifications - ReactCore"><NotificationsView /></Page>} />
            <Route path="onboarding" element={<Page title="Onboarding Wizard - ReactCore"><OnboardingView /></Page>} />
            <Route path="orders" element={<Page title="Orders / Tickets - ReactCore"><OrdersView /></Page>} />
            <Route path="permission-preview" element={<Page title="Permission-Based UI Preview - ReactCore"><PermissionPreviewView /></Page>} />
            <Route path="products" element={<Page title="Products / Catalog - ReactCore"><ProductsView /></Page>} />
            <Route path="profile" element={<Page title="Profile - ReactCore"><ProfileView /></Page>} />
            <Route path="reports" element={<Page title="Reports - ReactCore"><ReportsView /></Page>} />
            <Route path="roles" element={<Page title="Role & Permission - ReactCore"><RolesView /></Page>} />
            <Route path="settings" element={<Page title="Settings - ReactCore"><SettingsView /></Page>} />
            <Route path="states" element={<Page title="Loading, Empty & Error States - ReactCore"><StatesView /></Page>} />
            <Route path="transactions" element={<Page title="Transaksi - ReactCore"><TransactionsView /></Page>} />
            <Route path="users" element={<Page title="User Management - ReactCore"><UsersView /></Page>} />
            <Route path="*" element={<Page title="404 - ReactCore"><NotFoundView /></Page>} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
