// Get the timer display and buttons
const timer = document.getElementById('timer');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const resetBtn = document.getElementById('reset');

// Set the initial time and interval ID
let time = 0;
let intervalId = null;

// Define a function to format the time as "mm:ss"
function formatTime(time) {
  const minutes = Math.floor(time / 60).toString().padStart(2, '0');
  const seconds = (time % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

// Update the timer display with the current time
function updateTimer() {
  timer.textContent = formatTime(time);
}

// Define a function to start the timer
function startTimer() {
  // Check if the timer is already running
  if (intervalId !== null) {
    return;
  }

  // Start the timer
  intervalId = setInterval(() => {
    time++;
    updateTimer();
  }, 1000);
}

// Define a function to stop the timer
function stopTimer() {
  clearInterval(intervalId);
  intervalId = null;
}

// Define a function to reset the timer
function resetTimer() {
  stopTimer();
  time = 0;
  updateTimer();
}

// Attach event listeners to the buttons
startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);

// Restore previous timer state on page load (if available)
if (localStorage.getItem('timerTime') !== null) {
  time = parseInt(localStorage.getItem('timerTime'));
  updateTimer();
}

// Save timer state on window unload
window.addEventListener('unload', () => {
  localStorage.setItem('timerTime', time.toString());
});

// Resume the timer if it was previously running
if (localStorage.getItem('timerIntervalId') !== null) {
  intervalId = setInterval(() => {
    time++;
    updateTimer();
  }, 1000);
}
