import HeroSection    from '@/components/sections/HeroSection';
import AboutSection   from '@/components/sections/AboutSection';
import SkillsSection  from '@/components/sections/SkillsSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import CertificatesSection from '@/components/sections/CertificatesSection';

export default function HomePage() {
  return (
    <>
       <>
      <HeroSection  />
        <SkillsSection />
        <CertificatesSection />
      <ProjectsSection />
    </>
    </>
  );
}
