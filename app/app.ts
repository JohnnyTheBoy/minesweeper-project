import { Game, Player, gameOptionsSection, gameStartButton, gameResetButton, gameSection, playerNameInput } from './data';
import { gameMode, gameModeInput } from './gameMode';
import { createGrid } from './tableGrid';
import { setMines, clearMines, showMines, writeTips, setMineIcon } from './minesAndTips';
import { openEmptyElement, stopClick } from './emptyFlow';
import { preventTableMenu } from './helperFuncs';
import { startTimerHandler, stopTimerHandler, resetTimer, timerPlace, calcScore } from './timer';
import { handleRanking } from './ranking';
import { boom, gameOver, win, gameShow, gameGridSection } from './animation';


const mineIcon = "\uD83D\uDCA3"; // definisemo ikonicu za minu u nekom momentu
let clickCounter = 0; // follows clicks

//#region - manageInputs() - manage inputs on document, based on event
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
        gameShow();
        gameGridSection.innerHTML = "";
        clickCounter = 0;
        stopTimerHandler();
        resetTimer();
        timerPlace.textContent = "00 : 00 : 00";
        return "reset";
    }
};
//#endregion

//#region - checkMove() - check result of move that player made and decides what then
const checkMove = (element: HTMLElement) => {
    const table = Game.getInstance().getGameTable();
    const attribute = element.getAttribute("data-mine");
    if (attribute === "\uD83D\uDCA3") {
        if (clickCounter === 1) {
            plantMinesAgain();
            element.addEventListener("click", onFieldClick);
            checkMove(element);
        }
        else {
            let bomb = setMineIcon();
            element.classList.add('empty');
            stopTimerHandler();
            table.removeEventListener("click", onFieldClick);
            table.removeEventListener("mousedown", flagIt);
            element.appendChild(bomb);
            showMines(table, mineIcon);
            boom();
            table.classList.add('table');
            gameOver();
        }
    }
    else if (attribute === "") {
        openEmptyElement(<any>element);
        checkWin();
    }
    else {
        element.textContent = attribute;
        element.classList.add('clicked');
        element.setAttribute("data-click", "1");
        checkWin();
    }
}
//#endregion

//#region - flagIt() - puts flag on right click
const flagIt = (event: any) => {
    let element = event.target;
    if (element.tagName === "TD") {
        if (event.which === 3) {
            let flag = document.createElement('img');
            if (Player.getInstance().getGameMode() === 'beginner') {
                flag.setAttribute('src', './images/flagB.png');
            } else if (Player.getInstance().getGameMode() === 'intermediate') {
                flag.setAttribute('src', './images/flagI.png');
            } else { flag.setAttribute('src', './images/flagE.png'); }
            flag.classList.add('flag');

            if (element.innerHTML === "") {
                element.addEventListener("click", stopClick);
                element.appendChild(flag);
                element.classList.add('empty');
                checkWin();
            }
        }
    } else if (element.tagName === "IMG") {
        if (event.which === 3) {
            element.parentNode.classList.remove('empty');
            element.parentNode.addEventListener('click', onFieldClick);
            element.parentNode.innerHTML = "";

        }
    }
}

//#endregion

//#region - plantMinesAgain()
let plantMinesAgain = () => {
    const table = Game.getInstance().getGameTable();
    let gameModeInfo = gameMode(gameModeInput.value) as number[];
    clearMines(table);
    setMines(table, gameModeInfo, mineIcon);
    writeTips(table);
};
//#endregion

//#region - checkWin()
function checkWin() {
    const table = Game.getInstance().getGameTable();
    let gameModeInfo = gameMode(gameModeInput.value) as number[];
    let closed: any = [];
    let allFields = table.querySelectorAll("td");
    Array.prototype.forEach.call(allFields, (field: any) => {
        if (field.getAttribute("data-click", "1")) {
            closed.push(field);
        }
    });

    if ((closed.length === ((gameModeInfo[0] * gameModeInfo[1]) - gameModeInfo[2]))) {
        stopTimerHandler();
        Player.getInstance().setScore(calcScore());
        table.removeEventListener("click", onFieldClick);
        table.removeEventListener("mousedown", flagIt);
        handleRanking();
        win();
        table.classList.add('table');
    }
}
//#endregion

//#region onFieldClick() - what to do when player clicks on field
const onFieldClick = (event: any) => {
    let field = event.target;
    if (field.tagName === "TD") {
        field.addEventListener("click", stopClick);
        field.addEventListener("mousedown", stopClick);
        clickCounter++;
        if (clickCounter === 1) { startTimerHandler() };
        checkMove(field);
    }
};
//#endregion

//#region - printGrid() - creates full Grid and adds it to the document
const printGrid = (): void => {
    let gameModeInfo = gameMode(gameModeInput.value) as number[];
    //create table
    createGrid(gameModeInfo);
    const table = Game.getInstance().getGameTable();
    table.classList.add(Player.getInstance().getGameMode());
    //set mines
    setMines(table, gameModeInfo, mineIcon);
    // // //set tips
    writeTips(table);
    // // //print table
    gameGridSection.appendChild(table);
    // //set listeners
    table.addEventListener("contextmenu", preventTableMenu);
    table.addEventListener("mousedown", flagIt);
    table.addEventListener('click', onFieldClick);

};
//#endregion

//#region - onClick() - main function
const onClick = (event): void => {
    if (event.target.tagName === "BUTTON") {
        if (manageInputs(event) === 'start') {
            Player.getInstance().setName(playerNameInput.value);
            gameShow();
            printGrid();
            handleRanking();
        }
    }
};
//#endregion

//#region - gameOptionsSection event listeners
gameOptionsSection.addEventListener('click', onClick);
//#endregion





























