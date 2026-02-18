// Triggering redeploy for environment variables - 14.02.2026 - v2
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const isConfigValid = !!firebaseConfig.apiKey && firebaseConfig.apiKey !== "undefined";

// Initialize Firebase
const app = isConfigValid
    ? (!getApps().length ? initializeApp(firebaseConfig) : getApp())
    : (!getApps().length ? initializeApp({ apiKey: "dummy", projectId: "dummy" }) : getApp()); // Dummy for build time

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

let analytics: any;
if (typeof window !== "undefined" && isConfigValid) {
    import("firebase/analytics").then(({ getAnalytics }) => {
        try {
            analytics = getAnalytics(app);
        } catch (e) {
            console.warn("Firebase Analytics initialization failed:", e);
        }
    }).catch(() => {
        console.warn("Firebase Analytics module could not be loaded.");
    });
}

export { app, db, auth, storage, analytics };
