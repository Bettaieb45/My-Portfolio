import { useEffect } from 'react';
import { gsap } from 'gsap';

const useScrollResponsiveShapes = (
  shapeRefs: React.RefObject<(HTMLDivElement | null)[]>,
  buffer = 20, // Buffer in pixels to reposition the shape just inside the viewport
  headerSelector = 'header', // CSS selector for the header
) => {
  useEffect(() => {
    const header = document.querySelector(headerSelector);
    const headerHeight = header ? header.getBoundingClientRect().height : 0;

    const handleScroll = () => {
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;

      const validRefs = shapeRefs.current.filter(
        (ref): ref is HTMLDivElement => ref !== null,
      );

      if (validRefs.length > 0) {
        validRefs.forEach((shape) => {
          const rect = shape.getBoundingClientRect();

          // Reposition shape vertically if out of view
          if (rect.top > viewportHeight || rect.bottom < 0) {
            const newTop =
              Math.random() * (viewportHeight - headerHeight - buffer) +
              window.scrollY +
              headerHeight +
              buffer; // Ensure it's within the viewport and below the header

            // Smoothly animate to the new top position using GSAP
            gsap.to(shape, { top: newTop, duration: 0.5, ease: 'power1.out' });
          }

          // Reposition shape horizontally if out of view
          if (rect.left > viewportWidth || rect.right < 0) {
            const newLeft = Math.random() * (viewportWidth - buffer);

            // Smoothly animate to the new left position using GSAP
            gsap.to(shape, {
              left: newLeft,
              duration: 0.5,
              ease: 'power1.out',
            });
          }
        });
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Run initially to position shapes correctly
    handleScroll();

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [shapeRefs, buffer, headerSelector]);
};

export default useScrollResponsiveShapes;
