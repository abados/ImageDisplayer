
let images = [];
let favoriteImages = [];
let currentPage = 1; // Define currentPage at the global scope

// Add an event listener to the search button
document.getElementById("searchButton").addEventListener("click", function () {
  var searchQuery = document.getElementById("searchInput").value;
  var tagFilter = document.getElementById("tagFilter").value;
  fetchImages(searchQuery, tagFilter);
});

// Add an event listener to the "More Images" button
document
  .getElementById("moreImagesButton")
  .addEventListener("click", function () {
    var searchQuery = document.getElementById("searchInput").value;
    currentPage++;
    fetchImages(searchQuery, currentPage);
  });

// Add event delegation for the favorite icon click event
document
  .getElementById("imageContainer")
  .addEventListener("click", function (event) {
    if (event.target.classList.contains("favorite-icon")) {
      var imageIndex = Array.from(
        event.target.parentNode.parentNode.children
      ).indexOf(event.target.parentNode);
      var image = images[imageIndex];
      image.favorite = !image.favorite;

      if (image.favorite) {
        event.target.innerHTML = "&#9733;"; // Change the icon to a filled star
        event.target.style.backgroundColor = "green"; // Highlight the star
        favoriteImages.push(image); // Add the image to the favoriteImages array
      } else {
        event.target.innerHTML = "&#9734;"; // Change the icon to an empty star
        event.target.style.backgroundColor = "transparent"; // Remove the highlight from the star
        favoriteImages = favoriteImages.filter(function (favImage) {
          return favImage !== image; // Remove the image from the favoriteImages array
        });
      }
    }
  });

// Function to fetch images from the API
function fetchImages(query, param) {
  var imageContainer = document.getElementById("imageContainer");

  if (typeof param === "string") {
    var tagFilter = param;
    // Remove existing images from the container
    imageContainer.innerHTML = "";

    // Send a GET request to the server to fetch images
    fetch(`/api/search?query=${query}&tagFilter=${tagFilter}`)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        images = data.hits; // Store the fetched images in the 'images' array
        displayImages(images); // Display the images in the image container
      })
      .catch(function (error) {
        console.log(error);
      });
  } else if (typeof param === "number") {
    var page = param;

    // Send a GET request to the server to fetch more images
    fetch(`/api/moreImages?query=${query}&page=${page}`)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        var newImages = data.hits; // Get the newly fetched images
        images = images.concat(newImages); // Append the new images to the 'images' array
        displayImages(newImages); // Display only the new images
        currentPage = page;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

    // Fetch random images when the page finishes loading
document.addEventListener("DOMContentLoaded", function () {
  fetch("/api/random")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var randomImages = data.hits;
      displayImages(randomImages);
    })
    .catch(function (error) {
      console.log(error);
    });
});




// const API_KEY = "28925108-9358d987526d525ae413b44c1";
// let currentPage = 1;
// let images = [];
// let favoriteImages = [];

// // Add an event listener to the search button
// document.getElementById("searchButton").addEventListener("click", function () {
//   var searchQuery = document.getElementById("searchInput").value;
//   var tagFilter = document.getElementById("tagFilter").value;
//   fetchImages(searchQuery, tagFilter);
// });

// // Add an event listener to the "More Images" button
// document
//   .getElementById("moreImagesButton")
//   .addEventListener("click", function () {
//     var searchQuery = document.getElementById("searchInput").value;
//     currentPage++;
//     fetchImages(searchQuery, currentPage);
//   });

// // Add event delegation for the favorite icon click event
// document
//   .getElementById("imageContainer")
//   .addEventListener("click", function (event) {
//     if (event.target.classList.contains("favorite-icon")) {
//       var imageIndex = Array.from(
//         event.target.parentNode.parentNode.children
//       ).indexOf(event.target.parentNode);
//       var image = images[imageIndex];
//       image.favorite = !image.favorite;

//       if (image.favorite) {
//         event.target.innerHTML = "&#9733;"; // Change the icon to a filled star
//         event.target.style.backgroundColor = "green"; // Highlight the star
//         favoriteImages.push(image); // Add the image to the favoriteImages array
//       } else {
//         event.target.innerHTML = "&#9734;"; // Change the icon to an empty star
//         event.target.style.backgroundColor = "transparent"; // Remove the highlight from the star
//         favoriteImages = favoriteImages.filter(function (favImage) {
//           return favImage !== image; // Remove the image from the favoriteImages array
//         });
//       }
//     }
//   });

// // Function to fetch images from the API
// function fetchImages(query, param) {
//   var imageContainer = document.getElementById("imageContainer");

//   if (typeof param === "string") {
//     var tagFilter = param;
//     // Remove existing images from the container
//     imageContainer.innerHTML = "";

//     // Construct the API URL with the search query and tag filter
//     var apiUrl = "https://pixabay.com/api/?key=" + API_KEY + "&q=" + query;

//     if (tagFilter) {
//       apiUrl += "&category=" + tagFilter;
//     }

//     fetch(apiUrl)
//       .then(function (response) {
//         return response.json();
//       })
//       .then(function (data) {
//         images = data.hits; // Store the fetched images in the 'images' array
//         displayImages(images); // Display the images in the image container
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   } else if (typeof param === "number") {
//     var page = param;

//     fetch(
//       "https://pixabay.com/api/?key=" +
//         API_KEY +
//         "&q=" +
//         query +
//         "&page=" +
//         page
//     )
//       .then(function (response) {
//         return response.json();
//       })
//       .then(function (data) {
//         var newImages = data.hits; // Get the newly fetched images
//         images = images.concat(newImages); // Append the new images to the 'images' array
//         displayImages(newImages); // Display only the new images
//         currentPage = page;
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   }
// }