import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fmtDate, useData } from '../api.js';
import { Counter, Seo } from '../components/ui.jsx';

const SLIDES = [
  { img: '/images/hero-campus.jpg', kicker: 'Admissions 2026–27 Open', title: 'Where Medical Science Meets Compassion', text: 'A modern university campus built for learning, discovery and service to society.', cta: ['/admission', 'Apply Now'], cta2: ['/programs', 'Explore Programmes'] },
  { img: '/images/hero-students.jpg', kicker: 'Learn From The Best', title: 'Competency-Based Medical Education', text: 'Medicine, dentistry, nursing and allied health taught by experienced, mentoring faculty.', cta: ['/programs', 'Our Programmes'], cta2: ['/departments', 'Departments'] },
  { img: '/images/hero-graduation.jpg', kicker: 'Research · Innovation · Ethics', title: 'Shaping Tomorrow’s Healthcare Leaders', text: 'Join a community committed to excellence, integrity and discovery.', cta: ['/about', 'About RMRU'], cta2: ['/research', 'Research'] }
];

function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % SLIDES.length), 6500);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="hero" aria-roledescription="carousel">
      {SLIDES.map((s, n) => (
        <div key={n} className={`slide ${n === i ? 'active' : ''}`} style={{ backgroundImage: `linear-gradient(100deg,rgba(8,32,63,.92) 0%,rgba(8,32,63,.6) 50%,rgba(8,32,63,.15) 100%),url(${s.img})` }} aria-hidden={n !== i}>
          <div className="container slide-body">
            <span className="kicker">{s.kicker}</span>
            <h1>{s.title}</h1>
            <p>{s.text}</p>
            <div className="hero-cta">
              <Link className="btn btn-gold" to={s.cta[0]}>{s.cta[1]}</Link>
              <Link className="btn btn-outline" to={s.cta2[0]}>{s.cta2[1]}</Link>
            </div>
          </div>
        </div>
      ))}
      <button className="arrow left" aria-label="Previous slide" onClick={() => setI((i + SLIDES.length - 1) % SLIDES.length)}>‹</button>
      <button className="arrow right" aria-label="Next slide" onClick={() => setI((i + 1) % SLIDES.length)}>›</button>
      <div className="dots">
        {SLIDES.map((_, n) => <button key={n} className={n === i ? 'on' : ''} aria-label={`Slide ${n + 1}`} onClick={() => setI(n)} />)}
      </div>
    </section>
  );
}

const TILES = [
  ['/admission', '🎓', 'Admission', 'Apply for 2026–27'],
  ['/programs', '📚', 'Programmes', 'UG · PG · PhD'],
  ['/departments', '🏛️', 'Departments', '21 departments'],
  ['/notices', '📢', 'Notices', 'Circulars & updates'],
  ['/careers', '💼', 'Vacancies', 'Join our faculty'],
  ['/teaching-schedule', '🗓️', 'Schedule', 'Teaching timetable']
];

const WHY = [
  ['🧠', 'Competency-Based Curriculum', 'Early clinical exposure and outcome-driven learning aligned with national standards.'],
  ['🔬', 'Research Culture', 'Central research laboratory, seed grants and mentoring for student projects.'],
  ['🩺', 'Simulation Training', 'Mannequin-based skills labs to build confidence before real-world practice.'],
  ['👩‍🏫', 'Experienced Faculty', 'Dedicated teachers and researchers guiding every learner.'],
  ['🏠', 'Safe Residential Campus', 'Secure hostels, hygienic mess, Wi-Fi and recreation facilities.'],
  ['🌍', 'Global Outlook', 'Collaborations, exchange programmes and international conferences.']
];

const FACILITIES = [
  ['Digital Library', '/images/library-2.jpg'],
  ['Simulation Lab', '/images/skills-lab.jpg'],
  ['Lecture Theatres', '/images/lecture-2.jpg'],
  ['Research Labs', '/images/lab-1.jpg'],
  ['Sports Complex', '/images/students-4.jpg'],
  ['Auditorium', '/images/lecture-3.jpg']
];

const TESTIMONIALS = [
  { q: 'The simulation lab and supportive faculty gave me the confidence to handle clinical rotations from day one.', n: 'Aarav S.', r: 'MBBS, Final Year' },
  { q: 'Access to the central research lab helped me publish my first paper during my M.Sc. programme.', n: 'Simran K.', r: 'M.Sc. Medical Sciences' },
  { q: 'The campus feels like a community — mentors, clubs and sports make learning enjoyable.', n: 'Rohan M.', r: 'BDS, Third Year' }
];

