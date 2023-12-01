function createEventCard(collectionId) {
    let counter = 0;

    db.collection(collectionId).get().then(documents => {
        documents.forEach(docData => {
            if (counter < 3) { // Only process the first 3 documents
                var title = docData.data().title;
                var date = docData.data().date;
                var imageSrc = docData.data().image;
                var attendees = docData.data().attendees;
                var limit = docData.data().limit;
                var time = docData.data().time;
                var address = docData.data().address;
                var postalCode = docData.data().postalCode;
                var cost = docData.data().cost;
                var full_address = address + ", " + postalCode;
                var encodedAddress = encodeURIComponent(full_address);
                var googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
                let newCard;

                if (counter === 0) {
                    newCard = document.querySelector(".eventcard");
                } else {
                    newCard = document.querySelector(".eventcard").cloneNode(true);
                }

                newCard.querySelector(".title").innerHTML = title;
                newCard.querySelector(".attendees").innerHTML = attendees;
                newCard.querySelector(".limit").innerHTML = limit;
                newCard.querySelector(".cost").innerHTML = cost;
                newCard.querySelector(".location").innerHTML = address + ", " + postalCode;
                newCard.setAttribute("data-document-id", docData.id);
                newCard.querySelector(".date").innerHTML = date;
                newCard.querySelector(".time").innerHTML = time;
                newCard.querySelector(".far").id = "test-" + docData.id;
                newCard.querySelector(".location").setAttribute("href", googleMapsUrl);
                newCard.querySelector(".location").setAttribute("target", "_blank");

                var imgElement = newCard.querySelector("img.logo"); // Assuming 'img.logo' is the correct selector for your image
                if (imgElement && imageSrc) {
                    imgElement.src = imageSrc;
                }

                const user = firebase.auth().currentUser;
                db.collection("users").doc(user.uid).get().then(userDoc => {
                    favoritesArray = userDoc.data().favorites;
                    if (favoritesArray.includes(docData.id)) {
                        newCard.querySelector('i').classList.remove("far")
                        newCard.querySelector('i').classList.add("fas")
                    }
                });

                document.body.appendChild(newCard);
                counter++;
            }
        });
    });
}
createEventCard("Events")
