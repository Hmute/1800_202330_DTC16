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
                // var img = document.getElementById("indexImg");

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

// function createEventCard(collectionId) {
//     let counter = 0;

//     db.collection(collectionId).get().then(documents => {
//         documents.forEach(docData => {
//             var title = docData.data().title;
//             var date = docData.data().date;
//             var imageSrc = docData.data().image
//             var attendees = docData.data().attendees
//             var limit = docData.data().limit
//             var time = docData.data().time
//             var address = docData.data().address
//             var postalCode = docData.data().postalCode
//             var cost = docData.data().cost
//             var full_address = address + ", " + postalCode;
//             var encodedAddress = encodeURIComponent(full_address);
//             var googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
//             let newCard;

//             if (counter === 0) {
//                 newCard = document.querySelector(".eventcard");
//             } else {
//                 newCard = document.querySelector(".eventcard").cloneNode(true);
//             }

//             newCard.querySelector("#indexCardTitle").innerHTML = title;
//             // newCard.querySelector(".attendees").innerHTML = attendees;
//             // newCard.querySelector(".limit").innerHTML = limit;
//             // newCard.querySelector(".cost").innerHTML = cost;
//             newCard.querySelector(".location").innerHTML = address + ", " + postalCode;
//             // newCard.setAttribute("data-document-id", docData.id)
//             // newCard.querySelector(".date").innerHTML = date;
//             // newCard.querySelector(".time").innerHTML = time;
//             // newCard.querySelector(".far").id = "test-" + docData.id;
//             // newCard.querySelector(".location").setAttribute("href", googleMapsUrl);
//             // newCard.querySelector(".location").setAttribute("target", "_blank");

//             var imgElement = newCard.querySelector("indexImg"); // Assuming 'img.logo' is the correct selector for your image
//             if (imgElement && imageSrc) {
//                 imgElement.src = imageSrc;
//             }

//             const user = firebase.auth().currentUser;
//             db.collection("users").doc(user.uid).get().then(userDoc => {
//                 favoritesArray = userDoc.data().favorites;
//                 if (favoritesArray.includes(docData.id)) {
//                     newCard.querySelector('i').classList.remove("far")
//                     newCard.querySelector('i').classList.add("fas")
//                 }
//             })
//             document.body.appendChild(newCard)
//             counter++;


//         });
//     });
// }
// createEventCard("Events")

// function createEventCard(collectionId) {
//     let counter = 0;

//     db.collection(collectionId).get().then(documents => {
//         documents.forEach(docData => {
//             var title = docData.data().title;
//             var date = docData.data().date;
//             var imageSrc = docData.data().image
//             var attendees = docData.data().attendees
//             var limit = docData.data().limit
//             var time = docData.data().time
//             var address = docData.data().address
//             var postalCode = docData.data().postalCode
//             var cost = docData.data().cost
//             var full_address = address + ", " + postalCode;
//             var encodedAddress = encodeURIComponent(full_address);
//             var googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
//             let newCard;

//             if (counter === 0) {
//                 newCard = document.querySelector(".eventcard");
//             } else {
//                 newCard = document.querySelector(".eventcard").cloneNode(true);
//             }

//             newCard.querySelector("#indexCardTitle").innerHTML = title;
//             // newCard.querySelector(".attendees").innerHTML = attendees;
//             // newCard.querySelector(".limit").innerHTML = limit;
//             // newCard.querySelector(".cost").innerHTML = cost;
//             newCard.querySelector(".location").innerHTML = address + ", " + postalCode;
//             // newCard.setAttribute("data-document-id", docData.id)
//             // newCard.querySelector(".date").innerHTML = date;
//             // newCard.querySelector(".time").innerHTML = time;
//             // newCard.querySelector(".far").id = "test-" + docData.id;
//             // newCard.querySelector(".location").setAttribute("href", googleMapsUrl);
//             // newCard.querySelector(".location").setAttribute("target", "_blank");