const SteplineSteps = [
  ['Check Eligibility', 'Review programme criteria'],
  ['Register Online', 'Create your profile'],
  ['Counselling', 'Merit / counselling round'],
  ['Verification', 'Original documents'],
  ['Enrol', 'Pay fee after allotment']
];

function Head({ kicker, title, sub, light }) {
  return (
    <div className={`section-head ${light ? 'light' : ''}`}>
      {kicker && <span className="eyebrow">{kicker}</span>}
      <h2>{title}</h2>
      {sub && <p>{sub}</p>}
    </div>
  );
}

export default function Home() {
  const { data: site } = useData('site');
  const { data: notices } = useData('notices');
  const { data: programs } = useData('programs');
  const { data: events } = useData('events');
  const { data: gallery } = useData('gallery');
  const { data: leaders } = useData('leadership');
  const { data: depts } = useData('departments');
  const [filter, setFilter] = useState('All');
  const levels = ['All', 'Undergraduate', 'Postgraduate', 'Doctoral'];

  return (
    <>
      <Seo />
      <Hero />

      <div className="tiles container">
        {TILES.map(([to, icon, label, sub]) => (
          <Link key={to} to={to} className="tile"><span>{icon}</span><b>{label}</b><small>{sub}</small></Link>
        ))}
      </div>

      {/* Welcome */}
      <section className="section">
        <div className="container two-col welcome">
          <div className="collage">
            <img className="c1" src="/images/campus-1.jpg" alt="University campus" loading="lazy" />
            <img className="c2" src="/images/students-2.jpg" alt="Students" loading="lazy" />
            <div className="exp"><strong>25+</strong><span>Departments &amp; Centres</span></div>
          </div>
          <div>
            <span className="eyebrow">Welcome</span>
            <h2>Ravindra Medical Research University</h2>
            <p className="lead">Nurturing physicians, dentists, nurses and biomedical scientists who combine clinical competence with ethical values.</p>
            <p>
              Our integrated campus in Chandigarh offers modern lecture theatres, simulation labs, research facilities and
              a vibrant student life. With a competency-based curriculum, mentoring by experienced faculty and a strong
              research culture, we prepare graduates to serve society with knowledge, skill and compassion.
            </p>
            <ul className="ticks two">
              <li>Competency-based curriculum</li><li>Simulation &amp; skills training</li>
              <li>Research &amp; innovation focus</li><li>Ethics &amp; professionalism</li>
            </ul>
            <Link className="btn" to="/about">Discover More</Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats">
        <div className="container stats-grid">
          {site.stats.map((s) => <Counter key={s.label} {...s} />)}
        </div>
      </section>

      {/* Leadership messages */}
      <section className="section alt">
        <div className="container">
          <Head kicker="Leadership" title="Messages From Our Leaders" />
          <div className="cards three">
            {leaders?.map((l) => (
              <article className="leader" key={l.role}>
                <img src={l.image} alt={l.name} loading="lazy" />
                <div>
                  <h3>{l.name}</h3>
                  <span className="badge">{l.role}</span>
                  <p>“{l.message.slice(0, 150)}…”</p>
                  <Link to="/about/leadership">Read full message →</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Programmes */}
      <section className="section">
        <div className="container">
          <Head kicker="Academics" title="Our Programmes" sub="Undergraduate, postgraduate and doctoral education" />
          <div className="tabs center-tabs">
            {levels.map((l) => <button key={l} className={filter === l ? 'on' : ''} onClick={() => setFilter(l)}>{l}</button>)}
          </div>
          <div className="cards">
            {programs?.filter((p) => filter === 'All' || p.level === filter).map((p) => (
              <Link to="/programs" className="card" key={p.slug}>
                <img src={p.image} alt={p.name} loading="lazy" />
                <div className="card-body">
                  <span className="badge">{p.level} · {p.duration.split(' (')[0]}</span>
                  <h3>{p.name}</h3>
                  <p>{p.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="section dark">
        <div className="container">
          <Head light kicker="Why RMRU" title="Why Choose Ravindra Medical Research University" />
          <div className="why">
            {WHY.map(([icon, t, d]) => (
              <div className="why-item" key={t}><span>{icon}</span><h3>{t}</h3><p>{d}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* Notices + Events */}
      <section className="section alt">
        <div className="container two-col even">
          <div>
            <Head kicker="Updates" title="Notifications" />
            <ul className="notice-list">
              {notices?.slice(0, 6).map((n) => (
                <li key={n.id}>
                  <time>{fmtDate(n.date)}</time>
                  <a href={n.file} target="_blank" rel="noreferrer">{n.title}</a>
                  <span className="badge">{n.category}</span>
                </li>
              ))}
            </ul>
            <p><Link className="btn" to="/notices">View All Notices</Link></p>
          </div>
          <div>
            <Head kicker="Calendar" title="Upcoming Events" />
            <div className="event-list">
              {events?.slice(0, 4).map((e) => {
                const d = new Date(e.date);
                return (
                  <article key={e.id}>
                    <div className="date"><b>{d.getDate()}</b><span>{d.toLocaleString('en-IN', { month: 'short' })}</span></div>
                    <div><span className="badge">{e.type}</span><h4>{e.title}</h4></div>
                  </article>
                );
              })}
            </div>
            <p><Link className="btn" to="/events">All Events</Link></p>
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="section">
        <div className="container">
          <Head kicker="Departments" title="Explore Our Departments" sub="Pre-clinical, para-clinical and clinical disciplines" />
          <div className="chips">
            {depts?.map((d) => <Link key={d.slug} to={`/departments/${d.slug}`}>{d.name}</Link>)}
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="section alt">
        <div className="container">
          <Head kicker="Campus" title="World-Class Facilities" />
          <div className="facilities">
            {FACILITIES.map(([n, img]) => (
              <Link to="/students" key={n} className="facility" style={{ backgroundImage: `url(${img})` }}><span>{n}</span></Link>
            ))}
          </div>
        </div>
      </section>

      {/* Research highlight */}
      <section className="research-band" style={{ backgroundImage: 'linear-gradient(90deg,rgba(8,32,63,.93),rgba(122,31,43,.85)),url(/images/research.jpg)' }}>
        <div className="container two-col even">
          <div>
            <span className="eyebrow gold">Research &amp; Innovation</span>
            <h2>Discovery That Improves Health</h2>
            <p>From molecular biology to community health, our researchers and students work on projects that address real health challenges. Shared labs, seed grants and an Institutional Ethics Committee support every step.</p>
            <Link className="btn btn-gold" to="/research">Explore Research</Link>
          </div>
          <div className="research-stats">
            <div><b>60+</b><span>Active projects</span></div>
            <div><b>3</b><span>Research centres</span></div>
            <div><b>100+</b><span>Publications / year</span></div>
            <div><b>20+</b><span>Funded fellowships</span></div>
          </div>
        </div>
      </section>

      {/* Admission process */}
      <section className="section">
        <div className="container">
          <Head kicker="Admission" title="Your Journey Starts Here" sub="A simple five-step admission process" />
          <ol className="timeline">
            {SteplineSteps.map(([t, d], i) => (
              <li key={t}><span>{i + 1}</span><h4>{t}</h4><p>{d}</p></li>
            ))}
          </ol>
          <p className="center"><Link className="btn btn-gold" to="/admission">Admission Details</Link></p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section alt">
        <div className="container">
          <Head kicker="Voices" title="What Our Students Say" />
          <div className="cards three">
            {TESTIMONIALS.map((t) => (
              <blockquote className="quote" key={t.n}>
                <p>“{t.q}”</p>
                <footer><b>{t.n}</b><span>{t.r}</span></footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section">
        <div className="container">
          <Head kicker="Gallery" title="Life at RMRU" />
          <div className="strip">
            {gallery?.slice(0, 6).map((g) => <img key={g.src} src={g.src} alt={g.caption} loading="lazy" />)}
          </div>
          <p className="center"><Link className="btn" to="/gallery">Open Gallery</Link></p>
        </div>
      </section>

      {/* Approvals */}
      <section className="approvals">
        <div className="container">
          <span>Recognised &amp; Approved By</span>
          {['UGC', 'NMC', 'DCI', 'INC', 'NAAC'].map((a) => <b key={a}>{a}</b>)}
        </div>
      </section>

      {/* CTA */}
      <section className="banner">
        <div className="container">
          <h2>Admissions 2026–27 Open</h2>
          <p>No payment is due before provisional allotment and document verification by the university.</p>
          <Link className="btn btn-gold" to="/admission">Apply Now</Link>{' '}
          <Link className="btn btn-outline" to="/contact">Talk to Us</Link>
        </div>
      </section>
    </>
  );
}
