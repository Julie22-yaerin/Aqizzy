import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAU7tndPshfmNNClBNZA3WbBBGzbmzRWI4",
  authDomain: "pclick-9f190.firebaseapp.com",
  projectId: "pclick-9f190",
  storageBucket: "pclick-9f190.firebasestorage.app",
  messagingSenderId: "43342438061",
  appId: "1:43342438061:web:2b9e5019339e6cf0e87024",
  measurementId: "G-H8BF2M6ERM"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

let analytics: any = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, auth, db, googleProvider, analytics };
