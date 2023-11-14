function createClubs() {
    //define a variable for the collection you want to create in Firestore to populate data
    var ClubsRef = db.collection("Clubs");

    ClubsRef.add({
        Club_name: "Fuego",
        Admin: "Andy Hogson",
        Members: "Andy Hogson, David Smith, John Doe",
        Club_ID: "1",
        Club_Sport: "Football",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });
    ClubsRef.add({
        Club_name: "Gorditos FC",
        Admin: "Admin Villegas",
        Members: "Admin Villegas, Sebastian Krieg, Aliester Crowley",
        Club_ID: "2",
        Club_Sport: "Football",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });

    ClubsRef.add({
        Club_name: "Caguameros FC",
        Admin: "Francisco Castellanos",
        Members: "Francisco Castellanos, Selena Quintanilla, Mark Ji",
        Club_ID: "3",
        Club_Sport: "Football",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });

    ClubsRef.add({
        Club_name: "Chiguires Energumenos",
        Admin: "Heraldo Abreu",
        Members: "Heraldo Abreu, Alex Gutierrez, Clayton Davenport",
        Club_ID: "4",
        Club_Sport: "Football",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });

}

function createGym() {
    //define a variable for the collection you want to create in Firestore to populate data
    var GymsRef = db.collection("Gyms");

    GymsRef.add({
        Gym_name: "Gymnasium",
        Rating: "9.0",
        Schedule: "Mon-Sat",
        Information: "The best gym in Burnaby, visit us to get the body you've always dreamt of!",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });
    GymsRef.add({
        Gym_name: "Bikini Bottom Gym",
        Rating: "9.0",
        Schedule: "Mon-Sun",
        Information: "Come workout with Larry the lobster.",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });

    GymsRef.add({
        Gym_name: "DT BCIT gym",
        Rating: "6.0",
        Schedule: "Mon-Fri",
        Information: "The gym is still under construction, but visit us soon!",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });

}


function displayCardsDynamically(collection) {
    let cardTemplate = document.getElementById("gymCardTemplate");

    db.collection(collection).get()
        .then(allGyms => {
            //var i = 1;  //Optional: if you want to have a unique ID for each hike
            allGyms.forEach(doc => { //iterate thru each doc
                var title = doc.data().Gym_name;       // get value of the "name" key
                var rating = doc.data().Rating;
                var details = doc.data().Information;  
                let newcard = cardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.

                //update title and text and image
                newcard.querySelector('.box-title').innerHTML = title;
                newcard.querySelector('.starnumber').innerHTML = rating;
                newcard.querySelector('.boxinfo').innerHTML = details;

                //Optional: give unique ids to all elements for future use
                // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
                // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
                // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

                //attach to gallery, Example: "hikes-go-here"

                //i++;   //Optional: iterate variable to serve as unique ID
            })
        })
}

displayCardsDynamically("Gyms");  //input param is the name of the collection




