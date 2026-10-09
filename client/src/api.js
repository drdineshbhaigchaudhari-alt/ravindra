import { useEffect, useState } from 'react';

const cache = new Map();

export function useData(resource) {
  const [data, setData] = useState(cache.get(resource) ?? null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (cache.has(resource)) return;
    let alive = true;
    fetch(`/api/${resource}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(r.statusText))))
      .then((d) => {
        cache.set(resource, d);
        if (alive) setData(d);
      })
      .catch((e) => alive && setError(e));
    return () => { alive = false; };
  }, [resource]);

  return { data, error, loading: !data && !error };
}

export async function postEnquiry(payload) {
  const r = await fetch('/api/enquiries', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const body = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(body.error || 'Something went wrong');
  return body;
}

export const fmtDate = (iso) =>
  new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
