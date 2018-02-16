import { gameMode, gameModeInput } from './gameMode';

//#region - selectors
const gameStartButton = <HTMLButtonElement>document.getElementById('start');
//#endregion



//#region - event listeners
gameStartButton.addEventListener('click', ()=>{gameMode(gameModeInput.value)});
//#endregion