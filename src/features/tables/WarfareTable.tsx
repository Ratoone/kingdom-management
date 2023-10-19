const scoutingByLevel = (level: number) : number => {
    return 6 + level + Math.floor((level + 1) / 5) + Math.floor((level - 1) / 5);
};

const acByLevel = (level: number) : number => {
    return 15 + level + Math.floor(level / 2);
};

const highSaveByLevel = (level: number) : number => {
    return scoutingByLevel(level) + 3;
};

const lowSaveByLevel = (level: number) : number => {
    return scoutingByLevel(level) - 3;
};

const attackByLevel = (level: number) : number => {
    return acByLevel(level) - 7;
};

const maxTactics = (level: number) : number => {
    return 1 + Math.floor(level / 4);
};

export {scoutingByLevel, acByLevel, highSaveByLevel, lowSaveByLevel, attackByLevel};
