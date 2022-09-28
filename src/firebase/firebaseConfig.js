// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyATToGboN3dW7y9p1etPe9tBQ4e1dAZi3A",
    authDomain: "boighor-75f9c.firebaseapp.com",
    projectId: "boighor-75f9c",
    storageBucket: "boighor-75f9c.appspot.com",
    messagingSenderId: "597153887996",
    appId: "1:597153887996:web:c2db4da022b2f876fe8979"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;