/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Game; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Player; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return gameStartButton; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return gameResetButton; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return playerNameInput; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return gameOptionsSection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return gameSection; });
//#region - selectors
const gameStartButton = document.getElementById('start');
const gameResetButton = document.getElementById('reset');
const playerNameInput = document.getElementById('username');
const gameOptionsSection = document.getElementById('gameOptions');
const gameSection = document.getElementById('game');
//#endregion
playerNameInput.value = "";
//#region - Game singleton class definition
class Game {
    constructor() {
        this._mode = {
            beginner: [9, 9, 10],
            intermediate: [16, 16, 40],
            expert: [16, 30, 99],
            custom: [0, 0, 0]
        };
        if (Game._instance) {
            throw new Error("Error, wrong use of Game instance!");
        }
        Game._instance = this;
    }
    static getInstance() {
        return Game._instance;
    }
    modeInfo(modeName) {
        return this._mode[modeName];
    }
    setCustomMode(info) {
        this._mode.custom = info;
        console.log(`Custom mode set to ${this._mode.custom}`);
    }
    setGameTable(element) {
        this._gameTable = element;
        console.log(`Table created`);
    }
    getGameTable() {
        return this._gameTable;
    }
}
Game._instance = new Game();
//#endregion
//#region - Player - singleton class definition
class Player {
    constructor() {
        this._name = "";
        this._gameMode = "none";
        if (Player._instance) {
            throw new Error("Error, wrong use of Player instance!");
        }
        Player._instance = this;
    }
    static getInstance() {
        return Player._instance;
    }
    getName() {
        return this._name;
    }
    setName(value) {
        this._name = value;
        console.log(`Players name set to: ${this._name}`);
    }
    getGameMode() {
        return this._gameMode;
    }
    setGameMode(value) {
        this._gameMode = value;
    }
    setScore(value) {
        this._score = value;
    }
    getScore() {
        return this._score;
    }
}
Player._instance = new Player();
//#endregion



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return createGrid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return defineSurrounding; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__data__ = __webpack_require__(0);

//==============================TABLE GRID============================================================
//#region - creates table grid for given game mode
const createGrid = (rowsAndCols) => {
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
    __WEBPACK_IMPORTED_MODULE_0__data__["a" /* Game */].getInstance().setGameTable(table);
};
//#endregion
//==============================BORDERS===============================================================
//#region - creates left border for table grid
const createLeftBorder = (numOfRows, numOfCols) => {
    let leftBorderFields = [1];
    for (let i = 0; i < numOfRows - 1; i++) {
        let borderField = leftBorderFields[i] + numOfCols;
        leftBorderFields.push(borderField);
    }
    return leftBorderFields;
};
//#endregion
//#region - creates right border for table grid
const createRightBorder = (numOfRows, numOfCols) => {
    let rightBorderFields = [numOfCols];
    for (let i = 0; i < numOfRows - 1; i++) {
        let borderField = rightBorderFields[i] + numOfCols;
        rightBorderFields.push(borderField);
    }
    return rightBorderFields;
};
//#endregion
//==============================SURROUNDING===========================================================
//#region - defineSurrounding() - creates surrounding based on field position (based on id)
const defineSurrounding = (table, element) => {
    let surrounding;
    const id = parseInt(element.id);
    const gameModeInfo = __WEBPACK_IMPORTED_MODULE_0__data__["a" /* Game */].getInstance().modeInfo(__WEBPACK_IMPORTED_MODULE_0__data__["b" /* Player */].getInstance().getGameMode());
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
    }
    else if (rightBorder.indexOf(id) !== -1) {
        surrounding = [left, upLeft, up, down, downLeft];
    }
    else {
        surrounding = [left, upLeft, up, upRight, right, rightDown, down, downLeft];
    }
    return surrounding;
};
//#endregion
//====================================================================================================



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return randomNumbersArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return preventTableMenu; });
//==============================RANDOM FUNCTIONS======================================================
//#region  - Creates random number for passed min and max
const randomNumber = (maxNum, minNum = 1) => {
    return Math.floor(Math.random() * (maxNum - minNum + 1) + minNum);
};
//#endregion
//#region  - array with specified number of random numbers
const randomNumbersArray = (arrLength, maxNum, minNum = 1) => {
    let array = [];
    for (let i = 0; i < arrLength; i++) {
        let newNum = randomNumber(maxNum, minNum);
        while (array.indexOf(newNum) !== -1) {
            newNum = randomNumber(minNum, maxNum);
        }
        array.push(newNum);
    }
    return array;
};
//#endregion
//====================================================================================================
//#region - preventMenu() - nema desni klik meni na tabli
const preventTableMenu = (event) => {
    let clickedPlace = event.target;
    if (clickedPlace.tagName === "TD" || clickedPlace.tagName === "TABLE") {
        event.preventDefault();
    }
};
//#endregion



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__data__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__gameMode__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tableGrid__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__minesAndTips__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__emptyFlow__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__helperFuncs__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__timer__ = __webpack_require__(7);







const mineIcon = "\uD83D\uDCA3"; // definisemo ikonicu za minu u nekom momentu
let clickCounter = 0; // follows clicks
//#region - manageInputs() - manage inputs on document based on event
const manageInputs = (event) => {
    if (event.target.id === "start") {
        __WEBPACK_IMPORTED_MODULE_0__data__["g" /* playerNameInput */].setAttribute('disabled', 'true');
        __WEBPACK_IMPORTED_MODULE_1__gameMode__["b" /* gameModeInput */].setAttribute('disabled', 'true');
        __WEBPACK_IMPORTED_MODULE_0__data__["f" /* gameStartButton */].setAttribute('disabled', 'true');
        __WEBPACK_IMPORTED_MODULE_0__data__["d" /* gameResetButton */].removeAttribute('disabled');
        return "start";
    }
    else if (event.target.id === "reset") {
        __WEBPACK_IMPORTED_MODULE_0__data__["d" /* gameResetButton */].setAttribute('disabled', 'true');
        __WEBPACK_IMPORTED_MODULE_0__data__["f" /* gameStartButton */].removeAttribute('disabled');
        __WEBPACK_IMPORTED_MODULE_1__gameMode__["b" /* gameModeInput */].removeAttribute('disabled');
        __WEBPACK_IMPORTED_MODULE_1__gameMode__["b" /* gameModeInput */].value = 'beginner';
        __WEBPACK_IMPORTED_MODULE_0__data__["g" /* playerNameInput */].removeAttribute('disabled');
        __WEBPACK_IMPORTED_MODULE_0__data__["g" /* playerNameInput */].value = "";
        __WEBPACK_IMPORTED_MODULE_0__data__["e" /* gameSection */].innerHTML = "";
        clickCounter = 0;
        Object(__WEBPACK_IMPORTED_MODULE_6__timer__["a" /* resetTimer */])();
        __WEBPACK_IMPORTED_MODULE_6__timer__["d" /* timerPlace */].textContent = "00 : 00 : 00";
        return "reset";
    }
};
//#endregion
//#region - checkMove() - proverava potez i preduzima dalje korake
const checkMove = (element) => {
    const table = __WEBPACK_IMPORTED_MODULE_0__data__["a" /* Game */].getInstance().getGameTable();
    const attribute = element.getAttribute("data-mine");
    if (attribute === "\uD83D\uDCA3") {
        if (clickCounter === 1) {
            plantMinesAgain();
            element.addEventListener("click", onFieldClick);
            checkMove(element);
        }
        else {
            Object(__WEBPACK_IMPORTED_MODULE_6__timer__["c" /* stopTimerHandler */])();
            element.textContent = attribute;
            alert("BOOOOOOM.....You're dead!");
            table.removeEventListener("click", onFieldClick);
            table.removeEventListener("mousedown", flagIt);
        }
    }
    else if (attribute === "") {
        Object(__WEBPACK_IMPORTED_MODULE_4__emptyFlow__["a" /* openEmptyElement */])(element);
        checkResult();
    }
    else {
        element.textContent = attribute;
        element.setAttribute("data-click", "1");
        checkResult();
    }
};
//#endregion
//#region - flagIt() - postavljanje zastave na desni klik
const flagIt = (event) => {
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
};
//#endregion
//#region - plantMinesAgain()
let plantMinesAgain = () => {
    const table = __WEBPACK_IMPORTED_MODULE_0__data__["a" /* Game */].getInstance().getGameTable();
    let gameModeInfo = Object(__WEBPACK_IMPORTED_MODULE_1__gameMode__["a" /* gameMode */])(__WEBPACK_IMPORTED_MODULE_1__gameMode__["b" /* gameModeInput */].value);
    Object(__WEBPACK_IMPORTED_MODULE_3__minesAndTips__["a" /* clearMines */])(table);
    Object(__WEBPACK_IMPORTED_MODULE_3__minesAndTips__["b" /* setMines */])(table, gameModeInfo, mineIcon);
    Object(__WEBPACK_IMPORTED_MODULE_3__minesAndTips__["c" /* writeTips */])(table);
};
//#endregion
//#region - checkResult() - proverava rezultat
function checkResult() {
    const table = __WEBPACK_IMPORTED_MODULE_0__data__["a" /* Game */].getInstance().getGameTable();
    let gameModeInfo = Object(__WEBPACK_IMPORTED_MODULE_1__gameMode__["a" /* gameMode */])(__WEBPACK_IMPORTED_MODULE_1__gameMode__["b" /* gameModeInput */].value);
    let closed = [];
    let allFields = table.querySelectorAll("td");
    Array.prototype.forEach.call(allFields, (field) => {
        if (field.getAttribute("data-click", "1")) {
            closed.push(field);
        }
    });
    if ((closed.length === ((gameModeInfo[0] * gameModeInfo[1]) - gameModeInfo[2]))) {
        alert("Congrats, you WON!");
        Object(__WEBPACK_IMPORTED_MODULE_6__timer__["c" /* stopTimerHandler */])();
        table.removeEventListener("click", onFieldClick);
        table.removeEventListener("mousedown", flagIt);
    }
}
//#endregion
//#region onFieldClick() - definise raspored na klik
const onFieldClick = (event) => {
    let field = event.target;
    if (field.tagName === "TD") {
        field.addEventListener("click", __WEBPACK_IMPORTED_MODULE_4__emptyFlow__["b" /* stopClick */]);
        field.addEventListener("mousedown", __WEBPACK_IMPORTED_MODULE_4__emptyFlow__["b" /* stopClick */]);
        clickCounter++;
        if (clickCounter === 1) {
            Object(__WEBPACK_IMPORTED_MODULE_6__timer__["b" /* startTimerHandler */])();
        }
        ;
        checkMove(field);
    }
};
//#endregion
//#region - printGrid() - creates full Grid and adds it to the document
const printGrid = () => {
    let gameModeInfo = Object(__WEBPACK_IMPORTED_MODULE_1__gameMode__["a" /* gameMode */])(__WEBPACK_IMPORTED_MODULE_1__gameMode__["b" /* gameModeInput */].value);
    //create table
    Object(__WEBPACK_IMPORTED_MODULE_2__tableGrid__["a" /* createGrid */])(gameModeInfo);
    const table = __WEBPACK_IMPORTED_MODULE_0__data__["a" /* Game */].getInstance().getGameTable();
    //set mines
    Object(__WEBPACK_IMPORTED_MODULE_3__minesAndTips__["b" /* setMines */])(table, gameModeInfo, mineIcon);
    // // //set tips
    Object(__WEBPACK_IMPORTED_MODULE_3__minesAndTips__["c" /* writeTips */])(table);
    // // //print table
    __WEBPACK_IMPORTED_MODULE_0__data__["e" /* gameSection */].appendChild(table);
    // //set listeners
    table.addEventListener("contextmenu", __WEBPACK_IMPORTED_MODULE_5__helperFuncs__["a" /* preventTableMenu */]);
    table.addEventListener("mousedown", flagIt);
    table.addEventListener('click', onFieldClick);
};
//#endregion
//#region - onClick() - main function
const onClick = (event) => {
    if (event.target.tagName === "BUTTON") {
        if (manageInputs(event) === 'start') {
            __WEBPACK_IMPORTED_MODULE_0__data__["b" /* Player */].getInstance().setName(__WEBPACK_IMPORTED_MODULE_0__data__["g" /* playerNameInput */].value);
            printGrid();
        }
    }
};
//#endregion
//#region - gameOptionsSection event listeners
__WEBPACK_IMPORTED_MODULE_0__data__["c" /* gameOptionsSection */].addEventListener('click', onClick);
//#endregion


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return gameMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return gameModeInput; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__data__ = __webpack_require__(0);

//#region - selectors
const customRowsInput = document.getElementById('customRows');
const customColsInput = document.getElementById('customCols');
const customMinesInput = document.getElementById('customMines');
const gameModeInput = document.getElementById('gameMode');
const customModeOptions = document.getElementById('customModeOptions');
//#endregion
//#region - getCustomProps() - gets custom properties from user input
const getCustomProps = () => {
    let customProps = [
        parseInt(customRowsInput.value),
        parseInt(customColsInput.value),
        parseInt(customMinesInput.value),
    ];
    return customProps;
};
//#endregion
//#region - displayCustomModeOpts() - hides or shows div with custom game options in document
let displayCustomModeOptions = () => {
    if (gameModeInput.value === "custom") {
        customModeOptions.classList.remove('hidden');
    }
    else {
        customModeOptions.classList.add('hidden');
    }
};
//#endregion
//#region - customInputValidation() - custom game mode input validation
const customInputValidation = (modeInfo) => {
    if (modeInfo[2] >= modeInfo[0] * modeInfo[1]) {
        alert("Can't have more mines than fields");
        return false;
    }
    return true;
};
//#endregion
//#region - gameMode() - game mode switcher
const gameMode = (mode) => {
    switch (mode) {
        case "beginner":
            console.log("Game mode: Beginner 9x9 table with 10 mines");
            __WEBPACK_IMPORTED_MODULE_0__data__["b" /* Player */].getInstance().setGameMode(mode);
            return __WEBPACK_IMPORTED_MODULE_0__data__["a" /* Game */].getInstance().modeInfo(mode);
        case "intermediate":
            console.log("Game mode: Intermediate 16x16 table with 40 mines");
            __WEBPACK_IMPORTED_MODULE_0__data__["b" /* Player */].getInstance().setGameMode(mode);
            return __WEBPACK_IMPORTED_MODULE_0__data__["a" /* Game */].getInstance().modeInfo(mode);
        case "expert":
            console.log("Game mode: Expert 16x30 table with 99 mines");
            __WEBPACK_IMPORTED_MODULE_0__data__["b" /* Player */].getInstance().setGameMode(mode);
            return __WEBPACK_IMPORTED_MODULE_0__data__["a" /* Game */].getInstance().modeInfo(mode);
        case "custom":
            __WEBPACK_IMPORTED_MODULE_0__data__["b" /* Player */].getInstance().setGameMode(mode);
            if (customInputValidation(getCustomProps()) === false) {
                return gameMode("Validation");
            }
            __WEBPACK_IMPORTED_MODULE_0__data__["a" /* Game */].getInstance().setCustomMode(getCustomProps());
            console.log(`Game mode: Custom ${__WEBPACK_IMPORTED_MODULE_0__data__["a" /* Game */].getInstance().modeInfo(mode)[0]}x${__WEBPACK_IMPORTED_MODULE_0__data__["a" /* Game */].getInstance().modeInfo(mode)[1]} table with ${__WEBPACK_IMPORTED_MODULE_0__data__["a" /* Game */].getInstance().modeInfo(mode)[2]} mine(s)`);
            return __WEBPACK_IMPORTED_MODULE_0__data__["a" /* Game */].getInstance().modeInfo(mode);
        default:
            if (mode === "Validation") {
                console.error("Validation issue");
                return "error!";
            }
            else {
                console.error('There is no game mode with that number!');
                return "error!";
            }
    }
};
//#endregion
//#region - event listenerns
gameModeInput.value = "beginner";
gameModeInput.addEventListener('change', displayCustomModeOptions);
//#endregion



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return setMines; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return clearMines; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return writeTips; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__data__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tableGrid__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helperFuncs__ = __webpack_require__(2);



