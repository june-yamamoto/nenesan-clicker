import { useCallback } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';
import { ClickUpgradeItem } from '../../models/UpgradeItem';
import { ClickerRootState, StatisticsRootState } from '../../store/state';
import { UpgradeItem } from './UpgradeItem';

const useStyles = createUseStyles({
    root: {
    },
    upgradeItem: {
        backgroundColor: '#EEEEEE',
        height: 44,
        marginBottom: 4,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        height: 32,
    },
    titleRoot: {
        display: 'inline-block',
        padding: 8,
        margin: 4,
        color: '#FFFFFF',
        backgroundColor: '#2189f1',
        borderRadius: 10,
    },
});

export const NenesanUpgrade = () => {
    const dispatch = useDispatch();

    const currentCount = useSelector(
        (state: ClickerRootState) => state.currentNenesan,
    );
    const upgradeItemLists = useSelector(
        (state: ClickerRootState) => state.upgradeItems,
    );
    const buildItemLists = useSelector(
        (state: ClickerRootState) => state.buildItems,
    );
    const clickedNenesanTimes = useSelector(
        (state: StatisticsRootState) => state.clickedNenesanTimes,
    );

    const buyableUpgradeItemLists = (() => {
        return upgradeItemLists.filter((item) => {
            if (item.purchased) return false;

            if (item instanceof ClickUpgradeItem) {
                return clickedNenesanTimes >= item.unlockClickTimes;
            } else {
                const specificItem = buildItemLists.find((buildItem) => {
                    return buildItem.id === item.specificItemId;
                });
                if (!specificItem) return false;
                return specificItem.itemHas >= item.unlockBuildTimes;
            }
        });
    })();

    const handleClickUpgradeItem = useCallback(
        (id: string) => {
            dispatch({ type: 'PURCHASE_UPGRADE_ITEM', id });
        },
        [dispatch],
    );

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.titleRoot}>
                <span className={classes.title}>ねねさんのアップグレード</span>
            </div>
            {buyableUpgradeItemLists.map((item, index) => {
                return (
                    <div className={classes.upgradeItem} key={index}>
                        <UpgradeItem
                            name={item.name}
                            flavor={item.flavor}
                            price={item.price}
                            currentNenesanHas={currentCount}
                            onClickPurchaseItem={() =>
                                handleClickUpgradeItem(item.id)
                            }
                        />
                    </div>
                );
            })}
        </div>
    );
};
