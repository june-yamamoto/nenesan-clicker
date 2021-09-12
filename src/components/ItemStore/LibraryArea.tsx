import {
    AppBar,
    Button,
    Dialog,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Toolbar,
} from '@material-ui/core';
import { Book } from '@material-ui/icons';
import CloseIcon from '@material-ui/icons/Close';
import { useCallback, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';
import { ItemUpgradeItem } from '../../models/UpgradeItem';
import { ClickerRootState } from '../../store/state';
import { UpgradeItemSecondaryText } from './UpgradeItemSecondaryText';

const useStyles = createUseStyles({
    appBar: {
        position: 'relative',
        backgroundColor: '#282c34',
    },
    iconButton: {
        marginRight: 16,
    },
});

export const LibraryArea = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const handleOpen = useCallback(() => {
        setOpen(!open);
    }, [open]);

    const handleClose = useCallback(() => {
        setOpen(false);
    }, []);

    const purchasedUpgradeItem = useSelector((state: ClickerRootState) =>
        state.upgradeItems.filter((item) => item.purchased),
    );

    const buildItems = useSelector(
        (state: ClickerRootState) => state.buildItems,
    );

    return (
        <>
            <Button onClick={handleOpen}>
                <Book />
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
                        購入したアップグレード
                    </Toolbar>
                </AppBar>
                <List>
                    {purchasedUpgradeItem.map((item) => {
                        const buildItemName =
                            item instanceof ItemUpgradeItem
                                ? buildItems.filter(
                                    (buildItem) =>
                                        buildItem.id === item.specificItemId,
                                )[0].name
                                : undefined;
                        return (
                            <>
                                <ListItem key={item.id}>
                                    <ListItemText
                                        primary={item.name}
                                        secondary={
                                            <UpgradeItemSecondaryText
                                                upgradeItem={item}
                                                buildItemName={buildItemName}
                                            />
                                        }
                                    />
                                </ListItem>
                                <Divider />
                            </>
                        );
                    })}
                </List>
            </Dialog>
        </>
    );
};
