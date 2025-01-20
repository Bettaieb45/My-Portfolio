type ShapeType = 'line' | 'circle' | 'rectangle' | 'triangle' | 'square';
export const shapes: { type: ShapeType; className: string }[] = [
  { type: 'line', className: 'line' },
  { type: 'circle', className: 'circle' },
  { type: 'rectangle', className: 'rectangle' },
  { type: 'triangle', className: 'triangle' },
  { type: 'square', className: 'square' },
];
export const dimensions: Record<ShapeType, { width: number; height: number }> =
  {
    line: { width: 25, height: 1 },
    circle: { width: 8, height: 8 },
    rectangle: { width: 32, height: 16 },
    triangle: { width: 16, height: 16 },
    square: { width: 16, height: 16 },
  };
