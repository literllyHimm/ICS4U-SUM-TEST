import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

//replace the firebaseConfig below with your own firestore project config files

const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "...",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
