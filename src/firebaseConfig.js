import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3aaTsxfQJDJQ11VNCR0pff-gYq-nadcE",
  authDomain: "audio-guesser.firebaseapp.com",
  projectId: "audio-guesser",
  storageBucket: "audio-guesser.appspot.com",
  messagingSenderId: "1066048640441",
  appId: "1:1066048640441:web:69850e475b5453fd351268",
};

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const auth = getAuth(app);
