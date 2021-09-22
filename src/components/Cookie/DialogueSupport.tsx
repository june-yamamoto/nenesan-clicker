import classnames from 'classnames';
import { useCallback } from 'react';
import { createUseStyles } from 'react-jss';
import { useDialogueMemberVisible } from '../../hooks/useDialogueMemberVisible';
import { DIALOGUE_ARRAY } from '../../static/resource/dialogue_array';

type DialogueSupportProps = {
    width: number;
    height: number;
};

const dialogueMemberImages = DIALOGUE_ARRAY.map((element) => element.imgSrc);

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
