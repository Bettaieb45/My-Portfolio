import React, { useEffect } from 'react';

const useDraggableShapes = (
  shapeRefs: React.RefObject<(HTMLDivElement | null)[]>,
) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      const validRefs = shapeRefs.current.filter(
        (ref): ref is HTMLDivElement => ref !== null,
      );

      if (validRefs.length > 0) {
        validRefs.forEach((shape) => {
          let pos1 = 0,
            pos2 = 0,
            pos3 = 0,
            pos4 = 0;
          let velocityX = 0,
            velocityY = 0;
          let animationFrame: number;

          // Mouse Event Handlers
          const dragMouseDown = (e: MouseEvent) => {
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            velocityX = 0;
            velocityY = 0;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
          };

          const elementDrag = (e: MouseEvent) => {
            e.preventDefault();

            const deltaX = e.clientX - pos3;
            const deltaY = e.clientY - pos4;

            velocityX = deltaX;
            velocityY = deltaY;

            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;

            shape.style.top = shape.offsetTop - pos2 + 'px';
            shape.style.left = shape.offsetLeft - pos1 + 'px';
          };

          const closeDragElement = () => {
            document.onmouseup = null;
            document.onmousemove = null;
            applyInertia(); // Start inertia effect
          };

          // Touch Event Handlers
          const dragTouchStart = (e: TouchEvent) => {
            const touch = e.touches[0];
            pos3 = touch.clientX;
            pos4 = touch.clientY;
            velocityX = 0;
            velocityY = 0;
            document.ontouchend = closeTouchDragElement;
            document.ontouchmove = elementTouchDrag;
          };

          const elementTouchDrag = (e: TouchEvent) => {
            const touch = e.touches[0];
            const deltaX = touch.clientX - pos3;
            const deltaY = touch.clientY - pos4;

            velocityX = deltaX;
            velocityY = deltaY;

            pos1 = pos3 - touch.clientX;
            pos2 = pos4 - touch.clientY;
            pos3 = touch.clientX;
            pos4 = touch.clientY;

            shape.style.top = shape.offsetTop - pos2 + 'px';
            shape.style.left = shape.offsetLeft - pos1 + 'px';
          };

          const closeTouchDragElement = () => {
            document.ontouchend = null;
            document.ontouchmove = null;
            applyInertia(); // Start inertia effect
          };

          // Inertia
          const applyInertia = () => {
            velocityX *= 0.95; // Gradually reduce the velocity
            velocityY *= 0.95;

            if (Math.abs(velocityX) > 0.5 || Math.abs(velocityY) > 0.5) {
              shape.style.top = shape.offsetTop - velocityY + 'px';
              shape.style.left = shape.offsetLeft - velocityX + 'px';
              animationFrame = requestAnimationFrame(applyInertia);
            } else {
              cancelAnimationFrame(animationFrame);
            }
          };

          // Attach both Mouse and Touch Event Handlers
          shape.onmousedown = dragMouseDown;
          shape.ontouchstart = dragTouchStart; // Add touch support
        });
      } else {
        console.warn('No valid refs found for draggable shapes');
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, [shapeRefs]);
};

export default useDraggableShapes;
