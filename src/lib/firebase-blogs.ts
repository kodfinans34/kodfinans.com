
import { db } from "@/lib/firebase";
import { collection, getDocs, doc, addDoc, updateDoc, deleteDoc, query, orderBy } from "firebase/firestore";
import { BlogPost } from "@/lib/types";

export async function getBlogs(): Promise<BlogPost[]> {
    try {
        const timeoutPromise = new Promise<never>((_, reject) => {
            setTimeout(() => reject(new Error("Blogs fetch timeout")), 5000);
        });

        const q = query(collection(db, "blogs"), orderBy("date", "desc"));
        const querySnapshot = await Promise.race([
            getDocs(q),
            timeoutPromise
        ]);

        const blogs: BlogPost[] = [];
        (querySnapshot as any).forEach((doc: any) => {
            blogs.push({ ...doc.data(), id: doc.id } as BlogPost);
        });
        return blogs;
    } catch (error) {
        console.error("Error fetching blogs from Firestore:", error);
        return [];
    }
}

export async function addBlogToFirestore(blog: Omit<BlogPost, "id">): Promise<string> {
    try {
        const docRef = await addDoc(collection(db, "blogs"), blog);
        return docRef.id;
    } catch (error) {
        console.error("Error adding blog:", error);
        throw error;
    }
}

export async function updateBlogInFirestore(id: string, updates: Partial<BlogPost>): Promise<void> {
    try {
        const docRef = doc(db, "blogs", id);
        await updateDoc(docRef, updates);
    } catch (error) {
        console.error("Error updating blog:", error);
        throw error;
    }
}

export async function deleteBlogFromFirestore(id: string): Promise<void> {
    try {
        const docRef = doc(db, "blogs", id);
        await deleteDoc(docRef);
    } catch (error) {
        console.error("Error deleting blog:", error);
        throw error;
    }
}
