theLocation = document.getElementsByClassName("location")[0]
theLocation.addEventListener("click", locationStuff)

theInformation = document.getElementsByClassName("information")[0]
theInformation.addEventListener("click", informationStuff)

theSchedule = document.getElementsByClassName("schedule")[0]
theSchedule.addEventListener("click", scheduleStuff)


function locationStuff() {

    locationbtn()

    locationDescription = document.querySelectorAll(".gym-location")
    locationDescription.forEach(function (location) {
        location.style.display = "block"
        location.classList.remove("d-none")

    })

    scheduleDescription = document.querySelectorAll(".gym-schedule")
    scheduleDescription.forEach(function (schedule) {

        schedule.style.display = "none"

    })

    infoDescription = document.querySelectorAll(".gym-info")
    infoDescription.forEach(function (info) {

        info.style.display = "none"

    })
}

function locationbtn() {

    navItems = document.querySelectorAll(".gym-info-tabs .nav-link")
    navItems.forEach(function (navItem) {

        event.preventDefault()

        navItem.classList.remove("active")

    })

    locationElement = document.getElementsByClassName("location")[0]
    locationElement.classList.add("active")


}

function informationStuff() {

    informationbtn()

    infoDescription = document.querySelectorAll(".gym-info")
    infoDescription.forEach(function (info) {

        info.style.display = "block"


    })

    locationDescription = document.querySelectorAll(".gym-location")
    locationDescription.forEach(function (location) {

        location.style.display = "none"

    })

    scheduleDescription = document.querySelectorAll(".gym-schedule")
    scheduleDescription.forEach(function (schedule) {

        schedule.style.display = "none"

    })

}

function informationbtn() {

    event.preventDefault()

    navItems = document.querySelectorAll(".gym-info-tabs .nav-link")

    navItems.forEach(function (navItem) {

        navItem.classList.remove("active")
    })

    informationElement = document.getElementsByClassName("information")[0]
    informationElement.classList.add("active")

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

    infoDescription = document.querySelectorAll(".gym-info")
    infoDescription.forEach(function (info) {

        info.style.display = "none"

    })

    locationDescription = document.querySelectorAll(".gym-location")
    locationDescription.forEach(function (location) {

        location.style.display = "none"

    })

}

function displayGymInfo() {
    let params = new URL(window.location.href); //get URL of search bar
    let ID = params.searchParams.get("docID"); //get value for key "id"
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
    let params = new URL(window.location.href) //get the url from the search bar
    let ID = params.searchParams.get("docID");
    localStorage.setItem('gymID', ID);
    window.location.href = 'gymreview.html';

}

