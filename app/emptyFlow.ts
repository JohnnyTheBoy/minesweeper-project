import { Game, Player } from './data';
import { defineSurrounding } from './tableGrid';



//#region - stopClick() - stopira eventLIstener na elementu koji je kliknut
function stopClick(event: any) {
    event.stopPropagation();
}
//#endregion

//=====================EMPTY FLOW=========================================
//#region - openEmptyElement() - flow function

let openEmptyElement = (element: HTMLTableDataCellElement) => {// pokrece empty flow proveru
    let emptyFields = firstEmptyFieldCheck(element);//proverava se prvo prazno polje i evidentiraju ostala prazna polja u okruzenju
    // console.log(emptyFields);
    let stopSearch = false;

    while (stopSearch == false) {
        if (emptyFields.length != 0) {
            let newMainArray: any[] = [];

            emptyFields.forEach(field => {// za svako prazno polje
                emptyCell(field);// totalno ga praznimo
                let subArray = defineSurrounding(Game.getInstance().getGameTable(), field);//proveravamo okruzenje tog polja
                subArray.forEach((element) => {//za svako polje iz okruzenja tog polja
                    if (element !== null) {//ako je element u okviru table
                        element.setAttribute("data-click", "1");//postavljamo da je kliknuto
                        element.addEventListener("click", stopClick);//brisemo event
                        element.addEventListener("mousedown", stopClick);// brisemo event
                        if (newMainArray.indexOf(element) !== -1) { }
                        else { newMainArray.push(element) }
                        let context = element.getAttribute("data-id");
                        if (context === '') {
                            emptyCell(<any>element);
                        }
                    }
                });
                newMainArray = checkEmptyFields(newMainArray);
                // console.log(newMainArray);
                emptyFields = newMainArray;
            });
            stopSearch = false;
        }
        else {
            stopSearch = true;
            break;
        }

    }
}
//#endregion

//#region - emptyCell()
const emptyCell = (element: HTMLTableDataCellElement): void => {
    if (element !== null) {
        element.setAttribute("data-empty", "");//ALERT brise se info o tome da li je prazna celija, proveriti zasto
        element.classList.add("empty");//css clasa da se oboji prazno polje
    }
}
//#endregion

//#region - checkEmptyFields() - check empty fields if it is totally empty or its a tip
const checkEmptyFields = (fields: any) => {
    let checkedEmptyFields: HTMLTableDataCellElement[] = [];
    fields.forEach(field => {
        if (field === null) { }
        else {
            field.setAttribute("data-click", "1");//set field as clicked
            field.addEventListener("click", stopClick);//ukdida event
            field.addEventListener("mousedown", stopClick);//ukida event
            const isEmpty = field.getAttribute("data-empty");
            const context = field.getAttribute("data-mine");
            if (isEmpty === "1") {// if field is totally empty
                checkedEmptyFields.push(field);
                field.classList.add("empty");
            }
            else { field.textContent = context; }// if its tip, show it
        }
    });
    return checkedEmptyFields; // returning array of totally empty fields
}
//#endregion

//#region - firstEmptyFieldCheck() - First clicked empty element check, returns array of empty blank elements
const firstEmptyFieldCheck = (field: HTMLTableDataCellElement) => {//checking first empty clicked field
    field.setAttribute("data-click", "1"); // set clicked
    field.addEventListener("click", stopClick);//stopira event click
    field.addEventListener("mousedown", stopClick); // stopira event mousedown
    emptyCell(field); // remove empty attribute, color field

    const surroundFields = defineSurrounding(Game.getInstance().getGameTable(), field);//kreira niz susednih polja
    const emptyFields = checkEmptyFields(surroundFields);
    return emptyFields;
}
//#endregion
//==============================================================

export { openEmptyElement, stopClick };