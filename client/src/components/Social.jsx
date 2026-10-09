// Inline SVG brand icons for the social links (no icon library needed).
const ICONS = {
  facebook: {
    label: 'Facebook',
    svg: <path d="M14 8h3V4h-3c-2.76 0-5 2.24-5 5v2H7v4h2v9h4v-9h3l1-4h-4V9c0-.55.45-1 1-1z" />
  },
  instagram: {
    label: 'Instagram',
    svg: (
      <g fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
      </g>
    )
  },
  youtube: {
    label: 'YouTube',
    svg: <path fillRule="evenodd" d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.75 15.3V8.7L15.5 12l-5.75 3.3z" />
  },
  linkedin: {
    label: 'LinkedIn',
    svg: <path d="M6.5 5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0zM2 9h4v13H2V9zm7 0h3.8v1.8h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1V22h-4v-6.3c0-1.5-.03-3.43-2.1-3.43-2.1 0-2.42 1.64-2.42 3.33V22H9V9z" />
  }
};

export default function Social({ links = {} }) {
  return (
    <div className="social">
      {Object.entries(links).filter(([k]) => ICONS[k]).map(([k, href]) => (
        <a key={k} href={href} className={`social-${k}`} aria-label={ICONS[k].label} title={ICONS[k].label} target="_blank" rel="noreferrer">
          <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true">{ICONS[k].svg}</svg>
        </a>
      ))}
    </div>
  );
}
