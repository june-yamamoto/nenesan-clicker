// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const buildItemAction = (addCount: number) => {
  return {
      type: 'ADD_BY_INTERVAL',
      addCount,
  };
};
