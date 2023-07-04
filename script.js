const API_KEY = "28925108-9358d987526d525ae413b44c1";
let currentPage = 1;
let images = []; // Declare an empty array to store the fetched images

// Add an event listener to the search button
document.getElementById("searchButton").addEventListener("click", function () {
  var searchQuery = document.getElementById("searchInput").value;
  var tagFilter = document.getElementById("tagFilter").value;
  fetchImages(searchQuery, tagFilter);
});

// Add an event listener to the "More Images" button
document.getElementById("moreImagesButton").addEventListener("click", function () {
  var searchQuery = document.getElementById("searchInput").value;
  currentPage++;
  fetchImages(searchQuery, currentPage);
});

// Add an event listener to the image container for opening the modal
document.getElementById("imageContainer").addEventListener("click", function (event) {
  if (event.target.classList.contains("image-card")) {
    var imageIndex = Array.from(this.children).indexOf(event.target);
    var image = images[imageIndex];
    showModal(image);
  }
});

var currentSearchQuery = "";

function fetchImages(query, param) {
    var imageContainer = document.getElementById("imageContainer");
  
    if (typeof param === "string") {
      var tagFilter = param;
      // Remove existing images from the container
      imageContainer.innerHTML = "";
  
      // Construct the API URL with the search query and tag filter
      var apiUrl = "https://pixabay.com/api/?key=" + API_KEY + "&q=" + query;
  
      if (tagFilter) {
        apiUrl += "&category=" + tagFilter;
      }
  
      fetch(apiUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          images = data.hits; // Store the fetched images in the 'images' array
          displayImages(images, query);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else if (typeof param === "number") {
      var page = param;
  
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
          var newImages = data.hits; // Get the new fetched images
          images = images.concat(newImages); // Append the new images to the 'images' array
          displayImages(newImages, query); // Display only the new images
          currentPage = page;
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
  

var favoriteImages = [];

function displayImages(images, searchQuery) {
    var imageContainer = document.getElementById("imageContainer");
    var moreImagesButton = document.getElementById("moreImagesButton");
  
    
  
    for (var i = 0; i < images.length; i++) {
      var image = images[i];
      image.favorite = false;
  
      var imageCard = document.createElement("div");
      imageCard.classList.add("image-card");
  
      var imageElement = document.createElement("img");
      imageElement.src = image.webformatURL;
      imageElement.alt = image.tags;
  
      var favoriteIcon = document.createElement("span");
      favoriteIcon.classList.add("favorite-icon");
      favoriteIcon.innerHTML = "&#9734;";
  
      favoriteIcon.addEventListener("click", function (event) {
        event.stopPropagation();
        image.favorite = !image.favorite;
  
        if (image.favorite) {
          this.innerHTML = "&#9733;";
          this.style.backgroundColor = "green";
        } else {
          this.innerHTML = "&#9734;";
          this.style.backgroundColor = "transparent";
        }
  
        console.log(images);
      });
  
      imageCard.appendChild(favoriteIcon);
      imageCard.appendChild(imageElement);
      imageContainer.appendChild(imageCard);
  
      // Add event listener to imageCard for opening the modal
      imageCard.addEventListener("click", function (event) {
        var imageIndex = Array.from(this.parentNode.children).indexOf(this);
        var image = images[imageIndex];
        showModal(image);
      });
    }
  
    moreImagesButton.style.display = images.length > 0 ? "block" : "none";
  }
  

function showModal(image) {
var modal = document.getElementById("modal");
var modalContent = document.querySelector("#modal .modal-content");
modalContent.innerHTML = "";

var imageElement = document.createElement("img");
imageElement.src = image.largeImageURL;
imageElement.alt = image.tags;

var isFavorite = image.favorite;

var favoriteIcon = document.createElement("span");
favoriteIcon.classList.add("favorite-icon");
favoriteIcon.innerHTML = isFavorite ? "&#9733;" : "&#9734;";

favoriteIcon.addEventListener("click", function (event) {
  event.stopPropagation();
  image.favorite = !image.favorite;

  if (image.favorite) {
    this.innerHTML = "&#9733;";
    this.style.backgroundColor = "green";
  } else {
    this.innerHTML = "&#9734;";
    this.style.backgroundColor = "transparent";
  }

  console.log(images);
});

modalContent.appendChild(favoriteIcon);
modalContent.appendChild(imageElement);

modal.style.display = "block";

modal.addEventListener("click", function (e) {
  if (e.target === modal || e.target.classList.contains("close")) {
    modal.style.display = "none";
  }
});
}