import { Dispatch } from 'redux';
import { saveToServerAction } from '../store/actions/saveToServerAction';
import { saveToServerWithApplyIdAction } from '../store/actions/saveToServerWithApplyIdAction';
import { RootState } from '../store/state';
import { makeSaveDataState } from '../store/utils/makeSaveDataState';
import useInterval from './useInterval';

export const useSaveToServer = (
    isInit: boolean,
    state: RootState,
    dispatch: Dispatch<any>,
) => {
    useInterval(() => {
        if (!isInit) return;

        const saveDataState = makeSaveDataState(state);
        saveDataState.id
            ? dispatch(saveToServerAction(saveDataState))
            : dispatch(saveToServerWithApplyIdAction(saveDataState));
    }, 60000);
};
