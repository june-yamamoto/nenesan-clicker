import { RootState } from '../state';

export function makeSaveDataState(currentState: RootState): SaveDataType {
    const buildItems = currentState.buildItems.map((item) => {
        return {
            id: item.id,
            itemHas: item.itemHas,
        };
    });
    const upgradeItems = currentState.upgradeItems.map((item) => {
        return {
            id: item.id,
            purchased: item.purchased,
        };
    });
    const saveData = {
        id: currentState.id || '',
        name: currentState.name || '',
        currentNenesan: currentState.currentNenesan,
        clickedNenesanTimes: currentState.clickedNenesanTimes,
        maxNenesan: currentState.maxNenesan,
        totalNenesan: currentState.totalNenesan,
        totalPlayTime: currentState.totalPlayTime,
        maxClickCountPerSeconds: currentState.maxClickCountPerSeconds,
        totalClickDialogue: currentState.totalClickDialogue,
        buildItems,
        upgradeItems,
    };
    return saveData;
}

export type SaveDataType = {
    id: string;
    name: string;
    currentNenesan: number;
    clickedNenesanTimes: number;
    maxNenesan: number;
    totalNenesan: number;
    totalPlayTime: number;
    maxClickCountPerSeconds: number;
    totalClickDialogue: number;
    buildItems: { id: string; itemHas: number }[];
    upgradeItems: { id: string; purchased: boolean }[];
};
