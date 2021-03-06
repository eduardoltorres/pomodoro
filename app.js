let countdown;
let breakSeconds;
let amountOfSessions;
const buttons = document.querySelectorAll('.sessions-quantity');
const message = document.querySelector('#message');
const resetButton = document.querySelector('#reset');
const timerDisplay = document.querySelector('.clock');
const sessionsLeft = document.querySelector('.sessions-left');
const sessionsBoard = document.querySelector('.session-duration');
const sessionSeconds = 1500;

buttons.forEach(button => button.addEventListener('click', startTimer));
resetButton.addEventListener('click', reset);

function startTimer() {
  sessionsBoard.classList.add('active');
  amountOfSessions = Number(this.innerText);
  timer(sessionSeconds);
}

function timer(seconds) {
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  
  amountOfSessions -= 1;
  sessionsLeft.innerHTML = `Sessions left: ${amountOfSessions}`;
  message.innerHTML = 'Get to work!';

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft === 0) {
      if (amountOfSessions === 0) {
        clearInterval(countdown);
        message.innerHTML = "You're done. Good job!";
      } else {
        clearInterval(countdown);
        breakTimer();
        return;
      }
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function breakTimer() {
  message.innerHTML = 'Take a break';

  if (amountOfSessions === 4 || amountOfSessions === 8) {
    breakSeconds = 1800;
  } else {
    breakSeconds = 300;
  }

  const now = Date.now();
  const then = now + breakSeconds * 1000;
  displayTimeLeft(breakSeconds);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft === 0) {
      clearInterval(countdown);
      timer(sessionSeconds);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000)
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  document.title = display;
  timerDisplay.textContent = display;
}

function reset() {
  clearInterval(countdown);
  sessionsBoard.classList.remove('active');
  displayTimeLeft(sessionSeconds);
  message.innerHTML = '';
}