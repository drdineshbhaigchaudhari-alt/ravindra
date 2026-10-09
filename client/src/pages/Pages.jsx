import { useState } from 'react';
import { Link } from 'react-router-dom';
import { fmtDate, useData } from '../api.js';
import { Counter, DataTable, Loading, MapSection, PageHeader, Section, ViewLink } from '../components/ui.jsx';

const ABOUT = [{ label: 'About', to: '/about' }];

function usePage(key) {
  const state = useData('pages');
  return { ...state, page: state.data?.[key] };
}

function Head({ kicker, title, sub, light }) {
  return (
    <div className={`section-head ${light ? 'light' : ''}`}>
      {kicker && <span className="eyebrow">{kicker}</span>}
      <h2>{title}</h2>
      {sub && <p>{sub}</p>}
    </div>
  );
}

export function About() {
  const s = usePage('about');
  const { data: site } = useData('site');
  const { data: leaders } = useData('leadership');
  if (!s.page) return <Loading state={s} />;
  const p = s.page;
  const v = s.data.vision;
  return (
    <>
      <PageHeader title={p.title} image={p.image} />

      {/* Intro */}
      <section className="section">
        <div className="container two-col welcome">
          <div className="collage">
            <img className="c1" src="/images/campus-1.jpg" alt="University campus" loading="lazy" />
            <img className="c2" src="/images/students-1.jpg" alt="Students on campus" loading="lazy" />
            <div className="exp"><strong>25+</strong><span>Departments &amp; Centres</span></div>
          </div>
          <div>
            <span className="eyebrow">Who We Are</span>
            <h2>{p.heading}</h2>
            <p className="lead">{p.paras[0]}</p>
            {p.paras.slice(1).map((t) => <p key={t}>{t}</p>)}
            <ul className="ticks two">{p.highlights?.map((h) => <li key={h}>{h}</li>)}</ul>
            <Link className="btn" to="/programs">Explore Programmes</Link>{' '}
            <Link className="btn btn-gold" to="/admission">Admissions</Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      {site?.stats && (
        <section className="stats">
          <div className="container stats-grid">
            {site.stats.map((st) => <Counter key={st.label} {...st} />)}
          </div>
        </section>
      )}

      {/* Vision & Mission */}
      {v && (
        <section className="section alt">
          <div className="container">
            <Head kicker="Our Purpose" title="Vision & Mission" />
            <div className="vm-grid">
              <div className="vm-card vision">
                <span className="vm-icon" aria-hidden="true">👁️</span>
                <h3>Our Vision</h3>
                <p>{v.vision}</p>
              </div>
              <div className="vm-card">
                <span className="vm-icon" aria-hidden="true">🎯</span>
                <h3>Our Mission</h3>
                <ul className="ticks">{v.mission.map((m) => <li key={m}>{m}</li>)}</ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Core values */}
      {p.values && (
        <section className="section dark">
          <div className="container">
            <Head light kicker="What We Stand For" title="Our Core Values" />
            <div className="why">
              {p.values.map((val) => (
                <div className="why-item" key={val.t}><span>{val.icon}</span><h3>{val.t}</h3><p>{val.d}</p></div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Schools */}
      {p.schools && (
        <section className="section">
          <div className="container">
            <Head kicker="Academics" title="Our Schools & Centres" sub="Health-science disciplines under one academic roof" />
            <div className="cards three">
              {p.schools.map((sc) => (
                <Link to={sc.to} className="card school-card" key={sc.name}>
                  <img src={sc.image} alt="" loading="lazy" />
                  <div className="card-body">
                    <h3>{sc.name}</h3>
                    <p>{sc.desc}</p>
                    <span className="more">Learn more →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Approach */}
      {p.approach && (
        <section className="section alt">
          <div className="container">
            <Head kicker="How We Teach" title="Our Learning Approach" />
            <ol className="timeline approach">
              {p.approach.map((a, i) => (
                <li key={a.t}><span>{i + 1}</span><h4>{a.t}</h4><p>{a.d}</p></li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* Leadership */}
      {leaders?.length > 0 && (
        <section className="section">
          <div className="container">
            <Head kicker="Leadership" title="Guided by Experience" />
            <div className="cards three">
              {leaders.map((l) => (
                <article className="leader" key={l.role}>
                  <img src={l.image} alt={l.name} loading="lazy" />
                  <div>
                    <h3>{l.name}</h3>
                    <span className="badge">{l.role}</span>
                    <p>“{l.message.slice(0, 130)}…”</p>
                  </div>
                </article>
              ))}
            </div>
            <p className="center">
              <Link className="btn" to="/about/leadership">Leadership Messages</Link>{' '}
              <Link className="btn btn-gold" to="/faculty">Meet Our Faculty</Link>
            </p>
          </div>
        </section>
      )}

      {/* Facilities */}
      {p.facilities && (
        <section className="section alt">
          <div className="container">
            <Head kicker="Campus" title="Infrastructure & Facilities" />
            <div className="facilities">
              {p.facilities.map((f) => (
                <Link to="/students" key={f.name} className="facility" style={{ backgroundImage: `url(${f.image})` }}><span>{f.name}</span></Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Approvals */}
      <section className="approvals">
        <div className="container">
          <span>Recognised &amp; Approved By</span>
          {['UGC', 'NMC', 'DCI', 'INC', 'NAAC'].map((a) => <b key={a}>{a}</b>)}
          <Link to="/about/affiliations">View details →</Link>
        </div>
      </section>

      <MapSection site={site} alt />

      <section className="banner">
        <div className="container">
          <h2>Begin Your Journey With RMRU</h2>
          <p>Join a community of learners, healers and researchers committed to transforming healthcare.</p>
          <Link className="btn btn-gold" to="/admission">Apply Now</Link>{' '}
          <Link className="btn btn-outline" to="/contact">Contact Us</Link>
        </div>
      </section>
    </>
  );
}

export function Vision() {
  const s = usePage('vision');
  if (!s.page) return <Loading state={s} />;
  const p = s.page;
  return (
    <>
      <PageHeader title={p.title} crumbs={ABOUT} image={p.image} />
      <Section>
        <div className="two-col">
          <div>
            <h2>Vision</h2>
            <p className="lead">{p.vision}</p>
            <h2>Mission</h2>
            <ul className="ticks">{p.mission.map((m) => <li key={m}>{m}</li>)}</ul>
          </div>
          <img className="rounded" src="/images/lecture-3.jpg" alt="University auditorium" />
        </div>
      </Section>
    </>
  );
}

export function Affiliations() {
  const s = usePage('affiliations');
  if (!s.page) return <Loading state={s} />;
  return (
    <>
      <PageHeader title={s.page.title} crumbs={ABOUT} />
      <Section><ul className="ticks">{s.page.items.map((m) => <li key={m}>{m}</li>)}</ul></Section>
    </>
  );
}

export function CitizenCharter() {
  const s = usePage('citizen');
  if (!s.page) return <Loading state={s} />;
  return (
    <>
      <PageHeader title={s.page.title} crumbs={ABOUT} />
      <Section><ul className="ticks">{s.page.items.map((m) => <li key={m}>{m}</li>)}</ul></Section>
    </>
  );
}

export function Leadership() {
  const state = useData('leadership');
  if (!state.data) return <Loading state={state} />;
  return (
    <>
      <PageHeader title="Messages & Leadership" crumbs={ABOUT} />
      <Section>
        {state.data.map((l, i) => (
          <article className={`message ${i % 2 ? 'rev' : ''}`} key={l.role}>
            <img src={l.image} alt={l.name} loading="lazy" />
            <div>
              <h2>Message from the {l.role}</h2>
              <p className="lead">“{l.message}”</p>
              <strong>{l.name}</strong>
              <div className="muted">{l.role}</div>
            </div>
          </article>
        ))}
      </Section>
    </>
  );
}

export function Committees() {
  const state = useData('committees');
  if (!state.data) return <Loading state={state} />;
  return (
    <>
      <PageHeader title="Committees" crumbs={ABOUT} />
      <Section>
        <div className="cards three">
          {state.data.map((c) => (
            <div className="card pad" key={c.name}>
              <h3>{c.name}</h3>
              <p>{c.desc}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

export function Admission() {
  const s = usePage('admission');
  const programs = useData('programs');
  const faqs = useData('faqs');
  if (!s.page) return <Loading state={s} />;
  const p = s.page;
  return (
    <>
      <PageHeader title={p.title} image={p.image} />
      <Section title="Admission Process">
        <div className="notice-box">{p.notice}</div>
        <ol className="steps">
          {p.steps.map((st, i) => (
            <li key={st.t}><span>{i + 1}</span><div><h3>{st.t}</h3><p>{st.d}</p></div></li>
          ))}
        </ol>
      </Section>
      <Section title="Programmes & Eligibility" alt>
        {programs.data && (
          <DataTable
            columns={[
              { key: 'name', label: 'Programme', render: (r) => <strong>{r.name}</strong> },
              { key: 'duration', label: 'Duration' },
              { key: 'seats', label: 'Seats' },
              { key: 'eligibility', label: 'Eligibility' }
            ]}
            rows={programs.data}
          />
        )}
      </Section>
      <Section title="Frequently Asked Questions">
        {faqs.data?.map((f) => (
          <details className="faq" key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
        ))}
        <p><Link className="btn" to="/contact">Contact Admission Office</Link></p>
      </Section>
    </>
  );
}

export function Programs() {
  const state = useData('programs');
  if (!state.data) return <Loading state={state} />;
  const levels = [...new Set(state.data.map((p) => p.level))];
  return (
    <>
      <PageHeader title="Programmes" crumbs={[{ label: 'Academics' }]} image="/images/lecture-1.jpg" />
      {levels.map((lv, i) => (
        <Section key={lv} title={`${lv} Programmes`} alt={i % 2 === 1}>
          <div className="cards">
            {state.data.filter((p) => p.level === lv).map((p) => (
              <article className="card" key={p.slug}>
                <img src={p.image} alt="" loading="lazy" />
                <div className="card-body">
                  <h3>{p.name}</h3>
                  <p className="muted">{p.full}</p>
                  <p>{p.summary}</p>
                  <p><strong>Duration:</strong> {p.duration}<br /><strong>Seats:</strong> {p.seats}</p>
                  <p><strong>Eligibility:</strong> {p.eligibility}</p>
                </div>
              </article>
            ))}
          </div>
        </Section>
      ))}
    </>
  );
}

export function Calendar() {
  const s = usePage('calendar');
  if (!s.page) return <Loading state={s} />;
  return (
    <>
      <PageHeader title={s.page.title} crumbs={[{ label: 'Academics' }]} />
      <Section>
        <DataTable
          columns={[{ key: 'event', label: 'Event' }, { key: 'date', label: 'Date' }]}
          rows={s.page.rows}
        />
      </Section>
    </>
  );
}

export function TeachingSchedule() {
  const state = useData('schedules');
  const [tab, setTab] = useState('ug');
  if (!state.data) return <Loading state={state} />;
  return (
    <>
      <PageHeader title="Teaching Schedule" crumbs={[{ label: 'Student Corner', to: '/students' }]} />
      <Section>
        <div className="tabs" role="tablist">
          <button role="tab" aria-selected={tab === 'ug'} className={tab === 'ug' ? 'on' : ''} onClick={() => setTab('ug')}>Undergraduate</button>
          <button role="tab" aria-selected={tab === 'pg'} className={tab === 'pg' ? 'on' : ''} onClick={() => setTab('pg')}>Postgraduate</button>
        </div>
        <DataTable
          columns={[
            { key: 'title', label: 'Title' },
            { key: 'file', label: 'File', render: (r) => <ViewLink file={r.file} /> }
          ]}
          rows={state.data[tab]}
        />
      </Section>
    </>
  );
}

export function Students() {
  const s = usePage('student');
  if (!s.page) return <Loading state={s} />;
  return (
    <>
      <PageHeader title={s.page.title} image="/images/students-3.jpg" />
      <Section>
        <div className="cards">
          {s.page.items.map((it) => (
            <article className="card" key={it.name}>
              <img src={it.image} alt="" loading="lazy" />
              <div className="card-body"><h3>{it.name}</h3><p>{it.desc}</p></div>
            </article>
          ))}
        </div>
        <p className="center">
          <Link className="btn" to="/teaching-schedule">Teaching Schedule</Link>{' '}
          <Link className="btn" to="/academics/calendar">Academic Calendar</Link>{' '}
          <Link className="btn" to="/about/committees">Anti-Ragging &amp; Grievance</Link>
        </p>
      </Section>
    </>
  );
}

export function Research() {
  const s = usePage('research');
  if (!s.page) return <Loading state={s} />;
  const p = s.page;
  return (
    <>
      <PageHeader title={p.title} image={p.image} />
      <Section>{p.paras.map((t) => <p key={t} className="lead">{t}</p>)}</Section>
      <Section title="Research Centres" alt>
        <div className="cards three">
          {p.centres.map((c) => (
            <article className="card" key={c.name}>
              <img src={c.image} alt="" loading="lazy" />
              <div className="card-body"><h3>{c.name}</h3></div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}

export function Events() {
  const state = useData('events');
  const [f, setF] = useState('All');
  if (!state.data) return <Loading state={state} />;
  const types = ['All', 'Academic', 'Cultural', 'Sports'];
  const list = state.data.filter((e) => f === 'All' || e.type === f);
  return (
    <>
      <PageHeader title="Events" crumbs={[{ label: 'Media' }]} image="/images/students-3.jpg" />
      <Section>
        <div className="tabs">
          {types.map((t) => <button key={t} className={f === t ? 'on' : ''} onClick={() => setF(t)}>{t}</button>)}
        </div>
        <div className="cards three">
          {list.map((e) => (
            <article className="card" key={e.id}>
              <img src={e.image} alt="" loading="lazy" />
              <div className="card-body">
                <span className="badge">{e.type} · {fmtDate(e.date)}</span>
                <h3>{e.title}</h3>
                <p>{e.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}

export function Gallery() {
  const state = useData('gallery');
  const [f, setF] = useState('All');
  const [open, setOpen] = useState(null);
  if (!state.data) return <Loading state={state} />;
  const cats = ['All', ...new Set(state.data.map((g) => g.cat))];
  const list = state.data.filter((g) => f === 'All' || g.cat === f);
  return (
    <>
      <PageHeader title="Photo Gallery" crumbs={[{ label: 'Media' }]} image="/images/campus-3.jpg" />
      <Section>
        <div className="tabs">
          {cats.map((c) => <button key={c} className={f === c ? 'on' : ''} onClick={() => setF(c)}>{c}</button>)}
        </div>
        <div className="masonry">
          {list.map((g) => (
            <figure key={g.src} onClick={() => setOpen(g)}>
              <img src={g.src} alt={g.caption} loading="lazy" />
              <figcaption>{g.caption}</figcaption>
            </figure>
          ))}
        </div>
      </Section>
      {open && (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setOpen(null)}>
          <img src={open.src} alt={open.caption} />
          <p>{open.caption} — click anywhere to close</p>
        </div>
      )}
    </>
  );
}

export function Notices() {
  const state = useData('notices');
  if (!state.data) return <Loading state={state} />;
  return (
    <>
      <PageHeader title="Notices & Circulars" crumbs={[{ label: 'Media' }]} />
      <Section>
        <DataTable
          columns={[
            { key: 'date', label: 'Date', render: (r) => fmtDate(r.date) },
            { key: 'title', label: 'Title' },
            { key: 'category', label: 'Category' },
            { key: 'file', label: 'File', render: (r) => <ViewLink file={r.file} /> }
          ]}
          rows={state.data}
        />
      </Section>
    </>
  );
}

export function Careers() {
  const state = useData('vacancies');
  if (!state.data) return <Loading state={state} />;
  return (
    <>
      <PageHeader title="Careers & Vacancies" />
      <Section>
        <DataTable
          columns={[
            { key: 'post', label: 'Post' },
            { key: 'dept', label: 'Department' },
            { key: 'last', label: 'Last Date', render: (r) => fmtDate(r.last) }
          ]}
          rows={state.data}
        />
        <p>Send your CV and application to <a href="mailto:hr@ravindrameduni.com">hr@ravindrameduni.com</a>.</p>
      </Section>
    </>
  );
}
