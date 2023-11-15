function createFavoriteCard() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      db.collection("users").doc(user.uid).get().then(userDoc => {
        var fav = userDoc.data().favorites

        for (i = 0; i < fav.length; i++) {
          var currentDocs = fav[i]

          db.collection("Events").doc(currentDocs).get().then(documents => {
            var sport = documents.data().sport;
            var date = documents.data().date;
            var information = documents.data().information;

            var divElement = document.createElement("div")

            divElement.innerHTML = `
  <div class="eventcard container mt-5">
    <div class="thebox card">
      <div class="card-body">
        <div class="row">
          <div class="col-6">
            <div class="d-flex align-items-start">
              <h3 class="box-title">
                ${sport}
              </h3>
              <i class="fas fa-heart fa-2x ml-3"></i>
            </div>
            <p class="boxinfo">${information}</p>
          </div>
          <!-- Closing div for col-6 -->
          <div class="col-6 d-flex flex-column align-items-center">
            <p class="date">
              ${date}
            </p>
            <img src="{images/Contentpic.png}" alt="" width="100" class="logo">
          </div>
          <!-- Closing div for row -->
        </div>
      </div>
    </div>
  </div>
`;          
            var favoriteCardContainer = document.querySelector(".favorite-card");
            favoriteCardContainer.appendChild(divElement);
          })
        }
      })
    }
  })
}
createFavoriteCard()

