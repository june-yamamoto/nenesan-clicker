import { BuildItem } from '../models/BuildItem';
import {
    ClickUpgradeItem,
    ItemUpgradeItem,
    UpgradeItemClasses,
} from '../models/UpgradeItem';

export const calcNenesanPerSecondsBy = (
    buildItem: BuildItem,
    upgradeItems: UpgradeItemClasses[],
): number => {
    const specificUpgradeItems = upgradeItems.filter((upgradeItem) => {
        if (upgradeItem instanceof ClickUpgradeItem) return false;

        return upgradeItem.specificItemId === buildItem.id;
    }) as ItemUpgradeItem[];
    return buildItem.currentNenesanPerSeconds * buildItem.itemHas *
        calcSpacificUpgradeItemsMagnifications(specificUpgradeItems);
};

function calcSpacificUpgradeItemsMagnifications(
    upgradeItems: ItemUpgradeItem[],
) {
    let magnification = 1;
    upgradeItems.forEach((item) => {
        if (!item.purchased) return;
        magnification *= item.magnification;
    });
    return magnification;
}
