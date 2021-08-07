import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBExuU1gLzx0tbW6_1nWfskJs7TMTiRpvw",
    authDomain: "todo-app-react-6cfcb.firebaseapp.com",
    projectId: "todo-app-react-6cfcb",
    storageBucket: "todo-app-react-6cfcb.appspot.com",
    messagingSenderId: "223952212498",
    appId: "1:223952212498:web:8c8c7f613981da4be17ecb"
  };
  
  // Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export default db;




  