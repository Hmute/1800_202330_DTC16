var current;

function editClubInfo() {
    document.getElementById("club").disabled = false;
}

function saveClubInfo() {
    // Get the values from the form
    var clubName = document.getElementById("clubInput").value;
    var leagueName = document.getElementById("leagueInput").value;
    var players = document.getElementById("playersInput").value;

    // Add a new document to the "clubs" collection
    db.collection("clubs").add({
        clubName: clubName,
        leagueName: leagueName,
        players: players,
    })
        .then(function (docRef) {
            console.log("New club added with ID: ", docRef.id);
            // Redirect to the clubs.html page after successfully adding the club
            window.location.href = 'clubs.html';
        })
        .catch(function (error) {
            console.error("Error adding new club: ", error);
        });

    document.getElementById('club').disabled = true;

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

