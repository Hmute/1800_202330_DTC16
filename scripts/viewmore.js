function attachViewMoreListeners() {
  document.querySelectorAll(".viewMore").forEach(function (viewMoreButton) {
    viewMoreButton.addEventListener("click", function (event) {
      var eventCard = viewMoreButton.closest(".eventcard");

      if (eventCard) {
        var documentId = eventCard.getAttribute("data-document-id");

        db.collection("Events").doc(documentId).get().then(docData => {
          var data = docData.data();
          var host = docData.data().host;
          var description = data.description;
          var title = data.title;
          var date = data.date;
          var imageSrc = data.image;
          var attendees = data.attendees;
          var limit = data.limit;
          var time = data.time;
          var address = data.address;
          var postalCode = data.postalCode;
          var cost = data.cost;
          var full_address = address + ", " + postalCode;
          var encodedAddress = encodeURIComponent(full_address);
          var googleMapsUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBuTZsArI5B3s_n42sXeH46rV3e9mb_qFU&q=${encodedAddress}`;


          document.querySelector(".title").textContent = title;
          document.querySelector("img.logo").src = imageSrc;
          document.getElementById("attendees").textContent = attendees.length;
          document.getElementById("limit").textContent = limit;

          var viewMoreResult = document.querySelector(".viewMoreResult");
          if (viewMoreResult) {
            viewMoreResult.style.display = "block";
          }
          document.querySelectorAll('.eventcard, .gymcard, .gymPortal').forEach(function (element) {
            element.style.display = 'none';
          });
                  
          document.querySelector('.viewDesc').addEventListener('click', function () {
            document.querySelector('.appendDesc').innerHTML = `
            <p style="font-size: 15px;">${description}</p>
            `;
            toggleVisibility('appendDesc');
          });
          document.querySelector('.viewEss').addEventListener('click', function () {
            document.querySelector('.appendEss').innerHTML = `
            <div class="pl-2">
            <p class="pb-2" style="font-size: 25px">Host Name: ${host}</p>
              <p class="pb-2" style="font-size: 25px">Date: ${date}</p>
              <p class="pb-2" style="font-size: 25px">Time: ${time}</p>
              <p class="pb-2" style="font-size: 25px">Cost: ${cost}</p>
              <p class="pb-2" style="font-size: 25px">Location: ${full_address}<p>
            </div>
            `
            toggleVisibility('appendEss');
          });
          document.querySelector('.viewMap').addEventListener('click', function () {
            document.querySelector('.appendMap').innerHTML = `
                    <iframe
            width="100%"
            height="300px"
            frameborder="0" style="border:0"
            src="${googleMapsUrl}" allowfullscreen>
        </iframe>`;
            toggleVisibility('appendMap');
          });
          document.querySelector('.viewAtt').addEventListener('click', function () {
            document.querySelector('.appendAtt').innerHTML = 'Attendees Data Here';
            toggleVisibility('appendAtt');
          });
          var joinButton = document.querySelector('.joinBtn');
          var joinTxt = document.querySelector(".joinTxt")

          var user = firebase.auth().currentUser;

          if (user && attendees.includes(user.uid)) {
            joinTxt.innerText = "Joined";
          } else {
            joinTxt.innerText = "Join Event";
          }

          joinButton.addEventListener('click', function () {
            handleJoinEvent(documentId, joinButton, joinTxt);
          });
        });
      }
    });
  });
}

function toggleVisibility(activeClass) {
  var classes = ['appendDesc', 'appendEss', 'appendMap', 'appendAtt'];
  classes.forEach(function (className) {
    var element = document.querySelector('.' + className);
    if (className === activeClass) {
      element.style.display = 'block';
    } else {
      element.style.display = 'none';
    }
  });
}

attachViewMoreListeners();


function handleJoinEvent(documentId, joinButton, joinTxt) {
  var user = firebase.auth().currentUser;
  if (!user) {
    console.log("User not logged in");
    return;
  }
  var userId = user.uid;
  var eventRef = db.collection("Events").doc(documentId);
  var userRef = db.collection("users").doc(userId);

  eventRef.get().then(doc => {
    if (doc.exists) {
      let attendees = doc.data().attendees || [];

      if (attendees.includes(userId)) {
        eventRef.update({
          attendees: firebase.firestore.FieldValue.arrayRemove(userId)
        }).then(() => {
          joinTxt.innerText = "Join Event";
          console.log("User removed from event.");
        })

        userRef.update({
          joinedEvents: firebase.firestore.FieldValue.arrayRemove(documentId)
        })
        document.getElementById("attendees").textContent = attendees.length - 1;
      } else {
        eventRef.update({
          attendees: firebase.firestore.FieldValue.arrayUnion(userId)
        }).then(() => {
          joinTxt.innerText = "Joined";
        })

        userRef.update({
          joinedEvents: firebase.firestore.FieldValue.arrayUnion(documentId)
        })
        document.getElementById("attendees").textContent = attendees.length + 1;
      }
    } else {
      console.log("Event not found.");
    }
  })
}

