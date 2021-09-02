import { Card, CardContent, Tooltip, withStyles } from '@material-ui/core';
import classNames from 'classnames';
import { useCallback, useState } from 'react';
import { createUseStyles } from 'react-jss';

type UpgradeItemProps = {
    name: string;
    flavor: string;
    price: number;
    currentNenesanHas: number;
    onClickPurchaseItem: () => void;
};

const useStyles = createUseStyles({
    root: {
        width: 300,
        marginBottom: 4,
        fontFamily: '"Kosugi Maru", "Barlow Semi Condensed",sans-serif',
    },
    itemContent: {
        pointerEvents: 'none',
        padding: '0px !important',
        opacity: 0.5,
        '&:hover': {
            backgroundColor: '#F8F8F8',
            transition: 'background-color 0.2s ease',
        },
    },
    itemName: {
        marginLeft: 8,
        textAlign: 'start',
        fontSize: '20px',
        paddingBottom: 4,
    },
    itemPrice: {
        marginLeft: 8,
        fontSize: '16px',
        paddingBottom: 4,
    },
    itemCanBuy: {
        opacity: 1,
        pointerEvents: 'auto',
    },
});

export const ItemTooltip = withStyles((theme) => ({
    tooltip: {
        maxWidth: 242,
        fontSize: '14px',
    },
}))(Tooltip);

export const UpgradeItem = (props: UpgradeItemProps) => {
    const { name, flavor, price, currentNenesanHas, onClickPurchaseItem } =
        props;

    const [open, setOpen] = useState(false);

    const classes = useStyles();

    const itemContentClass = classNames(classes.itemContent, {
        [classes.itemCanBuy]: currentNenesanHas >= price,
    });

    const handleMouseOver = useCallback((e: any) => {
        setOpen(true);
    }, []);

    const handleMouseLeave = useCallback((e: any) => {
        setOpen(false);
    }, []);

    return (
        <ItemTooltip open={open} title={flavor} placement={'left-start'}>
            <Card
                className={classes.root}
                onMouseOver={handleMouseOver}
                onMouseLeave={handleMouseLeave}
            >
                <CardContent
                    className={itemContentClass}
                    onClick={onClickPurchaseItem}
                >
                    <div className={classes.itemName}>{name}</div>
                    <div className={classes.itemPrice}>{price} ねねさん</div>
                </CardContent>
            </Card>
        </ItemTooltip>
    );
};
