
import { db } from "./firebase";
import { collection, addDoc, getDocs, updateDoc, doc, query, orderBy } from "firebase/firestore";
import { BozumRequest } from "./types";

const BOZUM_COLLECTION = "bozum_requests";

export async function getBozumRequestsFromFirestore(): Promise<BozumRequest[]> {
    try {
        const q = query(collection(db, BOZUM_COLLECTION), orderBy("timestamp", "desc"));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            timestamp: doc.data().timestamp?.toDate() || new Date()
        })) as BozumRequest[];
    } catch (error) {
        console.error("Error fetching bozum requests:", error);
        return [];
    }
}

export async function addBozumRequestToFirestore(request: Omit<BozumRequest, "id">): Promise<string> {
    try {
        const docRef = await addDoc(collection(db, BOZUM_COLLECTION), {
            ...request,
            timestamp: new Date()
        });
        return docRef.id;
    } catch (error) {
        console.error("Error adding bozum request:", error);
        throw error;
    }
}

export async function updateBozumRequestInFirestore(id: string, updates: Partial<BozumRequest>): Promise<void> {
    try {
        const docRef = doc(db, BOZUM_COLLECTION, id);
        await updateDoc(docRef, updates);
    } catch (error) {
        console.error("Error updating bozum request:", error);
        throw error;
    }
}
