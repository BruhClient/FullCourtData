
'use client';

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

type FallbackImageProps = ImageProps & {
  fallbackSrc: string;
};

export default function FallbackImage({ src, fallbackSrc, alt, ...rest }: FallbackImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      {...rest}
      src={imgSrc}
      
      alt={alt}
      onError={() => setImgSrc(fallbackSrc)}
    />
  );
}
