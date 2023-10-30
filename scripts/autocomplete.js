document.addEventListener("DOMContentLoaded", function () {
  const availableKeywords = [
    "Basketball",
    "Badminton",
    "Volleyball",
    "Soccer",
    "Cricket"
  ];

  const resultBox = document.querySelector(".result-box");
  const inputBox = document.getElementById("search-bar");

  inputBox.addEventListener("input", function () {
    let result = [];
    let input = inputBox.value;
    if (input.length) {
      result = availableKeywords.filter((keyword) => {
        return keyword.toLowerCase().includes(input.toLowerCase());
      });
    }
    display(result);
  });

  function display(result) {
    const content = result.map((list) => {
      return "<li>" + list + "</li>";
    });
    resultBox.innerHTML = "<ul>" + content.join('') + "</ul>";

    if (result.length > 0) {
      resultBox.style.display = "block";
    } else {
      resultBox.style.display = "none";
    }
  }
});
