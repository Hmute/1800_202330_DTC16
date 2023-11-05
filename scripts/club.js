// Function to open the create club modal
function openCreateClubModal() {
    $('#createClubModal').modal('show');
}

// Function to save a new club to Firebase
function saveNewClub() {
    var clubName = $('#clubName').val();
    var clubDescription = $('#clubDescription').val();

    // Assuming you have initialized Firebase and have a reference to the Firestore database
    var clubsRef = firebase.firestore().collection('clubs');

    clubsRef.add({
        name: clubName,
        description: clubDescription
    })
        .then(function (docRef) {
            console.log("Club added with ID: ", docRef.id);
            $('#createClubModal').modal('hide');
        })
        .catch(function (error) {
            console.error("Error adding club: ", error);
        });
}