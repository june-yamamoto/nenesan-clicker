// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const importAction = (saveDataBase64: string) => {
    return {
        type: 'IMPORT',
        saveDataBase64,
    };
};
