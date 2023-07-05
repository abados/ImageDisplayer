
// Function to display images in the image container
function displayImages(images) {
    var imageContainer = document.getElementById("imageContainer");
    var moreImagesButton = document.getElementById("moreImagesButton");
  
    for (var i = 0; i < images.length; i++) {
      var image = images[i];
      image.favorite = false; // Set the favorite property to false initially
  
      var imageCard = document.createElement("div");
      imageCard.classList.add("image-card");
  
      var imageElement = document.createElement("img");
      imageElement.src = image.webformatURL;
      imageElement.alt = image.tags;
      imageElement.title = image.tags; // Set the title attribute to display image.tags on hover
  
      var favoriteIcon = document.createElement("span");
      favoriteIcon.classList.add("favorite-icon");
      favoriteIcon.innerHTML = "&#9734;"; // Set the icon as an empty star
  
      favoriteIcon.addEventListener("click", function (event) {
        event.stopPropagation();
        var imageIndex = Array.from(this.parentNode.parentNode.children).indexOf(
          this.parentNode
        );
        var image = images[imageIndex];
        image.favorite = !image.favorite;
  
        if (image.favorite) {
          this.innerHTML = "&#9733;"; // Change the icon to a filled star
          this.style.backgroundColor = "green"; // Highlight the star
          favoriteImages.push(image); // Add the image to the favoriteImages array
        } else {
          this.innerHTML = "&#9734;"; // Change the icon to an empty star
          this.style.backgroundColor = "transparent"; // Remove the highlight from the star
          favoriteImages = favoriteImages.filter(function (favImage) {
            return favImage !== image; // Remove the image from the favoriteImages array
          });
        }
  
        console.log(favoriteImages);
      });
  
      // Check if the image is in the favoriteImages array and mark it as a star
      if (
        favoriteImages.some(function (favImage) {
          return favImage.id === image.id;
        })
      ) {
        favoriteIcon.innerHTML = "&#9733;"; // Change the icon to a filled star
        favoriteIcon.style.backgroundColor = "green"; // Highlight the star
        image.favorite = true;
      }
  
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
  
    moreImagesButton.style.display = images.length > 0 ? "block" : "none"; // Show or hide the "More Images" button
  }
  
  function showModal(image) {
    // Get the modal and modal content elements
    var modal = document.getElementById("modal");
    var modalContent = document.querySelector("#modal .modal-content");
    modalContent.innerHTML = "";
  
    // Create the image element and set its source and alt attributes
    var imageElement = document.createElement("img");
    imageElement.src = image.largeImageURL;
    imageElement.alt = image.tags;
  
    // Check if the image is marked as a favorite
    var isFavorite = image.favorite;
  
    // Create the favorite icon element
    var favoriteIcon = document.createElement("span");
    favoriteIcon.classList.add("favorite-icon");
    favoriteIcon.innerHTML = isFavorite ? "&#9733;" : "&#9734;";
  
    // Add a click event listener to the favorite icon
    favoriteIcon.addEventListener("click", function (event) {
      event.stopPropagation();
      // Get the index of the image in the 'images' array
      var imageIndex = Array.from(this.parentNode.parentNode.children).indexOf(
        this.parentNode
      );
      var image = images[imageIndex];
      // Toggle the favorite status of the image
      image.favorite = !image.favorite;
  
      if (image.favorite) {
        this.innerHTML = "&#9733;";
        this.style.backgroundColor = "green";
        favoriteImages.push(image); // Add the image to the 'favoriteImages' array
      } else {
        this.innerHTML = "&#9734;";
        this.style.backgroundColor = "transparent";
        favoriteImages = favoriteImages.filter(function (favImage) {
          return favImage !== image;
        }); // Remove the image from the 'favoriteImages' array
      }
  
      console.log(favoriteImages);
    });
  
    // Append the favorite icon and image element to the modal content
    modalContent.appendChild(favoriteIcon);
    modalContent.appendChild(imageElement);
  
    // Display the modal
    modal.style.display = "block";
  
    // Add a click event listener to close the modal when clicking outside or on the close button
    modal.addEventListener("click", function (e) {
      if (e.target === modal || e.target.classList.contains("close")) {
        modal.style.display = "none";
      }
    });
  }
  