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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
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
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__data__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__gameMode__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tableGrid__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__minesAndTips__ = __webpack_require__(4);




const playerGameMode = __WEBPACK_IMPORTED_MODULE_0__data__["b" /* Player */].getInstance().getGameMode();
const gameModeInfo = __WEBPACK_IMPORTED_MODULE_0__data__["a" /* Game */].getInstance().modeInfo(playerGameMode);
const mineIcon = "\uD83D\uDCA3"; // definisemo ikonicu za minu u nekom momentu
//#region - printGrid() - creates full Grid and adds it to the document
const printGrid = () => {
    let gameModeInfo = Object(__WEBPACK_IMPORTED_MODULE_1__gameMode__["a" /* gameMode */])(__WEBPACK_IMPORTED_MODULE_1__gameMode__["b" /* gameModeInput */].value);
    //create table
    Object(__WEBPACK_IMPORTED_MODULE_2__tableGrid__["a" /* createGrid */])(gameModeInfo);
    const table = __WEBPACK_IMPORTED_MODULE_0__data__["a" /* Game */].getInstance().getGameTable();
    //set mines
    Object(__WEBPACK_IMPORTED_MODULE_3__minesAndTips__["a" /* setMines */])(table, gameModeInfo, mineIcon);
    // // //set tips
    Object(__WEBPACK_IMPORTED_MODULE_3__minesAndTips__["b" /* writeTips */])(table);
    // // //print table
    __WEBPACK_IMPORTED_MODULE_0__data__["e" /* gameSection */].appendChild(table);
    // //set listeners
    table.addEventListener('click', () => { console.log(`clicked field`); });
};
//#endregion
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
        return "reset";
    }
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
//#region - event listeners
__WEBPACK_IMPORTED_MODULE_0__data__["c" /* gameOptionsSection */].addEventListener('click', onClick);
//#endregion


/***/ }),
/* 3 */
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
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return setMines; });
/* unused harmony export clearMines */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return writeTips; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__data__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tableGrid__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helperFuncs__ = __webpack_require__(5);



