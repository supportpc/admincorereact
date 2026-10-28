
import { useEffect, useRef } from 'react';

// Wraps Quill 2 (snow theme). Quill injects its own toolbar, so it gets a wrapper it fully owns.
export default function QuillEditor({ id, style }) {
  const wrapRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    const wrap = wrapRef.current;

    (async () => {
      const { default: Quill } = await import('quill');
      if (cancelled || !wrap) return;
      wrap.innerHTML = '';
      const el = document.createElement('div');
      el.id = id;
      Object.assign(el.style, style);
      wrap.appendChild(el);

      new Quill(el, {
        theme: 'snow',
        placeholder: 'Ketik konten deskripsi, catatan admin, atau template pesan...',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ header: [1, 2, 3, false] }],
            ['link', 'image', 'code-block'],
            ['clean'],
          ],
        },
      });
    })();

    return () => {
      cancelled = true;
      if (wrap) wrap.innerHTML = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={wrapRef} />;
}
