import { useState } from 'react';
import Loader from '../../components/Loader/Loader';
import Cursor from '../../components/Cursor/Cursor';
import BackgroundFX from '../../components/BackgroundFX/BackgroundFX';
import Navbar from '../../components/Navbar/Navbar';
import BackToTop from '../../components/BackToTop/BackToTop';
import Modal from '../../components/Modal/Modal';
import Footer from '../../components/Footer/Footer';
import { useScrollState } from '../../hooks/useScrollState';
import { useSectionSync } from '../../hooks/useSectionSync';
import { usePageTitle } from '../../hooks/usePageTitle';

import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Services from './sections/Services';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Education from './sections/Education';
import Certifications from './sections/Certifications';
import Testimonials from './sections/Testimonials';
import Contact from './sections/Contact';

export default function MainPage() {
  const { scrolled, progress, showBackTop, activeSection } = useScrollState();
  const [activeProject, setActiveProject] = useState(null);

  // Bumping this replays the Loader's intro animation on demand
  // (used when the "Jonee.dev" logo is clicked)
  const [loaderTrigger, setLoaderTrigger] = useState(0);
  const replayLoader = () => setLoaderTrigger((t) => t + 1);

  // Scrolls to whatever section the current URL points to
  // (handles first load, hard refresh on a deep link, and back/forward nav)
  useSectionSync();

  // Keeps the browser tab title in sync with the section in view,
  // e.g. "Home | JJRA - Portfolio", "Projects | JJRA - Portfolio".
  usePageTitle(activeSection);

  return (
    <>
      <Loader trigger={loaderTrigger} />
      <Cursor />
      <BackgroundFX />
      <Navbar
        scrolled={scrolled}
        progress={progress}
        activeSection={activeSection}
        onLogoClick={replayLoader}
      />

      <main>
        <Hero />
        <About />
        <Skills />
        <Services />
        <Projects onOpenProject={setActiveProject} />
        <Experience />
        <Education />
        <Certifications />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
      <BackToTop show={showBackTop} />
      <Modal project={activeProject} onClose={() => setActiveProject(null)} />
    </>
  );
}