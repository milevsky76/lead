const timerDays = document.getElementById("timerDays");
const timerHours = document.getElementById("timerHours");
const timerMinutes = document.getElementById("timerMinutes");
const timerSeconds = document.getElementById("timerSeconds");
let countdownInterval;

// Функция для обновления таймера
function updateCountdown() {
  const difference = getDifference();

  // Если разница меньше или равна нулю и таймер запущен, останавливаем его
  if (difference <= 0 && countdownInterval !== undefined) {
    clearInterval(countdownInterval);
  } else if (difference > 0) {
    // Переводим разницу в дни, часы, минуты и секунды
    // Обновляем элементы на странице с отображением таймера
    timerDays.innerText = addLeadingZero(Math.floor(difference / (1000 * 60 * 60 * 24)));
    timerHours.innerText = addLeadingZero(Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    timerMinutes.innerText = addLeadingZero(Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)));
    timerSeconds.innerText = addLeadingZero(Math.floor((difference % (1000 * 60)) / 1000));
  }
}

// Функция для нахождения разницы между текущей датой и целевой датой в миллисекундах
function getDifference() {
  return new Date("2024-07-24T03:07:00") - new Date();
}

// Функция для добавления нуля перед числами меньше 10
function addLeadingZero(number) {
  return ((number < 10 ? "0" : "") + number);
}

// Запускаем обновление сразу после загрузки страницы
updateCountdown();

// Если разница больше нуля, устанавливаем интервал для обновления таймера каждую секунду
if (getDifference() > 0) {
  countdownInterval = setInterval(updateCountdown, 1000);
}