//             var imgElement = newCard.querySelector("indexImg"); // Assuming 'img.logo' is the correct selector for your image
//             if (imgElement && imageSrc) {
//                 imgElement.src = imageSrc;
//             }

//             const user = firebase.auth().currentUser;
//             db.collection("users").doc(user.uid).get().then(userDoc => {
//                 favoritesArray = userDoc.data().favorites;
//                 if (favoritesArray.includes(docData.id)) {
//                     newCard.querySelector('i').classList.remove("far")
//                     newCard.querySelector('i').classList.add("fas")
//                 }
//             })
//             document.body.appendChild(newCard)
//             counter++;


//         });
//     });
// }
// createEventCard("Events")

// function createEventCard(collectionId) {
//     let counter = 0;

//     db.collection(collectionId).get().then(documents => {
//         documents.forEach(docData => {
//             var title = docData.data().title;
//             var date = docData.data().date;
//             var imageSrc = docData.data().image
//             var attendees = docData.data().attendees
//             var limit = docData.data().limit
//             var time = docData.data().time
//             var address = docData.data().address
//             var postalCode = docData.data().postalCode
//             var cost = docData.data().cost
//             var full_address = address + ", " + postalCode;
//             var encodedAddress = encodeURIComponent(full_address);
//             var googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
//             let newCard;

//             if (counter === 0) {
//                 newCard = document.querySelector(".eventcard");
//             } else {
//                 newCard = document.querySelector(".eventcard").cloneNode(true);
//             }

//             newCard.querySelector("#indexCardTitle").innerHTML = title;
//             // newCard.querySelector(".attendees").innerHTML = attendees;
//             // newCard.querySelector(".limit").innerHTML = limit;
//             // newCard.querySelector(".cost").innerHTML = cost;
//             newCard.querySelector(".location").innerHTML = address + ", " + postalCode;
//             // newCard.setAttribute("data-document-id", docData.id)
//             // newCard.querySelector(".date").innerHTML = date;
//             // newCard.querySelector(".time").innerHTML = time;
//             // newCard.querySelector(".far").id = "test-" + docData.id;
//             // newCard.querySelector(".location").setAttribute("href", googleMapsUrl);
//             // newCard.querySelector(".location").setAttribute("target", "_blank");

//             var imgElement = newCard.querySelector("indexImg"); // Assuming 'img.logo' is the correct selector for your image
//             if (imgElement && imageSrc) {
//                 imgElement.src = imageSrc;
//             }

//             const user = firebase.auth().currentUser;
//             db.collection("users").doc(user.uid).get().then(userDoc => {
//                 favoritesArray = userDoc.data().favorites;
//                 if (favoritesArray.includes(docData.id)) {
//                     newCard.querySelector('i').classList.remove("far")
//                     newCard.querySelector('i').classList.add("fas")
//                 }
//             })
//             document.body.appendChild(newCard)
//             counter++;


//         });
//     });
// }
// createEventCard("Events")

// function createEventCard(collectionId) {
//     let counter = 0;

//     db.collection(collectionId).get().then(documents => {
//         documents.forEach(docData => {
//             var title = docData.data().title;
//             var date = docData.data().date;
//             var imageSrc = docData.data().image
//             var attendees = docData.data().attendees
//             var limit = docData.data().limit
//             var time = docData.data().time
//             var address = docData.data().address
//             var postalCode = docData.data().postalCode
//             var cost = docData.data().cost
//             var full_address = address + ", " + postalCode;
//             var encodedAddress = encodeURIComponent(full_address);
//             var googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
//             let newCard;

//             if (counter === 0) {
//                 newCard = document.querySelector(".eventcard");
//             } else {
//                 newCard = document.querySelector(".eventcard").cloneNode(true);
//             }

