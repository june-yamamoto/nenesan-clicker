import { BuildItem, DefaultBuildItems } from '../models/BuildItem';
import { DefaultUpgradeItems, UpgradeItemBuilder, UpgradeItemClasses } from '../models/UpgradeItem';

export interface ClickerRootState {
    currentNenesan: number;
    nenesanPerSeconds: number;
    allNenesanUntilNow: number;
    addCountPerClick: number;
    buildItems: BuildItem[];
    upgradeItems: UpgradeItemClasses[];
}

export interface StatisticsRootState {
    clickedNenesanTimes: number;
    maxNenesan: number;
    totalNenesan: number;
}

export const initialState: ClickerRootState & StatisticsRootState = {
    currentNenesan: 0,
    nenesanPerSeconds: 0,
    allNenesanUntilNow: 0,
    addCountPerClick: 1,
    buildItems: DefaultBuildItems.map(
        (defaultBuildItem) => new BuildItem(defaultBuildItem),
    ),
    upgradeItems: DefaultUpgradeItems.map(
        (defaultUpgradeItem) => UpgradeItemBuilder(defaultUpgradeItem)
    ),
    clickedNenesanTimes: 0,
    maxNenesan: 0,
    totalNenesan: 0,
};
