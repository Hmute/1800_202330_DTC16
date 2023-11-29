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
                <div class="eventcard container mt-5">
                  <div class="container-fluid pl-2 pr-2 eventcard bg-white" style="height: 200px;">
                    <div class="container h-100 p-0  border  border-1 border-dark-subtle"
                      style="border-radius: 5px; background-color: rgb(255, 227, 227);">
                      <div class="row align-content-center">
                        <div class="col-6 pr-0" style="padding-left: 25px;">
                          <h3 style="font-weight: bold;" class="m-0 pt-4 title">${title}</h3>
                          <div class="pt-2">
                            Date: <span class="date" style="font-size: 10px;">${date}</span>
                          </div>
                          <div class="pt-2">
                            Time: <span class="time">${time}</span>
                          </div>
                          <div class="pt-2">
                            Cost: <span class="cost">${cost}</span>
                          </div>
                          <div class="pt-2">
                            Attendees: <span class="attendees">${attendees}</span>/<span class="limit">${limit}</span>
                          </div>
                          <div class="pt-2">
                            Location: <a href="${googleMapsUrl}" class="location" style="color: blueviolet;" target="_blank">${full_address}</a>
                          </div>
                        </div>
                        <div class="col pl-0 text-end pt-1 col-6" style="padding-right: 25px;">
                          <i class="far fa-heart" style="font-size: 22px;display: block"></i>
                          <img src="" alt="" style="aspect-ratio: 4/3; object-fit: contain; width: 200px; padding-right: 5px;" class="logo">
                        </div>
                      </div>
                    </div>
                  </div>`;
              divElement.querySelector(".far").id = currentDocId;
              var imgElement = divElement.querySelector("img.logo");
              if (imgElement && imageSrc) {
                imgElement.src = imageSrc;
              }

              updateHeartIcon(user, currentDocId, divElement); // Update the heart icon
              favoriteCardContainer.appendChild(divElement);
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

