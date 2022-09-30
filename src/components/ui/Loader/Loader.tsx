import React, { FC } from 'react';
import Icon from '@components/ui/Icon';

interface LoaderProps {
  children: JSX.Element;
  isLoading: boolean;
}

const Loader: FC<LoaderProps> = ({ children, isLoading }) => {
  return isLoading ? <Icon type="spinner" /> : children;
};

export default Loader;
