import Image from 'next/image';
const contactLinks = [
  {
    name: 'Gmail',
    link: 'mailto:mohamedazizbettaieb6@gmail.com',
    image: '/uploads/gmail-logo.svg',
  },
  {
    name: 'LinkedIn',
    link: 'https://www.linkedin.com/in/mohamedazizbettaieb/',
    image: '/uploads/linkedin-logo.svg',
  },
  {
    name: 'GitHub',
    link: 'https://github.com/Bettaieb45 ',
    image: '/uploads/github-logo.svg',
  },
  {
    name: 'Upwork',
    link: 'https://www.upwork.com/freelancers/~012e5d38cdd837edf8',
    image: '/uploads/upwork-logo.svg',
  },
];

const Footer = () => {
  return (
    <footer className="container-1120 border-b-2 border-gray-400 border-t-2">
      <div className="footer-wrapper flex flex-col lg:flex-row justify-between items-center p-4 gap-10">
        <div className="navigation-menu-wrapper">
          <nav>
            <ul className="flex flex-col lg:flex-row items-center gap-10  text-3xl font-jura">
              <li className="relative group">
                <a
                  href="#hero"
                  className="text-black hover:text-gray-600 transition-colors duration-300"
                >
                  Home
                </a>
                <span className="absolute left-0 -bottom-1 w-0 h-1 bg-black transition-all duration-300 group-hover:w-full"></span>
              </li>
              <li className="relative group">
                <a
                  href="#about"
                  className="text-black hover:text-gray-600 transition-colors duration-300"
                >
                  About
                </a>
                <span className="absolute left-0 -bottom-1 w-0 h-1 bg-black transition-all duration-300 group-hover:w-full"></span>
              </li>
              <li className="relative group">
                <a
                  href="#portfolio"
                  className="text-black hover:text-gray-600 transition-colors duration-300"
                >
                  Portfolio
                </a>
                <span className="absolute left-0 -bottom-1 w-0 h-1 bg-black transition-all duration-300 group-hover:w-full"></span>
              </li>
              <li className="relative group">
                <a
                  href="#contact"
                  className="text-black hover:text-gray-600 transition-colors duration-300"
                >
                  Contact
                </a>
                <span className="absolute left-0 -bottom-1 w-0 h-1 bg-black transition-all duration-300 group-hover:w-full"></span>
              </li>
            </ul>
          </nav>
        </div>
        <div className="contact-links-wrapper pointer-events-auto flex gap-10 content-center">
          {contactLinks.map((contactLink, index) => (
            <div
              key={index}
              className="
                        single-link 
                        relative 
                        transition 
                        duration-300 
                        transform 
                        hover:scale-110 
                        hover:opacity-80
                        flex
                        content-center
                      "
            >
              <Image
                src={contactLink.image}
                alt={`${contactLink.name} logo`}
                width={30}
                height={30}
              />
              <a
                href={contactLink.link}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0"
              ></a>
            </div>
          ))}
        </div>
      </div>
      <div className="copyrights">
        <p className="text-center text-gray-500 text-sm">
          &copy; 2025 Mohamed Aziz Bettaieb. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
