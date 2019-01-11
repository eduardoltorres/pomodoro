let countdown;
let amountOfSessions;
const timerDisplay = document.querySelector('.clock');
const buttons = document.querySelectorAll('.sessions-quantity');
const sessionsBoard = document.querySelector('.session-duration');
const sessionsLeft = document.querySelector('.sessions-left');
const sessionSeconds = 1500;
const breakSeconds = 300;

buttons.forEach(button => button.addEventListener('click', startTimer));

function timer(seconds) {
  clearInterval(countdown);
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  // displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000 * 1);
    if (secondsLeft < 0) {
      //start break OR end timer
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  document.title = display;
  timerDisplay.textContent = display;
}

function startTimer() {
  const seconds = sessionSeconds;
  timer(seconds);

  amountOfSessions = Number(this.innerText);
  sessionsBoard.classList.add('active');
  sessionsLeft.innerHTML = `Sessions left: ${amountOfSessions}`;
  const resetButton = document.querySelector('#reset');
  resetButton.addEventListener('click', () => {
    sessionsBoard.classList.remove('active');
    clearInterval(countdown);
    displayTimeLeft(seconds);
  });
}