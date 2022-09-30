import React, { FC } from 'react';
import cn from 'classnames';
import './Image.scss';

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
}

const Image: FC<ImageProps> = ({ src, alt, className }) => {
  return <img src={src} alt={alt} className={cn('img', className)} />;
};

export default Image;
