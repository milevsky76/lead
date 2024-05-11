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




const form = document.getElementById("subsForm");
const popupOverlay = document.getElementById("popupOverlay");
const popup = document.getElementById("popup");
const popupTypeMessage = document.getElementById("popupTypeMessage");
const popupMessage = document.getElementById("popupMessage");
const popupCloseButton = document.getElementById("popupCloseButton");
const popupCloseCross = document.getElementById("popupCloseCross");

form.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const email = document.getElementById("subsEmail");

  if (!validateEmail(email.value) || !email.checkValidity()) {
    showPopup("Invalid email address", "error");
    return;
  }

  fetch(getRandomResponseStatus(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email.value
      })
    })
    .then(response => {
      if (response.ok) {
        showPopup("You have successfully subscribed to the email newsletter", "success");
      } else {
        showPopup("An error occurred. Please try again later", "error");
      }
    })
    .catch(error => {
      console.error("Error:", error);
      showPopup("An error occurred. Please try again later", "error");
    });
});

// Валидация email
function validateEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

// Окрытие Popup
function showPopup(message = '', type = '') {
  popupTypeMessage.textContent = type + '!';
  popupMessage.textContent = message;

  document.body.classList.add("modal-open");
  popupOverlay.classList.remove("hidden");
  popup.classList.remove("hidden");

  popupCloseButton.addEventListener("click", onPopupCloseHandler);
  popupCloseCross.addEventListener("click", onPopupCloseHandler);
}

// Закрытие Popup
function hiddenPopup() {
  popup.classList.add("hidden");
  popupOverlay.classList.add("hidden");
  document.body.classList.remove("modal-open");

  popupCloseButton.removeEventListener("click", onPopupCloseHandler);
  popupCloseCross.removeEventListener("click", onPopupCloseHandler);
}

const onPopupCloseHandler = function () {
  hiddenPopup();
};

// Функция вернёт рандомный ответ(url) для fetch запроса
function getRandomResponseStatus() {
  const statuses = {
    200: "https://run.mocky.io/v3/6379eb88-c99d-4874-9fdc-055234afd514",
    400: "https://run.mocky.io/v3/02e38f75-27c6-4a7d-a69e-f50a9b0991e6"
  };

  return Math.random() < 0.5 ? statuses[200] : statuses[400];
}




const eventAccordion = document.querySelector(".event__accordion");
const firstAccordionItem = eventAccordion.querySelector(".accordion__item");

// Открываем первую панель при загрузке страницы
toggleAccordion(firstAccordionItem);

// Добавляем обработчик события на все кнопки аккордеона
eventAccordion.querySelectorAll(".accordion__trigger").forEach(item => {
  item.addEventListener("click", function (evt) {
    const currentSelection = evt.target.closest(".accordion__item");
    if (!currentSelection) return;
    toggleAccordion(currentSelection);
  });
});

function toggleAccordion(currentItem) {
  const currentButton = currentItem.querySelector(".accordion__trigger");
  const currentContent = currentItem.querySelector(".accordion__content");

  if (currentButton.getAttribute("aria-expanded") !== 'true') {
    const activeButton = eventAccordion.querySelector('.accordion__trigger[aria-expanded="true"]');

    if (activeButton) {
      const activeContent = activeButton.parentNode.querySelector('.accordion__content');

      activeButton.setAttribute('aria-expanded', false);
      activeContent.setAttribute('aria-hidden', true);
    }

    currentButton.setAttribute('aria-expanded', true);
    currentContent.setAttribute('aria-hidden', false);
  }
}



updateText();

// Получаем все элементы с атрибутом data-text-tablet
function updateText() {
  let dts = document.querySelectorAll('[data-dt]');

  if (window.innerWidth <= 360) {
    console.log(1);
    dts.forEach(function (dt) {
      const mobileText = dt.getAttribute('data-text-mobile');

      if (mobileText) {
        dt.textContent = mobileText;
      }
    });
  } else if (window.innerWidth <= 768) {
    dts.forEach(function (dt) {
      const tabletText = dt.getAttribute('data-text-tablet');

      if (tabletText) {
        dt.textContent = tabletText;
      }
    });
  }
}