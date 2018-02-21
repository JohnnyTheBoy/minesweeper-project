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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return gameStartButton; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return gameResetButton; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return playerNameInput; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return gameOptionsSection; });
/* unused harmony export gameSection */
//#region - selectors
const gameStartButton = document.getElementById('start');
const gameResetButton = document.getElementById('reset');
const playerNameInput = document.getElementById('player-name');
const gameOptionsSection = document.getElementById('options');
const gameSection = document.getElementById('game-place');
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
        // console.log(`Custom mode set to ${this._mode.custom}`);
    }
    setGameTable(element) {
        this._gameTable = element;
        // console.log(`Table created`);
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
        // console.log(`Players name set to: ${this._name}`);
    }
    getGameMode() {
        return this._gameMode;
    }
    setGameMode(value) {
        this._gameMode = value;
    }
    setScore(value) {
        this._score = value;
        // console.log(`Score set to ${this._score}`);
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
//#region - preventTableMenu() - prevents default right click on table elements
const preventTableMenu = (event) => {
    let clickedPlace = event.target;
    if (clickedPlace.tagName === "TD" || clickedPlace.tagName === "TR" || clickedPlace.tagName === "TABLE" || clickedPlace.tagName === "IMG") {
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
//#region - manageInputs() - manage inputs on document, based on event
const manageInputs = (event) => {
    if (event.target.id === "start") {
        __WEBPACK_IMPORTED_MODULE_0__data__["f" /* playerNameInput */].setAttribute('disabled', 'true');
        __WEBPACK_IMPORTED_MODULE_1__gameMode__["b" /* gameModeInput */].setAttribute('disabled', 'true');
        __WEBPACK_IMPORTED_MODULE_0__data__["e" /* gameStartButton */].setAttribute('disabled', 'true');
        __WEBPACK_IMPORTED_MODULE_0__data__["d" /* gameResetButton */].removeAttribute('disabled');
        return "start";
    }
    else if (event.target.id === "reset") {
        __WEBPACK_IMPORTED_MODULE_0__data__["d" /* gameResetButton */].setAttribute('disabled', 'true');
        __WEBPACK_IMPORTED_MODULE_0__data__["e" /* gameStartButton */].removeAttribute('disabled');
        __WEBPACK_IMPORTED_MODULE_1__gameMode__["b" /* gameModeInput */].removeAttribute('disabled');
        __WEBPACK_IMPORTED_MODULE_1__gameMode__["b" /* gameModeInput */].value = 'beginner';
        __WEBPACK_IMPORTED_MODULE_0__data__["f" /* playerNameInput */].removeAttribute('disabled');
        Object(__WEBPACK_IMPORTED_MODULE_8__animation__["d" /* gameShow */])();
        __WEBPACK_IMPORTED_MODULE_8__animation__["b" /* gameGridSection */].innerHTML = "";
        clickCounter = 0;
        Object(__WEBPACK_IMPORTED_MODULE_6__timer__["d" /* stopTimerHandler */])();
        Object(__WEBPACK_IMPORTED_MODULE_6__timer__["b" /* resetTimer */])();
        __WEBPACK_IMPORTED_MODULE_6__timer__["e" /* timerPlace */].textContent = "00 : 00 : 00";
        return "reset";
    }
};
//#endregion
//#region - checkMove() - check result of move that player made and decides what then
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
            let bomb = Object(__WEBPACK_IMPORTED_MODULE_3__minesAndTips__["b" /* setMineIcon */])();
            element.classList.add('empty');
            Object(__WEBPACK_IMPORTED_MODULE_6__timer__["d" /* stopTimerHandler */])();
            table.removeEventListener("click", onFieldClick);
            table.removeEventListener("mousedown", flagIt);
            element.appendChild(bomb);
            Object(__WEBPACK_IMPORTED_MODULE_3__minesAndTips__["d" /* showMines */])(table, mineIcon);
            Object(__WEBPACK_IMPORTED_MODULE_8__animation__["a" /* boom */])();
            table.classList.add('table');
            Object(__WEBPACK_IMPORTED_MODULE_8__animation__["c" /* gameOver */])();
        }
    }
    else if (attribute === "") {
        Object(__WEBPACK_IMPORTED_MODULE_4__emptyFlow__["a" /* openEmptyElement */])(element);
        checkWin();
    }
    else {
        element.textContent = attribute;
        element.classList.add('clicked');
        element.setAttribute("data-click", "1");
        checkWin();
    }
};
//#endregion
//#region - flagIt() - puts flag on right click
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
                element.addEventListener("click", __WEBPACK_IMPORTED_MODULE_4__emptyFlow__["b" /* stopClick */]);
                element.appendChild(flag);
                element.classList.add('empty');
                checkWin();
            }
        }
    }
    else if (element.tagName === "IMG") {
        if (event.which === 3) {
            element.parentNode.classList.remove('empty');
            element.parentNode.addEventListener('click', onFieldClick);
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
    Object(__WEBPACK_IMPORTED_MODULE_3__minesAndTips__["c" /* setMines */])(table, gameModeInfo, mineIcon);
    Object(__WEBPACK_IMPORTED_MODULE_3__minesAndTips__["e" /* writeTips */])(table);
};
//#endregion
//#region - checkWin()
function checkWin() {
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
        Object(__WEBPACK_IMPORTED_MODULE_8__animation__["e" /* win */])();
        table.classList.add('table');
    }
}
//#endregion
//#region onFieldClick() - what to do when player clicks on field
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
    Object(__WEBPACK_IMPORTED_MODULE_3__minesAndTips__["c" /* setMines */])(table, gameModeInfo, mineIcon);
    // // //set tips
    Object(__WEBPACK_IMPORTED_MODULE_3__minesAndTips__["e" /* writeTips */])(table);
    // // //print table
    __WEBPACK_IMPORTED_MODULE_8__animation__["b" /* gameGridSection */].appendChild(table);
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
            __WEBPACK_IMPORTED_MODULE_0__data__["b" /* Player */].getInstance().setName(__WEBPACK_IMPORTED_MODULE_0__data__["f" /* playerNameInput */].value);
            Object(__WEBPACK_IMPORTED_MODULE_8__animation__["d" /* gameShow */])();
            printGrid();
            Object(__WEBPACK_IMPORTED_MODULE_7__ranking__["a" /* handleRanking */])();
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
            // console.log("Game mode: Beginner 9x9 table with 10 mines");
            __WEBPACK_IMPORTED_MODULE_0__data__["b" /* Player */].getInstance().setGameMode(mode);
            return __WEBPACK_IMPORTED_MODULE_0__data__["a" /* Game */].getInstance().modeInfo(mode);
        case "intermediate":
            // console.log("Game mode: Intermediate 16x16 table with 40 mines");
            __WEBPACK_IMPORTED_MODULE_0__data__["b" /* Player */].getInstance().setGameMode(mode);
            return __WEBPACK_IMPORTED_MODULE_0__data__["a" /* Game */].getInstance().modeInfo(mode);
        case "expert":
            // console.log("Game mode: Expert 16x30 table with 99 mines");
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
// gameModeInput.addEventListener('change', displayCustomModeOptions);//
//#endregion



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return setMines; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return clearMines; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return showMines; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return writeTips; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return setMineIcon; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__data__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tableGrid__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helperFuncs__ = __webpack_require__(2);



