var current;

function editClubInfo() {
    document.getElementById("club").disabled = false;
}

function saveClubInfo() {

    console.log('Attempting to save club information...');

    // Get the values from the form
    var clubName = document.getElementById("clubInput").value;
    var leagueName = document.getElementById("leagueInput").value;
    var players = document.getElementById("playersInput").value;

    // Get the image file
    var imageInput = document.getElementById("imageInput");
    var image = imageInput.files[0];

    // Validate input fields
    if (!clubName || !leagueName || !players || !image) {
        console.error('Please fill in all required fields and select an image.');
        return;
    }

    // Create a storage reference for the image
    var storageRef = firebase.storage().ref('club_images/' + imageFile.name);

    // Upload the image to Firebase Storage
    var uploadTask = storageRef.put(imageFile);

    // Listen for state changes, errors, and completion of the upload
    uploadTask.on('state_changed',
        function (snapshot) {
            // Handle progress (optional)
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
        },
        function (error) {
            // Handle unsuccessful uploads
            console.error('Error uploading image: ', error);
        },
        function () {
            // Handle successful uploads on complete
            console.log('Image uploaded successfully');

            // Get the download URL of the uploaded image
            storageRef.getDownloadURL().then(function (imageUrl) {
                // Add a new document to the "clubs" collection with the image URL
                db.collection("clubs").add({
                    clubName: clubName,
                    leagueName: leagueName,
                    players: players,
                    imageUrl: imageUrl, // Save the image URL in the database
                })
                    .then(function (docRef) {
                        console.log("New club added with ID: ", docRef.id);
                        // Redirect to the clubs.html page after successfully adding the club
                        window.location.href = 'clubs.html';
                    })
                    .catch(function (error) {
                        console.error("Error adding new club: ", error);
                    });

                console.log('Club information saved successfully.');
                document.getElementById('club').disabled = true;
            });
        }
    );
}

// Call this function when the page loads or whenever you want to refresh the club list
function populateClubs() {
    var clubContainer = document.getElementById("clubContainer");

    // Clear the existing content in the container
    clubContainer.innerHTML = "";

    // Fetch clubs from Firestore
    db.collection("clubs").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // Create a div for each club instance
            var clubDiv = document.createElement("div");
            clubDiv.classList.add("card", "mb-3");

            // Populate the club information
            clubDiv.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${doc.data().clubName}</h5>
                    <p class="card-text">League: ${doc.data().leagueName}</p>
                    <p class="card-text">Players: ${doc.data().players}</p>
                    <!-- Add more information as needed -->

                    <!-- Add buttons or links for each club instance if necessary -->

                </div>
            `;

            // Append the club div to the container
            clubContainer.appendChild(clubDiv);
        });
    });
}

// Call the populateClubs function to initially populate the container
populateClubs();

function sentTo() {
    window.location.href = 'clubinstance.html';
}

