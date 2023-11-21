//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
    apiKey: "AIzaSyAwEwov9jM25EpVg7-4jDfCXbfaznqnKl8",
    authDomain: "simplyactive.firebaseapp.com",
    projectId: "simplyactive",
    storageBucket: "simplyactive.appspot.com",
    messagingSenderId: "82493903519",
    appId: "1:82493903519:web:e3409147f56bf9017608aa"
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();