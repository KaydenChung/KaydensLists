// Imports
import { db } from "../firebaseConfig.js";
import { collection, getDocs, query, orderBy, addDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";

// Constants For List Types
export const LIST_TYPES = {
  TODO: 'todo',
  GROCERY: 'grocery',
  WISHLIST: 'wishlist'
};

// Fetches All Items In A Specific List
export async function fetchItems(userId, listType) {
  try {
    const listCollection = collection(db, `${listType}-list-${userId}`);
    const querySnapshot = await getDocs(query(listCollection, orderBy('position', 'asc')));
    const items = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return items;
  } catch (error) {
    console.error(`Error Fetching ${listType} Data:`, error);
    throw new Error(`Failed to Fetch ${listType} Items`);
  }
}

// Stores A New Item In A Specific List
export async function storeItem(userId, listType, itemText, completed = false) {
  try {
    const listCollection = collection(db, `${listType}-list-${userId}`);
    const items = await fetchItems(userId, listType);
    const highestPosition = items.length > 0 
      ? Math.max(...items.map(item => item.position || 0)) 
      : -1;
    
    const timestamp = new Date().getTime();
    await addDoc(listCollection, {
      userId: userId,
      itemText: itemText,
      completed: completed,
      timestamp: timestamp,
      position: highestPosition + 1,
    });
  } catch (error) {
    console.error(`Error Storing ${listType} Data:`, error);
    throw new Error(`Failed to Store ${listType} Item`);
  }
}

// Reorders All Items After Drag And Drop
export async function reorderItems(userId, listType, items) {
  try {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const itemDocRef = doc(db, `${listType}-list-${userId}`, item.id);
      await updateDoc(itemDocRef, { position: i });
    }
  } catch (error) {
    console.error("Error Reordering Items:", error);
    throw new Error("Failed to Reorder Items");
  }
}
