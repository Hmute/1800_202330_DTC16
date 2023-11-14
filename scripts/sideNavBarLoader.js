$(function () {
    $("#sideBar").load("sideNavBar.html");
});

// function loadSideNavBar() {
//     console.log($('.sideNavBarDiv').load('sideNavBar.html'));
// }

// loadSideNavBar();

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


const profPic = document.getElementById("profile");
profPic.addEventListener("click", eventSideBar);


