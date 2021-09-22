import classNames from 'classnames';
import { DateTime } from 'luxon';
import { useCallback, useEffect, useRef } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';
import useMount from '../../hooks/useMount';
import { ClickerRootState } from '../../store/state';

type CookieBodyCanvasProps = {
    canvasHeight: number;
    canvasWidth: number;
    mouseStatus: boolean;
    onMouseUp: () => void;
};

const useStyles = createUseStyles({
    canvas: {
        position: 'absolute',
        cursor: 'pointer',
    },
    penetrateCanvas: {
        pointerEvents: 'none',
    },
});

type VisualizePointArrayType = {
    point: { x: number; y: number };
    puniPoint: { x: number; y: number };
    onomatope: string;
    addedValue: number;
    datetime: DateTime;
};

const onomatopeArray = [
    {value: 'ﾈﾈッ', probability: 2},
    {value: 'ぴえん', probability: 4},
    {value: 'ぷす', probability: 44},
    {value: 'ぷに', probability: 50},
]

const randomOnomatope = () => {
    const rand = Math.floor(Math.random() * 100);
    let rate = 0;
    let index = 0;
    let flag = false;
    onomatopeArray.forEach((element, _index) => {
        if (flag) return;
        rate += element.probability;
        if (rand <= rate) {
            index = _index;
            flag = true;
            return;
        }
    });
    return onomatopeArray[index].value;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const CookieBodyCanvas = (props: CookieBodyCanvasProps) => {
    const { canvasHeight, canvasWidth, mouseStatus, onMouseUp } = props;

    const canvasWidthRef = useRef<number>(canvasWidth);
    const canvasHeightRef = useRef<number>(canvasHeight);

    useEffect(() => {
        canvasHeightRef.current = canvasHeight;
        canvasWidthRef.current = canvasWidth;
    }, [canvasHeight, canvasWidth]);

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const visualizePointArrayRef = useRef<VisualizePointArrayType[]>([]);

    useMount(() => {
        setInterval(() => {
            rewriteCanvas(visualizePointArrayRef.current);
        }, 100);
    });

    const addCountPerClick = useSelector(
        (state: ClickerRootState) => state.addCountPerClick,
    );

    const handleMouseUp = useCallback(
        (e: any) => {
            if (mouseStatus === false) return;
            visualizePointArrayRef.current = [
                {
                    point: {
                        x: e.pageX + Math.floor((Math.random() - 0.5) * 2),
                        y: e.pageY,
                    },
                    puniPoint: {
                        x: Math.ceil(Math.random() * canvasWidthRef.current),
                        y: Math.ceil(Math.random() * canvasHeightRef.current),
                    },
                    onomatope: randomOnomatope(),
                    addedValue: addCountPerClick,
                    datetime: DateTime.now(),
                },
                ...visualizePointArrayRef.current,
            ].slice(0, 15);
            onMouseUp();
        },
        [addCountPerClick, mouseStatus, onMouseUp],
    );

    const rewriteCanvas = (visualizePointArray: VisualizePointArrayType[]) => {
        const canvasElement = canvasRef.current;
        if (!canvasElement) return;

        const ctx = canvasElement.getContext('2d');

        if (!ctx) return;
        ctx.clearRect(0, 0, canvasWidthRef.current, canvasHeightRef.current);
        ctx.font = '500 30px "Kosugi Maru"';
        visualizePointArray.forEach((visualizePoint) => {
            const pointedDatetime = visualizePoint.datetime;
            const elapsedTime =
                -1 * pointedDatetime.diffNow('milliseconds').milliseconds;
            const drawOpacity = 1 - elapsedTime / 1000;
            ctx.fillStyle = `rgb(15, 15, 15, ${drawOpacity})`;
            drawPuni(
                ctx,
                visualizePoint.puniPoint.x,
                visualizePoint.puniPoint.y,
                visualizePoint.onomatope,
            );
            const y = visualizePoint.point.y - elapsedTime / 15 - 80;
            const x = visualizePoint.point.x - 15;
            ctx.fillText(`+${visualizePoint.addedValue}`, x, y);
        });
    };

    const drawPuni = (
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
        onomatope: string,
    ) => {
        ctx.fillText(onomatope, x, y);
    };

    const classes = useStyles();

    const canvasClass = classNames(classes.canvas, {
        [classes.penetrateCanvas]: !mouseStatus,
    });

    return (
        <canvas
            className={canvasClass}
            height={canvasHeight}
            width={canvasWidth}
            onMouseUp={handleMouseUp}
            ref={canvasRef}
        />
    );
};
