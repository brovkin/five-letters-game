import { useMediaQuery } from 'react-responsive';

const useMedia = (query: string) => {
  return useMediaQuery({
    query: `(max-width: ${query})`,
  });
};

export default useMedia;
