
import { db } from "@/lib/firebase";
import { collection, getDocs, doc, updateDoc, addDoc, query, orderBy } from "firebase/firestore";
import { WithdrawalRequest } from "@/lib/types";

export async function getWithdrawalsFromFirestore(): Promise<WithdrawalRequest[]> {
    try {
        const q = query(collection(db, "withdrawals"), orderBy("timestamp", "desc"));
        const querySnapshot = await getDocs(q);
        const withdrawals: WithdrawalRequest[] = [];

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            withdrawals.push({
                id: doc.id,
                ...data,
                timestamp: data.timestamp.toDate() // Convert Firestore Timestamp to Date
            } as WithdrawalRequest);
        });

        return withdrawals;
    } catch (error) {
        console.error("Error fetching withdrawals:", error);
        return [];
    }
}

export async function addWithdrawalToFirestore(request: Omit<WithdrawalRequest, "id">): Promise<string> {
    try {
        const docRef = await addDoc(collection(db, "withdrawals"), request);
        return docRef.id;
    } catch (error) {
        console.error("Error adding withdrawal:", error);
        throw error;
    }
}

export async function updateWithdrawalinFirestore(id: string, status: "approved" | "rejected"): Promise<void> {
    try {
        const docRef = doc(db, "withdrawals", id);
        await updateDoc(docRef, { status });
    } catch (error) {
        console.error("Error updating withdrawal:", error);
        throw error;
    }
}
