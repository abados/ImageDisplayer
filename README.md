# ImageDisplayer

Pixabay Image Search
This project utilizes the Pixabay API to search and display images based on user input. It provides a simple web interface where users can enter search terms and view the corresponding images. The project is divided into multiple steps, each building upon the previous one to add new features and functionality.

Table of Contents

Step 1 - Setups

Step 2 - UI Search Images Page Basic Features

Step 3 - UI Additional Features

Step 4 - Backend
	
	Setup:
To set up this project locally, follow the steps below:

1. 		Clone the repository to your local machine using the following command:
		git clone https://github.com/abados/ImageDisplayer.git



2. 		Navigate to the project directory:
		cd ImageDisplayer



3.		 Install the required dependencies using a package manager such as npm or yarn:
		npm install



4. 		Start the development server:
		npm start

Open your browser and visit http://localhost:3000 to view the application.


those are the steps I took to build this program:
Step 1 - Setups
Create a GitHub repository and set it up on your local machine. Each step of the project will be separated by commits to track progress.

Sign up or log in to the Pixabay API documentation page (https://pixabay.com/api/docs/). Copy the API key from the "Search Images" section and test it by appending the API key to the example URL in your browser.

Set up a basic HTML page to serve as the frontend of the application. Use a Live Server package to serve the page locally at http://localhost:3000.

Step 2 - UI Search Images Page Basic Features
Implement a search box and button on the HTML page. When the user enters a search term and clicks the button, an API call will be made to retrieve the corresponding images.

Display the retrieved images using a card-based layout. Each image card should contain basic information such as the image thumbnail and title.

Implement a modal that opens when an image card is clicked. The modal should display additional details about the selected image.

Add a "More Images" button at the bottom of the image list. Clicking this button should load and display more images.

Ensure that the web page is responsive and works well on different screen sizes, including mobile and desktop.

Step 3 - UI Additional Features
Implement a hover effect on each image card to display more information when the user hovers over an image.

Add a favorite icon to each image card, allowing users to save images for later in their favorites collection.

Introduce predefined tags for filtering images. For example, users can filter images by tags like "Background," "Wallpaper," or "Natural."

Step 4 - Backend
Move all API calls from the client-side to a Node.js backend using the Express framework.

Create routes in the backend to handle requests from the client.

Serve the HTML page content from the backend server.

Add a route for making search API calls to Pixabay from the backend instead of directly from the client.

Implement a route for loading random images when no search phrase is entered. This provides initial content when users first visit the page without performing a search.

Implement a simple cache mechanism in the Node.js backend to avoid unnecessary API calls.




