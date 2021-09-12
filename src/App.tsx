import { useCallback, useState } from 'react';
import Div100vh from 'react-div-100vh';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';
import { CookieBody } from './components/Cookie/CookieBody';
import { ItemStore } from './components/ItemStore/ItemStore';
import { useAddNenesanInterval } from './hooks/useAddNenesanInterval';
import useInterval from './hooks/useInterval';
import useMount from './hooks/useMount';
import { ClickerRootState } from './store/state';
import { useEffect } from 'react';
import { Drawer } from '@material-ui/core';
import { AppHeader } from './components/Header/AppHeader';
import firebase, { db } from './firebase';
import { collection } from 'firebase/firestore';
import { useSecondInterval } from './hooks/useSecondInterval';

const useStyles = createUseStyles({
    root: {
        userSelect: 'none',
    },
    body: {
        display: 'flex',
        flexDirection: 'row',
        height: 'calc(100vh - 60px)',
    },
    cookieBody: {
        height: '100%',
    },
    itemStore: {
        minWidth: '300px',
        borderWidth: '3px',
        borderColor: '#888888',
    },
});

export const App = () => {
    const dispatch = useDispatch();

    const nenesanPerSeconds = useSelector(
        (state: ClickerRootState) => state.nenesanPerSeconds,
    );

    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
    const [open, setOpen] = useState(false);

    const resizeListener = () => {
        setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', resizeListener);

        return () => window.removeEventListener('resize', resizeListener);
    });

    useMount(() => {
        dispatch({ type: 'LOAD' });
    });

    useInterval(() => {
        dispatch({ type: 'SAVE' });
    }, 10000);

    const handleClickMenuIcon = useCallback(() => {
        setOpen(!open);
    }, [open]);

    useAddNenesanInterval(nenesanPerSeconds, dispatch);

    useSecondInterval(dispatch);

    const classes = useStyles();

    return (
        <Div100vh className={classes.root}>
            <AppHeader
                windowWidth={windowWidth}
                onClickMenuIcon={handleClickMenuIcon}
            />
            <div className={classes.body}>
                <div
                    className={classes.cookieBody}
                    style={{
                        width:
                            windowWidth <= 540 ? '100%' : 'calc(100% - 300px)',
                    }}
                >
                    <CookieBody />
                </div>
                {windowWidth <= 540 ? (
                    <Drawer
                        className={classes.itemStore}
                        open={open}
                        onClose={() => setOpen(false)}
                    >
                        <ItemStore windowWidth={windowWidth} />
                    </Drawer>
                ) : (
                    <div className={classes.itemStore}>
                        <ItemStore windowWidth={windowWidth} />
                    </div>
                )}
            </div>
        </Div100vh>
    );
};

export default App;
