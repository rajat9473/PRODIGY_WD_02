let startTime;
let elapsedTime = 0;
let interval;
let running = false;

// Load from localStorage
window.onload = () => {
  const savedTime = localStorage.getItem('stopwatchTime');
  const savedLaps = JSON.parse(localStorage.getItem('stopwatchLaps')) || [];
  const darkMode = localStorage.getItem('darkMode');

  if (savedTime) {
    elapsedTime = parseInt(savedTime);
    updateTime();
  }

  savedLaps.forEach((lap) => {
    addLapToList(lap);
  });

  if (darkMode === 'enabled') {
    document.body.classList.add('dark');
  }
};

function start() {
  if (!running) {
    startTime = Date.now() - elapsedTime;
    interval = setInterval(updateTime, 1000);
    running = true;
  }
}

function stop() {
  clearInterval(interval);
  running = false;
}

function reset() {
  clearInterval(interval);
  running = false;
  elapsedTime = 0;
  updateTime();
  document.getElementById('laps').innerHTML = '';
  localStorage.removeItem('stopwatchTime');
  localStorage.removeItem('stopwatchLaps');
}

function lap() {
  const lapTime = formatTime(elapsedTime);
  addLapToList(lapTime);

  // Save laps
  const laps = JSON.parse(localStorage.getItem('stopwatchLaps')) || [];
  laps.push(lapTime);
  localStorage.setItem('stopwatchLaps', JSON.stringify(laps));
}

function updateTime() {
  elapsedTime = Date.now() - startTime;
  document.getElementById('display').innerHTML = formatTime(elapsedTime);
  localStorage.setItem('stopwatchTime', elapsedTime);
}

function formatTime(ms) {
  let totalSeconds = Math.floor(ms / 1000);
  let hours = Math.floor(totalSeconds / 3600);
  let minutes = Math.floor((totalSeconds % 3600) / 60);
  let seconds = totalSeconds % 60;
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(n) {
  return n < 10 ? '0' + n : n;
}

function addLapToList(time) {
  const li = document.createElement('li');
  li.innerText = `Lap ${document.getElementById('laps').children.length + 1}: ${time}`;
  document.getElementById('laps').appendChild(li);
}

function toggleDarkMode() {
  document.body.classList.toggle('dark');
  localStorage.setItem('darkMode', document.body.classList.contains('dark') ? 'enabled' : 'disabled');
}













