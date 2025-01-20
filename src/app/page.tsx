import Hero from '../components/Hero';
import About from '@/components/About';
import Portfolio from '@/components/Portfolio';
import Contact from '@/components/Contact';
export default function Home() {
  return (
    <>
      <div className="content z-20 pointer-events-none select-none relative">
        <Hero />
        <About />
        <Portfolio />
        <Contact />
      </div>
    </>
  );
}
