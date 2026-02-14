
import { db } from "./firebase";
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc, query, orderBy } from "firebase/firestore";
import { Order } from "./types";

const ORDERS_COLLECTION = "orders";

export async function getOrdersFromFirestore(): Promise<Order[]> {
    try {
        const q = query(collection(db, ORDERS_COLLECTION), orderBy("timestamp", "desc"));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            timestamp: doc.data().timestamp?.toDate() || new Date()
        })) as Order[];
    } catch (error) {
        console.error("Error fetching orders:", error);
        return [];
    }
}

export async function addOrderToFirestore(order: Omit<Order, "id">): Promise<string> {
    try {
        const docRef = await addDoc(collection(db, ORDERS_COLLECTION), {
            ...order,
            timestamp: new Date()
        });
        return docRef.id;
    } catch (error) {
        console.error("Error adding order:", error);
        throw error;
    }
}

export async function updateOrderInFirestore(id: string, updates: Partial<Order>): Promise<void> {
    try {
        const docRef = doc(db, ORDERS_COLLECTION, id);
        await updateDoc(docRef, updates);
    } catch (error) {
        console.error("Error updating order:", error);
        throw error;
    }
}

export async function deleteOrderFromFirestore(id: string): Promise<void> {
    try {
        const docRef = doc(db, ORDERS_COLLECTION, id);
        await deleteDoc(docRef);
    } catch (error) {
        console.error("Error deleting order:", error);
        throw error;
    }
}
