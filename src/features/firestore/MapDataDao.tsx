import { doc, getDoc, setDoc, onSnapshot, Unsubscribe } from "firebase/firestore";
import { db } from "./FirestoreDB";

const updateMapData = async (documentId: string, mapData: object) => {
    await setDoc(doc(db, "mapData", documentId), {
        hexMapData: mapData
    }, {merge: true}
    );
};

const readMapData = (documentId: string, callback: (data: Array<object>) => void): Unsubscribe => {
    return onSnapshot(doc(db, "mapData", documentId), snap => {
        if (snap.exists()) {
            const data = snap.data();
            callback([data.hexMapData, { x: data.x, y: data.y }]);
            return;
        }
        callback([{}, { x: 0, y: 0 }]);
    });
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
    await setDoc(doc(db, "mapData", documentId), {
        x,
        y
    }, {merge: true}
    );
};

export { updateMapData, readMapData, updatePartyPosition, getPassword };
