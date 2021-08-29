import { Button, Tooltip, withStyles } from '@material-ui/core';
import { AssessmentOutlined } from '@material-ui/icons';
import { useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { StatisticsRootState } from '../../store/state';

const StatsTooltip = withStyles((theme) => ({
    tooltip: {
        minWidth: 200,
        fontSize: '14px',
    },
}))(Tooltip);

export const StatsArea = () => {
    const [open, setOpen] = useState(false);

    const handleClick = useCallback(() => {
        setOpen(!open);
    }, [open]);

    const clickedNenesanTimes = useSelector(
        (state: StatisticsRootState) => state.clickedNenesanTimes,
    );

    const maxNenesan = useSelector(
        (state: StatisticsRootState) => state.maxNenesan,
    );

    const totalNenesan = useSelector(
        (state: StatisticsRootState) => state.totalNenesan,
    );

    const stats = useMemo(() => {
        return (
            <div>
                {`累計 ${clickedNenesanTimes} クリック`}
                <br />
                {`最大 ${maxNenesan.toFixed(0)} ねねさん`}
                <br />
                {`累計 ${totalNenesan.toFixed(0)} ねねさん`}
            </div>
        );
    }, [clickedNenesanTimes, maxNenesan, totalNenesan]);

    return (
        <StatsTooltip open={open} title={stats} placement={'left-end'}>
            <Button onClick={handleClick}>
                <AssessmentOutlined />
            </Button>
        </StatsTooltip>
    );
};
