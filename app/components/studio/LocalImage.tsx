'use client';

import { useEffect, useState } from 'react';

import useFileStore from '@/app/store/fileStore';

const LocalImage = ({
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement>) => {
  const files = useFileStore((state) => state.files);
  const [src, setSrc] = useState(props.src);

  useEffect(() => {
    const fileName = props.src!.split('/').pop();
    const file = files.find((f: File) => f.name === fileName);

    if (!file) {
      setSrc(props.src);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setSrc(reader.result as string);
    };

    reader.readAsDataURL(file);
  }, [props]);

  return <img alt={props.alt} src={src} />;
};

export default LocalImage;
