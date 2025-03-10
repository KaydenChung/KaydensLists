// Imports
import { db } from "../firebaseConfig.js";
import { deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";

// Deletes Item From Firestore
export async function deleteItem(userId, collectionPath, documentId) {
  try {
    const collection = collectionPath.includes('-list-') 
      ? collectionPath 
      : `todo-list-${userId}`;
    const itemDocRef = doc(db, collection, documentId);
    await deleteDoc(itemDocRef);
  } catch (error) {
    console.error("Error Removing Data: ", error);
  }
}
