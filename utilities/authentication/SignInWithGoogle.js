// Imports
import { signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import { auth } from "../firebaseConfig.js";

// Handles Google Sign In
export async function signInUserWithGoogle () {
    const provider = new GoogleAuthProvider();
    try {
        await signInWithPopup(auth, provider);
        return "Success";
    } catch (error) {
        console.error(error);
        return "Error";
    }
};

// Handles Google Sign Out
export function signOutUser() {
    auth.signOut().then(() => {
        console.log("User Signed Out");
    }).catch((error) => {
        console.error("Error Signing Out User:", error);
    });
}
