import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCIj1xa2rNVEbEVpRprKgGXk0Ad8_kvnI8",
  authDomain: "linkedin-clone-5947f.firebaseapp.com",
  projectId: "linkedin-clone-5947f",
  storageBucket: "linkedin-clone-5947f.appspot.com",
  messagingSenderId: "1031562567195",
  appId: "1:1031562567195:web:1c6900706ae899ffd4a2be",
  measurementId: "G-65ZN3F998B",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
