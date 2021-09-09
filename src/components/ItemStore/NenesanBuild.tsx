import React from 'react';
import { useCallback } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';
import { ClickerRootState } from '../../store/state';
import { calcNenesanPerSecondsBy } from '../../utils/calcNenesanPerSecondsBy';
import { BuildItem } from './BuildItem';

const useStyles = createUseStyles({
    root: {},
    buildItem: {
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

export const NenesanBuild = React.memo(() => {
    const dispatch = useDispatch();

    const currentCount = useSelector(
        (state: ClickerRootState) => state.currentNenesan,
    );
    const buildItemLists = useSelector(
        (state: ClickerRootState) => state.buildItems,
    );
    const upgradeItemLists = useSelector(
        (state: ClickerRootState) => state.upgradeItems,
    );
    const handleClickBuildItem = useCallback(
        (index: number) => {
            dispatch({ type: 'BUILD_ITEM', index });
        },
        [dispatch],
    );

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.titleRoot}>
                <span className={classes.title}>ねねさんのオトモダチ</span>
            </div>
            {buildItemLists.map((item, index) => {
                return (
                    <div className={classes.buildItem} key={index}>
                        <BuildItem
                            name={item.name}
                            flavor={item.flavor}
                            price={item.currentPrice}
                            itemHas={item.itemHas}
                            nenesanPerSeconds={calcNenesanPerSecondsBy(
                                item,
                                upgradeItemLists,
                            )}
                            itemCanBuy={currentCount >= item.currentPrice}
                            onClickBuildItem={() => handleClickBuildItem(index)}
                        />
                    </div>
                );
            })}
        </div>
    );
});
NenesanBuild.displayName = 'nenesan-Build';
