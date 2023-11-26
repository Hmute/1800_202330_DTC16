//initialize current user variable
var currentUser;
var ImageFile;      //global variable to store the File Object reference

function chooseFileListener() {
    const fileInput = document.getElementById("editPicture");   // pointer #1
    const image = document.getElementById("profilePicture");   // pointer #2

    //attach listener to input file
    //when this file changes, do something
    fileInput.addEventListener('change', function (e) {

        //the change event returns a file "e.target.files[0]"
        ImageFile = e.target.files[0];
        var blob = URL.createObjectURL(ImageFile);

        //change the DOM img element source to point to this file
        image.src = blob;    //assign the "src" property of the "img" tag
    })
}

document.addEventListener('DOMContentLoaded', function () {
    chooseFileListener();
});

function populateUserInfo() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            // Go to the correct user document by referencing the user uid
            currentUser = db.collection("users").doc(user.uid)
            // Get the document for the current user.
            currentUser.get()
                .then(userDoc => {
                    var userData = userDoc.data();

                    // Get the data fields of the user
                    var userName = userData.name;
                    var userSchool = userData.school;
                    var userCity = userData.city;
                    var userSport = userData.sport;
                    var userProfilePic = userData.profilePic; // Get the profile picture URL

                    // If the data fields are not empty, then write them into the form.
                    if (userName) {
                        document.getElementById("nameInput").value = userName;
                    }
                    if (userSchool) {
                        document.getElementById("schoolInput").value = userSchool;
                    }
                    if (userCity) {
                        document.getElementById("cityInput").value = userCity;
                    }
                    if (userSport) {
                        document.getElementById("sportInput").value = userSport;
                    }
                    if (userProfilePic) {
                        document.getElementById("profilePicture").src = userProfilePic; // Set the profile picture
                    }
                })
        } else {
            console.log("No user is signed in");
        }
    });
}

populateUserInfo();

function editUserInfo() {
    //allow editing
    document.getElementById('personalInfoFields').disabled = false;
}


function saveUserInfo() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // Get the file from the file input
            var imageFile = document.getElementById('editPicture').files[0];

            var userName = document.getElementById('nameInput').value;
            var userSchool = document.getElementById('schoolInput').value;
            var userCity = document.getElementById('cityInput').value;
            var userSport = document.getElementById('sportInput').value;

            // Validate input fields
            if (!userName || !userSchool || !userCity || !userSport) {
                console.error('Please fill in all required fields.');
                return;
            }

            // Reference to the storage location
            var storageRef = firebase.storage().ref("profile_images/" + user.uid + ".jpg");

            // Upload the file to Firebase Storage
            var uploadTask = imageFile ? storageRef.put(imageFile) : Promise.resolve();

            uploadTask.then(function () {
                if (imageFile) {
                    console.log('Uploaded to Cloud Storage.');
                    return storageRef.getDownloadURL();
                }
                return currentUser.get().then(doc => doc.data().profilePic);
            })
                .then(function (url) {
                    // Update Firestore document
                    currentUser.update({
                        name: userName,
                        school: userSchool,
                        city: userCity,
                        sport: userSport,
                        profilePic: url // Update the profile picture URL
                    })
                        .then(function () {
                            console.log("User information successfully updated!");
                            document.getElementById('profilePicture').src = url; // Update profile image on the page
                            document.getElementById('personalInfoFields').disabled = true;
                            window.location.href = "index.html";
                        })
                        .catch(function (error) {
                            console.error("Error updating user information: ", error);
                        });
                })
                .catch(function (error) {
                    console.error("Error uploading image or getting URL: ", error);
                });
        } else {
            console.log("No user is currently signed in.");
        }
    });
}


document.getElementById("homeBtn").addEventListener("click", () => window.location.href = "index.html")






