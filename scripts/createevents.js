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

$("input[data-type='currency']").on({
  keyup: function () {
    formatCurrency($(this));
  },
  blur: function () {
    formatCurrency($(this), "blur");
  }
});


function formatNumber(n) {
  // format number 1000000 to 1,234,567
  return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}


function formatCurrency(input, blur) {
  // appends $ to value, validates decimal side
  // and puts cursor back in right position.

  // get input value
  var input_val = input.val();

  // don't validate empty input
  if (input_val === "") { return; }

  // original length
  var original_len = input_val.length;

  // initial caret position 
  var caret_pos = input.prop("selectionStart");

  // check for decimal
  if (input_val.indexOf(".") >= 0) {

    // get position of first decimal
    // this prevents multiple decimals from
    // being entered
    var decimal_pos = input_val.indexOf(".");

    // split number by decimal point
    var left_side = input_val.substring(0, decimal_pos);
    var right_side = input_val.substring(decimal_pos);

    // add commas to left side of number
    left_side = formatNumber(left_side);

    // validate right side
    right_side = formatNumber(right_side);

    // On blur make sure 2 numbers after decimal
    if (blur === "blur") {
      right_side += "00";
    }

    // Limit decimal to only 2 digits
    right_side = right_side.substring(0, 2);

    // join number by .
    input_val = "$" + left_side + "." + right_side;

  } else {
    // no decimal entered
    // add commas to number
    // remove all non-digits
    input_val = formatNumber(input_val);
    input_val = "$" + input_val;

    // final formatting
    if (blur === "blur") {
      input_val += ".00";
    }
  }

  // send updated string to input
  input.val(input_val);

  // put caret back in the right position
  var updated_len = input_val.length;
  caret_pos = updated_len - original_len + caret_pos;
  input[0].setSelectionRange(caret_pos, caret_pos);
}

document.getElementById("eventForm").addEventListener("submit", function (event) {
  event.preventDefault();

  // Other form inputs
  var host = document.getElementById("hostInput").value.trim();
  var sport = document.getElementById("sportInput").value.trim().toLowerCase();
  var title = document.getElementById("titleInput").value.trim();
  var address = document.getElementById("addressInput").value.trim();
  var city = document.getElementById("cityInput").value.trim();
  var postalCode = document.getElementById("zipInput").value.trim();
  var date = document.getElementById("datepicker").value.trim();
  var time = document.getElementById("timepicker").value.trim();
  var description = document.getElementById("descriptionInput").value.trim();
  var cost = document.getElementById("currency-field").value.trim();
  var limit = document.getElementById("attendeeInput").value.trim();

  // Check for empty required fields
  if (!host || !sport || !title || !address || !city || !postalCode || !date || !time || !description || !cost || !limit) {
    handleFormMessage(false, "Please fill in all the fields.");
    return; // Stop if validation fails
  }else{
    handleFormMessage(true, "Congratulations! You successfully post an event.")
  }




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
          cost: cost,
          limit: limit,
          attendees: 0,
          image: downloadURL // Use the download URL for the image
        };

        // Save the event data to Firestore
        saveEventData(eventData);
      });
    });
  } 
  document.getElementById("eventForm").reset();

});

document.getElementById("eventForm").addEventListener("keypress", function (event) {
  // Check if the pressed key is 'Enter'
  if (event.key === "Enter") {
    event.preventDefault(); // Prevent form submission
  }
});

function handleFormMessage(isSuccess, message) {
  var successDiv = document.getElementById("formSuccess");
  var errorDiv = document.getElementById("formError");

  if (isSuccess) {
    successDiv.innerHTML = message;
    successDiv.style.display = "block";
    errorDiv.style.display = "none";
    successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
  } else {
    errorDiv.innerHTML = message;
    errorDiv.style.display = "block";
    successDiv.style.display = "none";
    errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}


