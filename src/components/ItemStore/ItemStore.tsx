import { createUseStyles } from 'react-jss';
import { NenesanBuild } from './NenesanBuild';
import { NenesanUpgrade } from './NenesanUpgrade';
import { StatsArea } from './StatsArea';

const useStyles = createUseStyles({
    root: {
        height: '100%',
        boxSizing: 'border-box',
    },
    title: {
        displaye: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
        fontSize: '24px',
        borderBottom: 'solid 1px #888888',
    },
    version: {

    },
});

export const ItemStore = () => {
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
