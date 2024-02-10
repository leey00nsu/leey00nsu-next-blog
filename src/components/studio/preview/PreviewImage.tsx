'use client';

import { useEffect, useState } from 'react';

import useEditorStore from '@/src/store/editorStore';
import useFileStore from '@/src/store/fileStore';

const PreviewImage = ({
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement>) => {
  const slug = useEditorStore((state) => state.slug);
  const files = useFileStore((state) => state.files);
  const [src, setSrc] = useState(props.src);

  // 현재 파일 목록에 있는 파일인지 확인 후 src 설정
  useEffect(() => {
    const fileName = props.src!.split('/').slice(-1)[0];
    const fileSlug = props.src!.split('/').slice(-2)[0];
    const file = files.find((f: File) => f.name === fileName);

    if (!file || fileSlug !== slug) {
      setSrc(props.src);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setSrc(reader.result as string);
    };

    reader.readAsDataURL(file);
  }, [props, files, slug]);

  return <img alt={props.alt} src={src} />;
};

export default PreviewImage;
