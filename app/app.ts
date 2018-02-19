import { Game, Player, gameOptionsSection, gameStartButton, gameResetButton, gameSection, playerNameInput } from './data';
import { gameMode, gameModeInput } from './gameMode';
import { createGrid } from './tableGrid';
import { setMines, clearMines, writeTips } from './minesAndTips';
import { openEmptyElement, stopClick } from './emptyFlow';
import { preventTableMenu } from './helperFuncs';
import {startTimerHandler,stopTimerHandler, resetTimer,timerPlace} from './timer';


const mineIcon = "\uD83D\uDCA3"; // definisemo ikonicu za minu u nekom momentu
let clickCounter = 0; // follows clicks




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
        clickCounter = 0;
        resetTimer();
        timerPlace.textContent = "00 : 00 : 00";
        return "reset";
    }
};
//#endregion

//#region - checkMove() - proverava potez i preduzima dalje korake
const checkMove = (element: HTMLElement) => {
    const table = Game.getInstance().getGameTable();
    const attribute = element.getAttribute("data-mine");
    if (attribute === "\uD83D\uDCA3") {
        if (clickCounter === 1) {
            plantMinesAgain();
            element.addEventListener("click", onFieldClick);
            checkMove(element);
        }
        // document.getElementById(element.id).click();
        else {
            stopTimerHandler();
            element.textContent = attribute;
            alert("BOOOOOOM.....You're dead!");
            table.removeEventListener("click", onFieldClick);
            table.removeEventListener("mousedown", flagIt);
        }
    }
    else if (attribute === "") {
        openEmptyElement(<any>element);
        checkResult();
    }
    else {
        element.textContent = attribute;
        element.setAttribute("data-click", "1");
        checkResult();
    }
}
//#endregion

//#region - flagIt() - postavljanje zastave na desni klik
const flagIt = (event: any) => {
    let element = event.target;
    if (element.tagName === "TD") {
        if (event.which === 3) {
            let target = event.target;
            let flag = "\u2691";
            if (target.textContent === "") {
                target.textContent = flag;
            }
            else {
                target.textContent = "";
            }
            checkResult();
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

//#region - checkResult() - proverava rezultat
function checkResult() {
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
        alert("Congrats, you WON!");
        stopTimerHandler();
        table.removeEventListener("click", onFieldClick);
        table.removeEventListener("mousedown", flagIt);
    }
}
//#endregion

//#region onFieldClick() - definise raspored na klik
const onFieldClick = (event: any) => {
    let field = event.target;
    if (field.tagName === "TD") {
        field.addEventListener("click", stopClick);
        field.addEventListener("mousedown", stopClick);
        clickCounter++;
        if (clickCounter === 1) {startTimerHandler()};
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
    //set mines
    setMines(table, gameModeInfo, mineIcon);
    // // //set tips
    writeTips(table);
    // // //print table
    gameSection.appendChild(table);
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
            printGrid();
        }
    }
};
//#endregion

//#region - gameOptionsSection event listeners
gameOptionsSection.addEventListener('click', onClick);
//#endregion





























