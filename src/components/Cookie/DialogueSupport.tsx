import classnames from 'classnames';
import { useCallback } from 'react';
import { createUseStyles } from 'react-jss';
import { useDialogueMemberVisible } from '../../hooks/useDialogueMemberVisible';
import yurinya from '../../static/image/yurinya_icon.png';
import nenesan from '../../static/image/nenesan_icon.png';
import kyon from '../../static/image/kyon_icon.png';
import yuna from '../../static/image/yuna_icon.png';
import yakan from '../../static/image/yakan_icon.png';
import sappi from '../../static/image/sappi_icon.png';
import mayu from '../../static/image/mayu_icon.png';
import manat from '../../static/image/manat_icon.png';

type DialogueSupportProps = {
    width: number;
    height: number;
};

const dialogueMemberImages = [
    yurinya,
    nenesan,
    kyon,
    yuna,
    yakan,
    sappi,
    mayu,
    manat,
];

const useStyles = createUseStyles({
    dialogueMember: {
        position: 'absolute',
    },
    dialogueMemberVisible: {
        cursor: 'pointer',
        pointerEvents: 'auto',
        transition: 'opacity 1.5s, height 1.5s, width 1.5s',
        opacity: 1,
        height: 200,
        width: 200,
    },
    dialogueMemberInvisible: {
        pointerEvents: 'none',
        transition: 'opacity 1s, height 1s, width 1s',
        opacity: 0,
        height: 0,
        width: 0,
    },
});

export const DialogueSupport = (props: DialogueSupportProps) => {
    const { width, height } = props;

    const { visible, selectedIndex, onClickMember, positionX, positionY } =
        useDialogueMemberVisible(width, height - 200);

    const classes = useStyles();

    const dialogueMemberClass = classnames(classes.dialogueMember, {
        [classes.dialogueMemberVisible]: visible,
        [classes.dialogueMemberInvisible]: !visible,
    });

    const handleClick = useCallback(() => {
        onClickMember();
    }, [onClickMember]);

    return (
        <>
            <img
                src={dialogueMemberImages[selectedIndex]}
                className={dialogueMemberClass}
                onClick={handleClick}
                style={{ top: positionY, left: positionX }}
            />
        </>
    );
};
