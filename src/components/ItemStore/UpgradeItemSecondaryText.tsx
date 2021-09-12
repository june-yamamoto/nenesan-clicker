import React from 'react';
import { ClickUpgradeItem, UpgradeItemClasses } from '../../models/UpgradeItem';

type UpgradeItemSecondaryTextProps = {
    upgradeItem: UpgradeItemClasses;
    buildItemName?: string;
};

const clickItemReleaseExplanation = (clickTime: number) => {
    return `解放条件：ねねさんを${clickTime}回ぷにぷにする。`;
};

const buildItemReleaseExplanation = (name: string, buildNumber: number) => {
    return `解放条件：${name}の数が${buildNumber}以上になる。`;
};

export const UpgradeItemSecondaryText = React.memo(
    (props: UpgradeItemSecondaryTextProps) => {
        const { upgradeItem, buildItemName } = props;
        return (
            <>
                <div>{upgradeItem.flavor}</div>
                <div>
                    {upgradeItem instanceof ClickUpgradeItem
                        ? clickItemReleaseExplanation(
                            upgradeItem.unlockClickTimes,
                        )
                        : buildItemReleaseExplanation(
                            buildItemName || '',
                            upgradeItem.unlockBuildTimes,
                        )}
                </div>
                <div>
                    {upgradeItem.link && (
                        <a
                            href={upgradeItem.link}
                            target="_blank"
                            rel="noreferrer"
                        >
                            リンク
                        </a>
                    )}
                </div>
            </>
        );
    },
);
UpgradeItemSecondaryText.displayName = 'secondaryText';
