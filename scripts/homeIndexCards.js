function findUpcomingDate(events) {
    var upcomingEvents = [];
    for (var i = 0; i < events.length; i++) {
        var eventId = Object.keys(events[i])[0];
        var eventDate = new Date(events[i][eventId]);
        var currentDate = new Date();
        if (eventDate > currentDate) {
            upcomingEvents.push(events[i]);
        }
    }
    upcomingEvents.sort(function (a, b) {
        var dateA = new Date(a[Object.keys(a)[0]]);
        var dateB = new Date(b[Object.keys(b)[0]]);
        return dateA - dateB;
    });
    return upcomingEvents.length > 0 ? upcomingEvents[0] : null;
}

function createUpcoming() {
    db.collection("Events").get().then(function (docs) {
        var upcomingEventDates = [];
        docs.forEach(function (docData) {
            var event = {};
            event[docData.id] = docData.data().date;
            upcomingEventDates.push(event);
        });
        var closestEvent = findUpcomingDate(upcomingEventDates);
        var eventId = Object.keys(closestEvent)[0];

        db.collection("Events").doc(eventId).get().then(eventData =>{
            var title = eventData.data().title;
            var date = eventData.data().date;
            var imageSrc = eventData.data().image
            var attendees = eventData.data().attendees
            var limit = eventData.data().limit
            var time = eventData.data().time
            var address = eventData.data().address
            var postalCode = eventData.data().postalCode
            var cost = eventData.data().cost
            var full_address = address + ", " + postalCode;
            var encodedAddress = encodeURIComponent(full_address);
            var googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

            document.querySelector(".appendUpcoming").innerHTML = `
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
        Attendees: <span class="attendees">${attendees.length}</span>/<span class="limit">${limit}</span> </div>
      <div class="col-6">
        Cost: <span class="cost">${cost}</span></div>
    </div>
    <p>Location: <a href="${googleMapsUrl}" class="location" style="color: violet;" target="_blank">${full_address}</a></p>
    <button class="mt-2 btn bg-primary viewMore" style="color: white; font-size: 15px;">View More</button>
  </div>`
        })      
    });
}

createUpcoming();

//this is for the Events no Sports
async function displayCardsDynamically(collection) {
  try {
    let cardTemplate = document.getElementById("homeCardTemplate");

    const docData = await db.collection(collection).get();

    const randomIndices = getRandomIndices(docData.size, 2);

    randomIndices.forEach(async (index) => {
      const eventData = docData.docs[index];
      const title = eventData.data().title;
      const date = eventData.data().date;
      const imageSrc = eventData.data().image;
      const attendees = eventData.data().attendees;
      const limit = eventData.data().limit;
      const time = eventData.data().time;
      const address = eventData.data().address;
      const postalCode = eventData.data().postalCode;
      const cost = eventData.data().cost;
      const full_address = address + ", " + postalCode;
      const encodedAddress = encodeURIComponent(full_address);
      const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

      let newcard = cardTemplate.content.cloneNode(true);

      newcard.querySelector('.logo').src = imageSrc;
      newcard.querySelector('.title').innerHTML = title;
      newcard.querySelector('.date').innerHTML = date;
      newcard.querySelector('.time').innerHTML = time;
      newcard.querySelector('.attendees').innerHTML = attendees.length;
      newcard.querySelector('.limit').innerHTML = limit;
      newcard.querySelector('.cost').innerHTML = cost;

      newcard.querySelector('.location').href = googleMapsUrl;
      newcard.querySelector('.location').innerHTML = full_address;

      document.getElementById("homeCardContainer").appendChild(newcard);
    });
  } catch (error) {
    console.error("Error fetching documents: ", error);
  }
}

function getRandomIndices(totalItems, count) {
  const indices = Array.from({ length: totalItems }, (_, index) => index);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices.slice(0, count);
}
displayCardsDynamically("Events");

// function createGymCard(collectionId) {

//   let cardTemplate = document.getElementById("homeCardTemplate");

//   db.collection(collectionId).get().then(documents => {
//     documents.forEach(docData => {
//       var title = docData.data().Gym_name;
//       var rating = docData.data().Rating;
//       var information = docData.data().Information;
//       var docID = docData.id;
//       var gymImage = docData.data().gymImage;
//       let newCard = cardTemplate.content.cloneNode(true);

//       // newCard.setAttribute("data-document-id", docData.id);
//       newCard.querySelector(".title").innerHTML = title;
//       newCard.querySelector(".starNumber").innerHTML = rating;
//       newCard.querySelector(".boxInfo").innerHTML = information;
//       newCard.querySelector("#gym-card-image").innerHTML = `
//             <img src="${gymImage}" alt="" class="img-fluid" id"logo-image">
//             `
//       newCard.querySelector(".card-href").href = "gympage.html?gymdocID=" + docID;


