import React from 'react';
import Image from 'next/image';

const projects = [
  {
    title: 'Coast Roofing Website Development',
    description:
      'Designed and developed a responsive website for Coast Roofing using the Bridge WordPress theme, focusing on performance and user-friendly navigation.',
    image: '/uploads/coast-roofing.png', // Replace with your actual image path
  },
  {
    title: 'Blog Section WordPress Website',
    description:
      'Built a fully functional blog section with custom Gutenberg blocks, designed for seamless content management and enhanced user engagement.',
    image: '/uploads/blog-section.png', // Replace with your actual image path
  },
  {
    title: 'Selenium Automation for WordPress Link Updates',
    description:
      'Developed a Python Selenium script to automate link updates across multiple WordPress posts, streamlining the editing process for improved efficiency.',
    image: '/uploads/selenium-automation.png', // Replace with your actual image path
  },
];

const Portfolio = () => {
  return (
    <div className="portfolio container-1120 py-16" id="portfolio">
      <div className="portfolio-wrapper">
        <h2 className="text-4xl font-bold mb-12">Portfolio</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-10">
          {projects.map((project, index) => (
            <div
              key={index}
              className="relative group   p-5 pointer-events-auto portfolio-card bg-gray-900 text-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-transform duration-300 hover:scale-105"
            >
              {/* Image Section */}
              <div className="relative w-full h-48 rounded-lg overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Overlay Effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none"></div>

              {/* Content Section */}
              <div className="pt-4 flex flex-col gap-2 z-10 relative">
                <h3 className=" group-hover:text-purple-500 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="  group-hover:text-white transition-colors duration-300">
                  {project.description}
                </p>
              </div>

              {/* Border Glow Effect */}
              <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-purple-500 group-hover:shadow-purple-500 transition-all duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
