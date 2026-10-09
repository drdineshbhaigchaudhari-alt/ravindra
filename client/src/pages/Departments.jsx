import { Link, useParams } from 'react-router-dom';
import { useData } from '../api.js';
import { Loading, PageHeader, Section } from '../components/ui.jsx';

export function Departments() {
  const state = useData('departments');
  const { data } = state;
  if (!data) return <Loading state={state} />;
  const groups = [...new Set(data.map((d) => d.group))];
  return (
    <>
      <PageHeader title="Departments" crumbs={[]} image="/images/lab-1.jpg" />
      {groups.map((g, i) => (
        <Section key={g} title={`${g} Departments`} alt={i % 2 === 1}>
          <div className="cards">
            {data.filter((d) => d.group === g).map((d) => (
              <Link to={`/departments/${d.slug}`} className="card" key={d.slug}>
                <img src={d.image} alt="" loading="lazy" />
                <div className="card-body"><h3>{d.name}</h3></div>
              </Link>
            ))}
          </div>
        </Section>
      ))}
    </>
  );
}

export function DepartmentDetail() {
  const { slug } = useParams();
  const state = useData('departments');
  const { data } = state;
  if (!data) return <Loading state={state} />;
  const d = data.find((x) => x.slug === slug);
  if (!d) return <PageHeader title="Department Not Found" crumbs={[{ label: 'Departments', to: '/departments' }]} />;
  return (
    <>
      <PageHeader title={d.name} crumbs={[{ label: 'Departments', to: '/departments' }]} image={d.image} />
      <Section>
        <div className="two-col">
          <div>
            <h2>Department of {d.name}</h2>
            <p>{d.overview}</p>
            <h3>Highlights</h3>
            <ul className="ticks">{d.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
            <h3>Programmes</h3>
            <p>{d.programs.join(' · ')}</p>
          </div>
          <img className="rounded" src={d.image} alt={`${d.name} department`} />
        </div>
      </Section>
    </>
  );
}
