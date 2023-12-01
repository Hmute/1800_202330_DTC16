theReview = document.getElementsByClassName("review")[0]
theReview.addEventListener("click", reviewStuff)

// theReview = document.getElementById("gymreview")
// theReview.addEventListener("click", reviewStuff)

theLocation = document.getElementsByClassName("location")[0]
theLocation.addEventListener("click", locationstuff)

theSchedule = document.getElementsByClassName("schedule")[0]
theSchedule.addEventListener("click", scheduleStuff)


function reviewStuff() {

    reviewbtn()

    reviewDescription = document.querySelectorAll(".gym-reviews")
    reviewDescription.forEach(function (location) {
        location.style.display = "block"
        location.classList.remove("d-none")

    })

    scheduleDescription = document.querySelectorAll(".gym-schedule")
    scheduleDescription.forEach(function (schedule) {

        schedule.style.display = "none"

    })

    infoDescription = document.querySelectorAll(".gym-location")
    infoDescription.forEach(function (info) {

        info.style.display = "none"

    })
}

function reviewbtn() {

    navItems = document.querySelectorAll(".gym-info-tabs .nav-link")
    navItems.forEach(function (navItem) {

        event.preventDefault()

        navItem.classList.remove("active")

    })

    reviewElement = document.getElementsByClassName("review")[0]
    reviewElement.classList.add("active")


}

function locationstuff() {

    locationbtn()

    infoDescription = document.querySelectorAll(".gym-location")
    infoDescription.forEach(function (info) {

        info.style.display = "block"


    })

    locationDescription = document.querySelectorAll(".gym-reviews")
    locationDescription.forEach(function (location) {

        location.style.display = "none"

    })

    scheduleDescription = document.querySelectorAll(".gym-schedule")
    scheduleDescription.forEach(function (schedule) {

        schedule.style.display = "none"

    })

}

function locationbtn() {

    event.preventDefault()

    navItems = document.querySelectorAll(".gym-info-tabs .nav-link")

    navItems.forEach(function (navItem) {

        navItem.classList.remove("active")
    })

    locationElement = document.getElementsByClassName("location")[0]
    locationElement.classList.add("active")

}


function schedulebtn() {

    event.preventDefault()

    navItems = document.querySelectorAll(".gym-info-tabs .nav-link")
    navItems.forEach(function (navItem) {

        navItem.classList.remove("active")
    })

    scheduleElement = document.getElementsByClassName("schedule")[0]
    scheduleElement.classList.add("active")
}


function scheduleStuff() {

    schedulebtn()

    scheduleDescription = document.querySelectorAll(".gym-schedule")
    scheduleDescription.forEach(function (schedule) {

        schedule.style.display = "block"
        schedule.classList.remove("d-none")


    })

    infoDescription = document.querySelectorAll(".gym-location")
    infoDescription.forEach(function (info) {

        info.style.display = "none"

    })

    locationDescription = document.querySelectorAll(".gym-reviews")
    locationDescription.forEach(function (location) {

        location.style.display = "none"

    })

}

function displayGymInfo() {
    let params = new URL(window.location.href); //get URL of search bar

    let ID = params.searchParams.get("gymdocID"); //get value for key "id"
    console.log(ID);

    // doublecheck: is your collection called "Reviews" or "reviews"?
        db.collection("Gyms")
            .doc(ID)
            .get()
            .then(doc => {
                gymName = doc.data().Gym_name;
                dropIn = doc.data().dropin_info;
                gymPrice = doc.data().gym_price_info;
                gymSchedule = doc.data().Schedule;

                // only populate title, and image
                document.getElementById("the-gym-name").innerHTML = gymName;
                document.getElementById("drop-in-info").innerHTML = dropIn;
                document.getElementById("price-info").innerHTML = gymPrice;
                document.getElementById("the-gym-schedule").innerHTML = gymSchedule

            });
}   

displayGymInfo();



function saveGymDocumentIDAndRedirect() {
    let params = new URL(window.location.href); //get URL of search bar

    let ID = params.searchParams.get("gymdocID"); //get value for key "id"
    console.log(ID);

    localStorage.setItem('gymID', ID);
    window.location.href= "gymreview.html"


}
