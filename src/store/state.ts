import { DateTime } from 'luxon';
import { BuildItem, DefaultBuildItems } from '../models/BuildItem';
import { DefaultUpgradeItems, UpgradeItemBuilder, UpgradeItemClasses } from '../models/UpgradeItem';

export interface ClickerRootState {
    currentNenesan: number;
    nenesanPerSeconds: number;
    allNenesanUntilNow: number;
    addCountPerClick: number;
    clickCountInSeconds: number;
    buildItems: BuildItem[];
    upgradeItems: UpgradeItemClasses[];
}

export interface StatisticsRootState {
    clickedNenesanTimes: number;
    maxNenesan: number;
    totalNenesan: number;
    totalPlayTime: number;
    maxClickCountPerSeconds: number;
    totalClickDialogue: number;
}

export interface UserConfigState {
    id?: string;
    name?: string;
    lastSaved?: DateTime;
}

export type RootState = ClickerRootState & StatisticsRootState & UserConfigState;

export const initialState: ClickerRootState & StatisticsRootState & UserConfigState = {
    currentNenesan: 0,
    nenesanPerSeconds: 0,
    allNenesanUntilNow: 0,
    addCountPerClick: 1,
    clickCountInSeconds: 0,
    buildItems: DefaultBuildItems.map(
        (defaultBuildItem) => new BuildItem(defaultBuildItem),
    ),
    upgradeItems: DefaultUpgradeItems.map(
        (defaultUpgradeItem) => UpgradeItemBuilder(defaultUpgradeItem)
    ),
    clickedNenesanTimes: 0,
    maxNenesan: 0,
    totalNenesan: 0,
    totalPlayTime: 0,
    maxClickCountPerSeconds: 0,
    totalClickDialogue: 0,
};
