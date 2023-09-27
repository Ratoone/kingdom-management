import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBT-ChYjqQs3EicNilPzfriWLKVy4X9d0o",
    authDomain: "kingdom-management.firebaseapp.com",
    projectId: "kingdom-management",
    storageBucket: "kingdom-management.appspot.com",
    messagingSenderId: "894876408655",
    appId: "1:894876408655:web:e6599eb73e6040276f833a",
    measurementId: "G-09ZSV2QGP3"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
