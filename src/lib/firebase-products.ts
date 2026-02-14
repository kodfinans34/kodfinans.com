
import { db } from "@/lib/firebase";
import { collection, getDocs, doc, getDoc, query, where, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { Product } from "@/lib/types";

// Cache for products to reduce read operations
let productsCache: Product[] | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function getProducts(): Promise<Product[]> {
    const now = Date.now();

    if (productsCache && (now - lastFetchTime < CACHE_DURATION)) {
        return productsCache;
    }

    try {
        // Create a promise that rejects after 5 seconds
        const timeoutPromise = new Promise<never>((_, reject) => {
            setTimeout(() => reject(new Error("Firebase fetch timeout")), 2000);
        });

        // Race the fetch against the timeout
        const querySnapshot = await Promise.race([
            getDocs(collection(db, "products")),
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
        return [];
    }
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
    // First try to find in cache
    if (productsCache) {
        return productsCache.find(p => p.slug === slug);
    }

    // If not in cache, query Firestore directly for efficiency
    try {
        const q = query(collection(db, "products"), where("slug", "==", slug));
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
        const docRef = doc(db, "products", idStr);
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
        const docRef = await addDoc(collection(db, "products"), product);

        // Invalidate cache
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
        const docRef = doc(db, "products", idStr);
        await updateDoc(docRef, updates);

        // Invalidate cache
        productsCache = null;
    } catch (error) {
        console.error("Error updating product:", error);
        throw error;
    }
}

export async function deleteProductFromFirestore(id: string | number): Promise<void> {
    const idStr = id.toString();
    try {
        const docRef = doc(db, "products", idStr);
        await deleteDoc(docRef);

        // Invalidate cache
        productsCache = null;
    } catch (error) {
        console.error("Error deleting product:", error);
        throw error;
    }
}
