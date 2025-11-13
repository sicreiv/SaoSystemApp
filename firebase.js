// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDKW5PxIBs1BN60qf3kmQgMxMhQWIIM5zY",
  authDomain: "saoapp-34d75.firebaseapp.com",
  projectId: "saoapp-34d75",
  storageBucket: "saoapp-34d75.firebasestorage.app",
  messagingSenderId: "108063022598",
  appId: "1:108063022598:web:3facf61b5753c15032ad87",
  measurementId: "G-G3044GKCZ9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
