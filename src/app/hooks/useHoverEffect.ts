import { useEffect } from 'react';
import { gsap } from 'gsap';

const useHoverEffect = (
  shapeRefs: React.RefObject<(HTMLDivElement | null)[]>,
) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      // Filter out valid refs
      const validRefs = shapeRefs.current.filter(
        (ref): ref is HTMLDivElement => ref !== null,
      );

      if (validRefs.length > 0) {
        validRefs.forEach((shape) => {
          let hoverTimeout: NodeJS.Timeout;

          const onHover = () => {
            // Add a delay before starting the hover effect
            hoverTimeout = setTimeout(() => {
              // Add the shake effect with limited repeats
              gsap.to(shape, {
                x: 'random(-1, 1)', // Random horizontal shake
                y: 'random(-1, 1)', // Random vertical shake
                duration: 0.1, // Quick shaking
                repeat: 2, // Shake 2 times
                yoyo: true, // Reverse direction
                ease: 'power1.inOut', // Smooth easing
              });
            }, 150); // Delay of 150ms
          };

          const onHoverEnd = () => {
            // Clear the hover timeout if the mouse leaves before the delay ends
            clearTimeout(hoverTimeout);

            // Reset the shape position smoothly
            gsap.to(shape, {
              x: 0,
              y: 0,
              duration: 0.2,
              ease: 'power1.out',
            });
          };

          // Attach hover event listeners
          shape.addEventListener('mouseenter', onHover);
          shape.addEventListener('mouseleave', onHoverEnd);

          // Cleanup event listeners on unmount
          return () => {
            shape.removeEventListener('mouseenter', onHover);
            shape.removeEventListener('mouseleave', onHoverEnd);
          };
        });
      } else {
        console.warn('No valid refs found for hover effect');
      }
    }, 100);

    return () => clearTimeout(timeout); // Cleanup timeout
  }, [shapeRefs]); // Dependencies
};

export default useHoverEffect;
