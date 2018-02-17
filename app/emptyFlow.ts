import { Game, Player } from './data';
import { defineSurrounding } from './tableGrid';



//#region - stopClick() - stopira eventLIstener na elementu koji je kliknut
function stopClick(event: any) {
    event.stopPropagation();
}
//#endregion

//=====================EMPTY FLOW=========================================
//#region - main f

let openEmptyElement = (element: HTMLElement) => {// pokrece empty flow proveru
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

//#region - emptyCell()  // open field( za dev potrebe shows ^ in textContext) // checked OK!
const emptyCell = (element: HTMLElement) => {
    if (element !== null) {
        // let context = element.getAttribute("data-mine");

        element.setAttribute("data-empty", "");//ALERT brise se info o tome da li je prazna celija, proveriti zasto
        element.classList.add("empty");//css clasa da se oboji prazno polje
        // element.textContent = context;// ALERT ne potrebno u produkciji        // text = "^"; u dev svrhe
    }
}
//#endregion


//#region - checkEmptyFields() - proverava prazna polja u okruzenju i vraca niz skroz praznih polja
const checkEmptyFields = (fields: any) => {
    let emptyFields: HTMLTableCellElement[] = [];//array of blank empty fields
    fields.forEach((field: any) => {
        if (field === null) { }
        else {
            field.setAttribute("data-click", "1");//postavlja da je kliknuto
            // field.addEventListener("click", stopClick);//ukdida event
            // field.addEventListener("mousedown", stopClick);//ukida event
            let isEmpty = field.getAttribute("data-empty");
            let context = field.getAttribute("data-mine");
            if (isEmpty === "1") {// ako je polje skroz prazno
                emptyFields.push(field);
                field.classList.add("empty");
            }
            else { field.textContent = context; }// ako je polje prazno ali ima broj
        }
    });
    return emptyFields; // returning array of blank empty fields
}
//#endregion

//#region - firstEmptyFieldCheck() - First clicked empty element check, returns array of empty blank elements
const firstEmptyFieldCheck = (element: HTMLElement) => {//ispituje prvo prazno polje
    element.setAttribute("data-click", "1"); // postavlja da je kliknuto
    // element.addEventListener("click", stopClick);//stopira event click
    // element.addEventListener("mousedown", stopClick); // stopira event mousedown
    emptyCell(element); // prazni element i boji ga

    let surroundFields = defineSurrounding(Game.getInstance().getGameTable(), element);//kreira niz susednih polja
    surroundFields.forEach(field => { // za svako polje
        if (field !== null) {// koje je u okviru table
            field.setAttribute("data-click", ""); //brise info o kliknutom polju
        }
    });
    let emptyFields = checkEmptyFields(surroundFields);
    return emptyFields;
}
//#endregion
//==============================================================

export { openEmptyElement };