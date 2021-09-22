import { useCallback, useEffect, useRef } from 'react';
import useMount from './useMount';

const oneMinutes = 2000;

const startMinutes = 1;

const firstSuccessProbability = 0.3;

const dialogueMemberArrayProbability = [13, 13, 9, 13, 13, 13, 13, 13];

/**
 * startMinutes + n の数字を返す
 * n = 0から始め、確率30%をスタートとして失敗する度に成功確率を5%増やしていく
 */
const calculateVisualizeTime = (startMinutes: number) => {
    for (let i = 0; i < 11; i++) {
        if (Math.random() < firstSuccessProbability + 0.05 * i) {
            console.log(`${startMinutes + i}分`);
            return startMinutes + i;
        }
    }
    return startMinutes + 10;
};

const lotMember = () => {
    const rand = Math.floor(Math.random() * 100);
    console.log(rand);
    let rate = 0;
    let index = 0;
    dialogueMemberArrayProbability.forEach((probability, _index) => {
        if (index !== 0) return;
        rate += probability;
        if (rand <= rate) {
            index = _index;
            return;
        }
    });
    console.log('lot', index);
    return index;
};

export const useDialogueMemberVisible = (width: number, height: number) => {
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
