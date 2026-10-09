import { Link, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import { PageHeader } from './components/ui.jsx';
import Home from './pages/Home.jsx';
import {
  About, Vision, Affiliations, Leadership, Committees, CitizenCharter,
  Admission, Programs, Calendar, TeachingSchedule, Students, Research,
  Events, Gallery, Notices, Careers
} from './pages/Pages.jsx';
import { Departments, DepartmentDetail } from './pages/Departments.jsx';
import Contact from './pages/Contact.jsx';

function NotFound() {
  return (
    <>
      <PageHeader title="Page Not Found" />
      <div className="container section">
        <p>The page you are looking for does not exist. <Link to="/">Return to the home page</Link>.</p>
      </div>
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="about/vision" element={<Vision />} />
        <Route path="about/leadership" element={<Leadership />} />
        <Route path="about/affiliations" element={<Affiliations />} />
        <Route path="about/committees" element={<Committees />} />
        <Route path="about/citizen-charter" element={<CitizenCharter />} />
        <Route path="admission" element={<Admission />} />
        <Route path="programs" element={<Programs />} />
        <Route path="academics/calendar" element={<Calendar />} />
        <Route path="teaching-schedule" element={<TeachingSchedule />} />
        <Route path="departments" element={<Departments />} />
        <Route path="departments/:slug" element={<DepartmentDetail />} />
        <Route path="students" element={<Students />} />
        <Route path="research" element={<Research />} />
        <Route path="events" element={<Events />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="notices" element={<Notices />} />
        <Route path="careers" element={<Careers />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
