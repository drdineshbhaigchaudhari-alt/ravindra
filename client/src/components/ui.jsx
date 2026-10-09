import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export function Seo({ title, description }) {
  const full = title ? `${title} | Ravindra Medical Research University` : 'Ravindra Medical Research University';
  return (
    <Helmet>
      <title>{full}</title>
      <meta name="description" content={description || 'Ravindra Medical Research University — advancing medical education, research and innovation.'} />
    </Helmet>
  );
}

export function PageHeader({ title, crumbs = [], image }) {
  return (
    <section className="pagehead" style={image ? { backgroundImage: `linear-gradient(rgba(11,42,85,.82),rgba(11,42,85,.82)),url(${image})` } : undefined}>
      <div className="container">
        <h1>{title}</h1>
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          {crumbs.map((c) => (c.to ? <span key={c.label}> / <Link to={c.to}>{c.label}</Link></span> : <span key={c.label}> / {c.label}</span>))}
          <span> / {title}</span>
        </nav>
      </div>
      <Seo title={title} />
    </section>
  );
}

export function Section({ title, subtitle, children, alt, id }) {
  return (
    <section className={`section ${alt ? 'alt' : ''}`} id={id}>
      <div className="container">
        {title && (
          <div className="section-head">
            <h2>{title}</h2>
            {subtitle && <p>{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

export function DataTable({ columns, rows }) {
  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr><th>S.No.</th>{columns.map((c) => <th key={c.key}>{c.label}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              {columns.map((c) => <td key={c.key}>{c.render ? c.render(r) : r[c.key]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export const ViewLink = ({ file }) => (
  <a className="btn btn-sm" href={file} target="_blank" rel="noreferrer">View</a>
);

export function Counter({ value, suffix = '', label }) {
  const ref = useRef(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t) => {
        const p = Math.min((t - t0) / 1200, 1);
        setN(Math.round(value * p));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [value]);
  return (
    <div className="stat" ref={ref}>
      <strong>{n}{suffix}</strong>
      <span>{label}</span>
    </div>
  );
}

export function Loading({ state }) {
  if (state.error) return <div className="container section">Unable to load content. Please try again later.</div>;
  return <div className="loading">Loading…</div>;
}

export function MapSection({ site, alt }) {
  if (!site?.map) return null;
  const { lat, lng, link } = site.map;
  const embed = `https://maps.google.com/maps?q=${lat},${lng}&z=16&output=embed`;
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  return (
    <section className={`section map-section ${alt ? 'alt' : ''}`} id="location">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Location</span>
          <h2>Find Us on the Map</h2>
          <p>Visit our campus office in Sector 25, Chandigarh</p>
        </div>
        <div className="map-wrap">
          <div className="map-card">
            <h3>{site.name}</h3>
            <p className="map-line"><span aria-hidden="true">📍</span><span>{site.address}</span></p>
            <p className="map-line"><span aria-hidden="true">📞</span><span>{site.phones.join(' / ')}</span></p>
            <p className="map-line"><span aria-hidden="true">✉️</span><a href={`mailto:${site.email}`}>{site.email}</a></p>
            <div className="map-actions">
              <a className="btn btn-gold" href={directions} target="_blank" rel="noreferrer">Get Directions</a>
              <a className="btn" href={link} target="_blank" rel="noreferrer">Open in Google Maps</a>
            </div>
          </div>
          <iframe
            className="map-frame"
            title={`Map showing ${site.name}`}
            src={embed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
