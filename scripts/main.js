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
        Gym_name: "Fortunes Gym",
        Rating: "9.0",
        Schedule: "Monday:  7:00am - 10:00pm\nTuesday:  7:00am - 10:00pm\nWednesday:  7:00am - 10:00pm\nThursday:  7:00am - 10:00pm\nFriday:  7:00am - 9:00pm\nSaturday:  8:00am - 8:00pm\nSunday:  Off",
        Information: "The best gym in Burnaby, visit us to get the body you've always dreamt of!",
        dropin_info: "Adults: $8.99/hour\nStudents: $5.99/hour",
        gym_price_info: "Adults: $99.99 for 6 months\nStudents: $69.99 for 6 months",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });
    GymsRef.add({
        Gym_name: "Bikini Bottom Gym",
        Rating: "9.0",
        Schedule: "Monday:  7:00am - 10:00pm\nTuesday:  7:00am - 10:00pm\nWednesday:  7:00am - 10:00pm\nThursday:  7:00am - 10:00pm\nFriday:  7:00am - 9:00pm\nSaturday:  OffSunday:  Off",
        Information: "Come workout with Larry the lobster.",
        dropin_info: "Adults: $6.99/hour\nStudents: $3.99/hour",
        gym_price_info: "Adults: $79.99 for 6 months\nStudents: $49.99 for 6 months",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });

    GymsRef.add({
        Gym_name: "DT BCIT Gym",
        Rating: "6.0",
        Schedule: "TBA",
        Information: "The gym is still under construction, but visit us soon!",
        dropin_info: "BCIT ID required to access the gym",
        gym_price_info: "Free for students.",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });

}




