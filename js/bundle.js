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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return gameResetButton; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return playerNameInput; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return gameOptionsSection; });
/* unused harmony export gameSection */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return welcomeScreen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return game; });
//#region - selectors
const gameStartButton = document.getElementById('start');
const gameResetButton = document.getElementById('reset');
const playerNameInput = document.getElementById('player-name');
const gameOptionsSection = document.getElementById('options');
const gameSection = document.getElementById('game-place');
const welcomeScreen = document.getElementById('welcome-screen');
const game = document.getElementById('game');
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
    }
    static getInstance() {
        return Player._instance;
    }
    getName() {
        return this._name;
    }
    setName(value) {
        if (value === '') {
            value = 'unknown player';
        }
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
        console.log(`Score set to ${this._score}`);
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
    if (clickedPlace.tagName === "TD" || clickedPlace.tagName === "TABLE" || clickedPlace.tagName === "IMG") {
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ranking__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__animation__ = __webpack_require__(9);









const mineIcon = "\uD83D\uDCA3"; // definisemo ikonicu za minu u nekom momentu
let clickCounter = 0; // follows clicks
//#region - manageInputs() - manage inputs on document based on event
const manageInputs = (event) => {
    if (event.target.id === "start") {
        __WEBPACK_IMPORTED_MODULE_0__data__["g" /* playerNameInput */].setAttribute('disabled', 'true');
        __WEBPACK_IMPORTED_MODULE_1__gameMode__["b" /* gameModeInput */].setAttribute('disabled', 'true');
        __WEBPACK_IMPORTED_MODULE_0__data__["f" /* gameStartButton */].setAttribute('disabled', 'true');
        __WEBPACK_IMPORTED_MODULE_0__data__["e" /* gameResetButton */].removeAttribute('disabled');
        return "start";
    }
    else if (event.target.id === "reset") {
        __WEBPACK_IMPORTED_MODULE_0__data__["e" /* gameResetButton */].setAttribute('disabled', 'true');
        __WEBPACK_IMPORTED_MODULE_0__data__["f" /* gameStartButton */].removeAttribute('disabled');
        __WEBPACK_IMPORTED_MODULE_1__gameMode__["b" /* gameModeInput */].removeAttribute('disabled');
        __WEBPACK_IMPORTED_MODULE_1__gameMode__["b" /* gameModeInput */].value = 'beginner';
        __WEBPACK_IMPORTED_MODULE_0__data__["g" /* playerNameInput */].removeAttribute('disabled');
        Object(__WEBPACK_IMPORTED_MODULE_8__animation__["c" /* gameShow */])();
        __WEBPACK_IMPORTED_MODULE_0__data__["c" /* game */].innerHTML = "";
        clickCounter = 0;
        Object(__WEBPACK_IMPORTED_MODULE_6__timer__["d" /* stopTimerHandler */])();
        Object(__WEBPACK_IMPORTED_MODULE_6__timer__["b" /* resetTimer */])();
        __WEBPACK_IMPORTED_MODULE_6__timer__["e" /* timerPlace */].textContent = "00 : 00 : 00";
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
            let bomb = document.createElement('img');
            bomb.setAttribute('src', './images/mine50.png');
            element.classList.add('empty');
            Object(__WEBPACK_IMPORTED_MODULE_6__timer__["d" /* stopTimerHandler */])();
            table.removeEventListener("click", onFieldClick);
            table.removeEventListener("mousedown", flagIt);
            element.appendChild(bomb);
            Object(__WEBPACK_IMPORTED_MODULE_3__minesAndTips__["c" /* showMines */])(table, mineIcon);
            Object(__WEBPACK_IMPORTED_MODULE_8__animation__["a" /* boom */])();
            table.classList.add('table');
            Object(__WEBPACK_IMPORTED_MODULE_8__animation__["b" /* gameOver */])();
        }
    }
    else if (attribute === "") {
        Object(__WEBPACK_IMPORTED_MODULE_4__emptyFlow__["a" /* openEmptyElement */])(element);
        checkResult();
    }
    else {
        element.textContent = attribute;
        element.classList.add('clicked');
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
            let flag = document.createElement('img');
            if (__WEBPACK_IMPORTED_MODULE_0__data__["b" /* Player */].getInstance().getGameMode() === 'beginner') {
                flag.setAttribute('src', './images/flagB.png');
            }
            else if (__WEBPACK_IMPORTED_MODULE_0__data__["b" /* Player */].getInstance().getGameMode() === 'intermediate') {
                flag.setAttribute('src', './images/flagI.png');
            }
            else {
                flag.setAttribute('src', './images/flagE.png');
            }
            flag.classList.add('flag');
            if (element.innerHTML === "") {
                element.appendChild(flag);
                element.classList.add('empty');
                checkResult();
            }
        }
    }
    else if (element.tagName === "IMG") {
        if (event.which === 3) {
            element.parentNode.classList.remove('empty');
            element.parentNode.innerHTML = "";
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
    Object(__WEBPACK_IMPORTED_MODULE_3__minesAndTips__["d" /* writeTips */])(table);
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
        Object(__WEBPACK_IMPORTED_MODULE_6__timer__["d" /* stopTimerHandler */])();
        __WEBPACK_IMPORTED_MODULE_0__data__["b" /* Player */].getInstance().setScore(Object(__WEBPACK_IMPORTED_MODULE_6__timer__["a" /* calcScore */])());
        table.removeEventListener("click", onFieldClick);
        table.removeEventListener("mousedown", flagIt);
        Object(__WEBPACK_IMPORTED_MODULE_7__ranking__["a" /* handleRanking */])();
        Object(__WEBPACK_IMPORTED_MODULE_8__animation__["d" /* win */])();
        table.classList.add('table');
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
            Object(__WEBPACK_IMPORTED_MODULE_6__timer__["c" /* startTimerHandler */])();
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
    table.classList.add(__WEBPACK_IMPORTED_MODULE_0__data__["b" /* Player */].getInstance().getGameMode());
    //set mines
    Object(__WEBPACK_IMPORTED_MODULE_3__minesAndTips__["b" /* setMines */])(table, gameModeInfo, mineIcon);
    // // //set tips
    Object(__WEBPACK_IMPORTED_MODULE_3__minesAndTips__["d" /* writeTips */])(table);
    // // //print table
    __WEBPACK_IMPORTED_MODULE_0__data__["c" /* game */].appendChild(table);
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
            Object(__WEBPACK_IMPORTED_MODULE_8__animation__["c" /* gameShow */])();
            printGrid();
            Object(__WEBPACK_IMPORTED_MODULE_7__ranking__["a" /* handleRanking */])();
        }
    }
};
//#endregion
//#region - gameOptionsSection event listeners
__WEBPACK_IMPORTED_MODULE_0__data__["d" /* gameOptionsSection */].addEventListener('click', onClick);
//#endregion


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return gameMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return gameModeInput; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__data__ = __webpack_require__(0);