//==============================MINES=================================================================
//#region createMines() - create mines based on game mode
const createMines = (modeInfo) => {
    let mines = Object(__WEBPACK_IMPORTED_MODULE_2__helperFuncs__["b" /* randomNumbersArray */])(modeInfo[2], (modeInfo[0] * modeInfo[1])).sort((a, b) => { return a - b; });
    // console.log("Mines location: " + mines); // for dev purposes
    return mines;
};
//#endregion
//#region - setMines() - set mines on table
const setMines = (table, modeInfo, mineIcon) => {
    let mines = createMines(modeInfo);
    const allFields = table.getElementsByTagName("td");
    mines.forEach(mine => {
        allFields[(mine - 1)].setAttribute("data-mine", mineIcon);
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
//#region - setMineIcon() - sets mine icon based on game mode
const setMineIcon = () => {
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
    return image;
};
//#endregion
//#region - showMines() - show mines on grid
const showMines = (table, mineIcon) => {
    const allFields = table.getElementsByTagName("td");
    Array.prototype.forEach.call(allFields, (field) => {
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
const writeTips = (table) => {
    const allFields = table.getElementsByTagName("td");
    Array.prototype.forEach.call(allFields, field => {
        if (field.getAttribute("data-mine") === "") {
            let minesNum = countMines(field);
            if (minesNum === 0) {
                field.setAttribute("data-mine", "");
                field.setAttribute("data-empty", "1");
            }
            else {
                field.setAttribute("data-mine", minesNum.toString());
                field.setAttribute("data-empty", "0");
            }
        }
    });
};
//#endregion
//#region - countMines() - counts mines in surrounding
function countMines(field) {
    const gameModeInfo = __WEBPACK_IMPORTED_MODULE_0__data__["a" /* Game */].getInstance().modeInfo(__WEBPACK_IMPORTED_MODULE_0__data__["b" /* Player */].getInstance().getGameMode());
    const numOfCols = gameModeInfo[1];
    let counter = 0;
    let surrounding = Object(__WEBPACK_IMPORTED_MODULE_1__tableGrid__["b" /* defineSurrounding */])(__WEBPACK_IMPORTED_MODULE_0__data__["a" /* Game */].getInstance().getGameTable(), field);
    surrounding.forEach(surField => {
        if (surField === null) { }
        else if (surField.getAttribute("data-mine") === "\uD83D\uDCA3") {
            counter++;
        }
    });
    return counter;
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
const stopClick = (event) => {
    event.stopPropagation();
};
//#endregion
//=====================EMPTY FLOW=========================================
//#region - openEmptyElement() - flow function
let openEmptyElement = (element) => {
    let emptyFields = firstEmptyFieldCheck(element);
    let stopSearch = false;
    while (stopSearch == false) {
        if (emptyFields.length != 0) {
            let newMainArray = [];
            emptyFields.forEach(field => {
                emptyCell(field);
                let subArray = Object(__WEBPACK_IMPORTED_MODULE_1__tableGrid__["b" /* defineSurrounding */])(__WEBPACK_IMPORTED_MODULE_0__data__["a" /* Game */].getInstance().getGameTable(), field);
                subArray.forEach((element) => {
                    if (element !== null) {
                        element.setAttribute("data-click", "1");
                        element.addEventListener("click", stopClick);
                        element.addEventListener("mousedown", stopClick);
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
        element.setAttribute("data-empty", "");
        element.classList.add("empty");
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
//#region - firstEmptyFieldCheck() - first clicked empty element check, returns array of empty blank elements
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
let stringInterval = 0; // saving interval num for string print
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
const rankingGameMode = document.getElementById('game-mode-name');
const scoreList = document.getElementById('score-list');
//#endregion
//#region - rankingTable definition
let rankingTable = {
    beginner: [['John', 25], ['Marry', 26], ['Tim', 29], ['Alex', 35], ['Olivia', 40]],
    intermediate: [['Sam', 44], ['Emily', 46], ['Jim', 50], ['Charlotte', 53], ['Willy', 55]],
    expert: [['Maria', 58], ['Kit', 66], ['Tony', 70], ['Zoey', 75], ["Natalie", 80]]
};
//#endregion
//#region - presetStorage() - checks if there's database in localstorage if not creates one, otherwise loads it.
const presetStorage = () => {
    if (localStorage.getItem('rankingTable') === null) {
        localStorage.setItem('rankingTable', JSON.stringify(rankingTable));
        // console.log(`database fetched from localstorage`, localStorage.getItem('rankingTable'));// for dev purpose
    }
};
//#endregion
presetStorage();
//#region - saveData() - saves data
const saveData = () => {
    let storageData = JSON.parse(localStorage.getItem('rankingTable'));
    let gameMode = __WEBPACK_IMPORTED_MODULE_0__data__["b" /* Player */].getInstance().getGameMode();
    let currentModeTable = storageData[gameMode];
    currentModeTable = scoreValidation(currentModeTable);
    currentModeTable.sort((a, b) => { return a[1] - b[1]; });
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
    const playerScore = [__WEBPACK_IMPORTED_MODULE_0__data__["b" /* Player */].getInstance().getName(), __WEBPACK_IMPORTED_MODULE_0__data__["b" /* Player */].getInstance().getScore()];
    if (playerScore[1] !== 0 && playerScore[1] !== undefined) {
        newTable.push(playerScore);
    }
    return newTable;
};
//#endregion
//#region - writeData() - prints out ranking table
let printData = () => {
    let table = rankingTable[__WEBPACK_IMPORTED_MODULE_0__data__["b" /* Player */].getInstance().getGameMode()];
    rankingGameMode.textContent = __WEBPACK_IMPORTED_MODULE_0__data__["b" /* Player */].getInstance().getGameMode() + ' mode';
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return gameOver; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return win; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return gameShow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return gameGridSection; });
//#region - DOM selectors
const aboutGameButton = document.getElementById('about-game-button');
const gameButton = document.getElementById('game-button');
const gameRulesButton = document.getElementById('game-rules-button');
const welcomeScreen = document.getElementById('welcome-screen');
const gameRules = document.getElementById('game-rules');
const aboutGame = document.getElementById('about-game');
const gameGridSection = document.getElementById('game');
const body = document.getElementById("body");
//#endregion
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
    gameGridSection.appendChild(image);
};
const win = () => {
    let image = document.createElement('img');
    image.setAttribute('src', './images/win.png');
    image.classList.add('win');
    gameGridSection.appendChild(image);
};
//#region - header nav
const aboutGameShow = () => {
    welcomeScreen.classList.add('remove');
    gameGridSection.classList.add('remove');
    gameRules.classList.add('remove');
    aboutGame.classList.remove('remove');
};
const gameRulesShow = () => {
    welcomeScreen.classList.add('remove');
    gameGridSection.classList.add('remove');
    gameRules.classList.remove('remove');
    aboutGame.classList.add('remove');
};
const gameShow = () => {
    welcomeScreen.classList.add('remove');
    gameGridSection.classList.remove('remove');
    gameRules.classList.add('remove');
    aboutGame.classList.add('remove');
};
aboutGameButton.addEventListener('click', aboutGameShow);
gameRulesButton.addEventListener('click', gameRulesShow);
gameButton.addEventListener('click', gameShow);
//#endregion



/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZTg2NDA2ZjllN2EyYWZkNTE0N2UiLCJ3ZWJwYWNrOi8vLy4vYXBwL2RhdGEudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3RhYmxlR3JpZC50cyIsIndlYnBhY2s6Ly8vLi9hcHAvaGVscGVyRnVuY3MudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2FwcC50cyIsIndlYnBhY2s6Ly8vLi9hcHAvZ2FtZU1vZGUudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwL21pbmVzQW5kVGlwcy50cyIsIndlYnBhY2s6Ly8vLi9hcHAvZW1wdHlGbG93LnRzIiwid2VicGFjazovLy8uL2FwcC90aW1lci50cyIsIndlYnBhY2s6Ly8vLi9hcHAvcmFua2luZy50cyIsIndlYnBhY2s6Ly8vLi9hcHAvYW5pbWF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUM3REE7QUFBQSxxQkFBcUI7QUFDckIsTUFBTSxlQUFlLEdBQXNCLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDNUUsTUFBTSxlQUFlLEdBQXNCLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDNUUsTUFBTSxlQUFlLEdBQXFCLFFBQVEsQ0FBQyxjQUFj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QU8sRUFBRSxhQUFhLENBQUMsQ0FBQztBQUN6RCxlQUFlLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0FBQ3pELFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFFL0MsWUFBWTtBQUc4QyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAzKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBlODY0MDZmOWU3YTJhZmQ1MTQ3ZSIsIi8vI3JlZ2lvbiAtIHNlbGVjdG9yc1xyXG5jb25zdCBnYW1lU3RhcnRCdXR0b24gPSA8SFRNTEJ1dHRvbkVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXJ0Jyk7XHJcbmNvbnN0IGdhbWVSZXNldEJ1dHRvbiA9IDxIVE1MQnV0dG9uRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzZXQnKTtcclxuY29uc3QgcGxheWVyTmFtZUlucHV0ID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXllci1uYW1lJyk7XHJcbmNvbnN0IGdhbWVPcHRpb25zU2VjdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvcHRpb25zJyk7XHJcbmNvbnN0IGdhbWVTZWN0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWUtcGxhY2UnKTtcclxuXHJcbi8vI2VuZHJlZ2lvblxyXG5cclxucGxheWVyTmFtZUlucHV0LnZhbHVlID0gXCJcIjtcclxuXHJcblxyXG4vLyNyZWdpb24gLSBHYW1lIHNpbmdsZXRvbiBjbGFzcyBkZWZpbml0aW9uXHJcblxyXG5jbGFzcyBHYW1lIHtcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBfaW5zdGFuY2U6IEdhbWUgPSBuZXcgR2FtZSgpO1xyXG5cclxuICAgIHByaXZhdGUgX21vZGUgPSB7XHJcbiAgICAgICAgYmVnaW5uZXI6IFs5LCA5LCAxMF0sXHJcbiAgICAgICAgaW50ZXJtZWRpYXRlOiBbMTYsIDE2LCA0MF0sXHJcbiAgICAgICAgZXhwZXJ0OiBbMTYsIDMwLCA5OV0sXHJcbiAgICAgICAgY3VzdG9tOiBbMCwgMCwgMF1cclxuICAgIH07XHJcblxyXG4gICAgcHJpdmF0ZSBfZ2FtZVRhYmxlOiBIVE1MVGFibGVFbGVtZW50O1xyXG5cclxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBHYW1lIHtcclxuICAgICAgICByZXR1cm4gR2FtZS5faW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG1vZGVJbmZvKG1vZGVOYW1lOiBzdHJpbmcpOiBudW1iZXJbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21vZGVbbW9kZU5hbWVdO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRDdXN0b21Nb2RlKGluZm86IG51bWJlcltdKSB7XHJcbiAgICAgICAgdGhpcy5fbW9kZS5jdXN0b20gPSBpbmZvO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGBDdXN0b20gbW9kZSBzZXQgdG8gJHt0aGlzLl9tb2RlLmN1c3RvbX1gKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0R2FtZVRhYmxlKGVsZW1lbnQpIHtcclxuICAgICAgICB0aGlzLl9nYW1lVGFibGUgPSBlbGVtZW50O1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGBUYWJsZSBjcmVhdGVkYCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEdhbWVUYWJsZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZ2FtZVRhYmxlO1xyXG4gICAgfVxyXG59XHJcblxyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vI3JlZ2lvbiAtIFBsYXllciAtIHNpbmdsZXRvbiBjbGFzcyBkZWZpbml0aW9uXHJcbmNsYXNzIFBsYXllciB7XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgX2luc3RhbmNlOiBQbGF5ZXIgPSBuZXcgUGxheWVyKCk7XHJcblxyXG4gICAgcHJpdmF0ZSBfbmFtZTogc3RyaW5nID0gXCJcIjtcclxuICAgIHByaXZhdGUgX2dhbWVNb2RlOiBzdHJpbmcgPSBcIm5vbmVcIjtcclxuICAgIHByaXZhdGUgX3Njb3JlOiBudW1iZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IFBsYXllciB7XHJcbiAgICAgICAgcmV0dXJuIFBsYXllci5faW5zdGFuY2U7XHJcbiAgICB9XHJcbiAgICBnZXROYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX25hbWU7XHJcbiAgICB9XHJcbiAgICBzZXROYW1lKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAodmFsdWUgPT09ICcnKSB7IHZhbHVlID0gJ3Vua25vd24gcGxheWVyJyB9XHJcbiAgICAgICAgdGhpcy5fbmFtZSA9IHZhbHVlO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGBQbGF5ZXJzIG5hbWUgc2V0IHRvOiAke3RoaXMuX25hbWV9YCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0R2FtZU1vZGUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZ2FtZU1vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0R2FtZU1vZGUodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2dhbWVNb2RlID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0U2NvcmUodmFsdWUpIHtcclxuICAgICAgICB0aGlzLl9zY29yZSA9IHZhbHVlO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGBTY29yZSBzZXQgdG8gJHt0aGlzLl9zY29yZX1gKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTY29yZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2NvcmU7XHJcbiAgICB9XHJcbn1cclxuLy8jZW5kcmVnaW9uXHJcblxyXG5leHBvcnQgeyBHYW1lLCBQbGF5ZXIsIGdhbWVTdGFydEJ1dHRvbiwgZ2FtZVJlc2V0QnV0dG9uLCBwbGF5ZXJOYW1lSW5wdXQsIGdhbWVPcHRpb25zU2VjdGlvbiwgZ2FtZVNlY3Rpb259O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9kYXRhLnRzIiwiaW1wb3J0IHsgR2FtZSwgUGxheWVyIH0gZnJvbSAnLi9kYXRhJztcclxuXHJcbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09VEFCTEUgR1JJRD09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuLy8jcmVnaW9uIC0gY3JlYXRlcyB0YWJsZSBncmlkIGZvciBnaXZlbiBnYW1lIG1vZGVcclxuY29uc3QgY3JlYXRlR3JpZCA9IChyb3dzQW5kQ29sczogbnVtYmVyW10pOiB2b2lkID0+IHtcclxuICAgIGxldCB0YWJsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RhYmxlJyk7XHJcbiAgICBsZXQgY2VsbENvdW50ZXIgPSAxO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByb3dzQW5kQ29sc1swXTsgaSsrKSB7XHJcbiAgICAgICAgbGV0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJyk7XHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCByb3dzQW5kQ29sc1sxXTsgaisrKSB7XHJcbiAgICAgICAgICAgIGxldCBjb2wgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpO1xyXG4gICAgICAgICAgICBjb2wuc2V0QXR0cmlidXRlKFwiaWRcIiwgY2VsbENvdW50ZXIgKyAnZmllbGQnKTtcclxuICAgICAgICAgICAgY29sLnNldEF0dHJpYnV0ZShcImRhdGEtaWRcIiwgY2VsbENvdW50ZXIgKyAnZmllbGQnKTtcclxuICAgICAgICAgICAgY29sLnNldEF0dHJpYnV0ZShcImRhdGEtbWluZVwiLCBcIlwiKTtcclxuICAgICAgICAgICAgY29sLnNldEF0dHJpYnV0ZShcImRhdGEtZW1wdHlcIiwgXCJcIik7XHJcbiAgICAgICAgICAgIGNvbC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWNsaWNrXCIsIFwiXCIpO1xyXG4gICAgICAgICAgICBjZWxsQ291bnRlcisrO1xyXG4gICAgICAgICAgICByb3cuYXBwZW5kQ2hpbGQoY29sKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGFibGUuYXBwZW5kQ2hpbGQocm93KTtcclxuICAgIH1cclxuICAgIEdhbWUuZ2V0SW5zdGFuY2UoKS5zZXRHYW1lVGFibGUodGFibGUpO1xyXG59O1xyXG4vLyNlbmRyZWdpb25cclxuXHJcblxyXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PUJPUkRFUlM9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbi8vI3JlZ2lvbiAtIGNyZWF0ZXMgbGVmdCBib3JkZXIgZm9yIHRhYmxlIGdyaWRcclxuY29uc3QgY3JlYXRlTGVmdEJvcmRlciA9IChudW1PZlJvd3M6IG51bWJlciwgbnVtT2ZDb2xzOiBudW1iZXIpID0+IHtcclxuICAgIGxldCBsZWZ0Qm9yZGVyRmllbGRzOiBudW1iZXJbXSA9IFsxXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtT2ZSb3dzIC0gMTsgaSsrKSB7XHJcbiAgICAgICAgbGV0IGJvcmRlckZpZWxkID0gbGVmdEJvcmRlckZpZWxkc1tpXSArIG51bU9mQ29scztcclxuICAgICAgICBsZWZ0Qm9yZGVyRmllbGRzLnB1c2goYm9yZGVyRmllbGQpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGxlZnRCb3JkZXJGaWVsZHM7XHJcbn1cclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLyNyZWdpb24gLSBjcmVhdGVzIHJpZ2h0IGJvcmRlciBmb3IgdGFibGUgZ3JpZFxyXG5jb25zdCBjcmVhdGVSaWdodEJvcmRlciA9IChudW1PZlJvd3M6IG51bWJlciwgbnVtT2ZDb2xzOiBudW1iZXIpID0+IHtcclxuICAgIGxldCByaWdodEJvcmRlckZpZWxkczogbnVtYmVyW10gPSBbbnVtT2ZDb2xzXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtT2ZSb3dzIC0gMTsgaSsrKSB7XHJcbiAgICAgICAgbGV0IGJvcmRlckZpZWxkID0gcmlnaHRCb3JkZXJGaWVsZHNbaV0gKyBudW1PZkNvbHM7XHJcbiAgICAgICAgcmlnaHRCb3JkZXJGaWVsZHMucHVzaChib3JkZXJGaWVsZCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmlnaHRCb3JkZXJGaWVsZHM7XHJcbn1cclxuLy8jZW5kcmVnaW9uXHJcblxyXG5cclxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1TVVJST1VORElORz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4vLyNyZWdpb24gLSBkZWZpbmVTdXJyb3VuZGluZygpIC0gY3JlYXRlcyBzdXJyb3VuZGluZyBiYXNlZCBvbiBmaWVsZCBwb3NpdGlvbiAoYmFzZWQgb24gaWQpXHJcblxyXG5jb25zdCBkZWZpbmVTdXJyb3VuZGluZyA9ICh0YWJsZTogRWxlbWVudCwgZWxlbWVudDogSFRNTEVsZW1lbnQpID0+IHsgLy8gZGVmaW5pc2VtbyBva29sbmEgcG9samEgbmEgb3Nub3Z1IGRhdG9nIHBvbGphIGkgYnJvamEga29sb25hIHRhYmVsZVxyXG4gICAgbGV0IHN1cnJvdW5kaW5nO1xyXG4gICAgY29uc3QgaWQgPSBwYXJzZUludChlbGVtZW50LmlkKTtcclxuICAgIGNvbnN0IGdhbWVNb2RlSW5mbyA9IEdhbWUuZ2V0SW5zdGFuY2UoKS5tb2RlSW5mbyhQbGF5ZXIuZ2V0SW5zdGFuY2UoKS5nZXRHYW1lTW9kZSgpKTtcclxuICAgIGNvbnN0IG51bU9mUm93cyA9IGdhbWVNb2RlSW5mb1swXTtcclxuICAgIGNvbnN0IG51bU9mQ29scyA9IGdhbWVNb2RlSW5mb1sxXTtcclxuXHJcbiAgICAvL2Jhc2Ugc3Vycm91bmRpbmdcclxuICAgIGNvbnN0IGxlZnQgPSB0YWJsZS5xdWVyeVNlbGVjdG9yKGBbaWQ9XCIke2lkIC0gMX1maWVsZFwiXWApO1xyXG4gICAgY29uc3QgdXBMZWZ0ID0gdGFibGUucXVlcnlTZWxlY3RvcihgW2lkPVwiJHtpZCAtIG51bU9mQ29scyAtIDF9ZmllbGRcIl1gKTtcclxuICAgIGNvbnN0IHVwID0gdGFibGUucXVlcnlTZWxlY3RvcihgW2lkPVwiJHtpZCAtIG51bU9mQ29sc31maWVsZFwiXWApO1xyXG4gICAgY29uc3QgdXBSaWdodCA9IHRhYmxlLnF1ZXJ5U2VsZWN0b3IoYFtpZD1cIiR7aWQgLSBudW1PZkNvbHMgKyAxfWZpZWxkXCJdYCk7XHJcbiAgICBjb25zdCByaWdodCA9IHRhYmxlLnF1ZXJ5U2VsZWN0b3IoYFtpZD1cIiR7aWQgKyAxfWZpZWxkXCJdYCk7XHJcbiAgICBjb25zdCByaWdodERvd24gPSB0YWJsZS5xdWVyeVNlbGVjdG9yKGBbaWQ9XCIke2lkICsgbnVtT2ZDb2xzICsgMX1maWVsZFwiXWApO1xyXG4gICAgY29uc3QgZG93biA9IHRhYmxlLnF1ZXJ5U2VsZWN0b3IoYFtpZD1cIiR7aWQgKyBudW1PZkNvbHN9ZmllbGRcIl1gKTtcclxuICAgIGNvbnN0IGRvd25MZWZ0ID0gdGFibGUucXVlcnlTZWxlY3RvcihgW2lkPVwiJHtpZCArIG51bU9mQ29scyAtIDF9ZmllbGRcIl1gKTtcclxuXHJcbiAgICAvL2NyZWF0ZSBib3JkZXJzXHJcbiAgICBjb25zdCBsZWZ0Qm9yZGVyID0gY3JlYXRlTGVmdEJvcmRlcihudW1PZlJvd3MsIG51bU9mQ29scyk7XHJcbiAgICBjb25zdCByaWdodEJvcmRlciA9IGNyZWF0ZVJpZ2h0Qm9yZGVyKG51bU9mUm93cywgbnVtT2ZDb2xzKTtcclxuXHJcbiAgICAvL3N1cnJvdW5kaW5nIGJhc2VkIG9uIGZpZWxkLWJvcmRlcnMgcmVsYXRpb25cclxuICAgIGlmIChsZWZ0Qm9yZGVyLmluZGV4T2YoaWQpICE9PSAtMSkge1xyXG4gICAgICAgIHN1cnJvdW5kaW5nID0gW3VwLCB1cFJpZ2h0LCByaWdodCwgcmlnaHREb3duLCBkb3duXTtcclxuICAgIH0gZWxzZSBpZiAocmlnaHRCb3JkZXIuaW5kZXhPZihpZCkgIT09IC0xKSB7XHJcbiAgICAgICAgc3Vycm91bmRpbmcgPSBbbGVmdCwgdXBMZWZ0LCB1cCwgZG93biwgZG93bkxlZnRdO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBzdXJyb3VuZGluZyA9IFtsZWZ0LCB1cExlZnQsIHVwLCB1cFJpZ2h0LCByaWdodCwgcmlnaHREb3duLCBkb3duLCBkb3duTGVmdF07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3Vycm91bmRpbmc7XHJcbn1cclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcblxyXG5leHBvcnQgeyBjcmVhdGVHcmlkLGRlZmluZVN1cnJvdW5kaW5nfTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvdGFibGVHcmlkLnRzIiwiLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1SQU5ET00gRlVOQ1RJT05TPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4vLyNyZWdpb24gIC0gQ3JlYXRlcyByYW5kb20gbnVtYmVyIGZvciBwYXNzZWQgbWluIGFuZCBtYXhcclxuY29uc3QgcmFuZG9tTnVtYmVyID0gKG1heE51bTogbnVtYmVyLCBtaW5OdW06IG51bWJlciA9IDEpOiBudW1iZXIgPT4ge1xyXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXhOdW0gLSBtaW5OdW0gKyAxKSArIG1pbk51bSk7XHJcbn07XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uICAtIGFycmF5IHdpdGggc3BlY2lmaWVkIG51bWJlciBvZiByYW5kb20gbnVtYmVyc1xyXG5jb25zdCByYW5kb21OdW1iZXJzQXJyYXkgPSAoYXJyTGVuZ3RoOiBudW1iZXIsIG1heE51bTogbnVtYmVyLCBtaW5OdW06IG51bWJlciA9IDEpOiBudW1iZXJbXSA9PiB7XHJcbiAgICBsZXQgYXJyYXk6IG51bWJlcltdID0gW107XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyckxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IG5ld051bSA9IHJhbmRvbU51bWJlcihtYXhOdW0sIG1pbk51bSk7XHJcbiAgICAgICAgd2hpbGUgKGFycmF5LmluZGV4T2YobmV3TnVtKSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgbmV3TnVtID0gcmFuZG9tTnVtYmVyKG1pbk51bSwgbWF4TnVtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYXJyYXkucHVzaChuZXdOdW0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFycmF5O1xyXG59XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4vLyNyZWdpb24gLSBwcmV2ZW50VGFibGVNZW51KCkgLSBwcmV2ZW50cyBkZWZhdWx0IHJpZ2h0IGNsaWNrIG9uIHRhYmxlIGVsZW1lbnRzXHJcbmNvbnN0IHByZXZlbnRUYWJsZU1lbnUgPSAoZXZlbnQpOnZvaWQgPT4ge1xyXG4gICAgbGV0IGNsaWNrZWRQbGFjZSA9IGV2ZW50LnRhcmdldDtcclxuICAgIGlmIChjbGlja2VkUGxhY2UudGFnTmFtZSA9PT0gXCJURFwiIHx8IGNsaWNrZWRQbGFjZS50YWdOYW1lID09PSBcIlRSXCIgfHwgY2xpY2tlZFBsYWNlLnRhZ05hbWUgPT09IFwiVEFCTEVcIiB8fCBjbGlja2VkUGxhY2UudGFnTmFtZSA9PT0gXCJJTUdcIikge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9XHJcbn1cclxuLy8jZW5kcmVnaW9uXHJcblxyXG5leHBvcnQgeyByYW5kb21OdW1iZXJzQXJyYXksIHByZXZlbnRUYWJsZU1lbnUgfTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvaGVscGVyRnVuY3MudHMiLCJpbXBvcnQgeyBHYW1lLCBQbGF5ZXIsIGdhbWVPcHRpb25zU2VjdGlvbiwgZ2FtZVN0YXJ0QnV0dG9uLCBnYW1lUmVzZXRCdXR0b24sIGdhbWVTZWN0aW9uLCBwbGF5ZXJOYW1lSW5wdXQgfSBmcm9tICcuL2RhdGEnO1xyXG5pbXBvcnQgeyBnYW1lTW9kZSwgZ2FtZU1vZGVJbnB1dCB9IGZyb20gJy4vZ2FtZU1vZGUnO1xyXG5pbXBvcnQgeyBjcmVhdGVHcmlkIH0gZnJvbSAnLi90YWJsZUdyaWQnO1xyXG5pbXBvcnQgeyBzZXRNaW5lcywgY2xlYXJNaW5lcywgc2hvd01pbmVzLCB3cml0ZVRpcHMsIHNldE1pbmVJY29uIH0gZnJvbSAnLi9taW5lc0FuZFRpcHMnO1xyXG5pbXBvcnQgeyBvcGVuRW1wdHlFbGVtZW50LCBzdG9wQ2xpY2sgfSBmcm9tICcuL2VtcHR5Rmxvdyc7XHJcbmltcG9ydCB7IHByZXZlbnRUYWJsZU1lbnUgfSBmcm9tICcuL2hlbHBlckZ1bmNzJztcclxuaW1wb3J0IHsgc3RhcnRUaW1lckhhbmRsZXIsIHN0b3BUaW1lckhhbmRsZXIsIHJlc2V0VGltZXIsIHRpbWVyUGxhY2UsIGNhbGNTY29yZSB9IGZyb20gJy4vdGltZXInO1xyXG5pbXBvcnQgeyBoYW5kbGVSYW5raW5nIH0gZnJvbSAnLi9yYW5raW5nJztcclxuaW1wb3J0IHsgYm9vbSwgZ2FtZU92ZXIsIHdpbiwgZ2FtZVNob3csIGdhbWVHcmlkU2VjdGlvbiB9IGZyb20gJy4vYW5pbWF0aW9uJztcclxuXHJcblxyXG5jb25zdCBtaW5lSWNvbiA9IFwiXFx1RDgzRFxcdURDQTNcIjsgLy8gZGVmaW5pc2VtbyBpa29uaWN1IHphIG1pbnUgdSBuZWtvbSBtb21lbnR1XHJcbmxldCBjbGlja0NvdW50ZXIgPSAwOyAvLyBmb2xsb3dzIGNsaWNrc1xyXG5cclxuLy8jcmVnaW9uIC0gbWFuYWdlSW5wdXRzKCkgLSBtYW5hZ2UgaW5wdXRzIG9uIGRvY3VtZW50LCBiYXNlZCBvbiBldmVudFxyXG5jb25zdCBtYW5hZ2VJbnB1dHMgPSAoZXZlbnQpOiBzdHJpbmcgPT4ge1xyXG4gICAgaWYgKGV2ZW50LnRhcmdldC5pZCA9PT0gXCJzdGFydFwiKSB7XHJcblxyXG4gICAgICAgIHBsYXllck5hbWVJbnB1dC5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ3RydWUnKTtcclxuICAgICAgICBnYW1lTW9kZUlucHV0LnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAndHJ1ZScpO1xyXG4gICAgICAgIGdhbWVTdGFydEJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ3RydWUnKTtcclxuICAgICAgICBnYW1lUmVzZXRCdXR0b24ucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xyXG4gICAgICAgIHJldHVybiBcInN0YXJ0XCI7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChldmVudC50YXJnZXQuaWQgPT09IFwicmVzZXRcIikge1xyXG4gICAgICAgIGdhbWVSZXNldEJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ3RydWUnKTtcclxuICAgICAgICBnYW1lU3RhcnRCdXR0b24ucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xyXG4gICAgICAgIGdhbWVNb2RlSW5wdXQucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xyXG4gICAgICAgIGdhbWVNb2RlSW5wdXQudmFsdWUgPSAnYmVnaW5uZXInO1xyXG4gICAgICAgIHBsYXllck5hbWVJbnB1dC5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XHJcbiAgICAgICAgZ2FtZVNob3coKTtcclxuICAgICAgICBnYW1lR3JpZFNlY3Rpb24uaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICBjbGlja0NvdW50ZXIgPSAwO1xyXG4gICAgICAgIHN0b3BUaW1lckhhbmRsZXIoKTtcclxuICAgICAgICByZXNldFRpbWVyKCk7XHJcbiAgICAgICAgdGltZXJQbGFjZS50ZXh0Q29udGVudCA9IFwiMDAgOiAwMCA6IDAwXCI7XHJcbiAgICAgICAgcmV0dXJuIFwicmVzZXRcIjtcclxuICAgIH1cclxufTtcclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLyNyZWdpb24gLSBjaGVja01vdmUoKSAtIGNoZWNrIHJlc3VsdCBvZiBtb3ZlIHRoYXQgcGxheWVyIG1hZGUgYW5kIGRlY2lkZXMgd2hhdCB0aGVuXHJcbmNvbnN0IGNoZWNrTW92ZSA9IChlbGVtZW50OiBIVE1MRWxlbWVudCkgPT4ge1xyXG4gICAgY29uc3QgdGFibGUgPSBHYW1lLmdldEluc3RhbmNlKCkuZ2V0R2FtZVRhYmxlKCk7XHJcbiAgICBjb25zdCBhdHRyaWJ1dGUgPSBlbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtbWluZVwiKTtcclxuICAgIGlmIChhdHRyaWJ1dGUgPT09IFwiXFx1RDgzRFxcdURDQTNcIikge1xyXG4gICAgICAgIGlmIChjbGlja0NvdW50ZXIgPT09IDEpIHtcclxuICAgICAgICAgICAgcGxhbnRNaW5lc0FnYWluKCk7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG9uRmllbGRDbGljayk7XHJcbiAgICAgICAgICAgIGNoZWNrTW92ZShlbGVtZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBib21iID0gc2V0TWluZUljb24oKTtcclxuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdlbXB0eScpO1xyXG4gICAgICAgICAgICBzdG9wVGltZXJIYW5kbGVyKCk7XHJcbiAgICAgICAgICAgIHRhYmxlLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBvbkZpZWxkQ2xpY2spO1xyXG4gICAgICAgICAgICB0YWJsZS5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGZsYWdJdCk7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoYm9tYik7XHJcbiAgICAgICAgICAgIHNob3dNaW5lcyh0YWJsZSwgbWluZUljb24pO1xyXG4gICAgICAgICAgICBib29tKCk7XHJcbiAgICAgICAgICAgIHRhYmxlLmNsYXNzTGlzdC5hZGQoJ3RhYmxlJyk7XHJcbiAgICAgICAgICAgIGdhbWVPdmVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoYXR0cmlidXRlID09PSBcIlwiKSB7XHJcbiAgICAgICAgb3BlbkVtcHR5RWxlbWVudCg8YW55PmVsZW1lbnQpO1xyXG4gICAgICAgIGNoZWNrV2luKCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBlbGVtZW50LnRleHRDb250ZW50ID0gYXR0cmlidXRlO1xyXG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnY2xpY2tlZCcpO1xyXG4gICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKFwiZGF0YS1jbGlja1wiLCBcIjFcIik7XHJcbiAgICAgICAgY2hlY2tXaW4oKTtcclxuICAgIH1cclxufVxyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vI3JlZ2lvbiAtIGZsYWdJdCgpIC0gcHV0cyBmbGFnIG9uIHJpZ2h0IGNsaWNrXHJcbmNvbnN0IGZsYWdJdCA9IChldmVudDogYW55KSA9PiB7XHJcbiAgICBsZXQgZWxlbWVudCA9IGV2ZW50LnRhcmdldDtcclxuICAgIGlmIChlbGVtZW50LnRhZ05hbWUgPT09IFwiVERcIikge1xyXG4gICAgICAgIGlmIChldmVudC53aGljaCA9PT0gMykge1xyXG4gICAgICAgICAgICBsZXQgZmxhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG4gICAgICAgICAgICBpZiAoUGxheWVyLmdldEluc3RhbmNlKCkuZ2V0R2FtZU1vZGUoKSA9PT0gJ2JlZ2lubmVyJykge1xyXG4gICAgICAgICAgICAgICAgZmxhZy5zZXRBdHRyaWJ1dGUoJ3NyYycsICcuL2ltYWdlcy9mbGFnQi5wbmcnKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChQbGF5ZXIuZ2V0SW5zdGFuY2UoKS5nZXRHYW1lTW9kZSgpID09PSAnaW50ZXJtZWRpYXRlJykge1xyXG4gICAgICAgICAgICAgICAgZmxhZy5zZXRBdHRyaWJ1dGUoJ3NyYycsICcuL2ltYWdlcy9mbGFnSS5wbmcnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHsgZmxhZy5zZXRBdHRyaWJ1dGUoJ3NyYycsICcuL2ltYWdlcy9mbGFnRS5wbmcnKTsgfVxyXG4gICAgICAgICAgICBmbGFnLmNsYXNzTGlzdC5hZGQoJ2ZsYWcnKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50LmlubmVySFRNTCA9PT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc3RvcENsaWNrKTtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoZmxhZyk7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2VtcHR5Jyk7XHJcbiAgICAgICAgICAgICAgICBjaGVja1dpbigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChlbGVtZW50LnRhZ05hbWUgPT09IFwiSU1HXCIpIHtcclxuICAgICAgICBpZiAoZXZlbnQud2hpY2ggPT09IDMpIHtcclxuICAgICAgICAgICAgZWxlbWVudC5wYXJlbnROb2RlLmNsYXNzTGlzdC5yZW1vdmUoJ2VtcHR5Jyk7XHJcbiAgICAgICAgICAgIGVsZW1lbnQucGFyZW50Tm9kZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uRmllbGRDbGljayk7XHJcbiAgICAgICAgICAgIGVsZW1lbnQucGFyZW50Tm9kZS5pbm5lckhUTUwgPSBcIlwiO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uIC0gcGxhbnRNaW5lc0FnYWluKClcclxubGV0IHBsYW50TWluZXNBZ2FpbiA9ICgpID0+IHtcclxuICAgIGNvbnN0IHRhYmxlID0gR2FtZS5nZXRJbnN0YW5jZSgpLmdldEdhbWVUYWJsZSgpO1xyXG4gICAgbGV0IGdhbWVNb2RlSW5mbyA9IGdhbWVNb2RlKGdhbWVNb2RlSW5wdXQudmFsdWUpIGFzIG51bWJlcltdO1xyXG4gICAgY2xlYXJNaW5lcyh0YWJsZSk7XHJcbiAgICBzZXRNaW5lcyh0YWJsZSwgZ2FtZU1vZGVJbmZvLCBtaW5lSWNvbik7XHJcbiAgICB3cml0ZVRpcHModGFibGUpO1xyXG59O1xyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vI3JlZ2lvbiAtIGNoZWNrV2luKClcclxuZnVuY3Rpb24gY2hlY2tXaW4oKSB7XHJcbiAgICBjb25zdCB0YWJsZSA9IEdhbWUuZ2V0SW5zdGFuY2UoKS5nZXRHYW1lVGFibGUoKTtcclxuICAgIGxldCBnYW1lTW9kZUluZm8gPSBnYW1lTW9kZShnYW1lTW9kZUlucHV0LnZhbHVlKSBhcyBudW1iZXJbXTtcclxuICAgIGxldCBjbG9zZWQ6IGFueSA9IFtdO1xyXG4gICAgbGV0IGFsbEZpZWxkcyA9IHRhYmxlLnF1ZXJ5U2VsZWN0b3JBbGwoXCJ0ZFwiKTtcclxuICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoYWxsRmllbGRzLCAoZmllbGQ6IGFueSkgPT4ge1xyXG4gICAgICAgIGlmIChmaWVsZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNsaWNrXCIsIFwiMVwiKSkge1xyXG4gICAgICAgICAgICBjbG9zZWQucHVzaChmaWVsZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKChjbG9zZWQubGVuZ3RoID09PSAoKGdhbWVNb2RlSW5mb1swXSAqIGdhbWVNb2RlSW5mb1sxXSkgLSBnYW1lTW9kZUluZm9bMl0pKSkge1xyXG4gICAgICAgIHN0b3BUaW1lckhhbmRsZXIoKTtcclxuICAgICAgICBQbGF5ZXIuZ2V0SW5zdGFuY2UoKS5zZXRTY29yZShjYWxjU2NvcmUoKSk7XHJcbiAgICAgICAgdGFibGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG9uRmllbGRDbGljayk7XHJcbiAgICAgICAgdGFibGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBmbGFnSXQpO1xyXG4gICAgICAgIGhhbmRsZVJhbmtpbmcoKTtcclxuICAgICAgICB3aW4oKTtcclxuICAgICAgICB0YWJsZS5jbGFzc0xpc3QuYWRkKCd0YWJsZScpO1xyXG4gICAgfVxyXG59XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uIG9uRmllbGRDbGljaygpIC0gd2hhdCB0byBkbyB3aGVuIHBsYXllciBjbGlja3Mgb24gZmllbGRcclxuY29uc3Qgb25GaWVsZENsaWNrID0gKGV2ZW50OiBhbnkpID0+IHtcclxuICAgIGxldCBmaWVsZCA9IGV2ZW50LnRhcmdldDtcclxuICAgIGlmIChmaWVsZC50YWdOYW1lID09PSBcIlREXCIpIHtcclxuICAgICAgICBmaWVsZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc3RvcENsaWNrKTtcclxuICAgICAgICBmaWVsZC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHN0b3BDbGljayk7XHJcbiAgICAgICAgY2xpY2tDb3VudGVyKys7XHJcbiAgICAgICAgaWYgKGNsaWNrQ291bnRlciA9PT0gMSkgeyBzdGFydFRpbWVySGFuZGxlcigpIH07XHJcbiAgICAgICAgY2hlY2tNb3ZlKGZpZWxkKTtcclxuICAgIH1cclxufTtcclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLyNyZWdpb24gLSBwcmludEdyaWQoKSAtIGNyZWF0ZXMgZnVsbCBHcmlkIGFuZCBhZGRzIGl0IHRvIHRoZSBkb2N1bWVudFxyXG5jb25zdCBwcmludEdyaWQgPSAoKTogdm9pZCA9PiB7XHJcbiAgICBsZXQgZ2FtZU1vZGVJbmZvID0gZ2FtZU1vZGUoZ2FtZU1vZGVJbnB1dC52YWx1ZSkgYXMgbnVtYmVyW107XHJcbiAgICAvL2NyZWF0ZSB0YWJsZVxyXG4gICAgY3JlYXRlR3JpZChnYW1lTW9kZUluZm8pO1xyXG4gICAgY29uc3QgdGFibGUgPSBHYW1lLmdldEluc3RhbmNlKCkuZ2V0R2FtZVRhYmxlKCk7XHJcbiAgICB0YWJsZS5jbGFzc0xpc3QuYWRkKFBsYXllci5nZXRJbnN0YW5jZSgpLmdldEdhbWVNb2RlKCkpO1xyXG4gICAgLy9zZXQgbWluZXNcclxuICAgIHNldE1pbmVzKHRhYmxlLCBnYW1lTW9kZUluZm8sIG1pbmVJY29uKTtcclxuICAgIC8vIC8vIC8vc2V0IHRpcHNcclxuICAgIHdyaXRlVGlwcyh0YWJsZSk7XHJcbiAgICAvLyAvLyAvL3ByaW50IHRhYmxlXHJcbiAgICBnYW1lR3JpZFNlY3Rpb24uYXBwZW5kQ2hpbGQodGFibGUpO1xyXG4gICAgLy8gLy9zZXQgbGlzdGVuZXJzXHJcbiAgICB0YWJsZS5hZGRFdmVudExpc3RlbmVyKFwiY29udGV4dG1lbnVcIiwgcHJldmVudFRhYmxlTWVudSk7XHJcbiAgICB0YWJsZS5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGZsYWdJdCk7XHJcbiAgICB0YWJsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uRmllbGRDbGljayk7XHJcblxyXG59O1xyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vI3JlZ2lvbiAtIG9uQ2xpY2soKSAtIG1haW4gZnVuY3Rpb25cclxuY29uc3Qgb25DbGljayA9IChldmVudCk6IHZvaWQgPT4ge1xyXG4gICAgaWYgKGV2ZW50LnRhcmdldC50YWdOYW1lID09PSBcIkJVVFRPTlwiKSB7XHJcbiAgICAgICAgaWYgKG1hbmFnZUlucHV0cyhldmVudCkgPT09ICdzdGFydCcpIHtcclxuICAgICAgICAgICAgUGxheWVyLmdldEluc3RhbmNlKCkuc2V0TmFtZShwbGF5ZXJOYW1lSW5wdXQudmFsdWUpO1xyXG4gICAgICAgICAgICBnYW1lU2hvdygpO1xyXG4gICAgICAgICAgICBwcmludEdyaWQoKTtcclxuICAgICAgICAgICAgaGFuZGxlUmFua2luZygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLyNyZWdpb24gLSBnYW1lT3B0aW9uc1NlY3Rpb24gZXZlbnQgbGlzdGVuZXJzXHJcbmdhbWVPcHRpb25zU2VjdGlvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uQ2xpY2spO1xyXG4vLyNlbmRyZWdpb25cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvYXBwLnRzIiwiaW1wb3J0IHsgR2FtZSwgUGxheWVyIH0gZnJvbSAnLi9kYXRhJztcclxuXHJcbi8vI3JlZ2lvbiAtIHNlbGVjdG9yc1xyXG4vLyBjb25zdCBjdXN0b21Sb3dzSW5wdXQgPSA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3VzdG9tUm93cycpO1xyXG4vLyBjb25zdCBjdXN0b21Db2xzSW5wdXQgPSA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3VzdG9tQ29scycpO1xyXG4vLyBjb25zdCBjdXN0b21NaW5lc0lucHV0ID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2N1c3RvbU1pbmVzJyk7XHJcbmNvbnN0IGdhbWVNb2RlSW5wdXQgPSA8SFRNTFNlbGVjdEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWUtbW9kZScpO1xyXG4vLyBjb25zdCBjdXN0b21Nb2RlT3B0aW9ucyA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3VzdG9tTW9kZU9wdGlvbnMnKTtcclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLyAvLyNyZWdpb24gLSBnZXRDdXN0b21Qcm9wcygpIC0gZ2V0cyBjdXN0b20gcHJvcGVydGllcyBmcm9tIHVzZXIgaW5wdXRcclxuLy8gY29uc3QgZ2V0Q3VzdG9tUHJvcHMgPSAoKSA9PiB7XHJcbi8vICAgICBsZXQgY3VzdG9tUHJvcHMgPSBbXHJcbi8vICAgICAgICAgcGFyc2VJbnQoY3VzdG9tUm93c0lucHV0LnZhbHVlKSxcclxuLy8gICAgICAgICBwYXJzZUludChjdXN0b21Db2xzSW5wdXQudmFsdWUpLFxyXG4vLyAgICAgICAgIHBhcnNlSW50KGN1c3RvbU1pbmVzSW5wdXQudmFsdWUpLFxyXG4vLyAgICAgXTtcclxuLy8gICAgIHJldHVybiBjdXN0b21Qcm9wcztcclxuLy8gfVxyXG4vLyAvLyNlbmRyZWdpb25cclxuXHJcbi8vIC8vI3JlZ2lvbiAtIGRpc3BsYXlDdXN0b21Nb2RlT3B0cygpIC0gaGlkZXMgb3Igc2hvd3MgZGl2IHdpdGggY3VzdG9tIGdhbWUgb3B0aW9ucyBpbiBkb2N1bWVudFxyXG4vLyBsZXQgZGlzcGxheUN1c3RvbU1vZGVPcHRpb25zID0gKCk6IHZvaWQgPT4ge1xyXG4vLyAgICAgaWYgKGdhbWVNb2RlSW5wdXQudmFsdWUgPT09IFwiY3VzdG9tXCIpIHtcclxuLy8gICAgICAgICBjdXN0b21Nb2RlT3B0aW9ucyEuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XHJcbi8vICAgICB9IGVsc2UgeyBjdXN0b21Nb2RlT3B0aW9ucyEuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7IH1cclxuLy8gfTtcclxuLy8gLy8jZW5kcmVnaW9uXHJcblxyXG4vLyAvLyNyZWdpb24gLSBjdXN0b21JbnB1dFZhbGlkYXRpb24oKSAtIGN1c3RvbSBnYW1lIG1vZGUgaW5wdXQgdmFsaWRhdGlvblxyXG4vLyBjb25zdCBjdXN0b21JbnB1dFZhbGlkYXRpb24gPSAobW9kZUluZm86IG51bWJlcltdKSA9PiB7Ly9nYW1lIG1vZGUgaW5mbyBbcm93cyxjb2xzLG1pbmVzXVxyXG4vLyAgICAgaWYgKG1vZGVJbmZvWzJdID49IG1vZGVJbmZvWzBdICogbW9kZUluZm9bMV0pIHsgIC8vbnVtIG9mIG1pbmVzIHZhbGlkYXRpb24sY2FuJ3QgYmUgbW9yZSBtaW5lcyB0aGFuIGZpZWxkcyBvciBlcXVhbCB0byBudW0gb2YgZmllbGRzXHJcbi8vICAgICAgICAgYWxlcnQoXCJDYW4ndCBoYXZlIG1vcmUgbWluZXMgdGhhbiBmaWVsZHNcIik7XHJcbi8vICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4vLyAgICAgfSByZXR1cm4gdHJ1ZTtcclxuLy8gfTtcclxuLy8gLy8jZW5kcmVnaW9uXHJcblxyXG4vLyNyZWdpb24gLSBnYW1lTW9kZSgpIC0gZ2FtZSBtb2RlIHN3aXRjaGVyXHJcbmNvbnN0IGdhbWVNb2RlID0gKG1vZGU6IHN0cmluZyk6IG51bWJlcltdIHwgc3RyaW5nID0+IHtcclxuICAgIHN3aXRjaCAobW9kZSkge1xyXG4gICAgICAgIGNhc2UgXCJiZWdpbm5lclwiOlxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkdhbWUgbW9kZTogQmVnaW5uZXIgOXg5IHRhYmxlIHdpdGggMTAgbWluZXNcIik7XHJcbiAgICAgICAgICAgIFBsYXllci5nZXRJbnN0YW5jZSgpLnNldEdhbWVNb2RlKG1vZGUpO1xyXG4gICAgICAgICAgICByZXR1cm4gR2FtZS5nZXRJbnN0YW5jZSgpLm1vZGVJbmZvKG1vZGUpO1xyXG4gICAgICAgIGNhc2UgXCJpbnRlcm1lZGlhdGVcIjpcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJHYW1lIG1vZGU6IEludGVybWVkaWF0ZSAxNngxNiB0YWJsZSB3aXRoIDQwIG1pbmVzXCIpO1xyXG4gICAgICAgICAgICBQbGF5ZXIuZ2V0SW5zdGFuY2UoKS5zZXRHYW1lTW9kZShtb2RlKTtcclxuICAgICAgICAgICAgcmV0dXJuIEdhbWUuZ2V0SW5zdGFuY2UoKS5tb2RlSW5mbyhtb2RlKTtcclxuICAgICAgICBjYXNlIFwiZXhwZXJ0XCI6XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiR2FtZSBtb2RlOiBFeHBlcnQgMTZ4MzAgdGFibGUgd2l0aCA5OSBtaW5lc1wiKTtcclxuICAgICAgICAgICAgUGxheWVyLmdldEluc3RhbmNlKCkuc2V0R2FtZU1vZGUobW9kZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBHYW1lLmdldEluc3RhbmNlKCkubW9kZUluZm8obW9kZSk7XHJcbiAgICAgICAgLy8gY2FzZSBcImN1c3RvbVwiOlxyXG4gICAgICAgIC8vICAgICBQbGF5ZXIuZ2V0SW5zdGFuY2UoKS5zZXRHYW1lTW9kZShtb2RlKTtcclxuICAgICAgICAvLyAgICAgaWYgKGN1c3RvbUlucHV0VmFsaWRhdGlvbihnZXRDdXN0b21Qcm9wcygpKSA9PT0gZmFsc2UpIHsgcmV0dXJuIGdhbWVNb2RlKFwiVmFsaWRhdGlvblwiKSB9XHJcbiAgICAgICAgLy8gICAgIEdhbWUuZ2V0SW5zdGFuY2UoKS5zZXRDdXN0b21Nb2RlKGdldEN1c3RvbVByb3BzKCkpO1xyXG4gICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhgR2FtZSBtb2RlOiBDdXN0b20gJHtHYW1lLmdldEluc3RhbmNlKCkubW9kZUluZm8obW9kZSlbMF19eCR7R2FtZS5nZXRJbnN0YW5jZSgpLm1vZGVJbmZvKG1vZGUpWzFdfSB0YWJsZSB3aXRoICR7R2FtZS5nZXRJbnN0YW5jZSgpLm1vZGVJbmZvKG1vZGUpWzJdfSBtaW5lKHMpYCk7XHJcbiAgICAgICAgLy8gICAgIHJldHVybiBHYW1lLmdldEluc3RhbmNlKCkubW9kZUluZm8obW9kZSk7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgaWYgKG1vZGUgPT09IFwiVmFsaWRhdGlvblwiKSB7IGNvbnNvbGUuZXJyb3IoXCJWYWxpZGF0aW9uIGlzc3VlXCIpOyByZXR1cm4gXCJlcnJvciFcIiB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignVGhlcmUgaXMgbm8gZ2FtZSBtb2RlIHdpdGggdGhhdCBudW1iZXIhJyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJlcnJvciFcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vI3JlZ2lvbiAtIGV2ZW50IGxpc3RlbmVybnNcclxuZ2FtZU1vZGVJbnB1dC52YWx1ZSA9IFwiYmVnaW5uZXJcIjtcclxuLy8gZ2FtZU1vZGVJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBkaXNwbGF5Q3VzdG9tTW9kZU9wdGlvbnMpOy8vXHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuZXhwb3J0IHsgZ2FtZU1vZGUsIGdhbWVNb2RlSW5wdXQgfTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvZ2FtZU1vZGUudHMiLCJpbXBvcnQgeyBHYW1lLCBQbGF5ZXIgfSBmcm9tICcuL2RhdGEnO1xyXG5pbXBvcnQgeyBkZWZpbmVTdXJyb3VuZGluZyB9IGZyb20gJy4vdGFibGVHcmlkJztcclxuaW1wb3J0IHsgcmFuZG9tTnVtYmVyc0FycmF5IH0gZnJvbSAnLi9oZWxwZXJGdW5jcyc7XHJcbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09TUlORVM9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyNyZWdpb24gY3JlYXRlTWluZXMoKSAtIGNyZWF0ZSBtaW5lcyBiYXNlZCBvbiBnYW1lIG1vZGVcclxuY29uc3QgY3JlYXRlTWluZXMgPSAobW9kZUluZm86IG51bWJlcltdKTogbnVtYmVyW10gPT4gey8vIGNyZWF0ZXMgcmFuZG9tIG51bWJlciBvZiBtaW5lcyBhbmQgc29ydHMgdGhlbSBieSBzaXplXHJcbiAgICBsZXQgbWluZXMgPSByYW5kb21OdW1iZXJzQXJyYXkobW9kZUluZm9bMl0sIChtb2RlSW5mb1swXSAqIG1vZGVJbmZvWzFdKSkuc29ydCgoYSwgYikgPT4geyByZXR1cm4gYSAtIGIgfSk7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhcIk1pbmVzIGxvY2F0aW9uOiBcIiArIG1pbmVzKTsgLy8gZm9yIGRldiBwdXJwb3Nlc1xyXG4gICAgcmV0dXJuIG1pbmVzO1xyXG59XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uIC0gc2V0TWluZXMoKSAtIHNldCBtaW5lcyBvbiB0YWJsZVxyXG5jb25zdCBzZXRNaW5lcyA9ICh0YWJsZTogSFRNTEVsZW1lbnQsIG1vZGVJbmZvOiBudW1iZXJbXSwgbWluZUljb246IGFueSk6IHZvaWQgPT4ge1xyXG4gICAgbGV0IG1pbmVzOiBudW1iZXJbXSA9IGNyZWF0ZU1pbmVzKG1vZGVJbmZvKTtcclxuICAgIGNvbnN0IGFsbEZpZWxkcyA9IHRhYmxlLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwidGRcIik7XHJcbiAgICBtaW5lcy5mb3JFYWNoKG1pbmUgPT4geyBcclxuICAgICAgICBhbGxGaWVsZHNbKG1pbmUgLSAxKV0uc2V0QXR0cmlidXRlKFwiZGF0YS1taW5lXCIsIG1pbmVJY29uKTtcclxuICAgIH0pO1xyXG59XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uIC0gY2xlYXJNaW5lcygpIC0gY2xlYXIgbWluZXMgZnJvbSB0YWJsZVxyXG5jb25zdCBjbGVhck1pbmVzID0gKHRhYmxlOiBIVE1MRWxlbWVudCk6IHZvaWQgPT4ge1xyXG4gICAgY29uc3QgYWxsRmllbGRzID0gdGFibGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJ0ZFwiKTtcclxuICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoYWxsRmllbGRzLCAoZmllbGQ6IEhUTUxUYWJsZURhdGFDZWxsRWxlbWVudCkgPT4ge1xyXG4gICAgICAgIGZpZWxkLnNldEF0dHJpYnV0ZSgnZGF0YS1taW5lJywgJycpO1xyXG4gICAgfSk7XHJcbn1cclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLyNyZWdpb24gLSBzZXRNaW5lSWNvbigpIC0gc2V0cyBtaW5lIGljb24gYmFzZWQgb24gZ2FtZSBtb2RlXHJcbmNvbnN0IHNldE1pbmVJY29uID0gKCkgPT4ge1xyXG4gICAgbGV0IGltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICBpZiAoUGxheWVyLmdldEluc3RhbmNlKCkuZ2V0R2FtZU1vZGUoKSA9PT0gJ2JlZ2lubmVyJykge1xyXG4gICAgICAgIGltYWdlLnNldEF0dHJpYnV0ZSgnc3JjJywgJy4vaW1hZ2VzL21pbmVCLnBuZycpO1xyXG4gICAgfSBlbHNlIGlmIChQbGF5ZXIuZ2V0SW5zdGFuY2UoKS5nZXRHYW1lTW9kZSgpID09PSAnaW50ZXJtZWRpYXRlJykge1xyXG4gICAgICAgIGltYWdlLnNldEF0dHJpYnV0ZSgnc3JjJywgJy4vaW1hZ2VzL21pbmVJLnBuZycpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBpbWFnZS5zZXRBdHRyaWJ1dGUoJ3NyYycsICcuL2ltYWdlcy9taW5lRS5wbmcnKTtcclxuICAgIH1cclxuICAgIHJldHVybiBpbWFnZTtcclxufVxyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vI3JlZ2lvbiAtIHNob3dNaW5lcygpIC0gc2hvdyBtaW5lcyBvbiBncmlkXHJcbmNvbnN0IHNob3dNaW5lcyA9ICh0YWJsZSwgbWluZUljb24pID0+IHtcclxuICAgIGNvbnN0IGFsbEZpZWxkcyA9IHRhYmxlLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwidGRcIik7XHJcbiAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKGFsbEZpZWxkcywgKGZpZWxkOiBIVE1MVGFibGVEYXRhQ2VsbEVsZW1lbnQpID0+IHtcclxuICAgICAgICBpZiAoZmllbGQuZ2V0QXR0cmlidXRlKCdkYXRhLW1pbmUnKSA9PT0gbWluZUljb24pIHtcclxuICAgICAgICAgICAgZmllbGQuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICAgICAgZmllbGQuY2xhc3NMaXN0LmFkZCgnZW1wdHknKTtcclxuICAgICAgICAgICAgZmllbGQuYXBwZW5kQ2hpbGQoc2V0TWluZUljb24oKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn07XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1USVBTPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4vLyNyZWdpb24gLSB3cml0ZVRpcHMoKSAtIHdyaXRlIHRpcHMgYmFzZWQgb24gbWluZXMgb24gdGhlIGdpdmVuIHRhYmxlXHJcbmNvbnN0IHdyaXRlVGlwcyA9ICh0YWJsZTogSFRNTFRhYmxlRWxlbWVudCk6IHZvaWQgPT4ge1xyXG4gICAgY29uc3QgYWxsRmllbGRzID0gdGFibGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJ0ZFwiKTtcclxuICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoYWxsRmllbGRzLCBmaWVsZCA9PiB7XHJcbiAgICAgICAgaWYgKGZpZWxkLmdldEF0dHJpYnV0ZShcImRhdGEtbWluZVwiKSA9PT0gXCJcIikge1xyXG4gICAgICAgICAgICBsZXQgbWluZXNOdW0gPSBjb3VudE1pbmVzKGZpZWxkKTtcclxuICAgICAgICAgICAgaWYgKG1pbmVzTnVtID09PSAwKSB7IGZpZWxkLnNldEF0dHJpYnV0ZShcImRhdGEtbWluZVwiLCBcIlwiKTsgZmllbGQuc2V0QXR0cmlidXRlKFwiZGF0YS1lbXB0eVwiLCBcIjFcIik7IH1cclxuICAgICAgICAgICAgZWxzZSB7IGZpZWxkLnNldEF0dHJpYnV0ZShcImRhdGEtbWluZVwiLCBtaW5lc051bS50b1N0cmluZygpKTsgZmllbGQuc2V0QXR0cmlidXRlKFwiZGF0YS1lbXB0eVwiLCBcIjBcIik7IH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLyNyZWdpb24gLSBjb3VudE1pbmVzKCkgLSBjb3VudHMgbWluZXMgaW4gc3Vycm91bmRpbmdcclxuZnVuY3Rpb24gY291bnRNaW5lcyhmaWVsZDogSFRNTFRhYmxlQ2VsbEVsZW1lbnQpOiBudW1iZXIge1xyXG4gICAgY29uc3QgZ2FtZU1vZGVJbmZvID0gR2FtZS5nZXRJbnN0YW5jZSgpLm1vZGVJbmZvKFBsYXllci5nZXRJbnN0YW5jZSgpLmdldEdhbWVNb2RlKCkpO1xyXG4gICAgY29uc3QgbnVtT2ZDb2xzOiBudW1iZXIgPSBnYW1lTW9kZUluZm9bMV07XHJcbiAgICBsZXQgY291bnRlciA9IDA7XHJcbiAgICBsZXQgc3Vycm91bmRpbmcgPSBkZWZpbmVTdXJyb3VuZGluZyhHYW1lLmdldEluc3RhbmNlKCkuZ2V0R2FtZVRhYmxlKCksIGZpZWxkKTtcclxuICAgIHN1cnJvdW5kaW5nLmZvckVhY2goc3VyRmllbGQgPT4ge1xyXG4gICAgICAgIGlmIChzdXJGaWVsZCA9PT0gbnVsbCkgeyB9XHJcbiAgICAgICAgZWxzZSBpZiAoc3VyRmllbGQuZ2V0QXR0cmlidXRlKFwiZGF0YS1taW5lXCIpID09PSBcIlxcdUQ4M0RcXHVEQ0EzXCIpIHtcclxuICAgICAgICAgICAgY291bnRlcisrO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGNvdW50ZXI7XHJcbn1cclxuLy8jZW5kcmVnaW9uXHJcblxyXG5leHBvcnQgeyBzZXRNaW5lcywgY2xlYXJNaW5lcywgc2hvd01pbmVzLCB3cml0ZVRpcHMsIHNldE1pbmVJY29uIH07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL21pbmVzQW5kVGlwcy50cyIsImltcG9ydCB7IEdhbWUsIFBsYXllciB9IGZyb20gJy4vZGF0YSc7XHJcbmltcG9ydCB7IGRlZmluZVN1cnJvdW5kaW5nIH0gZnJvbSAnLi90YWJsZUdyaWQnO1xyXG5cclxuXHJcbi8vI3JlZ2lvbiAtIHN0b3BDbGljaygpIC0gc3RvcGlyYSBldmVudExJc3RlbmVyIG5hIGVsZW1lbnR1IGtvamkgamUga2xpa251dFxyXG5jb25zdCBzdG9wQ2xpY2sgPSAoZXZlbnQ6IGFueSkgPT4ge1xyXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbn07XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy89PT09PT09PT09PT09PT09PT09PT1FTVBUWSBGTE9XPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8jcmVnaW9uIC0gb3BlbkVtcHR5RWxlbWVudCgpIC0gZmxvdyBmdW5jdGlvblxyXG5cclxubGV0IG9wZW5FbXB0eUVsZW1lbnQgPSAoZWxlbWVudDogSFRNTFRhYmxlRGF0YUNlbGxFbGVtZW50KSA9PiB7XHJcbiAgICBsZXQgZW1wdHlGaWVsZHMgPSBmaXJzdEVtcHR5RmllbGRDaGVjayhlbGVtZW50KTtcclxuICAgIGxldCBzdG9wU2VhcmNoID0gZmFsc2U7XHJcbiAgICB3aGlsZSAoc3RvcFNlYXJjaCA9PSBmYWxzZSkge1xyXG4gICAgICAgIGlmIChlbXB0eUZpZWxkcy5sZW5ndGggIT0gMCkge1xyXG4gICAgICAgICAgICBsZXQgbmV3TWFpbkFycmF5OiBhbnlbXSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgZW1wdHlGaWVsZHMuZm9yRWFjaChmaWVsZCA9PiB7XHJcbiAgICAgICAgICAgICAgICBlbXB0eUNlbGwoZmllbGQpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHN1YkFycmF5ID0gZGVmaW5lU3Vycm91bmRpbmcoR2FtZS5nZXRJbnN0YW5jZSgpLmdldEdhbWVUYWJsZSgpLCBmaWVsZCk7XHJcbiAgICAgICAgICAgICAgICBzdWJBcnJheS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWNsaWNrXCIsIFwiMVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc3RvcENsaWNrKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHN0b3BDbGljayk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXdNYWluQXJyYXkuaW5kZXhPZihlbGVtZW50KSAhPT0gLTEpIHsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHsgbmV3TWFpbkFycmF5LnB1c2goZWxlbWVudCkgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGV4dCA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1pZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRleHQgPT09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbXB0eUNlbGwoPGFueT5lbGVtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgbmV3TWFpbkFycmF5ID0gY2hlY2tFbXB0eUZpZWxkcyhuZXdNYWluQXJyYXkpO1xyXG4gICAgICAgICAgICAgICAgZW1wdHlGaWVsZHMgPSBuZXdNYWluQXJyYXk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBzdG9wU2VhcmNoID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBzdG9wU2VhcmNoID0gdHJ1ZTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufVxyXG5cclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLyNyZWdpb24gLSBlbXB0eUNlbGwoKVxyXG5jb25zdCBlbXB0eUNlbGwgPSAoZWxlbWVudDogSFRNTFRhYmxlRGF0YUNlbGxFbGVtZW50KTogdm9pZCA9PiB7XHJcbiAgICBpZiAoZWxlbWVudCAhPT0gbnVsbCkge1xyXG4gICAgICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShcImRhdGEtZW1wdHlcIiwgXCJcIik7XHJcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiZW1wdHlcIik7XHJcbiAgICB9XHJcbn1cclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLyNyZWdpb24gLSBjaGVja0VtcHR5RmllbGRzKCkgLSBjaGVjayBlbXB0eSBmaWVsZHMgaWYgaXQgaXMgdG90YWxseSBlbXB0eSBvciBpdHMgYSB0aXBcclxuY29uc3QgY2hlY2tFbXB0eUZpZWxkcyA9IChmaWVsZHM6IGFueSkgPT4ge1xyXG4gICAgbGV0IGNoZWNrZWRFbXB0eUZpZWxkczogSFRNTFRhYmxlRGF0YUNlbGxFbGVtZW50W10gPSBbXTtcclxuICAgIGZpZWxkcy5mb3JFYWNoKGZpZWxkID0+IHtcclxuICAgICAgICBpZiAoZmllbGQgPT09IG51bGwpIHsgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBmaWVsZC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWNsaWNrXCIsIFwiMVwiKTsvL3NldCBmaWVsZCBhcyBjbGlja2VkXHJcbiAgICAgICAgICAgIGZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzdG9wQ2xpY2spOy8vdWtkaWRhIGV2ZW50XHJcbiAgICAgICAgICAgIGZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgc3RvcENsaWNrKTsvL3VraWRhIGV2ZW50XHJcbiAgICAgICAgICAgIGNvbnN0IGlzRW1wdHkgPSBmaWVsZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWVtcHR5XCIpO1xyXG4gICAgICAgICAgICBjb25zdCBjb250ZXh0ID0gZmllbGQuZ2V0QXR0cmlidXRlKFwiZGF0YS1taW5lXCIpO1xyXG4gICAgICAgICAgICBpZiAoaXNFbXB0eSA9PT0gXCIxXCIpIHsvLyBpZiBmaWVsZCBpcyB0b3RhbGx5IGVtcHR5XHJcbiAgICAgICAgICAgICAgICBjaGVja2VkRW1wdHlGaWVsZHMucHVzaChmaWVsZCk7XHJcbiAgICAgICAgICAgICAgICBmaWVsZC5jbGFzc0xpc3QuYWRkKFwiZW1wdHlcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7IGZpZWxkLnRleHRDb250ZW50ID0gY29udGV4dDsgZmllbGQuY2xhc3NMaXN0LmFkZCgnY2xpY2tlZCcpOyB9Ly8gaWYgaXRzIHRpcCwgc2hvdyBpdFxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGNoZWNrZWRFbXB0eUZpZWxkczsgLy8gcmV0dXJuaW5nIGFycmF5IG9mIHRvdGFsbHkgZW1wdHkgZmllbGRzXHJcbn1cclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLyNyZWdpb24gLSBmaXJzdEVtcHR5RmllbGRDaGVjaygpIC0gZmlyc3QgY2xpY2tlZCBlbXB0eSBlbGVtZW50IGNoZWNrLCByZXR1cm5zIGFycmF5IG9mIGVtcHR5IGJsYW5rIGVsZW1lbnRzXHJcbmNvbnN0IGZpcnN0RW1wdHlGaWVsZENoZWNrID0gKGZpZWxkOiBIVE1MVGFibGVEYXRhQ2VsbEVsZW1lbnQpID0+IHsvL2NoZWNraW5nIGZpcnN0IGVtcHR5IGNsaWNrZWQgZmllbGRcclxuICAgIGZpZWxkLnNldEF0dHJpYnV0ZShcImRhdGEtY2xpY2tcIiwgXCIxXCIpOyAvLyBzZXQgY2xpY2tlZFxyXG4gICAgZmllbGQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHN0b3BDbGljayk7Ly9zdG9waXJhIGV2ZW50IGNsaWNrXHJcbiAgICBmaWVsZC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHN0b3BDbGljayk7IC8vIHN0b3BpcmEgZXZlbnQgbW91c2Vkb3duXHJcbiAgICBlbXB0eUNlbGwoZmllbGQpOyAvLyByZW1vdmUgZW1wdHkgYXR0cmlidXRlLCBjb2xvciBmaWVsZFxyXG5cclxuICAgIGNvbnN0IHN1cnJvdW5kRmllbGRzID0gZGVmaW5lU3Vycm91bmRpbmcoR2FtZS5nZXRJbnN0YW5jZSgpLmdldEdhbWVUYWJsZSgpLCBmaWVsZCk7Ly9rcmVpcmEgbml6IHN1c2VkbmloIHBvbGphXHJcbiAgICBjb25zdCBlbXB0eUZpZWxkcyA9IGNoZWNrRW1wdHlGaWVsZHMoc3Vycm91bmRGaWVsZHMpO1xyXG4gICAgcmV0dXJuIGVtcHR5RmllbGRzO1xyXG59XHJcbi8vI2VuZHJlZ2lvblxyXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5leHBvcnQgeyBvcGVuRW1wdHlFbGVtZW50LCBzdG9wQ2xpY2sgfTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvZW1wdHlGbG93LnRzIiwibGV0IHRpbWVyID0ge1xyXG4gICAgdGltZToge1xyXG4gICAgICAgIGhvdXJzOiAwLFxyXG4gICAgICAgIG1pbnV0ZXM6IDAsXHJcbiAgICAgICAgc2Vjb25kczogMFxyXG4gICAgfSxcclxuICAgIGludGVydmFsOiAxLFxyXG4gICAgdGltZUluY3JlbWVudDogKCkgPT4ge1xyXG4gICAgICAgIGlmICh0aW1lci50aW1lLnNlY29uZHMgPCA1OSkgeyB0aW1lci50aW1lLnNlY29uZHMrKyB9XHJcbiAgICAgICAgZWxzZSBpZiAodGltZXIudGltZS5zZWNvbmRzID09PSA1OSAmJiB0aW1lci50aW1lLm1pbnV0ZXMgPCA1OSkgeyB0aW1lci50aW1lLnNlY29uZHMgPSAwLCB0aW1lci50aW1lLm1pbnV0ZXMrKyB9XHJcbiAgICAgICAgZWxzZSBpZiAodGltZXIudGltZS5zZWNvbmRzID09PSA1OSAmJiB0aW1lci50aW1lLm1pbnV0ZXMgPT09IDU5KSB7IHRpbWVyLnRpbWUuc2Vjb25kcyA9IDAsIHRpbWVyLnRpbWUubWludXRlcyA9IDAsIHRpbWVyLnRpbWUuaG91cnMrKyB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5cclxubGV0IGNhbGNTY29yZSA9ICgpOiBudW1iZXIgPT4ge1xyXG4gICAgcmV0dXJuIHRpbWVyLnRpbWUuc2Vjb25kcyArICh0aW1lci50aW1lLm1pbnV0ZXMgKiA2MCkgKyAodGltZXIudGltZS5ob3VycyAqIDM2MCk7XHJcbn07XHJcblxyXG5cclxubGV0IGdldFN0cmluZ1RpbWUgPSAoKSA9PiB7XHJcbiAgICBsZXQgcHJldlRpbWUgPSBbdGltZXIudGltZS5ob3VycywgdGltZXIudGltZS5taW51dGVzLCB0aW1lci50aW1lLnNlY29uZHNdO1xyXG4gICAgbGV0IGN1cnJUaW1lID0gcHJldlRpbWUubWFwKCh0aW1lRWxlbWVudCkgPT4geyBpZiAodGltZUVsZW1lbnQgPCAxMCkgeyByZXR1cm4gXCIwXCIgKyB0aW1lRWxlbWVudCB9IGVsc2UgeyByZXR1cm4gdGltZUVsZW1lbnQgfSB9KTtcclxuICAgIHJldHVybiBgJHtjdXJyVGltZVswXX0gOiAke2N1cnJUaW1lWzFdfSA6ICR7Y3VyclRpbWVbMl19YDtcclxufTtcclxuXHJcbmxldCBzdGFydFRpbWVyID0gKHN0ZXAgPSAxKTogdm9pZCA9PiB7XHJcbiAgICB0aW1lci5pbnRlcnZhbCA9IHNldEludGVydmFsKHRpbWVyLnRpbWVJbmNyZW1lbnQsIHN0ZXAgKiAxMDAwKTtcclxufTtcclxuXHJcbmxldCBzdG9wVGltZXIgPSAoKTogdm9pZCA9PiB7XHJcbiAgICBjbGVhckludGVydmFsKHRpbWVyLmludGVydmFsKTtcclxufTtcclxuXHJcbmxldCByZXNldFRpbWVyID0gKCkgPT4ge1xyXG4gICAgZm9yIChsZXQgZWxlbWVudCBpbiB0aW1lci50aW1lKSB7IHRpbWVyLnRpbWVbZWxlbWVudF0gPSAwIH07XHJcbn1cclxuXHJcbmxldCBzdHJpbmdJbnRlcnZhbCA9IDA7IC8vIHNhdmluZyBpbnRlcnZhbCBudW0gZm9yIHN0cmluZyBwcmludFxyXG5jb25zdCB0aW1lclBsYWNlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RpbWVyLXBsYWNlJyk7XHJcblxyXG5sZXQgc3RhcnRUaW1lckhhbmRsZXIgPSAoKSA9PiB7XHJcbiAgICBzdGFydFRpbWVyKCk7XHJcbiAgICBzdHJpbmdJbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHsgdGltZXJQbGFjZS50ZXh0Q29udGVudCA9IGdldFN0cmluZ1RpbWUoKSB9LCAxMDApO1xyXG59O1xyXG5cclxubGV0IHN0b3BUaW1lckhhbmRsZXIgPSAoKSA9PiB7XHJcbiAgICBzdG9wVGltZXIoKTtcclxuICAgIGNsZWFySW50ZXJ2YWwoc3RyaW5nSW50ZXJ2YWwpO1xyXG59O1xyXG5cclxuXHJcbmV4cG9ydCB7IHN0YXJ0VGltZXJIYW5kbGVyLCBzdG9wVGltZXIsIHJlc2V0VGltZXIsIGdldFN0cmluZ1RpbWUsIHRpbWVyUGxhY2UsIHN0b3BUaW1lckhhbmRsZXIsIGNhbGNTY29yZSB9O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvdGltZXIudHMiLCJpbXBvcnQgeyBQbGF5ZXIgfSBmcm9tICcuL2RhdGEnO1xyXG5pbXBvcnQgeyBjYWxjU2NvcmUgfSBmcm9tICcuL3RpbWVyJztcclxuXHJcbi8vI3JlZ2lvbiAtIHNlbGVjdG9yc1xyXG5jb25zdCByYW5raW5nR2FtZU1vZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZS1tb2RlLW5hbWUnKTtcclxuY29uc3Qgc2NvcmVMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Njb3JlLWxpc3QnKTtcclxuXHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uIC0gcmFua2luZ1RhYmxlIGRlZmluaXRpb25cclxubGV0IHJhbmtpbmdUYWJsZToge30gPSB7XHJcbiAgICBiZWdpbm5lcjogW1snSm9obicsIDI1XSwgWydNYXJyeScsIDI2XSwgWydUaW0nLCAyOV0sIFsnQWxleCcsIDM1XSwgWydPbGl2aWEnLCA0MF1dLFxyXG4gICAgaW50ZXJtZWRpYXRlOiBbWydTYW0nLCA0NF0sIFsnRW1pbHknLCA0Nl0sIFsnSmltJywgNTBdLCBbJ0NoYXJsb3R0ZScsIDUzXSwgWydXaWxseScsIDU1XV0sXHJcbiAgICBleHBlcnQ6IFtbJ01hcmlhJywgNThdLCBbJ0tpdCcsIDY2XSwgWydUb255JywgNzBdLCBbJ1pvZXknLCA3NV0sIFtcIk5hdGFsaWVcIiwgODBdXVxyXG59O1xyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vI3JlZ2lvbiAtIHByZXNldFN0b3JhZ2UoKSAtIGNoZWNrcyBpZiB0aGVyZSdzIGRhdGFiYXNlIGluIGxvY2Fsc3RvcmFnZSBpZiBub3QgY3JlYXRlcyBvbmUsIG90aGVyd2lzZSBsb2FkcyBpdC5cclxuY29uc3QgcHJlc2V0U3RvcmFnZSA9ICgpOiB2b2lkID0+IHtcclxuICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncmFua2luZ1RhYmxlJykgPT09IG51bGwpIHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncmFua2luZ1RhYmxlJywgSlNPTi5zdHJpbmdpZnkocmFua2luZ1RhYmxlKSk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coYGRhdGFiYXNlIGZldGNoZWQgZnJvbSBsb2NhbHN0b3JhZ2VgLCBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncmFua2luZ1RhYmxlJykpOy8vIGZvciBkZXYgcHVycG9zZVxyXG4gICAgfVxyXG59O1xyXG4vLyNlbmRyZWdpb25cclxuXHJcbnByZXNldFN0b3JhZ2UoKTtcclxuXHJcbi8vI3JlZ2lvbiAtIHNhdmVEYXRhKCkgLSBzYXZlcyBkYXRhXHJcbmNvbnN0IHNhdmVEYXRhID0gKCkgPT4ge1xyXG4gICAgbGV0IHN0b3JhZ2VEYXRhID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncmFua2luZ1RhYmxlJykpO1xyXG4gICAgbGV0IGdhbWVNb2RlID0gUGxheWVyLmdldEluc3RhbmNlKCkuZ2V0R2FtZU1vZGUoKTtcclxuICAgIGxldCBjdXJyZW50TW9kZVRhYmxlID0gc3RvcmFnZURhdGFbZ2FtZU1vZGVdO1xyXG4gICAgY3VycmVudE1vZGVUYWJsZSA9IHNjb3JlVmFsaWRhdGlvbihjdXJyZW50TW9kZVRhYmxlKTtcclxuICAgIGN1cnJlbnRNb2RlVGFibGUuc29ydCgoYSwgYikgPT4geyByZXR1cm4gYVsxXSAtIGJbMV0gfSk7XHJcbiAgICBmb3IgKGN1cnJlbnRNb2RlVGFibGUubGVuZ3RoOyBjdXJyZW50TW9kZVRhYmxlLmxlbmd0aCA+IDU7KSB7XHJcbiAgICAgICAgY3VycmVudE1vZGVUYWJsZS5wb3AoKTtcclxuICAgIH1cclxuICAgIHN0b3JhZ2VEYXRhW2dhbWVNb2RlXSA9IGN1cnJlbnRNb2RlVGFibGU7XHJcbiAgICBsZXQgbmV3RGF0YSA9IEpTT04uc3RyaW5naWZ5KHN0b3JhZ2VEYXRhKTtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdyYW5raW5nVGFibGUnLCBuZXdEYXRhKTtcclxuICAgIHJhbmtpbmdUYWJsZSA9IHN0b3JhZ2VEYXRhO1xyXG59O1xyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vI3JlZ2lvbiAtIHNjb3JlVmFsaWRhdGlvbiAoKSAtIHZhbGlkYXRlcyBpZiBzY29yZSBpcyBub3QgZXF1YWwgdG8gMFxyXG5jb25zdCBzY29yZVZhbGlkYXRpb24gPSAodGFibGU6IChzdHJpbmcgfCBudW1iZXIpW11bXSkgPT4ge1xyXG4gICAgbGV0IG5ld1RhYmxlID0gdGFibGU7XHJcbiAgICBjb25zdCBwbGF5ZXJTY29yZSA9IFtQbGF5ZXIuZ2V0SW5zdGFuY2UoKS5nZXROYW1lKCksIFBsYXllci5nZXRJbnN0YW5jZSgpLmdldFNjb3JlKCldO1xyXG4gICAgaWYgKHBsYXllclNjb3JlWzFdICE9PSAwICYmIHBsYXllclNjb3JlWzFdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBuZXdUYWJsZS5wdXNoKHBsYXllclNjb3JlKTtcclxuICAgIH1cclxuICAgIHJldHVybiBuZXdUYWJsZTtcclxufTtcclxuLy8jZW5kcmVnaW9uXHJcblxyXG5cclxuLy8jcmVnaW9uIC0gd3JpdGVEYXRhKCkgLSBwcmludHMgb3V0IHJhbmtpbmcgdGFibGVcclxubGV0IHByaW50RGF0YSA9ICgpID0+IHtcclxuICAgIGxldCB0YWJsZSA9IHJhbmtpbmdUYWJsZVtQbGF5ZXIuZ2V0SW5zdGFuY2UoKS5nZXRHYW1lTW9kZSgpXTtcclxuICAgIHJhbmtpbmdHYW1lTW9kZS50ZXh0Q29udGVudCA9IFBsYXllci5nZXRJbnN0YW5jZSgpLmdldEdhbWVNb2RlKCkgKyAnIG1vZGUnO1xyXG4gICAgc2NvcmVMaXN0LmlubmVySFRNTCA9ICcnO1xyXG4gICAgdGFibGUuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICBsZXQgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG4gICAgICAgIGxpLnRleHRDb250ZW50ID0gYCR7ZWxlbWVudFswXX0gLSAke2VsZW1lbnRbMV19YDtcclxuICAgICAgICBzY29yZUxpc3QuYXBwZW5kQ2hpbGQobGkpO1xyXG4gICAgfSk7XHJcbn07XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uIC0gaGFuZGxlUmFua2luZygpIC0gb25lIHRvIHJ1bGUgdGhlbSBhbGxcclxuY29uc3QgaGFuZGxlUmFua2luZyA9ICgpID0+IHtcclxuICAgIHNhdmVEYXRhKCk7XHJcbiAgICBwcmludERhdGEoKTtcclxufTtcclxuLy8jZW5kcmVnaW9uXHJcblxyXG5leHBvcnQgeyBoYW5kbGVSYW5raW5nIH07XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9yYW5raW5nLnRzIiwiaW1wb3J0IHsgR2FtZSwgZ2FtZVNlY3Rpb24gfSBmcm9tICcuL2RhdGEnO1xyXG5cclxuLy8jcmVnaW9uIC0gRE9NIHNlbGVjdG9yc1xyXG5jb25zdCBhYm91dEdhbWVCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWJvdXQtZ2FtZS1idXR0b24nKTtcclxuY29uc3QgZ2FtZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lLWJ1dHRvbicpO1xyXG5jb25zdCBnYW1lUnVsZXNCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZS1ydWxlcy1idXR0b24nKTtcclxuXHJcbmNvbnN0IHdlbGNvbWVTY3JlZW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2VsY29tZS1zY3JlZW4nKTtcclxuY29uc3QgZ2FtZVJ1bGVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWUtcnVsZXMnKTtcclxuY29uc3QgYWJvdXRHYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Fib3V0LWdhbWUnKTtcclxuY29uc3QgZ2FtZUdyaWRTZWN0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWUnKTtcclxuY29uc3QgYm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYm9keVwiKTtcclxuLy8jZW5kcmVnaW9uXHJcblxyXG5cclxuY29uc3QgYm9vbSA9ICgpID0+IHtcclxuICAgIGxldCBpbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG4gICAgaW1hZ2Uuc2V0QXR0cmlidXRlKCdzcmMnLCAnLi9pbWFnZXMvYm9vbS5wbmcnKTtcclxuICAgIGltYWdlLmNsYXNzTGlzdC5hZGQoJ2JpZy1ib29tJyk7XHJcbiAgICBib2R5LmFwcGVuZENoaWxkKGltYWdlKTtcclxufTtcclxuXHJcbmNvbnN0IGdhbWVPdmVyID0gKCkgPT4ge1xyXG4gICAgbGV0IGltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICBpbWFnZS5zZXRBdHRyaWJ1dGUoJ3NyYycsICcuL2ltYWdlcy9nYW1lb3Zlci5wbmcnKTtcclxuICAgIGltYWdlLmNsYXNzTGlzdC5hZGQoJ2dhbWUtb3ZlcicpO1xyXG4gICAgZ2FtZUdyaWRTZWN0aW9uLmFwcGVuZENoaWxkKGltYWdlKTtcclxufTtcclxuXHJcbmNvbnN0IHdpbiA9ICgpID0+IHtcclxuICAgIGxldCBpbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG4gICAgaW1hZ2Uuc2V0QXR0cmlidXRlKCdzcmMnLCAnLi9pbWFnZXMvd2luLnBuZycpO1xyXG4gICAgaW1hZ2UuY2xhc3NMaXN0LmFkZCgnd2luJyk7XHJcbiAgICBnYW1lR3JpZFNlY3Rpb24uYXBwZW5kQ2hpbGQoaW1hZ2UpO1xyXG59O1xyXG5cclxuLy8jcmVnaW9uIC0gaGVhZGVyIG5hdlxyXG5cclxuY29uc3QgYWJvdXRHYW1lU2hvdyA9ICgpID0+IHtcclxuICAgIHdlbGNvbWVTY3JlZW4uY2xhc3NMaXN0LmFkZCgncmVtb3ZlJyk7XHJcbiAgICBnYW1lR3JpZFNlY3Rpb24uY2xhc3NMaXN0LmFkZCgncmVtb3ZlJyk7XHJcbiAgICBnYW1lUnVsZXMuY2xhc3NMaXN0LmFkZCgncmVtb3ZlJyk7XHJcbiAgICBhYm91dEdhbWUuY2xhc3NMaXN0LnJlbW92ZSgncmVtb3ZlJyk7XHJcbn07XHJcblxyXG5jb25zdCBnYW1lUnVsZXNTaG93ID0gKCkgPT4ge1xyXG4gICAgd2VsY29tZVNjcmVlbi5jbGFzc0xpc3QuYWRkKCdyZW1vdmUnKTtcclxuICAgIGdhbWVHcmlkU2VjdGlvbi5jbGFzc0xpc3QuYWRkKCdyZW1vdmUnKTtcclxuICAgIGdhbWVSdWxlcy5jbGFzc0xpc3QucmVtb3ZlKCdyZW1vdmUnKTtcclxuICAgIGFib3V0R2FtZS5jbGFzc0xpc3QuYWRkKCdyZW1vdmUnKTtcclxufTtcclxuXHJcbmNvbnN0IGdhbWVTaG93ID0gKCkgPT4ge1xyXG4gICAgd2VsY29tZVNjcmVlbi5jbGFzc0xpc3QuYWRkKCdyZW1vdmUnKTtcclxuICAgIGdhbWVHcmlkU2VjdGlvbi5jbGFzc0xpc3QucmVtb3ZlKCdyZW1vdmUnKTtcclxuICAgIGdhbWVSdWxlcy5jbGFzc0xpc3QuYWRkKCdyZW1vdmUnKTtcclxuICAgIGFib3V0R2FtZS5jbGFzc0xpc3QuYWRkKCdyZW1vdmUnKTtcclxufTtcclxuXHJcbmFib3V0R2FtZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFib3V0R2FtZVNob3cpO1xyXG5nYW1lUnVsZXNCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBnYW1lUnVsZXNTaG93KTtcclxuZ2FtZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGdhbWVTaG93KTtcclxuXHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuXHJcbmV4cG9ydCB7IGJvb20sIGdhbWVPdmVyLCB3aW4sIGdhbWVTaG93LCBnYW1lR3JpZFNlY3Rpb24gfTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvYW5pbWF0aW9uLnRzIl0sInNvdXJjZVJvb3QiOiIifQ==