import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { useData } from '../api.js';
import { NAV } from '../nav.js';
import Logo from './Logo.jsx';

function TopBar({ site }) {
  return (
    <div className="topbar">
      <div className="container topbar-inner">
        <div className="topbar-contact">
          <span>✆ {site.phones[0]}</span>
          <span>✉ {site.email}</span>
        </div>
        <nav className="topbar-links" aria-label="Utility">
          <Link to="/notices">Notices</Link>
          <Link to="/careers">Vacancy</Link>
          <Link to="/admission">Fee Payment</Link>
          <Link to="/contact">Contact Us</Link>
        </nav>
      </div>
      <div className="ticker" aria-label="Announcements">
        <div className="ticker-track">
          {[...site.ticker, ...site.ticker].map((t, i) => (
            <span key={i}>★ {t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Header({ site }) {
  const [open, setOpen] = useState(false);
  const [sub, setSub] = useState(null);
  const { pathname } = useLocation();
  useEffect(() => { setOpen(false); setSub(null); }, [pathname]);

  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="brand" aria-label={site.name}>
          <Logo />
          <span>
            <strong>{site.name}</strong>
            <small>{site.tagline}</small>
          </span>
        </Link>
        <button className="menu-btn" aria-expanded={open} aria-label="Toggle menu" onClick={() => setOpen(!open)}>
          {open ? '✕' : '☰'}
        </button>
      </div>
      <nav className={`mainnav ${open ? 'open' : ''}`} aria-label="Main">
        <ul className="container">
          {NAV.map((item) => (
            <li key={item.label} className={item.children ? 'has-sub' : ''}>
              {item.children ? (
                <>
                  <NavLink to={item.to} onClick={(e) => { if (window.innerWidth < 960) { e.preventDefault(); setSub(sub === item.label ? null : item.label); } }}>
                    {item.label} ▾
                  </NavLink>
                  <ul className={`sub ${sub === item.label ? 'show' : ''}`}>
                    {item.children.map((c) => (
                      <li key={c.to}><NavLink to={c.to} end>{c.label}</NavLink></li>
                    ))}
                  </ul>
                </>
              ) : (
                <NavLink to={item.to} end={item.to === '/'}>{item.label}</NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

function Footer({ site }) {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="footer-brand"><Logo size={48} /><strong>{site.name}</strong></div>
          <p>A university dedicated to excellence in medical education, biomedical research and community engagement.</p>
          <div className="social">
            {Object.keys(site.social).map((s) => (
              <a key={s} href={site.social[s]} aria-label={s}>{s[0].toUpperCase()}</a>
            ))}
          </div>
        </div>
        <div>
          <h4>University</h4>
          <Link to="/about">About Us</Link>
          <Link to="/about/leadership">Leadership</Link>
          <Link to="/about/committees">Committees</Link>
          <Link to="/research">Research</Link>
          <Link to="/careers">Careers</Link>
        </div>
        <div>
          <h4>Academics</h4>
          <Link to="/admission">Admission</Link>
          <Link to="/programs">Programmes</Link>
          <Link to="/departments">Departments</Link>
          <Link to="/teaching-schedule">Teaching Schedule</Link>
          <Link to="/academics/calendar">Academic Calendar</Link>
        </div>
        <div>
          <h4>Contact</h4>
          <p>{site.address}</p>
          <p>{site.phones.join(' / ')}</p>
          <p>Toll free: {site.tollFree}</p>
          <p><a href={`mailto:${site.email}`}>{site.email}</a></p>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          © {new Date().getFullYear()} {site.name}. All rights reserved. · {site.domain}
        </div>
      </div>
    </footer>
  );
}

export default function Layout() {
  const { data: site } = useData('site');
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  if (!site) return <div className="loading">Loading…</div>;
  return (
    <>
      <a href="#main" className="skip">Skip to content</a>
      <TopBar site={site} />
      <Header site={site} />
      <main id="main"><Outlet /></main>
      <Footer site={site} />
    </>
  );
}
