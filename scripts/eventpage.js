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

// //--------------------------------------------
// // initialize the Firebase app
// // initialize Firestore database if using it
// //--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();



eventsButton = document.getElementsByClassName("eventsbtn")[0]
eventsButton.addEventListener("click", clickeventsbtn)

gymButton = document.getElementsByClassName("gymbtn")[0]
gymButton.addEventListener("click", clickgymbtn)




function clickgymbtn() {
    event.preventDefault()
    gymCard = document.querySelectorAll(".gymcard")
    gymCard.forEach(function (card) {
        card.style.display = "block"
        card.classList.remove("d-none")

    });

    eventCard = document.querySelectorAll(".eventcard")
    eventCard.forEach(function (card) {
        card.style.display = "none"

    });

}

function clickeventsbtn() {
    event.preventDefault()
    eventCard = document.querySelectorAll(".eventcard")
    eventCard.forEach(function (card) {
        card.style.display = "block"
    });

    gymCard = document.querySelectorAll(".gymcard")
    gymCard.forEach(function (card) {
        card.style.display = "none"

    });
}

function writeEvents() {
    var eventsRef = db.collection("Events")

    eventsRef.add({
        sport: "Basketball",
        date: "11/11/11",
        information: "There will be a community basketball where every people could just play with one another",
        title: "God's Basketball",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    })

    eventsRef.add({
        sport: "Soccer",
        date: "12/12/12",
        information: "There will be a community soccer where every people could just play with one another",
        title: "God's Soccer",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    })

    eventsRef.add({
        sport: "Volleyball",
        date: "1/1/1",
        information: "There will be a community volleyball where every people could just play with one another",
        title: "God's Volleyball",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    })
}

function createEventCard(collectionId) {
    let counter = 0;

    db.collection(collectionId).get().then(documents => {
        documents.forEach(docData => {
            var sport = docData.data().sport;
            var date = docData.data().date;
            var information = docData.data().information;

            let newCard;

            if (counter === 0) {
                newCard = document.querySelector(".eventcard");
            } else {
                newCard = document.querySelector(".eventcard").cloneNode(true);
            }

            newCard.querySelector(".box-title").innerHTML = sport;
            newCard.querySelector(".date").innerHTML = date;
            newCard.querySelector(".boxinfo").innerHTML = information;

            document.body.appendChild(newCard);
            counter++;  
        });
    });
}


function createGymCard(collectionId) {
    let counter = 0;

    db.collection(collectionId).get().then(documents => {
        documents.forEach(docData => {
            var title = docData.data().Gym_name;
            var rating = docData.data().Rating;
            var information = docData.data().Information
            var docID = docData.id;

            let newCard;

            if (counter === 0) {
                newCard = document.querySelector(".gymcard");
            } else {
                newCard = document.querySelector(".gymcard").cloneNode(true);
            }

            newCard.querySelector(".box-title").innerHTML = title;
            newCard.querySelector(".starnumber").innerHTML = rating;
            newCard.querySelector(".boxinfo").innerHTML = information;
            newCard.querySelector('a').href = "gympage.html?docID="+docID
            document.body.appendChild(newCard);
            counter++;  
        });
    });
}

createEventCard("Events")


createGymCard("Gyms")

document.addEventListener("click", function (event) {
    const heartIcon = event.target.closest(".fa-heart");

    if (heartIcon) {

        if (heartIcon.classList.contains("far")) {
            // The heart is currently empty, so fill it
            heartIcon.classList.remove("far");
            heartIcon.classList.add("fas");

        } else {
            // The heart is currently filled, so empty it
            heartIcon.classList.remove("fas");
            heartIcon.classList.add("far");

        }
    }
});




