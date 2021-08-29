import useEffectOnce from './useEffectOnce';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useMount = (fn: () => void) => {
  useEffectOnce(() => {
    fn();
  });
};

export default useMount;