import { useCallback, useEffect, useState } from 'react';

interface Dimension {
  width: number | undefined;
  height: number | undefined;
}

export const useDimensions = (): Dimension => {
  const [dimensions, setDimensions] = useState<Dimension>({
    width: 0,
    height: 0,
  });

  const handleDimensions = useCallback(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleDimensions();

    window.addEventListener('resize', handleDimensions);

    return () => {
      window.removeEventListener('resize', handleDimensions);
    };
  }, [handleDimensions]);

  return { width: dimensions.width, height: dimensions.height };
};
