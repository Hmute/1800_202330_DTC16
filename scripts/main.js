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
        Gym_name: "Yard Athletics",
        Rating: "10.0",
        Monday:  "6:00am - 8:00pm",
        Tuesday:  "6:00am - 8:00pm",
        Wednesday:  "6:00am - 8:00pm",
        Thursday:  "6:00am - 8:00pm",
        Friday:  "6:00am - 8:00pm",
        Saturday:  "8:00am - 12:00pm",
        Sunday:  "8:00am - 12:00pm",
        Information: `RAW, UNCUT, BACK TO BASICS “The Yard” is an elite training facility where professional athletes, business executives and your modern day Waylon Jennings' “Ramblin' Man” alike are all welcome.`,
        gymLocation: "https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d2602.6433023140503!2d-123.11323975000002!3d49.2831558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x54867164b21ad109%3A0x619329d54b61705!2s307%20W%20Pender%20St%2C%20Vancouver%2C%20BC%20V6B%201T3!3m2!1d49.2823789!2d-123.1110496!5e0!3m2!1sen!2sca!4v1701432146391!5m2!1sen!2sca",
        gymImage: 'https://lh3.googleusercontent.com/p/AF1QipNiDDOtZ_DjvOwI00TOIk0A9hsdkLkFZcWkuDvB=s1588-w1000-h1588-rw',
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });
    GymsRef.add({
        Gym_name: "Elite Performance Fitness",
        Rating: "9.0",
        Monday:  "6:00am - 9:00pm",
        Tuesday:  "6:00am - 9:00pm",
        Wednesday:  "6:00am - 9:00pm",
        Thursday:  "6:00am - 9:00pm",
        Friday:  "6:00am - 8:00pm",
        Saturday:  "8:00am - 3:00pm",
        Sunday:  "9:00am - 12:00pm",
        Information: `Elite performance offers results based fitness services in small group exercise, personal training and semi-private training.`,
        gymLocation: "https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d83279.00067639243!2d-123.19672556631659!3d49.286462504827185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x548671828dbf1c61%3A0xf9c774c81bcb29dd!2s325%20Howe%20St%20B102%26202%2C%20Vancouver%2C%20BC%20V6C%203N2!3m2!1d49.2864918!2d-123.1143252!5e0!3m2!1sen!2sca!4v1701432863970!5m2!1sen!2sca",
        gymImage: `https://lh3.googleusercontent.com/p/AF1QipN3bv4wcVQ79PILGYytgWZjRonS41l7eRJrCBKh=s1588-w1174-h1588-rw`,
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });

    GymsRef.add({
        Gym_name: "YWCA Health + Fitness Centre",
        Rating: "8.5",
        Monday:  "5:45am - 9:30pm",
        Tuesday:  "5:45am - 9:30pm",
        Wednesday:  "5:45am - 9:30pm",
        Thursday:  "5:45am - 9:30pm",
        Friday:  "5:45am - 9:30pm",
        Saturday:  "8:00am - 5:30pm",
        Sunday:  "8:00am - 5:30pm",
        Information: "Our flagship location on Hornby Street is a 30,000 square-foot co-ed fitness facility and pool that offer a friendly and supportive environment in the heart of downtown Vancouver.",
        gymLocation: "https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d83280.64933049283!2d-123.20020796637594!3d49.28548640467668!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x548671821132e633%3A0x638c41e05975e6e2!2s535%20Hornby%20St%2C%20Vancouver%2C%20BC%20V6C%202E8!3m2!1d49.2855157!2d-123.11780759999999!5e0!3m2!1sen!2sca!4v1701433254758!5m2!1sen!2sca",
        gymImage: "https://lh3.googleusercontent.com/p/AF1QipOLPZVwRVJkdS933KTeOqAXDx28YbF4dYqtXd-B=s2234-w2234-h1588-rw",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });

}




