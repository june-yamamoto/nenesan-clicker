export function saveInLocalStorage(stateObject: any) {
    if (!window.localStorage) return;

    const storage = window.localStorage;
    storage.setItem('nenesan_save', JSON.stringify(stateObject));
}

export function loadInLocalStorage() {
    if (!window.localStorage) return;

    const storage = window.localStorage;
    const saveObject = storage.getItem('nenesan_save');
    if (!saveObject) return;

    return JSON.parse(saveObject);
}