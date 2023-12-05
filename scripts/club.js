var ImageFile;



function editClubInfo() {
    document.getElementById("TeamInfoFields").disabled = false;

}
document.addEventListener('DOMContentLoaded', function () {
    chooseFileListener();
});

// This is the code for the club page. It is used to add a club to the database and display all the clubs in the database.
function chooseFileListener() {
    const fileInput = document.getElementById("pic-input");   // pointer #1
    const image = document.getElementById("teampic");         // pointer #2

    if (!fileInput || !image) {
        console.error("Required elements not found in the DOM.");
        return;
    }

    // Attach listener to input file
    fileInput.addEventListener('change', function (e) {
        if (e.target.files.length > 0) {
            // The change event returns a file "e.target.files[0]"
            ImageFile = e.target.files[0];
            var blob = URL.createObjectURL(ImageFile);

            // Change the DOM img element source to point to this file
            image.src = blob;    // Assign the "src" property of the "img" tag
            image.style.width = '200px';  // Set the desired width
            image.style.height = 'auto';  // Set height to auto to maintain aspect ratio
        } else {
            console.log("No file selected.");
        }
    });
}



chooseFileListener();

function saveClubInfo() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var storageRef = firebase.storage().ref("images/" + user.uid + ".jpg");

            // Asynchronous call to put File Object (global variable ImageFile) onto Cloud
            storageRef.put(ImageFile)
                .then(function () {
                    console.log('Uploaded to Cloud Storage.');

                    // Asynchronous call to get URL from Cloud
                    storageRef.getDownloadURL()
                        .then(function (url) { // Get "url" of the uploaded file
                            console.log("Got the download URL.");

                            // Get values from the form
                            var teamName = document.getElementById('TeamName').value;
                            var leagueName = document.getElementById('LeagueName').value;
                            var players = document.getElementById('playersInput').value;

                            // Validate input fields
                            if (!teamName || !leagueName || !players || !ImageFile) {
                                console.error('Please fill in all required fields and select an image.');
                                return;
                            }

                            // Asynchronous call to save the form fields into Fire                                                                                                                              store
                            var teamRef = db.collection("users").doc(user.uid).collection("teams").doc();
                            teamRef.set({
                                teamName: teamName,
                                leagueName: leagueName,
                                players: players,
                                teamPic: url // Save the URL into teams subcollection
                            })
                                .then(function () {
                                    console.log('Added Team info to Firestore.');
                                    console.log('Saved Team info');
                                    document.getElementById('TeamInfoFields').disabled = true;

                                    // Redirect to another page after saving
                                    window.location.href = 'clubs.html';

                                })
                                .catch(function (error) {
                                    console.error("Error saving team info to Firestore: ", error);
                                });
                        })
                        .catch(function (error) {
                            console.error("Error getting download URL: ", error);
                        });
                })
                .catch(function (error) {
                    console.error("Error uploading to Cloud Storage: ", error);
                });
        } else {
            console.log("No user is currently signed in.");
        }

    });
}

function populateClubs() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log("User is signed in:", user.uid); // Log user ID for debugging

            var clubContainer = document.getElementById("clubContainer");
            clubContainer.innerHTML = ""; // Clear existing content

            var teamsRef = db.collection("users").doc(user.uid).collection("teams");
            teamsRef.get().then((querySnapshot) => {
                if (querySnapshot.empty) {
                    console.log("No teams found."); // Log if no teams are found
                }

                querySnapshot.forEach((doc) => {
                    var teamData = doc.data();
                    console.log("Team data:", teamData); // Log each team's data

                    var clubDiv = document.createElement("div");
                    clubDiv.classList.add("d-flex", "justify-content-between", "align-items-center", "club-card");

                    clubDiv.innerHTML = `
                        <div class="club-info">
                            <h5 class="club-title">${teamData.teamName}</h5>
                            <p class="club-text">${teamData.leagueName}</p>
                            <p class="club-text">${teamData.players}</p>
                        </div>
                        ${teamData.teamPic ? `<img src="${teamData.teamPic}" alt="${teamData.teamName}" class="club-image">` : ''}
                    `;
                    clubContainer.appendChild(clubDiv);
                });
            }).catch(function (error) {
                console.error("Error fetching teams:", error);
            });
        } else {
            console.log("No user is currently signed in.");
            clubContainer.innerHTML = "<p>User not signed in or no teams to display.</p>";
        }
    });
}

populateClubs();

function sentTo() {

    window.location.href = 'clubinstance.html';
}


