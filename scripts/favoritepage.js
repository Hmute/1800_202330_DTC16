let cardsCreated = false;

function updateHeartIcon(user, docId, cardElement) {
  db.collection("users").doc(user.uid).get().then(userDoc => {
    const favoritesArray = userDoc.data().favorites;
    if (favoritesArray.includes(docId)) {
      cardElement.querySelector('i.fa-heart').classList.remove("far");
      cardElement.querySelector('i.fa-heart').classList.add("fas");
    }
  });
}

function createFavoriteCard() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user && !cardsCreated) {
      cardsCreated = true; // Set the flag to true to prevent future duplication
      db.collection("users").doc(user.uid).get().then(userDoc => {
        var fav = userDoc.data().favorites;
        var favoriteCardContainer = document.querySelector(".favorite-card");

        // Check if there are no favorites and display a message if true
        if (fav.length === 0) {
          favoriteCardContainer.innerHTML = 'No favorites';
        } else {
          // Clear existing cards
          favoriteCardContainer.innerHTML = '';

          fav.forEach(currentDocId => {
            db.collection("Events").doc(currentDocId).get().then(documents => {
              var imageSrc = documents.data().image;
              var title = documents.data().title;
              var date = documents.data().date;
              var attendees = documents.data().attendees;
              var limit = documents.data().limit;
              var time = documents.data().time;
              var address = documents.data().address;
              var postalCode = documents.data().postalCode;
              var cost = documents.data().cost;

              var full_address = address + ", " + postalCode;
              var divElement = document.createElement("div");

              var encodedAddress = encodeURIComponent(full_address);
              var googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

              divElement.setAttribute("data-document-id", currentDocId);
              divElement.innerHTML = `
                <div class="container border-dark-subtle fixed-height eventcard mt-5"
    style="height: 440px;border-style: solid; border-width: 0.01ch; font-size: 15px;">
    <img src="${imageSrc}" height="280px" width="414px" class="pt-2 logo" style="border-radius: 15px;">
    <h1 style="display: inline-block;" class="pt-2 pr-2 title"><b>${title}</b></h1>
    <i class="far fa-heart" style="font-size: 25px;"></i>
    <div class="row">
      <div class="col-6">
        Date: <span class="date">${date}</span></div>
      <div class="col-6">
        Time: <span class="time">${time}</span></div>
    </div>
    <div class="row">
      <div class="col-6">
        Attendees: <span class="attendees">${attendees}</span>/<span class="limit">${limit}</span> </div>
      <div class="col-6">
        Cost: <span class="cost">${cost}</span></div>
    </div>
    <p>Location: <a href="${googleMapsUrl}" class="location" style="color: violet;" target="_blank">${full_address}</a></p>
    <button class="mt-2 btn bg-primary viewMore" style="color: white; font-size: 15px;">View More</button>
  </div>
              `
                  
                  ;
              divElement.querySelector(".far").id = currentDocId;
              var imgElement = divElement.querySelector("img.logo");
              if (imgElement && imageSrc) {
                imgElement.src = imageSrc;
              }

              updateHeartIcon(user, currentDocId, divElement); // Update the heart icon
              favoriteCardContainer.appendChild(divElement);
              attachViewMoreListeners()
            });
          });
        }
      });
    }
  });
}

createFavoriteCard();


document.addEventListener("click", function (event) {
  const heartIcon = event.target.closest(".fa-heart");

  heartIcon.classList.remove("fas");
  heartIcon.classList.add("far");

  const heartIconId = heartIcon.id;
  console.log(heartIconId)
  const user = firebase.auth().currentUser;

  userDoc = db.collection("users").doc(user.uid);

  if (user) {
    const userDoc = db.collection("users").doc(user.uid);

    userDoc.update({
      favorites: firebase.firestore.FieldValue.arrayRemove(heartIconId)
    }).then(() => {
      console.log("Event removed from favorites");
      window.location.reload();
    })
  }

});

