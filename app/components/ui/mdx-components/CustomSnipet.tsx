'use client';

import { Button } from '@nextui-org/react';
import { HTMLAttributes, useEffect, useRef, useState } from 'react';
import { FaCheck, FaCopy } from 'react-icons/fa';

const CustomSnipet = ({ children, ...props }: HTMLAttributes<HTMLElement>) => {
  const [isCopied, setIsCopied] = useState(false);
  const copyButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    }
  }, [isCopied]);

  const copyToClipboardHandler = async () => {
    if (!copyButtonRef.current) return;

    const figure = copyButtonRef.current?.parentNode?.parentNode;
    const code = figure?.querySelector('code');
    const text = code?.innerText;

    if (!text) return;

    await navigator.clipboard.writeText(text);
    setIsCopied(true);
  };

  return (
    <figcaption className="flex items-center justify-between" {...props}>
      <p className="m-0 text-[#c6d0f5]">{children}</p>
      <Button
        disableRipple
        ref={copyButtonRef}
        onClick={copyToClipboardHandler}
        isIconOnly
        aria-label="copy"
        className="h-8 w-8 min-w-8 p-0"
      >
        {isCopied && <FaCheck />}
        {!isCopied && <FaCopy />}
      </Button>
    </figcaption>
  );
};

export default CustomSnipet;
