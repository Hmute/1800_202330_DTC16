var current;

function editClubInfo() {
    document.getElementById("club").disabled = false;
}

async function saveClubInfo() {
    console.log('Attempting to save club information...');

    // Get the values from the form
    var clubName = document.getElementById("clubInput").value;
    var leagueName = document.getElementById("leagueInput").value;
    var players = document.getElementById("playersInput").value;

    // Validate input fields
    if (!clubName || !leagueName || !players) {
        console.error('Please fill in all required fields and select an image.');
        return;
    }

    try {
        // Create a storage reference for the image
        // var storageRef = firebase.storage().ref('club_images/' + image.name);

        // Upload the image to Firebase Storage
        // await storageRef.put(image);

        // Get the download URL of the uploaded image
        // const downloadURL = await storageRef.getDownloadURL();

        // Add a new document to the "clubs" collection with the image URL
        await db.collection("clubs").add({
            clubName: clubName,
            leagueName: leagueName,
            players: players,
        });

        console.log('Club information saved successfully.');
        document.getElementById('club').disabled = true;
        // Redirect to the clubs.html page after successfully adding the club
        window.location.href = 'clubs.html';
    } catch (error) {
        console.error("Error saving club information: ", error);
    }
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

