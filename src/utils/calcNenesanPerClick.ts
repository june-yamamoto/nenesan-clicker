import { ClickUpgradeItem, ItemUpgradeItem, UpgradeItemClasses } from '../models/UpgradeItem';

export const calcNenesanPerClick = (upgradeItems: UpgradeItemClasses[]) => {
    const magnification = 1;
    const clickUpgradeItems = upgradeItems.filter((upgradeItem) => {
        if (upgradeItem instanceof ItemUpgradeItem) {
            return false;
        }
        return true;
    }) as ClickUpgradeItem[];
    return magnification * calcClickUpgradeItemsMagnifications(clickUpgradeItems);
    
};

function calcClickUpgradeItemsMagnifications(upgradeItems: ClickUpgradeItem[]) {
    let magnification = 1;
    upgradeItems.forEach((item) => {
        if (!item.purchased) return;

        magnification *= item.magnification;
    });
    return magnification;
}
