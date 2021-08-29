import { useEffect, useRef } from "react";
import { Dispatch } from "redux";
import useInterval from "./useInterval";

export const useAddNenesanInterval = (nenesanPerSeconds: number, dispatch: Dispatch<any>): void => {
    const nenesanPerSecondsRef = useRef<number>(0);
    useEffect(() => {
        nenesanPerSecondsRef.current = nenesanPerSeconds;
    }, [nenesanPerSeconds]);

    useInterval(() => {
        dispatch({ type: 'ADD_BY_INTERVAL', addCount: (nenesanPerSecondsRef.current) / 100 })
    }, 10)
};