//==============================MINES=================================================================
//#region createMines() - create mines based on gameMode
const createMines = (modeInfo) => {
    let mines = Object(__WEBPACK_IMPORTED_MODULE_2__helperFuncs__["b" /* randomNumbersArray */])(modeInfo[2], (modeInfo[0] * modeInfo[1])).sort((a, b) => { return a - b; });
    console.log("Mines location: " + mines); // proveravamo poziciju mina // za dev potrebe
    return mines;
};
//#endregion
//#region - setMines() - set mines on table (bind to attribute data-mine)
const setMines = (table, modeInfo, mineIcon) => {
    let mines = createMines(modeInfo); //kreiramo mine
    const allFields = table.getElementsByTagName("td"); // uzimamo sve td elemente iz tabele
    mines.forEach(mine => {
        allFields[(mine - 1)].setAttribute("data-mine", mineIcon); // -1 zbog razlike u poziciji polja u nizu allfields i pozicije mine
    });
};
//#endregion
//#region - clearMines() - clear mines from table
const clearMines = (table) => {
    const allFields = table.getElementsByTagName("td");
    Array.prototype.forEach.call(allFields, (field) => {
        field.setAttribute('data-mine', '');
    });
};
//#endregion
//NAPOMENA data-mine - ako je bomba stavlja se ikona, ako nije stavlja se broj bombi u okruzenju
//==============================TIPS==================================================================
//#region - write tips based on mines on the given table
const writeTips = (table) => {
    const allFields = table.getElementsByTagName("td"); // selektujemo sva polja u datoj tabeli
    Array.prototype.forEach.call(allFields, field => {
        if (field.getAttribute("data-mine") === "") {
            let minesNum = countMines(field); // proveravamo susedna polja i ispisujemo broj mina u okolini
            if (minesNum === 0) {
                field.setAttribute("data-mine", "");
                field.setAttribute("data-empty", "1");
            } // ako nije mina i nema u okruzenju upisujemo u data-empty 1;1 za true;
            else {
                field.setAttribute("data-mine", minesNum.toString());
                field.setAttribute("data-empty", "0"); /*element.textContent = text; za dev potrebe*/
            } //ako ima mina;data-empty ; 0 za false;
        }
    });
};
//#endregion
//#region - funkcija koja proverava polja u okruzenju
function countMines(field) {
    const gameModeInfo = __WEBPACK_IMPORTED_MODULE_0__data__["a" /* Game */].getInstance().modeInfo(__WEBPACK_IMPORTED_MODULE_0__data__["b" /* Player */].getInstance().getGameMode());
    const numOfCols = gameModeInfo[1];
    let counter = 0; // brojac mina u okruzenju polja
    let surrounding = Object(__WEBPACK_IMPORTED_MODULE_1__tableGrid__["b" /* defineSurrounding */])(__WEBPACK_IMPORTED_MODULE_0__data__["a" /* Game */].getInstance().getGameTable(), field); // kreiramo okruzenje (pozivamo funkciju za to)
    surrounding.forEach(surField => {
        if (surField === null) { } // ako je polje van tabele, ignorisi
        else if (surField.getAttribute("data-mine") === "\uD83D\uDCA3") {
            counter++; //dodaj jedan u brojac
        }
    });
    return counter; // cela funkcija vraca brojac tj. ukupa broj mina u okruzenju
}
//#endregion



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return openEmptyElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return stopClick; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__data__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tableGrid__ = __webpack_require__(1);


