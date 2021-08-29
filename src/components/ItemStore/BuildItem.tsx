import { Card, CardContent } from '@material-ui/core';
import classNames from 'classnames';
import { createUseStyles } from 'react-jss';

type BuildItemProps = {
    name: string;
    price: number;
    itemHas: number;
    currentNenesanHas: number;
    onClickBuildItem: () => void;
};

const useStyles = createUseStyles({
    root: {
        width: 300,
        opacity: 0.5,
        pointerEvents: 'none',
        position: 'relative',
        '&:hover': {
            backgroundColor: '#EEEEEE',
            transition: 'background-color 0.2s ease',
        },
        marginBottom: 4,
        fontFamily: '"Kosugi Maru", "Barlow Semi Condensed",sans-serif',
    },
    itemContent: {
        padding: '0px !important',
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

export const BuildItem = (props: BuildItemProps) => {
    const { name, price, itemHas, currentNenesanHas, onClickBuildItem } = props;

    const classes = useStyles();

    const rootClass = classNames(classes.root, {
        [classes.itemCanBuy]: currentNenesanHas >= price,
    });

    return (
        <Card className={rootClass} onClick={onClickBuildItem}>
            <CardContent className={classes.itemContent}>
                <div className={classes.itemName}>{name}</div>
                <div className={classes.itemPrice}>{price}ねねさん</div>
                <div className={classes.itemCurrentHas}>{itemHas}</div>
            </CardContent>
        </Card>
    );
};
