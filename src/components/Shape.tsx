'use client';

import { useEffect, useRef, useState } from 'react';
import { shapes, dimensions } from '../app/config/shapesConfig';
import { generateRandomPosition } from '../app/utils/positionUtils';
import useFloatingShapes from '../app/hooks/useFloatingShapes';
import useDraggableShapes from '../app/hooks/useDraggableShapes';
import useHoverEffect from '../app/hooks/useHoverEffect';
import useScrollResponsiveShapes from '@/app/hooks/useScrollResponsiveShapes';

const Shape = () => {
  const shapeRefs = useRef<(HTMLDivElement | null)[]>(
    new Array(shapes.length).fill(null),
  ); // Initialize refs
  const [positions, setPositions] = useState<
    { top: number; left: number; className: string }[]
  >([]);
  const existingPositions: {
    top: number;
    left: number;
    width: number;
    height: number;
  }[] = [];

  // Generate random positions for shapes
  useEffect(() => {
    const generatedPositions = shapes.map((shape) => {
      const { width, height } = dimensions[shape.type]; // TypeScript now recognizes this as valid
      const position = generateRandomPosition(width, height, existingPositions);
      existingPositions.push({ ...position, width, height });
      return { ...position, className: shape.className };
    });

    setPositions(generatedPositions);
  }, []); // Run once on mount

  // Apply floating animations
  useFloatingShapes(shapeRefs);

  // Apply draggable functionality
  useDraggableShapes(shapeRefs);
  // Apply hover effect
  useHoverEffect(shapeRefs);
  // Reposition shapes when out of view
  useScrollResponsiveShapes(shapeRefs, 20, 'header');

  return (
    <>
      {positions.map((pos, index) => (
        <div
          key={index}
          className={`absolute z-10 cursor-grab ${pos.className}`}
          style={{
            top: `${pos.top}%`,
            left: `${pos.left}%`,
          }}
          ref={(el) => {
            shapeRefs.current[index] = el; // Assign each div to the corresponding ref
          }}
        ></div>
      ))}
    </>
  );
};

export default Shape;
