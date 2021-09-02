import { convertBase64ToJson, convertJsonToBase64 } from "../utils/convertSaveData";

export function saveInLocalStorage(stateObject: any) {
    if (!window.localStorage) return;

    const storage = window.localStorage;
    storage.setItem('nenesan_save', convertJsonToBase64(stateObject));
}

export function loadInLocalStorage() {
    if (!window.localStorage) return;

    const storage = window.localStorage;
    const saveObject = storage.getItem('nenesan_save');
    if (!saveObject) return;

    // jsonのままlocalStorageに保存していたバージョンに対する分岐
    if (!convertBase64ToJson(saveObject)) {
        return JSON.parse(saveObject);
    }

    return convertBase64ToJson(saveObject);
}