//       document.getElementById("gymCardContainer").appendChild(newCard);
//       counter++;

//     });
//   });
// }

async function displayGymCardsDynamically(collection) {
  try {
    let cardTemplate = document.getElementById("gymCardTemplate");

    const docData = await db.collection(collection).get();

    const randomIndices = getRandomIndices(docData.size, 2);

    randomIndices.forEach(async (index) => {
      const eventData = docData.docs[index];
      const title = eventData.data().Gym_name;
      const rating = eventData.data().Rating;
      const information = eventData.data().Information;
      const gymImage = eventData.data().gymImage;

      let newCard = cardTemplate.content.cloneNode(true);

      newCard.querySelector("#title").innerHTML = title;
      newCard.querySelector(".starNumber").innerHTML = rating;
      newCard.querySelector(".boxInfo").innerHTML = information;
      newCard.querySelector("#gym-card-image").src = gymImage;

      document.getElementById("homeCardContainer").appendChild(newCard);
    });
  } catch (error) {
    console.error("Error fetching documents: ", error);
  }
}

displayGymCardsDynamically("Gyms");



// async function createRandomGymCards(collectionId, numCards) {
//   try {
//     let cardTemplate = document.getElementById("gymCardTemplate");

//     const docData = await db.collection(collectionId).get();
//     const randomIndices = getRandomIndices(docData.size, numCards);

//     randomIndices.forEach(async (index) => {
//       const docDataItem = docData.docs[index];
//       const title = docDataItem.data().Gym_name;
//       const rating = docDataItem.data().Rating;
//       const information = docDataItem.data().Information;
//       const docID = docDataItem.id;
//       const gymImage = docDataItem.data().gymImage;

//       let newCard = cardTemplate.content.cloneNode(true);
//       // newCard = newCard.querySelector(".gymcard");

//       newCard.setAttribute("data-document-id", docDataItem.id);
//       newCard.querySelector(".box-title").innerHTML = title;
//       newCard.querySelector(".starnumber").innerHTML = rating;
//       newCard.querySelector(".boxinfo").innerHTML = information;
//       newCard.querySelector("#gym-card-image").innerHTML = `
//         <img src="${gymImage}" alt="" class="img-fluid" id="logo-image">
//       `;
//       newCard.querySelector(".card-href").href = "gympage.html?gymdocID=" + docID;

//       document.getElementById("gymCardContainer").appendChild(newcard);
//     });
//   } catch (error) {
//     console.error("Error fetching gym documents: ", error);
//   }
// }

// createRandomGymCards("Gyms", 2)

// function createJoinedEvents(){

//     firebase.auth().onAuthStateChanged((user) =>{
//         db.collection("users").doc(user.uid).get().then(docData =>{
//             var joined = docData.data().joinedEvents;
            
//             joined.forEach(docId =>{
//                 db.collection("Events").doc(docId).get().then(data =>{
//                     var title = data.data().title;
//                     var date = data.data().date;
//                     var imageSrc = data.data().image
//                     var attendees = data.data().attendees
//                     var limit = data.data().limit
//                     var time = data.data().time
//                     var address = data.data().address
//                     var postalCode = data.data().postalCode
//                     var cost = data.data().cost
//                     var full_address = address + ", " + postalCode;
//                     var encodedAddress = encodeURIComponent(full_address);
//                     var googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

//                     var newCard = document.createElement("div")
//                     newCard.innerHTML = `
//                             <div class="container border-dark-subtle fixed-height eventcard mt-5"
//     style="height: 440px;border-style: solid; border-width: 0.01ch; font-size: 15px;">
//     <img src="${imageSrc}" height="280px" width="414px" class="pt-2 logo" style="border-radius: 15px;">
//     <h1 style="display: inline-block;" class="pt-2 pr-2 title"><b>${title}</b></h1>
//     <i class="far fa-heart" style="font-size: 25px;"></i>
//     <div class="row">
//       <div class="col-6">
//         Date: <span class="date">${date}</span></div>
//       <div class="col-6">
//         Time: <span class="time">${time}</span></div>
//     </div>
//     <div class="row">
//       <div class="col-6">
//         Attendees: <span class="attendees">${attendees.length}</span>/<span class="limit">${limit}</span> </div>
//       <div class="col-6">
//         Cost: <span class="cost">${cost}</span></div>
//     </div>
//     <p>Location: <a href="${googleMapsUrl}" class="location" style="color: violet;" target="_blank">${full_address}</a></p>
//     <button class="mt-2 btn bg-primary viewMore" style="color: white; font-size: 15px;">View More</button>
//   </div>`           
//                     document.querySelector(".appendJoinedEvents").appendChild(newCard)
//                 })
//             })
//         })
//     })
    
// }
// createJoinedEvents()
