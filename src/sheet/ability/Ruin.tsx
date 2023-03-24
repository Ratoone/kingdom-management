enum RuinType {
    Corruption,
    Crime,
    Decay,
    Strife
}

class Ruin {
    score: number;
    penalty: number;
    threshold: number;

    constructor(score: number = 0, penalty: number = 0, threshold: number = 10) {
        this.score = score
        this.penalty = penalty
        this.threshold = threshold
    }

    public increaseRuin(value: number) {
        this.score += value;
        if (this.score >= this.threshold) {
            this.score -= this.threshold;
            this.penalty = 0;
        }
    }

    public increaseResistance() {
        this.penalty = 0;
        this.threshold += 2;
    }
}

export { Ruin, RuinType }