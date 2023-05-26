import { doc, getDoc, setDoc } from "firebase/firestore";
import {db} from "./FirestoreDB";

const updateMapData = async (documentId: string, mapData: object) => {
    setDoc(doc(db, "mapData", documentId), {
        hexMapData: mapData
    },
    { merge: true }
    );
    console.log("Map data successfully updated!");    
};

const readMapData = async (documentId: string) : Promise<Array<object>> => {
    const mapDataSnap = await getDoc(doc(db, "mapData", documentId));
    if (mapDataSnap.exists()) {
        const data = mapDataSnap.data();
        return [data.hexMapData, {x: data.x, y: data.y}];
    }
    return [{}, {x: 0, y: 0}];
};

const updatePartyPosition = async (documentId: string, x: number, y: number) => {
    setDoc(doc(db, "mapData", documentId), {
        x,
        y
    },
    { merge: true }
    );
    console.log("Party position successfully updated!");    
};

export {updateMapData, readMapData, updatePartyPosition};