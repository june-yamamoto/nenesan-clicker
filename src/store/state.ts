import { DateTime } from 'luxon';
import { BuildItem, DefaultBuildItems } from '../models/BuildItem';
import { DefaultUpgradeItems, UpgradeItemBuilder, UpgradeItemClasses } from '../models/UpgradeItem';

export interface ClickerRootState {
    currentNenesan: number;
    nenesanPerSeconds: number;
    nenesanPerSecondsMagnification: number;
    addCountPerClick: number;
    addCountPerClickMagnification: number;
    clickCountInSeconds: number;
    currentBackgroundColor: string;
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
    totalClickDialogueArray: number[];
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
    nenesanPerSecondsMagnification: 1,
    addCountPerClick: 1,
    addCountPerClickMagnification: 1,
    clickCountInSeconds: 0,
    currentBackgroundColor: '',
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
    totalClickDialogueArray: [0, 0, 0, 0, 0, 0, 0, 0],
};
