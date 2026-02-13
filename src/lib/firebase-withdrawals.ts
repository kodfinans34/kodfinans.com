
import { db } from "@/lib/firebase";
import { collection, getDocs, doc, updateDoc, addDoc, query, orderBy } from "firebase/firestore";
import { WithdrawalRequest } from "@/lib/types";

export async function getWithdrawalsFromFirestore(): Promise<WithdrawalRequest[]> {
    try {
        const timeoutPromise = new Promise<never>((_, reject) => {
            setTimeout(() => reject(new Error("Withdrawals fetch timeout")), 5000);
        });

        const q = query(collection(db, "withdrawals"), orderBy("timestamp", "desc"));
        const querySnapshot = await Promise.race([
            getDocs(q),
            timeoutPromise
        ]);

        const withdrawals: WithdrawalRequest[] = [];

        (querySnapshot as any).forEach((doc: any) => {
            const data = doc.data();
            withdrawals.push({
                id: doc.id,
                ...data,
                timestamp: data.timestamp?.toDate ? data.timestamp.toDate() : (data.timestamp || new Date())
            } as WithdrawalRequest);
        });

        return withdrawals;
    } catch (error) {
        console.error("Error fetching withdrawals from Firestore:", error);
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
