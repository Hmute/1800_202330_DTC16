// Check if the user is on a mobile device
if (/Mobi/.test(navigator.userAgent)) {
  // Use native date and time pickers for mobile
  $(".date input").attr("type", "date");
  $(".time input").attr("type", "time");
} else {
  // Use DateTimePicker for desktop
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
    format: 'LT', // 12-hour format with AM/PM
    icons: {
      up: "fa fa-chevron-up",
      down: "fa fa-chevron-down"
    }
  });
}

// Currency formatting
$("input[data-type='currency']").on({
  keyup: function () {
    formatCurrency($(this));
  },
  blur: function () {
    formatCurrency($(this), "blur");
  }
});

function formatNumber(n) {
  // Format number with commas
  return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function formatCurrency(input, blur) {
  var input_val = input.val();
  if (input_val === "") { return; }

  var original_len = input_val.length;
  var caret_pos = input.prop("selectionStart");

  if (input_val.indexOf(".") >= 0) {
    var decimal_pos = input_val.indexOf(".");
    var left_side = input_val.substring(0, decimal_pos);
    var right_side = input_val.substring(decimal_pos);

    left_side = formatNumber(left_side);
    right_side = formatNumber(right_side);

    if (blur === "blur") {
      right_side += "00";
    }

    right_side = right_side.substring(0, 2);
    input_val = "$" + left_side + "." + right_side;

  } else {
    input_val = formatNumber(input_val);
    input_val = "$" + input_val;
    if (blur === "blur") {
      input_val += ".00";
    }
  }

  input.val(input_val);
  var updated_len = input_val.length;
  caret_pos = updated_len - original_len + caret_pos;
  input[0].setSelectionRange(caret_pos, caret_pos);
}

function to12HourTime(time) {
  // Create a Date object at the current date with the specified time
  var [hours, minutes] = time.split(':').map(Number);
  var date = new Date();
  date.setHours(hours, minutes, 0, 0); // Set hours and minutes, seconds and ms to 0


  var period = date.getHours() >= 12 ? 'PM' : 'AM';
  var hour12 = date.getHours() % 12 || 12; 
  var minuteFormatted = date.getMinutes().toString().padStart(2, '0'); 

  return `${hour12}:${minuteFormatted} ${period}`;
}


document.getElementById("eventForm").addEventListener("submit", function (event) {
  event.preventDefault();


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

  time = to12HourTime(time)

  console.log(time)
  
  if (!host || !sport || !title || !address || !city || !postalCode || !date || !time || !description || !cost || !limit) {
    handleFormMessage(false, "Please fill in all the fields.");
    return;
  } else {
    handleFormMessage(true, "Congratulations! You successfully posted an event.");
  }

  // Image file handling
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
    var storageRef = firebase.storage().ref('images/' + imageFile.name);
    var uploadTask = storageRef.put(imageFile);

    uploadTask.on('state_changed', function (snapshot) {
      // Handle state changes
    }, function (error) {
      console.log(error); // Handle unsuccessful uploads
    }, function () {
      // On successful upload
      uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
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

        // Save event data with image URL
        saveEventData(eventData);
      });
    });
  } else {
    // Save event data without an image
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
      attendees: 0
    };

    saveEventData(eventData);
  }

  // Reset the form
  document.getElementById("eventForm").reset();
});

// Prevent form submission on 'Enter' keypress
document.getElementById("eventForm").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
  }
});

// Function to display form submission messages
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
