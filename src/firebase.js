import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAl6-jJKoQjMmSLacJBALHxHXXov46qAaA",
  authDomain: "enterrlusst-fefe2.firebaseapp.com",
  projectId: "enterrlusst-fefe2",
  storageBucket: "enterrlusst-fefe2.firebasestorage.app",
  messagingSenderId: "1076724545948",
  appId: "1:1076724545948:web:bf124abde284708673b059"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
