// Selecting the elements for days, hours, minutes, seconds, and the circle SVG
const daysElem = document.getElementById("days");
const hoursElem = document.getElementById("hours");
const minElem = document.getElementById("min");
const secElem = document.getElementById("sec");
const circle = document.querySelector("svg circle");
const endSound = document.getElementById("end-sound"); // Reference to the audio element

const circumference = 1136; // Circumference of the circle (2 * π * r)

circle.style.strokeDasharray = `${circumference}`;
circle.style.strokeDashoffset = `${circumference}`; // Start at full dash

// Prompting the user for input for days, hours, minutes, and seconds
let days = parseInt(prompt("Enter Days"), 10);
let hours = parseInt(prompt("Enter Hours"), 10);
let minutes = parseInt(prompt("Enter Minutes"), 10);
let seconds = parseInt(prompt("Enter Seconds"), 10);
window.alert("click on start to start the timer")

// Calculate the total number of seconds
let totalSeconds = (days * 86400) + (hours * 3600) + (minutes * 60) + seconds;
let initialTime = totalSeconds; // Store the initial time to calculate progress

// Function to update the countdown and stroke
function updateCountdown() {
  let displayDays = Math.floor(totalSeconds / 86400);
  let displayHours = Math.floor((totalSeconds % 86400) / 3600);
  let displayMinutes = Math.floor((totalSeconds % 3600) / 60);
  let displaySeconds = totalSeconds % 60;

  daysElem.textContent = String(displayDays).padStart(2, "0");
  hoursElem.textContent = String(displayHours).padStart(2, "0");
  minElem.textContent = String(displayMinutes).padStart(2, "0");
  secElem.textContent = String(displaySeconds).padStart(2, "0");

  totalSeconds--;

  let progress = totalSeconds / initialTime;
  let strokeOffset = circumference * progress;
  circle.style.strokeDashoffset = strokeOffset;

  if (totalSeconds < 0) {
    clearInterval(countdownInterval);
    endSound.play(); // Play the sound when the timer ends
    alert("Countdown completed!");
    circle.style.strokeDashoffset = 0; // Complete the circle at the end
  }
}

// Selecting the start button
const startButton = document.getElementById("start-button");

// Adding a click event listener to the button
startButton.addEventListener("click", () => {
    updateCountdown(); // Initialize the countdown immediately
    countdownInterval = setInterval(updateCountdown, 1000); // Start the interval
});
