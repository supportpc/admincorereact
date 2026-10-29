import { useEffect, useRef } from 'react';

const OPTIONS = {
  currency: {
    numeral: true,
    numeralThousandsGroupStyle: 'thousand',
    prefix: 'Rp ',
    rawValueTrimPrefix: true,
    numeralDecimalScale: 0,
  },
  phone: { phone: true, phoneRegionCode: 'ID', prefix: '+62 ' },
  date: { date: true, datePattern: ['Y', '-', 'm', '-', 'd'] },
};

// kind: 'currency' | 'phone' | 'date'
export default function CleaveInput({ kind, className, defaultValue }) {
  const ref = useRef(null);

  useEffect(() => {
    let inst;
    let cancelled = false;

    (async () => {
      const { default: Cleave } = await import('cleave.js');
      if (kind === 'phone') {
        // the phone addon attaches AsYouTypeFormatter to the global Cleave
        window.Cleave = Cleave;
        await import('cleave.js/dist/addons/cleave-phone.id');
      }
      if (cancelled || !ref.current) return;
      inst = new Cleave(ref.current, OPTIONS[kind]);
    })();

    return () => {
      cancelled = true;
      try {
        inst?.destroy();
      } catch (e) {}
    };
  }, [kind]);

  return <input ref={ref} className={className} defaultValue={defaultValue} />;
}
