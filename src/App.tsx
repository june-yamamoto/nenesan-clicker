import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';
import { CookieBody } from './components/Cookie/CookieBody';
import { ItemStore } from './components/ItemStore/ItemStore';
import { useAddNenesanInterval } from './hooks/useAddNenesanInterval';
import useInterval from './hooks/useInterval';
import useMount from './hooks/useMount';
import { ClickerRootState } from './store/state';

const useStyles = createUseStyles({
    root: {
        userSelect: 'none',
        height: 'calc(100vh - 32px)',
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
        width: 'calc(100% - 300px)',
    },
    itemStore: {
        width: '300px',
        borderWidth: '3px',
        borderColor: '#888888',
    },
});

export const App = () => {
    const dispatch = useDispatch();

    const nenesanPerSeconds = useSelector(
        (state: ClickerRootState) => state.nenesanPerSeconds,
    );

    useMount(() => {
        dispatch({ type: 'LOAD' });
    });

    useInterval(() => {
        dispatch({ type: 'SAVE' });
    }, 10000);

    useAddNenesanInterval(nenesanPerSeconds, dispatch);

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <header className={classes.appHeader}>
                <span className={classes.title}>ねねさんクリッカー</span>
            </header>
            <div className={classes.body}>
                <div className={classes.cookieBody}>
                    <CookieBody />
                </div>
                <div className={classes.itemStore}>
                    <ItemStore />
                </div>
            </div>
        </div>
    );
};

export default App;
