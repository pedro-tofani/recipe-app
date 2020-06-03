import { useEffect, useContext } from 'react';
import RecipeAppContext from '../context/Context';

const useDebounce = (value, delay) => {
  const { debounceState: [debouncedValue, setDebouncedValue] } = useContext(RecipeAppContext);

  useEffect(
    () => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      return () => {
        clearTimeout(handler);
      };
    },
    [value],
  );
  return debouncedValue;
};

export default useDebounce;
