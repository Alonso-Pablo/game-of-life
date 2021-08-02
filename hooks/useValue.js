import { useState } from 'react';

export const useValue = (initialValue) => {

  const [ value, setValue ] = useState(initialValue);

  const increase = () => setValue(value + 1);
  const reset = () => setValue(0);
  const setInvert = () => setValue(!value);
  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);

  const slowDown = () => setValue(value + 50)
  const speedUp = () => {
    if (value === 0) return false
    return setValue(value - 100)
  }

  return {
    value,
    increase,
    reset,
    setInvert,
    setTrue,
    setFalse,
    slowDown,
    speedUp
  };
};
