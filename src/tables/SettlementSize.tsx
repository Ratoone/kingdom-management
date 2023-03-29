function getMaxBlocks(size: number) {
    return size * size;
}

const naming = ["Village", "Town", "City", "Metropolis"]

function getName(size: number) {
    return naming[size - 1];
}

function getMinimumKingdomLevel(size: number) {
    return size % 2 === 0 ? size * size - 1 : size * size;
}

function getBaseConsumption(size: number) {
    return size === 1 ? size : 2 * (size - 1);
}

function getMaxItemBonus(size: number) {
    return Math.ceil(getBaseConsumption(size) / 2);
}

function getInfluence(size: number) {
    return size - 1;
}

export { getMaxBlocks, getName, getMinimumKingdomLevel, getBaseConsumption, getMaxItemBonus, getInfluence };