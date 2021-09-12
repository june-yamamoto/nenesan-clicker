export const playTimeToString = (playTimeMilliseconds: number) => {
    const playTimeSeconds = Math.trunc(playTimeMilliseconds / 1000);
    const timeD = Math.floor(playTimeSeconds / (24 * 60 * 60));
    const timeH = Math.floor(playTimeSeconds % (24 * 60 * 60) / (60 * 60));
    const timeM = Math.floor(playTimeSeconds % (24 * 60 * 60) % (60 * 60) / 60);
    const timeS = playTimeSeconds % (24 * 60 * 60) % (60 * 60) % 60;
    let timeDMS = '';
    timeDMS += timeD > 0 ? `${timeD}日` : '';
    timeDMS += timeH > 0 || (timeH === 0 && timeD > 0) ? `${timeH}時間` : '';
    timeDMS += `${timeM}分`;
    timeDMS += `${timeS}秒`;

    return timeDMS;
};
