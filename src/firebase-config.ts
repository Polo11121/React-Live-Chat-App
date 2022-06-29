import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_API_KEY}`,
  authDomain: `${process.env.REACT_APP_AUTH_DOMAIN}`,
  projectId: "live-chat-app-6ea25",
  storageBucket: "live-chat-app-6ea25.appspot.com",
  messagingSenderId: "996372925383",
  appId: "1:996372925383:web:8b135af4e34f5ec1da27e2",
  measurementId: "G-SEYLTVJRY6",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore();

export const auth = getAuth(app);
