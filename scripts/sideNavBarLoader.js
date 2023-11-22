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

function insertNameFromFirestore() {
    // Check if the user is logged in:
    firebase.auth().onAuthStateChanged(user => {
        if (user) {

            console.log(user.uid); // Let's know who the logged-in user is by logging their UID

            currentUser = db.collection("users").doc(user.uid); // Go to the Firestore document of the user

            currentUser.get().then(userDoc => {
                // Get the user name
                var userName = userDoc.data().name;
                console.log(userName);
                //$("#name-goes-here").text(userName); // jQuery
                document.getElementById("name-goes-here").innerText = userName;
            })
        } else {
            console.log("No user is logged in."); // Log a message when no user is logged in
        }
    })
}

insertNameFromFirestore();

document.getElementById("Home").addEventListener("click", () => window.location.href = "index.html")