const API_KEY = "28925108-9358d987526d525ae413b44c1";
let currentPage = 1;

// Add an event listener to the search button
document.getElementById("searchButton").addEventListener("click", function () {
  // Get the search query from the input field
  var searchQuery = document.getElementById("searchInput").value;

  // Get the selected tag filter
  var tagFilter = document.getElementById("tagFilter").value;

  // Call the function to fetch images based on the search query and tag filter
  fetchImages(searchQuery, tagFilter);
});

// Add an event listener to the "More Images" button
document
  .getElementById("moreImagesButton")
  .addEventListener("click", function () {
    // Get the search query from the input field
    var searchQuery = document.getElementById("searchInput").value;

    // Increment the current page number
    currentPage++;

    // Call the function to fetch more images based on the search query and current page number
    fetchImages(searchQuery, currentPage);
  });


var currentSearchQuery = "";

function fetchImages(query, param) {
  if (typeof param === "string") {
    // Called with tagFilter
    var tagFilter = param;
     // Remove existing images from the container
      imageContainer.innerHTML = "";

    // Construct the API URL with the search query and tag filter
    var apiUrl = "https://pixabay.com/api/?key=" + API_KEY + "&q=" + query;

    // Append the tag filter to the API URL if it's specified
    if (tagFilter) {
      apiUrl += "&category=" + tagFilter;
    }

    // Make an API call to the Pixabay API using the Fetch API
    fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // Call the function to display the images
        displayImages(data.hits, query);
      })
      .catch(function (error) {
        console.log(error);
      });
  } else if (typeof param === "number") {
    // Called with currentPage
    var page = param;

    // Make an API call to the Pixabay API using the Fetch API
    fetch(
      "https://pixabay.com/api/?key=" +
        API_KEY +
        "&q=" +
        query +
        "&page=" +
        page
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // Call the function to display the additional images
        displayImages(data.hits, query);
        currentPage = page; // Update the current page
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

// Declare a variable to store the favorite images
var favoriteImages = [];

// Function to display the images on the page
function displayImages(images, searchQuery) {
  var imageContainer = document.getElementById("imageContainer");
  var moreImagesButton = document.getElementById("moreImagesButton");

  // Loop through the images and create image cards
  for (var i = 0; i < images.length; i++) {
    var image = images[i];

    // Create the image card element
    var imageCard = document.createElement("div");
    imageCard.classList.add("image-card");

    // Set the image source and alt text
    var imageElement = document.createElement("img");
    imageElement.src = image.webformatURL;
    imageElement.alt = image.tags;

    // Create the favorite icon element
    var favoriteIcon = document.createElement("span");
    favoriteIcon.classList.add("favorite-icon");
    favoriteIcon.innerHTML = "&#9734;"; // Unicode character for star (outlined)

    favoriteIcon.addEventListener("click", function (event) {
      event.stopPropagation(); // Prevent click event from propagating to the image element

      var index = favoriteImages.indexOf(image);
      // If the image is not in favorites, add it
      if (index === -1) {
        favoriteImages.push(image);
        this.innerHTML = "&#9733;"; // Unicode character for star (filled)
        this.style.backgroundColor = "green"; // Set the background color to green
      } else {
        favoriteImages.splice(index, 1); // Remove the image from favorites
        this.innerHTML = "&#9734;"; // Unicode character for star (outlined)
        this.style.backgroundColor = "transparent"; // Set the background color back to transparent
      }

      // You can now access the favoriteImages array to retrieve the saved images
      console.log(favoriteImages);
    });

    // Append the favorite icon to the image card
    imageCard.appendChild(favoriteIcon);

    // Append the image element to the card
    imageCard.appendChild(imageElement);

    // Append the image card to the container
    imageContainer.appendChild(imageCard);
  }

  // Show or hide the "More Images" button based on the availability of more images
  moreImagesButton.style.display = images.length > 0 ? "block" : "none";
}

// Function to show the modal with image details
function showModal(image) {
  var modal = document.getElementById("modal");
  var modalContent = document.querySelector("#modal .modal-content");

  // Clear the modal content before adding new image details
  modalContent.innerHTML = "";

  // Create the image element in the modal
  var imageElement = document.createElement("img");
  imageElement.src = image.largeImageURL;
  imageElement.alt = image.tags;

  // Append the image element to the modal content
  modalContent.appendChild(imageElement);

  // Show the modal
  modal.style.display = "block";

  // Add a click event listener to close the modal
  modal.addEventListener("click", function (e) {
    if (e.target === modal || e.target.classList.contains("close")) {
      modal.style.display = "none";
    }
  });
}
