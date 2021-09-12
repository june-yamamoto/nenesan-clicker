import { Dispatch } from "redux";
import useInterval from "./useInterval";

export const useSecondInterval = (dispatch: Dispatch<any>) => {
    useInterval(() => {
        dispatch({ type: 'SECOND_INTERVAL' }, );
    }, 1000);
};
