import { Game, gameSection } from './data';

//#region - DOM selectors
const aboutGameButton = document.getElementById('about-game-button');
const gameButton = document.getElementById('game-button');
const gameRulesButton = document.getElementById('game-rules-button');

const welcomeScreen = document.getElementById('welcome-screen');
const gameRules = document.getElementById('game-rules');
const aboutGame = document.getElementById('about-game');
const gameGridSection = document.getElementById('game');
const body = document.getElementById("body");
//#endregion


const boom = () => {
    let image = document.createElement('img');
    image.setAttribute('src', './images/boom.png');
    image.classList.add('big-boom');
    body.appendChild(image);
};

const gameOver = () => {
    let image = document.createElement('img');
    image.setAttribute('src', './images/gameover.png');
    image.classList.add('game-over');
    gameGridSection.appendChild(image);
};

const win = () => {
    let image = document.createElement('img');
    image.setAttribute('src', './images/win.png');
    image.classList.add('win');
    gameGridSection.appendChild(image);
};

//#region - header nav

const aboutGameShow = () => {
    welcomeScreen.classList.add('remove');
    gameGridSection.classList.add('remove');
    gameRules.classList.add('remove');
    aboutGame.classList.remove('remove');
};

const gameRulesShow = () => {
    welcomeScreen.classList.add('remove');
    gameGridSection.classList.add('remove');
    gameRules.classList.remove('remove');
    aboutGame.classList.add('remove');
};

const gameShow = () => {
    welcomeScreen.classList.add('remove');
    gameGridSection.classList.remove('remove');
    gameRules.classList.add('remove');
    aboutGame.classList.add('remove');
};

aboutGameButton.addEventListener('click', aboutGameShow);
gameRulesButton.addEventListener('click', gameRulesShow);
gameButton.addEventListener('click', gameShow);

//#endregion


export { boom, gameOver, win, gameShow, gameGridSection };