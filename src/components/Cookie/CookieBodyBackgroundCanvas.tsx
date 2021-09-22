import { useRef } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';
import { ClickerRootState } from '../../store/state';

type CookieBodyBackgroundCanvasProps = {
    canvasWidth: number;
    canvasHeight: number;
};

const useStyles = createUseStyles({
    canvas: {
        position: 'absolute',
        pointerEvents: 'none',
    },
});

export const CookieBodyBackgroundCanvas = (
    props: CookieBodyBackgroundCanvasProps,
) => {
    const { canvasWidth, canvasHeight } = props;

    const canvasRef = useRef(null);

    const classes = useStyles();

    const currentNenesanPerSeconds = useSelector(
        (state: ClickerRootState) => state.nenesanPerSeconds,
    );

    return (
        <canvas
            className={classes.canvas}
            height={canvasHeight}
            width={canvasWidth}
            ref={canvasRef}
        />
    );
};
