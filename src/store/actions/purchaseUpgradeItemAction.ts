// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const purchaseUpgradeItemAction = (id: string) => {
  return {
      type: 'PURCHASE_UPGRADE_ITEM',
      id,
  };
};
