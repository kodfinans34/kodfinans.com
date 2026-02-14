
import { db } from "@/lib/firebase";
import { collection, getDocs, doc, getDoc, query, where, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { SystemUser } from "@/lib/types";

const USERS_COLLECTION = "users";

export async function getUsersFromFirestore(): Promise<SystemUser[]> {
    try {
        const querySnapshot = await getDocs(collection(db, USERS_COLLECTION));
        const users: SystemUser[] = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            users.push({
                ...data,
                id: doc.id,
                createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(data.createdAt || Date.now())
            } as SystemUser);
        });
        return users;
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
}

export async function addUserToFirestore(user: Omit<SystemUser, "id">): Promise<string> {
    try {
        const docRef = await addDoc(collection(db, USERS_COLLECTION), user);
        return docRef.id;
    } catch (error) {
        console.error("Error adding user:", error);
        throw error;
    }
}

export async function updateUserInFirestore(id: string, updates: Partial<SystemUser>): Promise<void> {
    try {
        const docRef = doc(db, USERS_COLLECTION, id);
        await updateDoc(docRef, updates);
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
}

export async function deleteUserFromFirestore(id: string): Promise<void> {
    try {
        const docRef = doc(db, USERS_COLLECTION, id);
        await deleteDoc(docRef);
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
}
