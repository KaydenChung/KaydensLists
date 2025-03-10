// Imports
import { db } from "../firebaseConfig.js";
import { collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";

// Fetches Items From Firestore
export async function fetchItems(userId) {
    try {
        const userListCollection = collection(db, `todo-list-${userId}`);
        const querySnapshot = await getDocs(query(userListCollection, orderBy('timestamp', 'asc')));
        const listItems = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        return listItems;
    } catch (error) {
        console.error("Error Fetching Data:", error);
        throw new Error("Failed to Fetch List Items");
    }
}
