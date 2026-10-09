export const NAV = [
  { label: 'Home', to: '/' },
  {
    label: 'About', to: '/about',
    children: [
      { label: 'About Us', to: '/about' },
      { label: 'Vision & Mission', to: '/about/vision' },
      { label: 'Messages & Leadership', to: '/about/leadership' },
      { label: 'Affiliations & Approvals', to: '/about/affiliations' },
      { label: 'Committees', to: '/about/committees' },
      { label: 'Citizen Charter', to: '/about/citizen-charter' }
    ]
  },
  { label: 'Admission', to: '/admission' },
  {
    label: 'Academics', to: '/programs',
    children: [
      { label: 'Programmes', to: '/programs' },
      { label: 'Academic Calendar', to: '/academics/calendar' },
      { label: 'Teaching Schedule', to: '/teaching-schedule' }
    ]
  },
  { label: 'Departments', to: '/departments' },
  { label: 'Faculty', to: '/faculty' },
  { label: 'Students', to: '/students' },
  { label: 'Research', to: '/research' },
  {
    label: 'Media', to: '/events',
    children: [
      { label: 'Events', to: '/events' },
      { label: 'Gallery', to: '/gallery' },
      { label: 'Notices & Circulars', to: '/notices' }
    ]
  },
  { label: 'Careers', to: '/careers' },
  { label: 'Contact', to: '/contact' }
];
