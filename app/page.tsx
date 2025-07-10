import Hero from '@/components/home/Hero';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import Skills from '@/components/home/Skills';
import Testimonials from '@/components/home/Testimonials';
import Services from '@/components/home/Services';
import ContactCTA from '@/components/home/ContactCTA';

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <Skills />
      <Services />
      <Testimonials />
      <ContactCTA />
    </>
  );
}