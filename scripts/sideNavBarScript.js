function eventSideNavBar() {
    const sidebar = document.getElementById("side_nav");
    if (sidebar.style.display === "none") {
        sidebar.style.display = "block";
        // transition for sidebar
        // sidebar.style.transition = "width 2s";
    } else {
        sidebar.style.display = "none";
    }

}