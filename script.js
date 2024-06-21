"use strict";

const letters = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ".split("");
// letters.forEach((element) => {
//   console.log(element);
// });
const out = letters
  .map(
    (letter) =>
      `<p class="letter lato-regular" id = "${letter}"> ${letter} </p>`
  )
  .join("");

document.querySelector(".letters-area").innerHTML = out;

const popularWords = [
  "РАМПА",
  "МАСОН",
  "МОЛВА",
  "МУМИЯ",
  "ОБРУЧ",
  "ОТЛИВ",
  "ПЛЕТЬ",
  "ПОСОХ",
  "РОЗНЬ",
  "СКЛЕП",
  "ТЕЗКА",
  "ТОМАТ",
  "ТУЛУП",
  "ШПАЛА",
  "БУФЕР",
  "ВОГУЛ",
  "ДЕКОР",
  "КОЛОС",
  "ПАДЛА",
  "ПОЛИВ",
  "ПЯТАК",
  "РВОТА",
  "СБРОС",
  "СИФОН",
  "СПАЗМ",
  "ТАБОР",
  "ТЕЛЕЦ",
  "ТЮБИК",
  "ХВАЛА",
  "ШИТЬЕ",
  "АСТРА",
  "БАЧОК",
  "ВАРКА",
  "ЗАЙКА",
  "ЗЕЛЬЕ",
  "ЛЯМКА",
  "ОТТОК",
  "СКОБА",
  "АРЕАЛ",
  "АУДИТ",
  "БАЗИС",
  "ДАМБА",
  "ДЕЛЕЦ",
  "ЕГЕРЬ",
  "ЖУЧОК",
  "ЗАВУЧ",
  "ЗУБЕЦ",
  "МЕТКА",
  "НАБЕГ",
  "НОЖНЫ",
  "ОПИСЬ",
  "РТУТЬ",
  "ЧУВАК",
  "АРШИН",
  "БАСНЯ",
  "ГОВОР",
  "ДЕБРИ",
  "ДЕСНА",
  "ЖЕРДЬ",
  "ЛОТОС",
  "ОСАДА",
  "ОТВАЛ",
  "ПЕРСТ",
  "СПИЦА",
  "СТОЛП",
  "ТАКСА",
  "ТРАНС",
  "УБЫЛЬ",
  "АНГАР",
  "АФЕРА",
  "ВИРАЖ",
  "ГОНЕЦ",
  "ИНДУС",
  "КАЗУС",
  "КОРЕШ",
  "ЛИАНА",
  "ОКУНЬ",
  "РУБЕЦ",
  "СЕДАН",
  "ТРАУР",
  "ФАСОН",
  "ФЛЯГА",
  "ЧЕЛКА",
  "ШЛЕЙФ",
  "ШМЕЛЬ",
  "ЩЕЧКА",
  "ЮНКЕР",
  "БИДОН",
  "БОЙНЯ",
  "ВАЛИК",
  "ЖЕТОН",
  "ЗАГОН",
  "КУЛИК",
  "ПЛЕСК",
  "ТЕМБР",
  "ТУРНЕ",
  "ХОБОТ",
  "ЧУЛАН",
  "ШЕЛЬФ",
  "ШКВАЛ",
];
let historyArray = [];

//Генерирует рандомное число в пределах min max
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//Генерирует новое рандомное слово из имеющихся
function getTheWordFromArray(words) {
  return words[getRandomInt(0, words.length)];
}

//Добавляет сгенерированное слово в массив[10], если этого слово там нет, иначе генерирует другое
//После всего возвращает слово
function getNewWordAndAddInHistory(lastTenWords) {
  let word;
  while (lastTenWords.includes(word) || word == undefined) {
    word = getTheWordFromArray(popularWords);
  }
  if (lastTenWords.length < 10) {
    lastTenWords.push(word);
  } else {
    lastTenWords.shift();
    lastTenWords.push(word);
  }
  return word;
}
//Получает буквы из введенной попытки
function getLettersFromAttempt(nameOfClass) {
  let letters = [];
  let attempt = document.querySelector(nameOfClass);
  for (let i = 0; i < 5; i++) {
    letters.push(attempt.children[i].value);
  }
  return letters;
}