//             newCard.querySelector("#indexCardTitle").innerHTML = title;
//             // newCard.querySelector(".attendees").innerHTML = attendees;
//             // newCard.querySelector(".limit").innerHTML = limit;
//             // newCard.querySelector(".cost").innerHTML = cost;
//             newCard.querySelector(".location").innerHTML = address + ", " + postalCode;
//             // newCard.setAttribute("data-document-id", docData.id)
//             // newCard.querySelector(".date").innerHTML = date;
//             // newCard.querySelector(".time").innerHTML = time;
//             // newCard.querySelector(".far").id = "test-" + docData.id;
//             // newCard.querySelector(".location").setAttribute("href", googleMapsUrl);
//             // newCard.querySelector(".location").setAttribute("target", "_blank");

//             var imgElement = newCard.querySelector("indexImg"); // Assuming 'img.logo' is the correct selector for your image
//             if (imgElement && imageSrc) {
//                 imgElement.src = imageSrc;
//             }

//             const user = firebase.auth().currentUser;
//             db.collection("users").doc(user.uid).get().then(userDoc => {
//                 favoritesArray = userDoc.data().favorites;
//                 if (favoritesArray.includes(docData.id)) {
//                     newCard.querySelector('i').classList.remove("far")
//                     newCard.querySelector('i').classList.add("fas")
//                 }
//             })
//             document.body.appendChild(newCard)
//             counter++;


//         });
//     });
// }
// createEventCard("Events")

// function createEventCard(collectionId) {
//     let counter = 0;

//     db.collection(collectionId).get().then(documents => {
//         documents.forEach(docData => {
//             var title = docData.data().title;
//             var date = docData.data().date;
//             var imageSrc = docData.data().image
//             var attendees = docData.data().attendees
//             var limit = docData.data().limit
//             var time = docData.data().time
//             var address = docData.data().address
//             var postalCode = docData.data().postalCode
//             var cost = docData.data().cost
//             var full_address = address + ", " + postalCode;
//             var encodedAddress = encodeURIComponent(full_address);
//             var googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
//             let newCard;

//             if (counter === 0) {
//                 newCard = document.querySelector(".eventcard");
//             } else {
//                 newCard = document.querySelector(".eventcard").cloneNode(true);
//             }

//             newCard.querySelector("#indexCardTitle").innerHTML = title;
//             // newCard.querySelector(".attendees").innerHTML = attendees;
//             // newCard.querySelector(".limit").innerHTML = limit;
//             // newCard.querySelector(".cost").innerHTML = cost;
//             newCard.querySelector(".location").innerHTML = address + ", " + postalCode;
//             // newCard.setAttribute("data-document-id", docData.id)
//             // newCard.querySelector(".date").innerHTML = date;
//             // newCard.querySelector(".time").innerHTML = time;
//             // newCard.querySelector(".far").id = "test-" + docData.id;
//             // newCard.querySelector(".location").setAttribute("href", googleMapsUrl);
//             // newCard.querySelector(".location").setAttribute("target", "_blank");

//             var imgElement = newCard.querySelector("indexImg"); // Assuming 'img.logo' is the correct selector for your image
//             if (imgElement && imageSrc) {
//                 imgElement.src = imageSrc;
//             }

//             const user = firebase.auth().currentUser;
//             db.collection("users").doc(user.uid).get().then(userDoc => {
//                 favoritesArray = userDoc.data().favorites;
//                 if (favoritesArray.includes(docData.id)) {
//                     newCard.querySelector('i').classList.remove("far")
//                     newCard.querySelector('i').classList.add("fas")
//                 }
//             })
//             document.body.appendChild(newCard)
//             counter++;


//         });
//     });
// }
// createEventCard("Events")

// function createEventCard(collectionId) {
//     let counter = 0;

//     db.collection(collectionId).get().then(documents => {
//         documents.forEach(docData => {
//             var title = docData.data().title;
//             var date = docData.data().date;
//             var imageSrc = docData.data().image
//             var attendees = docData.data().attendees
//             var limit = docData.data().limit
//             var time = docData.data().time
//             var address = docData.data().address
//             var postalCode = docData.data().postalCode
//             var cost = docData.data().cost
//             var full_address = address + ", " + postalCode;
//             var encodedAddress = encodeURIComponent(full_address);
//             var googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
//             let newCard;

