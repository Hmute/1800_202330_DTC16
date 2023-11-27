$(function () {
    $("#sideBar").load("sideNavBar.html");
});


// this function toggles the sidebar
function eventSideBar() {
    const sidebar = document.getElementById("sideBar");
    if (sidebar.style.display == "none") {
        sidebar.style.display = "block";
        // transition for sidebar
        // sidebar.style.transition = "width 2s";
    } else {
        sidebar.style.display = "none";
    }

}

function goToProfile() {
    window.location.href = "profile.html";
}



let profPic = document.getElementById("profile");
profPic.addEventListener("click", eventSideBar);

// this function updates the user info in the sidebar

function updateSidebarUserInfo() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            // Go to the Firestore document of the user
            currentUser = db.collection("users").doc(user.uid);

            currentUser.get().then(userDoc => {
                var userData = userDoc.data();
                
                // Update the user name in the sidebar
                var userNameElement = document.getElementById("name-goes-here");
                if (userNameElement && userData.name) {
                    userNameElement.innerText = userData.name;
                }

                // Update the profile picture in the sidebar
                var userProfilePicElement = document.querySelector("#sidebarProfilePicture img");
                if (userProfilePicElement && userData.profilePic) {
                    userProfilePicElement.src = userData.profilePic;
                }
            })
        } else {
            console.log("No user is logged in.");
        }
    });
}

updateSidebarUserInfo();

// this function updates the profile icon in the top bar

function updateTopBarProfileIcon() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            // Go to the Firestore document of the user
            var currentUser = db.collection("users").doc(user.uid);

            currentUser.get().then(userDoc => {
                var userData = userDoc.data();
                var profileIconElement = document.getElementById("profile");

                if (userData.profilePic && profileIconElement) {
                    profileIconElement.style.backgroundImage = `url('${userData.profilePic}')`;
                    profileIconElement.style.backgroundSize = 'cover';
                    profileIconElement.style.backgroundPosition = 'center';
                    profileIconElement.style.borderRadius = '50%'; // Make it circular
                    profileIconElement.style.width = '48px'; // Adjust size as needed
                    profileIconElement.style.height = '48px'; // Adjust size as needed
                    profileIconElement.classList.remove('fa', 'fa-user-circle'); // Remove FontAwesome classes
                }
            });
        } else {
            console.log("No user is logged in.");
        }
    });
}

// Call this function on script load
updateTopBarProfileIcon();