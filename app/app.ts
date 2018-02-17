import { Game, Player, gameOptionsSection, gameStartButton, gameResetButton, gameSection, playerNameInput } from './data';
import { gameMode, gameModeInput } from './gameMode';
import { createGrid } from './tableGrid';
import { setMines, clearMines, writeTips } from './minesAndTips';




const table = Game.getInstance().getGameTable();
const playerGameMode = Player.getInstance().getGameMode();
const gameModeInfo = Game.getInstance().modeInfo(playerGameMode);
const mineIcon = "\uD83D\uDCA3"; // definisemo ikonicu za minu u nekom momentu

//#region - printGrid() - creates full Grid and adds it to the document
const printGrid = (): void => {
    let gameModeInfo = gameMode(gameModeInput.value) as number[];
    //create table
    createGrid(gameModeInfo);
    const table = Game.getInstance().getGameTable();
    //set mines
    setMines(table, gameModeInfo, mineIcon);
    // // //set tips
    writeTips(table);
    // // //print table
    gameSection.appendChild(table);
    // //set listeners

};
//#endregion

//#region - manageInputs() - manage inputs on document based on event
const manageInputs = (event): string => {
    if (event.target.id === "start") {

        playerNameInput.setAttribute('disabled', 'true');
        gameModeInput.setAttribute('disabled', 'true');
        gameStartButton.setAttribute('disabled', 'true');
        gameResetButton.removeAttribute('disabled');
        return "start";
    }
    else if (event.target.id === "reset") {
        gameResetButton.setAttribute('disabled', 'true');
        gameStartButton.removeAttribute('disabled');
        gameModeInput.removeAttribute('disabled');
        gameModeInput.value = 'beginner';
        playerNameInput.removeAttribute('disabled');
        playerNameInput.value = "";
        gameSection.innerHTML = "";
        return "reset";
    }
};
//#endregion

//#region - onClick() - main function
const onClick = (event): void => {
    if (event.target.tagName === "BUTTON") {
        if (manageInputs(event) === 'start') {
            Player.getInstance().setName(playerNameInput.value);
            printGrid();
        }
    }
};
//#endregion

//#region - event listeners
gameOptionsSection.addEventListener('click', onClick);
//#endregion