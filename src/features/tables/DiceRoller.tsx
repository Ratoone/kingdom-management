function rollDie(value: number): number {
    return Math.floor(Math.random() * value + 1);
}

function rollDice(count: number, value: number): number {
    let sum = 0;
    for (let i = 0; i < count; i++) {
        sum += rollDie(value);
    }

    return sum;
}

export { rollDice, rollDie };