let cardsCreated = false;

function createFavoriteCard() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user && !cardsCreated) {
      cardsCreated = true; // Set the flag to true to prevent future duplication
      db.collection("users").doc(user.uid).get().then(userDoc => {
        var fav = userDoc.data().favorites;
        var favoriteCardContainer = document.querySelector(".favorite-card");

        // Clear existing cards
        favoriteCardContainer.innerHTML = '';

        fav.forEach(currentDocId => {
          db.collection("Events").doc(currentDocId).get().then(documents => {
            var title = documents.data().title;
            var date = documents.data().date;
            var description = documents.data().description;
            var imageSrc = documents.data().image;

            var divElement = document.createElement("div");
            divElement.setAttribute("data-document-id", currentDocId);
            divElement.innerHTML = `
              <div class="eventcard container mt-5">
                <div class="thebox card border-dark-subtle" style="height: 200px; overflow: hidden;">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-6">
                        <div class="d-flex align-items-start">
                          <h3 class="box-title">${title}</h3>
                          <i class="fas fa-heart fa-2x ml-3"></i>
                        </div>
                        <p class="boxinfo">${description}</p>
                      </div>
                      <div class="col-6 d-flex flex-column align-items-center">
                        <p class="date">${date}</p>
                        <img src="${imageSrc}" alt="" width="100" class="logo">
                      </div>
                    </div>
                  </div>
                </div>
              </div>`;

            favoriteCardContainer.appendChild(divElement);
          });
        });
      });
    }
  });
}

createFavoriteCard();
