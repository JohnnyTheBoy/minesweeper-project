import { Game, Player } from './data';

//==============================TABLE GRID============================================================

//#region - creates table grid for given game mode
const createGrid = (rowsAndCols: number[]): void => {
    let table = document.createElement('table');
    let cellCounter = 1;
    for (let i = 0; i < rowsAndCols[0]; i++) {
        let row = document.createElement('tr');
        for (let j = 0; j < rowsAndCols[1]; j++) {
            let col = document.createElement('td');
            col.setAttribute("id", cellCounter + 'field');
            col.setAttribute("data-id", cellCounter + 'field');
            col.setAttribute("data-mine", "");
            col.setAttribute("data-empty", "");
            col.setAttribute("data-click", "");
            cellCounter++;
            row.appendChild(col);
        }
        table.appendChild(row);
    }
    Game.getInstance().setGameTable(table);
};
//#endregion


//==============================BORDERS===============================================================

//#region - creates left border for table grid
const createLeftBorder = (numOfRows: number, numOfCols: number) => {
    let leftBorderFields: number[] = [1];
    for (let i = 0; i < numOfRows - 1; i++) {
        let borderField = leftBorderFields[i] + numOfCols;
        leftBorderFields.push(borderField);
    }
    return leftBorderFields;
}
//#endregion

//#region - creates right border for table grid
const createRightBorder = (numOfRows: number, numOfCols: number) => {
    let rightBorderFields: number[] = [numOfCols];
    for (let i = 0; i < numOfRows - 1; i++) {
        let borderField = rightBorderFields[i] + numOfCols;
        rightBorderFields.push(borderField);
    }
    return rightBorderFields;
}
//#endregion


//==============================SURROUNDING===========================================================

//#region - defineSurrounding() - creates surrounding based on field position (based on id)

const defineSurrounding = (table: Element, element: HTMLElement) => { // definisemo okolna polja na osnovu datog polja i broja kolona tabele
    let surrounding;
    const id = parseInt(element.id);
    const gameModeInfo = Game.getInstance().modeInfo(Player.getInstance().getGameMode());
    const numOfRows = gameModeInfo[0];
    const numOfCols = gameModeInfo[1];

    //base surrounding
    const left = table.querySelector(`[id="${id - 1}field"]`);
    const upLeft = table.querySelector(`[id="${id - numOfCols - 1}field"]`);
    const up = table.querySelector(`[id="${id - numOfCols}field"]`);
    const upRight = table.querySelector(`[id="${id - numOfCols + 1}field"]`);
    const right = table.querySelector(`[id="${id + 1}field"]`);
    const rightDown = table.querySelector(`[id="${id + numOfCols + 1}field"]`);
    const down = table.querySelector(`[id="${id + numOfCols}field"]`);
    const downLeft = table.querySelector(`[id="${id + numOfCols - 1}field"]`);

    //create borders
    const leftBorder = createLeftBorder(numOfRows, numOfCols);
    const rightBorder = createRightBorder(numOfRows, numOfCols);

    //surrounding based on field-borders relation
    if (leftBorder.indexOf(id) !== -1) {
        surrounding = [up, upRight, right, rightDown, down];
    } else if (rightBorder.indexOf(id) !== -1) {
        surrounding = [left, upLeft, up, down, downLeft];
    } else {
        surrounding = [left, upLeft, up, upRight, right, rightDown, down, downLeft];
    }
    return surrounding;
}
//#endregion

//====================================================================================================


export { createGrid};