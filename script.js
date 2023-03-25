// Get the elements from the HTML
const getLocationBtn = document.getElementById("getLocation");
const removeLocationBtn = document.getElementById("removeLocation");
const mapDiv = document.getElementById("map");

// Check if the Geolocation API is supported
if ("geolocation" in navigator) {
  getLocationBtn.addEventListener("click", getLocation);
} else {
  getLocationBtn.style.display = "none";
  mapDiv.innerHTML = "Geolocation is not supported by this browser.";
}

// Function to get the user's location and display it on a map
function getLocation() {
  // Disable the button to prevent multiple requests
  getLocationBtn.disabled = true;

  // Check if the location is already stored in local storage
  const lat = localStorage.getItem("lat");
  const long = localStorage.getItem("long");

  if (lat && long) {
    // If the location is already stored, display the map
    displayMap(lat, long);
  } else {
    // If the location is not stored, get the user's current position
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Save the latitude and longitude in local storage
        localStorage.setItem("lat", position.coords.latitude);
        localStorage.setItem("long", position.coords.longitude);

        // Display the map
        displayMap(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        // Enable the button in case of error
        getLocationBtn.disabled = false;

        // Display the error message
        mapDiv.innerHTML = `Error: ${error.message}`;
      }
    );
  }
}

// Function to display the map
function displayMap(lat, long) {
  // Remove any existing map
  mapDiv.innerHTML = "";

  // Create the map iframe
  const mapIframe = document.createElement("iframe");
  mapIframe.width = "100%";
  mapIframe.height = "400px";
  mapIframe.frameborder = "0";
  mapIframe.style.border = "0";
  mapIframe.src = `https://maps.google.com/maps?q=${lat},${long}&z=15&output=embed`;

  // Append the map iframe to the map div
  mapDiv.appendChild(mapIframe);

  // Enable the Remove Location button
  removeLocationBtn.disabled = false;
}

// Function to remove the location from local storage
function removeLocation() {
  localStorage.removeItem("lat");
  localStorage.removeItem("long");
  mapDiv.innerHTML = "";
  getLocationBtn.disabled = false;
  removeLocationBtn.disabled = true;
}

// Add event listener to the Remove Location button
removeLocationBtn.addEventListener("click", removeLocation);

// Check if the location is already stored in local storage on page load
const lat = localStorage.getItem("lat");
const long = localStorage.getItem("long");

if (lat && long) {
  displayMap(lat, long);
  getLocationBtn.disabled = true;
  removeLocationBtn.disabled = false;
}
