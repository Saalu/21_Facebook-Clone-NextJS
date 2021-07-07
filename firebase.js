// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAUGiw0AlWI7VW_T70lzkA1DGoAtuLfiBQ",
  authDomain: "facebookk-clone.firebaseapp.com",
  projectId: "facebookk-clone",
  storageBucket: "facebookk-clone.appspot.com",
  messagingSenderId: "425573195576",
  appId: "1:425573195576:web:85773529e0c988e662abcd",
  measurementId: "G-J6WRJZ32J1",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const storage = firebase.storage();

export { db, storage };