//             if (counter === 0) {
//                 newCard = document.querySelector(".eventcard");
//             } else {
//                 newCard = document.querySelector(".eventcard").cloneNode(true);
//             }

//             newCard.querySelector("#indexCardTitle").innerHTML = title;
//             // newCard.querySelector(".attendees").innerHTML = attendees;
//             // newCard.querySelector(".limit").innerHTML = limit;
//             // newCard.querySelector(".cost").innerHTML = cost;
//             newCard.querySelector(".location").innerHTML = address + ", " + postalCode;
//             // newCard.setAttribute("data-document-id", docData.id)
//             // newCard.querySelector(".date").innerHTML = date;
//             // newCard.querySelector(".time").innerHTML = time;
//             // newCard.querySelector(".far").id = "test-" + docData.id;
//             // newCard.querySelector(".location").setAttribute("href", googleMapsUrl);
//             // newCard.querySelector(".location").setAttribute("target", "_blank");

//             var imgElement = newCard.querySelector("indexImg"); // Assuming 'img.logo' is the correct selector for your image
//             if (imgElement && imageSrc) {
//                 imgElement.src = imageSrc;
//             }

//             const user = firebase.auth().currentUser;
//             db.collection("users").doc(user.uid).get().then(userDoc => {
//                 favoritesArray = userDoc.data().favorites;
//                 if (favoritesArray.includes(docData.id)) {
//                     newCard.querySelector('i').classList.remove("far")
//                     newCard.querySelector('i').classList.add("fas")
//                 }
//             })
//             document.body.appendChild(newCard)
//             counter++;


//         });
//     });
// }
// createEventCard("Events")

// function createEventCard(collectionId) {
//     let counter = 0;

//     db.collection(collectionId).get().then(documents => {
//         documents.forEach(docData => {
//             var title = docData.data().title;
//             var date = docData.data().date;
//             var imageSrc = docData.data().image
//             var attendees = docData.data().attendees
//             var limit = docData.data().limit
//             var time = docData.data().time
//             var address = docData.data().address
//             var postalCode = docData.data().postalCode
//             var cost = docData.data().cost
//             var full_address = address + ", " + postalCode;
//             var encodedAddress = encodeURIComponent(full_address);
//             var googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
//             let newCard;

//             if (counter === 0) {
//                 newCard = document.querySelector(".eventcard");
//             } else {
//                 newCard = document.querySelector(".eventcard").cloneNode(true);
//             }

//             newCard.querySelector("#indexCardTitle").innerHTML = title;
//             // newCard.querySelector(".attendees").innerHTML = attendees;
//             // newCard.querySelector(".limit").innerHTML = limit;
//             // newCard.querySelector(".cost").innerHTML = cost;
//             newCard.querySelector(".location").innerHTML = address + ", " + postalCode;
//             // newCard.setAttribute("data-document-id", docData.id)
//             // newCard.querySelector(".date").innerHTML = date;
//             // newCard.querySelector(".time").innerHTML = time;
//             // newCard.querySelector(".far").id = "test-" + docData.id;
//             // newCard.querySelector(".location").setAttribute("href", googleMapsUrl);
//             // newCard.querySelector(".location").setAttribute("target", "_blank");

//             var imgElement = newCard.querySelector("indexImg"); // Assuming 'img.logo' is the correct selector for your image
//             if (imgElement && imageSrc) {
//                 imgElement.src = imageSrc;
//             }

//             const user = firebase.auth().currentUser;
//             db.collection("users").doc(user.uid).get().then(userDoc => {
//                 favoritesArray = userDoc.data().favorites;
//                 if (favoritesArray.includes(docData.id)) {
//                     newCard.querySelector('i').classList.remove("far")
//                     newCard.querySelector('i').classList.add("fas")
//                 }
//             })
//             document.body.appendChild(newCard)
//             counter++;


