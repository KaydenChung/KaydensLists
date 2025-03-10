// Imports
import { db } from "../firebaseConfig.js";
import { doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";

// Toggles Item in Firestore
export async function toggleItem(userId, collectionPath, documentId, completed) {
  try {
    const collection = collectionPath.includes('-list-') 
      ? collectionPath 
      : `todo-list-${userId}`;
      
    const itemDocRef = doc(db, collection, documentId);
    await updateDoc(itemDocRef, { completed: completed });
  } catch (error) {
    console.error("Error Toggling:", error);
    throw new Error("Failed to Toggle Item");
  }
}
