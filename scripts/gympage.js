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
                gymLocation = doc.data().gymLocation;
                gymImage = doc.data().gymImage;
                monday = doc.data().Monday;
                tuesday = doc.data().Tuesday;
                wednesday = doc.data().Wednesday;
                thursday = doc.data().Thursday;
                friday = doc.data().Friday;
                saturday = doc.data().Saturday;
                sunday = doc.data().Sunday
                console.log(gymImage)

                // only populate title, and image
                document.getElementById("the-gym-name").innerHTML = gymName;
                document.getElementById("the-gym-location").innerHTML = `
                <iframe id="gym-gps" src="${gymLocation}" width="300" height="400" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                `
                document.getElementById("the-gym-images").innerHTML = `
                <img src="${gymImage}" alt="" class="responsive">
                `
                document.getElementById("monday").innerText = monday
                document.getElementById("tuesday").innerText = tuesday
                document.getElementById("wednesday").innerText = wednesday
                document.getElementById("thursday").innerText = thursday
                document.getElementById("friday").innerText = friday
                document.getElementById("saturday").innerText = saturday
                document.getElementById("sunday").innerText = sunday

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
