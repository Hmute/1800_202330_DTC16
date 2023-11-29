function displayCardDynamically(collection) {
    let cardTemplate = document.getElementById("indexCardTemplate");

    db.collection(collection).get().then(gyms => {
        let cardCount = 0; // Counter variable to track the number of cards processed

        gyms.forEach(doc => {
            if (cardCount < 2) { // Only process the first two documents
                var gymName = doc.data().Gym_name;
                var details = doc.data().Information;
                var rating = doc.data().Rating;
                // var imageSrc = doc.data().image;

                console.log(gymName);
                console.log(details);
                console.log(rating);

                let newCard = cardTemplate.content.cloneNode(true);

                newCard.querySelector("#indexCardTitle").innerHTML = gymName;
                newCard.querySelector("#indexCardDescription").innerHTML = details;
                newCard.querySelector("#indexCardTime").innerHTML = rating;

                document.getElementById("indexCardHolder").appendChild(newCard);

                cardCount++;
            }
        });
    });
}

// document.addEventListener("DOMContentLoaded", function() {
//     displayCardDynamically("Gyms");
//     });

displayCardDynamically("Gyms");

//title "North Shore Football"
//sport"soccer"
//cost"$5.00"
//address
//"2187-2127 Kirkstone Rd"

function displayCardDynamically2(collection) {
    let cardTemplate = document.getElementById("indexCardTemplateGym");

    db.collection(collection).get().then(events => {
        let cardCount = 0; // Counter variable to track the number of cards processed

        events.forEach(doc => {
            if (cardCount < 2) { // Only process the first two documents
                var eventTitle = doc.data().title;
                var sport = doc.data().sport;
                var address = doc.data().address;
                var imageSrc = doc.data().image;

                let newCard = cardTemplate.content.cloneNode(true);

                newCard.querySelector("#indexCardTitle").innerHTML = eventTitle;
                newCard.querySelector("#indexCardDescription").innerHTML = sport;
                newCard.querySelector("#indexCardTime").innerHTML = address;
                newCard.querySelector("#indexCardImg").src = imageSrc;

                document.getElementById("indexCardHolder").appendChild(newCard);

                cardCount++;
            }
        });
    });
}

displayCardDynamically2("Events");

// function displayCardDynamically2(collection) {
//     let cardTemplate = document.getElementById("indexCardTemplateEvents");

//     db.collection(collection).get().then(events => {
//         let cardCount = 0; // Counter variable to track the number of cards processed

//         events.forEach(doc => {
//             if (cardCount < 2) { // Only process the first two documents
//                 var eventTitle = doc.data().title || "Default Title";
//                 var sport = doc.data().sport || "Default Sport";
//                 var address = doc.data().address || "Default Address";
//                 var imageSrc = doc.data().image || "./images/default-image.png";

//                 let newCard = cardTemplate.content.cloneNode(true);

//                 newCard.querySelector("#indexCardTitle").innerHTML = eventTitle;
//                 newCard.querySelector("#indexCardDescription").innerHTML = sport;
//                 newCard.querySelector("#indexCardTime").innerHTML = address;
//                 newCard.querySelector("#indexCardImg").src = imageSrc;

//                 document.getElementById("indexCardHolder").appendChild(newCard);

//                 cardCount++;
//             } else {
//                 // Handle the case where more than two documents are available (optional)
//             }
//         });

//         if (cardCount === 0) {
//             // Handle the case where no documents are available (optional)
//         }
//     });
// }

// displayCardDynamically2("Events");