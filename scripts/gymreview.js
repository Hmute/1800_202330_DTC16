var gymID = localStorage.getItem('gymID')
console.log(gymID)

function displayGymName(id) {
  db.collection("Gyms")
    .doc(id)
    .get()
    .then((thisGym) => {
      var gymName = thisGym.data().Gym_name;
      document.getElementById("gymName").innerHTML = gymName;
    });
}

displayGymName(gymID);

const stars = document.querySelectorAll('.star');

// Iterate through each star element
stars.forEach((star, index) => {
  // Add a click event listener to the current star
  star.addEventListener('click', () => {
    // Fill in clicked star and stars before it
    for (let i = 0; i <= index; i++) {
      // Change the text content of stars to 'star' (filled)
      document.getElementById(`star${i + 1}`).textContent = 'star';
    }
  });
});

function writeReview() {
  console.log("inside write review");
  let userName = document.getElementById("title").value;
  let gymDescription = document.getElementById("description").value;


  // Get the star rating
  // Get all the elements with the class "star" and store them in the 'stars' variable
  const stars = document.querySelectorAll('.star');
  // Initialize a variable 'hikeRating' to keep track of the rating count
  let gymRating = 0;
  // Iterate through each element in the 'stars' NodeList using the forEach method
  stars.forEach((star) => {
    // Check if the text content of the current 'star' element is equal to the string 'star'
    if (star.textContent === 'star') {
      // If the condition is met, increment the 'hikeRating' by 1
      gymRating++;
    }
  });


  var user = firebase.auth().currentUser;
  if (user) {
    var currentUser = db.collection("users").doc(user.uid);
    var userID = user.uid;


    db.collection("Gymreviews").add({
      gymID: gymID,
      userID: userID,
      name: userName,
      description: gymDescription,
      rating: gymRating, 
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
      window.location.href = "gymthanks.html"; 
    });
  } else {
    console.log("No user is signed in");
    window.location.href = 'gymreview.html';
  }
}


function createReviewCard(name, description, rating, time) {

  const card = document.createElement('div');
  card.className = 'review-card'; 

  const theName = document.createElement('h3');
  theName.textContent = name;
  card.appendChild(theName);

  const theTime = document.createElement('p');
  theTime.textContent = new Date(time).toLocaleString();
  card.appendChild(theTime);

  const theDescription = document.createElement('p');
  theDescription.textContent = description;
  card.appendChild(theDescription);

  const theRating = document.createElement('div');
  theRating.className = 'rating'; 

  for (let i = 0; i < 5; i++) {
    const star = document.createElement('span');
    star.className = 'material-icons';
    star.textContent = i < rating ? 'star' : 'star_border';
    theRating.appendChild(star);
  }
  card.appendChild(theRating);

  return card;
}

const reviewsContainer = document.getElementById('reviewCard');


function populateReviews() {
  let params = new URL(window.location.href); 
  let gymID = params.searchParams.get("gymdocID");
  db.collection('Gymreviews').where("gymID", "==", gymID).get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const reviewCard = createReviewCard(data.name, data.description, data.rating, data.timestamp.toDate());
      reviewsContainer.appendChild(reviewCard);
    });
  }).catch((error) => {
    console.error("Error fetching reviews:", error);
  });
}

populateReviews();