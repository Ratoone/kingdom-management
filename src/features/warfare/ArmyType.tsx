enum ArmyType {
    Cavalry = "Cavalry",
    Infantry = "Infantry",
    Siege = "Siege",
    Skirmisher = "Skirmisher"
}

const armyTypeAbility = (armyType: ArmyType): String => {
    switch (armyType) {
        case ArmyType.Cavalry:
            return "Overrun: Cavalry armies gain a +1 status bonus on weapon attacks against infantry and skirmisher armies, but they suffer a –1 status penalty on Maneuver and Morale saves against area attacks and mental attacks.";
        case ArmyType.Siege:
            return "Engines of War: Siege engines cannot be outfitted with gear. They cannot attack engaged armies. They are more difficult to destroy due to their higher hit points than other basic armies. A siege engine can attack and damage fortifications with its ranged attacks as part of the Battle or Overwhelming Bombardment actions.";
        default:
            return "";
    }
};

export { ArmyType, armyTypeAbility };
