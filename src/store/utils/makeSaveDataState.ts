import { RootState } from '../state';

export function makeSaveDataState(currentState: RootState) {
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
        allNenesanUntilNow: currentState.allNenesanUntilNow,
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
