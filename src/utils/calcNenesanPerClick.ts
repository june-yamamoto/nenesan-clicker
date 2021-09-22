import { ClickUpgradeItem, ItemUpgradeItem, UpgradeItemClasses } from '../models/UpgradeItem';

export const calcNenesanPerClick = (upgradeItems: UpgradeItemClasses[], magnification: number) => {
    const _magnification = 1;
    const clickUpgradeItems = upgradeItems.filter((upgradeItem) => {
        if (upgradeItem instanceof ItemUpgradeItem) {
            return false;
        }
        return true;
    }) as ClickUpgradeItem[];
    return _magnification * calcClickUpgradeItemsMagnifications(clickUpgradeItems) * magnification;
    
};

function calcClickUpgradeItemsMagnifications(upgradeItems: ClickUpgradeItem[]) {
    let _magnification = 1;
    upgradeItems.forEach((item) => {
        if (!item.purchased) return;

        _magnification *= item.magnification;
    });
    return _magnification;
}
