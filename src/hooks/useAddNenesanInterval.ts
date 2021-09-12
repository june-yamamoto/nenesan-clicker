import { useEffect, useRef } from "react";
import { Dispatch } from "redux";
import useInterval from "./useInterval";

export const ADD_BY_INTERVAL_MILLISCONDS = 50;

export const useAddNenesanInterval = (nenesanPerSeconds: number, dispatch: Dispatch<any>): void => {
    const nenesanPerSecondsRef = useRef<number>(0);
    useEffect(() => {
        nenesanPerSecondsRef.current = nenesanPerSeconds;
    }, [nenesanPerSeconds]);

    useInterval(() => {
        dispatch({ type: 'ADD_BY_INTERVAL', addCount: (nenesanPerSecondsRef.current) / (1000 / ADD_BY_INTERVAL_MILLISCONDS) })
    }, ADD_BY_INTERVAL_MILLISCONDS)
};
