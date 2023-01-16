// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBoD2678NCcSSzxyIGx3W4vwXyFg066s60",
  authDomain: "chatapp-cecc9.firebaseapp.com",
  projectId: "chatapp-cecc9",
  storageBucket: "chatapp-cecc9.appspot.com",
  messagingSenderId: "781833033",
  appId: "1:781833033:web:1bafcd790610df776d4098",
  measurementId: "G-J1ZTJNDT4E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default firebaseConfig;