//==============================MINES=================================================================
//#region createMines() - create mines based on gameMode
const createMines = (modeInfo) => {
    let mines = Object(__WEBPACK_IMPORTED_MODULE_2__helperFuncs__["a" /* randomNumbersArray */])(modeInfo[2], (modeInfo[0] * modeInfo[1])).sort((a, b) => { return a - b; });
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
    allFields.forEach((field) => {
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
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return randomNumbersArray; });
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



/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNWU0MjFlNmZjY2FhYjRiYmQ1MjMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2RhdGEudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3RhYmxlR3JpZC50cyIsIndlYnBhY2s6Ly8vLi9hcHAvYXBwLnRzIiwid2VicGFjazovLy8uL2FwcC9nYW1lTW9kZS50cyIsIndlYnBhY2s6Ly8vLi9hcHAvbWluZXNBbmRUaXBzLnRzIiwid2VicGFjazovLy8uL2FwcC9oZWxwZXJGdW5jcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDN0RBO0FBQUEscUJBQXFCO0FBQ3JCLE1BQU0sZUFBZSxHQUFzQixRQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzVFLE1BQU0sZUFBZSxHQUFzQixRQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzVFLE1BQU0sZUFBZSxHQUFxQixRQUFRLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQzlFLE1BQU0sa0JBQWtCLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUNsRSxNQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLE1B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LEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUNsQyxNQUFNLEdBQUcsWUFBWSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztRQUMxQyxDQUFDO1FBQ0QsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQztBQUNqQixDQUFDO0FBQ0QsWUFBWTtBQUVaLHNHQUFzRztBQUV4RSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA1ZTQyMWU2ZmNjYWFiNGJiZDUyMyIsIi8vI3JlZ2lvbiAtIHNlbGVjdG9yc1xyXG5jb25zdCBnYW1lU3RhcnRCdXR0b24gPSA8SFRNTEJ1dHRvbkVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXJ0Jyk7XHJcbmNvbnN0IGdhbWVSZXNldEJ1dHRvbiA9IDxIVE1MQnV0dG9uRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzZXQnKTtcclxuY29uc3QgcGxheWVyTmFtZUlucHV0ID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXJuYW1lJyk7XHJcbmNvbnN0IGdhbWVPcHRpb25zU2VjdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lT3B0aW9ucycpO1xyXG5jb25zdCBnYW1lU2VjdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lJyk7XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxucGxheWVyTmFtZUlucHV0LnZhbHVlID0gXCJcIjtcclxuXHJcblxyXG5cclxuLy8jcmVnaW9uIC0gR2FtZSBzaW5nbGV0b24gY2xhc3MgZGVmaW5pdGlvblxyXG5jbGFzcyBHYW1lIHtcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IEdhbWUgPSBuZXcgR2FtZSgpO1xyXG5cclxuICAgIHByaXZhdGUgX21vZGUgPSB7XHJcbiAgICAgICAgYmVnaW5uZXI6IFs5LCA5LCAxMF0sXHJcbiAgICAgICAgaW50ZXJtZWRpYXRlOiBbMTYsIDE2LCA0MF0sXHJcbiAgICAgICAgZXhwZXJ0OiBbMTYsIDMwLCA5OV0sXHJcbiAgICAgICAgY3VzdG9tOiBbMCwgMCwgMF1cclxuICAgIH07XHJcblxyXG4gICAgcHJpdmF0ZSBfZ2FtZVRhYmxlOiBIVE1MVGFibGVFbGVtZW50O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIGlmIChHYW1lLl9pbnN0YW5jZSkgeyB0aHJvdyBuZXcgRXJyb3IoXCJFcnJvciwgd3JvbmcgdXNlIG9mIEdhbWUgaW5zdGFuY2UhXCIpIH1cclxuICAgICAgICBHYW1lLl9pbnN0YW5jZSA9IHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBHYW1lIHtcclxuICAgICAgICByZXR1cm4gR2FtZS5faW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG1vZGVJbmZvKG1vZGVOYW1lOiBzdHJpbmcpOiBudW1iZXJbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21vZGVbbW9kZU5hbWVdO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRDdXN0b21Nb2RlKGluZm86IG51bWJlcltdKSB7XHJcbiAgICAgICAgdGhpcy5fbW9kZS5jdXN0b20gPSBpbmZvO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGBDdXN0b20gbW9kZSBzZXQgdG8gJHt0aGlzLl9tb2RlLmN1c3RvbX1gKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0R2FtZVRhYmxlKGVsZW1lbnQpIHtcclxuICAgICAgICB0aGlzLl9nYW1lVGFibGUgPSBlbGVtZW50O1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGBUYWJsZSBjcmVhdGVkYCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEdhbWVUYWJsZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZ2FtZVRhYmxlO1xyXG4gICAgfVxyXG59XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uIC0gUGxheWVyIC0gc2luZ2xldG9uIGNsYXNzIGRlZmluaXRpb25cclxuY2xhc3MgUGxheWVyIHtcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IFBsYXllciA9IG5ldyBQbGF5ZXIoKTtcclxuICAgIHByaXZhdGUgX25hbWU6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBwcml2YXRlIF9nYW1lTW9kZTogc3RyaW5nID0gXCJub25lXCI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgaWYgKFBsYXllci5faW5zdGFuY2UpIHsgdGhyb3cgbmV3IEVycm9yKFwiRXJyb3IsIHdyb25nIHVzZSBvZiBQbGF5ZXIgaW5zdGFuY2UhXCIpIH1cclxuICAgICAgICBQbGF5ZXIuX2luc3RhbmNlID0gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IFBsYXllciB7XHJcbiAgICAgICAgcmV0dXJuIFBsYXllci5faW5zdGFuY2U7XHJcbiAgICB9XHJcbiAgICBnZXROYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX25hbWU7XHJcbiAgICB9XHJcbiAgICBzZXROYW1lKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9uYW1lID0gdmFsdWU7XHJcbiAgICAgICAgY29uc29sZS5sb2coYFBsYXllcnMgbmFtZSBzZXQgdG86ICR7dGhpcy5fbmFtZX1gKVxyXG4gICAgfVxyXG5cclxuICAgIGdldEdhbWVNb2RlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dhbWVNb2RlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEdhbWVNb2RlKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9nYW1lTW9kZSA9IHZhbHVlO1xyXG4gICAgfVxyXG59XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuZXhwb3J0IHsgR2FtZSwgUGxheWVyLCBnYW1lU3RhcnRCdXR0b24sIGdhbWVSZXNldEJ1dHRvbiwgcGxheWVyTmFtZUlucHV0LCBnYW1lT3B0aW9uc1NlY3Rpb24sIGdhbWVTZWN0aW9uIH07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL2RhdGEudHMiLCJpbXBvcnQgeyBHYW1lLCBQbGF5ZXIgfSBmcm9tICcuL2RhdGEnO1xyXG5cclxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1UQUJMRSBHUklEPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4vLyNyZWdpb24gLSBjcmVhdGVzIHRhYmxlIGdyaWQgZm9yIGdpdmVuIGdhbWUgbW9kZVxyXG5jb25zdCBjcmVhdGVHcmlkID0gKHJvd3NBbmRDb2xzOiBudW1iZXJbXSk6IHZvaWQgPT4ge1xyXG4gICAgbGV0IHRhYmxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGFibGUnKTtcclxuICAgIGxldCBjZWxsQ291bnRlciA9IDE7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJvd3NBbmRDb2xzWzBdOyBpKyspIHtcclxuICAgICAgICBsZXQgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKTtcclxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHJvd3NBbmRDb2xzWzFdOyBqKyspIHtcclxuICAgICAgICAgICAgbGV0IGNvbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XHJcbiAgICAgICAgICAgIGNvbC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBjZWxsQ291bnRlciArICdmaWVsZCcpO1xyXG4gICAgICAgICAgICBjb2wuc2V0QXR0cmlidXRlKFwiZGF0YS1pZFwiLCBjZWxsQ291bnRlciArICdmaWVsZCcpO1xyXG4gICAgICAgICAgICBjb2wuc2V0QXR0cmlidXRlKFwiZGF0YS1taW5lXCIsIFwiXCIpO1xyXG4gICAgICAgICAgICBjb2wuc2V0QXR0cmlidXRlKFwiZGF0YS1lbXB0eVwiLCBcIlwiKTtcclxuICAgICAgICAgICAgY29sLnNldEF0dHJpYnV0ZShcImRhdGEtY2xpY2tcIiwgXCJcIik7XHJcbiAgICAgICAgICAgIGNlbGxDb3VudGVyKys7XHJcbiAgICAgICAgICAgIHJvdy5hcHBlbmRDaGlsZChjb2wpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0YWJsZS5hcHBlbmRDaGlsZChyb3cpO1xyXG4gICAgfVxyXG4gICAgR2FtZS5nZXRJbnN0YW5jZSgpLnNldEdhbWVUYWJsZSh0YWJsZSk7XHJcbn07XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuXHJcbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Qk9SREVSUz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuLy8jcmVnaW9uIC0gY3JlYXRlcyBsZWZ0IGJvcmRlciBmb3IgdGFibGUgZ3JpZFxyXG5jb25zdCBjcmVhdGVMZWZ0Qm9yZGVyID0gKG51bU9mUm93czogbnVtYmVyLCBudW1PZkNvbHM6IG51bWJlcikgPT4ge1xyXG4gICAgbGV0IGxlZnRCb3JkZXJGaWVsZHM6IG51bWJlcltdID0gWzFdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1PZlJvd3MgLSAxOyBpKyspIHtcclxuICAgICAgICBsZXQgYm9yZGVyRmllbGQgPSBsZWZ0Qm9yZGVyRmllbGRzW2ldICsgbnVtT2ZDb2xzO1xyXG4gICAgICAgIGxlZnRCb3JkZXJGaWVsZHMucHVzaChib3JkZXJGaWVsZCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbGVmdEJvcmRlckZpZWxkcztcclxufVxyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vI3JlZ2lvbiAtIGNyZWF0ZXMgcmlnaHQgYm9yZGVyIGZvciB0YWJsZSBncmlkXHJcbmNvbnN0IGNyZWF0ZVJpZ2h0Qm9yZGVyID0gKG51bU9mUm93czogbnVtYmVyLCBudW1PZkNvbHM6IG51bWJlcikgPT4ge1xyXG4gICAgbGV0IHJpZ2h0Qm9yZGVyRmllbGRzOiBudW1iZXJbXSA9IFtudW1PZkNvbHNdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1PZlJvd3MgLSAxOyBpKyspIHtcclxuICAgICAgICBsZXQgYm9yZGVyRmllbGQgPSByaWdodEJvcmRlckZpZWxkc1tpXSArIG51bU9mQ29scztcclxuICAgICAgICByaWdodEJvcmRlckZpZWxkcy5wdXNoKGJvcmRlckZpZWxkKTtcclxuICAgIH1cclxuICAgIHJldHVybiByaWdodEJvcmRlckZpZWxkcztcclxufVxyXG4vLyNlbmRyZWdpb25cclxuXHJcblxyXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVNVUlJPVU5ESU5HPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbi8vI3JlZ2lvbiAtIGRlZmluZVN1cnJvdW5kaW5nKCkgLSBjcmVhdGVzIHN1cnJvdW5kaW5nIGJhc2VkIG9uIGZpZWxkIHBvc2l0aW9uIChiYXNlZCBvbiBpZClcclxuXHJcbmNvbnN0IGRlZmluZVN1cnJvdW5kaW5nID0gKHRhYmxlOiBFbGVtZW50LCBlbGVtZW50OiBIVE1MRWxlbWVudCkgPT4geyAvLyBkZWZpbmlzZW1vIG9rb2xuYSBwb2xqYSBuYSBvc25vdnUgZGF0b2cgcG9samEgaSBicm9qYSBrb2xvbmEgdGFiZWxlXHJcbiAgICBsZXQgc3Vycm91bmRpbmc7XHJcbiAgICBjb25zdCBpZCA9IHBhcnNlSW50KGVsZW1lbnQuaWQpO1xyXG4gICAgY29uc3QgZ2FtZU1vZGVJbmZvID0gR2FtZS5nZXRJbnN0YW5jZSgpLm1vZGVJbmZvKFBsYXllci5nZXRJbnN0YW5jZSgpLmdldEdhbWVNb2RlKCkpO1xyXG4gICAgY29uc3QgbnVtT2ZSb3dzID0gZ2FtZU1vZGVJbmZvWzBdO1xyXG4gICAgY29uc3QgbnVtT2ZDb2xzID0gZ2FtZU1vZGVJbmZvWzFdO1xyXG5cclxuICAgIC8vYmFzZSBzdXJyb3VuZGluZ1xyXG4gICAgY29uc3QgbGVmdCA9IHRhYmxlLnF1ZXJ5U2VsZWN0b3IoYFtpZD1cIiR7aWQgLSAxfWZpZWxkXCJdYCk7XHJcbiAgICBjb25zdCB1cExlZnQgPSB0YWJsZS5xdWVyeVNlbGVjdG9yKGBbaWQ9XCIke2lkIC0gbnVtT2ZDb2xzIC0gMX1maWVsZFwiXWApO1xyXG4gICAgY29uc3QgdXAgPSB0YWJsZS5xdWVyeVNlbGVjdG9yKGBbaWQ9XCIke2lkIC0gbnVtT2ZDb2xzfWZpZWxkXCJdYCk7XHJcbiAgICBjb25zdCB1cFJpZ2h0ID0gdGFibGUucXVlcnlTZWxlY3RvcihgW2lkPVwiJHtpZCAtIG51bU9mQ29scyArIDF9ZmllbGRcIl1gKTtcclxuICAgIGNvbnN0IHJpZ2h0ID0gdGFibGUucXVlcnlTZWxlY3RvcihgW2lkPVwiJHtpZCArIDF9ZmllbGRcIl1gKTtcclxuICAgIGNvbnN0IHJpZ2h0RG93biA9IHRhYmxlLnF1ZXJ5U2VsZWN0b3IoYFtpZD1cIiR7aWQgKyBudW1PZkNvbHMgKyAxfWZpZWxkXCJdYCk7XHJcbiAgICBjb25zdCBkb3duID0gdGFibGUucXVlcnlTZWxlY3RvcihgW2lkPVwiJHtpZCArIG51bU9mQ29sc31maWVsZFwiXWApO1xyXG4gICAgY29uc3QgZG93bkxlZnQgPSB0YWJsZS5xdWVyeVNlbGVjdG9yKGBbaWQ9XCIke2lkICsgbnVtT2ZDb2xzIC0gMX1maWVsZFwiXWApO1xyXG5cclxuICAgIC8vY3JlYXRlIGJvcmRlcnNcclxuICAgIGNvbnN0IGxlZnRCb3JkZXIgPSBjcmVhdGVMZWZ0Qm9yZGVyKG51bU9mUm93cywgbnVtT2ZDb2xzKTtcclxuICAgIGNvbnN0IHJpZ2h0Qm9yZGVyID0gY3JlYXRlUmlnaHRCb3JkZXIobnVtT2ZSb3dzLCBudW1PZkNvbHMpO1xyXG5cclxuICAgIC8vc3Vycm91bmRpbmcgYmFzZWQgb24gZmllbGQtYm9yZGVycyByZWxhdGlvblxyXG4gICAgaWYgKGxlZnRCb3JkZXIuaW5kZXhPZihpZCkgIT09IC0xKSB7XHJcbiAgICAgICAgc3Vycm91bmRpbmcgPSBbdXAsIHVwUmlnaHQsIHJpZ2h0LCByaWdodERvd24sIGRvd25dO1xyXG4gICAgfSBlbHNlIGlmIChyaWdodEJvcmRlci5pbmRleE9mKGlkKSAhPT0gLTEpIHtcclxuICAgICAgICBzdXJyb3VuZGluZyA9IFtsZWZ0LCB1cExlZnQsIHVwLCBkb3duLCBkb3duTGVmdF07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHN1cnJvdW5kaW5nID0gW2xlZnQsIHVwTGVmdCwgdXAsIHVwUmlnaHQsIHJpZ2h0LCByaWdodERvd24sIGRvd24sIGRvd25MZWZ0XTtcclxuICAgIH1cclxuICAgIHJldHVybiBzdXJyb3VuZGluZztcclxufVxyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuXHJcbmV4cG9ydCB7IGNyZWF0ZUdyaWQsZGVmaW5lU3Vycm91bmRpbmd9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC90YWJsZUdyaWQudHMiLCJpbXBvcnQgeyBHYW1lLCBQbGF5ZXIsIGdhbWVPcHRpb25zU2VjdGlvbiwgZ2FtZVN0YXJ0QnV0dG9uLCBnYW1lUmVzZXRCdXR0b24sIGdhbWVTZWN0aW9uLCBwbGF5ZXJOYW1lSW5wdXQgfSBmcm9tICcuL2RhdGEnO1xyXG5pbXBvcnQgeyBnYW1lTW9kZSwgZ2FtZU1vZGVJbnB1dCB9IGZyb20gJy4vZ2FtZU1vZGUnO1xyXG5pbXBvcnQgeyBjcmVhdGVHcmlkIH0gZnJvbSAnLi90YWJsZUdyaWQnO1xyXG5pbXBvcnQgeyBzZXRNaW5lcywgY2xlYXJNaW5lcywgd3JpdGVUaXBzIH0gZnJvbSAnLi9taW5lc0FuZFRpcHMnO1xyXG5cclxuXHJcblxyXG5cclxuY29uc3QgcGxheWVyR2FtZU1vZGUgPSBQbGF5ZXIuZ2V0SW5zdGFuY2UoKS5nZXRHYW1lTW9kZSgpO1xyXG5jb25zdCBnYW1lTW9kZUluZm8gPSBHYW1lLmdldEluc3RhbmNlKCkubW9kZUluZm8ocGxheWVyR2FtZU1vZGUpO1xyXG5jb25zdCBtaW5lSWNvbiA9IFwiXFx1RDgzRFxcdURDQTNcIjsgLy8gZGVmaW5pc2VtbyBpa29uaWN1IHphIG1pbnUgdSBuZWtvbSBtb21lbnR1XHJcblxyXG4vLyNyZWdpb24gLSBwcmludEdyaWQoKSAtIGNyZWF0ZXMgZnVsbCBHcmlkIGFuZCBhZGRzIGl0IHRvIHRoZSBkb2N1bWVudFxyXG5jb25zdCBwcmludEdyaWQgPSAoKTogdm9pZCA9PiB7XHJcbiAgICBsZXQgZ2FtZU1vZGVJbmZvID0gZ2FtZU1vZGUoZ2FtZU1vZGVJbnB1dC52YWx1ZSkgYXMgbnVtYmVyW107XHJcbiAgICAvL2NyZWF0ZSB0YWJsZVxyXG4gICAgY3JlYXRlR3JpZChnYW1lTW9kZUluZm8pO1xyXG4gICAgY29uc3QgdGFibGUgPSBHYW1lLmdldEluc3RhbmNlKCkuZ2V0R2FtZVRhYmxlKCk7XHJcbiAgICAvL3NldCBtaW5lc1xyXG4gICAgc2V0TWluZXModGFibGUsIGdhbWVNb2RlSW5mbywgbWluZUljb24pO1xyXG4gICAgLy8gLy8gLy9zZXQgdGlwc1xyXG4gICAgd3JpdGVUaXBzKHRhYmxlKTtcclxuICAgIC8vIC8vIC8vcHJpbnQgdGFibGVcclxuICAgIGdhbWVTZWN0aW9uLmFwcGVuZENoaWxkKHRhYmxlKTtcclxuICAgIC8vIC8vc2V0IGxpc3RlbmVyc1xyXG4gICAgdGFibGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7IGNvbnNvbGUubG9nKGBjbGlja2VkIGZpZWxkYCkgfSk7XHJcbn07XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uIC0gbWFuYWdlSW5wdXRzKCkgLSBtYW5hZ2UgaW5wdXRzIG9uIGRvY3VtZW50IGJhc2VkIG9uIGV2ZW50XHJcbmNvbnN0IG1hbmFnZUlucHV0cyA9IChldmVudCk6IHN0cmluZyA9PiB7XHJcbiAgICBpZiAoZXZlbnQudGFyZ2V0LmlkID09PSBcInN0YXJ0XCIpIHtcclxuXHJcbiAgICAgICAgcGxheWVyTmFtZUlucHV0LnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAndHJ1ZScpO1xyXG4gICAgICAgIGdhbWVNb2RlSW5wdXQuc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICd0cnVlJyk7XHJcbiAgICAgICAgZ2FtZVN0YXJ0QnV0dG9uLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAndHJ1ZScpO1xyXG4gICAgICAgIGdhbWVSZXNldEJ1dHRvbi5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XHJcbiAgICAgICAgcmV0dXJuIFwic3RhcnRcIjtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGV2ZW50LnRhcmdldC5pZCA9PT0gXCJyZXNldFwiKSB7XHJcbiAgICAgICAgZ2FtZVJlc2V0QnV0dG9uLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAndHJ1ZScpO1xyXG4gICAgICAgIGdhbWVTdGFydEJ1dHRvbi5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XHJcbiAgICAgICAgZ2FtZU1vZGVJbnB1dC5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XHJcbiAgICAgICAgZ2FtZU1vZGVJbnB1dC52YWx1ZSA9ICdiZWdpbm5lcic7XHJcbiAgICAgICAgcGxheWVyTmFtZUlucHV0LnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcclxuICAgICAgICBwbGF5ZXJOYW1lSW5wdXQudmFsdWUgPSBcIlwiO1xyXG4gICAgICAgIGdhbWVTZWN0aW9uLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgICAgcmV0dXJuIFwicmVzZXRcIjtcclxuICAgIH1cclxufTtcclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLyNyZWdpb24gLSBvbkNsaWNrKCkgLSBtYWluIGZ1bmN0aW9uXHJcbmNvbnN0IG9uQ2xpY2sgPSAoZXZlbnQpOiB2b2lkID0+IHtcclxuICAgIGlmIChldmVudC50YXJnZXQudGFnTmFtZSA9PT0gXCJCVVRUT05cIikge1xyXG4gICAgICAgIGlmIChtYW5hZ2VJbnB1dHMoZXZlbnQpID09PSAnc3RhcnQnKSB7XHJcbiAgICAgICAgICAgIFBsYXllci5nZXRJbnN0YW5jZSgpLnNldE5hbWUocGxheWVyTmFtZUlucHV0LnZhbHVlKTtcclxuICAgICAgICAgICAgcHJpbnRHcmlkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vI3JlZ2lvbiAtIGV2ZW50IGxpc3RlbmVyc1xyXG5nYW1lT3B0aW9uc1NlY3Rpb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbkNsaWNrKTtcclxuLy8jZW5kcmVnaW9uXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9hcHAudHMiLCJpbXBvcnQgeyBHYW1lLCBQbGF5ZXIgfSBmcm9tICcuL2RhdGEnO1xyXG5cclxuLy8jcmVnaW9uIC0gc2VsZWN0b3JzXHJcbmNvbnN0IGN1c3RvbVJvd3NJbnB1dCA9IDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjdXN0b21Sb3dzJyk7XHJcbmNvbnN0IGN1c3RvbUNvbHNJbnB1dCA9IDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjdXN0b21Db2xzJyk7XHJcbmNvbnN0IGN1c3RvbU1pbmVzSW5wdXQgPSA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3VzdG9tTWluZXMnKTtcclxuY29uc3QgZ2FtZU1vZGVJbnB1dCA9IDxIVE1MU2VsZWN0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZU1vZGUnKTtcclxuY29uc3QgY3VzdG9tTW9kZU9wdGlvbnMgPSA8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2N1c3RvbU1vZGVPcHRpb25zJyk7XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uIC0gZ2V0Q3VzdG9tUHJvcHMoKSAtIGdldHMgY3VzdG9tIHByb3BlcnRpZXMgZnJvbSB1c2VyIGlucHV0XHJcbmNvbnN0IGdldEN1c3RvbVByb3BzID0gKCkgPT4ge1xyXG4gICAgbGV0IGN1c3RvbVByb3BzID0gW1xyXG4gICAgICAgIHBhcnNlSW50KGN1c3RvbVJvd3NJbnB1dC52YWx1ZSksXHJcbiAgICAgICAgcGFyc2VJbnQoY3VzdG9tQ29sc0lucHV0LnZhbHVlKSxcclxuICAgICAgICBwYXJzZUludChjdXN0b21NaW5lc0lucHV0LnZhbHVlKSxcclxuICAgIF07XHJcbiAgICByZXR1cm4gY3VzdG9tUHJvcHM7XHJcbn1cclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLyNyZWdpb24gLSBkaXNwbGF5Q3VzdG9tTW9kZU9wdHMoKSAtIGhpZGVzIG9yIHNob3dzIGRpdiB3aXRoIGN1c3RvbSBnYW1lIG9wdGlvbnMgaW4gZG9jdW1lbnRcclxubGV0IGRpc3BsYXlDdXN0b21Nb2RlT3B0aW9ucyA9ICgpOiB2b2lkID0+IHtcclxuICAgIGlmIChnYW1lTW9kZUlucHV0LnZhbHVlID09PSBcImN1c3RvbVwiKSB7XHJcbiAgICAgICAgY3VzdG9tTW9kZU9wdGlvbnMhLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xyXG4gICAgfSBlbHNlIHsgY3VzdG9tTW9kZU9wdGlvbnMhLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpOyB9XHJcbn07XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uIC0gY3VzdG9tSW5wdXRWYWxpZGF0aW9uKCkgLSBjdXN0b20gZ2FtZSBtb2RlIGlucHV0IHZhbGlkYXRpb25cclxuY29uc3QgY3VzdG9tSW5wdXRWYWxpZGF0aW9uID0gKG1vZGVJbmZvOiBudW1iZXJbXSkgPT4gey8vZ2FtZSBtb2RlIGluZm8gW3Jvd3MsY29scyxtaW5lc11cclxuICAgIGlmIChtb2RlSW5mb1syXSA+PSBtb2RlSW5mb1swXSAqIG1vZGVJbmZvWzFdKSB7ICAvL251bSBvZiBtaW5lcyB2YWxpZGF0aW9uLGNhbid0IGJlIG1vcmUgbWluZXMgdGhhbiBmaWVsZHMgb3IgZXF1YWwgdG8gbnVtIG9mIGZpZWxkc1xyXG4gICAgICAgIGFsZXJ0KFwiQ2FuJ3QgaGF2ZSBtb3JlIG1pbmVzIHRoYW4gZmllbGRzXCIpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0gcmV0dXJuIHRydWU7XHJcbn07XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uIC0gZ2FtZU1vZGUoKSAtIGdhbWUgbW9kZSBzd2l0Y2hlclxyXG5jb25zdCBnYW1lTW9kZSA9IChtb2RlOiBzdHJpbmcpOiBudW1iZXJbXSB8IHN0cmluZyA9PiB7XHJcbiAgICBzd2l0Y2ggKG1vZGUpIHtcclxuICAgICAgICBjYXNlIFwiYmVnaW5uZXJcIjpcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJHYW1lIG1vZGU6IEJlZ2lubmVyIDl4OSB0YWJsZSB3aXRoIDEwIG1pbmVzXCIpO1xyXG4gICAgICAgICAgICBQbGF5ZXIuZ2V0SW5zdGFuY2UoKS5zZXRHYW1lTW9kZShtb2RlKTtcclxuICAgICAgICAgICAgcmV0dXJuIEdhbWUuZ2V0SW5zdGFuY2UoKS5tb2RlSW5mbyhtb2RlKTtcclxuICAgICAgICBjYXNlIFwiaW50ZXJtZWRpYXRlXCI6XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR2FtZSBtb2RlOiBJbnRlcm1lZGlhdGUgMTZ4MTYgdGFibGUgd2l0aCA0MCBtaW5lc1wiKTtcclxuICAgICAgICAgICAgUGxheWVyLmdldEluc3RhbmNlKCkuc2V0R2FtZU1vZGUobW9kZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBHYW1lLmdldEluc3RhbmNlKCkubW9kZUluZm8obW9kZSk7XHJcbiAgICAgICAgY2FzZSBcImV4cGVydFwiOlxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdhbWUgbW9kZTogRXhwZXJ0IDE2eDMwIHRhYmxlIHdpdGggOTkgbWluZXNcIik7XHJcbiAgICAgICAgICAgIFBsYXllci5nZXRJbnN0YW5jZSgpLnNldEdhbWVNb2RlKG1vZGUpO1xyXG4gICAgICAgICAgICByZXR1cm4gR2FtZS5nZXRJbnN0YW5jZSgpLm1vZGVJbmZvKG1vZGUpO1xyXG4gICAgICAgIGNhc2UgXCJjdXN0b21cIjpcclxuICAgICAgICAgICAgUGxheWVyLmdldEluc3RhbmNlKCkuc2V0R2FtZU1vZGUobW9kZSk7XHJcbiAgICAgICAgICAgIGlmIChjdXN0b21JbnB1dFZhbGlkYXRpb24oZ2V0Q3VzdG9tUHJvcHMoKSkgPT09IGZhbHNlKSB7IHJldHVybiBnYW1lTW9kZShcIlZhbGlkYXRpb25cIikgfVxyXG4gICAgICAgICAgICBHYW1lLmdldEluc3RhbmNlKCkuc2V0Q3VzdG9tTW9kZShnZXRDdXN0b21Qcm9wcygpKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYEdhbWUgbW9kZTogQ3VzdG9tICR7R2FtZS5nZXRJbnN0YW5jZSgpLm1vZGVJbmZvKG1vZGUpWzBdfXgke0dhbWUuZ2V0SW5zdGFuY2UoKS5tb2RlSW5mbyhtb2RlKVsxXX0gdGFibGUgd2l0aCAke0dhbWUuZ2V0SW5zdGFuY2UoKS5tb2RlSW5mbyhtb2RlKVsyXX0gbWluZShzKWApO1xyXG4gICAgICAgICAgICByZXR1cm4gR2FtZS5nZXRJbnN0YW5jZSgpLm1vZGVJbmZvKG1vZGUpO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIGlmIChtb2RlID09PSBcIlZhbGlkYXRpb25cIikgeyBjb25zb2xlLmVycm9yKFwiVmFsaWRhdGlvbiBpc3N1ZVwiKTsgcmV0dXJuIFwiZXJyb3IhXCIgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1RoZXJlIGlzIG5vIGdhbWUgbW9kZSB3aXRoIHRoYXQgbnVtYmVyIScpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiZXJyb3IhXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgIH1cclxufTtcclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLyNyZWdpb24gLSBldmVudCBsaXN0ZW5lcm5zXHJcbmdhbWVNb2RlSW5wdXQudmFsdWUgPSBcImJlZ2lubmVyXCI7XHJcbmdhbWVNb2RlSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZGlzcGxheUN1c3RvbU1vZGVPcHRpb25zKTtcclxuLy8jZW5kcmVnaW9uXHJcblxyXG5leHBvcnQgeyBnYW1lTW9kZSwgZ2FtZU1vZGVJbnB1dCB9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9nYW1lTW9kZS50cyIsImltcG9ydCB7IEdhbWUsIFBsYXllciB9IGZyb20gJy4vZGF0YSc7XHJcbmltcG9ydCB7IGRlZmluZVN1cnJvdW5kaW5nIH0gZnJvbSAnLi90YWJsZUdyaWQnO1xyXG5pbXBvcnQgeyByYW5kb21OdW1iZXJzQXJyYXkgfSBmcm9tICcuL2hlbHBlckZ1bmNzJztcclxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1NSU5FUz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vI3JlZ2lvbiBjcmVhdGVNaW5lcygpIC0gY3JlYXRlIG1pbmVzIGJhc2VkIG9uIGdhbWVNb2RlXHJcbmNvbnN0IGNyZWF0ZU1pbmVzID0gKG1vZGVJbmZvOiBudW1iZXJbXSk6IG51bWJlcltdID0+IHsvLyBrcmVpcmEgbWluZSBpIHNvcnRpcmEgaWggcG8gdmVsaWNpbmlcclxuICAgIGxldCBtaW5lcyA9IHJhbmRvbU51bWJlcnNBcnJheShtb2RlSW5mb1syXSwgKG1vZGVJbmZvWzBdICogbW9kZUluZm9bMV0pKS5zb3J0KChhLCBiKSA9PiB7IHJldHVybiBhIC0gYiB9KTtcclxuICAgIGNvbnNvbGUubG9nKFwiTWluZXMgbG9jYXRpb246IFwiICsgbWluZXMpOyAvLyBwcm92ZXJhdmFtbyBwb3ppY2lqdSBtaW5hIC8vIHphIGRldiBwb3RyZWJlXHJcbiAgICByZXR1cm4gbWluZXM7XHJcbn1cclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLyNyZWdpb24gLSBzZXRNaW5lcygpIC0gc2V0IG1pbmVzIG9uIHRhYmxlIChiaW5kIHRvIGF0dHJpYnV0ZSBkYXRhLW1pbmUpXHJcbmNvbnN0IHNldE1pbmVzID0gKHRhYmxlOiBIVE1MRWxlbWVudCwgbW9kZUluZm86IG51bWJlcltdLCBtaW5lSWNvbjogYW55KTogdm9pZCA9PiB7XHJcbiAgICBsZXQgbWluZXM6IG51bWJlcltdID0gY3JlYXRlTWluZXMobW9kZUluZm8pOy8va3JlaXJhbW8gbWluZVxyXG4gICAgY29uc3QgYWxsRmllbGRzID0gdGFibGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJ0ZFwiKTsgLy8gdXppbWFtbyBzdmUgdGQgZWxlbWVudGUgaXogdGFiZWxlXHJcbiAgICBtaW5lcy5mb3JFYWNoKG1pbmUgPT4geyAgLy8gcG9zdGF2bGphbW8gaWtvbnUgYm9tYmEgbmEgc3Zha2kgdGQga29qaSBzZSBwb2tsYXBhIHNhIG5pem9tIG1pbmEuXHJcbiAgICAgICAgYWxsRmllbGRzWyhtaW5lIC0gMSldLnNldEF0dHJpYnV0ZShcImRhdGEtbWluZVwiLCBtaW5lSWNvbik7IC8vIC0xIHpib2cgcmF6bGlrZSB1IHBvemljaWppIHBvbGphIHUgbml6dSBhbGxmaWVsZHMgaSBwb3ppY2lqZSBtaW5lXHJcbiAgICB9KTtcclxufVxyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vI3JlZ2lvbiAtIGNsZWFyTWluZXMoKSAtIGNsZWFyIG1pbmVzIGZyb20gdGFibGVcclxuY29uc3QgY2xlYXJNaW5lcyA9ICh0YWJsZTogSFRNTEVsZW1lbnQpOiB2b2lkID0+IHtcclxuICAgIGNvbnN0IGFsbEZpZWxkcyA9IHRhYmxlLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwidGRcIik7XHJcbiAgICBhbGxGaWVsZHMuZm9yRWFjaCgoZmllbGQ6IEhUTUxUYWJsZURhdGFDZWxsRWxlbWVudCkgPT4ge1xyXG4gICAgICAgIGZpZWxkLnNldEF0dHJpYnV0ZSgnZGF0YS1taW5lJywgJycpO1xyXG4gICAgfSk7XHJcbn1cclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vL05BUE9NRU5BIGRhdGEtbWluZSAtIGFrbyBqZSBib21iYSBzdGF2bGphIHNlIGlrb25hLCBha28gbmlqZSBzdGF2bGphIHNlIGJyb2ogYm9tYmkgdSBva3J1emVuanVcclxuXHJcbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09VElQUz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuLy8jcmVnaW9uIC0gd3JpdGUgdGlwcyBiYXNlZCBvbiBtaW5lcyBvbiB0aGUgZ2l2ZW4gdGFibGVcclxuY29uc3Qgd3JpdGVUaXBzID0gKHRhYmxlOiBIVE1MVGFibGVFbGVtZW50KTogdm9pZCA9PiB7XHJcbiAgICBjb25zdCBhbGxGaWVsZHMgPSB0YWJsZS5nZXRFbGVtZW50c0J5VGFnTmFtZShcInRkXCIpOyAvLyBzZWxla3R1amVtbyBzdmEgcG9samEgdSBkYXRvaiB0YWJlbGlcclxuICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoYWxsRmllbGRzLCBmaWVsZCA9PiB7IC8vIHphIHN2YWtvIHBvbGplXHJcbiAgICAgICAgaWYgKGZpZWxkLmdldEF0dHJpYnV0ZShcImRhdGEtbWluZVwiKSA9PT0gXCJcIikgeyAvLyBha28gamUgZWxlbWVudCBwcmF6YW4gKHRqLiBuaWplIG1pbmEsIGplciBzdSBtaW5lIHZlYyBwb3N0YXZsamVuZSBuYSB0YWJsaSlcclxuICAgICAgICAgICAgbGV0IG1pbmVzTnVtID0gY291bnRNaW5lcyhmaWVsZCk7IC8vIHByb3ZlcmF2YW1vIHN1c2VkbmEgcG9samEgaSBpc3Bpc3VqZW1vIGJyb2ogbWluYSB1IG9rb2xpbmlcclxuICAgICAgICAgICAgaWYgKG1pbmVzTnVtID09PSAwKSB7IGZpZWxkLnNldEF0dHJpYnV0ZShcImRhdGEtbWluZVwiLCBcIlwiKTsgZmllbGQuc2V0QXR0cmlidXRlKFwiZGF0YS1lbXB0eVwiLCBcIjFcIik7IH0vLyBha28gbmlqZSBtaW5hIGkgbmVtYSB1IG9rcnV6ZW5qdSB1cGlzdWplbW8gdSBkYXRhLWVtcHR5IDE7MSB6YSB0cnVlO1xyXG4gICAgICAgICAgICBlbHNlIHsgZmllbGQuc2V0QXR0cmlidXRlKFwiZGF0YS1taW5lXCIsIG1pbmVzTnVtLnRvU3RyaW5nKCkpOyBmaWVsZC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWVtcHR5XCIsIFwiMFwiKTsgLyplbGVtZW50LnRleHRDb250ZW50ID0gdGV4dDsgemEgZGV2IHBvdHJlYmUqLyB9IC8vYWtvIGltYSBtaW5hO2RhdGEtZW1wdHkgOyAwIHphIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vI3JlZ2lvbiAtIGZ1bmtjaWphIGtvamEgcHJvdmVyYXZhIHBvbGphIHUgb2tydXplbmp1XHJcbmZ1bmN0aW9uIGNvdW50TWluZXMoZmllbGQ6IEhUTUxUYWJsZUNlbGxFbGVtZW50KTogbnVtYmVyIHsgLy8gcHJvc2xlZGp1amVtbyBwb2xqZSBuYSBvc25vdnUga29qZWcgdnJzaW1vIHByb3ZlcnUgaSBicm9qIGtvbG9uYSB6Ym9nIG9yaWplbnRhY2lqZVxyXG4gICAgY29uc3QgZ2FtZU1vZGVJbmZvID0gR2FtZS5nZXRJbnN0YW5jZSgpLm1vZGVJbmZvKFBsYXllci5nZXRJbnN0YW5jZSgpLmdldEdhbWVNb2RlKCkpO1xyXG4gICAgY29uc3QgbnVtT2ZDb2xzOiBudW1iZXIgPSBnYW1lTW9kZUluZm9bMV07XHJcbiAgICBsZXQgY291bnRlciA9IDA7IC8vIGJyb2phYyBtaW5hIHUgb2tydXplbmp1IHBvbGphXHJcbiAgICBsZXQgc3Vycm91bmRpbmcgPSBkZWZpbmVTdXJyb3VuZGluZyhHYW1lLmdldEluc3RhbmNlKCkuZ2V0R2FtZVRhYmxlKCksIGZpZWxkKTsgLy8ga3JlaXJhbW8gb2tydXplbmplIChwb3ppdmFtbyBmdW5rY2lqdSB6YSB0bylcclxuICAgIHN1cnJvdW5kaW5nLmZvckVhY2goc3VyRmllbGQgPT4geyAvLyBwcm92ZXJhdmFtbyBzdmFrbyBwb2xqZSB1IG9rcnV6ZW5qdVxyXG4gICAgICAgIGlmIChzdXJGaWVsZCA9PT0gbnVsbCkgeyB9Ly8gYWtvIGplIHBvbGplIHZhbiB0YWJlbGUsIGlnbm9yaXNpXHJcbiAgICAgICAgZWxzZSBpZiAoc3VyRmllbGQuZ2V0QXR0cmlidXRlKFwiZGF0YS1taW5lXCIpID09PSBcIlxcdUQ4M0RcXHVEQ0EzXCIpIHsgLy8gemEgc3Zha3UgbWludVxyXG4gICAgICAgICAgICBjb3VudGVyKys7IC8vZG9kYWogamVkYW4gdSBicm9qYWNcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBjb3VudGVyOyAvLyBjZWxhIGZ1bmtjaWphIHZyYWNhIGJyb2phYyB0ai4gdWt1cGEgYnJvaiBtaW5hIHUgb2tydXplbmp1XHJcbn1cclxuLy8jZW5kcmVnaW9uXHJcblxyXG5leHBvcnQgeyBzZXRNaW5lcywgY2xlYXJNaW5lcywgd3JpdGVUaXBzIH07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL21pbmVzQW5kVGlwcy50cyIsIi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09UkFORE9NIEZVTkNUSU9OUz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuLy8jcmVnaW9uICAtIENyZWF0ZXMgcmFuZG9tIG51bWJlciBmb3IgcGFzc2VkIG1pbiBhbmQgbWF4XHJcbmNvbnN0IHJhbmRvbU51bWJlciA9IChtYXhOdW06IG51bWJlciwgbWluTnVtOiBudW1iZXIgPSAxKTogbnVtYmVyID0+IHtcclxuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4TnVtIC0gbWluTnVtICsgMSkgKyBtaW5OdW0pO1xyXG59O1xyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vI3JlZ2lvbiAgLSBhcnJheSB3aXRoIHNwZWNpZmllZCBudW1iZXIgb2YgcmFuZG9tIG51bWJlcnNcclxuY29uc3QgcmFuZG9tTnVtYmVyc0FycmF5ID0gKGFyckxlbmd0aDogbnVtYmVyLCBtYXhOdW06IG51bWJlciwgbWluTnVtOiBudW1iZXIgPSAxKTogbnVtYmVyW10gPT4ge1xyXG4gICAgbGV0IGFycmF5OiBudW1iZXJbXSA9IFtdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJMZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCBuZXdOdW0gPSByYW5kb21OdW1iZXIobWF4TnVtLCBtaW5OdW0pO1xyXG4gICAgICAgIHdoaWxlIChhcnJheS5pbmRleE9mKG5ld051bSkgIT09IC0xKSB7XHJcbiAgICAgICAgICAgIG5ld051bSA9IHJhbmRvbU51bWJlcihtaW5OdW0sIG1heE51bSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFycmF5LnB1c2gobmV3TnVtKTtcclxuICAgIH1cclxuICAgIHJldHVybiBhcnJheTtcclxufVxyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuZXhwb3J0IHsgcmFuZG9tTnVtYmVyc0FycmF5IH07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL2hlbHBlckZ1bmNzLnRzIl0sInNvdXJjZVJvb3QiOiIifQ==