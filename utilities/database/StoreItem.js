// Imports
import { db } from "../firebaseConfig.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";

// Stores Item In Firestore
export async function storeItem(userId, itemText, completed) {
    try {
        const userListCollection = collection(db, `todo-list-${userId}`);
        const timestamp = new Date().getTime();
        await addDoc(userListCollection, {
            userId: userId,
            itemText: itemText,
            completed: completed,
            timestamp: timestamp,
        });
    } catch (error) {
        console.error("Error Storing Data:", error);
        throw new Error("Failed to Store Item");
    }
}

// Generates A Unique ID
export function generateUniqueId() {
    const timestamp = new Date().getTime();
    const randomNum = Math.floor(Math.random() * 10000);
    const uniqueId = `${timestamp}_${randomNum}`;
    return uniqueId;
}
