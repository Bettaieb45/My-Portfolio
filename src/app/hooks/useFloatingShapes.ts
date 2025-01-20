import { useEffect } from 'react';
import { gsap } from 'gsap';

const useFloatingShapes = (
  shapeRefs: React.MutableRefObject<(HTMLDivElement | null)[]>,
) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      const validRefs = shapeRefs.current.filter(
        (ref): ref is HTMLDivElement => ref !== null,
      );

      if (validRefs.length > 0) {
        validRefs.forEach((shape) => {
          gsap.to(shape, {
            y: 'random(-100, 100)', // Random vertical floating
            x: 'random(-100, 100)', // Random horizontal floating
            rotation: 'random(-45, 45)', // Random rotation
            duration: 4, // Animation duration
            repeat: -1, // Infinite repeat
            yoyo: true, // Reverse direction
            ease: 'power1.inOut', // Smooth easing
          });
        });
      } else {
        console.warn('No valid refs found for GSAP animations');
      }
    }, 100);

    return () => clearTimeout(timeout); // Cleanup timeout
  }, [shapeRefs]);
};

export default useFloatingShapes;
