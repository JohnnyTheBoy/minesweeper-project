import { Game, Player } from './data';
import { gameMode, gameModeInput } from './gameMode';

//#region - selectors
const gameStartButton = <HTMLButtonElement>document.getElementById('start');
const gameResetButton = <HTMLButtonElement>document.getElementById('reset');
const playerNameInput = <HTMLInputElement>document.getElementById('username');
//#endregion

playerNameInput.value = "";

//#region - testing func
const onClick = (event): void => {
    console.log(event.target.id);
    if (event.target.id === "start") {
        gameMode(gameModeInput.value);
        Player.getInstance().setName(playerNameInput.value);
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
    }
};
//#endregion

//#region - event listeners
gameStartButton.addEventListener('click', onClick);
gameResetButton.addEventListener('click', onClick);
// 
//#endregion
