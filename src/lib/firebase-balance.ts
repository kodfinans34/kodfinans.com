
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { BalanceRequest } from "@/lib/types";

const COLLECTION = "balanceRequests";

export async function getBalanceRequestsFromFirestore(): Promise<BalanceRequest[]> {
    try {
        const q = query(collection(db, COLLECTION), orderBy("timestamp", "desc"));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(d => {
            const data = d.data();
            return {
                ...data,
                id: d.id,
                timestamp: data.timestamp?.toDate ? data.timestamp.toDate() : new Date(data.timestamp),
            } as BalanceRequest;
        });
    } catch (error) {
        console.error("Error fetching balance requests:", error);
        return [];
    }
}

export async function addBalanceRequestToFirestore(request: Omit<BalanceRequest, "id">): Promise<string> {
    try {
        const docRef = await addDoc(collection(db, COLLECTION), {
            ...request,
            timestamp: new Date(),
        });
        return docRef.id;
    } catch (error) {
        console.error("Error adding balance request:", error);
        throw error;
    }
}

export async function updateBalanceRequestInFirestore(id: string, updates: Partial<BalanceRequest>): Promise<void> {
    try {
        await updateDoc(doc(db, COLLECTION, id), updates);
    } catch (error) {
        console.error("Error updating balance request:", error);
        throw error;
    }
}

export async function deleteBalanceRequestFromFirestore(id: string): Promise<void> {
    try {
        await deleteDoc(doc(db, COLLECTION, id));
    } catch (error) {
        console.error("Error deleting balance request:", error);
        throw error;
    }
}
