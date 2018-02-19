import {gameSection} from './data';

const body = document.getElementById("body");

const boom = () =>{
    let image = document.createElement('img');
    image.setAttribute('src','./images/boom.png');
    image.classList.add('big-boom');
    body.appendChild(image);
};

const gameOver = () => {
    let image = document.createElement('img');
    image.setAttribute('src','./images/gameover.png');
    image.classList.add('game-over');
    gameSection.appendChild(image);
};

const win = () => {
    let image = document.createElement('img');
    image.setAttribute('src','./images/win.png');
    image.classList.add('win');
    gameSection.appendChild(image);
};



export {boom, gameOver, win};