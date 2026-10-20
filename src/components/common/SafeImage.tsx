"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type Props = Omit<ImageProps, "onError"> & { fallbackClassName?: string };

/**
 * next/image with a graceful fallback: if the remote placeholder fails to load
 * we render a soft sage gradient instead of a broken-image icon.
 */
export default function SafeImage({ alt, fallbackClassName, className, style, ...rest }: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={fallbackClassName ?? className}
        style={{
          position: rest.fill ? "absolute" : undefined,
          inset: rest.fill ? 0 : undefined,
          background:
            "radial-gradient(120% 90% at 20% 10%, #d9d2c2 0%, #b9b9a3 45%, #6f8068 100%)",
          ...style,
        }}
      />
    );
  }

  return <Image alt={alt} className={className} style={style} onError={() => setFailed(true)} {...rest} />;
}
