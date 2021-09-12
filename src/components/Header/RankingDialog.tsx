import {
    AppBar,
    Container,
    Dialog,
    IconButton,
    Toolbar,
} from '@material-ui/core';
import { createUseStyles } from 'react-jss';
import { useUsersRanking } from '../../hooks/useUsersRanking';
import CloseIcon from '@material-ui/icons/Close';
import { useMemo } from 'react';

type RankingDialogProps = {
    open: boolean;
    onClose: () => void;
};

const useStyles = createUseStyles({
    root: {},
    appBar: {
        position: 'relative',
        backgroundColor: '#282c34',
    },
    iconButton: {
        marginRight: 16,
    },
    importExportArea: {
        marginTop: 8,
        marginBottom: 8,
    },
    margin: {
        marginTop: 8,
    },
    textField: {
        marginTop: '8px !important',
    },
});

export const RankingDialog = (props: RankingDialogProps) => {
    const { open, onClose } = props;
    const userRecords = useUsersRanking(open);

    const record = useMemo(() => {
        return userRecords.map((record: any) => {
            return { ...record, id: undefined };
        });
    }, [userRecords]);

    console.log(record);

    const classes = useStyles();

    return (
        <Dialog open={props.open} fullScreen>
            <AppBar className={classes.appBar} position="relative">
                <Toolbar>
                    <IconButton
                        onClick={onClose}
                        aria-label="close"
                        className={classes.iconButton}
                    >
                        <CloseIcon />
                    </IconButton>
                    ランキング
                </Toolbar>
            </AppBar>
            <Container className={classes.importExportArea}>
                {record.map((record: any) => {
                    return `${record.clickedNenesanTimes}\n`;
                })}
            </Container>
        </Dialog>
    );
};
