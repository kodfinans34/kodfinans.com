
import { db } from "@/lib/firebase";
import { collection, getDocs, doc, getDoc, query, where, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { Product } from "@/lib/types";

// Cache for products to reduce read operations
let productsCache: Product[] | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 0; // Disabled cache

const PRODUCTS_COLLECTION = "products_v2"; // Changed collection name to force fresh start

export async function getProducts(): Promise<Product[]> {
    const now = Date.now();

    if (productsCache && (now - lastFetchTime < CACHE_DURATION)) {
        return productsCache;
    }

    try {
        // Create a promise that rejects after 10 seconds
        const timeoutPromise = new Promise<never>((_, reject) => {
            setTimeout(() => reject(new Error("Firebase fetch timeout")), 10000);
        });

        // Race the fetch against the timeout
        const querySnapshot = await Promise.race([
            getDocs(collection(db, PRODUCTS_COLLECTION)),
            timeoutPromise
        ]);

        const products: Product[] = [];
        (querySnapshot as any).forEach((doc: any) => {
            products.push({ ...doc.data(), id: doc.id } as Product);
        });

        productsCache = products;
        lastFetchTime = Date.now();
        return products;
    } catch (error) {
        console.error("Error fetching products:", error);
        // Log environment status for debugging
        if (typeof window === "undefined") {
            console.error("Server-side fetch error details:", {
                apiKeyExists: !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
                isNode: true
            });
        }
        return [];
    }
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
    if (productsCache) {
        return productsCache.find(p => p.slug === slug);
    }

    try {
        const q = query(collection(db, PRODUCTS_COLLECTION), where("slug", "==", slug));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            return querySnapshot.docs[0].data() as Product;
        }
    } catch (error) {
        console.error("Error fetching product by slug:", error);
    }

    return undefined;
}

export async function getProductById(id: string | number): Promise<Product | undefined> {
    const idStr = id.toString();

    try {
        const docRef = doc(db, PRODUCTS_COLLECTION, idStr);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data() as Product;
        }
    } catch (error) {
        console.error("Error fetching product by id:", error);
    }

    return undefined;
}

// Write Operations

export async function addProductToFirestore(product: Omit<Product, "id">): Promise<string> {
    try {
        const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), product);
        productsCache = null;
        return docRef.id;
    } catch (error) {
        console.error("Error adding product:", error);
        throw error;
    }
}

export async function updateProductInFirestore(id: string | number, updates: Partial<Product>): Promise<void> {
    const idStr = id.toString();
    try {
        const docRef = doc(db, PRODUCTS_COLLECTION, idStr);
        await updateDoc(docRef, updates);
        productsCache = null;
    } catch (error) {
        console.error("Error updating product:", error);
        throw error;
    }
}

export async function deleteProductFromFirestore(id: string | number): Promise<void> {
    const idStr = id.toString();
    try {
        const docRef = doc(db, PRODUCTS_COLLECTION, idStr);
        await deleteDoc(docRef);
        productsCache = null;
    } catch (error) {
        console.error("Error deleting product:", error);
        throw error;
    }
}
