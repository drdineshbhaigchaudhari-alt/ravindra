import { useState } from 'react';
import { postEnquiry, useData } from '../api.js';
import { Loading, MapSection, PageHeader, Section } from '../components/ui.jsx';

export default function Contact({ subject = '' }) {
  const state = useData('site');
  const { data: site } = state;
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject, message: '' });
  const [status, setStatus] = useState({ type: '', msg: '' });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  if (!site) return <Loading state={state} />;

  const submit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'info', msg: 'Sending…' });
    try {
      await postEnquiry(form);
      setStatus({ type: 'ok', msg: 'Thank you! Your message has been received.' });
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      setStatus({ type: 'err', msg: err.message });
    }
  };

  return (
    <>
      <PageHeader title="Contact Us" image="/images/campus-2.jpg" />
      <Section>
        <div className="two-col">
          <div className="contact-info">
            <h2>Get in touch</h2>
            <p><strong>Address</strong><br />{site.address}</p>
            <p><strong>Phone</strong><br />{site.phones.join(' / ')}<br />Toll free: {site.tollFree}</p>
            <p><strong>Email</strong><br />{Object.entries(site.emails).map(([k, v]) => <span key={k}>{k}: <a href={`mailto:${v}`}>{v}</a><br /></span>)}</p>
            <p><strong>Helplines</strong><br />{Object.entries(site.helplines).map(([k, v]) => <span key={k}>{k}: {v}<br /></span>)}</p>
          </div>
          <form className="form" onSubmit={submit}>
            <h2>Send us a message</h2>
            <label>Name<input required value={form.name} onChange={set('name')} maxLength={100} /></label>
            <label>Email<input required type="email" value={form.email} onChange={set('email')} /></label>
            <label>Phone<input value={form.phone} onChange={set('phone')} /></label>
            <label>Subject<input value={form.subject} onChange={set('subject')} /></label>
            <label>Message<textarea required rows={5} minLength={5} value={form.message} onChange={set('message')} /></label>
            <button className="btn" type="submit">Submit</button>
            {status.msg && <p className={`status ${status.type}`} role="status">{status.msg}</p>}
          </form>
        </div>
      </Section>
      <MapSection site={site} alt />
    </>
  );
}
