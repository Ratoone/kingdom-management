class Condition {
    name: string = "";
    description: string = "";
    value?: number;
    _acBonus?: number;
    _moraleBonus?: number;
    _maneuverBonus?: number;
    _deployBonus?: number;

    constructor(
        { name, description, value, acBonus, moraleBonus, maneuverBonus, deployBonus }:
            {
                name: string,
                description: string,
                value?: number,
                acBonus?: number,
                moraleBonus?: number,
                maneuverBonus?: number,
                deployBonus?: number
            }
    ) {
        this.name = name;
        this.description = description;
        this.value = value;
        this._acBonus = acBonus;
        this._moraleBonus = moraleBonus;
        this._maneuverBonus = maneuverBonus;
        this._deployBonus = deployBonus;
    }

    increaseValue(): number | undefined {
        if (this.value !== undefined) {
            this.value += 1;
        }

        return this.value;
    }

    decreaseValue(): number | undefined {
        if (this.value !== undefined) {
            this.value -= 1;
        }

        return this.value;
    }

    public get acBonus(): number {
        return this._acBonus ?? 0;
    }

    public get moraleBonus(): number {
        return this._moraleBonus ?? 0;
    }

    public get maneuverBonus(): number {
        return this._maneuverBonus ?? 0;
    }

    public get deployBonus(): number {
        return this._deployBonus ?? 0;
    }
}

export { Condition };
