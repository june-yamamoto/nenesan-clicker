import { createUseStyles } from 'react-jss';
import MenuIcon from '@material-ui/icons/Menu';
import { Stars } from '@material-ui/icons';
import { useCallback, useState } from 'react';
import { RankingDialog } from './RankingDialog';

type AppHeaderProps = {
    windowWidth: number;
    onClickMenuIcon: () => void;
};

const useStyles = createUseStyles({
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
    title: {
        color: '#ffd93c',
    },
    hamburgerMenuIcon: {
        position: 'absolute',
        right: 16,
    },
});

export const AppHeader = (props: AppHeaderProps) => {
    const { windowWidth, onClickMenuIcon } = props;
    const classes = useStyles();
    const [rankingOpen, setRankingOpen] = useState(false);

    const handleOpenRankingButton = useCallback(() => {
        setRankingOpen(true);
    }, []);

    const handleCloseRanking = useCallback(() => {
        setRankingOpen(false);
    }, []);

    return (
        <header className={classes.appHeader}>
            <span className={classes.title}>ねねさんクリッカー</span>
            {/* <Stars onClick={handleOpenRankingButton} /> */}
            {windowWidth <= 540 && (
                <MenuIcon
                    className={classes.hamburgerMenuIcon}
                    onClick={onClickMenuIcon}
                />
            )}
            {/* <RankingDialog open={rankingOpen} onClose={handleCloseRanking} /> */}
        </header>
    );
};
