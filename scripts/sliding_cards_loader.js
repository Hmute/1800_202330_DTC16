// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAwEwov9jM25EpVg7-4jDfCXbfaznqnKl8",
    authDomain: "simplyactive.firebaseapp.com",
    projectId: "simplyactive",
    storageBucket: "simplyactive.appspot.com",
    messagingSenderId: "82493903519",
    appId: "1:82493903519:web:e3409147f56bf9017608aa"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// I added this Richard 
const db = firebase.firestore();




$(function () {
    $(".slidingCardsDiv").load("slidingCards.html");
});

// Path: scripts/sliding_cards.js

function makeCards(collectionId) {
    let cardTemplate = document.querySelector("#individual_card");
    let cardContainer = document.querySelector(".card-container");

    db.collection(collectionId).get().then(documentData => {
        documentData.forEach(docData => {
            var city = docData.data().city;
            var date = docData.data().date;
            var information = docData.data().information;
            var parking = docData.data().parking;
            var sports = docData.data().sports;

            let newCard = cardTemplate.cloneNode(true);

            newCard.querySelector("#Title").innerHTML = sports;
            newCard.querySelector("#Information").innerHTML = information;
            newCard.querySelector("#Parking").innerHTML = parking;
            newCard.querySelector("#Sport").innerHTML = sports;
            newCard.querySelector("#Date").innerHTML = date;

            cardContainer.appendChild(newCard);

            // Debugging: Log the retrieved data
            console.log("Title:", sports);
            console.log("Information:", information);
            console.log("Parking:", parking);
            console.log("Sport:", sports);
            console.log("Date:", date);
        });
    });
}

makeCards("Events");