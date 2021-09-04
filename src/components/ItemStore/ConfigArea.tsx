import {
    AppBar,
    Button,
    Container,
    Dialog,
    Divider,
    IconButton,
    Snackbar,
    TextField,
    Toolbar,
} from '@material-ui/core';
import { Settings } from '@material-ui/icons';
import { useCallback, useState } from 'react';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import { createUseStyles } from 'react-jss';
import { loadInLocalStorage } from '../../infra/localStorage';
import {
    convertBase64ToJson,
    convertJsonToBase64,
} from '../../utils/convertSaveData';
import { useDispatch } from 'react-redux';

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
    },
    margin: {
        marginTop: 8,
    },
    textField: {
        marginTop: '8px !important',
    },
});

export const ConfigArea = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const [importAlertOpen, setImportAlertOpen] = useState(false);

    const [exportBase64, setExportBase64] = useState('');

    const [importBase64, setImportBase64] = useState('');

    const [isImportBase64Normaly, setIsImportBase64Normaly] = useState(true);

    const handleOpen = useCallback(() => {
        setOpen((prev: boolean) => !prev);
    }, []);

    const handleClose = useCallback(() => {
        setOpen(false);
    }, []);

    const handleClickExportSaveData = useCallback(() => {
        const saveDataJson = loadInLocalStorage();
        setExportBase64(convertJsonToBase64(saveDataJson));
    }, []);

    const handleClickImportSaveData = useCallback(() => {
        dispatch({ type: 'IMPORT', saveDataBase64: importBase64 });
        setImportAlertOpen(true);
    }, [dispatch, importBase64]);

    const handleChangeTextField = useCallback((event) => {
        setImportBase64(event.target.value);
        setIsImportBase64Normaly(!convertBase64ToJson(event.target.value));
    }, []);

    return (
        <>
            <Button onClick={handleOpen}>
                <Settings />
            </Button>
            <Dialog open={open} fullScreen onClose={handleClose}>
                <AppBar className={classes.appBar} position="relative">
                    <Toolbar>
                        <IconButton
                            onClick={handleClose}
                            aria-label="close"
                            className={classes.iconButton}
                        >
                            <CloseIcon />
                        </IconButton>
                        設定
                    </Toolbar>
                </AppBar>
                <Container className={classes.importExportArea}>
                    <div>セーブデータのエクスポート</div>
                    <div className={classes.margin}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleClickExportSaveData}
                        >
                            エクスポート
                        </Button>
                        <TextField
                            fullWidth
                            id="outlined-read-only-input"
                            defaultValue="ここにセーブデータが表示されます"
                            InputProps={{
                                readOnly: true,
                            }}
                            value={exportBase64}
                            variant="outlined"
                            className={classes.textField}
                        />
                    </div>
                    <div className={classes.margin}>
                        セーブデータのインポート
                    </div>
                    <div className={classes.margin}>
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={isImportBase64Normaly}
                            onClick={handleClickImportSaveData}
                        >
                            インポート
                        </Button>
                        <TextField
                            fullWidth
                            id="outlined-read-only-input"
                            defaultValue="ここにセーブデータを入力してください"
                            InputProps={{
                                readOnly: false,
                            }}
                            onChange={handleChangeTextField}
                            value={importBase64}
                            variant="outlined"
                            className={classes.textField}
                        />
                    </div>
                    <Divider />
                </Container>
                <Snackbar
                    open={importAlertOpen}
                    autoHideDuration={6000}
                    onClose={() => setImportAlertOpen(false)}
                >
                    <Alert>セーブデータをインポートしました</Alert>
                </Snackbar>
            </Dialog>
        </>
    );
};
