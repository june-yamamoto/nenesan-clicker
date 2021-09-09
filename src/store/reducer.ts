import { DateTime } from 'luxon';
import { AnyAction } from 'redux';
import { ADD_BY_INTERVAL_MILLISCONDS } from '../hooks/useAddNenesanInterval';
import { loadInLocalStorage, saveInLocalStorage } from '../infra/localStorage';
import { BuildItem } from '../models/BuildItem';
import { UpgradeItemBuilder } from '../models/UpgradeItem';
import { calcNenesanPerClick } from '../utils/calcNenesanPerClick';
import { calcNenesanPerSeconds } from '../utils/calcNenesanPerSeconds';
import { convertBase64ToJson } from '../utils/convertSaveData';
import { initialState, RootState } from './state';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const reducer = (state = initialState, action: AnyAction) => {
    if (action.type === 'CLICK_ONCE') {
        state.currentNenesan = state.currentNenesan + state.addCountPerClick;
        state.clickedNenesanTimes = state.clickedNenesanTimes + 1;
        state.clickCountInSeconds = state.clickCountInSeconds + 1;
        if (state.currentNenesan > state.maxNenesan) {
            state.maxNenesan = state.currentNenesan;
        }
        state.totalNenesan = state.totalNenesan + state.addCountPerClick;
        return state;
    }
    if (action.type === 'BUILD_ITEM') {
        state.currentNenesan =
            state.currentNenesan - state.buildItems[action.index].currentPrice;
        const updateItem = state.buildItems[action.index];
        updateItem.purchase();
        const newItem = new BuildItem(updateItem);
        state.buildItems[action.index] = newItem;
        state.nenesanPerSeconds = calcNenesanPerSeconds(
            state.buildItems,
            state.upgradeItems,
        );
        return state;
    }
    if (action.type === 'ADD_BY_INTERVAL') {
        state.currentNenesan = state.currentNenesan + action.addCount;
        if (state.currentNenesan > state.maxNenesan) {
            state.maxNenesan = state.currentNenesan;
        }
        state.totalNenesan = state.totalNenesan + action.addCount;
        state.totalPlayTime = state.totalPlayTime + ADD_BY_INTERVAL_MILLISCONDS;
        return state;
    }
    if (action.type === 'PURCHASE_UPGRADE_ITEM') {
        const upgradeItem = state.upgradeItems.find(
            (item) => item.id === action.id,
        );
        if (!upgradeItem) return state;

        state.currentNenesan = state.currentNenesan - upgradeItem.price;
        state.upgradeItems[
            state.upgradeItems.findIndex((item) => item.id === action.id)
        ].purchase();
        state.nenesanPerSeconds = calcNenesanPerSeconds(
            state.buildItems,
            state.upgradeItems,
        );
        state.addCountPerClick = calcNenesanPerClick(state.upgradeItems);
        return state;
    }
    if (action.type === 'SAVE') {
        const buildItems = state.buildItems.map((item) => {
            return {
                id: item.id,
                itemHas: item.itemHas,
            };
        });
        const upgradeItems = state.upgradeItems.map((item) => {
            return {
                id: item.id,
                purchased: item.purchased,
            };
        });
        const stateObject = {
            ...state,
            buildItems,
            upgradeItems,
        };
        saveInLocalStorage(stateObject);
    }
    if (action.type === 'LOAD') {
        const loadedState = loadInLocalStorage();
        if (!loadedState) return state;

        return updateStateAll(state, loadedState);
    }
    if (action.type === 'IMPORT') {
        const importedState = convertBase64ToJson(action.saveDataBase64) as any;
        if (!importedState) return state;

        return updateStateAll(state, importedState);
    }
    if (action.type === 'SECOND_INTERVAL') {
        if (state.maxClickCountPerSeconds < state.clickCountInSeconds) {
            state.maxClickCountPerSeconds = state.clickCountInSeconds;
        }
        state.clickCountInSeconds = 0;
        return state;
    }
    return state;
};

function updateStateAll(currentState: RootState, nextState: any) {
    currentState = {
        ...currentState,
        addCountPerClick: nextState.addCountPerClick,
        allNenesanUntilNow: nextState.allNenesanUntilNow,
        currentNenesan: nextState.currentNenesan,
        clickedNenesanTimes: nextState.clickedNenesanTimes || 0,
        maxNenesan: nextState.maxNenesan || 0,
        totalNenesan: nextState.totalNenesan || 0,
        totalPlayTime: nextState.totalPlayTime || 0,
        maxClickCountPerSeconds: nextState.maxClickCountPerSeconds || 0,
        totalClickDialogue: nextState.totalClickDialogue || 0,
        buildItems: currentState.buildItems.map((item) => {
            const specifiedItem = nextState.buildItems.find(
                (loadedItem: { id: string; itemHas: number }) =>
                    item.id === loadedItem.id,
            );
            const specifiedItemHas = (specifiedItem?.itemHas as number) || 0;
            return new BuildItem({
                ...item,
                itemHas: specifiedItemHas,
            });
        }),
        upgradeItems: currentState.upgradeItems.map((item) => {
            const specifiedItem = nextState.upgradeItems.find(
                (loadedItem: { id: string; purchased: number }) =>
                    item.id === loadedItem.id,
            );
            const specifiedItemPurchased =
                (specifiedItem?.purchased as boolean) || false;
            return UpgradeItemBuilder({
                ...item,
                purchased: specifiedItemPurchased,
            });
        }),
    };
    currentState.nenesanPerSeconds = calcNenesanPerSeconds(
        currentState.buildItems,
        currentState.upgradeItems,
    );
    currentState.addCountPerClick = calcNenesanPerClick(
        currentState.upgradeItems,
    );
    currentState.lastSaved = DateTime.now();
    return currentState;
}
