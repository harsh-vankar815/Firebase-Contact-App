// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyALkOuP7Xirqt3gw5f38N0OZFh3_XbpeJ8",
    authDomain: "vite-contact-b28a2.firebaseapp.com",
    projectId: "vite-contact-b28a2",
    storageBucket: "vite-contact-b28a2.firebasestorage.app",
    messagingSenderId: "751902468281",
    appId: "1:751902468281:web:b3b26ac08d0a90b3ef5368"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);