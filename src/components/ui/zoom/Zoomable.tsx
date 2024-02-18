'use client';

import React, {
  ImgHTMLAttributes,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Controlled as ControlledZoom } from 'react-medium-image-zoom';

import './zoom.css';

interface ZoomableProps {
  children: React.ReactNode;
  zoomImg?: ImgHTMLAttributes<HTMLImageElement>;
}

const Zoomable = ({ children, zoomImg }: ZoomableProps) => {
  const [isZoomed, setIsZoomed] = useState(false);

  const handleZoomChange = useCallback((shouldZoom: boolean) => {
    setIsZoomed(shouldZoom);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setIsZoomed(false);
    });

    return () => {
      window.removeEventListener('resize', () => {
        setIsZoomed(false);
      });
    };
  }, []);

  return (
    <ControlledZoom
      isZoomed={isZoomed}
      onZoomChange={handleZoomChange}
      zoomImg={zoomImg}
      wrapElement="span"
    >
      {children}
    </ControlledZoom>
  );
};

export default Zoomable;
