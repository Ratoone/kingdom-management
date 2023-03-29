import { Proficiency } from "../sheet/skill/Proficiency";
import { Skill } from "../sheet/skill/Skill";
import { Structure } from "./Structure";

test('Parses structure correctly', () => {
    const structureJson = {
        "name": "Brewery",
        "level": 1,
        "lots": 1,
        "residential": "TRUE",
        "description": "A brewery is devoted to crafting alcohol, be it beer, wine, or spirits. This building can represent bottlers, vineyards, or even structures that produce non- alcoholicdrinks.",
        "effects": "When you build a brewery, reduce Unrest by 1 as long as you have fewer than 4 breweries in the settlement at that time.",
        "itemBonus": "+1",
        "activities": "Establish Trade Agreement",
        "cost": "6 RP, 2 Lumber",
        "build": "Agriculture DC 15\nDefense (trained) DC 15",
        "edifice": "FALSE",
        "famous": "FALSE",
        "infamous": "FALSE",
        "upgradeFrom": ""
    };
    const structure = new Structure(structureJson);
    expect(structure.itemBonus).toEqual(1);
    expect(structure.build[0][0]).toEqual(Skill.Agriculture);
    expect(structure.build[0][1]).toEqual(Proficiency.Untrained);
});