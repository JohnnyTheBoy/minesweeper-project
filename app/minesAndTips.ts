import { Game, Player } from './data';
import { defineSurrounding } from './tableGrid';
import { randomNumbersArray } from './helperFuncs';
//==============================MINES=================================================================
//#region createMines() - create mines based on game mode
const createMines = (modeInfo: number[]): number[] => {// creates random number of mines and sorts them by size
    let mines = randomNumbersArray(modeInfo[2], (modeInfo[0] * modeInfo[1])).sort((a, b) => { return a - b });
    // console.log("Mines location: " + mines); // for dev purposes
    return mines;
}
//#endregion

//#region - setMines() - set mines on table
const setMines = (table: HTMLElement, modeInfo: number[], mineIcon: any): void => {
    let mines: number[] = createMines(modeInfo);
    const allFields = table.getElementsByTagName("td");
    mines.forEach(mine => { 
        allFields[(mine - 1)].setAttribute("data-mine", mineIcon);
    });
}
//#endregion

//#region - clearMines() - clear mines from table
const clearMines = (table: HTMLElement): void => {
    const allFields = table.getElementsByTagName("td");
    Array.prototype.forEach.call(allFields, (field: HTMLTableDataCellElement) => {
        field.setAttribute('data-mine', '');
    });
}
//#endregion

//#region - setMineIcon() - sets mine icon based on game mode
const setMineIcon = () => {
    let image = document.createElement('img');
    if (Player.getInstance().getGameMode() === 'beginner') {
        image.setAttribute('src', './images/mineB.png');
    } else if (Player.getInstance().getGameMode() === 'intermediate') {
        image.setAttribute('src', './images/mineI.png');
    } else {
        image.setAttribute('src', './images/mineE.png');
    }
    return image;
}
//#endregion

//#region - showMines() - show mines on grid
const showMines = (table, mineIcon) => {
    const allFields = table.getElementsByTagName("td");
    Array.prototype.forEach.call(allFields, (field: HTMLTableDataCellElement) => {
        if (field.getAttribute('data-mine') === mineIcon) {
            field.innerHTML = "";
            field.classList.add('empty');
            field.appendChild(setMineIcon());
        }
    });
};
//#endregion

//==============================TIPS==================================================================

//#region - writeTips() - write tips based on mines on the given table
const writeTips = (table: HTMLTableElement): void => {
    const allFields = table.getElementsByTagName("td");
    Array.prototype.forEach.call(allFields, field => {
        if (field.getAttribute("data-mine") === "") {
            let minesNum = countMines(field);
            if (minesNum === 0) { field.setAttribute("data-mine", ""); field.setAttribute("data-empty", "1"); }
            else { field.setAttribute("data-mine", minesNum.toString()); field.setAttribute("data-empty", "0"); }
        }
    });
}

//#endregion

//#region - countMines() - counts mines in surrounding
function countMines(field: HTMLTableCellElement): number {
    const gameModeInfo = Game.getInstance().modeInfo(Player.getInstance().getGameMode());
    const numOfCols: number = gameModeInfo[1];
    let counter = 0;
    let surrounding = defineSurrounding(Game.getInstance().getGameTable(), field);
    surrounding.forEach(surField => {
        if (surField === null) { }
        else if (surField.getAttribute("data-mine") === "\uD83D\uDCA3") {
            counter++;
        }
    });
    return counter;
}
//#endregion

export { setMines, clearMines, showMines, writeTips, setMineIcon };