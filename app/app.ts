import { Game, Player } from './data';
import { gameMode, gameModeInput } from './gameMode';
import {createGrid} from './tableGrid';

//#region - selectors
const gameStartButton = <HTMLButtonElement>document.getElementById('start');
const gameResetButton = <HTMLButtonElement>document.getElementById('reset');
const playerNameInput = <HTMLInputElement>document.getElementById('username');

const gameSection = <HTMLElement>document.getElementById('game');
//#endregion

playerNameInput.value = "";

//#region - testing func
const onClick = (event): void => {

    if (event.target.id === "start") {
        Player.getInstance().setName(playerNameInput.value);
        createGrid(gameMode(gameModeInput.value) as number[]);
        gameSection.appendChild(Game.getInstance().getGameTable());
        playerNameInput.setAttribute('disabled', 'true');
        gameModeInput.setAttribute('disabled', 'true');
        gameStartButton.setAttribute('disabled', 'true');
        gameResetButton.removeAttribute('disabled');
    }
    else if (event.target.id === "reset") {
        gameResetButton.setAttribute('disabled', 'true');
        gameStartButton.removeAttribute('disabled');
        gameModeInput.removeAttribute('disabled');
        gameModeInput.value = 'beginner';
        playerNameInput.removeAttribute('disabled');
        playerNameInput.value = "";
        gameSection.innerHTML = "";
    }
};
//#endregion

//#region - event listeners
gameStartButton.addEventListener('click', onClick);
gameResetButton.addEventListener('click', onClick);
// 
//#endregion
