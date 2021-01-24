import firebase from "firebase";
import "firebase/auth"
import "firebase/database"


// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCfsrWKKZDOtK_mTiGJ6BtzuTd-UhTQCE4",
  authDomain: "ey-chat-55dad.firebaseapp.com",
  projectId: "ey-chat-55dad",
  storageBucket: "ey-chat-55dad.appspot.com",
  messagingSenderId: "617408199922",
  appId: "1:617408199922:web:7d99db1e1a284b79d1646b"
};
// Initialize Firebase
let firebaseApp = firebase.initializeApp(firebaseConfig);
let firebaseAuth = firebaseApp.auth()
let firebaseDb = firebaseApp.database()

export  { firebaseAuth, firebaseDb }
