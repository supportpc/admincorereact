import { useEffect, useRef } from 'react';

// Wraps Dropzone.js (v5). Same options/behaviour as the original inline <script>.
export default function DropzoneBox({ id, className, accepted, children }) {
  const formRef = useRef(null);

  useEffect(() => {
    let dz;
    let cancelled = false;

    (async () => {
      const mod = await import('dropzone');
      const Dropzone = mod.default || mod;
      if (cancelled || !formRef.current) return;
      Dropzone.autoDiscover = false;

      const setMessage = (display) => {
        formRef.current?.querySelectorAll('.dz-message').forEach((el) => {
          el.style.display = display;
        });
      };

      dz = new Dropzone(formRef.current, {
        maxFilesize: 10,
        acceptedFiles: accepted,
        dictDefaultMessage: '',
        init() {
          this.on('addedfile', () => setMessage('none'));
          this.on('queuecomplete', () => setMessage('block'));
        },
      });
    })();

    return () => {
      cancelled = true;
      try {
        dz?.destroy();
      } catch (e) {}
    };
  }, [accepted]);

  return (
    <form action="/upload" className={className} id={id} ref={formRef}>
      {children}
    </form>
  );
}
