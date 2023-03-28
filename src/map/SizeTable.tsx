function getControlModifier(size: number): number {
    if (size < 10) {
        return 0;
    }

    if (size < 25) {
        return 1;
    }

    if (size < 50) {
        return 2;
    }

    if (size < 100) {
        return 3;
    }

    return 4;
}

function getBaseComodityStorage(size: number): number {
    return (getControlModifier(size) + 1) * 4;
}

function getResourceDie(size: number): number {
    return getControlModifier(size) * 2 + 4;
}

export { getControlModifier, getBaseComodityStorage, getResourceDie }