//         });
//     });
// }
// createEventCard("Events")

// function createEventCard(collectionId) {
//     let counter = 0;

//     db.collection(collectionId).get().then(documents => {
//         documents.forEach(docData => {
//             var title = docData.data().title;
//             var date = docData.data().date;
//             var imageSrc = docData.data().image
//             var attendees = docData.data().attendees
//             var limit = docData.data().limit
//             var time = docData.data().time
//             var address = docData.data().address
//             var postalCode = docData.data().postalCode
//             var cost = docData.data().cost
//             var full_address = address + ", " + postalCode;
//             var encodedAddress = encodeURIComponent(full_address);
//             var googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
//             let newCard;

//             if (counter === 0) {
//                 newCard = document.querySelector(".eventcard");
//             } else {
//                 newCard = document.querySelector(".eventcard").cloneNode(true);
//             }

//             newCard.querySelector("#indexCardTitle").innerHTML = title;
//             // newCard.querySelector(".attendees").innerHTML = attendees;
//             // newCard.querySelector(".limit").innerHTML = limit;
//             // newCard.querySelector(".cost").innerHTML = cost;
//             newCard.querySelector(".location").innerHTML = address + ", " + postalCode;
//             // newCard.setAttribute("data-document-id", docData.id)
//             // newCard.querySelector(".date").innerHTML = date;
//             // newCard.querySelector(".time").innerHTML = time;
//             // newCard.querySelector(".far").id = "test-" + docData.id;
//             // newCard.querySelector(".location").setAttribute("href", googleMapsUrl);
//             // newCard.querySelector(".location").setAttribute("target", "_blank");

//             var imgElement = newCard.querySelector("indexImg"); // Assuming 'img.logo' is the correct selector for your image
//             if (imgElement && imageSrc) {
//                 imgElement.src = imageSrc;
//             }

//             const user = firebase.auth().currentUser;
//             db.collection("users").doc(user.uid).get().then(userDoc => {
//                 favoritesArray = userDoc.data().favorites;
//                 if (favoritesArray.includes(docData.id)) {
//                     newCard.querySelector('i').classList.remove("far")
//                     newCard.querySelector('i').classList.add("fas")
//                 }
//             })
//             document.body.appendChild(newCard)
//             counter++;


//         });
//     });
// }
// createEventCard("Events")

// function createEventCard(collectionId) {
//     let counter = 0;

//     db.collection(collectionId).get().then(documents => {
//         documents.forEach(docData => {
//             var title = docData.data().title;
//             var date = docData.data().date;
//             var imageSrc = docData.data().image
//             var attendees = docData.data().attendees
//             var limit = docData.data().limit
//             var time = docData.data().time
//             var address = docData.data().address
//             var postalCode = docData.data().postalCode
//             var cost = docData.data().cost
//             var full_address = address + ", " + postalCode;
//             var encodedAddress = encodeURIComponent(full_address);
//             var googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
//             let newCard;

//             if (counter === 0) {
//                 newCard = document.querySelector(".eventcard");
//             } else {
//                 newCard = document.querySelector(".eventcard").cloneNode(true);
//             }

//             newCard.querySelector("#indexCardTitle").innerHTML = title;
//             // newCard.querySelector(".attendees").innerHTML = attendees;
//             // newCard.querySelector(".limit").innerHTML = limit;
//             // newCard.querySelector(".cost").innerHTML = cost;
//             newCard.querySelector(".location").innerHTML = address + ", " + postalCode;
//             // newCard.setAttribute("data-document-id", docData.id)
//             // newCard.querySelector(".date").innerHTML = date;
//             // newCard.querySelector(".time").innerHTML = time;
//             // newCard.querySelector(".far").id = "test-" + docData.id;
//             // newCard.querySelector(".location").setAttribute("href", googleMapsUrl);
//             // newCard.querySelector(".location").setAttribute("target", "_blank");

