
import { useAdmin } from '@/components/AdminProvider';

export default function OrdersView() {
  const { showToast } = useAdmin();
  return (
    <section id="page-orders" className="page-view active">
      <div className="page-head">
        <div>
          <h1 className="page-title">Orders / Tickets</h1>
          <p className="page-desc">Contoh board untuk request, tiket support, order fulfillment, atau task operasional.</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => {
            showToast('Ticket baru dibuat');
          }}
        >
          + Ticket
        </button>
      </div>
      <div className="kanban">
        <div className="kanban-col">
          <b>Backlog</b>
          <div className="ticket">
            <b>Verifikasi dokumen merchant</b>
            <p className="text-xs text-muted mt-2">Priority medium</p>
          </div>
          <div className="ticket">
            <b>Update template invoice</b>
            <p className="text-xs text-muted mt-2">Design request</p>
          </div>
        </div>
        <div className="kanban-col">
          <b>In Progress</b>
          <div className="ticket">
            <b>Integrasi callback payment</b>
            <p className="text-xs text-muted mt-2">Assigned to Dev Team</p>
          </div>
        </div>
        <div className="kanban-col">
          <b>Review</b>
          <div className="ticket">
            <b>Audit role cashier</b>
            <p className="text-xs text-muted mt-2">Need approval</p>
          </div>
        </div>
        <div className="kanban-col">
          <b>Done</b>
          <div className="ticket">
            <b>Fix login session</b>
            <p className="text-xs text-muted mt-2">Closed yesterday</p>
          </div>
        </div>
      </div>
    </section>
  );
}
