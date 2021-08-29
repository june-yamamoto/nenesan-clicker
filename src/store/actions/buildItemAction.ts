// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const buildItemAction = (index: number) => {
  return {
      type: 'BUILD_ITEM',
      index,
  };
};