//             var imgElement = newCard.querySelector("indexImg"); // Assuming 'img.logo' is the correct selector for your image
//             if (imgElement && imageSrc) {
//                 imgElement.src = imageSrc;
//             }

//             const user = firebase.auth().currentUser;
//             db.collection("users").doc(user.uid).get().then(userDoc => {
//                 favoritesArray = userDoc.data().favorites;
//                 if (favoritesArray.includes(docData.id)) {
//                     newCard.querySelector('i').classList.remove("far")
//                     newCard.querySelector('i').classList.add("fas")
//                 }
//             })
//             document.body.appendChild(newCard)
//             counter++;


//         });
//     });
// }
// createEventCard("Events")

// function createEventCard(collectionId) {
//     let counter = 0;

//     db.collection(collectionId).get().then(documents => {
//         documents.forEach(docData => {
//             var title = docData.data().title;
//             var date = docData.data().date;
//             var imageSrc = docData.data().image
//             var attendees = docData.data().attendees
//             var limit = docData.data().limit
//             var time = docData.data().time
//             var address = docData.data().address
//             var postalCode = docData.data().postalCode
//             var cost = docData.data().cost
//             var full_address = address + ", " + postalCode;
//             var encodedAddress = encodeURIComponent(full_address);
//             var googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
//             let newCard;

//             if (counter === 0) {
//                 newCard = document.querySelector(".eventcard");
//             } else {
//                 newCard = document.querySelector(".eventcard").cloneNode(true);
//             }

//             newCard.querySelector("#indexCardTitle").innerHTML = title;
//             // newCard.querySelector(".attendees").innerHTML = attendees;
//             // newCard.querySelector(".limit").innerHTML = limit;
//             // newCard.querySelector(".cost").innerHTML = cost;
//             newCard.querySelector(".location").innerHTML = address + ", " + postalCode;
//             // newCard.setAttribute("data-document-id", docData.id)
//             // newCard.querySelector(".date").innerHTML = date;
//             // newCard.querySelector(".time").innerHTML = time;
//             // newCard.querySelector(".far").id = "test-" + docData.id;
//             // newCard.querySelector(".location").setAttribute("href", googleMapsUrl);
//             // newCard.querySelector(".location").setAttribute("target", "_blank");

//             var imgElement = newCard.querySelector("indexImg"); // Assuming 'img.logo' is the correct selector for your image
//             if (imgElement && imageSrc) {
//                 imgElement.src = imageSrc;
//             }

//             const user = firebase.auth().currentUser;
//             db.collection("users").doc(user.uid).get().then(userDoc => {
//                 favoritesArray = userDoc.data().favorites;
//                 if (favoritesArray.includes(docData.id)) {
//                     newCard.querySelector('i').classList.remove("far")
//                     newCard.querySelector('i').classList.add("fas")
//                 }
//             })
//             document.body.appendChild(newCard)
//             counter++;


//         });
//     });
// }
// createEventCard("Events")

// function createEventCard(collectionId) {
//     let counter = 0;

//     db.collection(collectionId).get().then(documents => {
//         documents.forEach(docData => {
//             var title = docData.data().title;
//             var date = docData.data().date;
//             var imageSrc = docData.data().image
//             var attendees = docData.data().attendees
//             var limit = docData.data().limit
//             var time = docData.data().time
//             var address = docData.data().address
//             var postalCode = docData.data().postalCode
//             var cost = docData.data().cost
//             var full_address = address + ", " + postalCode;
//             var encodedAddress = encodeURIComponent(full_address);
//             var googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
//             let newCard;

//             if (counter === 0) {
//                 newCard = document.querySelector(".eventcard");
//             } else {
//                 newCard = document.querySelector(".eventcard").cloneNode(true);
//             }

