import { addDoc, collection, deleteDoc, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { Army, armyConverter } from "../warfare/Army";
import { db } from "./FirestoreDB";

const updateArmy = async (army: Army) => {
    if (army.id === "") {
        throw new ReferenceError("Army has missing id");
    }
    await setDoc(doc(db, "warfare", army.id).withConverter(armyConverter), army);
};

const deleteArmy = async (armyId: string) => {
    await deleteDoc(doc(db, "warfare", armyId));
};

const addArmy = async (army: Army): Promise<string> => {
    return (await addDoc(collection(db, "warfare").withConverter(armyConverter), army)).id;
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