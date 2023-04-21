export class AbilityScore {
    boost: number;

    public constructor(boost: number) {
        this.boost = boost;
    }

    public getMod(): number {
        return Math.floor((this.boost * 2 - Math.max(0, this.boost - 4)) / 2);
    }

    public getScore(): number {
        return 10 + this.boost * 2 - Math.max(0, this.boost - 4);
    }
}