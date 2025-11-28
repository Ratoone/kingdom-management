import { doc, getDoc, setDoc, onSnapshot, Unsubscribe, collection, getDocs } from "firebase/firestore";
import { db } from "./FirestoreDB";
import { Campaign } from "../campaign/Campaign";

const updateMapData = async (documentId: string, mapData: object) => {
    await setDoc(doc(db, "mapData", documentId), {
        hexMapData: mapData
    }, { merge: true }
    );
};

const readMapData = (documentId: string, callback: (data: Array<unknown>) => void): Unsubscribe => {
    return onSnapshot(doc(db, "mapData", documentId), snap => {
        if (snap.exists()) {
            const data = snap.data();
            callback([data.hexMapData, { x: data.x, y: data.y, q: data.q, r: data.r }, data.level, data.mapInfo]);
            return;
        }
        callback([{}, { x: 0, y: 0, q: -1, r: -1 }, 0, {}]);
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

const getAllCampaigns = async (): Promise<Campaign[]> => {
    var result: Campaign[] = [];
    (await getDocs(collection(db, "mapData"))).forEach(doc => {
        result.push({id: doc.id, name: doc.data().name});
    });
    return result;
};

const updatePartyPosition = async (documentId: string, x: number, y: number, q: number, r: number) => {
    await setDoc(doc(db, "mapData", documentId), {
        x,
        y,
        q,
        r
    }, { merge: true }
    );
};

export { updateMapData, readMapData, updatePartyPosition, getPassword, getAllCampaigns };
