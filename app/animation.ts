import { Game, gameSection, game, welcomeScreen } from './data';

const aboutGameButton = document.getElementById('about-game-button');
const tableButton = document.getElementById('table-button');
const gameRulesButton = document.getElementById('game-rules-button');
const gameRules = document.getElementById('game-rules');
const aboutGame = document.getElementById('about-game');


const body = document.getElementById("body");

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
    game.appendChild(image);
};

const win = () => {
    let image = document.createElement('img');
    image.setAttribute('src', './images/win.png');
    image.classList.add('win');
    game.appendChild(image);
};

aboutGameButton.addEventListener('click', () => {
    welcomeScreen.classList.add('remove');
    game.classList.add('remove');
    gameRules.classList.add('remove');
    aboutGame.classList.remove('remove');
});

tableButton.addEventListener('click', () => {
    welcomeScreen.classList.add('remove');
    game.classList.remove('remove');
    gameRules.classList.add('remove');
    aboutGame.classList.add('remove');
 });

gameRulesButton.addEventListener('click', () => {
    welcomeScreen.classList.add('remove');
    game.classList.add('remove');
    gameRules.classList.remove('remove');
    aboutGame.classList.add('remove');
 });

export { boom, gameOver, win };