import { useState } from 'react';
import { Link } from 'react-router-dom';
import { fmtDate, useData } from '../api.js';
import { DataTable, Loading, PageHeader, Section, ViewLink } from '../components/ui.jsx';

const ABOUT = [{ label: 'About', to: '/about' }];

function usePage(key) {
  const state = useData('pages');
  return { ...state, page: state.data?.[key] };
}

export function About() {
  const s = usePage('about');
  if (!s.page) return <Loading state={s} />;
  const p = s.page;
  return (
    <>
      <PageHeader title={p.title} image={p.image} />
      <Section>
        <div className="two-col">
          <div>{p.paras.map((t) => <p key={t}>{t}</p>)}</div>
          <img className="rounded" src="/images/campus-1.jpg" alt="University campus" />
        </div>
      </Section>
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
