import { db } from "./firebase";
import {
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
    query,
    orderBy
} from "firebase/firestore";

export interface KnightOnlineItem {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    server: string; // e.g. "Zero"
    status: "active" | "sold";
    timestamp: any;
}

const COLLECTION_NAME = "knight_online_items";

export const getKOItems = async (): Promise<KnightOnlineItem[]> => {
    try {
        const q = query(collection(db, COLLECTION_NAME), orderBy("timestamp", "desc"));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as KnightOnlineItem[];
    } catch (error) {
        console.error("Error fetching KO items:", error);
        return [];
    }
};

export const addKOItem = async (item: Omit<KnightOnlineItem, "id">): Promise<string> => {
    try {
        const docRef = await addDoc(collection(db, COLLECTION_NAME), {
            ...item,
            timestamp: new Date()
        });
        return docRef.id;
    } catch (error) {
        console.error("Error adding KO item:", error);
        throw error;
    }
};

export const updateKOItem = async (id: string, updates: Partial<KnightOnlineItem>) => {
    try {
        const docRef = doc(db, COLLECTION_NAME, id);
        await updateDoc(docRef, updates);
    } catch (error) {
        console.error("Error updating KO item:", error);
        throw error;
    }
};

export const deleteKOItem = async (id: string) => {
    try {
        const docRef = doc(db, COLLECTION_NAME, id);
        await deleteDoc(docRef);
    } catch (error) {
        console.error("Error deleting KO item:", error);
        throw error;
    }
};
