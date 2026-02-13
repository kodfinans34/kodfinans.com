
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { SiteSettings } from "@/lib/types";

export async function getSettings(): Promise<SiteSettings | null> {
    try {
        const timeoutPromise = new Promise<null>((_, reject) => {
            setTimeout(() => reject(new Error("Settings fetch timeout")), 5000);
        });

        const docRef = doc(db, "settings", "site");
        const docSnap = await Promise.race([
            getDoc(docRef),
            timeoutPromise
        ]);

        if ((docSnap as any).exists()) {
            return (docSnap as any).data() as SiteSettings;
        }
    } catch (error) {
        console.error("Error fetching settings from Firestore:", error);
    }
    return null;
}

export async function updateSettingsInFirestore(settings: SiteSettings): Promise<void> {
    try {
        const docRef = doc(db, "settings", "site");
        await setDoc(docRef, settings, { merge: true });
    } catch (error) {
        console.error("Error updating settings:", error);
        throw error;
    }
}
