import '@/src/styles/zoom.css';
import mediumZoom, { Zoom, ZoomOptions } from 'medium-zoom';
import Image, { ImageProps } from 'next/image';
import { RefCallback, useRef } from 'react';

type ZoomableImageProps = ImageProps & {
  options?: ZoomOptions;
};

const ZoomableImage = ({ options, ...props }: ZoomableImageProps) => {
  const zoomRef = useRef<Zoom | null>(null);

  function getZoom() {
    if (zoomRef.current === null) {
      zoomRef.current = mediumZoom(options);
    }

    return zoomRef.current;
  }

  const attachZoom: RefCallback<HTMLImageElement> = (node) => {
    const zoom = getZoom();

    if (node) {
      zoom.attach(node);
    } else {
      zoom.detach();
    }
  };

  return <Image {...props} ref={attachZoom} />;
};

export default ZoomableImage;
