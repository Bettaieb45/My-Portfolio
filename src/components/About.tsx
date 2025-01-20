import React from 'react';
import Image from 'next/image';
import CtaButton from './CtaButton';

const skills = [
  { name: 'React.js', svg: '/uploads/react-logo.svg' },
  { name: 'Next.js', svg: '/uploads/next-logo.svg' },
  { name: 'WordPress', svg: '/uploads/wordpress-logo.svg' },
  { name: 'Python', svg: '/uploads/python-logo.svg' },
];

const About = () => {
  return (
    <div className="about container-1120 py-16" id="about">
      <div className="about-wrapper">
        <h1>About Me</h1>
        <p className="py-10">
          &quot; I’m Aziz, a junior web developer specializing in responsive,
          SEO-friendly websites using modern technologies like React.js,
          Next.js, Tailwind CSS, and WordPress. I’m also experienced in Python
          Selenium automation, delivering clean, user-friendly designs and
          efficient workflows. Let’s build something amazing together! &quot;
        </p>
        <h3 className="py-4">Best Skill on:</h3>
        <div className="skills-wrapper flex gap-6 pointer-events-auto">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="skill-item bg-black p-2 rounded-lg shadow-lg flex items-center justify-center group transition-transform transform hover:scale-110"
            >
              <div className="relative ">
                <Image
                  src={skill.svg}
                  alt={`${skill.name} logo`}
                  width={30}
                  height={30}
                  className="group-hover:brightness-150"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-30 rounded-lg transition-opacity"></div>
            </div>
          ))}
        </div>
        <div className="button py-10 pointer-events-auto">
          <CtaButton
            text="Download Resume"
            href="/uploads/resume.pdf"
            target="_blank"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
