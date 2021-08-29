import { createUseStyles } from 'react-jss';
import { NenesanBuild } from './NenesanBuild';
import { NenesanUpgrade } from './NenesanUpgrade';
import { StatsArea } from './StatsArea';

type ItemStoreProps = {
    windowWidth: number;
};

const useStyles = createUseStyles({
    root: {
        maxHeight: '100%',
        boxSizing: 'border-box',
        minWidth: '300px',
        overflowY: 'auto',
        overflowX: 'hidden',
    },
    title: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
        fontSize: '24px',
        borderBottom: 'solid 1px #888888',
    },
});

export const ItemStore = (props: ItemStoreProps) => {
    const { windowWidth } = props;
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.title}>ねねさんストア(仮)</div>
            <NenesanUpgrade />
            <NenesanBuild />
            <StatsArea />
        </div>
    );
};
