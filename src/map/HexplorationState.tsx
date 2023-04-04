enum HexplorationState {
    Unexplored = "Unexplored",
    Explored = "Explored",
    Claimed = "Claimed"
}

const hexplorationStateColor: { [key in keyof typeof HexplorationState]: string } = {
    [HexplorationState.Unexplored]: "#000",
    [HexplorationState.Explored]: "transparent",
    [HexplorationState.Claimed]: "#4169e1"
}

export { HexplorationState, hexplorationStateColor }