//#region - selectors
// const customRowsInput = <HTMLInputElement>document.getElementById('customRows');
// const customColsInput = <HTMLInputElement>document.getElementById('customCols');
// const customMinesInput = <HTMLInputElement>document.getElementById('customMines');
const gameModeInput = document.getElementById('game-mode');
// const customModeOptions = <HTMLElement>document.getElementById('customModeOptions');
//#endregion
// //#region - getCustomProps() - gets custom properties from user input
// const getCustomProps = () => {
//     let customProps = [
//         parseInt(customRowsInput.value),
//         parseInt(customColsInput.value),
//         parseInt(customMinesInput.value),
//     ];
//     return customProps;
// }
// //#endregion
// //#region - displayCustomModeOpts() - hides or shows div with custom game options in document
// let displayCustomModeOptions = (): void => {
//     if (gameModeInput.value === "custom") {
//         customModeOptions!.classList.remove('hidden');
//     } else { customModeOptions!.classList.add('hidden'); }
// };
// //#endregion
// //#region - customInputValidation() - custom game mode input validation
// const customInputValidation = (modeInfo: number[]) => {//game mode info [rows,cols,mines]
//     if (modeInfo[2] >= modeInfo[0] * modeInfo[1]) {  //num of mines validation,can't be more mines than fields or equal to num of fields
//         alert("Can't have more mines than fields");
//         return false;
//     } return true;
// };
// //#endregion
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
        // case "custom":
        //     Player.getInstance().setGameMode(mode);
        //     if (customInputValidation(getCustomProps()) === false) { return gameMode("Validation") }
        //     Game.getInstance().setCustomMode(getCustomProps());
        //     console.log(`Game mode: Custom ${Game.getInstance().modeInfo(mode)[0]}x${Game.getInstance().modeInfo(mode)[1]} table with ${Game.getInstance().modeInfo(mode)[2]} mine(s)`);
        //     return Game.getInstance().modeInfo(mode);
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
// gameModeInput.addEventListener('change', displayCustomModeOptions);
//#endregion



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return setMines; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return clearMines; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return showMines; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return writeTips; });
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
//#region - showMines() - show mines on grid
const showMines = (table, mineIcon) => {
    const allFields = table.getElementsByTagName("td");
    Array.prototype.forEach.call(allFields, (field) => {
        if (field.getAttribute('data-mine') === mineIcon) {
            field.innerHTML = "";
            let image = document.createElement('img');
            if (__WEBPACK_IMPORTED_MODULE_0__data__["b" /* Player */].getInstance().getGameMode() === 'beginner') {
                image.setAttribute('src', './images/mineB.png');
            }
            else if (__WEBPACK_IMPORTED_MODULE_0__data__["b" /* Player */].getInstance().getGameMode() === 'intermediate') {
                image.setAttribute('src', './images/mineI.png');
            }
            else {
                image.setAttribute('src', './images/mineE.png');
            }
            field.classList.add('empty');
            field.appendChild(image);
        }
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
        element.innerHTML = "";
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
                field.classList.add('clicked');
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return startTimerHandler; });
/* unused harmony export stopTimer */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return resetTimer; });
/* unused harmony export getStringTime */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return timerPlace; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return stopTimerHandler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return calcScore; });
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
let calcScore = () => {
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
const timerPlace = document.getElementById('timer-place');
let startTimerHandler = () => {
    startTimer();
    stringInterval = setInterval(() => { timerPlace.textContent = getStringTime(); }, 100);
};
let stopTimerHandler = () => {
    stopTimer();
    clearInterval(stringInterval);
};



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return handleRanking; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__data__ = __webpack_require__(0);

//#region - selectors
const scoreList = document.getElementById('score-list');
const gameModeName = document.getElementById('game-mode-name');
//#endregion
//#region - rankingTable definition
let rankingTable = {
    beginner: [['John', 15], ['Marry', 21], ['Tim', 24], ['Alex', 26]],
    intermediate: [['Sam', 44], ['Mark', 46], ['Jim', 50]],
    expert: [['Maria', 58], ['Kit', 66], ['Tony', 70]]
};
//#endregion
//#region - presetStorage() - checks if there's database in localstorage if not creates one, otherwise loads it.
const presetStorage = () => {
    if (localStorage.getItem('rankingTable') === null) {
        localStorage.setItem('rankingTable', JSON.stringify(rankingTable));
        console.log(`database fetched from localstorage`, localStorage.getItem('rankingTable'));
    }
};
//#endregion
presetStorage();
//#region - saveData() -
const saveData = () => {
    let storageData = JSON.parse(localStorage.getItem('rankingTable'));
    let gameMode = __WEBPACK_IMPORTED_MODULE_0__data__["b" /* Player */].getInstance().getGameMode();
    console.log(`Game mode inside saveData: ${gameMode}`);
    let currentModeTable = storageData[gameMode];
    console.log(`Current Table inside saveData: ${currentModeTable}`);
    currentModeTable = scoreValidation(currentModeTable);
    console.log(`Table inside saveData: ${currentModeTable}`);
    currentModeTable.sort((a, b) => { return a[1] - b[1]; });
    console.log(`Table inside saveData: ${currentModeTable}`);
    for (currentModeTable.length; currentModeTable.length > 5;) {
        currentModeTable.pop();
    }
    storageData[gameMode] = currentModeTable;
    let newData = JSON.stringify(storageData);
    localStorage.setItem('rankingTable', newData);
    rankingTable = storageData;
};
//#endregion
//#region - scoreValidation () - validates if score is not equal to 0
const scoreValidation = (table) => {
    let newTable = table;
    console.log(newTable);
    const playerScore = [__WEBPACK_IMPORTED_MODULE_0__data__["b" /* Player */].getInstance().getName(), __WEBPACK_IMPORTED_MODULE_0__data__["b" /* Player */].getInstance().getScore()];
    if (playerScore[1] !== 0 && playerScore[1] !== undefined) {
        newTable.push(playerScore);
        console.log('new table inside if statement', playerScore, newTable);
    }
    console.log('newTable', newTable);
    return newTable;
};
//#endregion
//#region - writeData() - prints out ranking table
let printData = () => {
    let table = rankingTable[__WEBPACK_IMPORTED_MODULE_0__data__["b" /* Player */].getInstance().getGameMode()];
    gameModeName.textContent = __WEBPACK_IMPORTED_MODULE_0__data__["b" /* Player */].getInstance().getGameMode() + ' mode';
    scoreList.innerHTML = '';
    table.forEach(element => {
        let li = document.createElement('li');
        li.textContent = `${element[0]} - ${element[1]}`;
        scoreList.appendChild(li);
    });
};
//#endregion
//#region - handleRanking() - one to rule them all
const handleRanking = () => {
    saveData();
    printData();
};
//#endregion



/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return boom; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return gameOver; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return win; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return gameShow; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__data__ = __webpack_require__(0);

const aboutGameButton = document.getElementById('about-game-button');
const gameButton = document.getElementById('game-button');
const gameRulesButton = document.getElementById('game-rules-button');
const gameRules = document.getElementById('game-rules');
const aboutGame = document.getElementById('about-game');
const body = document.getElementById("body");
const boom = () => {
    let image = document.createElement('img');
    image.setAttribute('src', './images/boom.png');
    image.classList.add('big-boom');
    body.appendChild(image);
};
const gameOver = () => {
    let image = document.createElement('img');
    image.setAttribute('src', './images/gameover.png');
    image.classList.add('game-over');
    __WEBPACK_IMPORTED_MODULE_0__data__["c" /* game */].appendChild(image);
};
const win = () => {
    let image = document.createElement('img');
    image.setAttribute('src', './images/win.png');
    image.classList.add('win');
    __WEBPACK_IMPORTED_MODULE_0__data__["c" /* game */].appendChild(image);
};
//#region - header nav
const aboutGameShow = () => {
    __WEBPACK_IMPORTED_MODULE_0__data__["h" /* welcomeScreen */].classList.add('remove');
    __WEBPACK_IMPORTED_MODULE_0__data__["c" /* game */].classList.add('remove');
    gameRules.classList.add('remove');
    aboutGame.classList.remove('remove');
};
const gameRulesShow = () => {
    __WEBPACK_IMPORTED_MODULE_0__data__["h" /* welcomeScreen */].classList.add('remove');
    __WEBPACK_IMPORTED_MODULE_0__data__["c" /* game */].classList.add('remove');
    gameRules.classList.remove('remove');
    aboutGame.classList.add('remove');
};
const gameShow = () => {
    __WEBPACK_IMPORTED_MODULE_0__data__["h" /* welcomeScreen */].classList.add('remove');
    __WEBPACK_IMPORTED_MODULE_0__data__["c" /* game */].classList.remove('remove');
    gameRules.classList.add('remove');
    aboutGame.classList.add('remove');
};
aboutGameButton.addEventListener('click', aboutGameShow);
gameRulesButton.addEventListener('click', gameRulesShow);
gameButton.addEventListener('click', gameShow);
//#endregion



/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjc1OTkwMWYxNjQxZDcwZTIzNDkiLCJ3ZWJwYWNrOi8vLy4vYXBwL2RhdGEudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3RhYmxlR3JpZC50cyIsIndlYnBhY2s6Ly8vLi9hcHAvaGVscGVyRnVuY3MudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2FwcC50cyIsIndlYnBhY2s6Ly8vLi9hcHAvZ2FtZU1vZGUudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwL21pbmVzQW5kVGlwcy50cyIsIndlYnBhY2s6Ly8vLi9hcHAvZW1wdHlGbG93LnRzIiwid2VicGFjazovLy8uL2FwcC90aW1lci50cyIsIndlYnBhY2s6Ly8vLi9hcHAvcmFua2luZy50cyIsIndlYnBhY2s6Ly8vLi9hcHAvYW5pbWF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQzdEQTtBQUFBLHFCQUFxQjtBQUNyQixNQUFNLGVBQWUsR0FBc0IsUUFBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM1RSxNQUFNLGVBQWUsR0FBc0IsUUFBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM1RSxNQUFNLGVBQWUsR0FBcUIsUUFBUSxDQUFDLGNB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QUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbEMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDekMsQ0FBQyxDQUFDO0FBRUYsTUFBTSxhQUFhLEdBQUcsR0FBRyxFQUFFO0lBQ3ZCLDREQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN0QyxtREFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDN0IsU0FBUyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDckMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDdEMsQ0FBQyxDQUFDO0FBRUYsTUFBTSxRQUFRLEdBQUcsR0FBRyxFQUFFO0lBQ2xCLDREQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN0QyxtREFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDaEMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbEMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDdEMsQ0FBQyxDQUFDO0FBRUYsZUFBZSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxhQUFhLENBQUMsQ0FBQztBQUN6RCxlQUFlLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0FBQ3pELFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFFL0MsWUFBWTtBQUc2QiIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAzKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA2NzU5OTAxZjE2NDFkNzBlMjM0OSIsIi8vI3JlZ2lvbiAtIHNlbGVjdG9yc1xyXG5jb25zdCBnYW1lU3RhcnRCdXR0b24gPSA8SFRNTEJ1dHRvbkVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXJ0Jyk7XHJcbmNvbnN0IGdhbWVSZXNldEJ1dHRvbiA9IDxIVE1MQnV0dG9uRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzZXQnKTtcclxuY29uc3QgcGxheWVyTmFtZUlucHV0ID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXllci1uYW1lJyk7XHJcbmNvbnN0IGdhbWVPcHRpb25zU2VjdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvcHRpb25zJyk7XHJcbmNvbnN0IGdhbWVTZWN0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWUtcGxhY2UnKTtcclxuY29uc3Qgd2VsY29tZVNjcmVlbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3ZWxjb21lLXNjcmVlbicpO1xyXG5jb25zdCBnYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWUnKTtcclxuLy8jZW5kcmVnaW9uXHJcblxyXG5wbGF5ZXJOYW1lSW5wdXQudmFsdWUgPSBcIlwiO1xyXG5cclxuXHJcbi8vI3JlZ2lvbiAtIEdhbWUgc2luZ2xldG9uIGNsYXNzIGRlZmluaXRpb25cclxuXHJcbmNsYXNzIEdhbWUge1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IF9pbnN0YW5jZTogR2FtZSA9IG5ldyBHYW1lKCk7XHJcblxyXG4gICAgcHJpdmF0ZSBfbW9kZSA9IHtcclxuICAgICAgICBiZWdpbm5lcjogWzksIDksIDEwXSxcclxuICAgICAgICBpbnRlcm1lZGlhdGU6IFsxNiwgMTYsIDQwXSxcclxuICAgICAgICBleHBlcnQ6IFsxNiwgMzAsIDk5XSxcclxuICAgICAgICBjdXN0b206IFswLCAwLCAwXVxyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIF9nYW1lVGFibGU6IEhUTUxUYWJsZUVsZW1lbnQ7XHJcblxyXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IEdhbWUge1xyXG4gICAgICAgIHJldHVybiBHYW1lLl9pbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbW9kZUluZm8obW9kZU5hbWU6IHN0cmluZyk6IG51bWJlcltdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbW9kZVttb2RlTmFtZV07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldEN1c3RvbU1vZGUoaW5mbzogbnVtYmVyW10pIHtcclxuICAgICAgICB0aGlzLl9tb2RlLmN1c3RvbSA9IGluZm87XHJcbiAgICAgICAgY29uc29sZS5sb2coYEN1c3RvbSBtb2RlIHNldCB0byAke3RoaXMuX21vZGUuY3VzdG9tfWApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRHYW1lVGFibGUoZWxlbWVudCkge1xyXG4gICAgICAgIHRoaXMuX2dhbWVUYWJsZSA9IGVsZW1lbnQ7XHJcbiAgICAgICAgY29uc29sZS5sb2coYFRhYmxlIGNyZWF0ZWRgKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0R2FtZVRhYmxlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9nYW1lVGFibGU7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uIC0gUGxheWVyIC0gc2luZ2xldG9uIGNsYXNzIGRlZmluaXRpb25cclxuY2xhc3MgUGxheWVyIHtcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBfaW5zdGFuY2U6IFBsYXllciA9IG5ldyBQbGF5ZXIoKTtcclxuXHJcbiAgICBwcml2YXRlIF9uYW1lOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgcHJpdmF0ZSBfZ2FtZU1vZGU6IHN0cmluZyA9IFwibm9uZVwiO1xyXG4gICAgcHJpdmF0ZSBfc2NvcmU6IG51bWJlcjtcclxuXHJcbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogUGxheWVyIHtcclxuICAgICAgICByZXR1cm4gUGxheWVyLl9pbnN0YW5jZTtcclxuICAgIH1cclxuICAgIGdldE5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbmFtZTtcclxuICAgIH1cclxuICAgIHNldE5hbWUodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIGlmICh2YWx1ZSA9PT0gJycpIHsgdmFsdWUgPSAndW5rbm93biBwbGF5ZXInIH1cclxuICAgICAgICB0aGlzLl9uYW1lID0gdmFsdWU7XHJcbiAgICAgICAgY29uc29sZS5sb2coYFBsYXllcnMgbmFtZSBzZXQgdG86ICR7dGhpcy5fbmFtZX1gKVxyXG4gICAgfVxyXG5cclxuICAgIGdldEdhbWVNb2RlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dhbWVNb2RlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEdhbWVNb2RlKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9nYW1lTW9kZSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFNjb3JlKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5fc2NvcmUgPSB2YWx1ZTtcclxuICAgICAgICBjb25zb2xlLmxvZyhgU2NvcmUgc2V0IHRvICR7dGhpcy5fc2NvcmV9YCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U2NvcmUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Njb3JlO1xyXG4gICAgfVxyXG59XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuZXhwb3J0IHsgR2FtZSwgUGxheWVyLCBnYW1lU3RhcnRCdXR0b24sIGdhbWVSZXNldEJ1dHRvbiwgcGxheWVyTmFtZUlucHV0LCBnYW1lT3B0aW9uc1NlY3Rpb24sIGdhbWVTZWN0aW9uLCB3ZWxjb21lU2NyZWVuLCBnYW1lIH07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL2RhdGEudHMiLCJpbXBvcnQgeyBHYW1lLCBQbGF5ZXIgfSBmcm9tICcuL2RhdGEnO1xyXG5cclxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1UQUJMRSBHUklEPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4vLyNyZWdpb24gLSBjcmVhdGVzIHRhYmxlIGdyaWQgZm9yIGdpdmVuIGdhbWUgbW9kZVxyXG5jb25zdCBjcmVhdGVHcmlkID0gKHJvd3NBbmRDb2xzOiBudW1iZXJbXSk6IHZvaWQgPT4ge1xyXG4gICAgbGV0IHRhYmxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGFibGUnKTtcclxuICAgIGxldCBjZWxsQ291bnRlciA9IDE7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJvd3NBbmRDb2xzWzBdOyBpKyspIHtcclxuICAgICAgICBsZXQgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKTtcclxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHJvd3NBbmRDb2xzWzFdOyBqKyspIHtcclxuICAgICAgICAgICAgbGV0IGNvbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XHJcbiAgICAgICAgICAgIGNvbC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBjZWxsQ291bnRlciArICdmaWVsZCcpO1xyXG4gICAgICAgICAgICBjb2wuc2V0QXR0cmlidXRlKFwiZGF0YS1pZFwiLCBjZWxsQ291bnRlciArICdmaWVsZCcpO1xyXG4gICAgICAgICAgICBjb2wuc2V0QXR0cmlidXRlKFwiZGF0YS1taW5lXCIsIFwiXCIpO1xyXG4gICAgICAgICAgICBjb2wuc2V0QXR0cmlidXRlKFwiZGF0YS1lbXB0eVwiLCBcIlwiKTtcclxuICAgICAgICAgICAgY29sLnNldEF0dHJpYnV0ZShcImRhdGEtY2xpY2tcIiwgXCJcIik7XHJcbiAgICAgICAgICAgIGNlbGxDb3VudGVyKys7XHJcbiAgICAgICAgICAgIHJvdy5hcHBlbmRDaGlsZChjb2wpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0YWJsZS5hcHBlbmRDaGlsZChyb3cpO1xyXG4gICAgfVxyXG4gICAgR2FtZS5nZXRJbnN0YW5jZSgpLnNldEdhbWVUYWJsZSh0YWJsZSk7XHJcbn07XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuXHJcbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Qk9SREVSUz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuLy8jcmVnaW9uIC0gY3JlYXRlcyBsZWZ0IGJvcmRlciBmb3IgdGFibGUgZ3JpZFxyXG5jb25zdCBjcmVhdGVMZWZ0Qm9yZGVyID0gKG51bU9mUm93czogbnVtYmVyLCBudW1PZkNvbHM6IG51bWJlcikgPT4ge1xyXG4gICAgbGV0IGxlZnRCb3JkZXJGaWVsZHM6IG51bWJlcltdID0gWzFdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1PZlJvd3MgLSAxOyBpKyspIHtcclxuICAgICAgICBsZXQgYm9yZGVyRmllbGQgPSBsZWZ0Qm9yZGVyRmllbGRzW2ldICsgbnVtT2ZDb2xzO1xyXG4gICAgICAgIGxlZnRCb3JkZXJGaWVsZHMucHVzaChib3JkZXJGaWVsZCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbGVmdEJvcmRlckZpZWxkcztcclxufVxyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vI3JlZ2lvbiAtIGNyZWF0ZXMgcmlnaHQgYm9yZGVyIGZvciB0YWJsZSBncmlkXHJcbmNvbnN0IGNyZWF0ZVJpZ2h0Qm9yZGVyID0gKG51bU9mUm93czogbnVtYmVyLCBudW1PZkNvbHM6IG51bWJlcikgPT4ge1xyXG4gICAgbGV0IHJpZ2h0Qm9yZGVyRmllbGRzOiBudW1iZXJbXSA9IFtudW1PZkNvbHNdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1PZlJvd3MgLSAxOyBpKyspIHtcclxuICAgICAgICBsZXQgYm9yZGVyRmllbGQgPSByaWdodEJvcmRlckZpZWxkc1tpXSArIG51bU9mQ29scztcclxuICAgICAgICByaWdodEJvcmRlckZpZWxkcy5wdXNoKGJvcmRlckZpZWxkKTtcclxuICAgIH1cclxuICAgIHJldHVybiByaWdodEJvcmRlckZpZWxkcztcclxufVxyXG4vLyNlbmRyZWdpb25cclxuXHJcblxyXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVNVUlJPVU5ESU5HPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbi8vI3JlZ2lvbiAtIGRlZmluZVN1cnJvdW5kaW5nKCkgLSBjcmVhdGVzIHN1cnJvdW5kaW5nIGJhc2VkIG9uIGZpZWxkIHBvc2l0aW9uIChiYXNlZCBvbiBpZClcclxuXHJcbmNvbnN0IGRlZmluZVN1cnJvdW5kaW5nID0gKHRhYmxlOiBFbGVtZW50LCBlbGVtZW50OiBIVE1MRWxlbWVudCkgPT4geyAvLyBkZWZpbmlzZW1vIG9rb2xuYSBwb2xqYSBuYSBvc25vdnUgZGF0b2cgcG9samEgaSBicm9qYSBrb2xvbmEgdGFiZWxlXHJcbiAgICBsZXQgc3Vycm91bmRpbmc7XHJcbiAgICBjb25zdCBpZCA9IHBhcnNlSW50KGVsZW1lbnQuaWQpO1xyXG4gICAgY29uc3QgZ2FtZU1vZGVJbmZvID0gR2FtZS5nZXRJbnN0YW5jZSgpLm1vZGVJbmZvKFBsYXllci5nZXRJbnN0YW5jZSgpLmdldEdhbWVNb2RlKCkpO1xyXG4gICAgY29uc3QgbnVtT2ZSb3dzID0gZ2FtZU1vZGVJbmZvWzBdO1xyXG4gICAgY29uc3QgbnVtT2ZDb2xzID0gZ2FtZU1vZGVJbmZvWzFdO1xyXG5cclxuICAgIC8vYmFzZSBzdXJyb3VuZGluZ1xyXG4gICAgY29uc3QgbGVmdCA9IHRhYmxlLnF1ZXJ5U2VsZWN0b3IoYFtpZD1cIiR7aWQgLSAxfWZpZWxkXCJdYCk7XHJcbiAgICBjb25zdCB1cExlZnQgPSB0YWJsZS5xdWVyeVNlbGVjdG9yKGBbaWQ9XCIke2lkIC0gbnVtT2ZDb2xzIC0gMX1maWVsZFwiXWApO1xyXG4gICAgY29uc3QgdXAgPSB0YWJsZS5xdWVyeVNlbGVjdG9yKGBbaWQ9XCIke2lkIC0gbnVtT2ZDb2xzfWZpZWxkXCJdYCk7XHJcbiAgICBjb25zdCB1cFJpZ2h0ID0gdGFibGUucXVlcnlTZWxlY3RvcihgW2lkPVwiJHtpZCAtIG51bU9mQ29scyArIDF9ZmllbGRcIl1gKTtcclxuICAgIGNvbnN0IHJpZ2h0ID0gdGFibGUucXVlcnlTZWxlY3RvcihgW2lkPVwiJHtpZCArIDF9ZmllbGRcIl1gKTtcclxuICAgIGNvbnN0IHJpZ2h0RG93biA9IHRhYmxlLnF1ZXJ5U2VsZWN0b3IoYFtpZD1cIiR7aWQgKyBudW1PZkNvbHMgKyAxfWZpZWxkXCJdYCk7XHJcbiAgICBjb25zdCBkb3duID0gdGFibGUucXVlcnlTZWxlY3RvcihgW2lkPVwiJHtpZCArIG51bU9mQ29sc31maWVsZFwiXWApO1xyXG4gICAgY29uc3QgZG93bkxlZnQgPSB0YWJsZS5xdWVyeVNlbGVjdG9yKGBbaWQ9XCIke2lkICsgbnVtT2ZDb2xzIC0gMX1maWVsZFwiXWApO1xyXG5cclxuICAgIC8vY3JlYXRlIGJvcmRlcnNcclxuICAgIGNvbnN0IGxlZnRCb3JkZXIgPSBjcmVhdGVMZWZ0Qm9yZGVyKG51bU9mUm93cywgbnVtT2ZDb2xzKTtcclxuICAgIGNvbnN0IHJpZ2h0Qm9yZGVyID0gY3JlYXRlUmlnaHRCb3JkZXIobnVtT2ZSb3dzLCBudW1PZkNvbHMpO1xyXG5cclxuICAgIC8vc3Vycm91bmRpbmcgYmFzZWQgb24gZmllbGQtYm9yZGVycyByZWxhdGlvblxyXG4gICAgaWYgKGxlZnRCb3JkZXIuaW5kZXhPZihpZCkgIT09IC0xKSB7XHJcbiAgICAgICAgc3Vycm91bmRpbmcgPSBbdXAsIHVwUmlnaHQsIHJpZ2h0LCByaWdodERvd24sIGRvd25dO1xyXG4gICAgfSBlbHNlIGlmIChyaWdodEJvcmRlci5pbmRleE9mKGlkKSAhPT0gLTEpIHtcclxuICAgICAgICBzdXJyb3VuZGluZyA9IFtsZWZ0LCB1cExlZnQsIHVwLCBkb3duLCBkb3duTGVmdF07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHN1cnJvdW5kaW5nID0gW2xlZnQsIHVwTGVmdCwgdXAsIHVwUmlnaHQsIHJpZ2h0LCByaWdodERvd24sIGRvd24sIGRvd25MZWZ0XTtcclxuICAgIH1cclxuICAgIHJldHVybiBzdXJyb3VuZGluZztcclxufVxyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuXHJcbmV4cG9ydCB7IGNyZWF0ZUdyaWQsZGVmaW5lU3Vycm91bmRpbmd9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC90YWJsZUdyaWQudHMiLCIvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVJBTkRPTSBGVU5DVElPTlM9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbi8vI3JlZ2lvbiAgLSBDcmVhdGVzIHJhbmRvbSBudW1iZXIgZm9yIHBhc3NlZCBtaW4gYW5kIG1heFxyXG5jb25zdCByYW5kb21OdW1iZXIgPSAobWF4TnVtOiBudW1iZXIsIG1pbk51bTogbnVtYmVyID0gMSk6IG51bWJlciA9PiB7XHJcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heE51bSAtIG1pbk51bSArIDEpICsgbWluTnVtKTtcclxufTtcclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLyNyZWdpb24gIC0gYXJyYXkgd2l0aCBzcGVjaWZpZWQgbnVtYmVyIG9mIHJhbmRvbSBudW1iZXJzXHJcbmNvbnN0IHJhbmRvbU51bWJlcnNBcnJheSA9IChhcnJMZW5ndGg6IG51bWJlciwgbWF4TnVtOiBudW1iZXIsIG1pbk51bTogbnVtYmVyID0gMSk6IG51bWJlcltdID0+IHtcclxuICAgIGxldCBhcnJheTogbnVtYmVyW10gPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyTGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgbmV3TnVtID0gcmFuZG9tTnVtYmVyKG1heE51bSwgbWluTnVtKTtcclxuICAgICAgICB3aGlsZSAoYXJyYXkuaW5kZXhPZihuZXdOdW0pICE9PSAtMSkge1xyXG4gICAgICAgICAgICBuZXdOdW0gPSByYW5kb21OdW1iZXIobWluTnVtLCBtYXhOdW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBhcnJheS5wdXNoKG5ld051bSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXJyYXk7XHJcbn1cclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbi8vI3JlZ2lvbiAtIHByZXZlbnRNZW51KCkgLSBuZW1hIGRlc25pIGtsaWsgbWVuaSBuYSB0YWJsaVxyXG5jb25zdCBwcmV2ZW50VGFibGVNZW51ID0gKGV2ZW50KTp2b2lkID0+IHtcclxuICAgIGxldCBjbGlja2VkUGxhY2UgPSBldmVudC50YXJnZXQ7XHJcbiAgICBpZiAoY2xpY2tlZFBsYWNlLnRhZ05hbWUgPT09IFwiVERcIiB8fCBjbGlja2VkUGxhY2UudGFnTmFtZSA9PT0gXCJUQUJMRVwiIHx8IGNsaWNrZWRQbGFjZS50YWdOYW1lID09PSBcIklNR1wiKSB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIH1cclxufVxyXG4vLyNlbmRyZWdpb25cclxuXHJcbmV4cG9ydCB7IHJhbmRvbU51bWJlcnNBcnJheSwgcHJldmVudFRhYmxlTWVudSB9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9oZWxwZXJGdW5jcy50cyIsImltcG9ydCB7IEdhbWUsIFBsYXllciwgZ2FtZU9wdGlvbnNTZWN0aW9uLCBnYW1lU3RhcnRCdXR0b24sIGdhbWVSZXNldEJ1dHRvbiwgZ2FtZVNlY3Rpb24sIGdhbWUsIHBsYXllck5hbWVJbnB1dH0gZnJvbSAnLi9kYXRhJztcclxuaW1wb3J0IHsgZ2FtZU1vZGUsIGdhbWVNb2RlSW5wdXQgfSBmcm9tICcuL2dhbWVNb2RlJztcclxuaW1wb3J0IHsgY3JlYXRlR3JpZCB9IGZyb20gJy4vdGFibGVHcmlkJztcclxuaW1wb3J0IHsgc2V0TWluZXMsIGNsZWFyTWluZXMsIHNob3dNaW5lcywgd3JpdGVUaXBzIH0gZnJvbSAnLi9taW5lc0FuZFRpcHMnO1xyXG5pbXBvcnQgeyBvcGVuRW1wdHlFbGVtZW50LCBzdG9wQ2xpY2sgfSBmcm9tICcuL2VtcHR5Rmxvdyc7XHJcbmltcG9ydCB7IHByZXZlbnRUYWJsZU1lbnUgfSBmcm9tICcuL2hlbHBlckZ1bmNzJztcclxuaW1wb3J0IHsgc3RhcnRUaW1lckhhbmRsZXIsIHN0b3BUaW1lckhhbmRsZXIsIHJlc2V0VGltZXIsIHRpbWVyUGxhY2UsIGNhbGNTY29yZSB9IGZyb20gJy4vdGltZXInO1xyXG5pbXBvcnQgeyBoYW5kbGVSYW5raW5nIH0gZnJvbSAnLi9yYW5raW5nJztcclxuaW1wb3J0IHsgYm9vbSwgZ2FtZU92ZXIsIHdpbiwgZ2FtZVNob3cgfSBmcm9tICcuL2FuaW1hdGlvbic7XHJcblxyXG5cclxuY29uc3QgbWluZUljb24gPSBcIlxcdUQ4M0RcXHVEQ0EzXCI7IC8vIGRlZmluaXNlbW8gaWtvbmljdSB6YSBtaW51IHUgbmVrb20gbW9tZW50dVxyXG5sZXQgY2xpY2tDb3VudGVyID0gMDsgLy8gZm9sbG93cyBjbGlja3NcclxuXHJcbi8vI3JlZ2lvbiAtIG1hbmFnZUlucHV0cygpIC0gbWFuYWdlIGlucHV0cyBvbiBkb2N1bWVudCBiYXNlZCBvbiBldmVudFxyXG5jb25zdCBtYW5hZ2VJbnB1dHMgPSAoZXZlbnQpOiBzdHJpbmcgPT4ge1xyXG4gICAgaWYgKGV2ZW50LnRhcmdldC5pZCA9PT0gXCJzdGFydFwiKSB7XHJcblxyXG4gICAgICAgIHBsYXllck5hbWVJbnB1dC5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ3RydWUnKTtcclxuICAgICAgICBnYW1lTW9kZUlucHV0LnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAndHJ1ZScpO1xyXG4gICAgICAgIGdhbWVTdGFydEJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ3RydWUnKTtcclxuICAgICAgICBnYW1lUmVzZXRCdXR0b24ucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xyXG4gICAgICAgIHJldHVybiBcInN0YXJ0XCI7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChldmVudC50YXJnZXQuaWQgPT09IFwicmVzZXRcIikge1xyXG4gICAgICAgIGdhbWVSZXNldEJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ3RydWUnKTtcclxuICAgICAgICBnYW1lU3RhcnRCdXR0b24ucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xyXG4gICAgICAgIGdhbWVNb2RlSW5wdXQucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xyXG4gICAgICAgIGdhbWVNb2RlSW5wdXQudmFsdWUgPSAnYmVnaW5uZXInO1xyXG4gICAgICAgIHBsYXllck5hbWVJbnB1dC5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XHJcbiAgICAgICAgZ2FtZVNob3coKTtcclxuICAgICAgICBnYW1lLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgICAgY2xpY2tDb3VudGVyID0gMDtcclxuICAgICAgICBzdG9wVGltZXJIYW5kbGVyKCk7XHJcbiAgICAgICAgcmVzZXRUaW1lcigpO1xyXG4gICAgICAgIHRpbWVyUGxhY2UudGV4dENvbnRlbnQgPSBcIjAwIDogMDAgOiAwMFwiO1xyXG4gICAgICAgIHJldHVybiBcInJlc2V0XCI7XHJcbiAgICB9XHJcbn07XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uIC0gY2hlY2tNb3ZlKCkgLSBwcm92ZXJhdmEgcG90ZXogaSBwcmVkdXppbWEgZGFsamUga29yYWtlXHJcbmNvbnN0IGNoZWNrTW92ZSA9IChlbGVtZW50OiBIVE1MRWxlbWVudCkgPT4ge1xyXG4gICAgY29uc3QgdGFibGUgPSBHYW1lLmdldEluc3RhbmNlKCkuZ2V0R2FtZVRhYmxlKCk7XHJcbiAgICBjb25zdCBhdHRyaWJ1dGUgPSBlbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtbWluZVwiKTtcclxuICAgIGlmIChhdHRyaWJ1dGUgPT09IFwiXFx1RDgzRFxcdURDQTNcIikge1xyXG4gICAgICAgIGlmIChjbGlja0NvdW50ZXIgPT09IDEpIHtcclxuICAgICAgICAgICAgcGxhbnRNaW5lc0FnYWluKCk7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG9uRmllbGRDbGljayk7XHJcbiAgICAgICAgICAgIGNoZWNrTW92ZShlbGVtZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBib21iID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICAgICAgICAgIGJvbWIuc2V0QXR0cmlidXRlKCdzcmMnLCAnLi9pbWFnZXMvbWluZTUwLnBuZycpO1xyXG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2VtcHR5Jyk7XHJcbiAgICAgICAgICAgIHN0b3BUaW1lckhhbmRsZXIoKTtcclxuICAgICAgICAgICAgdGFibGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG9uRmllbGRDbGljayk7XHJcbiAgICAgICAgICAgIHRhYmxlLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgZmxhZ0l0KTtcclxuICAgICAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChib21iKTtcclxuICAgICAgICAgICAgc2hvd01pbmVzKHRhYmxlLCBtaW5lSWNvbik7XHJcbiAgICAgICAgICAgIGJvb20oKTtcclxuICAgICAgICAgICAgdGFibGUuY2xhc3NMaXN0LmFkZCgndGFibGUnKTtcclxuICAgICAgICAgICAgZ2FtZU92ZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChhdHRyaWJ1dGUgPT09IFwiXCIpIHtcclxuICAgICAgICBvcGVuRW1wdHlFbGVtZW50KDxhbnk+ZWxlbWVudCk7XHJcbiAgICAgICAgY2hlY2tSZXN1bHQoKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGVsZW1lbnQudGV4dENvbnRlbnQgPSBhdHRyaWJ1dGU7XHJcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdjbGlja2VkJyk7XHJcbiAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWNsaWNrXCIsIFwiMVwiKTtcclxuICAgICAgICBjaGVja1Jlc3VsdCgpO1xyXG4gICAgfVxyXG59XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uIC0gZmxhZ0l0KCkgLSBwb3N0YXZsamFuamUgemFzdGF2ZSBuYSBkZXNuaSBrbGlrXHJcbmNvbnN0IGZsYWdJdCA9IChldmVudDogYW55KSA9PiB7XHJcbiAgICBsZXQgZWxlbWVudCA9IGV2ZW50LnRhcmdldDtcclxuICAgIGlmIChlbGVtZW50LnRhZ05hbWUgPT09IFwiVERcIikge1xyXG4gICAgICAgIGlmIChldmVudC53aGljaCA9PT0gMykge1xyXG4gICAgICAgICAgICBsZXQgZmxhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG4gICAgICAgICAgICBpZiAoUGxheWVyLmdldEluc3RhbmNlKCkuZ2V0R2FtZU1vZGUoKSA9PT0gJ2JlZ2lubmVyJykge1xyXG4gICAgICAgICAgICAgICAgZmxhZy5zZXRBdHRyaWJ1dGUoJ3NyYycsICcuL2ltYWdlcy9mbGFnQi5wbmcnKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChQbGF5ZXIuZ2V0SW5zdGFuY2UoKS5nZXRHYW1lTW9kZSgpID09PSAnaW50ZXJtZWRpYXRlJykge1xyXG4gICAgICAgICAgICAgICAgZmxhZy5zZXRBdHRyaWJ1dGUoJ3NyYycsICcuL2ltYWdlcy9mbGFnSS5wbmcnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHsgZmxhZy5zZXRBdHRyaWJ1dGUoJ3NyYycsICcuL2ltYWdlcy9mbGFnRS5wbmcnKTsgfVxyXG4gICAgICAgICAgICBmbGFnLmNsYXNzTGlzdC5hZGQoJ2ZsYWcnKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50LmlubmVySFRNTCA9PT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChmbGFnKTtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZW1wdHknKTtcclxuICAgICAgICAgICAgICAgIGNoZWNrUmVzdWx0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfSBlbHNlIGlmIChlbGVtZW50LnRhZ05hbWUgPT09IFwiSU1HXCIpIHtcclxuICAgICAgICBpZiAoZXZlbnQud2hpY2ggPT09IDMpIHtcclxuICAgICAgICAgICAgZWxlbWVudC5wYXJlbnROb2RlLmNsYXNzTGlzdC5yZW1vdmUoJ2VtcHR5Jyk7XHJcbiAgICAgICAgICAgIGVsZW1lbnQucGFyZW50Tm9kZS5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLyNyZWdpb24gLSBwbGFudE1pbmVzQWdhaW4oKVxyXG5sZXQgcGxhbnRNaW5lc0FnYWluID0gKCkgPT4ge1xyXG4gICAgY29uc3QgdGFibGUgPSBHYW1lLmdldEluc3RhbmNlKCkuZ2V0R2FtZVRhYmxlKCk7XHJcbiAgICBsZXQgZ2FtZU1vZGVJbmZvID0gZ2FtZU1vZGUoZ2FtZU1vZGVJbnB1dC52YWx1ZSkgYXMgbnVtYmVyW107XHJcbiAgICBjbGVhck1pbmVzKHRhYmxlKTtcclxuICAgIHNldE1pbmVzKHRhYmxlLCBnYW1lTW9kZUluZm8sIG1pbmVJY29uKTtcclxuICAgIHdyaXRlVGlwcyh0YWJsZSk7XHJcbn07XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uIC0gY2hlY2tSZXN1bHQoKSAtIHByb3ZlcmF2YSByZXp1bHRhdFxyXG5mdW5jdGlvbiBjaGVja1Jlc3VsdCgpIHtcclxuICAgIGNvbnN0IHRhYmxlID0gR2FtZS5nZXRJbnN0YW5jZSgpLmdldEdhbWVUYWJsZSgpO1xyXG4gICAgbGV0IGdhbWVNb2RlSW5mbyA9IGdhbWVNb2RlKGdhbWVNb2RlSW5wdXQudmFsdWUpIGFzIG51bWJlcltdO1xyXG4gICAgbGV0IGNsb3NlZDogYW55ID0gW107XHJcbiAgICBsZXQgYWxsRmllbGRzID0gdGFibGUucXVlcnlTZWxlY3RvckFsbChcInRkXCIpO1xyXG4gICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChhbGxGaWVsZHMsIChmaWVsZDogYW55KSA9PiB7XHJcbiAgICAgICAgaWYgKGZpZWxkLmdldEF0dHJpYnV0ZShcImRhdGEtY2xpY2tcIiwgXCIxXCIpKSB7XHJcbiAgICAgICAgICAgIGNsb3NlZC5wdXNoKGZpZWxkKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoKGNsb3NlZC5sZW5ndGggPT09ICgoZ2FtZU1vZGVJbmZvWzBdICogZ2FtZU1vZGVJbmZvWzFdKSAtIGdhbWVNb2RlSW5mb1syXSkpKSB7XHJcbiAgICAgICAgc3RvcFRpbWVySGFuZGxlcigpO1xyXG4gICAgICAgIFBsYXllci5nZXRJbnN0YW5jZSgpLnNldFNjb3JlKGNhbGNTY29yZSgpKTtcclxuICAgICAgICB0YWJsZS5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgb25GaWVsZENsaWNrKTtcclxuICAgICAgICB0YWJsZS5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGZsYWdJdCk7XHJcbiAgICAgICAgaGFuZGxlUmFua2luZygpO1xyXG4gICAgICAgIHdpbigpO1xyXG4gICAgICAgIHRhYmxlLmNsYXNzTGlzdC5hZGQoJ3RhYmxlJyk7XHJcbiAgICB9XHJcbn1cclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLyNyZWdpb24gb25GaWVsZENsaWNrKCkgLSBkZWZpbmlzZSByYXNwb3JlZCBuYSBrbGlrXHJcbmNvbnN0IG9uRmllbGRDbGljayA9IChldmVudDogYW55KSA9PiB7XHJcbiAgICBsZXQgZmllbGQgPSBldmVudC50YXJnZXQ7XHJcbiAgICBpZiAoZmllbGQudGFnTmFtZSA9PT0gXCJURFwiKSB7XHJcbiAgICAgICAgZmllbGQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHN0b3BDbGljayk7XHJcbiAgICAgICAgZmllbGQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBzdG9wQ2xpY2spO1xyXG4gICAgICAgIGNsaWNrQ291bnRlcisrO1xyXG4gICAgICAgIGlmIChjbGlja0NvdW50ZXIgPT09IDEpIHsgc3RhcnRUaW1lckhhbmRsZXIoKSB9O1xyXG4gICAgICAgIGNoZWNrTW92ZShmaWVsZCk7XHJcbiAgICB9XHJcbn07XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uIC0gcHJpbnRHcmlkKCkgLSBjcmVhdGVzIGZ1bGwgR3JpZCBhbmQgYWRkcyBpdCB0byB0aGUgZG9jdW1lbnRcclxuY29uc3QgcHJpbnRHcmlkID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgbGV0IGdhbWVNb2RlSW5mbyA9IGdhbWVNb2RlKGdhbWVNb2RlSW5wdXQudmFsdWUpIGFzIG51bWJlcltdO1xyXG4gICAgLy9jcmVhdGUgdGFibGVcclxuICAgIGNyZWF0ZUdyaWQoZ2FtZU1vZGVJbmZvKTtcclxuICAgIGNvbnN0IHRhYmxlID0gR2FtZS5nZXRJbnN0YW5jZSgpLmdldEdhbWVUYWJsZSgpO1xyXG4gICAgdGFibGUuY2xhc3NMaXN0LmFkZChQbGF5ZXIuZ2V0SW5zdGFuY2UoKS5nZXRHYW1lTW9kZSgpKTtcclxuICAgIC8vc2V0IG1pbmVzXHJcbiAgICBzZXRNaW5lcyh0YWJsZSwgZ2FtZU1vZGVJbmZvLCBtaW5lSWNvbik7XHJcbiAgICAvLyAvLyAvL3NldCB0aXBzXHJcbiAgICB3cml0ZVRpcHModGFibGUpO1xyXG4gICAgLy8gLy8gLy9wcmludCB0YWJsZVxyXG4gICAgZ2FtZS5hcHBlbmRDaGlsZCh0YWJsZSk7XHJcbiAgICAvLyAvL3NldCBsaXN0ZW5lcnNcclxuICAgIHRhYmxlLmFkZEV2ZW50TGlzdGVuZXIoXCJjb250ZXh0bWVudVwiLCBwcmV2ZW50VGFibGVNZW51KTtcclxuICAgIHRhYmxlLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgZmxhZ0l0KTtcclxuICAgIHRhYmxlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25GaWVsZENsaWNrKTtcclxuXHJcbn07XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uIC0gb25DbGljaygpIC0gbWFpbiBmdW5jdGlvblxyXG5jb25zdCBvbkNsaWNrID0gKGV2ZW50KTogdm9pZCA9PiB7XHJcbiAgICBpZiAoZXZlbnQudGFyZ2V0LnRhZ05hbWUgPT09IFwiQlVUVE9OXCIpIHtcclxuICAgICAgICBpZiAobWFuYWdlSW5wdXRzKGV2ZW50KSA9PT0gJ3N0YXJ0Jykge1xyXG4gICAgICAgICAgICBQbGF5ZXIuZ2V0SW5zdGFuY2UoKS5zZXROYW1lKHBsYXllck5hbWVJbnB1dC52YWx1ZSk7XHJcbiAgICAgICAgICAgIGdhbWVTaG93KCk7XHJcbiAgICAgICAgICAgIHByaW50R3JpZCgpO1xyXG4gICAgICAgICAgICBoYW5kbGVSYW5raW5nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vI3JlZ2lvbiAtIGdhbWVPcHRpb25zU2VjdGlvbiBldmVudCBsaXN0ZW5lcnNcclxuZ2FtZU9wdGlvbnNTZWN0aW9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25DbGljayk7XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9hcHAudHMiLCJpbXBvcnQgeyBHYW1lLCBQbGF5ZXIgfSBmcm9tICcuL2RhdGEnO1xyXG5cclxuLy8jcmVnaW9uIC0gc2VsZWN0b3JzXHJcbi8vIGNvbnN0IGN1c3RvbVJvd3NJbnB1dCA9IDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjdXN0b21Sb3dzJyk7XHJcbi8vIGNvbnN0IGN1c3RvbUNvbHNJbnB1dCA9IDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjdXN0b21Db2xzJyk7XHJcbi8vIGNvbnN0IGN1c3RvbU1pbmVzSW5wdXQgPSA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3VzdG9tTWluZXMnKTtcclxuY29uc3QgZ2FtZU1vZGVJbnB1dCA9IDxIVE1MU2VsZWN0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZS1tb2RlJyk7XHJcbi8vIGNvbnN0IGN1c3RvbU1vZGVPcHRpb25zID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjdXN0b21Nb2RlT3B0aW9ucycpO1xyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vIC8vI3JlZ2lvbiAtIGdldEN1c3RvbVByb3BzKCkgLSBnZXRzIGN1c3RvbSBwcm9wZXJ0aWVzIGZyb20gdXNlciBpbnB1dFxyXG4vLyBjb25zdCBnZXRDdXN0b21Qcm9wcyA9ICgpID0+IHtcclxuLy8gICAgIGxldCBjdXN0b21Qcm9wcyA9IFtcclxuLy8gICAgICAgICBwYXJzZUludChjdXN0b21Sb3dzSW5wdXQudmFsdWUpLFxyXG4vLyAgICAgICAgIHBhcnNlSW50KGN1c3RvbUNvbHNJbnB1dC52YWx1ZSksXHJcbi8vICAgICAgICAgcGFyc2VJbnQoY3VzdG9tTWluZXNJbnB1dC52YWx1ZSksXHJcbi8vICAgICBdO1xyXG4vLyAgICAgcmV0dXJuIGN1c3RvbVByb3BzO1xyXG4vLyB9XHJcbi8vIC8vI2VuZHJlZ2lvblxyXG5cclxuLy8gLy8jcmVnaW9uIC0gZGlzcGxheUN1c3RvbU1vZGVPcHRzKCkgLSBoaWRlcyBvciBzaG93cyBkaXYgd2l0aCBjdXN0b20gZ2FtZSBvcHRpb25zIGluIGRvY3VtZW50XHJcbi8vIGxldCBkaXNwbGF5Q3VzdG9tTW9kZU9wdGlvbnMgPSAoKTogdm9pZCA9PiB7XHJcbi8vICAgICBpZiAoZ2FtZU1vZGVJbnB1dC52YWx1ZSA9PT0gXCJjdXN0b21cIikge1xyXG4vLyAgICAgICAgIGN1c3RvbU1vZGVPcHRpb25zIS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcclxuLy8gICAgIH0gZWxzZSB7IGN1c3RvbU1vZGVPcHRpb25zIS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTsgfVxyXG4vLyB9O1xyXG4vLyAvLyNlbmRyZWdpb25cclxuXHJcbi8vIC8vI3JlZ2lvbiAtIGN1c3RvbUlucHV0VmFsaWRhdGlvbigpIC0gY3VzdG9tIGdhbWUgbW9kZSBpbnB1dCB2YWxpZGF0aW9uXHJcbi8vIGNvbnN0IGN1c3RvbUlucHV0VmFsaWRhdGlvbiA9IChtb2RlSW5mbzogbnVtYmVyW10pID0+IHsvL2dhbWUgbW9kZSBpbmZvIFtyb3dzLGNvbHMsbWluZXNdXHJcbi8vICAgICBpZiAobW9kZUluZm9bMl0gPj0gbW9kZUluZm9bMF0gKiBtb2RlSW5mb1sxXSkgeyAgLy9udW0gb2YgbWluZXMgdmFsaWRhdGlvbixjYW4ndCBiZSBtb3JlIG1pbmVzIHRoYW4gZmllbGRzIG9yIGVxdWFsIHRvIG51bSBvZiBmaWVsZHNcclxuLy8gICAgICAgICBhbGVydChcIkNhbid0IGhhdmUgbW9yZSBtaW5lcyB0aGFuIGZpZWxkc1wiKTtcclxuLy8gICAgICAgICByZXR1cm4gZmFsc2U7XHJcbi8vICAgICB9IHJldHVybiB0cnVlO1xyXG4vLyB9O1xyXG4vLyAvLyNlbmRyZWdpb25cclxuXHJcbi8vI3JlZ2lvbiAtIGdhbWVNb2RlKCkgLSBnYW1lIG1vZGUgc3dpdGNoZXJcclxuY29uc3QgZ2FtZU1vZGUgPSAobW9kZTogc3RyaW5nKTogbnVtYmVyW10gfCBzdHJpbmcgPT4ge1xyXG4gICAgc3dpdGNoIChtb2RlKSB7XHJcbiAgICAgICAgY2FzZSBcImJlZ2lubmVyXCI6XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR2FtZSBtb2RlOiBCZWdpbm5lciA5eDkgdGFibGUgd2l0aCAxMCBtaW5lc1wiKTtcclxuICAgICAgICAgICAgUGxheWVyLmdldEluc3RhbmNlKCkuc2V0R2FtZU1vZGUobW9kZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBHYW1lLmdldEluc3RhbmNlKCkubW9kZUluZm8obW9kZSk7XHJcbiAgICAgICAgY2FzZSBcImludGVybWVkaWF0ZVwiOlxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdhbWUgbW9kZTogSW50ZXJtZWRpYXRlIDE2eDE2IHRhYmxlIHdpdGggNDAgbWluZXNcIik7XHJcbiAgICAgICAgICAgIFBsYXllci5nZXRJbnN0YW5jZSgpLnNldEdhbWVNb2RlKG1vZGUpO1xyXG4gICAgICAgICAgICByZXR1cm4gR2FtZS5nZXRJbnN0YW5jZSgpLm1vZGVJbmZvKG1vZGUpO1xyXG4gICAgICAgIGNhc2UgXCJleHBlcnRcIjpcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJHYW1lIG1vZGU6IEV4cGVydCAxNngzMCB0YWJsZSB3aXRoIDk5IG1pbmVzXCIpO1xyXG4gICAgICAgICAgICBQbGF5ZXIuZ2V0SW5zdGFuY2UoKS5zZXRHYW1lTW9kZShtb2RlKTtcclxuICAgICAgICAgICAgcmV0dXJuIEdhbWUuZ2V0SW5zdGFuY2UoKS5tb2RlSW5mbyhtb2RlKTtcclxuICAgICAgICAvLyBjYXNlIFwiY3VzdG9tXCI6XHJcbiAgICAgICAgLy8gICAgIFBsYXllci5nZXRJbnN0YW5jZSgpLnNldEdhbWVNb2RlKG1vZGUpO1xyXG4gICAgICAgIC8vICAgICBpZiAoY3VzdG9tSW5wdXRWYWxpZGF0aW9uKGdldEN1c3RvbVByb3BzKCkpID09PSBmYWxzZSkgeyByZXR1cm4gZ2FtZU1vZGUoXCJWYWxpZGF0aW9uXCIpIH1cclxuICAgICAgICAvLyAgICAgR2FtZS5nZXRJbnN0YW5jZSgpLnNldEN1c3RvbU1vZGUoZ2V0Q3VzdG9tUHJvcHMoKSk7XHJcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKGBHYW1lIG1vZGU6IEN1c3RvbSAke0dhbWUuZ2V0SW5zdGFuY2UoKS5tb2RlSW5mbyhtb2RlKVswXX14JHtHYW1lLmdldEluc3RhbmNlKCkubW9kZUluZm8obW9kZSlbMV19IHRhYmxlIHdpdGggJHtHYW1lLmdldEluc3RhbmNlKCkubW9kZUluZm8obW9kZSlbMl19IG1pbmUocylgKTtcclxuICAgICAgICAvLyAgICAgcmV0dXJuIEdhbWUuZ2V0SW5zdGFuY2UoKS5tb2RlSW5mbyhtb2RlKTtcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICBpZiAobW9kZSA9PT0gXCJWYWxpZGF0aW9uXCIpIHsgY29uc29sZS5lcnJvcihcIlZhbGlkYXRpb24gaXNzdWVcIik7IHJldHVybiBcImVycm9yIVwiIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdUaGVyZSBpcyBubyBnYW1lIG1vZGUgd2l0aCB0aGF0IG51bWJlciEnKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBcImVycm9yIVwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uIC0gZXZlbnQgbGlzdGVuZXJuc1xyXG5nYW1lTW9kZUlucHV0LnZhbHVlID0gXCJiZWdpbm5lclwiO1xyXG4vLyBnYW1lTW9kZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGRpc3BsYXlDdXN0b21Nb2RlT3B0aW9ucyk7XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuZXhwb3J0IHsgZ2FtZU1vZGUsIGdhbWVNb2RlSW5wdXQgfTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvZ2FtZU1vZGUudHMiLCJpbXBvcnQgeyBHYW1lLCBQbGF5ZXIgfSBmcm9tICcuL2RhdGEnO1xyXG5pbXBvcnQgeyBkZWZpbmVTdXJyb3VuZGluZyB9IGZyb20gJy4vdGFibGVHcmlkJztcclxuaW1wb3J0IHsgcmFuZG9tTnVtYmVyc0FycmF5IH0gZnJvbSAnLi9oZWxwZXJGdW5jcyc7XHJcbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09TUlORVM9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyNyZWdpb24gY3JlYXRlTWluZXMoKSAtIGNyZWF0ZSBtaW5lcyBiYXNlZCBvbiBnYW1lTW9kZVxyXG5jb25zdCBjcmVhdGVNaW5lcyA9IChtb2RlSW5mbzogbnVtYmVyW10pOiBudW1iZXJbXSA9PiB7Ly8ga3JlaXJhIG1pbmUgaSBzb3J0aXJhIGloIHBvIHZlbGljaW5pXHJcbiAgICBsZXQgbWluZXMgPSByYW5kb21OdW1iZXJzQXJyYXkobW9kZUluZm9bMl0sIChtb2RlSW5mb1swXSAqIG1vZGVJbmZvWzFdKSkuc29ydCgoYSwgYikgPT4geyByZXR1cm4gYSAtIGIgfSk7XHJcbiAgICBjb25zb2xlLmxvZyhcIk1pbmVzIGxvY2F0aW9uOiBcIiArIG1pbmVzKTsgLy8gcHJvdmVyYXZhbW8gcG96aWNpanUgbWluYSAvLyB6YSBkZXYgcG90cmViZVxyXG4gICAgcmV0dXJuIG1pbmVzO1xyXG59XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uIC0gc2V0TWluZXMoKSAtIHNldCBtaW5lcyBvbiB0YWJsZSAoYmluZCB0byBhdHRyaWJ1dGUgZGF0YS1taW5lKVxyXG5jb25zdCBzZXRNaW5lcyA9ICh0YWJsZTogSFRNTEVsZW1lbnQsIG1vZGVJbmZvOiBudW1iZXJbXSwgbWluZUljb246IGFueSk6IHZvaWQgPT4ge1xyXG4gICAgbGV0IG1pbmVzOiBudW1iZXJbXSA9IGNyZWF0ZU1pbmVzKG1vZGVJbmZvKTsvL2tyZWlyYW1vIG1pbmVcclxuICAgIGNvbnN0IGFsbEZpZWxkcyA9IHRhYmxlLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwidGRcIik7IC8vIHV6aW1hbW8gc3ZlIHRkIGVsZW1lbnRlIGl6IHRhYmVsZVxyXG4gICAgbWluZXMuZm9yRWFjaChtaW5lID0+IHsgIC8vIHBvc3RhdmxqYW1vIGlrb251IGJvbWJhIG5hIHN2YWtpIHRkIGtvamkgc2UgcG9rbGFwYSBzYSBuaXpvbSBtaW5hLlxyXG4gICAgICAgIGFsbEZpZWxkc1sobWluZSAtIDEpXS5zZXRBdHRyaWJ1dGUoXCJkYXRhLW1pbmVcIiwgbWluZUljb24pOyAvLyAtMSB6Ym9nIHJhemxpa2UgdSBwb3ppY2lqaSBwb2xqYSB1IG5penUgYWxsZmllbGRzIGkgcG96aWNpamUgbWluZVxyXG4gICAgfSk7XHJcbn1cclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLyNyZWdpb24gLSBjbGVhck1pbmVzKCkgLSBjbGVhciBtaW5lcyBmcm9tIHRhYmxlXHJcbmNvbnN0IGNsZWFyTWluZXMgPSAodGFibGU6IEhUTUxFbGVtZW50KTogdm9pZCA9PiB7XHJcbiAgICBjb25zdCBhbGxGaWVsZHMgPSB0YWJsZS5nZXRFbGVtZW50c0J5VGFnTmFtZShcInRkXCIpO1xyXG4gICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChhbGxGaWVsZHMsIChmaWVsZDogSFRNTFRhYmxlRGF0YUNlbGxFbGVtZW50KSA9PiB7XHJcbiAgICAgICAgZmllbGQuc2V0QXR0cmlidXRlKCdkYXRhLW1pbmUnLCAnJyk7XHJcbiAgICB9KTtcclxufVxyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vI3JlZ2lvbiAtIHNob3dNaW5lcygpIC0gc2hvdyBtaW5lcyBvbiBncmlkXHJcbmNvbnN0IHNob3dNaW5lcyA9ICh0YWJsZSwgbWluZUljb24pID0+IHtcclxuICAgIGNvbnN0IGFsbEZpZWxkcyA9IHRhYmxlLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwidGRcIik7XHJcbiAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKGFsbEZpZWxkcywgKGZpZWxkOiBIVE1MVGFibGVEYXRhQ2VsbEVsZW1lbnQpID0+IHtcclxuICAgICAgICBpZiAoZmllbGQuZ2V0QXR0cmlidXRlKCdkYXRhLW1pbmUnKSA9PT0gbWluZUljb24pIHtcclxuICAgICAgICAgICAgZmllbGQuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICAgICAgbGV0IGltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICAgICAgICAgIGlmIChQbGF5ZXIuZ2V0SW5zdGFuY2UoKS5nZXRHYW1lTW9kZSgpID09PSAnYmVnaW5uZXInKSB7XHJcbiAgICAgICAgICAgICAgICBpbWFnZS5zZXRBdHRyaWJ1dGUoJ3NyYycsICcuL2ltYWdlcy9taW5lQi5wbmcnKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChQbGF5ZXIuZ2V0SW5zdGFuY2UoKS5nZXRHYW1lTW9kZSgpID09PSAnaW50ZXJtZWRpYXRlJykge1xyXG4gICAgICAgICAgICAgICAgaW1hZ2Uuc2V0QXR0cmlidXRlKCdzcmMnLCAnLi9pbWFnZXMvbWluZUkucG5nJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7IGltYWdlLnNldEF0dHJpYnV0ZSgnc3JjJywgJy4vaW1hZ2VzL21pbmVFLnBuZycpOyB9XHJcbiAgICAgICAgICAgIGZpZWxkLmNsYXNzTGlzdC5hZGQoJ2VtcHR5Jyk7XHJcbiAgICAgICAgICAgIGZpZWxkLmFwcGVuZENoaWxkKGltYWdlKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufTtcclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vL05BUE9NRU5BIGRhdGEtbWluZSAtIGFrbyBqZSBib21iYSBzdGF2bGphIHNlIGlrb25hLCBha28gbmlqZSBzdGF2bGphIHNlIGJyb2ogYm9tYmkgdSBva3J1emVuanVcclxuXHJcbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09VElQUz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuLy8jcmVnaW9uIC0gd3JpdGUgdGlwcyBiYXNlZCBvbiBtaW5lcyBvbiB0aGUgZ2l2ZW4gdGFibGVcclxuY29uc3Qgd3JpdGVUaXBzID0gKHRhYmxlOiBIVE1MVGFibGVFbGVtZW50KTogdm9pZCA9PiB7XHJcbiAgICBjb25zdCBhbGxGaWVsZHMgPSB0YWJsZS5nZXRFbGVtZW50c0J5VGFnTmFtZShcInRkXCIpOyAvLyBzZWxla3R1amVtbyBzdmEgcG9samEgdSBkYXRvaiB0YWJlbGlcclxuICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoYWxsRmllbGRzLCBmaWVsZCA9PiB7IC8vIHphIHN2YWtvIHBvbGplXHJcbiAgICAgICAgaWYgKGZpZWxkLmdldEF0dHJpYnV0ZShcImRhdGEtbWluZVwiKSA9PT0gXCJcIikgeyAvLyBha28gamUgZWxlbWVudCBwcmF6YW4gKHRqLiBuaWplIG1pbmEsIGplciBzdSBtaW5lIHZlYyBwb3N0YXZsamVuZSBuYSB0YWJsaSlcclxuICAgICAgICAgICAgbGV0IG1pbmVzTnVtID0gY291bnRNaW5lcyhmaWVsZCk7IC8vIHByb3ZlcmF2YW1vIHN1c2VkbmEgcG9samEgaSBpc3Bpc3VqZW1vIGJyb2ogbWluYSB1IG9rb2xpbmlcclxuICAgICAgICAgICAgaWYgKG1pbmVzTnVtID09PSAwKSB7IGZpZWxkLnNldEF0dHJpYnV0ZShcImRhdGEtbWluZVwiLCBcIlwiKTsgZmllbGQuc2V0QXR0cmlidXRlKFwiZGF0YS1lbXB0eVwiLCBcIjFcIik7IH0vLyBha28gbmlqZSBtaW5hIGkgbmVtYSB1IG9rcnV6ZW5qdSB1cGlzdWplbW8gdSBkYXRhLWVtcHR5IDE7MSB6YSB0cnVlO1xyXG4gICAgICAgICAgICBlbHNlIHsgZmllbGQuc2V0QXR0cmlidXRlKFwiZGF0YS1taW5lXCIsIG1pbmVzTnVtLnRvU3RyaW5nKCkpOyBmaWVsZC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWVtcHR5XCIsIFwiMFwiKTsgLyplbGVtZW50LnRleHRDb250ZW50ID0gdGV4dDsgemEgZGV2IHBvdHJlYmUqLyB9IC8vYWtvIGltYSBtaW5hO2RhdGEtZW1wdHkgOyAwIHphIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vI3JlZ2lvbiAtIGZ1bmtjaWphIGtvamEgcHJvdmVyYXZhIHBvbGphIHUgb2tydXplbmp1XHJcbmZ1bmN0aW9uIGNvdW50TWluZXMoZmllbGQ6IEhUTUxUYWJsZUNlbGxFbGVtZW50KTogbnVtYmVyIHsgLy8gcHJvc2xlZGp1amVtbyBwb2xqZSBuYSBvc25vdnUga29qZWcgdnJzaW1vIHByb3ZlcnUgaSBicm9qIGtvbG9uYSB6Ym9nIG9yaWplbnRhY2lqZVxyXG4gICAgY29uc3QgZ2FtZU1vZGVJbmZvID0gR2FtZS5nZXRJbnN0YW5jZSgpLm1vZGVJbmZvKFBsYXllci5nZXRJbnN0YW5jZSgpLmdldEdhbWVNb2RlKCkpO1xyXG4gICAgY29uc3QgbnVtT2ZDb2xzOiBudW1iZXIgPSBnYW1lTW9kZUluZm9bMV07XHJcbiAgICBsZXQgY291bnRlciA9IDA7IC8vIGJyb2phYyBtaW5hIHUgb2tydXplbmp1IHBvbGphXHJcbiAgICBsZXQgc3Vycm91bmRpbmcgPSBkZWZpbmVTdXJyb3VuZGluZyhHYW1lLmdldEluc3RhbmNlKCkuZ2V0R2FtZVRhYmxlKCksIGZpZWxkKTsgLy8ga3JlaXJhbW8gb2tydXplbmplIChwb3ppdmFtbyBmdW5rY2lqdSB6YSB0bylcclxuICAgIHN1cnJvdW5kaW5nLmZvckVhY2goc3VyRmllbGQgPT4geyAvLyBwcm92ZXJhdmFtbyBzdmFrbyBwb2xqZSB1IG9rcnV6ZW5qdVxyXG4gICAgICAgIGlmIChzdXJGaWVsZCA9PT0gbnVsbCkgeyB9Ly8gYWtvIGplIHBvbGplIHZhbiB0YWJlbGUsIGlnbm9yaXNpXHJcbiAgICAgICAgZWxzZSBpZiAoc3VyRmllbGQuZ2V0QXR0cmlidXRlKFwiZGF0YS1taW5lXCIpID09PSBcIlxcdUQ4M0RcXHVEQ0EzXCIpIHsgLy8gemEgc3Zha3UgbWludVxyXG4gICAgICAgICAgICBjb3VudGVyKys7IC8vZG9kYWogamVkYW4gdSBicm9qYWNcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBjb3VudGVyOyAvLyBjZWxhIGZ1bmtjaWphIHZyYWNhIGJyb2phYyB0ai4gdWt1cGEgYnJvaiBtaW5hIHUgb2tydXplbmp1XHJcbn1cclxuLy8jZW5kcmVnaW9uXHJcblxyXG5leHBvcnQgeyBzZXRNaW5lcywgY2xlYXJNaW5lcywgc2hvd01pbmVzLCB3cml0ZVRpcHMgfTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvbWluZXNBbmRUaXBzLnRzIiwiaW1wb3J0IHsgR2FtZSwgUGxheWVyIH0gZnJvbSAnLi9kYXRhJztcclxuaW1wb3J0IHsgZGVmaW5lU3Vycm91bmRpbmcgfSBmcm9tICcuL3RhYmxlR3JpZCc7XHJcblxyXG5cclxuXHJcbi8vI3JlZ2lvbiAtIHN0b3BDbGljaygpIC0gc3RvcGlyYSBldmVudExJc3RlbmVyIG5hIGVsZW1lbnR1IGtvamkgamUga2xpa251dFxyXG5mdW5jdGlvbiBzdG9wQ2xpY2soZXZlbnQ6IGFueSkge1xyXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbn1cclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLz09PT09PT09PT09PT09PT09PT09PUVNUFRZIEZMT1c9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyNyZWdpb24gLSBvcGVuRW1wdHlFbGVtZW50KCkgLSBmbG93IGZ1bmN0aW9uXHJcblxyXG5sZXQgb3BlbkVtcHR5RWxlbWVudCA9IChlbGVtZW50OiBIVE1MVGFibGVEYXRhQ2VsbEVsZW1lbnQpID0+IHsvLyBwb2tyZWNlIGVtcHR5IGZsb3cgcHJvdmVydVxyXG4gICAgbGV0IGVtcHR5RmllbGRzID0gZmlyc3RFbXB0eUZpZWxkQ2hlY2soZWxlbWVudCk7Ly9wcm92ZXJhdmEgc2UgcHJ2byBwcmF6bm8gcG9samUgaSBldmlkZW50aXJhanUgb3N0YWxhIHByYXpuYSBwb2xqYSB1IG9rcnV6ZW5qdVxyXG4gICAgLy8gY29uc29sZS5sb2coZW1wdHlGaWVsZHMpO1xyXG4gICAgbGV0IHN0b3BTZWFyY2ggPSBmYWxzZTtcclxuXHJcbiAgICB3aGlsZSAoc3RvcFNlYXJjaCA9PSBmYWxzZSkge1xyXG4gICAgICAgIGlmIChlbXB0eUZpZWxkcy5sZW5ndGggIT0gMCkge1xyXG4gICAgICAgICAgICBsZXQgbmV3TWFpbkFycmF5OiBhbnlbXSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgZW1wdHlGaWVsZHMuZm9yRWFjaChmaWVsZCA9PiB7Ly8gemEgc3Zha28gcHJhem5vIHBvbGplXHJcbiAgICAgICAgICAgICAgICBlbXB0eUNlbGwoZmllbGQpOy8vIHRvdGFsbm8gZ2EgcHJhem5pbW9cclxuICAgICAgICAgICAgICAgIGxldCBzdWJBcnJheSA9IGRlZmluZVN1cnJvdW5kaW5nKEdhbWUuZ2V0SW5zdGFuY2UoKS5nZXRHYW1lVGFibGUoKSwgZmllbGQpOy8vcHJvdmVyYXZhbW8gb2tydXplbmplIHRvZyBwb2xqYVxyXG4gICAgICAgICAgICAgICAgc3ViQXJyYXkuZm9yRWFjaCgoZWxlbWVudCkgPT4gey8vemEgc3Zha28gcG9samUgaXogb2tydXplbmphIHRvZyBwb2xqYVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbGVtZW50ICE9PSBudWxsKSB7Ly9ha28gamUgZWxlbWVudCB1IG9rdmlydSB0YWJsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShcImRhdGEtY2xpY2tcIiwgXCIxXCIpOy8vcG9zdGF2bGphbW8gZGEgamUga2xpa251dG9cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc3RvcENsaWNrKTsvL2JyaXNlbW8gZXZlbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHN0b3BDbGljayk7Ly8gYnJpc2VtbyBldmVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV3TWFpbkFycmF5LmluZGV4T2YoZWxlbWVudCkgIT09IC0xKSB7IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7IG5ld01haW5BcnJheS5wdXNoKGVsZW1lbnQpIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRleHQgPSBlbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtaWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb250ZXh0ID09PSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW1wdHlDZWxsKDxhbnk+ZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIG5ld01haW5BcnJheSA9IGNoZWNrRW1wdHlGaWVsZHMobmV3TWFpbkFycmF5KTtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKG5ld01haW5BcnJheSk7XHJcbiAgICAgICAgICAgICAgICBlbXB0eUZpZWxkcyA9IG5ld01haW5BcnJheTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHN0b3BTZWFyY2ggPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHN0b3BTZWFyY2ggPSB0cnVlO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uIC0gZW1wdHlDZWxsKClcclxuY29uc3QgZW1wdHlDZWxsID0gKGVsZW1lbnQ6IEhUTUxUYWJsZURhdGFDZWxsRWxlbWVudCk6IHZvaWQgPT4ge1xyXG4gICAgaWYgKGVsZW1lbnQgIT09IG51bGwpIHtcclxuICAgICAgICBlbGVtZW50LmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWVtcHR5XCIsIFwiXCIpOy8vQUxFUlQgYnJpc2Ugc2UgaW5mbyBvIHRvbWUgZGEgbGkgamUgcHJhem5hIGNlbGlqYSwgcHJvdmVyaXRpIHphc3RvXHJcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiZW1wdHlcIik7Ly9jc3MgY2xhc2EgZGEgc2Ugb2JvamkgcHJhem5vIHBvbGplXHJcblxyXG4gICAgfVxyXG59XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uIC0gY2hlY2tFbXB0eUZpZWxkcygpIC0gY2hlY2sgZW1wdHkgZmllbGRzIGlmIGl0IGlzIHRvdGFsbHkgZW1wdHkgb3IgaXRzIGEgdGlwXHJcbmNvbnN0IGNoZWNrRW1wdHlGaWVsZHMgPSAoZmllbGRzOiBhbnkpID0+IHtcclxuICAgIGxldCBjaGVja2VkRW1wdHlGaWVsZHM6IEhUTUxUYWJsZURhdGFDZWxsRWxlbWVudFtdID0gW107XHJcbiAgICBmaWVsZHMuZm9yRWFjaChmaWVsZCA9PiB7XHJcbiAgICAgICAgaWYgKGZpZWxkID09PSBudWxsKSB7IH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZmllbGQuc2V0QXR0cmlidXRlKFwiZGF0YS1jbGlja1wiLCBcIjFcIik7Ly9zZXQgZmllbGQgYXMgY2xpY2tlZFxyXG4gICAgICAgICAgICBmaWVsZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc3RvcENsaWNrKTsvL3VrZGlkYSBldmVudFxyXG4gICAgICAgICAgICBmaWVsZC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHN0b3BDbGljayk7Ly91a2lkYSBldmVudFxyXG4gICAgICAgICAgICBjb25zdCBpc0VtcHR5ID0gZmllbGQuZ2V0QXR0cmlidXRlKFwiZGF0YS1lbXB0eVwiKTtcclxuICAgICAgICAgICAgY29uc3QgY29udGV4dCA9IGZpZWxkLmdldEF0dHJpYnV0ZShcImRhdGEtbWluZVwiKTtcclxuICAgICAgICAgICAgaWYgKGlzRW1wdHkgPT09IFwiMVwiKSB7Ly8gaWYgZmllbGQgaXMgdG90YWxseSBlbXB0eVxyXG4gICAgICAgICAgICAgICAgY2hlY2tlZEVtcHR5RmllbGRzLnB1c2goZmllbGQpO1xyXG4gICAgICAgICAgICAgICAgZmllbGQuY2xhc3NMaXN0LmFkZChcImVtcHR5XCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgeyBmaWVsZC50ZXh0Q29udGVudCA9IGNvbnRleHQ7ZmllbGQuY2xhc3NMaXN0LmFkZCgnY2xpY2tlZCcpOyB9Ly8gaWYgaXRzIHRpcCwgc2hvdyBpdFxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGNoZWNrZWRFbXB0eUZpZWxkczsgLy8gcmV0dXJuaW5nIGFycmF5IG9mIHRvdGFsbHkgZW1wdHkgZmllbGRzXHJcbn1cclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLyNyZWdpb24gLSBmaXJzdEVtcHR5RmllbGRDaGVjaygpIC0gRmlyc3QgY2xpY2tlZCBlbXB0eSBlbGVtZW50IGNoZWNrLCByZXR1cm5zIGFycmF5IG9mIGVtcHR5IGJsYW5rIGVsZW1lbnRzXHJcbmNvbnN0IGZpcnN0RW1wdHlGaWVsZENoZWNrID0gKGZpZWxkOiBIVE1MVGFibGVEYXRhQ2VsbEVsZW1lbnQpID0+IHsvL2NoZWNraW5nIGZpcnN0IGVtcHR5IGNsaWNrZWQgZmllbGRcclxuICAgIGZpZWxkLnNldEF0dHJpYnV0ZShcImRhdGEtY2xpY2tcIiwgXCIxXCIpOyAvLyBzZXQgY2xpY2tlZFxyXG4gICAgZmllbGQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHN0b3BDbGljayk7Ly9zdG9waXJhIGV2ZW50IGNsaWNrXHJcbiAgICBmaWVsZC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHN0b3BDbGljayk7IC8vIHN0b3BpcmEgZXZlbnQgbW91c2Vkb3duXHJcbiAgICBlbXB0eUNlbGwoZmllbGQpOyAvLyByZW1vdmUgZW1wdHkgYXR0cmlidXRlLCBjb2xvciBmaWVsZFxyXG5cclxuICAgIGNvbnN0IHN1cnJvdW5kRmllbGRzID0gZGVmaW5lU3Vycm91bmRpbmcoR2FtZS5nZXRJbnN0YW5jZSgpLmdldEdhbWVUYWJsZSgpLCBmaWVsZCk7Ly9rcmVpcmEgbml6IHN1c2VkbmloIHBvbGphXHJcbiAgICBjb25zdCBlbXB0eUZpZWxkcyA9IGNoZWNrRW1wdHlGaWVsZHMoc3Vycm91bmRGaWVsZHMpO1xyXG4gICAgcmV0dXJuIGVtcHR5RmllbGRzO1xyXG59XHJcbi8vI2VuZHJlZ2lvblxyXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5leHBvcnQgeyBvcGVuRW1wdHlFbGVtZW50LCBzdG9wQ2xpY2sgfTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvZW1wdHlGbG93LnRzIiwibGV0IHRpbWVyID0ge1xyXG4gICAgdGltZToge1xyXG4gICAgICAgIGhvdXJzOiAwLFxyXG4gICAgICAgIG1pbnV0ZXM6IDAsXHJcbiAgICAgICAgc2Vjb25kczogMFxyXG4gICAgfSxcclxuICAgIGludGVydmFsOiAxLFxyXG4gICAgdGltZUluY3JlbWVudDogKCkgPT4ge1xyXG4gICAgICAgIGlmICh0aW1lci50aW1lLnNlY29uZHMgPCA1OSkgeyB0aW1lci50aW1lLnNlY29uZHMrKyB9XHJcbiAgICAgICAgZWxzZSBpZiAodGltZXIudGltZS5zZWNvbmRzID09PSA1OSAmJiB0aW1lci50aW1lLm1pbnV0ZXMgPCA1OSkgeyB0aW1lci50aW1lLnNlY29uZHMgPSAwLCB0aW1lci50aW1lLm1pbnV0ZXMrKyB9XHJcbiAgICAgICAgZWxzZSBpZiAodGltZXIudGltZS5zZWNvbmRzID09PSA1OSAmJiB0aW1lci50aW1lLm1pbnV0ZXMgPT09IDU5KSB7IHRpbWVyLnRpbWUuc2Vjb25kcyA9IDAsIHRpbWVyLnRpbWUubWludXRlcyA9IDAsIHRpbWVyLnRpbWUuaG91cnMrKyB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5cclxubGV0IGNhbGNTY29yZSA9ICgpOiBudW1iZXIgPT4ge1xyXG4gICAgcmV0dXJuIHRpbWVyLnRpbWUuc2Vjb25kcyArICh0aW1lci50aW1lLm1pbnV0ZXMgKiA2MCkgKyAodGltZXIudGltZS5ob3VycyAqIDM2MCk7XHJcbn07XHJcblxyXG5cclxubGV0IGdldFN0cmluZ1RpbWUgPSAoKSA9PiB7XHJcbiAgICBsZXQgcHJldlRpbWUgPSBbdGltZXIudGltZS5ob3VycywgdGltZXIudGltZS5taW51dGVzLCB0aW1lci50aW1lLnNlY29uZHNdO1xyXG4gICAgbGV0IGN1cnJUaW1lID0gcHJldlRpbWUubWFwKCh0aW1lRWxlbWVudCkgPT4geyBpZiAodGltZUVsZW1lbnQgPCAxMCkgeyByZXR1cm4gXCIwXCIgKyB0aW1lRWxlbWVudCB9IGVsc2UgeyByZXR1cm4gdGltZUVsZW1lbnQgfSB9KTtcclxuICAgIHJldHVybiBgJHtjdXJyVGltZVswXX0gOiAke2N1cnJUaW1lWzFdfSA6ICR7Y3VyclRpbWVbMl19YDtcclxufTtcclxuXHJcbmxldCBzdGFydFRpbWVyID0gKHN0ZXAgPSAxKTogdm9pZCA9PiB7XHJcbiAgICB0aW1lci5pbnRlcnZhbCA9IHNldEludGVydmFsKHRpbWVyLnRpbWVJbmNyZW1lbnQsIHN0ZXAgKiAxMDAwKTtcclxufTtcclxuXHJcbmxldCBzdG9wVGltZXIgPSAoKTogdm9pZCA9PiB7XHJcbiAgICBjbGVhckludGVydmFsKHRpbWVyLmludGVydmFsKTtcclxufTtcclxuXHJcbmxldCByZXNldFRpbWVyID0gKCkgPT4ge1xyXG4gICAgZm9yIChsZXQgZWxlbWVudCBpbiB0aW1lci50aW1lKSB7IHRpbWVyLnRpbWVbZWxlbWVudF0gPSAwIH07XHJcbn1cclxuXHJcbmxldCBzdHJpbmdJbnRlcnZhbCA9IDA7IC8vIHphIGlzcGlzIHN0cmluZyB2cmVtZW5hXHJcbmNvbnN0IHRpbWVyUGxhY2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGltZXItcGxhY2UnKTtcclxuXHJcbmxldCBzdGFydFRpbWVySGFuZGxlciA9ICgpID0+IHtcclxuICAgIHN0YXJ0VGltZXIoKTtcclxuICAgIHN0cmluZ0ludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4geyB0aW1lclBsYWNlLnRleHRDb250ZW50ID0gZ2V0U3RyaW5nVGltZSgpIH0sIDEwMCk7XHJcbn07XHJcblxyXG5sZXQgc3RvcFRpbWVySGFuZGxlciA9ICgpID0+IHtcclxuICAgIHN0b3BUaW1lcigpO1xyXG4gICAgY2xlYXJJbnRlcnZhbChzdHJpbmdJbnRlcnZhbCk7XHJcbn07XHJcblxyXG5cclxuZXhwb3J0IHsgc3RhcnRUaW1lckhhbmRsZXIsIHN0b3BUaW1lciwgcmVzZXRUaW1lciwgZ2V0U3RyaW5nVGltZSwgdGltZXJQbGFjZSwgc3RvcFRpbWVySGFuZGxlciwgY2FsY1Njb3JlIH07XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC90aW1lci50cyIsImltcG9ydCB7IFBsYXllciB9IGZyb20gJy4vZGF0YSc7XHJcbmltcG9ydCB7IGNhbGNTY29yZSB9IGZyb20gJy4vdGltZXInO1xyXG5cclxuLy8jcmVnaW9uIC0gc2VsZWN0b3JzXHJcbmNvbnN0IHNjb3JlTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzY29yZS1saXN0Jyk7XHJcbmNvbnN0IGdhbWVNb2RlTmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lLW1vZGUtbmFtZScpO1xyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vI3JlZ2lvbiAtIHJhbmtpbmdUYWJsZSBkZWZpbml0aW9uXHJcbmxldCByYW5raW5nVGFibGU6IHt9ID0ge1xyXG4gICAgYmVnaW5uZXI6IFtbJ0pvaG4nLCAxNV0sIFsnTWFycnknLCAyMV0sIFsnVGltJywgMjRdLFsnQWxleCcsIDI2XV0sXHJcbiAgICBpbnRlcm1lZGlhdGU6IFtbJ1NhbScsIDQ0XSwgWydNYXJrJywgNDZdLCBbJ0ppbScsIDUwXV0sXHJcbiAgICBleHBlcnQ6IFtbJ01hcmlhJywgNThdLCBbJ0tpdCcsIDY2XSwgWydUb255JywgNzBdXVxyXG59O1xyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vI3JlZ2lvbiAtIHByZXNldFN0b3JhZ2UoKSAtIGNoZWNrcyBpZiB0aGVyZSdzIGRhdGFiYXNlIGluIGxvY2Fsc3RvcmFnZSBpZiBub3QgY3JlYXRlcyBvbmUsIG90aGVyd2lzZSBsb2FkcyBpdC5cclxuY29uc3QgcHJlc2V0U3RvcmFnZSA9ICgpOiB2b2lkID0+IHtcclxuICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncmFua2luZ1RhYmxlJykgPT09IG51bGwpIHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncmFua2luZ1RhYmxlJywgSlNPTi5zdHJpbmdpZnkocmFua2luZ1RhYmxlKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coYGRhdGFiYXNlIGZldGNoZWQgZnJvbSBsb2NhbHN0b3JhZ2VgLCBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncmFua2luZ1RhYmxlJykpO1xyXG4gICAgfVxyXG59O1xyXG4vLyNlbmRyZWdpb25cclxuXHJcbnByZXNldFN0b3JhZ2UoKTtcclxuXHJcbi8vI3JlZ2lvbiAtIHNhdmVEYXRhKCkgLVxyXG5jb25zdCBzYXZlRGF0YSA9ICgpID0+IHtcclxuICAgIGxldCBzdG9yYWdlRGF0YSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3JhbmtpbmdUYWJsZScpKTtcclxuICAgIGxldCBnYW1lTW9kZSA9IFBsYXllci5nZXRJbnN0YW5jZSgpLmdldEdhbWVNb2RlKCk7XHJcbiAgICBjb25zb2xlLmxvZyhgR2FtZSBtb2RlIGluc2lkZSBzYXZlRGF0YTogJHtnYW1lTW9kZX1gKTtcclxuXHJcbiAgICBsZXQgY3VycmVudE1vZGVUYWJsZSA9IHN0b3JhZ2VEYXRhW2dhbWVNb2RlXTtcclxuICAgIGNvbnNvbGUubG9nKGBDdXJyZW50IFRhYmxlIGluc2lkZSBzYXZlRGF0YTogJHtjdXJyZW50TW9kZVRhYmxlfWApO1xyXG4gICAgY3VycmVudE1vZGVUYWJsZSA9IHNjb3JlVmFsaWRhdGlvbihjdXJyZW50TW9kZVRhYmxlKTtcclxuICAgIGNvbnNvbGUubG9nKGBUYWJsZSBpbnNpZGUgc2F2ZURhdGE6ICR7Y3VycmVudE1vZGVUYWJsZX1gKTtcclxuICAgIGN1cnJlbnRNb2RlVGFibGUuc29ydCgoYSwgYikgPT4geyByZXR1cm4gYVsxXSAtIGJbMV19KTtcclxuICAgIGNvbnNvbGUubG9nKGBUYWJsZSBpbnNpZGUgc2F2ZURhdGE6ICR7Y3VycmVudE1vZGVUYWJsZX1gKTtcclxuICAgIGZvciAoY3VycmVudE1vZGVUYWJsZS5sZW5ndGg7IGN1cnJlbnRNb2RlVGFibGUubGVuZ3RoID4gNTspIHtcclxuICAgICAgICBjdXJyZW50TW9kZVRhYmxlLnBvcCgpO1xyXG4gICAgfVxyXG4gICAgc3RvcmFnZURhdGFbZ2FtZU1vZGVdID0gY3VycmVudE1vZGVUYWJsZTtcclxuICAgIGxldCBuZXdEYXRhID0gSlNPTi5zdHJpbmdpZnkoc3RvcmFnZURhdGEpO1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3JhbmtpbmdUYWJsZScsIG5ld0RhdGEpO1xyXG4gICAgcmFua2luZ1RhYmxlID0gc3RvcmFnZURhdGE7XHJcbn07XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uIC0gc2NvcmVWYWxpZGF0aW9uICgpIC0gdmFsaWRhdGVzIGlmIHNjb3JlIGlzIG5vdCBlcXVhbCB0byAwXHJcbmNvbnN0IHNjb3JlVmFsaWRhdGlvbiA9ICh0YWJsZTogKHN0cmluZyB8IG51bWJlcilbXVtdKSA9PiB7XHJcbiAgICBsZXQgbmV3VGFibGUgPSB0YWJsZTtcclxuICAgIGNvbnNvbGUubG9nKG5ld1RhYmxlKTtcclxuICAgIGNvbnN0IHBsYXllclNjb3JlID0gW1BsYXllci5nZXRJbnN0YW5jZSgpLmdldE5hbWUoKSwgUGxheWVyLmdldEluc3RhbmNlKCkuZ2V0U2NvcmUoKV07XHJcbiAgICBpZiAocGxheWVyU2NvcmVbMV0gIT09IDAgJiYgcGxheWVyU2NvcmVbMV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIG5ld1RhYmxlLnB1c2gocGxheWVyU2NvcmUpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCduZXcgdGFibGUgaW5zaWRlIGlmIHN0YXRlbWVudCcscGxheWVyU2NvcmUsbmV3VGFibGUpO1xyXG4gICAgfVxyXG4gICAgY29uc29sZS5sb2coJ25ld1RhYmxlJyxuZXdUYWJsZSk7XHJcbiAgICByZXR1cm4gbmV3VGFibGU7XHJcbn07XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuXHJcbi8vI3JlZ2lvbiAtIHdyaXRlRGF0YSgpIC0gcHJpbnRzIG91dCByYW5raW5nIHRhYmxlXHJcbmxldCBwcmludERhdGEgPSAoKSA9PiB7XHJcblxyXG4gICAgbGV0IHRhYmxlID0gcmFua2luZ1RhYmxlW1BsYXllci5nZXRJbnN0YW5jZSgpLmdldEdhbWVNb2RlKCldO1xyXG5cclxuICAgIGdhbWVNb2RlTmFtZS50ZXh0Q29udGVudCA9IFBsYXllci5nZXRJbnN0YW5jZSgpLmdldEdhbWVNb2RlKCkgKyAnIG1vZGUnO1xyXG4gICAgc2NvcmVMaXN0LmlubmVySFRNTCA9ICcnO1xyXG5cclxuICAgIHRhYmxlLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgbGV0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuICAgICAgICBsaS50ZXh0Q29udGVudCA9IGAke2VsZW1lbnRbMF19IC0gJHtlbGVtZW50WzFdfWA7XHJcbiAgICAgICAgc2NvcmVMaXN0LmFwcGVuZENoaWxkKGxpKTtcclxuICAgIH0pO1xyXG59O1xyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vI3JlZ2lvbiAtIGhhbmRsZVJhbmtpbmcoKSAtIG9uZSB0byBydWxlIHRoZW0gYWxsXHJcbmNvbnN0IGhhbmRsZVJhbmtpbmcgPSAoKSA9PiB7XHJcbiAgICBzYXZlRGF0YSgpO1xyXG4gICAgcHJpbnREYXRhKCk7XHJcbn07XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuZXhwb3J0IHsgaGFuZGxlUmFua2luZyB9O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvcmFua2luZy50cyIsImltcG9ydCB7IEdhbWUsIGdhbWVTZWN0aW9uLCBnYW1lLCB3ZWxjb21lU2NyZWVuIH0gZnJvbSAnLi9kYXRhJztcclxuXHJcbmNvbnN0IGFib3V0R2FtZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhYm91dC1nYW1lLWJ1dHRvbicpO1xyXG5jb25zdCBnYW1lQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWUtYnV0dG9uJyk7XHJcbmNvbnN0IGdhbWVSdWxlc0J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lLXJ1bGVzLWJ1dHRvbicpO1xyXG5cclxuY29uc3QgZ2FtZVJ1bGVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWUtcnVsZXMnKTtcclxuY29uc3QgYWJvdXRHYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Fib3V0LWdhbWUnKTtcclxuY29uc3QgYm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYm9keVwiKTtcclxuXHJcbmNvbnN0IGJvb20gPSAoKSA9PiB7XHJcbiAgICBsZXQgaW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgIGltYWdlLnNldEF0dHJpYnV0ZSgnc3JjJywgJy4vaW1hZ2VzL2Jvb20ucG5nJyk7XHJcbiAgICBpbWFnZS5jbGFzc0xpc3QuYWRkKCdiaWctYm9vbScpO1xyXG4gICAgYm9keS5hcHBlbmRDaGlsZChpbWFnZSk7XHJcbn07XHJcblxyXG5jb25zdCBnYW1lT3ZlciA9ICgpID0+IHtcclxuICAgIGxldCBpbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG4gICAgaW1hZ2Uuc2V0QXR0cmlidXRlKCdzcmMnLCAnLi9pbWFnZXMvZ2FtZW92ZXIucG5nJyk7XHJcbiAgICBpbWFnZS5jbGFzc0xpc3QuYWRkKCdnYW1lLW92ZXInKTtcclxuICAgIGdhbWUuYXBwZW5kQ2hpbGQoaW1hZ2UpO1xyXG59O1xyXG5cclxuY29uc3Qgd2luID0gKCkgPT4ge1xyXG4gICAgbGV0IGltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICBpbWFnZS5zZXRBdHRyaWJ1dGUoJ3NyYycsICcuL2ltYWdlcy93aW4ucG5nJyk7XHJcbiAgICBpbWFnZS5jbGFzc0xpc3QuYWRkKCd3aW4nKTtcclxuICAgIGdhbWUuYXBwZW5kQ2hpbGQoaW1hZ2UpO1xyXG59O1xyXG5cclxuLy8jcmVnaW9uIC0gaGVhZGVyIG5hdlxyXG5cclxuY29uc3QgYWJvdXRHYW1lU2hvdyA9ICgpID0+e1xyXG4gICAgd2VsY29tZVNjcmVlbi5jbGFzc0xpc3QuYWRkKCdyZW1vdmUnKTtcclxuICAgIGdhbWUuY2xhc3NMaXN0LmFkZCgncmVtb3ZlJyk7XHJcbiAgICBnYW1lUnVsZXMuY2xhc3NMaXN0LmFkZCgncmVtb3ZlJyk7XHJcbiAgICBhYm91dEdhbWUuY2xhc3NMaXN0LnJlbW92ZSgncmVtb3ZlJyk7XHJcbn07XHJcblxyXG5jb25zdCBnYW1lUnVsZXNTaG93ID0gKCkgPT4ge1xyXG4gICAgd2VsY29tZVNjcmVlbi5jbGFzc0xpc3QuYWRkKCdyZW1vdmUnKTtcclxuICAgIGdhbWUuY2xhc3NMaXN0LmFkZCgncmVtb3ZlJyk7XHJcbiAgICBnYW1lUnVsZXMuY2xhc3NMaXN0LnJlbW92ZSgncmVtb3ZlJyk7XHJcbiAgICBhYm91dEdhbWUuY2xhc3NMaXN0LmFkZCgncmVtb3ZlJyk7XHJcbn07XHJcblxyXG5jb25zdCBnYW1lU2hvdyA9ICgpID0+IHtcclxuICAgIHdlbGNvbWVTY3JlZW4uY2xhc3NMaXN0LmFkZCgncmVtb3ZlJyk7XHJcbiAgICBnYW1lLmNsYXNzTGlzdC5yZW1vdmUoJ3JlbW92ZScpO1xyXG4gICAgZ2FtZVJ1bGVzLmNsYXNzTGlzdC5hZGQoJ3JlbW92ZScpO1xyXG4gICAgYWJvdXRHYW1lLmNsYXNzTGlzdC5hZGQoJ3JlbW92ZScpO1xyXG59O1xyXG5cclxuYWJvdXRHYW1lQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYWJvdXRHYW1lU2hvdyk7XHJcbmdhbWVSdWxlc0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGdhbWVSdWxlc1Nob3cpO1xyXG5nYW1lQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZ2FtZVNob3cpO1xyXG5cclxuLy8jZW5kcmVnaW9uXHJcblxyXG5cclxuZXhwb3J0IHsgYm9vbSwgZ2FtZU92ZXIsIHdpbiwgZ2FtZVNob3cgfTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvYW5pbWF0aW9uLnRzIl0sInNvdXJjZVJvb3QiOiIifQ==