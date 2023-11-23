import { collection, getDocs, query, where } from "firebase/firestore";
import { Army, armyConverter } from "../warfare/Army";
import { db } from "./FirestoreDB";

const updateArmy = (army: Army) => {

};

const deleteArmy = (armyId: string) => {

};

const addArmy = (army: Army) => {

};

const getArmies = async (mapId: string, level: number): Promise<Array<Army>> => {
    const armyQuery = query(collection(db, "warfare").withConverter(armyConverter), where("mapId", "==", mapId));
    return (await getDocs(armyQuery)).docs.map(doc => {
        const army = doc.data() as Army;
        army.level = level;
        return army;
    });
};

export { updateArmy, deleteArmy, addArmy, getArmies };