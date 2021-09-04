import React, { useCallback, useState } from 'react';
import { Card, CardContent } from '@material-ui/core';
import classNames from 'classnames';
import { createUseStyles } from 'react-jss';
import { convertDisplayUnits } from '../../utils/convertDisplayUnits';
import { ItemTooltip } from './UpgradeItem';

type BuildItemProps = {
    name: string;
    flavor: string;
    price: number;
    itemHas: number;
    itemCanBuy: boolean;
    onClickBuildItem: () => void;
};

const useStyles = createUseStyles({
    root: {
        width: 300,
        position: 'relative',
        marginBottom: 4,
        fontFamily: '"Kosugi Maru", "Barlow Semi Condensed",sans-serif',
    },
    itemContent: {
        pointerEvents: 'none',
        padding: '0px !important',
        opacity: 0.5,
        '&:hover': {
            backgroundColor: '#EEEEEE',
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
    itemCurrentHas: {
        fontSize: '24px',
        position: 'absolute',
        right: 10,
        bottom: 10,
    },
});

export const BuildItem = React.memo((props: BuildItemProps) => {
    const {
        name,
        flavor,
        price,
        itemHas,
        itemCanBuy,
        onClickBuildItem,
    } = props;

    const classes = useStyles();

    const itemContentClass = classNames(classes.itemContent, {
        [classes.itemCanBuy]: itemCanBuy,
    });

    const [open, setOpen] = useState(false);

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
                    onClick={onClickBuildItem}
                >
                    <div className={classes.itemName}>{name}</div>
                    <div className={classes.itemPrice}>{convertDisplayUnits(price)} ねねさん</div>
                    <div className={classes.itemCurrentHas}>{itemHas}</div>
                </CardContent>
            </Card>
        </ItemTooltip>
    );
});
