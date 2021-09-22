import { useCallback, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { DIALOGUE_ARRAY } from '../static/resource/dialogue_array';
import useMount from './useMount';

const oneMinutes = 60000;

const startMinutes = 5;

const firstSuccessProbability = 0.4;

const dialogueMemberArrayProbability = DIALOGUE_ARRAY.map(
    (element) => element.supportProbability,
);

/**
 * startMinutes + n の数字を返す
 * n = 0から始め、確率40%をスタートとして失敗する度に成功確率を5%増やしていく
 */
const calculateVisualizeTime = (startMinutes: number) => {
    for (let i = 0; i < 11; i++) {
        if (Math.random() < firstSuccessProbability + 0.05 * i) {
            return startMinutes + i;
        }
    }
    return startMinutes + 10;
};

const lotMember = () => {
    const rand = Math.floor(Math.random() * 100);
    let rate = 0;
    let index = 0;
    let flag = false;
    dialogueMemberArrayProbability.forEach((probability, _index) => {
        if (flag) return;
        rate += probability;
        if (rand <= rate) {
            index = _index;
            flag = true;
            return;
        }
    });
    return index;
};

export const useDialogueMemberVisible = (width: number, height: number) => {
    const dispatch = useDispatch();
    const visibleRef = useRef(false);

    const positionX = useRef<number>(0);
    const positionY = useRef<number>(0);

    const selectedIndexRef = useRef<number>(0);

    const changeInvisibleIdRef = useRef<NodeJS.Timeout | null>(null);
    const changeVisibleIdRef = useRef<NodeJS.Timeout | null>(null);

    useMount(() => {
        changeVisibleIdRef.current = setTimeout(
            changeVisible,
            calculateVisualizeTime(startMinutes) * oneMinutes,
        );
    });

    const changeVisible = () => {
        visibleRef.current = true;
        changeInvisibleIdRef.current = setTimeout(changeInvisible, 10000);
    };

    const changeInvisible = () => {
        visibleRef.current = false;
        setTimeout(reset, 1000);
        changeVisibleIdRef.current = setTimeout(
            changeVisible,
            calculateVisualizeTime(startMinutes) * oneMinutes,
        );
    };

    const resetPosition = () => {
        positionX.current = Math.random() * width;
        positionY.current = Math.random() * height;
    };

    const resetMemberIndex = () => {
        selectedIndexRef.current = lotMember();
    };

    const reset = () => {
        resetPosition();
        resetMemberIndex();
    };

    const onClickMember = useCallback(() => {
        if (!visibleRef.current) return;

        visibleRef.current = false;
        if (changeInvisibleIdRef.current) {
            clearTimeout(changeInvisibleIdRef.current);
        }

        if ([0, 1, 2, 3].includes(selectedIndexRef.current)) {
            dispatch({
                type: 'START_DIALOGUE_SUPPORT_A',
                index: selectedIndexRef.current,
            });
            setTimeout(() => {
                dispatch({ type: 'FINISH_DIALOGUE_SUPPORT_A' });
            }, 88000);
            if (selectedIndexRef.current === 1) {
                dispatch({ type: 'START_NENESAN_TIME' });
                setTimeout(() => {
                    dispatch({ type: 'FINISH_NENESAN_TIME' });
                }, 7000);
            }
        } else {
            dispatch({
                type: 'START_DIALOGUE_SUPPORT_B',
                index: selectedIndexRef.current,
            });
            setTimeout(() => {
                dispatch({ type: 'FINISH_DIALOGUE_SUPPORT_B' });
            });
        }

        setTimeout(reset, 1000);
        setTimeout(
            changeVisible,
            calculateVisualizeTime(startMinutes) * oneMinutes,
        );
    }, [height, visibleRef, width]);

    useEffect(() => {
        positionX.current = Math.random() * width;
        positionY.current = Math.random() * height;
    }, [width, height]);

    return {
        visible: visibleRef.current,
        selectedIndex: selectedIndexRef.current,
        onClickMember,
        positionX: positionX.current,
        positionY: positionY.current,
    };
};
