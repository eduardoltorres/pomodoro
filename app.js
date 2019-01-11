let countdown;
let amountOfSessions;
const timerDisplay = document.querySelector('.clock');
const buttons = document.querySelectorAll('.sessions-quantity');
const resetButton = document.querySelector('#reset');
const sessionsBoard = document.querySelector('.session-duration');
const sessionsLeft = document.querySelector('.sessions-left');
// const sessionSeconds = 3;
const sessionSeconds = 1500;
// const breakSeconds = 2;
const breakSeconds = 300;

buttons.forEach(button => button.addEventListener('click', startTimer));

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

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft === 0) {
      //start break OR end timer
      if (amountOfSessions === 0) {
        clearInterval(countdown);
      } else {
        clearInterval(countdown);
        breakTimer(breakSeconds);
        return;
      }
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function breakTimer(seconds) {
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);

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

resetButton.addEventListener('click', reset);

function reset() {
  clearInterval(countdown);
  sessionsBoard.classList.remove('active');
  displayTimeLeft(sessionSeconds);
}