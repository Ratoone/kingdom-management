import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./FirestoreDB";

const updateMapData = async (documentId: string, mapData: object) => {
    setDoc(doc(db, "mapData", documentId), {
        hexMapData: mapData
    }, { merge: true }
    );
};

const readMapData = async (documentId: string): Promise<Array<object>> => {
    const mapDataSnap = await getDoc(doc(db, "mapData", documentId));
    if (mapDataSnap.exists()) {
        const data = mapDataSnap.data();
        return [data.hexMapData, { x: data.x, y: data.y }];
    }
    return [{}, { x: 0, y: 0 }];
};

const getPassword = async (documentId: string): Promise<String> => {
    const mapDataSnap = await getDoc(doc(db, "mapData", documentId));
    if (mapDataSnap.exists()) {
        const data = mapDataSnap.data();
        return data.password;
    }
    return "";
};

const updatePartyPosition = async (documentId: string, x: number, y: number) => {
    setDoc(doc(db, "mapData", documentId), {
        x,
        y
    }, { merge: true }
    );
};

export { updateMapData, readMapData, updatePartyPosition, getPassword };