function activeAttempt(currentAttempt, attempts) {
  if (currentAttempt == 0);

  //если строка != текущей строке, то возможность ввода отключается, иначе включается
  for (let i = 0; i < attempts.length; i++) {
    if (i == currentAttempt) {
      for (let j = 0; j < attempts[i].children.length; j++) {
        attempts[i].children[j].disabled = false;
        // console.log(attempts[i].children[j]);
      }
      console.log(`строка ${i} включена`);
      continue;
    }
    for (let j = 0; j < attempts[i].children.length; j++) {
      attempts[i].children[j].disabled = true;
      // console.log(attempts[i].children[j]);
    }
    console.log(`строка ${i} отключена`);
  }
  console.log(`попытка ${currentAttempt}`);
  currentAttempt++;
  return currentAttempt;
}

//Проверяет на совпадения и выделяет совпадения нужным цветом
function isWordsEqueal(word, currentAttempt, attempts) {
  let allAttempts = [
    getLettersFromAttempt(".attempt-one"),
    getLettersFromAttempt(".attempt-two"),
    getLettersFromAttempt(".attempt-three"),
    getLettersFromAttempt(".attempt-four"),
    getLettersFromAttempt(".attempt-five"),
  ];
  const hiddenLetters = Array.from(word);
  let attempt = currentAttempt - 1;
  const attemptWord = allAttempts[attempt];
  const currentInput = attempts[attempt].children;

  console.log(hiddenLetters, attemptWord, attempt);
  for (let i = 0; i < 5; i++) {
    if (hiddenLetters.includes(attemptWord[i])) {
      if (attemptWord[i] == hiddenLetters[i]) {
        currentInput[i].classList.add("completelyCorrect");
        document
          .getElementById(`${attemptWord[i]}`)
          .classList.add("completelyCorrect");
      } else {
        currentInput[i].classList.add("partiallyCorrect");
        document
          .getElementById(`${attemptWord[i]}`)
          .classList.add("partiallyCorrect");
      }
    }
  }
  if (hiddenLetters.toString() == attemptWord.toString()) {
    alert("Слово угадано!");
    setTimeout(10000);
    newGame();
  }
}

function isThereAnyAttempts(attempt) {
  return attempt <= 5 ? false : true;
}

let newGameButton = document.querySelector(".button-NewGame");
newGameButton.addEventListener("click", () => newGame());

//сброс игры до "первоначального" состояния
function gameReset(attempts) {
  for (let i = 0; i < attempts.length; i++) {
    for (let j = 0; j < attempts[i].children.length; j++) {
      if (attempts[i].children[j].classList.contains("completelyCorrect")) {
        attempts[i].children[j].classList.remove("completelyCorrect");
        document
          .getElementById(`${attempts[i].children[j].value}`)
          .classList.remove("completelyCorrect");
      } else if (
        attempts[i].children[j].classList.contains("partiallyCorrect")
      ) {
        attempts[i].children[j].classList.remove("partiallyCorrect");
        document
          .getElementById(`${attempts[i].children[j].value}`)
          .classList.remove("completelyCorrect");
      }
      attempts[i].children[j].value = "";
    }
    console.log(`строка ${i} отключена`);
  }
}

//Создает новую игру
function newGame() {
  let attempts = document.querySelector(".input-text").children;
  gameReset(attempts);
  activeAttempt(0, attempts);
  let currentAttempt = 1;
  let hiddenWord = getNewWordAndAddInHistory(historyArray); //работает
  console.warn(historyArray);
  function checkTheAttempt() {
    if (isThereAnyAttempts(currentAttempt)) {
      alert("Попытки кончились");
      newGame();
    }
    isWordsEqueal(hiddenWord, currentAttempt, attempts);
    currentAttempt = activeAttempt(currentAttempt, attempts);
  }

  let buttont = document.querySelector(".input-buttonCheck");
  buttont.addEventListener("click", () => checkTheAttempt());
}
