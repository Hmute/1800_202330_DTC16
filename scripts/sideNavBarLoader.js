$(function () {
    $("#sideBar").load("sideNavBar.html");
});



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

document.getElementById("Home").addEventListener("click", () => window.location.href = "index.html")

