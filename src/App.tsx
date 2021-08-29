import { useCallback, useState } from 'react';
import Div100vh from 'react-div-100vh';
import { createUseStyles } from 'react-jss';
import MenuIcon from '@material-ui/icons/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { CookieBody } from './components/Cookie/CookieBody';
import { ItemStore } from './components/ItemStore/ItemStore';
import { useAddNenesanInterval } from './hooks/useAddNenesanInterval';
import useInterval from './hooks/useInterval';
import useMount from './hooks/useMount';
import { ClickerRootState } from './store/state';
import { useEffect } from 'react';
import { Drawer } from '@material-ui/core';

const useStyles = createUseStyles({
    root: {
        userSelect: 'none',
    },
    title: {
        color: '#ffd93c',
    },
    appHeader: {
        backgroundColor: '#282c34',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'left',
        paddingLeft: '16px',
        fontSize: 'calc(10px + 2vmin)',
        color: 'white',
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
    hamburgerMenuIcon: {
        position: 'absolute',
        right: 16,
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

    const classes = useStyles();

    return (
        <Div100vh className={classes.root}>
            <header className={classes.appHeader}>
                <span className={classes.title}>ねねさんクリッカー</span>
                {windowWidth <= 540 && (
                    <MenuIcon
                        className={classes.hamburgerMenuIcon}
                        onClick={handleClickMenuIcon}
                    />
                )}
            </header>
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
