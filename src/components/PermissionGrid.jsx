
import { permissions } from '@/lib/data';

// Permission matrix (first 8 permissions checked by default, same as the original app.js)
export default function PermissionGrid() {
  return (
    <div className="permission-grid" id="permissionGrid">
      {permissions.map((p, i) => (
        <label className="permission-item" key={p}>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" defaultChecked={i < 8} />
            <span className="form-check-label">{p}</span>
          </div>
        </label>
      ))}
    </div>
  );
}
