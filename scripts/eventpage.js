eventsButton = document.getElementsByClassName("eventsbtn")[0]
eventsButton.addEventListener("click", clickeventsbtn)

gymButton = document.getElementsByClassName("gymbtn")[0]
gymButton.addEventListener("click", clickgymbtn)




function clickgymbtn() {
    event.preventDefault()
    gymCard = document.querySelectorAll(".gymcard")
    gymCard.forEach(function(card) {
        card.style.display = "block"
        card.classList.remove("d-none")
                
    });

    eventCard = document.querySelectorAll(".eventcard")
    eventCard.forEach(function(card) {
        card.style.display = "none"
        
    });

}

function clickeventsbtn() {
    eventCard = document.querySelectorAll(".eventcard")
    eventCard.forEach(function(card) {
        card.style.display = "block"        
    });

    gymCard = document.querySelectorAll(".gymcard")
    gymCard.forEach(function(card) {
        card.style.display = "none"
        
    });


}