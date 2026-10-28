
import { useEffect, useRef, useState } from 'react';
import 'flatpickr/dist/flatpickr.min.css';

/* ---------- Alerts (dismissible) ---------- */
const ALERTS = [
  { id: 1, type: 'success', text: 'Data berhasil disimpan.' },
  { id: 2, type: 'info', text: 'Info: Sistem akan maintenance pukul 02.00 WIB.' },
  { id: 3, type: 'warning', text: 'Warning: Storage hampir penuh.' },
  { id: 4, type: 'danger', text: 'Error: Koneksi database gagal.' },
];

export function AlertDemoCard() {
  const [alerts, setAlerts] = useState(ALERTS);
  return (
    <div className="card">
      <div className="card-header">Alert / Notifikasi</div>
      <div className="card-body alert-dismiss">
        {alerts.map((a, i) => (
          <div key={a.id} className={`alert alert-${a.type}${i < alerts.length - 1 ? ' mb-2' : ''}`}>
            {a.text}{' '}
            <span className="close-btn" onClick={() => setAlerts((l) => l.filter((x) => x.id !== a.id))}>
              <i className="fa-solid fa-xmark" />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Flatpickr date range ---------- */
export function DateRangeCard() {
  const ref = useRef(null);

  useEffect(() => {
    let fp;
    let cancelled = false;
    (async () => {
      const { default: flatpickr } = await import('flatpickr');
      if (cancelled || !ref.current) return;
      fp = flatpickr(ref.current, {
        mode: 'range',
        dateFormat: 'Y-m-d',
        disable: [(d) => d.getDay() === 0],
        locale: { rangeSeparator: ' s/d ' },
      });
    })();
    return () => {
      cancelled = true;
      try {
        fp?.destroy();
      } catch (e) {}
    };
  }, []);

  return (
    <div className="card">
      <div className="card-header">
        Date Range Picker{' '}
        <span className="badge badge-primary badge-sm" style={{ fontSize: 10 }}>
          Flatpickr
        </span>
      </div>
      <div className="card-body">
        <div className="form-group">
          <label className="form-label">Pilih rentang tanggal</label>
          <input className="form-control" id="dateRangePicker" placeholder="Pilih tanggal..." ref={ref} />
        </div>
        <p className="text-xs text-muted">Mendukung range date, disable hari minggu, dan navigasi bulan.</p>
      </div>
    </div>
  );
}

/* ---------- Color picker ---------- */
export function ColorPickerCard() {
  const [c1, setC1] = useState('#2563eb');
  const [c2, setC2] = useState('#10b981');
  return (
    <div className="card">
      <div className="card-header">Color Picker</div>
      <div className="card-body">
        <div className="cp-wrap mb-3">
          <input type="color" id="colorPicker1" value={c1} onChange={(e) => setC1(e.target.value)} />
          <span id="colorValue1">{c1}</span> <span className="cp-swatch" style={{ background: c1 }} />
        </div>
        <div className="cp-wrap">
          <input type="color" id="colorPicker2" value={c2} onChange={(e) => setC2(e.target.value)} />
          <span id="colorValue2">{c2}</span> <span className="cp-swatch" style={{ background: c2 }} />
        </div>
      </div>
    </div>
  );
}

/* ---------- Range slider ---------- */
export function RangeSliderCard() {
  const [v1, setV1] = useState(50);
  const [v2, setV2] = useState(750);
  return (
    <div className="card">
      <div className="card-header">Range Slider</div>
      <div className="card-body">
        <div className="range-wrapper mb-3">
          <input type="range" id="rangeSlider1" min="0" max="100" value={v1} onChange={(e) => setV1(e.target.value)} />
          <span className="range-value" id="rangeVal1">
            {v1}
          </span>
        </div>
        <div className="range-wrapper">
          <input type="range" id="rangeSlider2" min="0" max="1000" step="10" value={v2} onChange={(e) => setV2(e.target.value)} />
          <span className="range-value" id="rangeVal2">
            {v2}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ---------- Tabs demo ---------- */
const TAB_TEXT = {
  tab1: 'Konten tab pertama. Bebas diisi apa saja.',
  tab2: 'Konten tab kedua. Contoh form atau data.',
  tab3: 'Konten tab ketiga. Untuk pengaturan lanjutan.',
};

export function TabsCard() {
  const [tab, setTab] = useState('tab1');
  return (
    <div className="card">
      <div className="card-header">Tabs</div>
      <div className="card-body tab-demo">
        <div className="tabs" id="demoTabs">
          {[
            ['tab1', 'Tab 1'],
            ['tab2', 'Tab 2'],
            ['tab3', 'Tab 3'],
          ].map(([key, label]) => (
            <button key={key} className={`tab-btn${tab === key ? ' active' : ''}`} onClick={() => setTab(key)}>
              {label}
            </button>
          ))}
        </div>
        {Object.entries(TAB_TEXT).map(([key, text]) => (
          <div key={key} className={`tab-content${tab === key ? ' active' : ''}`} id={key}>
            <p className="text-sm">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
