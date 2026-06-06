import { initializeApp } from "firebase/app";
import {
    getAuth,
    GoogleAuthProvider
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDh3J35UGcP_F2X4fSUkWV2QXsXTsOJoUw",
  authDomain: "freshfeast-1fa90.firebaseapp.com",
  projectId: "freshfeast-1fa90",
  storageBucket: "freshfeast-1fa90.firebasestorage.app",
  messagingSenderId: "519119786259",
  appId: "1:519119786259:web:b3937afc40c7cc98844ae6"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const provider =
    new GoogleAuthProvider();

export default app;