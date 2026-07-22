import { useEffect } from 'react';

// Maps each section id (from useScrollState) to the label shown in the tab title.
const TITLES = {
  home: 'Home',
  about: 'About',
  skills: 'Skills',
  services: 'Services',
  projects: 'Projects',
  experience: 'Experience',
  education: 'Education',
  certs: 'Certifications',
  testimonials: 'Testimonials',
  contact: 'Contact',
};

const SITE_NAME = 'JJRA - Portfolio';

// Keeps the browser tab title in sync with whichever section is currently
// active on the page, e.g. "Home | JJRA - Portfolio", "Projects | JJRA - Portfolio".
export function usePageTitle(activeSection) {
  useEffect(() => {
    const label = TITLES[activeSection] || 'Home';
    document.title = `${label} | ${SITE_NAME}`;
  }, [activeSection]);
}
