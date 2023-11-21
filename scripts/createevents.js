if (/Mobi/.test(navigator.userAgent)) {
  // if mobile device, use native pickers
  $(".date input").attr("type", "date");
  $(".time input").attr("type", "time");
} else {
  // if desktop device, use DateTimePicker
  $("#datepicker").datetimepicker({
    useCurrent: false,
    format: "DD-MMM-YYYY",
    showTodayButton: true,
    icons: {
      next: "fa fa-chevron-right",
      previous: "fa fa-chevron-left",
      today: 'todayText',
    }
  });
  $("#timepicker").datetimepicker({
    format: "LT",
    icons: {
      up: "fa fa-chevron-up",
      down: "fa fa-chevron-down"
    }
  });
}

document.getElementById("eventForm").addEventListener("submit", function (event) {
  event.preventDefault();

  // Other form inputs
  var host = document.getElementById("hostInput").value;
  var sport = document.getElementById("sportInput").value.toLowerCase();
  var title = document.getElementById("titleInput").value;
  var address = document.getElementById("addressInput").value;
  var city = document.getElementById("cityInput").value;
  var postalCode = document.getElementById("zipInput").value;
  var date = document.getElementById("datepicker").value;
  var time = document.getElementById("timepicker").value;
  var description = document.getElementById("descriptionInput").value;

  // Get the file from the input
  var imageFile = document.getElementById("input-image").files[0];

  function saveEventData(eventData) {
    db.collection("Events").add(eventData)
      .then(function (docRef) {
        console.log("Document successfully written with ID: ", docRef.id);
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  }

  if (imageFile) {
    // Create a storage reference
    var storageRef = firebase.storage().ref('images/' + imageFile.name);

    // Upload the file
    var uploadTask = storageRef.put(imageFile);

    uploadTask.on('state_changed', function (snapshot) {
      // Observe state change events such as progress, pause, and resume
    }, function (error) {
      // Handle unsuccessful uploads
      console.log(error);
    }, function () {
      // Handle successful uploads on complete
      uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
        // Once the image is uploaded and you have the URL, create your event data
        var eventData = {
          host: host,
          sport: sport,
          title: title,
          address: address,
          city: city,
          postalCode: postalCode,
          date: date,
          time: time,
          description: description,
          image: downloadURL // Use the download URL for the image
        };

        // Save the event data to Firestore
        saveEventData(eventData);
      });
    });
  } else {
    var eventData = {
      host: host,
      sport: sport,
      title: title,
      address: address,
      city: city,
      postalCode: postalCode,
      date: date,
      time: time,
      description: description
      // image field is not included as no image is selected
    };

    // Save the event data to Firestore
    saveEventData(eventData);
  }

  document.getElementById("eventForm").reset();

});