//#region - stopClick() - stopira eventLIstener na elementu koji je kliknut
function stopClick(event) {
    event.stopPropagation();
}
//#endregion
//=====================EMPTY FLOW=========================================
//#region - openEmptyElement() - flow function
let openEmptyElement = (element) => {
    let emptyFields = firstEmptyFieldCheck(element); //proverava se prvo prazno polje i evidentiraju ostala prazna polja u okruzenju
    // console.log(emptyFields);
    let stopSearch = false;
    while (stopSearch == false) {
        if (emptyFields.length != 0) {
            let newMainArray = [];
            emptyFields.forEach(field => {
                emptyCell(field); // totalno ga praznimo
                let subArray = Object(__WEBPACK_IMPORTED_MODULE_1__tableGrid__["b" /* defineSurrounding */])(__WEBPACK_IMPORTED_MODULE_0__data__["a" /* Game */].getInstance().getGameTable(), field); //proveravamo okruzenje tog polja
                subArray.forEach((element) => {
                    if (element !== null) {
                        element.setAttribute("data-click", "1"); //postavljamo da je kliknuto
                        element.addEventListener("click", stopClick); //brisemo event
                        element.addEventListener("mousedown", stopClick); // brisemo event
                        if (newMainArray.indexOf(element) !== -1) { }
                        else {
                            newMainArray.push(element);
                        }
                        let context = element.getAttribute("data-id");
                        if (context === '') {
                            emptyCell(element);
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
};
//#endregion
//#region - emptyCell()
const emptyCell = (element) => {
    if (element !== null) {
        element.setAttribute("data-empty", ""); //ALERT brise se info o tome da li je prazna celija, proveriti zasto
        element.classList.add("empty"); //css clasa da se oboji prazno polje
    }
};
//#endregion
//#region - checkEmptyFields() - check empty fields if it is totally empty or its a tip
const checkEmptyFields = (fields) => {
    let checkedEmptyFields = [];
    fields.forEach(field => {
        if (field === null) { }
        else {
            field.setAttribute("data-click", "1"); //set field as clicked
            field.addEventListener("click", stopClick); //ukdida event
            field.addEventListener("mousedown", stopClick); //ukida event
            const isEmpty = field.getAttribute("data-empty");
            const context = field.getAttribute("data-mine");
            if (isEmpty === "1") {
                checkedEmptyFields.push(field);
                field.classList.add("empty");
            }
            else {
                field.textContent = context;
            } // if its tip, show it
        }
    });
    return checkedEmptyFields; // returning array of totally empty fields
};
//#endregion
//#region - firstEmptyFieldCheck() - First clicked empty element check, returns array of empty blank elements
const firstEmptyFieldCheck = (field) => {
    field.setAttribute("data-click", "1"); // set clicked
    field.addEventListener("click", stopClick); //stopira event click
    field.addEventListener("mousedown", stopClick); // stopira event mousedown
    emptyCell(field); // remove empty attribute, color field
    const surroundFields = Object(__WEBPACK_IMPORTED_MODULE_1__tableGrid__["b" /* defineSurrounding */])(__WEBPACK_IMPORTED_MODULE_0__data__["a" /* Game */].getInstance().getGameTable(), field); //kreira niz susednih polja
    const emptyFields = checkEmptyFields(surroundFields);
    return emptyFields;
};
//#endregion
//==============================================================



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return startTimerHandler; });
/* unused harmony export stopTimer */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return resetTimer; });
/* unused harmony export getStringTime */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return timerPlace; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return stopTimerHandler; });
/* unused harmony export getSeconds */
let timer = {
    time: {
        hours: 0,
        minutes: 0,
        seconds: 0
    },
    interval: 1,
    timeIncrement: () => {
        if (timer.time.seconds < 59) {
            timer.time.seconds++;
        }
        else if (timer.time.seconds === 59 && timer.time.minutes < 59) {
            timer.time.seconds = 0, timer.time.minutes++;
        }
        else if (timer.time.seconds === 59 && timer.time.minutes === 59) {
            timer.time.seconds = 0, timer.time.minutes = 0, timer.time.hours++;
        }
    }
};
let getSeconds = () => {
    return timer.time.seconds + (timer.time.minutes * 60) + (timer.time.hours * 360);
};
let getStringTime = () => {
    let prevTime = [timer.time.hours, timer.time.minutes, timer.time.seconds];
    let currTime = prevTime.map((timeElement) => { if (timeElement < 10) {
        return "0" + timeElement;
    }
    else {
        return timeElement;
    } });
    return `${currTime[0]} : ${currTime[1]} : ${currTime[2]}`;
};
let startTimer = (step = 1) => {
    timer.interval = setInterval(timer.timeIncrement, step * 1000);
};
let stopTimer = () => {
    clearInterval(timer.interval);
};
let resetTimer = () => {
    for (let element in timer.time) {
        timer.time[element] = 0;
    }
    ;
};
let stringInterval = 0; // za ispis string vremena
const timerPlace = document.getElementById('timerPlace');
let startTimerHandler = () => {
    startTimer();
    stringInterval = setInterval(() => { timerPlace.textContent = getStringTime(); }, 100);
};
let stopTimerHandler = () => {
    stopTimer();
    clearInterval(stringInterval);
};



/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMTI1YjY3MWZmODVkYzdjYzFkODQiLCJ3ZWJwYWNrOi8vLy4vYXBwL2RhdGEudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3RhYmxlR3JpZC50cyIsIndlYnBhY2s6Ly8vLi9hcHAvaGVscGVyRnVuY3MudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2FwcC50cyIsIndlYnBhY2s6Ly8vLi9hcHAvZ2FtZU1vZGUudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwL21pbmVzQW5kVGlwcy50cyIsIndlYnBhY2s6Ly8vLi9hcHAvZW1wdHlGbG93LnRzIiwid2VicGFjazovLy8uL2FwcC90aW1lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDN0RBO0FBQUEscUJBQXFCO0FBQ3JCLE1BQU0sZUFBZSxHQUFzQixRQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzVFLE1BQU0sZUFBZSxHQUFzQixRQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzVFLE1BQU0sZUFBZSxHQUFxQixRQUFRLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQzlFLE1BQU0sa0JBQWtCLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUNsRSxNQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3BELFlBQVk7QUFFWixlQUFlLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUkzQiwyQ0FBMkM7QUFDM0M7SUFhSTtRQVRRLFVBQUssR0FBRztZQUNaLFFBQVEsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ3BCLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO1lBQzFCLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO1lBQ3BCLE1BQU0sRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ3BCLENBQUM7UUFLRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsb0NBQW9DLENBQUM7UUFBQyxDQUFDO1FBQzdFLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0lBQzFCLENBQUM7SUFFTSxNQUFNLENBQUMsV0FBVztRQUNyQixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBRU0sUUFBUSxDQUFDLFFBQWdCO1FBQzVCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFTSxhQUFhLENBQUMsSUFBYztRQUMvQixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFTSxZQUFZLENBQUMsT0FBTztRQUN2QixJQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQztRQUMxQixPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFTSxZQUFZO1FBQ2YsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDM0IsQ0FBQzs7QUFwQ2MsY0FBUyxHQUFTLElBQUksSUFBSSxFQUFFLENBQUM7QUFzQ2hELFlBQVk7QUFFWiwrQ0FBK0M7QUFDL0M7SUFPSTtRQUpRLFVBQUssR0FBVyxFQUFFLENBQUM7UUFDbkIsY0FBUyxHQUFXLE1BQU0sQ0FBQztRQUkvQixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsc0NBQXNDLENBQUM7UUFBQyxDQUFDO1FBQ2pGLE1BQU0sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0lBQzVCLENBQUM7SUFFTSxNQUFNLENBQUMsV0FBVztRQUNyQixNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztJQUM1QixDQUFDO0lBQ0QsT0FBTztRQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFDRCxPQUFPLENBQUMsS0FBYTtRQUNqQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDckQsQ0FBQztJQUVELFdBQVc7UUFDUCxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBRUQsV0FBVyxDQUFDLEtBQWE7UUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDM0IsQ0FBQztJQUVELFFBQVEsQ0FBQyxLQUFLO1FBQ1YsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDeEIsQ0FBQztJQUVELFFBQVE7UUFDSixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDOztBQW5DYyxnQkFBUyxHQUFXLElBQUksTUFBTSxFQUFFLENBQUM7QUFxQ3BELFlBQVk7QUFFZ0c7Ozs7Ozs7Ozs7O0FDakd0RTtBQUV0QyxzR0FBc0c7QUFFdEcsa0RBQWtEO0FBQ2xELE1BQU0sVUFBVSxHQUFHLENBQUMsV0FBcUIsRUFBUSxFQUFFO0lBQy9DLElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDNUMsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFDO0lBQ3BCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7UUFDdEMsSUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ3RDLElBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkMsR0FBRyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsV0FBVyxHQUFHLE9BQU8sQ0FBQyxDQUFDO1lBQzlDLEdBQUcsQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLFdBQVcsR0FBRyxPQUFPLENBQUMsQ0FBQztZQUNuRCxHQUFHLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNsQyxHQUFHLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNuQyxHQUFHLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNuQyxXQUFXLEVBQUUsQ0FBQztZQUNkLEdBQUcsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDekIsQ0FBQztRQUNELEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUNELG1EQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzNDLENBQUMsQ0FBQztBQUNGLFlBQVk7QUFHWixzR0FBc0c7QUFFdEcsOENBQThDO0FBQzlDLE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQyxTQUFpQixFQUFFLFNBQWlCLEVBQUUsRUFBRTtJQUM5RCxJQUFJLGdCQUFnQixHQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7UUFDckMsSUFBSSxXQUFXLEdBQUcsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDO1FBQ2xELGdCQUFnQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBQ0QsTUFBTSxDQUFDLGdCQUFnQixDQUFDO0FBQzVCLENBQUM7QUFDRCxZQUFZO0FBRVosK0NBQStDO0FBQy9DLE1BQU0saUJBQWlCLEdBQUcsQ0FBQyxTQUFpQixFQUFFLFNBQWlCLEVBQUUsRUFBRTtJQUMvRCxJQUFJLGlCQUFpQixHQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDOUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7UUFDckMsSUFBSSxXQUFXLEdBQUcsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDO1FBQ25ELGlCQUFpQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBQ0QsTUFBTSxDQUFDLGlCQUFpQixDQUFDO0FBQzdCLENBQUM7QUFDRCxZQUFZO0FBR1osc0dBQXNHO0FBRXRHLDJGQUEyRjtBQUUzRixNQUFNLGlCQUFpQixHQUFHLENBQUMsS0FBYyxFQUFFLE9BQW9CLEVBQUUsRUFBRTtJQUMvRCxJQUFJLFdBQVcsQ0FBQztJQUNoQixNQUFNLEVBQUUsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2hDLE1BQU0sWUFBWSxHQUFHLG1EQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDLHFEQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztJQUNyRixNQUFNLFNBQVMsR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEMsTUFBTSxTQUFTLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRWxDLGtCQUFrQjtJQUNsQixNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDMUQsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsR0FBRyxTQUFTLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN4RSxNQUFNLEVBQUUsR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxHQUFHLFNBQVMsU0FBUyxDQUFDLENBQUM7SUFDaEUsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsR0FBRyxTQUFTLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN6RSxNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDM0QsTUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsR0FBRyxTQUFTLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMzRSxNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxHQUFHLFNBQVMsU0FBUyxDQUFDLENBQUM7SUFDbEUsTUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsR0FBRyxTQUFTLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUUxRSxnQkFBZ0I7SUFDaEIsTUFBTSxVQUFVLEdBQUcsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQzFELE1BQU0sV0FBVyxHQUFHLGlCQUFpQixDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUU1RCw2Q0FBNkM7SUFDN0MsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEMsV0FBVyxHQUFHLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEMsV0FBVyxHQUFHLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNKLFdBQVcsR0FBRyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNoRixDQUFDO0lBQ0QsTUFBTSxDQUFDLFdBQVcsQ0FBQztBQUN2QixDQUFDO0FBQ0QsWUFBWTtBQUVaLHNHQUFzRztBQUcvRDs7Ozs7Ozs7O0FDNUZ2QztBQUFBLHNHQUFzRztBQUV0Ryx5REFBeUQ7QUFDekQsTUFBTSxZQUFZLEdBQUcsQ0FBQyxNQUFjLEVBQUUsU0FBaUIsQ0FBQyxFQUFVLEVBQUU7SUFDaEUsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsTUFBTSxHQUFHLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQztBQUN0RSxDQUFDLENBQUM7QUFDRixZQUFZO0FBRVosMERBQTBEO0FBQzFELE1BQU0sa0JBQWtCLEdBQUcsQ0FBQyxTQUFpQixFQUFFLE1BQWMsRUFBRSxTQUFpQixDQUFDLEVBQVksRUFBRTtJQUMzRixJQUFJLEtBQUssR0FBYSxFQUFFLENBQUM7SUFDekIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUNqQyxJQUFJLE1BQU0sR0FBRyxZQUFZLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzFDLE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQ2xDLE1BQU0sR0FBRyxZQUFZLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzFDLENBQUM7UUFDRCxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7SUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDO0FBQ2pCLENBQUM7QUFDRCxZQUFZO0FBRVosc0dBQXNHO0FBRXRHLHlEQUF5RDtBQUN6RCxNQUFNLGdCQUFnQixHQUFHLENBQUMsS0FBSyxFQUFPLEVBQUU7SUFDcEMsSUFBSSxZQUFZLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztJQUNoQyxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsT0FBTyxLQUFLLElBQUksSUFBSSxZQUFZLENBQUMsT0FBTyxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDcEUsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzNCLENBQUM7QUFDTCxDQUFDO0FBQ0QsWUFBWTtBQUVvQzs7Ozs7Ozs7Ozs7Ozs7OztBQ2pDMEU7QUFDckU7QUFDWjtBQUN3QjtBQUNQO0FBQ1Q7QUFDaUM7QUFHbEYsTUFBTSxRQUFRLEdBQUcsY0FBYyxDQUFDLENBQUMsNkNBQTZDO0FBQzlFLElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDLGlCQUFpQjtBQUt2QyxxRUFBcUU7QUFDckUsTUFBTSxZQUFZLEdBQUcsQ0FBQyxLQUFLLEVBQVUsRUFBRTtJQUNuQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBRTlCLDhEQUFlLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNqRCxnRUFBYSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDL0MsOERBQWUsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ2pELDhEQUFlLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzVDLE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDbkIsQ0FBQztJQUNELElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ25DLDhEQUFlLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNqRCw4REFBZSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM1QyxnRUFBYSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMxQyxnRUFBYSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUM7UUFDakMsOERBQWUsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDNUMsOERBQWUsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQzNCLDBEQUFXLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUMzQixZQUFZLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLGtFQUFVLEVBQUUsQ0FBQztRQUNiLDBEQUFVLENBQUMsV0FBVyxHQUFHLGNBQWMsQ0FBQztRQUN4QyxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ25CLENBQUM7QUFDTCxDQUFDLENBQUM7QUFDRixZQUFZO0FBRVosa0VBQWtFO0FBQ2xFLE1BQU0sU0FBUyxHQUFHLENBQUMsT0FBb0IsRUFBRSxFQUFFO0lBQ3ZDLE1BQU0sS0FBSyxHQUFHLG1EQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDaEQsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNwRCxFQUFFLENBQUMsQ0FBQyxTQUFTLEtBQUssY0FBYyxDQUFDLENBQUMsQ0FBQztRQUMvQixFQUFFLENBQUMsQ0FBQyxZQUFZLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyQixlQUFlLEVBQUUsQ0FBQztZQUNsQixPQUFPLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQVksQ0FBQyxDQUFDO1lBQ2hELFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN2QixDQUFDO1FBRUQsSUFBSSxDQUFDLENBQUM7WUFDRix3RUFBZ0IsRUFBRSxDQUFDO1lBQ25CLE9BQU8sQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDO1lBQ2hDLEtBQUssQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1lBQ25DLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFDakQsS0FBSyxDQUFDLG1CQUFtQixDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNuRCxDQUFDO0lBQ0wsQ0FBQztJQUNELElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN4Qiw0RUFBZ0IsQ0FBTSxPQUFPLENBQUMsQ0FBQztRQUMvQixXQUFXLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBQ0QsSUFBSSxDQUFDLENBQUM7UUFDRixPQUFPLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQztRQUNoQyxPQUFPLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN4QyxXQUFXLEVBQUUsQ0FBQztJQUNsQixDQUFDO0FBQ0wsQ0FBQztBQUNELFlBQVk7QUFFWix5REFBeUQ7QUFDekQsTUFBTSxNQUFNLEdBQUcsQ0FBQyxLQUFVLEVBQUUsRUFBRTtJQUMxQixJQUFJLE9BQU8sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO0lBQzNCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztRQUMzQixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEIsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztZQUMxQixJQUFJLElBQUksR0FBRyxRQUFRLENBQUM7WUFDcEIsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUM1QixNQUFNLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztZQUM5QixDQUFDO1lBQ0QsSUFBSSxDQUFDLENBQUM7Z0JBQ0YsTUFBTSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7WUFDNUIsQ0FBQztZQUNELFdBQVcsRUFBRSxDQUFDO1FBQ2xCLENBQUM7SUFDTCxDQUFDO0FBQ0wsQ0FBQztBQUNELFlBQVk7QUFFWiw2QkFBNkI7QUFDN0IsSUFBSSxlQUFlLEdBQUcsR0FBRyxFQUFFO0lBQ3ZCLE1BQU0sS0FBSyxHQUFHLG1EQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDaEQsSUFBSSxZQUFZLEdBQUcsbUVBQVEsQ0FBQyxnRUFBYSxDQUFDLEtBQUssQ0FBYSxDQUFDO0lBQzdELHlFQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbEIsdUVBQVEsQ0FBQyxLQUFLLEVBQUUsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3hDLHdFQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDckIsQ0FBQyxDQUFDO0FBQ0YsWUFBWTtBQUVaLDhDQUE4QztBQUM5QztJQUNJLE1BQU0sS0FBSyxHQUFHLG1EQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDaEQsSUFBSSxZQUFZLEdBQUcsbUVBQVEsQ0FBQyxnRUFBYSxDQUFDLEtBQUssQ0FBYSxDQUFDO0lBQzdELElBQUksTUFBTSxHQUFRLEVBQUUsQ0FBQztJQUNyQixJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0MsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLEtBQVUsRUFBRSxFQUFFO1FBQ25ELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3ZCLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlFLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQzVCLHdFQUFnQixFQUFFLENBQUM7UUFDbkIsS0FBSyxDQUFDLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUMsQ0FBQztRQUNqRCxLQUFLLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ25ELENBQUM7QUFDTCxDQUFDO0FBQ0QsWUFBWTtBQUVaLG9EQUFvRDtBQUNwRCxNQUFNLFlBQVksR0FBRyxDQUFDLEtBQVUsRUFBRSxFQUFFO0lBQ2hDLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7SUFDekIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3pCLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsNkRBQVMsQ0FBQyxDQUFDO1FBQzNDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsNkRBQVMsQ0FBQyxDQUFDO1FBQy9DLFlBQVksRUFBRSxDQUFDO1FBQ2YsRUFBRSxDQUFDLENBQUMsWUFBWSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFBQSx5RUFBaUIsRUFBRTtRQUFBLENBQUM7UUFBQSxDQUFDO1FBQzlDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyQixDQUFDO0FBQ0wsQ0FBQyxDQUFDO0FBQ0YsWUFBWTtBQUVaLHVFQUF1RTtBQUN2RSxNQUFNLFNBQVMsR0FBRyxHQUFTLEVBQUU7SUFDekIsSUFBSSxZQUFZLEdBQUcsbUVBQVEsQ0FBQyxnRUFBYSxDQUFDLEtBQUssQ0FBYSxDQUFDO0lBQzdELGNBQWM7SUFDZCxzRUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3pCLE1BQU0sS0FBSyxHQUFHLG1EQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDaEQsV0FBVztJQUNYLHVFQUFRLENBQUMsS0FBSyxFQUFFLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQztJQUN4QyxnQkFBZ0I7SUFDaEIsd0VBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQixtQkFBbUI7SUFDbkIsMERBQVcsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0Isa0JBQWtCO0lBQ2xCLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLEVBQUUsc0VBQWdCLENBQUMsQ0FBQztJQUN4RCxLQUFLLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzVDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLENBQUM7QUFFbEQsQ0FBQyxDQUFDO0FBQ0YsWUFBWTtBQUVaLHFDQUFxQztBQUNyQyxNQUFNLE9BQU8sR0FBRyxDQUFDLEtBQUssRUFBUSxFQUFFO0lBQzVCLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDcEMsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDbEMscURBQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsOERBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNwRCxTQUFTLEVBQUUsQ0FBQztRQUNoQixDQUFDO0lBQ0wsQ0FBQztBQUNMLENBQUMsQ0FBQztBQUNGLFlBQVk7QUFFWiw4Q0FBOEM7QUFDOUMsaUVBQWtCLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3RELFlBQVk7Ozs7Ozs7Ozs7O0FDeEswQjtBQUV0QyxxQkFBcUI7QUFDckIsTUFBTSxlQUFlLEdBQXFCLFFBQVEsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDaEYsTUFBTSxlQUFlLEdBQXFCLFFBQVEsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDaEYsTUFBTSxnQkFBZ0IsR0FBcUIsUUFBUSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUNsRixNQUFNLGFBQWEsR0FBc0IsUUFBUSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUM3RSxNQUFNLGlCQUFpQixHQUFnQixRQUFRLENBQUMsY0FBYyxDQUFDLG1CQUFtQixDQUFDLENBQUM7QUFDcEYsWUFBWTtBQUVaLHFFQUFxRTtBQUNyRSxNQUFNLGNBQWMsR0FBRyxHQUFHLEVBQUU7SUFDeEIsSUFBSSxXQUFXLEdBQUc7UUFDZCxRQUFRLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQztRQUMvQixRQUFRLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQztRQUMvQixRQUFRLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDO0tBQ25DLENBQUM7SUFDRixNQUFNLENBQUMsV0FBVyxDQUFDO0FBQ3ZCLENBQUM7QUFDRCxZQUFZO0FBRVosNkZBQTZGO0FBQzdGLElBQUksd0JBQXdCLEdBQUcsR0FBUyxFQUFFO0lBQ3RDLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztRQUNuQyxpQkFBa0IsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUFDLGlCQUFrQixDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7SUFBQyxDQUFDO0FBQzFELENBQUMsQ0FBQztBQUNGLFlBQVk7QUFFWix1RUFBdUU7QUFDdkUsTUFBTSxxQkFBcUIsR0FBRyxDQUFDLFFBQWtCLEVBQUUsRUFBRTtJQUNqRCxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0MsS0FBSyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7UUFDM0MsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztBQUNsQixDQUFDLENBQUM7QUFDRixZQUFZO0FBRVosMkNBQTJDO0FBQzNDLE1BQU0sUUFBUSxHQUFHLENBQUMsSUFBWSxFQUFxQixFQUFFO0lBQ2pELE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDWCxLQUFLLFVBQVU7WUFDWCxPQUFPLENBQUMsR0FBRyxDQUFDLDZDQUE2QyxDQUFDLENBQUM7WUFDM0QscURBQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkMsTUFBTSxDQUFDLG1EQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdDLEtBQUssY0FBYztZQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsbURBQW1ELENBQUMsQ0FBQztZQUNqRSxxREFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2QyxNQUFNLENBQUMsbURBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0MsS0FBSyxRQUFRO1lBQ1QsT0FBTyxDQUFDLEdBQUcsQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFDO1lBQzNELHFEQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3ZDLE1BQU0sQ0FBQyxtREFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QyxLQUFLLFFBQVE7WUFDVCxxREFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2QyxFQUFFLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUM7WUFBQyxDQUFDO1lBQ3hGLG1EQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7WUFDbkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsbURBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksbURBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLGVBQWUsbURBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzVLLE1BQU0sQ0FBQyxtREFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QztZQUNJLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxZQUFZLENBQUMsQ0FBQyxDQUFDO2dCQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQztnQkFBQyxNQUFNLENBQUMsUUFBUTtZQUFDLENBQUM7WUFDakYsSUFBSSxDQUFDLENBQUM7Z0JBQ0YsT0FBTyxDQUFDLEtBQUssQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDO2dCQUN6RCxNQUFNLENBQUMsUUFBUSxDQUFDO1lBQ3BCLENBQUM7SUFDVCxDQUFDO0FBQ0wsQ0FBQyxDQUFDO0FBQ0YsWUFBWTtBQUVaLDRCQUE0QjtBQUM1QixhQUFhLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQztBQUNqQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLHdCQUF3QixDQUFDLENBQUM7QUFDbkUsWUFBWTtBQUV1Qjs7Ozs7Ozs7Ozs7Ozs7QUMxRUc7QUFDVTtBQUNHO0FBQ25ELHNHQUFzRztBQUN0Ryx3REFBd0Q7QUFDeEQsTUFBTSxXQUFXLEdBQUcsQ0FBQyxRQUFrQixFQUFZLEVBQUU7SUFDakQsSUFBSSxLQUFLLEdBQUcsZ0ZBQWtCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLDhDQUE4QztJQUN2RixNQUFNLENBQUMsS0FBSyxDQUFDO0FBQ2pCLENBQUM7QUFDRCxZQUFZO0FBRVoseUVBQXlFO0FBQ3pFLE1BQU0sUUFBUSxHQUFHLENBQUMsS0FBa0IsRUFBRSxRQUFrQixFQUFFLFFBQWEsRUFBUSxFQUFFO0lBQzdFLElBQUksS0FBSyxHQUFhLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxnQkFBZTtJQUMzRCxNQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxvQ0FBb0M7SUFDeEYsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUNqQixTQUFTLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsb0VBQW9FO0lBQ25JLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUNELFlBQVk7QUFFWixpREFBaUQ7QUFDakQsTUFBTSxVQUFVLEdBQUcsQ0FBQyxLQUFrQixFQUFRLEVBQUU7SUFDNUMsTUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25ELEtBQUssQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUMsQ0FBQyxLQUErQixFQUFFLEVBQUU7UUFDdkUsS0FBSyxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDeEMsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBQ0QsWUFBWTtBQUVaLGdHQUFnRztBQUVoRyxzR0FBc0c7QUFFdEcsd0RBQXdEO0FBQ3hELE1BQU0sU0FBUyxHQUFHLENBQUMsS0FBdUIsRUFBUSxFQUFFO0lBQ2hELE1BQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLHVDQUF1QztJQUMzRixLQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxFQUFFO1FBQzVDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN6QyxJQUFJLFFBQVEsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyw2REFBNkQ7WUFDL0YsRUFBRSxDQUFDLENBQUMsUUFBUSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFBQyxDQUFDLHdFQUF1RTtZQUMxSyxJQUFJLENBQUMsQ0FBQztnQkFBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztnQkFBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLDhDQUE4QztZQUFDLENBQUMsQ0FBQyx1Q0FBdUM7UUFDaE0sQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUVELFlBQVk7QUFFWixxREFBcUQ7QUFDckQsb0JBQW9CLEtBQTJCO0lBQzNDLE1BQU0sWUFBWSxHQUFHLG1EQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDLHFEQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztJQUNyRixNQUFNLFNBQVMsR0FBVyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUMsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsZ0NBQWdDO0lBQ2pELElBQUksV0FBVyxHQUFHLDZFQUFpQixDQUFDLG1EQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsWUFBWSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQywrQ0FBK0M7SUFDOUgsV0FBVyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUMzQixFQUFFLENBQUMsQ0FBQyxRQUFRLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMscUNBQW9DO1FBQzlELElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxLQUFLLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDN0QsT0FBTyxFQUFFLENBQUMsQ0FBQyxzQkFBc0I7UUFDckMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0gsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLDZEQUE2RDtBQUNqRixDQUFDO0FBQ0QsWUFBWTtBQUUrQjs7Ozs7Ozs7Ozs7O0FDakVMO0FBQ1U7QUFJaEQsMkVBQTJFO0FBQzNFLG1CQUFtQixLQUFVO0lBQ3pCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztBQUM1QixDQUFDO0FBQ0QsWUFBWTtBQUVaLDBFQUEwRTtBQUMxRSw4Q0FBOEM7QUFFOUMsSUFBSSxnQkFBZ0IsR0FBRyxDQUFDLE9BQWlDLEVBQUUsRUFBRTtJQUN6RCxJQUFJLFdBQVcsR0FBRyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxnRkFBK0U7SUFDL0gsNEJBQTRCO0lBQzVCLElBQUksVUFBVSxHQUFHLEtBQUssQ0FBQztJQUV2QixPQUFPLFVBQVUsSUFBSSxLQUFLLEVBQUUsQ0FBQztRQUN6QixFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUIsSUFBSSxZQUFZLEdBQVUsRUFBRSxDQUFDO1lBRTdCLFdBQVcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ3hCLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyx1QkFBc0I7Z0JBQ3ZDLElBQUksUUFBUSxHQUFHLDZFQUFpQixDQUFDLG1EQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsWUFBWSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUMsa0NBQWlDO2dCQUM1RyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7b0JBQ3pCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUNuQixPQUFPLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxHQUFHLENBQUMsQ0FBQyw2QkFBNEI7d0JBQ3BFLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUMsZ0JBQWU7d0JBQzVELE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDLENBQUMsaUJBQWdCO3dCQUNqRSxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzdDLElBQUksQ0FBQyxDQUFDOzRCQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO3dCQUFDLENBQUM7d0JBQ25DLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7d0JBQzlDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDOzRCQUNqQixTQUFTLENBQU0sT0FBTyxDQUFDLENBQUM7d0JBQzVCLENBQUM7b0JBQ0wsQ0FBQztnQkFDTCxDQUFDLENBQUMsQ0FBQztnQkFDSCxZQUFZLEdBQUcsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQzlDLDZCQUE2QjtnQkFDN0IsV0FBVyxHQUFHLFlBQVksQ0FBQztZQUMvQixDQUFDLENBQUMsQ0FBQztZQUNILFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDdkIsQ0FBQztRQUNELElBQUksQ0FBQyxDQUFDO1lBQ0YsVUFBVSxHQUFHLElBQUksQ0FBQztZQUNsQixLQUFLLENBQUM7UUFDVixDQUFDO0lBRUwsQ0FBQztBQUNMLENBQUM7QUFDRCxZQUFZO0FBRVosdUJBQXVCO0FBQ3ZCLE1BQU0sU0FBUyxHQUFHLENBQUMsT0FBaUMsRUFBUSxFQUFFO0lBQzFELEVBQUUsQ0FBQyxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ25CLE9BQU8sQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxDQUFDLHFFQUFvRTtRQUMzRyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxxQ0FBb0M7SUFDdkUsQ0FBQztBQUNMLENBQUM7QUFDRCxZQUFZO0FBRVosdUZBQXVGO0FBQ3ZGLE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQyxNQUFXLEVBQUUsRUFBRTtJQUNyQyxJQUFJLGtCQUFrQixHQUErQixFQUFFLENBQUM7SUFDeEQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUNuQixFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLENBQUM7WUFDRixLQUFLLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxHQUFHLENBQUMsQ0FBQyx1QkFBc0I7WUFDNUQsS0FBSyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQyxlQUFjO1lBQ3pELEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDLENBQUMsY0FBYTtZQUM1RCxNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ2pELE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDaEQsRUFBRSxDQUFDLENBQUMsT0FBTyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLGtCQUFrQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDL0IsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDakMsQ0FBQztZQUNELElBQUksQ0FBQyxDQUFDO2dCQUFDLEtBQUssQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDO1lBQUMsQ0FBQyx1QkFBc0I7UUFDL0QsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0gsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUMsMENBQTBDO0FBQ3pFLENBQUM7QUFDRCxZQUFZO0FBRVosNkdBQTZHO0FBQzdHLE1BQU0sb0JBQW9CLEdBQUcsQ0FBQyxLQUErQixFQUFFLEVBQUU7SUFDN0QsS0FBSyxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxjQUFjO0lBQ3JELEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUMsc0JBQXFCO0lBQ2hFLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQywwQkFBMEI7SUFDMUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsc0NBQXNDO0lBRXhELE1BQU0sY0FBYyxHQUFHLDZFQUFpQixDQUFDLG1EQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsWUFBWSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUMsNEJBQTJCO0lBQzlHLE1BQU0sV0FBVyxHQUFHLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ3JELE1BQU0sQ0FBQyxXQUFXLENBQUM7QUFDdkIsQ0FBQztBQUNELFlBQVk7QUFDWixnRUFBZ0U7QUFFekI7Ozs7Ozs7Ozs7Ozs7O0FDbkd2QztBQUFBLElBQUksS0FBSyxHQUFHO0lBQ1IsSUFBSSxFQUFFO1FBQ0YsS0FBSyxFQUFFLENBQUM7UUFDUixPQUFPLEVBQUUsQ0FBQztRQUNWLE9BQU8sRUFBRSxDQUFDO0tBQ2I7SUFDRCxRQUFRLEVBQUUsQ0FBQztJQUNYLGFBQWEsRUFBRSxHQUFHLEVBQUU7UUFDaEIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1FBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLEtBQUssRUFBRSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7UUFBQyxDQUFDO1FBQy9HLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sS0FBSyxFQUFFLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7UUFBQyxDQUFDO0lBQzNJLENBQUM7Q0FDSixDQUFDO0FBR0YsSUFBSSxVQUFVLEdBQUcsR0FBVyxFQUFFO0lBQzFCLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLENBQUM7QUFDckYsQ0FBQyxDQUFDO0FBR0YsSUFBSSxhQUFhLEdBQUcsR0FBRyxFQUFFO0lBQ3JCLElBQUksUUFBUSxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMxRSxJQUFJLFFBQVEsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsV0FBVztJQUFDLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUFDLE1BQU0sQ0FBQyxXQUFXO0lBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pJLE1BQU0sQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDOUQsQ0FBQyxDQUFDO0FBRUYsSUFBSSxVQUFVLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxFQUFRLEVBQUU7SUFDaEMsS0FBSyxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFDbkUsQ0FBQyxDQUFDO0FBRUYsSUFBSSxTQUFTLEdBQUcsR0FBUyxFQUFFO0lBQ3ZCLGFBQWEsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDbEMsQ0FBQyxDQUFDO0FBRUYsSUFBSSxVQUFVLEdBQUcsR0FBRyxFQUFFO0lBQ2xCLEdBQUcsQ0FBQyxDQUFDLElBQUksT0FBTyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO0lBQUMsQ0FBQztJQUFBLENBQUM7QUFDaEUsQ0FBQztBQUVELElBQUksY0FBYyxHQUFHLENBQUMsQ0FBQyxDQUFDLDBCQUEwQjtBQUNsRCxNQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBRXpELElBQUksaUJBQWlCLEdBQUcsR0FBRyxFQUFFO0lBQ3pCLFVBQVUsRUFBRSxDQUFDO0lBQ2IsY0FBYyxHQUFHLFdBQVcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxVQUFVLENBQUMsV0FBVyxHQUFHLGFBQWEsRUFBRSxFQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUMxRixDQUFDLENBQUM7QUFFRixJQUFJLGdCQUFnQixHQUFHLEdBQUcsRUFBRTtJQUN4QixTQUFTLEVBQUUsQ0FBQztJQUNaLGFBQWEsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUNsQyxDQUFDLENBQUM7QUFHMkciLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMTI1YjY3MWZmODVkYzdjYzFkODQiLCIvLyNyZWdpb24gLSBzZWxlY3RvcnNcclxuY29uc3QgZ2FtZVN0YXJ0QnV0dG9uID0gPEhUTUxCdXR0b25FbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFydCcpO1xyXG5jb25zdCBnYW1lUmVzZXRCdXR0b24gPSA8SFRNTEJ1dHRvbkVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc2V0Jyk7XHJcbmNvbnN0IHBsYXllck5hbWVJbnB1dCA9IDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2VybmFtZScpO1xyXG5jb25zdCBnYW1lT3B0aW9uc1NlY3Rpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZU9wdGlvbnMnKTtcclxuY29uc3QgZ2FtZVNlY3Rpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZScpO1xyXG4vLyNlbmRyZWdpb25cclxuXHJcbnBsYXllck5hbWVJbnB1dC52YWx1ZSA9IFwiXCI7XHJcblxyXG5cclxuXHJcbi8vI3JlZ2lvbiAtIEdhbWUgc2luZ2xldG9uIGNsYXNzIGRlZmluaXRpb25cclxuY2xhc3MgR2FtZSB7XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBHYW1lID0gbmV3IEdhbWUoKTtcclxuXHJcbiAgICBwcml2YXRlIF9tb2RlID0ge1xyXG4gICAgICAgIGJlZ2lubmVyOiBbOSwgOSwgMTBdLFxyXG4gICAgICAgIGludGVybWVkaWF0ZTogWzE2LCAxNiwgNDBdLFxyXG4gICAgICAgIGV4cGVydDogWzE2LCAzMCwgOTldLFxyXG4gICAgICAgIGN1c3RvbTogWzAsIDAsIDBdXHJcbiAgICB9O1xyXG5cclxuICAgIHByaXZhdGUgX2dhbWVUYWJsZTogSFRNTFRhYmxlRWxlbWVudDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBpZiAoR2FtZS5faW5zdGFuY2UpIHsgdGhyb3cgbmV3IEVycm9yKFwiRXJyb3IsIHdyb25nIHVzZSBvZiBHYW1lIGluc3RhbmNlIVwiKSB9XHJcbiAgICAgICAgR2FtZS5faW5zdGFuY2UgPSB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogR2FtZSB7XHJcbiAgICAgICAgcmV0dXJuIEdhbWUuX2luc3RhbmNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBtb2RlSW5mbyhtb2RlTmFtZTogc3RyaW5nKTogbnVtYmVyW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tb2RlW21vZGVOYW1lXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0Q3VzdG9tTW9kZShpbmZvOiBudW1iZXJbXSkge1xyXG4gICAgICAgIHRoaXMuX21vZGUuY3VzdG9tID0gaW5mbztcclxuICAgICAgICBjb25zb2xlLmxvZyhgQ3VzdG9tIG1vZGUgc2V0IHRvICR7dGhpcy5fbW9kZS5jdXN0b219YCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldEdhbWVUYWJsZShlbGVtZW50KSB7XHJcbiAgICAgICAgdGhpcy5fZ2FtZVRhYmxlID0gZWxlbWVudDtcclxuICAgICAgICBjb25zb2xlLmxvZyhgVGFibGUgY3JlYXRlZGApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRHYW1lVGFibGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dhbWVUYWJsZTtcclxuICAgIH1cclxufVxyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vI3JlZ2lvbiAtIFBsYXllciAtIHNpbmdsZXRvbiBjbGFzcyBkZWZpbml0aW9uXHJcbmNsYXNzIFBsYXllciB7XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBQbGF5ZXIgPSBuZXcgUGxheWVyKCk7XHJcbiAgICBwcml2YXRlIF9uYW1lOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgcHJpdmF0ZSBfZ2FtZU1vZGU6IHN0cmluZyA9IFwibm9uZVwiO1xyXG4gICAgcHJpdmF0ZSBfc2NvcmU6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBpZiAoUGxheWVyLl9pbnN0YW5jZSkgeyB0aHJvdyBuZXcgRXJyb3IoXCJFcnJvciwgd3JvbmcgdXNlIG9mIFBsYXllciBpbnN0YW5jZSFcIikgfVxyXG4gICAgICAgIFBsYXllci5faW5zdGFuY2UgPSB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogUGxheWVyIHtcclxuICAgICAgICByZXR1cm4gUGxheWVyLl9pbnN0YW5jZTtcclxuICAgIH1cclxuICAgIGdldE5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbmFtZTtcclxuICAgIH1cclxuICAgIHNldE5hbWUodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX25hbWUgPSB2YWx1ZTtcclxuICAgICAgICBjb25zb2xlLmxvZyhgUGxheWVycyBuYW1lIHNldCB0bzogJHt0aGlzLl9uYW1lfWApXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0R2FtZU1vZGUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZ2FtZU1vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0R2FtZU1vZGUodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2dhbWVNb2RlID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0U2NvcmUodmFsdWUpIHtcclxuICAgICAgICB0aGlzLl9zY29yZSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFNjb3JlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zY29yZTtcclxuICAgIH1cclxufVxyXG4vLyNlbmRyZWdpb25cclxuXHJcbmV4cG9ydCB7IEdhbWUsIFBsYXllciwgZ2FtZVN0YXJ0QnV0dG9uLCBnYW1lUmVzZXRCdXR0b24sIHBsYXllck5hbWVJbnB1dCwgZ2FtZU9wdGlvbnNTZWN0aW9uLCBnYW1lU2VjdGlvbiB9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9kYXRhLnRzIiwiaW1wb3J0IHsgR2FtZSwgUGxheWVyIH0gZnJvbSAnLi9kYXRhJztcclxuXHJcbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09VEFCTEUgR1JJRD09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuLy8jcmVnaW9uIC0gY3JlYXRlcyB0YWJsZSBncmlkIGZvciBnaXZlbiBnYW1lIG1vZGVcclxuY29uc3QgY3JlYXRlR3JpZCA9IChyb3dzQW5kQ29sczogbnVtYmVyW10pOiB2b2lkID0+IHtcclxuICAgIGxldCB0YWJsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RhYmxlJyk7XHJcbiAgICBsZXQgY2VsbENvdW50ZXIgPSAxO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByb3dzQW5kQ29sc1swXTsgaSsrKSB7XHJcbiAgICAgICAgbGV0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJyk7XHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCByb3dzQW5kQ29sc1sxXTsgaisrKSB7XHJcbiAgICAgICAgICAgIGxldCBjb2wgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpO1xyXG4gICAgICAgICAgICBjb2wuc2V0QXR0cmlidXRlKFwiaWRcIiwgY2VsbENvdW50ZXIgKyAnZmllbGQnKTtcclxuICAgICAgICAgICAgY29sLnNldEF0dHJpYnV0ZShcImRhdGEtaWRcIiwgY2VsbENvdW50ZXIgKyAnZmllbGQnKTtcclxuICAgICAgICAgICAgY29sLnNldEF0dHJpYnV0ZShcImRhdGEtbWluZVwiLCBcIlwiKTtcclxuICAgICAgICAgICAgY29sLnNldEF0dHJpYnV0ZShcImRhdGEtZW1wdHlcIiwgXCJcIik7XHJcbiAgICAgICAgICAgIGNvbC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWNsaWNrXCIsIFwiXCIpO1xyXG4gICAgICAgICAgICBjZWxsQ291bnRlcisrO1xyXG4gICAgICAgICAgICByb3cuYXBwZW5kQ2hpbGQoY29sKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGFibGUuYXBwZW5kQ2hpbGQocm93KTtcclxuICAgIH1cclxuICAgIEdhbWUuZ2V0SW5zdGFuY2UoKS5zZXRHYW1lVGFibGUodGFibGUpO1xyXG59O1xyXG4vLyNlbmRyZWdpb25cclxuXHJcblxyXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PUJPUkRFUlM9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbi8vI3JlZ2lvbiAtIGNyZWF0ZXMgbGVmdCBib3JkZXIgZm9yIHRhYmxlIGdyaWRcclxuY29uc3QgY3JlYXRlTGVmdEJvcmRlciA9IChudW1PZlJvd3M6IG51bWJlciwgbnVtT2ZDb2xzOiBudW1iZXIpID0+IHtcclxuICAgIGxldCBsZWZ0Qm9yZGVyRmllbGRzOiBudW1iZXJbXSA9IFsxXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtT2ZSb3dzIC0gMTsgaSsrKSB7XHJcbiAgICAgICAgbGV0IGJvcmRlckZpZWxkID0gbGVmdEJvcmRlckZpZWxkc1tpXSArIG51bU9mQ29scztcclxuICAgICAgICBsZWZ0Qm9yZGVyRmllbGRzLnB1c2goYm9yZGVyRmllbGQpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGxlZnRCb3JkZXJGaWVsZHM7XHJcbn1cclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLyNyZWdpb24gLSBjcmVhdGVzIHJpZ2h0IGJvcmRlciBmb3IgdGFibGUgZ3JpZFxyXG5jb25zdCBjcmVhdGVSaWdodEJvcmRlciA9IChudW1PZlJvd3M6IG51bWJlciwgbnVtT2ZDb2xzOiBudW1iZXIpID0+IHtcclxuICAgIGxldCByaWdodEJvcmRlckZpZWxkczogbnVtYmVyW10gPSBbbnVtT2ZDb2xzXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtT2ZSb3dzIC0gMTsgaSsrKSB7XHJcbiAgICAgICAgbGV0IGJvcmRlckZpZWxkID0gcmlnaHRCb3JkZXJGaWVsZHNbaV0gKyBudW1PZkNvbHM7XHJcbiAgICAgICAgcmlnaHRCb3JkZXJGaWVsZHMucHVzaChib3JkZXJGaWVsZCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmlnaHRCb3JkZXJGaWVsZHM7XHJcbn1cclxuLy8jZW5kcmVnaW9uXHJcblxyXG5cclxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1TVVJST1VORElORz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4vLyNyZWdpb24gLSBkZWZpbmVTdXJyb3VuZGluZygpIC0gY3JlYXRlcyBzdXJyb3VuZGluZyBiYXNlZCBvbiBmaWVsZCBwb3NpdGlvbiAoYmFzZWQgb24gaWQpXHJcblxyXG5jb25zdCBkZWZpbmVTdXJyb3VuZGluZyA9ICh0YWJsZTogRWxlbWVudCwgZWxlbWVudDogSFRNTEVsZW1lbnQpID0+IHsgLy8gZGVmaW5pc2VtbyBva29sbmEgcG9samEgbmEgb3Nub3Z1IGRhdG9nIHBvbGphIGkgYnJvamEga29sb25hIHRhYmVsZVxyXG4gICAgbGV0IHN1cnJvdW5kaW5nO1xyXG4gICAgY29uc3QgaWQgPSBwYXJzZUludChlbGVtZW50LmlkKTtcclxuICAgIGNvbnN0IGdhbWVNb2RlSW5mbyA9IEdhbWUuZ2V0SW5zdGFuY2UoKS5tb2RlSW5mbyhQbGF5ZXIuZ2V0SW5zdGFuY2UoKS5nZXRHYW1lTW9kZSgpKTtcclxuICAgIGNvbnN0IG51bU9mUm93cyA9IGdhbWVNb2RlSW5mb1swXTtcclxuICAgIGNvbnN0IG51bU9mQ29scyA9IGdhbWVNb2RlSW5mb1sxXTtcclxuXHJcbiAgICAvL2Jhc2Ugc3Vycm91bmRpbmdcclxuICAgIGNvbnN0IGxlZnQgPSB0YWJsZS5xdWVyeVNlbGVjdG9yKGBbaWQ9XCIke2lkIC0gMX1maWVsZFwiXWApO1xyXG4gICAgY29uc3QgdXBMZWZ0ID0gdGFibGUucXVlcnlTZWxlY3RvcihgW2lkPVwiJHtpZCAtIG51bU9mQ29scyAtIDF9ZmllbGRcIl1gKTtcclxuICAgIGNvbnN0IHVwID0gdGFibGUucXVlcnlTZWxlY3RvcihgW2lkPVwiJHtpZCAtIG51bU9mQ29sc31maWVsZFwiXWApO1xyXG4gICAgY29uc3QgdXBSaWdodCA9IHRhYmxlLnF1ZXJ5U2VsZWN0b3IoYFtpZD1cIiR7aWQgLSBudW1PZkNvbHMgKyAxfWZpZWxkXCJdYCk7XHJcbiAgICBjb25zdCByaWdodCA9IHRhYmxlLnF1ZXJ5U2VsZWN0b3IoYFtpZD1cIiR7aWQgKyAxfWZpZWxkXCJdYCk7XHJcbiAgICBjb25zdCByaWdodERvd24gPSB0YWJsZS5xdWVyeVNlbGVjdG9yKGBbaWQ9XCIke2lkICsgbnVtT2ZDb2xzICsgMX1maWVsZFwiXWApO1xyXG4gICAgY29uc3QgZG93biA9IHRhYmxlLnF1ZXJ5U2VsZWN0b3IoYFtpZD1cIiR7aWQgKyBudW1PZkNvbHN9ZmllbGRcIl1gKTtcclxuICAgIGNvbnN0IGRvd25MZWZ0ID0gdGFibGUucXVlcnlTZWxlY3RvcihgW2lkPVwiJHtpZCArIG51bU9mQ29scyAtIDF9ZmllbGRcIl1gKTtcclxuXHJcbiAgICAvL2NyZWF0ZSBib3JkZXJzXHJcbiAgICBjb25zdCBsZWZ0Qm9yZGVyID0gY3JlYXRlTGVmdEJvcmRlcihudW1PZlJvd3MsIG51bU9mQ29scyk7XHJcbiAgICBjb25zdCByaWdodEJvcmRlciA9IGNyZWF0ZVJpZ2h0Qm9yZGVyKG51bU9mUm93cywgbnVtT2ZDb2xzKTtcclxuXHJcbiAgICAvL3N1cnJvdW5kaW5nIGJhc2VkIG9uIGZpZWxkLWJvcmRlcnMgcmVsYXRpb25cclxuICAgIGlmIChsZWZ0Qm9yZGVyLmluZGV4T2YoaWQpICE9PSAtMSkge1xyXG4gICAgICAgIHN1cnJvdW5kaW5nID0gW3VwLCB1cFJpZ2h0LCByaWdodCwgcmlnaHREb3duLCBkb3duXTtcclxuICAgIH0gZWxzZSBpZiAocmlnaHRCb3JkZXIuaW5kZXhPZihpZCkgIT09IC0xKSB7XHJcbiAgICAgICAgc3Vycm91bmRpbmcgPSBbbGVmdCwgdXBMZWZ0LCB1cCwgZG93biwgZG93bkxlZnRdO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBzdXJyb3VuZGluZyA9IFtsZWZ0LCB1cExlZnQsIHVwLCB1cFJpZ2h0LCByaWdodCwgcmlnaHREb3duLCBkb3duLCBkb3duTGVmdF07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3Vycm91bmRpbmc7XHJcbn1cclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcblxyXG5leHBvcnQgeyBjcmVhdGVHcmlkLGRlZmluZVN1cnJvdW5kaW5nfTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvdGFibGVHcmlkLnRzIiwiLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1SQU5ET00gRlVOQ1RJT05TPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4vLyNyZWdpb24gIC0gQ3JlYXRlcyByYW5kb20gbnVtYmVyIGZvciBwYXNzZWQgbWluIGFuZCBtYXhcclxuY29uc3QgcmFuZG9tTnVtYmVyID0gKG1heE51bTogbnVtYmVyLCBtaW5OdW06IG51bWJlciA9IDEpOiBudW1iZXIgPT4ge1xyXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXhOdW0gLSBtaW5OdW0gKyAxKSArIG1pbk51bSk7XHJcbn07XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uICAtIGFycmF5IHdpdGggc3BlY2lmaWVkIG51bWJlciBvZiByYW5kb20gbnVtYmVyc1xyXG5jb25zdCByYW5kb21OdW1iZXJzQXJyYXkgPSAoYXJyTGVuZ3RoOiBudW1iZXIsIG1heE51bTogbnVtYmVyLCBtaW5OdW06IG51bWJlciA9IDEpOiBudW1iZXJbXSA9PiB7XHJcbiAgICBsZXQgYXJyYXk6IG51bWJlcltdID0gW107XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyckxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IG5ld051bSA9IHJhbmRvbU51bWJlcihtYXhOdW0sIG1pbk51bSk7XHJcbiAgICAgICAgd2hpbGUgKGFycmF5LmluZGV4T2YobmV3TnVtKSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgbmV3TnVtID0gcmFuZG9tTnVtYmVyKG1pbk51bSwgbWF4TnVtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYXJyYXkucHVzaChuZXdOdW0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFycmF5O1xyXG59XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4vLyNyZWdpb24gLSBwcmV2ZW50TWVudSgpIC0gbmVtYSBkZXNuaSBrbGlrIG1lbmkgbmEgdGFibGlcclxuY29uc3QgcHJldmVudFRhYmxlTWVudSA9IChldmVudCk6dm9pZCA9PiB7XHJcbiAgICBsZXQgY2xpY2tlZFBsYWNlID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgaWYgKGNsaWNrZWRQbGFjZS50YWdOYW1lID09PSBcIlREXCIgfHwgY2xpY2tlZFBsYWNlLnRhZ05hbWUgPT09IFwiVEFCTEVcIikge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9XHJcbn1cclxuLy8jZW5kcmVnaW9uXHJcblxyXG5leHBvcnQgeyByYW5kb21OdW1iZXJzQXJyYXksIHByZXZlbnRUYWJsZU1lbnUgfTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvaGVscGVyRnVuY3MudHMiLCJpbXBvcnQgeyBHYW1lLCBQbGF5ZXIsIGdhbWVPcHRpb25zU2VjdGlvbiwgZ2FtZVN0YXJ0QnV0dG9uLCBnYW1lUmVzZXRCdXR0b24sIGdhbWVTZWN0aW9uLCBwbGF5ZXJOYW1lSW5wdXQgfSBmcm9tICcuL2RhdGEnO1xyXG5pbXBvcnQgeyBnYW1lTW9kZSwgZ2FtZU1vZGVJbnB1dCB9IGZyb20gJy4vZ2FtZU1vZGUnO1xyXG5pbXBvcnQgeyBjcmVhdGVHcmlkIH0gZnJvbSAnLi90YWJsZUdyaWQnO1xyXG5pbXBvcnQgeyBzZXRNaW5lcywgY2xlYXJNaW5lcywgd3JpdGVUaXBzIH0gZnJvbSAnLi9taW5lc0FuZFRpcHMnO1xyXG5pbXBvcnQgeyBvcGVuRW1wdHlFbGVtZW50LCBzdG9wQ2xpY2sgfSBmcm9tICcuL2VtcHR5Rmxvdyc7XHJcbmltcG9ydCB7IHByZXZlbnRUYWJsZU1lbnUgfSBmcm9tICcuL2hlbHBlckZ1bmNzJztcclxuaW1wb3J0IHtzdGFydFRpbWVySGFuZGxlcixzdG9wVGltZXJIYW5kbGVyLCByZXNldFRpbWVyLHRpbWVyUGxhY2V9IGZyb20gJy4vdGltZXInO1xyXG5cclxuXHJcbmNvbnN0IG1pbmVJY29uID0gXCJcXHVEODNEXFx1RENBM1wiOyAvLyBkZWZpbmlzZW1vIGlrb25pY3UgemEgbWludSB1IG5la29tIG1vbWVudHVcclxubGV0IGNsaWNrQ291bnRlciA9IDA7IC8vIGZvbGxvd3MgY2xpY2tzXHJcblxyXG5cclxuXHJcblxyXG4vLyNyZWdpb24gLSBtYW5hZ2VJbnB1dHMoKSAtIG1hbmFnZSBpbnB1dHMgb24gZG9jdW1lbnQgYmFzZWQgb24gZXZlbnRcclxuY29uc3QgbWFuYWdlSW5wdXRzID0gKGV2ZW50KTogc3RyaW5nID0+IHtcclxuICAgIGlmIChldmVudC50YXJnZXQuaWQgPT09IFwic3RhcnRcIikge1xyXG5cclxuICAgICAgICBwbGF5ZXJOYW1lSW5wdXQuc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICd0cnVlJyk7XHJcbiAgICAgICAgZ2FtZU1vZGVJbnB1dC5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ3RydWUnKTtcclxuICAgICAgICBnYW1lU3RhcnRCdXR0b24uc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICd0cnVlJyk7XHJcbiAgICAgICAgZ2FtZVJlc2V0QnV0dG9uLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcclxuICAgICAgICByZXR1cm4gXCJzdGFydFwiO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoZXZlbnQudGFyZ2V0LmlkID09PSBcInJlc2V0XCIpIHtcclxuICAgICAgICBnYW1lUmVzZXRCdXR0b24uc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICd0cnVlJyk7XHJcbiAgICAgICAgZ2FtZVN0YXJ0QnV0dG9uLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcclxuICAgICAgICBnYW1lTW9kZUlucHV0LnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcclxuICAgICAgICBnYW1lTW9kZUlucHV0LnZhbHVlID0gJ2JlZ2lubmVyJztcclxuICAgICAgICBwbGF5ZXJOYW1lSW5wdXQucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xyXG4gICAgICAgIHBsYXllck5hbWVJbnB1dC52YWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgZ2FtZVNlY3Rpb24uaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICBjbGlja0NvdW50ZXIgPSAwO1xyXG4gICAgICAgIHJlc2V0VGltZXIoKTtcclxuICAgICAgICB0aW1lclBsYWNlLnRleHRDb250ZW50ID0gXCIwMCA6IDAwIDogMDBcIjtcclxuICAgICAgICByZXR1cm4gXCJyZXNldFwiO1xyXG4gICAgfVxyXG59O1xyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vI3JlZ2lvbiAtIGNoZWNrTW92ZSgpIC0gcHJvdmVyYXZhIHBvdGV6IGkgcHJlZHV6aW1hIGRhbGplIGtvcmFrZVxyXG5jb25zdCBjaGVja01vdmUgPSAoZWxlbWVudDogSFRNTEVsZW1lbnQpID0+IHtcclxuICAgIGNvbnN0IHRhYmxlID0gR2FtZS5nZXRJbnN0YW5jZSgpLmdldEdhbWVUYWJsZSgpO1xyXG4gICAgY29uc3QgYXR0cmlidXRlID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLW1pbmVcIik7XHJcbiAgICBpZiAoYXR0cmlidXRlID09PSBcIlxcdUQ4M0RcXHVEQ0EzXCIpIHtcclxuICAgICAgICBpZiAoY2xpY2tDb3VudGVyID09PSAxKSB7XHJcbiAgICAgICAgICAgIHBsYW50TWluZXNBZ2FpbigpO1xyXG4gICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBvbkZpZWxkQ2xpY2spO1xyXG4gICAgICAgICAgICBjaGVja01vdmUoZWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnQuaWQpLmNsaWNrKCk7XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHN0b3BUaW1lckhhbmRsZXIoKTtcclxuICAgICAgICAgICAgZWxlbWVudC50ZXh0Q29udGVudCA9IGF0dHJpYnV0ZTtcclxuICAgICAgICAgICAgYWxlcnQoXCJCT09PT09PTS4uLi4uWW91J3JlIGRlYWQhXCIpO1xyXG4gICAgICAgICAgICB0YWJsZS5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgb25GaWVsZENsaWNrKTtcclxuICAgICAgICAgICAgdGFibGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBmbGFnSXQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGF0dHJpYnV0ZSA9PT0gXCJcIikge1xyXG4gICAgICAgIG9wZW5FbXB0eUVsZW1lbnQoPGFueT5lbGVtZW50KTtcclxuICAgICAgICBjaGVja1Jlc3VsdCgpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgZWxlbWVudC50ZXh0Q29udGVudCA9IGF0dHJpYnV0ZTtcclxuICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShcImRhdGEtY2xpY2tcIiwgXCIxXCIpO1xyXG4gICAgICAgIGNoZWNrUmVzdWx0KCk7XHJcbiAgICB9XHJcbn1cclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLyNyZWdpb24gLSBmbGFnSXQoKSAtIHBvc3RhdmxqYW5qZSB6YXN0YXZlIG5hIGRlc25pIGtsaWtcclxuY29uc3QgZmxhZ0l0ID0gKGV2ZW50OiBhbnkpID0+IHtcclxuICAgIGxldCBlbGVtZW50ID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgaWYgKGVsZW1lbnQudGFnTmFtZSA9PT0gXCJURFwiKSB7XHJcbiAgICAgICAgaWYgKGV2ZW50LndoaWNoID09PSAzKSB7XHJcbiAgICAgICAgICAgIGxldCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XHJcbiAgICAgICAgICAgIGxldCBmbGFnID0gXCJcXHUyNjkxXCI7XHJcbiAgICAgICAgICAgIGlmICh0YXJnZXQudGV4dENvbnRlbnQgPT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgIHRhcmdldC50ZXh0Q29udGVudCA9IGZsYWc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQudGV4dENvbnRlbnQgPSBcIlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNoZWNrUmVzdWx0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uIC0gcGxhbnRNaW5lc0FnYWluKClcclxubGV0IHBsYW50TWluZXNBZ2FpbiA9ICgpID0+IHtcclxuICAgIGNvbnN0IHRhYmxlID0gR2FtZS5nZXRJbnN0YW5jZSgpLmdldEdhbWVUYWJsZSgpO1xyXG4gICAgbGV0IGdhbWVNb2RlSW5mbyA9IGdhbWVNb2RlKGdhbWVNb2RlSW5wdXQudmFsdWUpIGFzIG51bWJlcltdO1xyXG4gICAgY2xlYXJNaW5lcyh0YWJsZSk7XHJcbiAgICBzZXRNaW5lcyh0YWJsZSwgZ2FtZU1vZGVJbmZvLCBtaW5lSWNvbik7XHJcbiAgICB3cml0ZVRpcHModGFibGUpO1xyXG59O1xyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vI3JlZ2lvbiAtIGNoZWNrUmVzdWx0KCkgLSBwcm92ZXJhdmEgcmV6dWx0YXRcclxuZnVuY3Rpb24gY2hlY2tSZXN1bHQoKSB7XHJcbiAgICBjb25zdCB0YWJsZSA9IEdhbWUuZ2V0SW5zdGFuY2UoKS5nZXRHYW1lVGFibGUoKTtcclxuICAgIGxldCBnYW1lTW9kZUluZm8gPSBnYW1lTW9kZShnYW1lTW9kZUlucHV0LnZhbHVlKSBhcyBudW1iZXJbXTtcclxuICAgIGxldCBjbG9zZWQ6IGFueSA9IFtdO1xyXG4gICAgbGV0IGFsbEZpZWxkcyA9IHRhYmxlLnF1ZXJ5U2VsZWN0b3JBbGwoXCJ0ZFwiKTtcclxuICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoYWxsRmllbGRzLCAoZmllbGQ6IGFueSkgPT4ge1xyXG4gICAgICAgIGlmIChmaWVsZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNsaWNrXCIsIFwiMVwiKSkge1xyXG4gICAgICAgICAgICBjbG9zZWQucHVzaChmaWVsZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKChjbG9zZWQubGVuZ3RoID09PSAoKGdhbWVNb2RlSW5mb1swXSAqIGdhbWVNb2RlSW5mb1sxXSkgLSBnYW1lTW9kZUluZm9bMl0pKSkge1xyXG4gICAgICAgIGFsZXJ0KFwiQ29uZ3JhdHMsIHlvdSBXT04hXCIpO1xyXG4gICAgICAgIHN0b3BUaW1lckhhbmRsZXIoKTtcclxuICAgICAgICB0YWJsZS5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgb25GaWVsZENsaWNrKTtcclxuICAgICAgICB0YWJsZS5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGZsYWdJdCk7XHJcbiAgICB9XHJcbn1cclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLyNyZWdpb24gb25GaWVsZENsaWNrKCkgLSBkZWZpbmlzZSByYXNwb3JlZCBuYSBrbGlrXHJcbmNvbnN0IG9uRmllbGRDbGljayA9IChldmVudDogYW55KSA9PiB7XHJcbiAgICBsZXQgZmllbGQgPSBldmVudC50YXJnZXQ7XHJcbiAgICBpZiAoZmllbGQudGFnTmFtZSA9PT0gXCJURFwiKSB7XHJcbiAgICAgICAgZmllbGQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHN0b3BDbGljayk7XHJcbiAgICAgICAgZmllbGQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBzdG9wQ2xpY2spO1xyXG4gICAgICAgIGNsaWNrQ291bnRlcisrO1xyXG4gICAgICAgIGlmIChjbGlja0NvdW50ZXIgPT09IDEpIHtzdGFydFRpbWVySGFuZGxlcigpfTtcclxuICAgICAgICBjaGVja01vdmUoZmllbGQpO1xyXG4gICAgfVxyXG59O1xyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vI3JlZ2lvbiAtIHByaW50R3JpZCgpIC0gY3JlYXRlcyBmdWxsIEdyaWQgYW5kIGFkZHMgaXQgdG8gdGhlIGRvY3VtZW50XHJcbmNvbnN0IHByaW50R3JpZCA9ICgpOiB2b2lkID0+IHtcclxuICAgIGxldCBnYW1lTW9kZUluZm8gPSBnYW1lTW9kZShnYW1lTW9kZUlucHV0LnZhbHVlKSBhcyBudW1iZXJbXTtcclxuICAgIC8vY3JlYXRlIHRhYmxlXHJcbiAgICBjcmVhdGVHcmlkKGdhbWVNb2RlSW5mbyk7XHJcbiAgICBjb25zdCB0YWJsZSA9IEdhbWUuZ2V0SW5zdGFuY2UoKS5nZXRHYW1lVGFibGUoKTtcclxuICAgIC8vc2V0IG1pbmVzXHJcbiAgICBzZXRNaW5lcyh0YWJsZSwgZ2FtZU1vZGVJbmZvLCBtaW5lSWNvbik7XHJcbiAgICAvLyAvLyAvL3NldCB0aXBzXHJcbiAgICB3cml0ZVRpcHModGFibGUpO1xyXG4gICAgLy8gLy8gLy9wcmludCB0YWJsZVxyXG4gICAgZ2FtZVNlY3Rpb24uYXBwZW5kQ2hpbGQodGFibGUpO1xyXG4gICAgLy8gLy9zZXQgbGlzdGVuZXJzXHJcbiAgICB0YWJsZS5hZGRFdmVudExpc3RlbmVyKFwiY29udGV4dG1lbnVcIiwgcHJldmVudFRhYmxlTWVudSk7XHJcbiAgICB0YWJsZS5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGZsYWdJdCk7XHJcbiAgICB0YWJsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uRmllbGRDbGljayk7XHJcblxyXG59O1xyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vI3JlZ2lvbiAtIG9uQ2xpY2soKSAtIG1haW4gZnVuY3Rpb25cclxuY29uc3Qgb25DbGljayA9IChldmVudCk6IHZvaWQgPT4ge1xyXG4gICAgaWYgKGV2ZW50LnRhcmdldC50YWdOYW1lID09PSBcIkJVVFRPTlwiKSB7XHJcbiAgICAgICAgaWYgKG1hbmFnZUlucHV0cyhldmVudCkgPT09ICdzdGFydCcpIHtcclxuICAgICAgICAgICAgUGxheWVyLmdldEluc3RhbmNlKCkuc2V0TmFtZShwbGF5ZXJOYW1lSW5wdXQudmFsdWUpO1xyXG4gICAgICAgICAgICBwcmludEdyaWQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uIC0gZ2FtZU9wdGlvbnNTZWN0aW9uIGV2ZW50IGxpc3RlbmVyc1xyXG5nYW1lT3B0aW9uc1NlY3Rpb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbkNsaWNrKTtcclxuLy8jZW5kcmVnaW9uXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL2FwcC50cyIsImltcG9ydCB7IEdhbWUsIFBsYXllciB9IGZyb20gJy4vZGF0YSc7XHJcblxyXG4vLyNyZWdpb24gLSBzZWxlY3RvcnNcclxuY29uc3QgY3VzdG9tUm93c0lucHV0ID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2N1c3RvbVJvd3MnKTtcclxuY29uc3QgY3VzdG9tQ29sc0lucHV0ID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2N1c3RvbUNvbHMnKTtcclxuY29uc3QgY3VzdG9tTWluZXNJbnB1dCA9IDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjdXN0b21NaW5lcycpO1xyXG5jb25zdCBnYW1lTW9kZUlucHV0ID0gPEhUTUxTZWxlY3RFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lTW9kZScpO1xyXG5jb25zdCBjdXN0b21Nb2RlT3B0aW9ucyA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3VzdG9tTW9kZU9wdGlvbnMnKTtcclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLyNyZWdpb24gLSBnZXRDdXN0b21Qcm9wcygpIC0gZ2V0cyBjdXN0b20gcHJvcGVydGllcyBmcm9tIHVzZXIgaW5wdXRcclxuY29uc3QgZ2V0Q3VzdG9tUHJvcHMgPSAoKSA9PiB7XHJcbiAgICBsZXQgY3VzdG9tUHJvcHMgPSBbXHJcbiAgICAgICAgcGFyc2VJbnQoY3VzdG9tUm93c0lucHV0LnZhbHVlKSxcclxuICAgICAgICBwYXJzZUludChjdXN0b21Db2xzSW5wdXQudmFsdWUpLFxyXG4gICAgICAgIHBhcnNlSW50KGN1c3RvbU1pbmVzSW5wdXQudmFsdWUpLFxyXG4gICAgXTtcclxuICAgIHJldHVybiBjdXN0b21Qcm9wcztcclxufVxyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vI3JlZ2lvbiAtIGRpc3BsYXlDdXN0b21Nb2RlT3B0cygpIC0gaGlkZXMgb3Igc2hvd3MgZGl2IHdpdGggY3VzdG9tIGdhbWUgb3B0aW9ucyBpbiBkb2N1bWVudFxyXG5sZXQgZGlzcGxheUN1c3RvbU1vZGVPcHRpb25zID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgaWYgKGdhbWVNb2RlSW5wdXQudmFsdWUgPT09IFwiY3VzdG9tXCIpIHtcclxuICAgICAgICBjdXN0b21Nb2RlT3B0aW9ucyEuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XHJcbiAgICB9IGVsc2UgeyBjdXN0b21Nb2RlT3B0aW9ucyEuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7IH1cclxufTtcclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLyNyZWdpb24gLSBjdXN0b21JbnB1dFZhbGlkYXRpb24oKSAtIGN1c3RvbSBnYW1lIG1vZGUgaW5wdXQgdmFsaWRhdGlvblxyXG5jb25zdCBjdXN0b21JbnB1dFZhbGlkYXRpb24gPSAobW9kZUluZm86IG51bWJlcltdKSA9PiB7Ly9nYW1lIG1vZGUgaW5mbyBbcm93cyxjb2xzLG1pbmVzXVxyXG4gICAgaWYgKG1vZGVJbmZvWzJdID49IG1vZGVJbmZvWzBdICogbW9kZUluZm9bMV0pIHsgIC8vbnVtIG9mIG1pbmVzIHZhbGlkYXRpb24sY2FuJ3QgYmUgbW9yZSBtaW5lcyB0aGFuIGZpZWxkcyBvciBlcXVhbCB0byBudW0gb2YgZmllbGRzXHJcbiAgICAgICAgYWxlcnQoXCJDYW4ndCBoYXZlIG1vcmUgbWluZXMgdGhhbiBmaWVsZHNcIik7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSByZXR1cm4gdHJ1ZTtcclxufTtcclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLyNyZWdpb24gLSBnYW1lTW9kZSgpIC0gZ2FtZSBtb2RlIHN3aXRjaGVyXHJcbmNvbnN0IGdhbWVNb2RlID0gKG1vZGU6IHN0cmluZyk6IG51bWJlcltdIHwgc3RyaW5nID0+IHtcclxuICAgIHN3aXRjaCAobW9kZSkge1xyXG4gICAgICAgIGNhc2UgXCJiZWdpbm5lclwiOlxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdhbWUgbW9kZTogQmVnaW5uZXIgOXg5IHRhYmxlIHdpdGggMTAgbWluZXNcIik7XHJcbiAgICAgICAgICAgIFBsYXllci5nZXRJbnN0YW5jZSgpLnNldEdhbWVNb2RlKG1vZGUpO1xyXG4gICAgICAgICAgICByZXR1cm4gR2FtZS5nZXRJbnN0YW5jZSgpLm1vZGVJbmZvKG1vZGUpO1xyXG4gICAgICAgIGNhc2UgXCJpbnRlcm1lZGlhdGVcIjpcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJHYW1lIG1vZGU6IEludGVybWVkaWF0ZSAxNngxNiB0YWJsZSB3aXRoIDQwIG1pbmVzXCIpO1xyXG4gICAgICAgICAgICBQbGF5ZXIuZ2V0SW5zdGFuY2UoKS5zZXRHYW1lTW9kZShtb2RlKTtcclxuICAgICAgICAgICAgcmV0dXJuIEdhbWUuZ2V0SW5zdGFuY2UoKS5tb2RlSW5mbyhtb2RlKTtcclxuICAgICAgICBjYXNlIFwiZXhwZXJ0XCI6XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR2FtZSBtb2RlOiBFeHBlcnQgMTZ4MzAgdGFibGUgd2l0aCA5OSBtaW5lc1wiKTtcclxuICAgICAgICAgICAgUGxheWVyLmdldEluc3RhbmNlKCkuc2V0R2FtZU1vZGUobW9kZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBHYW1lLmdldEluc3RhbmNlKCkubW9kZUluZm8obW9kZSk7XHJcbiAgICAgICAgY2FzZSBcImN1c3RvbVwiOlxyXG4gICAgICAgICAgICBQbGF5ZXIuZ2V0SW5zdGFuY2UoKS5zZXRHYW1lTW9kZShtb2RlKTtcclxuICAgICAgICAgICAgaWYgKGN1c3RvbUlucHV0VmFsaWRhdGlvbihnZXRDdXN0b21Qcm9wcygpKSA9PT0gZmFsc2UpIHsgcmV0dXJuIGdhbWVNb2RlKFwiVmFsaWRhdGlvblwiKSB9XHJcbiAgICAgICAgICAgIEdhbWUuZ2V0SW5zdGFuY2UoKS5zZXRDdXN0b21Nb2RlKGdldEN1c3RvbVByb3BzKCkpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgR2FtZSBtb2RlOiBDdXN0b20gJHtHYW1lLmdldEluc3RhbmNlKCkubW9kZUluZm8obW9kZSlbMF19eCR7R2FtZS5nZXRJbnN0YW5jZSgpLm1vZGVJbmZvKG1vZGUpWzFdfSB0YWJsZSB3aXRoICR7R2FtZS5nZXRJbnN0YW5jZSgpLm1vZGVJbmZvKG1vZGUpWzJdfSBtaW5lKHMpYCk7XHJcbiAgICAgICAgICAgIHJldHVybiBHYW1lLmdldEluc3RhbmNlKCkubW9kZUluZm8obW9kZSk7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgaWYgKG1vZGUgPT09IFwiVmFsaWRhdGlvblwiKSB7IGNvbnNvbGUuZXJyb3IoXCJWYWxpZGF0aW9uIGlzc3VlXCIpOyByZXR1cm4gXCJlcnJvciFcIiB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignVGhlcmUgaXMgbm8gZ2FtZSBtb2RlIHdpdGggdGhhdCBudW1iZXIhJyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJlcnJvciFcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vI3JlZ2lvbiAtIGV2ZW50IGxpc3RlbmVybnNcclxuZ2FtZU1vZGVJbnB1dC52YWx1ZSA9IFwiYmVnaW5uZXJcIjtcclxuZ2FtZU1vZGVJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBkaXNwbGF5Q3VzdG9tTW9kZU9wdGlvbnMpO1xyXG4vLyNlbmRyZWdpb25cclxuXHJcbmV4cG9ydCB7IGdhbWVNb2RlLCBnYW1lTW9kZUlucHV0IH07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL2dhbWVNb2RlLnRzIiwiaW1wb3J0IHsgR2FtZSwgUGxheWVyIH0gZnJvbSAnLi9kYXRhJztcclxuaW1wb3J0IHsgZGVmaW5lU3Vycm91bmRpbmcgfSBmcm9tICcuL3RhYmxlR3JpZCc7XHJcbmltcG9ydCB7IHJhbmRvbU51bWJlcnNBcnJheSB9IGZyb20gJy4vaGVscGVyRnVuY3MnO1xyXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PU1JTkVTPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8jcmVnaW9uIGNyZWF0ZU1pbmVzKCkgLSBjcmVhdGUgbWluZXMgYmFzZWQgb24gZ2FtZU1vZGVcclxuY29uc3QgY3JlYXRlTWluZXMgPSAobW9kZUluZm86IG51bWJlcltdKTogbnVtYmVyW10gPT4gey8vIGtyZWlyYSBtaW5lIGkgc29ydGlyYSBpaCBwbyB2ZWxpY2luaVxyXG4gICAgbGV0IG1pbmVzID0gcmFuZG9tTnVtYmVyc0FycmF5KG1vZGVJbmZvWzJdLCAobW9kZUluZm9bMF0gKiBtb2RlSW5mb1sxXSkpLnNvcnQoKGEsIGIpID0+IHsgcmV0dXJuIGEgLSBiIH0pO1xyXG4gICAgY29uc29sZS5sb2coXCJNaW5lcyBsb2NhdGlvbjogXCIgKyBtaW5lcyk7IC8vIHByb3ZlcmF2YW1vIHBvemljaWp1IG1pbmEgLy8gemEgZGV2IHBvdHJlYmVcclxuICAgIHJldHVybiBtaW5lcztcclxufVxyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vI3JlZ2lvbiAtIHNldE1pbmVzKCkgLSBzZXQgbWluZXMgb24gdGFibGUgKGJpbmQgdG8gYXR0cmlidXRlIGRhdGEtbWluZSlcclxuY29uc3Qgc2V0TWluZXMgPSAodGFibGU6IEhUTUxFbGVtZW50LCBtb2RlSW5mbzogbnVtYmVyW10sIG1pbmVJY29uOiBhbnkpOiB2b2lkID0+IHtcclxuICAgIGxldCBtaW5lczogbnVtYmVyW10gPSBjcmVhdGVNaW5lcyhtb2RlSW5mbyk7Ly9rcmVpcmFtbyBtaW5lXHJcbiAgICBjb25zdCBhbGxGaWVsZHMgPSB0YWJsZS5nZXRFbGVtZW50c0J5VGFnTmFtZShcInRkXCIpOyAvLyB1emltYW1vIHN2ZSB0ZCBlbGVtZW50ZSBpeiB0YWJlbGVcclxuICAgIG1pbmVzLmZvckVhY2gobWluZSA9PiB7ICAvLyBwb3N0YXZsamFtbyBpa29udSBib21iYSBuYSBzdmFraSB0ZCBrb2ppIHNlIHBva2xhcGEgc2Egbml6b20gbWluYS5cclxuICAgICAgICBhbGxGaWVsZHNbKG1pbmUgLSAxKV0uc2V0QXR0cmlidXRlKFwiZGF0YS1taW5lXCIsIG1pbmVJY29uKTsgLy8gLTEgemJvZyByYXpsaWtlIHUgcG96aWNpamkgcG9samEgdSBuaXp1IGFsbGZpZWxkcyBpIHBvemljaWplIG1pbmVcclxuICAgIH0pO1xyXG59XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uIC0gY2xlYXJNaW5lcygpIC0gY2xlYXIgbWluZXMgZnJvbSB0YWJsZVxyXG5jb25zdCBjbGVhck1pbmVzID0gKHRhYmxlOiBIVE1MRWxlbWVudCk6IHZvaWQgPT4ge1xyXG4gICAgY29uc3QgYWxsRmllbGRzID0gdGFibGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJ0ZFwiKTtcclxuICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoYWxsRmllbGRzLChmaWVsZDogSFRNTFRhYmxlRGF0YUNlbGxFbGVtZW50KSA9PiB7XHJcbiAgICAgICAgZmllbGQuc2V0QXR0cmlidXRlKCdkYXRhLW1pbmUnLCAnJyk7XHJcbiAgICB9KTtcclxufVxyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vTkFQT01FTkEgZGF0YS1taW5lIC0gYWtvIGplIGJvbWJhIHN0YXZsamEgc2UgaWtvbmEsIGFrbyBuaWplIHN0YXZsamEgc2UgYnJvaiBib21iaSB1IG9rcnV6ZW5qdVxyXG5cclxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1USVBTPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4vLyNyZWdpb24gLSB3cml0ZSB0aXBzIGJhc2VkIG9uIG1pbmVzIG9uIHRoZSBnaXZlbiB0YWJsZVxyXG5jb25zdCB3cml0ZVRpcHMgPSAodGFibGU6IEhUTUxUYWJsZUVsZW1lbnQpOiB2b2lkID0+IHtcclxuICAgIGNvbnN0IGFsbEZpZWxkcyA9IHRhYmxlLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwidGRcIik7IC8vIHNlbGVrdHVqZW1vIHN2YSBwb2xqYSB1IGRhdG9qIHRhYmVsaVxyXG4gICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChhbGxGaWVsZHMsIGZpZWxkID0+IHsgLy8gemEgc3Zha28gcG9samVcclxuICAgICAgICBpZiAoZmllbGQuZ2V0QXR0cmlidXRlKFwiZGF0YS1taW5lXCIpID09PSBcIlwiKSB7IC8vIGFrbyBqZSBlbGVtZW50IHByYXphbiAodGouIG5pamUgbWluYSwgamVyIHN1IG1pbmUgdmVjIHBvc3RhdmxqZW5lIG5hIHRhYmxpKVxyXG4gICAgICAgICAgICBsZXQgbWluZXNOdW0gPSBjb3VudE1pbmVzKGZpZWxkKTsgLy8gcHJvdmVyYXZhbW8gc3VzZWRuYSBwb2xqYSBpIGlzcGlzdWplbW8gYnJvaiBtaW5hIHUgb2tvbGluaVxyXG4gICAgICAgICAgICBpZiAobWluZXNOdW0gPT09IDApIHsgZmllbGQuc2V0QXR0cmlidXRlKFwiZGF0YS1taW5lXCIsIFwiXCIpOyBmaWVsZC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWVtcHR5XCIsIFwiMVwiKTsgfS8vIGFrbyBuaWplIG1pbmEgaSBuZW1hIHUgb2tydXplbmp1IHVwaXN1amVtbyB1IGRhdGEtZW1wdHkgMTsxIHphIHRydWU7XHJcbiAgICAgICAgICAgIGVsc2UgeyBmaWVsZC5zZXRBdHRyaWJ1dGUoXCJkYXRhLW1pbmVcIiwgbWluZXNOdW0udG9TdHJpbmcoKSk7IGZpZWxkLnNldEF0dHJpYnV0ZShcImRhdGEtZW1wdHlcIiwgXCIwXCIpOyAvKmVsZW1lbnQudGV4dENvbnRlbnQgPSB0ZXh0OyB6YSBkZXYgcG90cmViZSovIH0gLy9ha28gaW1hIG1pbmE7ZGF0YS1lbXB0eSA7IDAgemEgZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uIC0gZnVua2NpamEga29qYSBwcm92ZXJhdmEgcG9samEgdSBva3J1emVuanVcclxuZnVuY3Rpb24gY291bnRNaW5lcyhmaWVsZDogSFRNTFRhYmxlQ2VsbEVsZW1lbnQpOiBudW1iZXIgeyAvLyBwcm9zbGVkanVqZW1vIHBvbGplIG5hIG9zbm92dSBrb2plZyB2cnNpbW8gcHJvdmVydSBpIGJyb2oga29sb25hIHpib2cgb3JpamVudGFjaWplXHJcbiAgICBjb25zdCBnYW1lTW9kZUluZm8gPSBHYW1lLmdldEluc3RhbmNlKCkubW9kZUluZm8oUGxheWVyLmdldEluc3RhbmNlKCkuZ2V0R2FtZU1vZGUoKSk7XHJcbiAgICBjb25zdCBudW1PZkNvbHM6IG51bWJlciA9IGdhbWVNb2RlSW5mb1sxXTtcclxuICAgIGxldCBjb3VudGVyID0gMDsgLy8gYnJvamFjIG1pbmEgdSBva3J1emVuanUgcG9samFcclxuICAgIGxldCBzdXJyb3VuZGluZyA9IGRlZmluZVN1cnJvdW5kaW5nKEdhbWUuZ2V0SW5zdGFuY2UoKS5nZXRHYW1lVGFibGUoKSwgZmllbGQpOyAvLyBrcmVpcmFtbyBva3J1emVuamUgKHBveml2YW1vIGZ1bmtjaWp1IHphIHRvKVxyXG4gICAgc3Vycm91bmRpbmcuZm9yRWFjaChzdXJGaWVsZCA9PiB7IC8vIHByb3ZlcmF2YW1vIHN2YWtvIHBvbGplIHUgb2tydXplbmp1XHJcbiAgICAgICAgaWYgKHN1ckZpZWxkID09PSBudWxsKSB7IH0vLyBha28gamUgcG9samUgdmFuIHRhYmVsZSwgaWdub3Jpc2lcclxuICAgICAgICBlbHNlIGlmIChzdXJGaWVsZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLW1pbmVcIikgPT09IFwiXFx1RDgzRFxcdURDQTNcIikgeyAvLyB6YSBzdmFrdSBtaW51XHJcbiAgICAgICAgICAgIGNvdW50ZXIrKzsgLy9kb2RhaiBqZWRhbiB1IGJyb2phY1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGNvdW50ZXI7IC8vIGNlbGEgZnVua2NpamEgdnJhY2EgYnJvamFjIHRqLiB1a3VwYSBicm9qIG1pbmEgdSBva3J1emVuanVcclxufVxyXG4vLyNlbmRyZWdpb25cclxuXHJcbmV4cG9ydCB7IHNldE1pbmVzLCBjbGVhck1pbmVzLCB3cml0ZVRpcHMgfTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvbWluZXNBbmRUaXBzLnRzIiwiaW1wb3J0IHsgR2FtZSwgUGxheWVyIH0gZnJvbSAnLi9kYXRhJztcclxuaW1wb3J0IHsgZGVmaW5lU3Vycm91bmRpbmcgfSBmcm9tICcuL3RhYmxlR3JpZCc7XHJcblxyXG5cclxuXHJcbi8vI3JlZ2lvbiAtIHN0b3BDbGljaygpIC0gc3RvcGlyYSBldmVudExJc3RlbmVyIG5hIGVsZW1lbnR1IGtvamkgamUga2xpa251dFxyXG5mdW5jdGlvbiBzdG9wQ2xpY2soZXZlbnQ6IGFueSkge1xyXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbn1cclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLz09PT09PT09PT09PT09PT09PT09PUVNUFRZIEZMT1c9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyNyZWdpb24gLSBvcGVuRW1wdHlFbGVtZW50KCkgLSBmbG93IGZ1bmN0aW9uXHJcblxyXG5sZXQgb3BlbkVtcHR5RWxlbWVudCA9IChlbGVtZW50OiBIVE1MVGFibGVEYXRhQ2VsbEVsZW1lbnQpID0+IHsvLyBwb2tyZWNlIGVtcHR5IGZsb3cgcHJvdmVydVxyXG4gICAgbGV0IGVtcHR5RmllbGRzID0gZmlyc3RFbXB0eUZpZWxkQ2hlY2soZWxlbWVudCk7Ly9wcm92ZXJhdmEgc2UgcHJ2byBwcmF6bm8gcG9samUgaSBldmlkZW50aXJhanUgb3N0YWxhIHByYXpuYSBwb2xqYSB1IG9rcnV6ZW5qdVxyXG4gICAgLy8gY29uc29sZS5sb2coZW1wdHlGaWVsZHMpO1xyXG4gICAgbGV0IHN0b3BTZWFyY2ggPSBmYWxzZTtcclxuXHJcbiAgICB3aGlsZSAoc3RvcFNlYXJjaCA9PSBmYWxzZSkge1xyXG4gICAgICAgIGlmIChlbXB0eUZpZWxkcy5sZW5ndGggIT0gMCkge1xyXG4gICAgICAgICAgICBsZXQgbmV3TWFpbkFycmF5OiBhbnlbXSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgZW1wdHlGaWVsZHMuZm9yRWFjaChmaWVsZCA9PiB7Ly8gemEgc3Zha28gcHJhem5vIHBvbGplXHJcbiAgICAgICAgICAgICAgICBlbXB0eUNlbGwoZmllbGQpOy8vIHRvdGFsbm8gZ2EgcHJhem5pbW9cclxuICAgICAgICAgICAgICAgIGxldCBzdWJBcnJheSA9IGRlZmluZVN1cnJvdW5kaW5nKEdhbWUuZ2V0SW5zdGFuY2UoKS5nZXRHYW1lVGFibGUoKSwgZmllbGQpOy8vcHJvdmVyYXZhbW8gb2tydXplbmplIHRvZyBwb2xqYVxyXG4gICAgICAgICAgICAgICAgc3ViQXJyYXkuZm9yRWFjaCgoZWxlbWVudCkgPT4gey8vemEgc3Zha28gcG9samUgaXogb2tydXplbmphIHRvZyBwb2xqYVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbGVtZW50ICE9PSBudWxsKSB7Ly9ha28gamUgZWxlbWVudCB1IG9rdmlydSB0YWJsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShcImRhdGEtY2xpY2tcIiwgXCIxXCIpOy8vcG9zdGF2bGphbW8gZGEgamUga2xpa251dG9cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc3RvcENsaWNrKTsvL2JyaXNlbW8gZXZlbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHN0b3BDbGljayk7Ly8gYnJpc2VtbyBldmVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV3TWFpbkFycmF5LmluZGV4T2YoZWxlbWVudCkgIT09IC0xKSB7IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7IG5ld01haW5BcnJheS5wdXNoKGVsZW1lbnQpIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRleHQgPSBlbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtaWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb250ZXh0ID09PSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW1wdHlDZWxsKDxhbnk+ZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIG5ld01haW5BcnJheSA9IGNoZWNrRW1wdHlGaWVsZHMobmV3TWFpbkFycmF5KTtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKG5ld01haW5BcnJheSk7XHJcbiAgICAgICAgICAgICAgICBlbXB0eUZpZWxkcyA9IG5ld01haW5BcnJheTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHN0b3BTZWFyY2ggPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHN0b3BTZWFyY2ggPSB0cnVlO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uIC0gZW1wdHlDZWxsKClcclxuY29uc3QgZW1wdHlDZWxsID0gKGVsZW1lbnQ6IEhUTUxUYWJsZURhdGFDZWxsRWxlbWVudCk6IHZvaWQgPT4ge1xyXG4gICAgaWYgKGVsZW1lbnQgIT09IG51bGwpIHtcclxuICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShcImRhdGEtZW1wdHlcIiwgXCJcIik7Ly9BTEVSVCBicmlzZSBzZSBpbmZvIG8gdG9tZSBkYSBsaSBqZSBwcmF6bmEgY2VsaWphLCBwcm92ZXJpdGkgemFzdG9cclxuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJlbXB0eVwiKTsvL2NzcyBjbGFzYSBkYSBzZSBvYm9qaSBwcmF6bm8gcG9samVcclxuICAgIH1cclxufVxyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vI3JlZ2lvbiAtIGNoZWNrRW1wdHlGaWVsZHMoKSAtIGNoZWNrIGVtcHR5IGZpZWxkcyBpZiBpdCBpcyB0b3RhbGx5IGVtcHR5IG9yIGl0cyBhIHRpcFxyXG5jb25zdCBjaGVja0VtcHR5RmllbGRzID0gKGZpZWxkczogYW55KSA9PiB7XHJcbiAgICBsZXQgY2hlY2tlZEVtcHR5RmllbGRzOiBIVE1MVGFibGVEYXRhQ2VsbEVsZW1lbnRbXSA9IFtdO1xyXG4gICAgZmllbGRzLmZvckVhY2goZmllbGQgPT4ge1xyXG4gICAgICAgIGlmIChmaWVsZCA9PT0gbnVsbCkgeyB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGZpZWxkLnNldEF0dHJpYnV0ZShcImRhdGEtY2xpY2tcIiwgXCIxXCIpOy8vc2V0IGZpZWxkIGFzIGNsaWNrZWRcclxuICAgICAgICAgICAgZmllbGQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHN0b3BDbGljayk7Ly91a2RpZGEgZXZlbnRcclxuICAgICAgICAgICAgZmllbGQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBzdG9wQ2xpY2spOy8vdWtpZGEgZXZlbnRcclxuICAgICAgICAgICAgY29uc3QgaXNFbXB0eSA9IGZpZWxkLmdldEF0dHJpYnV0ZShcImRhdGEtZW1wdHlcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbnRleHQgPSBmaWVsZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLW1pbmVcIik7XHJcbiAgICAgICAgICAgIGlmIChpc0VtcHR5ID09PSBcIjFcIikgey8vIGlmIGZpZWxkIGlzIHRvdGFsbHkgZW1wdHlcclxuICAgICAgICAgICAgICAgIGNoZWNrZWRFbXB0eUZpZWxkcy5wdXNoKGZpZWxkKTtcclxuICAgICAgICAgICAgICAgIGZpZWxkLmNsYXNzTGlzdC5hZGQoXCJlbXB0eVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHsgZmllbGQudGV4dENvbnRlbnQgPSBjb250ZXh0OyB9Ly8gaWYgaXRzIHRpcCwgc2hvdyBpdFxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGNoZWNrZWRFbXB0eUZpZWxkczsgLy8gcmV0dXJuaW5nIGFycmF5IG9mIHRvdGFsbHkgZW1wdHkgZmllbGRzXHJcbn1cclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLyNyZWdpb24gLSBmaXJzdEVtcHR5RmllbGRDaGVjaygpIC0gRmlyc3QgY2xpY2tlZCBlbXB0eSBlbGVtZW50IGNoZWNrLCByZXR1cm5zIGFycmF5IG9mIGVtcHR5IGJsYW5rIGVsZW1lbnRzXHJcbmNvbnN0IGZpcnN0RW1wdHlGaWVsZENoZWNrID0gKGZpZWxkOiBIVE1MVGFibGVEYXRhQ2VsbEVsZW1lbnQpID0+IHsvL2NoZWNraW5nIGZpcnN0IGVtcHR5IGNsaWNrZWQgZmllbGRcclxuICAgIGZpZWxkLnNldEF0dHJpYnV0ZShcImRhdGEtY2xpY2tcIiwgXCIxXCIpOyAvLyBzZXQgY2xpY2tlZFxyXG4gICAgZmllbGQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHN0b3BDbGljayk7Ly9zdG9waXJhIGV2ZW50IGNsaWNrXHJcbiAgICBmaWVsZC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHN0b3BDbGljayk7IC8vIHN0b3BpcmEgZXZlbnQgbW91c2Vkb3duXHJcbiAgICBlbXB0eUNlbGwoZmllbGQpOyAvLyByZW1vdmUgZW1wdHkgYXR0cmlidXRlLCBjb2xvciBmaWVsZFxyXG5cclxuICAgIGNvbnN0IHN1cnJvdW5kRmllbGRzID0gZGVmaW5lU3Vycm91bmRpbmcoR2FtZS5nZXRJbnN0YW5jZSgpLmdldEdhbWVUYWJsZSgpLCBmaWVsZCk7Ly9rcmVpcmEgbml6IHN1c2VkbmloIHBvbGphXHJcbiAgICBjb25zdCBlbXB0eUZpZWxkcyA9IGNoZWNrRW1wdHlGaWVsZHMoc3Vycm91bmRGaWVsZHMpO1xyXG4gICAgcmV0dXJuIGVtcHR5RmllbGRzO1xyXG59XHJcbi8vI2VuZHJlZ2lvblxyXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5leHBvcnQgeyBvcGVuRW1wdHlFbGVtZW50LCBzdG9wQ2xpY2sgfTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvZW1wdHlGbG93LnRzIiwibGV0IHRpbWVyID0ge1xyXG4gICAgdGltZToge1xyXG4gICAgICAgIGhvdXJzOiAwLFxyXG4gICAgICAgIG1pbnV0ZXM6IDAsXHJcbiAgICAgICAgc2Vjb25kczogMFxyXG4gICAgfSxcclxuICAgIGludGVydmFsOiAxLFxyXG4gICAgdGltZUluY3JlbWVudDogKCkgPT4ge1xyXG4gICAgICAgIGlmICh0aW1lci50aW1lLnNlY29uZHMgPCA1OSkgeyB0aW1lci50aW1lLnNlY29uZHMrKyB9XHJcbiAgICAgICAgZWxzZSBpZiAodGltZXIudGltZS5zZWNvbmRzID09PSA1OSAmJiB0aW1lci50aW1lLm1pbnV0ZXMgPCA1OSkgeyB0aW1lci50aW1lLnNlY29uZHMgPSAwLCB0aW1lci50aW1lLm1pbnV0ZXMrKyB9XHJcbiAgICAgICAgZWxzZSBpZiAodGltZXIudGltZS5zZWNvbmRzID09PSA1OSAmJiB0aW1lci50aW1lLm1pbnV0ZXMgPT09IDU5KSB7IHRpbWVyLnRpbWUuc2Vjb25kcyA9IDAsIHRpbWVyLnRpbWUubWludXRlcyA9IDAsIHRpbWVyLnRpbWUuaG91cnMrKyB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5cclxubGV0IGdldFNlY29uZHMgPSAoKTogbnVtYmVyID0+IHtcclxuICAgIHJldHVybiB0aW1lci50aW1lLnNlY29uZHMgKyAodGltZXIudGltZS5taW51dGVzICogNjApICsgKHRpbWVyLnRpbWUuaG91cnMgKiAzNjApO1xyXG59O1xyXG5cclxuXHJcbmxldCBnZXRTdHJpbmdUaW1lID0gKCkgPT4ge1xyXG4gICAgbGV0IHByZXZUaW1lID0gW3RpbWVyLnRpbWUuaG91cnMsIHRpbWVyLnRpbWUubWludXRlcywgdGltZXIudGltZS5zZWNvbmRzXTtcclxuICAgIGxldCBjdXJyVGltZSA9IHByZXZUaW1lLm1hcCgodGltZUVsZW1lbnQpID0+IHsgaWYgKHRpbWVFbGVtZW50IDwgMTApIHsgcmV0dXJuIFwiMFwiICsgdGltZUVsZW1lbnQgfSBlbHNlIHsgcmV0dXJuIHRpbWVFbGVtZW50IH0gfSk7XHJcbiAgICByZXR1cm4gYCR7Y3VyclRpbWVbMF19IDogJHtjdXJyVGltZVsxXX0gOiAke2N1cnJUaW1lWzJdfWA7XHJcbn07XHJcblxyXG5sZXQgc3RhcnRUaW1lciA9IChzdGVwID0gMSk6IHZvaWQgPT4ge1xyXG4gICAgdGltZXIuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCh0aW1lci50aW1lSW5jcmVtZW50LCBzdGVwICogMTAwMCk7XHJcbn07XHJcblxyXG5sZXQgc3RvcFRpbWVyID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgY2xlYXJJbnRlcnZhbCh0aW1lci5pbnRlcnZhbCk7XHJcbn07XHJcblxyXG5sZXQgcmVzZXRUaW1lciA9ICgpID0+IHtcclxuICAgIGZvciAobGV0IGVsZW1lbnQgaW4gdGltZXIudGltZSkgeyB0aW1lci50aW1lW2VsZW1lbnRdID0gMCB9O1xyXG59XHJcblxyXG5sZXQgc3RyaW5nSW50ZXJ2YWwgPSAwOyAvLyB6YSBpc3BpcyBzdHJpbmcgdnJlbWVuYVxyXG5jb25zdCB0aW1lclBsYWNlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RpbWVyUGxhY2UnKTtcclxuXHJcbmxldCBzdGFydFRpbWVySGFuZGxlciA9ICgpID0+IHtcclxuICAgIHN0YXJ0VGltZXIoKTtcclxuICAgIHN0cmluZ0ludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4geyB0aW1lclBsYWNlLnRleHRDb250ZW50ID0gZ2V0U3RyaW5nVGltZSgpIH0sIDEwMCk7XHJcbn07XHJcblxyXG5sZXQgc3RvcFRpbWVySGFuZGxlciA9ICgpID0+IHtcclxuICAgIHN0b3BUaW1lcigpO1xyXG4gICAgY2xlYXJJbnRlcnZhbChzdHJpbmdJbnRlcnZhbCk7XHJcbn07XHJcblxyXG5cclxuZXhwb3J0IHsgc3RhcnRUaW1lckhhbmRsZXIsIHN0b3BUaW1lciwgcmVzZXRUaW1lciwgZ2V0U3RyaW5nVGltZSwgdGltZXJQbGFjZSwgc3RvcFRpbWVySGFuZGxlciwgZ2V0U2Vjb25kcyB9O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvdGltZXIudHMiXSwic291cmNlUm9vdCI6IiJ9