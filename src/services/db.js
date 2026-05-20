import { db } from "./firebase";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import toast from "react-hot-toast";

let cachedProducts = null;

// --- PRODUCTS API ---

export const clearDatabase = async () => {
  try {
    const productsRef = collection(db, "products");
    const snapshot = await getDocs(productsRef);
    const deletePromises = snapshot.docs.map((docSnapshot) =>
      deleteDoc(doc(db, "products", docSnapshot.id)),
    );
    await Promise.all(deletePromises);
    cachedProducts = null; // Clear cache
    console.log("Database cleared");
  } catch (error) {
    console.error("Error clearing DB:", error);
  }
};

export const seedProducts = async () => {
  try {
    const apiKey = import.meta.env.VITE_RAPIDAPI_KEY;
    if (!apiKey || apiKey === "undefined") {
      toast.error("Missing VITE_RAPIDAPI_KEY in .env file!");
      return;
    }

    toast.loading("Fetching sneaker data from RapidAPI...", {
      id: "seedToast",
    });

    // Generic endpoint for searching Nike shoes on this API
    const response = await fetch(
      "https://real-time-sneaker-prices.p.rapidapi.com/brand/nike?limit=20",
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "real-time-sneaker-prices.p.rapidapi.com",
          "x-rapidapi-key": apiKey,
        },
      },
    );

    if (!response.ok) {
      throw new Error(
        `API returned ${response.status}: ${response.statusText}`,
      );
    }

    const apiData = await response.json();

    // Safely extract the array (API structures vary, usually it's the root or inside a 'data'/'results' key)
    const items = Array.isArray(apiData)
      ? apiData
      : apiData.data || apiData.results || [];

    if (items.length === 0) {
      toast.error("No sneakers found in API response.", { id: "seedToast" });
      return;
    }

    await clearDatabase(); // Wipe old data first
    toast.loading("Saving sneakers to Firebase...", { id: "seedToast" });

    const productsRef = collection(db, "products");

    for (const item of items) {
      // Map the RapidAPI schema to our database schema
      // Using sensible fallbacks in case the API schema differs slightly
      const product = {
        id: String(
          item.id ||
            item._id ||
            item.sku ||
            `nike-${Math.random().toString(36).substr(2, 9)}`,
        ),
        title: item.title || item.name || item.shoeName || "Unknown Sneaker",
        brand: item.brand || "NIKE",
        price: Number(item.price || item.retailPrice || 150),
        description:
          item.description ||
          item.story ||
          "Real-time sneaker data imported from RapidAPI.",
        image:
          item.image ||
          item.thumbnail ||
          item.imageUrl ||
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=70&w=600&auto=format&fit=crop",
        category: item.category || "Lifestyle",
        colors: item.colors
          ? item.colors
          : item.colorway
            ? [item.colorway]
            : ["#ffffff", "#000000"],
      };

      await setDoc(doc(productsRef, product.id), product);
    }

    toast.success("Sneaker Database seeded from API successfully!", {
      id: "seedToast",
    });
  } catch (error) {
    console.error("Error seeding DB from API:", error);
    toast.error("Failed to seed database from API.", { id: "seedToast" });
  }
};

export const getProducts = async () => {
  if (cachedProducts) return cachedProducts;

  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push(doc.data());
    });
    cachedProducts = products; // Cache it
    return products;
  } catch (error) {
    console.error("Error getting products:", error);
    return [];
  }
};

export const getProductsPage = async (pageSize = 8, lastDoc = null) => {
  try {
    const productsRef = collection(db, "products");
    const productsQuery = lastDoc
      ? query(
          productsRef,
          orderBy("title"),
          startAfter(lastDoc),
          limit(pageSize),
        )
      : query(productsRef, orderBy("title"), limit(pageSize));

    const querySnapshot = await getDocs(productsQuery);
    const products = querySnapshot.docs.map((docSnapshot) =>
      docSnapshot.data(),
    );
    const newLastDoc =
      querySnapshot.docs[querySnapshot.docs.length - 1] || null;

    return {
      products,
      lastDoc: newLastDoc,
      hasMore: querySnapshot.size === pageSize,
    };
  } catch (error) {
    console.error("Error getting products page:", error);
    return { products: [], lastDoc: null, hasMore: false };
  }
};

export const getProductById = async (id) => {
  // Check cache first
  if (cachedProducts) {
    const found = cachedProducts.find((p) => p.id === id);
    if (found) return found;
  }

  try {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting product:", error);
    return null;
  }
};

// --- USER DATA API ---

// Create a user document if it doesn't exist, and return their data
export const getUserData = async (uid) => {
  try {
    const userRef = doc(db, "users", uid);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      // Create fresh document for new user
      const freshData = { cartItems: [], wishlistItems: [] };
      await setDoc(userRef, freshData);
      return freshData;
    }
  } catch (error) {
    console.error("Error getting user data:", error);
    return { cartItems: [], wishlistItems: [] };
  }
};

export const updateUserCart = async (uid, cartItems) => {
  try {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, { cartItems });
  } catch (error) {
    console.error("Error updating cart:", error);
  }
};

export const updateUserWishlist = async (uid, wishlistItems) => {
  try {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, { wishlistItems });
  } catch (error) {
    console.error("Error updating wishlist:", error);
  }
};
