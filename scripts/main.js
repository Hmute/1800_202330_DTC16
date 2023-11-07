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
        Information: "best gym in Burnaby, come here to get the best body possible",
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
        Information: "The gym is still under construction, but visit us soon",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });

} 