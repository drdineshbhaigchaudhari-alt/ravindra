import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { fmtDate, useData } from '../api.js';
import { Loading, PageHeader } from '../components/ui.jsx';

const RANKS = ['All', 'Professor', 'Associate Professor', 'Assistant Professor'];

// "Professor & Associate Director" counts as Professor for filtering/stats.
const rankOf = (d) => (d.startsWith('Associate') ? 'Associate Professor' : d.startsWith('Assistant') ? 'Assistant Professor' : 'Professor');

const initials = (name) =>
  name.replace(/^(Dr|Mr|Ms|Mrs|Prof)\.?\s+/i, '').split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join('');

const fmtExp = (y) => (y ? `${y} yrs` : 'Fresher');

function FacultyCard({ m }) {
  const rank = rankOf(m.designation);
  return (
    <article className={`fac-card rank-${rank.split(' ')[0].toLowerCase()}`}>
      {m.image ? (
        <img className="fac-photo" src={m.image} alt={m.name} loading="lazy" />
      ) : (
        <div className="fac-avatar" aria-hidden="true">{initials(m.name)}</div>
      )}
      <h3>{m.name}</h3>
      <span className="fac-role">{m.designation}</span>
      <dl>
        <div><dt>Specialization</dt><dd>{m.specialization}</dd></div>
        <div><dt>Experience</dt><dd>{fmtExp(m.experience)}</dd></div>
        <div><dt>Joined</dt><dd>{m.joined ? fmtDate(m.joined) : '—'}</dd></div>
      </dl>
    </article>
  );
}

export default function Faculty() {
  const state = useData('faculty');
  const [schoolIdx, setSchoolIdx] = useState(0);
  const [rank, setRank] = useState('All');
  const [spec, setSpec] = useState('All');
  const [q, setQ] = useState('');
  const [view, setView] = useState('grid');

  const school = state.data?.schools[schoolIdx];
  const members = school?.members ?? [];

  const specs = useMemo(() => ['All', ...[...new Set(members.map((m) => m.specialization))].sort()], [members]);

  const stats = useMemo(() => {
    const count = (r) => members.filter((m) => rankOf(m.designation) === r).length;
    const total = members.reduce((s, m) => s + (m.experience || 0), 0);
    return [
      { v: members.length, l: 'Faculty Members' },
      { v: count('Professor'), l: 'Professors' },
      { v: count('Associate Professor'), l: 'Associate Professors' },
      { v: count('Assistant Professor'), l: 'Assistant Professors' },
      { v: members.filter((m) => m.name.startsWith('Dr.')).length, l: 'Doctorate Holders' },
      { v: `${Math.round(total)}+`, l: 'Years of Combined Experience' }
    ];
  }, [members]);

  const list = members
    .map((m, i) => ({ ...m, sno: i + 1 }))
    .filter((m) => rank === 'All' || rankOf(m.designation) === rank)
    .filter((m) => spec === 'All' || m.specialization === spec)
    .filter((m) => !q.trim() || `${m.name} ${m.specialization} ${m.designation}`.toLowerCase().includes(q.trim().toLowerCase()));

  if (!school) return <Loading state={state} />;

  const reset = () => { setRank('All'); setSpec('All'); setQ(''); };

  return (
    <>
      <PageHeader title="Our Faculty" crumbs={[{ label: 'Academics' }]} image="/images/lecture-1.jpg" />

      <section className="section">
        <div className="container">
          {state.data.schools.length > 1 && (
            <div className="tabs center-tabs">
              {state.data.schools.map((s, i) => (
                <button key={s.slug} className={i === schoolIdx ? 'on' : ''} onClick={() => { setSchoolIdx(i); reset(); }}>{s.name}</button>
              ))}
            </div>
          )}
          <div className="section-head">
            <span className="eyebrow">Faculty List</span>
            <h2>{school.name}</h2>
            <p className="fac-intro">{school.intro}</p>
          </div>
          <div className="fac-stats">
            {stats.map((s) => <div key={s.l}><b>{s.v}</b><span>{s.l}</span></div>)}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <div className="fac-toolbar">
            <div className="tabs">
              {RANKS.map((r) => (
                <button key={r} className={rank === r ? 'on' : ''} onClick={() => setRank(r)}>
                  {r === 'All' ? 'All Faculty' : `${r}s`}
                </button>
              ))}
            </div>
            <div className="fac-controls">
              <input type="search" placeholder="Search by name or subject…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search faculty" />
              <select value={spec} onChange={(e) => setSpec(e.target.value)} aria-label="Filter by specialization">
                {specs.map((s) => <option key={s} value={s}>{s === 'All' ? 'All Specializations' : s}</option>)}
              </select>
              <div className="view-toggle" role="group" aria-label="View">
                <button className={view === 'grid' ? 'on' : ''} onClick={() => setView('grid')} aria-pressed={view === 'grid'}>▦ Cards</button>
                <button className={view === 'table' ? 'on' : ''} onClick={() => setView('table')} aria-pressed={view === 'table'}>☰ Table</button>
              </div>
            </div>
          </div>

          <p className="muted fac-count">Showing {list.length} of {members.length} faculty members</p>

          {list.length === 0 ? (
            <div className="fac-empty">
              <p>No faculty members match your filters.</p>
              <button className="btn" onClick={reset}>Clear filters</button>
            </div>
          ) : view === 'grid' ? (
            <div className="fac-grid">
              {list.map((m) => <FacultyCard key={m.sno} m={m} />)}
            </div>
          ) : (
            <div className="table-wrap">
              <table className="table fac-table">
                <thead>
                  <tr>
                    <th>S. No.</th><th>Name of the Faculty</th><th>Designation</th><th>Specialization</th><th>Joining Date</th><th>Experience (Years)</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((m) => (
                    <tr key={m.sno}>
                      <td>{m.sno}</td>
                      <td><strong>{m.name}</strong></td>
                      <td>{m.designation}</td>
                      <td>{m.specialization}</td>
                      <td>{m.joined ? fmtDate(m.joined) : '—'}</td>
                      <td>{m.experience}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      <section className="banner">
        <div className="container">
          <h2>Join Our Academic Community</h2>
          <p>We are always looking for passionate educators and researchers to strengthen our faculty.</p>
          <Link className="btn btn-gold" to="/careers">View Vacancies</Link>{' '}
          <Link className="btn btn-outline" to="/contact">Contact Us</Link>
        </div>
      </section>
    </>
  );
}
