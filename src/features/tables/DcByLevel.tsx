function getDcByLevel(level: number) {
    if (level >= 20) {
        return 2 * level;
    }

    return level + Math.floor(level / 3) + 14;
}

export { getDcByLevel }