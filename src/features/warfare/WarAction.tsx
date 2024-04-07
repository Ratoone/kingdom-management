import actionsData from "../../assets/war_actions.json";

interface WarAction {
    name: string;
    cost: {
        type: string;
        value: number;
        condition?: string;
    };
    tags: string[];
    text: string;
    requirement?: string;
}

const warActions: WarAction[] = actionsData.map(data => data as WarAction);

export { type WarAction, warActions };
