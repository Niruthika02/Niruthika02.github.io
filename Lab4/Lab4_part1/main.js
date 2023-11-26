// Get references to HTML elements
const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

// Function to retrieve a random value from an array
function randomValueFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// The main story template with placeholders
var storyText =
  "It was 94 farenheit outside, so :insertx: went for a walk. When they got to :inserty:, they stared in horror for a few moments, then :insertz:. Bob saw the whole thing, but he was not surprised — :insertx: weighs 300 pounds, and it was a hot day.";

// Arrays of replacement options for placeholders
var insertX = ["Willy the Goblin", "Big Daddy", "Father Christmas"];
var insertY = ["the soup kitchen", "Disneyland", "the White House"];
var insertZ = ["spontaneously combusted", "melted into a puddle on the sidewalk", "turned into a slug and crawled away"];

// Event listener for the "Generate random story" button
randomize.addEventListener('click', result);

// Function to generate and display a random story
function result() {
  var newStory = storyText;
  var xItem = randomValueFromArray(insertX);
  var yItem = randomValueFromArray(insertY);
  var zItem = randomValueFromArray(insertZ);

  // Replace placeholders with random values
  var newStory = newStory.replace(':insertx:', xItem);
  var newStory = newStory.replace(':insertx:', xItem); // Using twice to replace both occurrences
  var newStory = newStory.replace(':inserty:', yItem);
  var newStory = newStory.replace(':insertz:', zItem);

  // Replace 'Bob' with the custom name if provided
  if (customName.value != '') {
    var name = customName.value;
    newStory = newStory.replace('Bob', name);
  }

  // Convert units to UK settings if the UK radio button is checked
  if (document.getElementById("uk").checked) {
    var weight = Math.round(300 * 0.0714286) + ' stone';
    var temperature = Math.round((94 - 32) * (5/9)) + ' centigrade';
    var newStory = newStory.replace('94 farenheit', temperature);
    var newStory = newStory.replace('300 pounds', weight);
  }

  // Display the generated story
  story.textContent = newStory;
  story.style.visibility = 'visible';
}
