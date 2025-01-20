import React from 'react';

interface CtaButtonProps {
  text: string; // Text to display on the button
  href?: string; // Optional href for the button
  type?: 'button' | 'submit' | 'reset'; // Optional HTML button type
  target?: string; // Optional target for the anchor tag
}

const CtaButton: React.FC<CtaButtonProps> = ({
  text,
  href,
  type = 'button', // Default to "button"
  target = '_self', // Default to "_self"
}) => {
  return (
    <div className="cta-button">
      {href ? (
        // If "href" is provided, render an anchor tag
        <a
          href={href}
          target={target}
          rel="noopener noreferrer"
          className="bg-black text-white px-10 py-2 rounded-xl font-poppins text-xl transition-transform transform hover:scale-105 hover:bg-gray-800 hover:shadow-lg inline-block"
        >
          {text}
        </a>
      ) : (
        // Otherwise, render a button
        <button
          type={type}
          className="bg-black text-white px-10 py-2 rounded-xl font-poppins text-xl transition-transform transform hover:scale-105 hover:bg-gray-800 hover:shadow-lg"
        >
          {text}
        </button>
      )}
    </div>
  );
};

export default CtaButton;