//             newCard.querySelector("#indexCardTitle").innerHTML = title;
//             // newCard.querySelector(".attendees").innerHTML = attendees;
//             // newCard.querySelector(".limit").innerHTML = limit;
//             // newCard.querySelector(".cost").innerHTML = cost;
//             newCard.querySelector(".location").innerHTML = address + ", " + postalCode;
//             // newCard.setAttribute("data-document-id", docData.id)
//             // newCard.querySelector(".date").innerHTML = date;
//             // newCard.querySelector(".time").innerHTML = time;
//             // newCard.querySelector(".far").id = "test-" + docData.id;
//             // newCard.querySelector(".location").setAttribute("href", googleMapsUrl);
//             // newCard.querySelector(".location").setAttribute("target", "_blank");

//             var imgElement = newCard.querySelector("indexImg"); // Assuming 'img.logo' is the correct selector for your image
//             if (imgElement && imageSrc) {
//                 imgElement.src = imageSrc;
//             }

//             const user = firebase.auth().currentUser;
//             db.collection("users").doc(user.uid).get().then(userDoc => {
//                 favoritesArray = userDoc.data().favorites;
//                 if (favoritesArray.includes(docData.id)) {
//                     newCard.querySelector('i').classList.remove("far")
//                     newCard.querySelector('i').classList.add("fas")
//                 }
//             })
//             document.body.appendChild(newCard)
//             counter++;


//         });
//     });
// }
// createEventCard("Events")

// function createEventCard(collectionId) {
//     let counter = 0;

//     db.collection(collectionId).get().then(documents => {
//         documents.forEach(docData => {
//             var title = docData.data().title;
//             var date = docData.data().date;
//             var imageSrc = docData.data().image
//             var attendees = docData.data().attendees
//             var limit = docData.data().limit
//             var time = docData.data().time
//             var address = docData.data().address
//             var postalCode = docData.data().postalCode
//             var cost = docData.data().cost
//             var full_address = address + ", " + postalCode;
//             var encodedAddress = encodeURIComponent(full_address);
//             var googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
//             let newCard;

//             if (counter === 0) {
//                 newCard = document.querySelector(".eventcard");
//             } else {
//                 newCard = document.querySelector(".eventcard").cloneNode(true);
//             }

//             newCard.querySelector("#indexCardTitle").innerHTML = title;
//             // newCard.querySelector(".attendees").innerHTML = attendees;
//             // newCard.querySelector(".limit").innerHTML = limit;
//             // newCard.querySelector(".cost").innerHTML = cost;
//             newCard.querySelector(".location").innerHTML = address + ", " + postalCode;
//             // newCard.setAttribute("data-document-id", docData.id)
//             // newCard.querySelector(".date").innerHTML = date;
//             // newCard.querySelector(".time").innerHTML = time;
//             // newCard.querySelector(".far").id = "test-" + docData.id;
//             // newCard.querySelector(".location").setAttribute("href", googleMapsUrl);
//             // newCard.querySelector(".location").setAttribute("target", "_blank");

//             var imgElement = newCard.querySelector("indexImg"); // Assuming 'img.logo' is the correct selector for your image
//             if (imgElement && imageSrc) {
//                 imgElement.src = imageSrc;
//             }

//             const user = firebase.auth().currentUser;
//             db.collection("users").doc(user.uid).get().then(userDoc => {
//                 favoritesArray = userDoc.data().favorites;
//                 if (favoritesArray.includes(docData.id)) {
//                     newCard.querySelector('i').classList.remove("far")
//                     newCard.querySelector('i').classList.add("fas")
//                 }
//             })
//             document.body.appendChild(newCard)
//             counter++;


//         });
//     });
// }
// createEventCard("Events")

// function createEventCard(collectionId) {
//     let counter = 0;

//     db.collection(collectionId).get().then(documents => {
//         documents.forEach(docData => {
//             var title = docData.data().title;
//             var date = docData.data().date;
//             var imageSrc = docData.data().image
//             var attendees = docData.data().attendees
//             var limit = docData.data().limit
//             var time = docData.data().time
//             var address = docData.data().address
//             var postalCode = docData.data().postalCode
//             var cost = docData.data().cost
//             var full_address = address + ", " + postalCode;
//             var encodedAddress = encodeURIComponent(full_address);
//             var googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
//             let newCard;

