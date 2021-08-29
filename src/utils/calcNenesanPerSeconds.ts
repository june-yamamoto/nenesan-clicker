import { BuildItem } from '../models/BuildItem';
import {
    ClickUpgradeItem,
    ItemUpgradeItem,
    UpgradeItemClasses,
} from '../models/UpgradeItem';

export const calcNenesanPerSeconds = (
    buildItems: BuildItem[],
    upgradeItems: UpgradeItemClasses[],
): number => {
    let perSeconds = 0;
    buildItems.forEach((buildItem) => {
        const specificUpgradeItems = upgradeItems.filter((upgradeItem) => {
            if (upgradeItem instanceof ClickUpgradeItem) return false;

            return upgradeItem.specificItemId === buildItem.id;
        }) as ItemUpgradeItem[];
        perSeconds +=
            buildItem.currentNenesanPerSeconds *
            buildItem.itemHas *
            calcSpacificUpgradeItemsMagnifications(specificUpgradeItems);
    });
    return perSeconds;
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
