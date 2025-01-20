// Utility function to check overlap
export const isOverlapping = (
  newPosition: { top: number; left: number },
  existingPositions: {
    top: number;
    left: number;
    width: number;
    height: number;
  }[],
  width: number,
  height: number,
): boolean => {
  return existingPositions.some(
    (pos) =>
      newPosition.top < pos.top + pos.height &&
      newPosition.top + height > pos.top &&
      newPosition.left < pos.left + pos.width &&
      newPosition.left + width > pos.left,
  );
};

// Utility function to generate random positions within the screen
export const generateRandomPosition = (
  width: number,
  height: number,
  existingPositions: {
    top: number;
    left: number;
    width: number;
    height: number;
  }[],
): { top: number; left: number } => {
  let position;
  let tries = 0;

  do {
    const top = Math.random() * (100 - height); // Keep within the vertical screen
    const left = Math.random() * (100 - width); // Keep within the horizontal screen
    position = { top, left };

    tries++;
    if (tries > 50) break; // Fallback to avoid infinite loops
  } while (isOverlapping(position, existingPositions, width, height));

  return position;
};
