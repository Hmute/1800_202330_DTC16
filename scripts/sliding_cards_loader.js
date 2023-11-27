function copyCard(){
    var sportList = ["volleyball", "soccer", "tennis", "baseball", "running"]

    sportList.forEach(sport =>{
        
        const sportCard = document.getElementById("cardTemp").cloneNode(true)

        sportCard.querySelector(".copyThis").innerHTML = sport.toUpperCase()
        sportCard.id = sport

        document.getElementById("appendHere").appendChild(sportCard)

    })
}
copyCard()