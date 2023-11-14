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

            newCard.setAttribute("data-document-id", docData.id)
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
            var information = docData.data().Information;
            let newCard;

            if (counter === 0) {
                newCard = document.querySelector(".gymcard");
            } else {
                newCard = document.querySelector(".gymcard").cloneNode(true);
            }
            newCard.setAttribute("data-document-id", docData.id);
            newCard.querySelector(".box-title").innerHTML = title;
            newCard.querySelector(".starnumber").innerHTML = rating;
            newCard.querySelector(".boxinfo").innerHTML = information;

            document.body.appendChild(newCard);
            counter++;
        });
    });
}

createEventCard("Events")


createGymCard("Gyms")

document.addEventListener("click", function (event) {
    const heartIcon = event.target.closest(".fa-heart");

    if (heartIcon.classList.contains("far")) {
        // The heart is currently empty, so fill it
        heartIcon.classList.remove("far");
        heartIcon.classList.add("fas");
    
        const eventCard = heartIcon.closest(".eventcard[data-document-id]");
        if(eventCard){
            const user = firebase.auth().currentUser;

            var documentId = eventCard.getAttribute("data-document-id")
            db.collection("users").get().then(userDocs =>{
                userDocs.forEach(userDocsData =>{
                    if(userDocsData.data().name == user.displayName){
                        db.collection("Events").doc(documentId).get().then(docData =>{
                            var userFavorites = db.collection("users").doc(userDocsData.id).collection("Favorites")

                            userFavorites.add({
                                sport: docData.data().sport,
                                date: docData.data().date,
                                information: docData.data().information,
                                title: docData.data().title,
                                last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
                            })
                        })
                    }
                })
            })

        }

    }else{
        heartIcon.classList.remove("fas");
        heartIcon.classList.add("far");
        
        
    }
});

// function stayFilled(){

// }