//             if (counter === 0) {
//                 newCard = document.querySelector(".eventcard");
//             } else {
//                 newCard = document.querySelector(".eventcard").cloneNode(true);
//             }

//             newCard.querySelector("#indexCardTitle").innerHTML = title;
//             // newCard.querySelector(".attendees").innerHTML = attendees;
//             // newCard.querySelector(".limit").innerHTML = limit;
//             // newCard.querySelector(".cost").innerHTML = cost;
//             newCard.querySelector(".location").innerHTML = address + ", " + postalCode;
//             // newCard.setAttribute("data-document-id", docData.id)
//             // newCard.querySelector(".date").innerHTML = date;
//             // newCard.querySelector(".time").innerHTML = time;
//             // newCard.querySelector(".far").id = "test-" + docData.id;
//             // newCard.querySelector(".location").setAttribute("href", googleMapsUrl);
//             // newCard.querySelector(".location").setAttribute("target", "_blank");

//             var imgElement = newCard.querySelector("indexImg"); // Assuming 'img.logo' is the correct selector for your image
//             if (imgElement && imageSrc) {
//                 imgElement.src = imageSrc;
//             }

//             const user = firebase.auth().currentUser;
//             db.collection("users").doc(user.uid).get().then(userDoc => {
//                 favoritesArray = userDoc.data().favorites;
//                 if (favoritesArray.includes(docData.id)) {
//                     newCard.querySelector('i').classList.remove("far")
//                     newCard.querySelector('i').classList.add("fas")
//                 }
//             })
//             document.body.appendChild(newCard)
//             counter++;


//         });
//     });
// }
// createEventCard("Events")

// function createEventCard(collectionId) {
//     let counter = 0;

//     db.collection(collectionId).get().then(documents => {
//         documents.forEach(docData => {
//             var title = docData.data().title;
//             var date = docData.data().date;
//             var imageSrc = docData.data().image
//             var attendees = docData.data().attendees
//             var limit = docData.data().limit
//             var time = docData.data().time
//             var address = docData.data().address
//             var postalCode = docData.data().postalCode
//             var cost = docData.data().cost
//             var full_address = address + ", " + postalCode;
//             var encodedAddress = encodeURIComponent(full_address);
//             var googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
//             let newCard;

//             if (counter === 0) {
//                 newCard = document.querySelector(".eventcard");
//             } else {
//                 newCard = document.querySelector(".eventcard").cloneNode(true);
//             }

//             newCard.querySelector("#indexCardTitle").innerHTML = title;
//             // newCard.querySelector(".attendees").innerHTML = attendees;
//             // newCard.querySelector(".limit").innerHTML = limit;
//             // newCard.querySelector(".cost").innerHTML = cost;
//             newCard.querySelector(".location").innerHTML = address + ", " + postalCode;
//             // newCard.setAttribute("data-document-id", docData.id)
//             // newCard.querySelector(".date").innerHTML = date;
//             // newCard.querySelector(".time").innerHTML = time;
//             // newCard.querySelector(".far").id = "test-" + docData.id;
//             // newCard.querySelector(".location").setAttribute("href", googleMapsUrl);
//             // newCard.querySelector(".location").setAttribute("target", "_blank");

//             var imgElement = newCard.querySelector("indexImg"); // Assuming 'img.logo' is the correct selector for your image
//             if (imgElement && imageSrc) {
//                 imgElement.src = imageSrc;
//             }

//             const user = firebase.auth().currentUser;
//             db.collection("users").doc(user.uid).get().then(userDoc => {
//                 favoritesArray = userDoc.data().favorites;
//                 if (favoritesArray.includes(docData.id)) {
//                     newCard.querySelector('i').classList.remove("far")
//                     newCard.querySelector('i').classList.add("fas")
//                 }
//             })
//             document.body.appendChild(newCard)
//             counter++;


//         });
//     });
// }
// createEventCard("Events")
