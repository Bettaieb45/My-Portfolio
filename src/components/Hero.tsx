import CtaButton from './CtaButton';

const Hero = () => {
  return (
    <div className="hero container-1120 py-32 " id="hero">
      <div className="hero-wrapper">
        <h1>Hi, I'm Aziz</h1>
        <h2 className="max-w-xl py-8">
          Junior Web Developer Specializing in Modern Web Technologies
        </h2>
        <div className="button-wrapper flex flex-col gap-5 items-center sm:flex-row  max-w-xl justify-between pointer-events-auto">
          <CtaButton text="View My Work" href="#portfolio" />
          <CtaButton text="Get In Touch" href="#contact" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
