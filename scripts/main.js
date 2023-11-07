function createClubs() {
    //define a variable for the collection you want to create in Firestore to populate data
    var hikesRef = db.collection("Clubs");

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

//-----------------------------------------------
// Create a "max" number of hike document objects
//-----------------------------------------------
function writeClubsLoop(max) {
    //define a variable for the collection you want to create in Firestore to populate data
    var hikesRef = db.collection("Clubs");
    for (i = 1; i <= max; i++) {
        hikesRef.add({ //add to database, autogen ID
            name: "Clubs" + i,
            details: "One of the Many Clubs" + i,
            last_updated: firebase.firestore.FieldValue.serverTimestamp()
        })
    }
}