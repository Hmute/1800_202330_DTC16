$(function () {
    $(".swipeCardsDiv").load("swipeCards.html");
}); 

// function insertNameFromFirestore() {
//     // Check if the user is logged in:
//     firebase.auth().onAuthStateChanged(user => {
//         if (user) {

//             console.log(user.uid); // Let's know who the logged-in user is by logging their UID

//             currentUser = db.collection("users").doc(user.uid); // Go to the Firestore document of the user

//             currentUser.get().then(userDoc => {
//                 // Get the user name
//                 var userName = userDoc.data().name;
//                 console.log(userName);
//                 //$("#name-goes-here").text(userName); // jQuery
//                 document.getElementById("name").innerText = userName;
//             })
//         } else {
//             console.log("No user is logged in."); // Log a message when no user is logged in
//         }
//     })
// }

// insertNameFromFirestore();

// db.collection("Gyms").get().then((snapshot) => {
//     console.log(snapshot.docs);
//     snapshot.docs.forEach(doc => {
//         // console.log(doc.data());
//     })
// })

function displayCardDynamically(collection) {
    let cardTemplate = document.getElementById("swipingCardsTemplate")[0];
    
    db.collection(collection).get().then(gyms => {
        gyms.forEach(doc => {
            var gymName = doc.data().Gym_name;
            var details = doc.data().Information;
            var rating = doc.data().Rating;

            console.log(gymName);
            console.log(details);
            console.log(rating);
            
            let newCard = cardTemplate.content.cloneNode(true); // Clone the template its like the shadow clone jutsu like Naruto 


        
            newCard.querySelector("#swiping-cards-title").innerHTML = gymName;
            newCard.querySelector("#Information").innerHTML = details;
            newCard.querySelector("#Rating").innerHTML = rating;

            document.getElementById("swipingCardsContainer").appendChild(newCard);


            
        })
    })
}

// document.addEventListener("DOMContentLoaded", function() {
//     displayCardDynamically("Gyms");
//     });

displayCardDynamically("Gyms");