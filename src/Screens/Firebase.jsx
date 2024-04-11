// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_I8LicLdxv-jTAsRMyEXFz0kVCautWSM",
  authDomain: "authentic-1eeba.firebaseapp.com",
  projectId: "authentic-1eeba",
  storageBucket: "authentic-1eeba.appspot.com",
  messagingSenderId: "703688635873",
  appId: "1:703688635873:web:4ddb44a55933d45d658ea0"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default app;

// const analytics = getAnalytics(app);