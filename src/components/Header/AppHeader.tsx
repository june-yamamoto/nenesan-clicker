import { createUseStyles } from 'react-jss';
import MenuIcon from '@material-ui/icons/Menu';
import { Stars } from '@material-ui/icons';
import { useCallback, useState } from 'react';
import { RankingDialog } from './RankingDialog';
import { UserConfigState } from '../../store/state';
import { useSelector } from 'react-redux';

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
    star: {
        marginLeft: 8,
    },
});

export const AppHeader = (props: AppHeaderProps) => {
    const { windowWidth, onClickMenuIcon } = props;
    const classes = useStyles();
    const [rankingOpen, setRankingOpen] = useState(false);

    const userName = useSelector((state: UserConfigState) => state.name);

    const handleOpenRankingButton = useCallback(() => {
        setRankingOpen(true);
    }, []);

    const handleCloseRanking = useCallback(() => {
        setRankingOpen(false);
    }, []);

    return (
        <header className={classes.appHeader}>
            <span className={classes.title}>ねねさんクリッカー</span>
            {userName && <Stars onClick={handleOpenRankingButton} className={classes.star}/>}
            {windowWidth <= 540 && (
                <MenuIcon
                    className={classes.hamburgerMenuIcon}
                    onClick={onClickMenuIcon}
                />
            )}
            {userName && (
                <RankingDialog
                    open={rankingOpen}
                    onClose={handleCloseRanking}
                />
            )}
        </header>
    );
};
