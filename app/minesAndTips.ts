import { Game, Player } from './data';
import { defineSurrounding } from './tableGrid';
import { randomNumbersArray } from './helperFuncs';
//==============================MINES=================================================================
//#region createMines() - create mines based on gameMode
const createMines = (modeInfo: number[]): number[] => {// kreira mine i sortira ih po velicini
    let mines = randomNumbersArray(modeInfo[2], (modeInfo[0] * modeInfo[1])).sort((a, b) => { return a - b });
    console.log("Mines location: " + mines); // proveravamo poziciju mina // za dev potrebe
    return mines;
}
//#endregion

//#region - setMines() - set mines on table (bind to attribute data-mine)
const setMines = (table: HTMLElement, modeInfo: number[], mineIcon: any): void => {
    let mines: number[] = createMines(modeInfo);//kreiramo mine
    const allFields = table.getElementsByTagName("td"); // uzimamo sve td elemente iz tabele
    mines.forEach(mine => {  // postavljamo ikonu bomba na svaki td koji se poklapa sa nizom mina.
        allFields[(mine - 1)].setAttribute("data-mine", mineIcon); // -1 zbog razlike u poziciji polja u nizu allfields i pozicije mine
    });
}
//#endregion

//#region - clearMines() - clear mines from table
const clearMines = (table: HTMLElement): void => {
    const allFields = table.getElementsByTagName("td");
    allFields.forEach((field: HTMLTableDataCellElement) => {
        field.setAttribute('data-mine', '');
    });
}
//#endregion

//NAPOMENA data-mine - ako je bomba stavlja se ikona, ako nije stavlja se broj bombi u okruzenju

//==============================TIPS==================================================================

//#region - write tips based on mines on the given table
const writeTips = (table: HTMLTableElement): void => {
    const allFields = table.getElementsByTagName("td"); // selektujemo sva polja u datoj tabeli
    Array.prototype.forEach.call(allFields, field => { // za svako polje
        if (field.getAttribute("data-mine") === "") { // ako je element prazan (tj. nije mina, jer su mine vec postavljene na tabli)
            let minesNum = countMines(field); // proveravamo susedna polja i ispisujemo broj mina u okolini
            if (minesNum === 0) { field.setAttribute("data-mine", ""); field.setAttribute("data-empty", "1"); }// ako nije mina i nema u okruzenju upisujemo u data-empty 1;1 za true;
            else { field.setAttribute("data-mine", minesNum.toString()); field.setAttribute("data-empty", "0"); /*element.textContent = text; za dev potrebe*/ } //ako ima mina;data-empty ; 0 za false;
        }
    });
}

//#endregion

//#region - funkcija koja proverava polja u okruzenju
function countMines(field: HTMLTableCellElement): number { // prosledjujemo polje na osnovu kojeg vrsimo proveru i broj kolona zbog orijentacije
    const gameModeInfo = Game.getInstance().modeInfo(Player.getInstance().getGameMode());
    const numOfCols: number = gameModeInfo[1];
    let counter = 0; // brojac mina u okruzenju polja
    let surrounding = defineSurrounding(Game.getInstance().getGameTable(), field); // kreiramo okruzenje (pozivamo funkciju za to)
    surrounding.forEach(surField => { // proveravamo svako polje u okruzenju
        if (surField === null) { }// ako je polje van tabele, ignorisi
        else if (surField.getAttribute("data-mine") === "\uD83D\uDCA3") { // za svaku minu
            counter++; //dodaj jedan u brojac
        }
    });
    return counter; // cela funkcija vraca brojac tj. ukupa broj mina u okruzenju
}
//#endregion

export { setMines, clearMines, writeTips };