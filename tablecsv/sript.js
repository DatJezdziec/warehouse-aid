// Use the localStorage API
const inputForm = document.querySelector("#input-form");
const gridContainer = document.querySelector("#grid-container");
const inputText = document.querySelector("#input-text");

// Use arrow functions for event listeners
inputForm.addEventListener("submit", (event) => {
  // Prevent the default action of the form (reloading the page)
  event.preventDefault();

  // Get the value of the input text
  const text = inputText.value;

  // Check if the text is not empty
  if (text) {
    // Create a new div element for the grid item
    const gridItem = document.createElement("div");

    // Use template literals for text content
    gridItem.textContent = `${text}`;

    // Use classList API to add classes
    gridItem.classList.add("p-2", "m-2", "border", "rounded");

    // Use append method to append the grid item to the grid container
    gridContainer.append(gridItem);

    // Clear the input text value
    inputText.value = "";
  }
});

// Use arrow functions for event listeners
window.addEventListener("load", () => {
  // Get the stored grid items as a JSON string
  const storedGridItems = localStorage.getItem("grid-items");

  // Parse the JSON string into an array of objects
  const gridItems = JSON.parse(storedGridItems);

  // Check if the array is not null or empty
  if (gridItems && gridItems.length > 0) {
    // Use for...of loop to iterate over the array
    for (const gridItem of gridItems) {
      // Get the text property of the object
      const text = gridItem.text;

      // Create a new div element for the grid item
      const div = document.createElement("div");

      // Use template literals for text content
      div.textContent = `${text}`;

      // Use classList API to add classes
      div.classList.add("p-2", "m-2", "border", "rounded");

      // Use append method to append the div element to the grid container
      gridContainer.append(div);
    }
  }
});

// Use arrow functions for event listeners
window.addEventListener("beforeunload", () => {
  // Create an empty array to store the grid items as objects
  const gridItems = [];

  // Use querySelectorAll method to get all the div elements inside the grid container
  const divs = gridContainer.querySelectorAll("div");

  // Use for...of loop to iterate over the HTML collection
  for (const div of divs) {
    // Get the text content of the div element
    const text = div.textContent;

    // Create an object with a text property and set it to the div text content
    const obj = {text: text};

    // Push the object to the array
    gridItems.push(obj);
  }

  // Stringify the array and store it in localStorage using localStorage API
  localStorage.setItem("grid-items", JSON.stringify(gridItems));
});
