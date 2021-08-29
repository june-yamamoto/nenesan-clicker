import { EffectCallback, useEffect } from 'react';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useEffectOnce = (effect: EffectCallback) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, []);
};

export default useEffectOnce;