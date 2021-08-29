import { useCallback, useRef, useState } from 'react';
import classNames from 'classnames';
import { createUseStyles } from 'react-jss';
import nenesan from '../../static/image/nenesan_dummy.png';
import { CookieBodyCanvas } from './CookieBodyCanvas';
import useMount from '../../hooks/useMount';
import { useDispatch, useSelector } from 'react-redux';
import { ClickerRootState } from '../../store/state';
import { useEffect } from 'react';

const useStyles = createUseStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        flexDirection: 'column',
        backgroundColor: 'rgb(255, 217, 60, 0.4)',
        position: 'relative',
    },
    neneCookieContainer: {
        height: '150px',
        width: '150px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    neneCookie: {
        height: '200px',
        width: '200px',
        cursor: 'pointer',
        '&:hover': {
            height: '210px',
            width: '210px',
        },
        transition: 'width 50ms, height 50ms',
    },
    onMouseDown: {
        width: '190px !important',
        height: '190px !important',
        pointerEvents: 'none',
    },
    canvasContainer: {
        position: 'absolute',
    },
    label: {
        fontSize: '24px',
        fontFamily: '"Kosugi Maru", sans-serif',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 40,
    },
    appVersion: {
        position: 'absolute',
        bottom: 5,
        right: 5,
    },
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const CookieBody = () => {
    const [mouseStatus, setMouseStatus] = useState(false);

    const rootDivRef = useRef<HTMLDivElement>(null);

    const canvasHeightRef = useRef<number>(0);
    const canvasWidthRef = useRef<number>(0);

    const currentCount = useSelector(
        (state: ClickerRootState) => state.currentNenesan,
    );

    const nenesanPerSeconds = useSelector(
        (state: ClickerRootState) => state.nenesanPerSeconds,
    );

    const nenesanPerClick = useSelector(
        (state: ClickerRootState) => state.addCountPerClick,
    );

    useMount(() => {
        if (!rootDivRef.current) return;
        canvasHeightRef.current = rootDivRef.current.clientHeight;
        canvasWidthRef.current = rootDivRef.current.clientWidth;
    });

    useEffect(() => {
        if (!rootDivRef.current) return;
        canvasHeightRef.current = rootDivRef.current.clientHeight;
        canvasWidthRef.current = rootDivRef.current.clientWidth;
    }, [rootDivRef.current?.clientHeight, rootDivRef.current?.clientWidth]);

    const dispatch = useDispatch();

    const clickOnce = useCallback(() => {
        dispatch({ type: 'CLICK_ONCE' });
    }, [dispatch]);

    const handleClickNenesan = useCallback(() => {
        clickOnce();
    }, [clickOnce]);

    const handleMouseDown = useCallback(
        (e) => {
            if (mouseStatus === false) {
                setMouseStatus(true);
            }
        },
        [mouseStatus],
    );
    const handleMouseUp = useCallback(() => {
        if (mouseStatus === true) {
            handleClickNenesan();
        }
        setMouseStatus(false);
    }, [handleClickNenesan, mouseStatus]);

    const classes = useStyles();

    const neneCookieClass = classNames(classes.neneCookie, {
        [classes.onMouseDown]: mouseStatus,
    });

    const appVersion =
        process.env.REACT_APP_VERSION_WIN === '%npm_package_version%'
            ? process.env.REACT_APP_VERSION_UNIX
            : process.env.REACT_APP_VERSION_WIN;

    return (
        <div className={classes.root} ref={rootDivRef}>
            <div className={classes.label}>
                <span>{`${currentCount.toFixed(0)} ねねさん`}</span>
                <span>{`+${nenesanPerSeconds.toFixed(1)} ねねさん/s`}</span>
                <span>{`+${nenesanPerClick.toFixed(
                    0,
                )} ねねさん/クリック`}</span>
            </div>
            <div className={classes.neneCookieContainer}>
                <img
                    src={nenesan}
                    className={neneCookieClass}
                    alt="logo"
                    onMouseDown={handleMouseDown}
                />
            </div>
            <CookieBodyCanvas
                canvasWidth={canvasWidthRef.current}
                canvasHeight={canvasHeightRef.current}
                onMouseUp={handleMouseUp}
                mouseStatus={mouseStatus}
            />
            <div className={classes.appVersion}>{appVersion}</div>
        </div>
    );
};
