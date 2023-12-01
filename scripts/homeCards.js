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

                // console.log(gymName);
                // console.log(details);
                // console.log(rating);

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
    let cardTemplate = document.getElementById("indexCardTemplate");

    db.collection(collection).get().then(events => {
        let cardCount = 0; // Counter variable to track the number of cards processed

        events.forEach(doc => {
            if (cardCount < 2) { // Only process the first two documents
                var eventTitle = doc.data().title;
                var sport = doc.data().sport;
                var address = doc.data().address;
                var docID = doc.data().id;
                var imageSrc = doc.data().image;

                console.log((imageSrc))
                let newCard = cardTemplate.content.cloneNode(true);
                var img = document.getElementById("indexImg");

                newCard.querySelector("#indexCardTitle").innerHTML = eventTitle;
                newCard.querySelector("#indexCardDescription").innerHTML = sport;
                newCard.querySelector("#indexCardTime").innerHTML = address;
                document.getElementById("indexCardHolder").appendChild(newCard);

                cardCount++;
            }
        });
    });
}

displayCardDynamically2("Events");

