import { useEffect, useRef } from 'react';

// Wraps DataTables 2.1.8 (same init options as the original page).
// The DataTable instance is exposed through instanceRef so the page can redraw it.
export default function DataTableBox({ id, className, instanceRef, children }) {
  const tableRef = useRef(null);

  useEffect(() => {
    let dt;
    let cancelled = false;

    (async () => {
      const { default: DataTable } = await import('datatables.net-dt');
      if (cancelled || !tableRef.current) return;
      dt = new DataTable(tableRef.current, {
        pageLength: 10,
        lengthMenu: [
          [5, 10, 25, 50, -1],
          [5, 10, 25, 50, 'All'],
        ],
        language: { url: 'https://cdn.datatables.net/plug-ins/2.1.8/i18n/id.json' },
      });
      if (instanceRef) instanceRef.current = dt;
    })();

    return () => {
      cancelled = true;
      if (instanceRef) instanceRef.current = null;
      try {
        dt?.destroy();
      } catch (e) {}
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <table className={className} id={id} ref={tableRef}>
      {children}
    </table>
  );
}
