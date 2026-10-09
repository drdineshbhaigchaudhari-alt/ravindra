import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { useData } from '../api.js';
import { NAV } from '../nav.js';
import Logo from './Logo.jsx';
import Social from './Social.jsx';

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
  const [activeSub, setActiveSub] = useState(null);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
    setActiveSub(null);
  }, [pathname]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest('.mainnav')) {
        setActiveSub(null);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  const toggleSub = (label) => {
    setActiveSub((prev) => (prev === label ? null : label));
  };

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
        <button
          className="menu-btn"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
        >
          {open ? '✕' : '☰'}
        </button>
      </div>
      <nav className={`mainnav ${open ? 'open' : ''}`} aria-label="Main">
        <div className="container">
          <ul>
            {NAV.map((item) => (
              <li
                key={item.label}
                className={`nav-item ${item.children ? 'has-sub' : ''} ${activeSub === item.label ? 'open' : ''}`}
                onMouseEnter={() => {
                  if (window.innerWidth >= 960 && item.children) setActiveSub(item.label);
                }}
                onMouseLeave={() => {
                  if (window.innerWidth >= 960) setActiveSub(null);
                }}
              >
                {item.children ? (
                  <>
                    <button
                      type="button"
                      className="nav-link nav-btn"
                      aria-expanded={activeSub === item.label}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSub(item.label);
                      }}
                    >
                      {item.label} <span className="caret" aria-hidden="true">▾</span>
                    </button>
                    <ul className={`sub ${activeSub === item.label ? 'show' : ''}`}>
                      {item.children.map((c) => (
                        <li key={c.to}>
                          <NavLink
                            to={c.to}
                            end
                            onClick={() => {
                              setActiveSub(null);
                              setOpen(false);
                            }}
                          >
                            {c.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className="nav-link"
                    onClick={() => {
                      setActiveSub(null);
                      setOpen(false);
                    }}
                  >
                    {item.label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </div>
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
          <Social links={site.social} />
        </div>
        <div>
          <h4>University</h4>
          <Link to="/about">About Us</Link>
          <Link to="/about/leadership">Leadership</Link>
          <Link to="/faculty">Faculty</Link>
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
