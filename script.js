
const API_KEY= "28925108-9358d987526d525ae413b44c1";

// Add an event listener to the search button
document.getElementById("searchButton").addEventListener("click", function() {
    // Get the search query from the input field
    var searchQuery = document.getElementById("searchInput").value;
    
    // Call the function to fetch images based on the search query
    fetchImages(searchQuery);
});

// Function to fetch images based on the search query
function fetchImages(query) {
    // Make an API call to the Pixabay API using the Fetch API
    fetch("https://pixabay.com/api/?key="+API_KEY+"&q=" + query)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            // Call the function to display the images
            displayImages(data.hits);
        })
        .catch(function(error) {
            console.log(error);
        });
}

// Function to display the images on the page
function displayImages(images) {
    var imageContainer = document.getElementById("imageContainer");
    imageContainer.innerHTML = ""; // Clear the container before adding new images

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

        // Add a click event listener to show the modal with image details
        imageElement.addEventListener("click", function() {
            showModal(image);
        });

        // Append the image element to the card
        imageCard.appendChild(imageElement);

        // Append the image card to the container
        imageContainer.appendChild(imageCard);
    }
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
}
