import { doc, documentId, getDoc, setDoc } from "firebase/firestore";
import {db} from "./FirestoreDB";

const updateMapData = async (documentId: string, mapData: object) => {
    setDoc(doc(db, "mapData", documentId), {
        hexMapData: mapData
    },
    { merge: true }
    );
    console.log("Map data successfully updated!");    
};

const readMapData = async (documentId: string) : Promise<object> => {
    const mapDataSnap = await getDoc(doc(db, "mapData", documentId));
    if (mapDataSnap.exists()) {
        return mapDataSnap.data().hexMapData;
    }
    return {};
};

export {updateMapData, readMapData};