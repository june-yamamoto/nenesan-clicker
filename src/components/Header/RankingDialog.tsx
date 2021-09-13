import {
    AppBar,
    Dialog,
    IconButton,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    Toolbar,
} from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import { createUseStyles } from 'react-jss';
import { useUsersRanking } from '../../hooks/useUsersRanking';
import CloseIcon from '@material-ui/icons/Close';
import { useMemo } from 'react';
import { convertDisplayUnits } from '../../utils/convertDisplayUnits';
import { playTimeToString } from '../../utils/playTimeToString';
import classNames from 'classnames';

type RankingDialogProps = {
    open: boolean;
    onClose: () => void;
};

const useStyles = createUseStyles({
    root: {
        fontFamily: "'Kosugi Maru',sans-serif",
    },
    appBar: {
        position: 'relative',
        backgroundColor: '#282c34',
    },
    iconButton: {
        marginRight: 16,
    },
    table: {
        marginTop: 8,
        marginBottom: 8,
        minWidth: 1200,
        '& .MuiTableCell-root': {
            fontSize: 18,
            fontFamily: "'Kosugi Maru',sans-serif",
        },
    },
    tableHead: {
        '& .MuiTableCell-root': {
            fontWeight: 800,
        },
    },
    firstUser: {
        '& .MuiTableCell-root': {
            backgroundColor: 'rgb(238, 232, 170, 0.3)',
            fontWeight: 600,
        },
    },
    secondUser: {
        '& .MuiTableCell-root': {
            backgroundColor: 'rgb(192, 192, 192, 0.3)',
            fontWeight: 400,
        },
    },
    thirdUser: {
        '& .MuiTableCell-root': {
            backgroundColor: 'rgb(117, 33, 0, 0.3)',
            fontWeight: 200,
        },
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
        return userRecords
            .sort((a, b) => {
                if (a.maxNenesan < b.maxNenesan) {
                    return 1;
                }
                return -1;
            })
            .map((record) => {
                return { ...record, id: '' };
            });
    }, [userRecords]);

    const classes = useStyles();

    return (
        <Dialog open={props.open} fullScreen className={classes.root}>
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
            <TableContainer className={classes.table}>
                <Table>
                    <TableHead className={classes.tableHead}>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>ユーザー名</TableCell>
                            <TableCell>累計生産ねねさん</TableCell>
                            <TableCell>最大所持ねねさん</TableCell>
                            <TableCell>累計ぷにぷに回数</TableCell>
                            <TableCell>最多ぷにぷに回数/秒</TableCell>
                            <TableCell>累計プレイ時間</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {record.map((record, index) => (
                            <TableRow
                                key={`${record.name}-${record.maxNenesan}`}
                                className={classNames({
                                    [classes.firstUser]: index === 0,
                                    [classes.secondUser]: index === 1,
                                    [classes.thirdUser]: index === 2,
                                })}
                            >
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>
                                    {record.name || 'nanashi'}
                                </TableCell>
                                <TableCell>
                                    {convertDisplayUnits(
                                        record.totalNenesan,
                                        0,
                                    )}
                                </TableCell>
                                <TableCell>
                                    {convertDisplayUnits(record.maxNenesan, 0)}
                                </TableCell>
                                <TableCell>
                                    {record.clickedNenesanTimes}
                                </TableCell>
                                <TableCell>
                                    {convertDisplayUnits(
                                        record.maxClickCountPerSeconds,
                                    )}
                                </TableCell>
                                <TableCell>
                                    {playTimeToString(record.totalPlayTime)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Dialog>
    );
};
