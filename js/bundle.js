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
const playerNameInput = document.getElementById('username');
const gameOptionsSection = document.getElementById('game-options');
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
            // alert("BOOOOOOM.....You're dead!");
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
            // let target = event.target;
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
            // let flag = "\u2691";
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
            console.log(__WEBPACK_IMPORTED_MODULE_0__data__["b" /* Player */].getInstance().getName());
            console.log(__WEBPACK_IMPORTED_MODULE_0__data__["b" /* Player */].getInstance().getGameMode());
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
const gameModeInput = document.getElementById('gameMode');
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
const timerPlace = document.getElementById('timerPlace');
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
const scoreList = document.getElementById('scoreList');
const gameModeName = document.getElementById('modeName');
const modeNameHeading = document.getElementById('modeNameHeading');
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
    // scoreList.classList.remove('scoreDisplay');
    // gameModeName.classList.remove('scoreDisplay');
    console.log(rankingTable);
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
const tableButton = document.getElementById('table-button');
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
aboutGameButton.addEventListener('click', () => {
    __WEBPACK_IMPORTED_MODULE_0__data__["h" /* welcomeScreen */].classList.add('remove');
    __WEBPACK_IMPORTED_MODULE_0__data__["c" /* game */].classList.add('remove');
    gameRules.classList.add('remove');
    aboutGame.classList.remove('remove');
});
const gameShow = () => {
    __WEBPACK_IMPORTED_MODULE_0__data__["h" /* welcomeScreen */].classList.add('remove');
    __WEBPACK_IMPORTED_MODULE_0__data__["c" /* game */].classList.remove('remove');
    gameRules.classList.add('remove');
    aboutGame.classList.add('remove');
};
tableButton.addEventListener('click', gameShow);
gameRulesButton.addEventListener('click', () => {
    __WEBPACK_IMPORTED_MODULE_0__data__["h" /* welcomeScreen */].classList.add('remove');
    __WEBPACK_IMPORTED_MODULE_0__data__["c" /* game */].classList.add('remove');
    gameRules.classList.remove('remove');
    aboutGame.classList.add('remove');
});



/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYzVkMzYyYmUxNDFkMTBmYWEwZjQiLCJ3ZWJwYWNrOi8vLy4vYXBwL2RhdGEudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3RhYmxlR3JpZC50cyIsIndlYnBhY2s6Ly8vLi9hcHAvaGVscGVyRnVuY3MudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2FwcC50cyIsIndlYnBhY2s6Ly8vLi9hcHAvZ2FtZU1vZGUudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwL21pbmVzQW5kVGlwcy50cyIsIndlYnBhY2s6Ly8vLi9hcHAvZW1wdHlGbG93LnRzIiwid2VicGFjazovLy8uL2FwcC90aW1lci50cyIsIndlYnBhY2s6Ly8vLi9hcHAvcmFua2luZy50cyIsIndlYnBhY2s6Ly8vLi9hcHAvYW5pbWF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQzdEQTtBQUFBLHFCQUFxQjtBQUNyQixNQUFNLGVBQWUsR0FBc0IsUUFBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM1RSxNQUFNLGVBQWUsR0FBc0IsUUFBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM1RSxNQUFNLGVBQWUsR0FBcUIsUUFBUSxDQUFDLGNB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QU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNyQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNyQyxDQUFDLENBQUMsQ0FBQztBQUVxQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAzKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBjNWQzNjJiZTE0MWQxMGZhYTBmNCIsIi8vI3JlZ2lvbiAtIHNlbGVjdG9yc1xyXG5jb25zdCBnYW1lU3RhcnRCdXR0b24gPSA8SFRNTEJ1dHRvbkVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXJ0Jyk7XHJcbmNvbnN0IGdhbWVSZXNldEJ1dHRvbiA9IDxIVE1MQnV0dG9uRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzZXQnKTtcclxuY29uc3QgcGxheWVyTmFtZUlucHV0ID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXJuYW1lJyk7XHJcbmNvbnN0IGdhbWVPcHRpb25zU2VjdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lLW9wdGlvbnMnKTtcclxuY29uc3QgZ2FtZVNlY3Rpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZS1wbGFjZScpO1xyXG5jb25zdCB3ZWxjb21lU2NyZWVuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dlbGNvbWUtc2NyZWVuJyk7XHJcbmNvbnN0IGdhbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZScpO1xyXG4vLyNlbmRyZWdpb25cclxuXHJcbnBsYXllck5hbWVJbnB1dC52YWx1ZSA9IFwiXCI7XHJcblxyXG5cclxuLy8jcmVnaW9uIC0gR2FtZSBzaW5nbGV0b24gY2xhc3MgZGVmaW5pdGlvblxyXG5cclxuY2xhc3MgR2FtZSB7XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgX2luc3RhbmNlOiBHYW1lID0gbmV3IEdhbWUoKTtcclxuXHJcbiAgICBwcml2YXRlIF9tb2RlID0ge1xyXG4gICAgICAgIGJlZ2lubmVyOiBbOSwgOSwgMTBdLFxyXG4gICAgICAgIGludGVybWVkaWF0ZTogWzE2LCAxNiwgNDBdLFxyXG4gICAgICAgIGV4cGVydDogWzE2LCAzMCwgOTldLFxyXG4gICAgICAgIGN1c3RvbTogWzAsIDAsIDBdXHJcbiAgICB9O1xyXG5cclxuICAgIHByaXZhdGUgX2dhbWVUYWJsZTogSFRNTFRhYmxlRWxlbWVudDtcclxuXHJcbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogR2FtZSB7XHJcbiAgICAgICAgcmV0dXJuIEdhbWUuX2luc3RhbmNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBtb2RlSW5mbyhtb2RlTmFtZTogc3RyaW5nKTogbnVtYmVyW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tb2RlW21vZGVOYW1lXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0Q3VzdG9tTW9kZShpbmZvOiBudW1iZXJbXSkge1xyXG4gICAgICAgIHRoaXMuX21vZGUuY3VzdG9tID0gaW5mbztcclxuICAgICAgICBjb25zb2xlLmxvZyhgQ3VzdG9tIG1vZGUgc2V0IHRvICR7dGhpcy5fbW9kZS5jdXN0b219YCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldEdhbWVUYWJsZShlbGVtZW50KSB7XHJcbiAgICAgICAgdGhpcy5fZ2FtZVRhYmxlID0gZWxlbWVudDtcclxuICAgICAgICBjb25zb2xlLmxvZyhgVGFibGUgY3JlYXRlZGApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRHYW1lVGFibGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dhbWVUYWJsZTtcclxuICAgIH1cclxufVxyXG5cclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLyNyZWdpb24gLSBQbGF5ZXIgLSBzaW5nbGV0b24gY2xhc3MgZGVmaW5pdGlvblxyXG5jbGFzcyBQbGF5ZXIge1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IF9pbnN0YW5jZTogUGxheWVyID0gbmV3IFBsYXllcigpO1xyXG5cclxuICAgIHByaXZhdGUgX25hbWU6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBwcml2YXRlIF9nYW1lTW9kZTogc3RyaW5nID0gXCJub25lXCI7XHJcbiAgICBwcml2YXRlIF9zY29yZTogbnVtYmVyO1xyXG5cclxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBQbGF5ZXIge1xyXG4gICAgICAgIHJldHVybiBQbGF5ZXIuX2luc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgZ2V0TmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9uYW1lO1xyXG4gICAgfVxyXG4gICAgc2V0TmFtZSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKHZhbHVlID09PSAnJyl7dmFsdWUgPSAndW5rbm93biBwbGF5ZXInfVxyXG4gICAgICAgIHRoaXMuX25hbWUgPSB2YWx1ZTtcclxuICAgICAgICBjb25zb2xlLmxvZyhgUGxheWVycyBuYW1lIHNldCB0bzogJHt0aGlzLl9uYW1lfWApXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0R2FtZU1vZGUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZ2FtZU1vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0R2FtZU1vZGUodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2dhbWVNb2RlID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0U2NvcmUodmFsdWUpIHtcclxuICAgICAgICB0aGlzLl9zY29yZSA9IHZhbHVlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGBTY29yZSBzZXQgdG8gJHt0aGlzLl9zY29yZX1gKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTY29yZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2NvcmU7XHJcbiAgICB9XHJcbn1cclxuLy8jZW5kcmVnaW9uXHJcblxyXG5leHBvcnQgeyBHYW1lLCBQbGF5ZXIsIGdhbWVTdGFydEJ1dHRvbiwgZ2FtZVJlc2V0QnV0dG9uLCBwbGF5ZXJOYW1lSW5wdXQsIGdhbWVPcHRpb25zU2VjdGlvbiwgZ2FtZVNlY3Rpb24sd2VsY29tZVNjcmVlbixnYW1lIH07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL2RhdGEudHMiLCJpbXBvcnQgeyBHYW1lLCBQbGF5ZXIgfSBmcm9tICcuL2RhdGEnO1xyXG5cclxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1UQUJMRSBHUklEPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4vLyNyZWdpb24gLSBjcmVhdGVzIHRhYmxlIGdyaWQgZm9yIGdpdmVuIGdhbWUgbW9kZVxyXG5jb25zdCBjcmVhdGVHcmlkID0gKHJvd3NBbmRDb2xzOiBudW1iZXJbXSk6IHZvaWQgPT4ge1xyXG4gICAgbGV0IHRhYmxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGFibGUnKTtcclxuICAgIGxldCBjZWxsQ291bnRlciA9IDE7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJvd3NBbmRDb2xzWzBdOyBpKyspIHtcclxuICAgICAgICBsZXQgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKTtcclxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHJvd3NBbmRDb2xzWzFdOyBqKyspIHtcclxuICAgICAgICAgICAgbGV0IGNvbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XHJcbiAgICAgICAgICAgIGNvbC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBjZWxsQ291bnRlciArICdmaWVsZCcpO1xyXG4gICAgICAgICAgICBjb2wuc2V0QXR0cmlidXRlKFwiZGF0YS1pZFwiLCBjZWxsQ291bnRlciArICdmaWVsZCcpO1xyXG4gICAgICAgICAgICBjb2wuc2V0QXR0cmlidXRlKFwiZGF0YS1taW5lXCIsIFwiXCIpO1xyXG4gICAgICAgICAgICBjb2wuc2V0QXR0cmlidXRlKFwiZGF0YS1lbXB0eVwiLCBcIlwiKTtcclxuICAgICAgICAgICAgY29sLnNldEF0dHJpYnV0ZShcImRhdGEtY2xpY2tcIiwgXCJcIik7XHJcbiAgICAgICAgICAgIGNlbGxDb3VudGVyKys7XHJcbiAgICAgICAgICAgIHJvdy5hcHBlbmRDaGlsZChjb2wpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0YWJsZS5hcHBlbmRDaGlsZChyb3cpO1xyXG4gICAgfVxyXG4gICAgR2FtZS5nZXRJbnN0YW5jZSgpLnNldEdhbWVUYWJsZSh0YWJsZSk7XHJcbn07XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuXHJcbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Qk9SREVSUz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuLy8jcmVnaW9uIC0gY3JlYXRlcyBsZWZ0IGJvcmRlciBmb3IgdGFibGUgZ3JpZFxyXG5jb25zdCBjcmVhdGVMZWZ0Qm9yZGVyID0gKG51bU9mUm93czogbnVtYmVyLCBudW1PZkNvbHM6IG51bWJlcikgPT4ge1xyXG4gICAgbGV0IGxlZnRCb3JkZXJGaWVsZHM6IG51bWJlcltdID0gWzFdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1PZlJvd3MgLSAxOyBpKyspIHtcclxuICAgICAgICBsZXQgYm9yZGVyRmllbGQgPSBsZWZ0Qm9yZGVyRmllbGRzW2ldICsgbnVtT2ZDb2xzO1xyXG4gICAgICAgIGxlZnRCb3JkZXJGaWVsZHMucHVzaChib3JkZXJGaWVsZCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbGVmdEJvcmRlckZpZWxkcztcclxufVxyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vI3JlZ2lvbiAtIGNyZWF0ZXMgcmlnaHQgYm9yZGVyIGZvciB0YWJsZSBncmlkXHJcbmNvbnN0IGNyZWF0ZVJpZ2h0Qm9yZGVyID0gKG51bU9mUm93czogbnVtYmVyLCBudW1PZkNvbHM6IG51bWJlcikgPT4ge1xyXG4gICAgbGV0IHJpZ2h0Qm9yZGVyRmllbGRzOiBudW1iZXJbXSA9IFtudW1PZkNvbHNdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1PZlJvd3MgLSAxOyBpKyspIHtcclxuICAgICAgICBsZXQgYm9yZGVyRmllbGQgPSByaWdodEJvcmRlckZpZWxkc1tpXSArIG51bU9mQ29scztcclxuICAgICAgICByaWdodEJvcmRlckZpZWxkcy5wdXNoKGJvcmRlckZpZWxkKTtcclxuICAgIH1cclxuICAgIHJldHVybiByaWdodEJvcmRlckZpZWxkcztcclxufVxyXG4vLyNlbmRyZWdpb25cclxuXHJcblxyXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVNVUlJPVU5ESU5HPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbi8vI3JlZ2lvbiAtIGRlZmluZVN1cnJvdW5kaW5nKCkgLSBjcmVhdGVzIHN1cnJvdW5kaW5nIGJhc2VkIG9uIGZpZWxkIHBvc2l0aW9uIChiYXNlZCBvbiBpZClcclxuXHJcbmNvbnN0IGRlZmluZVN1cnJvdW5kaW5nID0gKHRhYmxlOiBFbGVtZW50LCBlbGVtZW50OiBIVE1MRWxlbWVudCkgPT4geyAvLyBkZWZpbmlzZW1vIG9rb2xuYSBwb2xqYSBuYSBvc25vdnUgZGF0b2cgcG9samEgaSBicm9qYSBrb2xvbmEgdGFiZWxlXHJcbiAgICBsZXQgc3Vycm91bmRpbmc7XHJcbiAgICBjb25zdCBpZCA9IHBhcnNlSW50KGVsZW1lbnQuaWQpO1xyXG4gICAgY29uc3QgZ2FtZU1vZGVJbmZvID0gR2FtZS5nZXRJbnN0YW5jZSgpLm1vZGVJbmZvKFBsYXllci5nZXRJbnN0YW5jZSgpLmdldEdhbWVNb2RlKCkpO1xyXG4gICAgY29uc3QgbnVtT2ZSb3dzID0gZ2FtZU1vZGVJbmZvWzBdO1xyXG4gICAgY29uc3QgbnVtT2ZDb2xzID0gZ2FtZU1vZGVJbmZvWzFdO1xyXG5cclxuICAgIC8vYmFzZSBzdXJyb3VuZGluZ1xyXG4gICAgY29uc3QgbGVmdCA9IHRhYmxlLnF1ZXJ5U2VsZWN0b3IoYFtpZD1cIiR7aWQgLSAxfWZpZWxkXCJdYCk7XHJcbiAgICBjb25zdCB1cExlZnQgPSB0YWJsZS5xdWVyeVNlbGVjdG9yKGBbaWQ9XCIke2lkIC0gbnVtT2ZDb2xzIC0gMX1maWVsZFwiXWApO1xyXG4gICAgY29uc3QgdXAgPSB0YWJsZS5xdWVyeVNlbGVjdG9yKGBbaWQ9XCIke2lkIC0gbnVtT2ZDb2xzfWZpZWxkXCJdYCk7XHJcbiAgICBjb25zdCB1cFJpZ2h0ID0gdGFibGUucXVlcnlTZWxlY3RvcihgW2lkPVwiJHtpZCAtIG51bU9mQ29scyArIDF9ZmllbGRcIl1gKTtcclxuICAgIGNvbnN0IHJpZ2h0ID0gdGFibGUucXVlcnlTZWxlY3RvcihgW2lkPVwiJHtpZCArIDF9ZmllbGRcIl1gKTtcclxuICAgIGNvbnN0IHJpZ2h0RG93biA9IHRhYmxlLnF1ZXJ5U2VsZWN0b3IoYFtpZD1cIiR7aWQgKyBudW1PZkNvbHMgKyAxfWZpZWxkXCJdYCk7XHJcbiAgICBjb25zdCBkb3duID0gdGFibGUucXVlcnlTZWxlY3RvcihgW2lkPVwiJHtpZCArIG51bU9mQ29sc31maWVsZFwiXWApO1xyXG4gICAgY29uc3QgZG93bkxlZnQgPSB0YWJsZS5xdWVyeVNlbGVjdG9yKGBbaWQ9XCIke2lkICsgbnVtT2ZDb2xzIC0gMX1maWVsZFwiXWApO1xyXG5cclxuICAgIC8vY3JlYXRlIGJvcmRlcnNcclxuICAgIGNvbnN0IGxlZnRCb3JkZXIgPSBjcmVhdGVMZWZ0Qm9yZGVyKG51bU9mUm93cywgbnVtT2ZDb2xzKTtcclxuICAgIGNvbnN0IHJpZ2h0Qm9yZGVyID0gY3JlYXRlUmlnaHRCb3JkZXIobnVtT2ZSb3dzLCBudW1PZkNvbHMpO1xyXG5cclxuICAgIC8vc3Vycm91bmRpbmcgYmFzZWQgb24gZmllbGQtYm9yZGVycyByZWxhdGlvblxyXG4gICAgaWYgKGxlZnRCb3JkZXIuaW5kZXhPZihpZCkgIT09IC0xKSB7XHJcbiAgICAgICAgc3Vycm91bmRpbmcgPSBbdXAsIHVwUmlnaHQsIHJpZ2h0LCByaWdodERvd24sIGRvd25dO1xyXG4gICAgfSBlbHNlIGlmIChyaWdodEJvcmRlci5pbmRleE9mKGlkKSAhPT0gLTEpIHtcclxuICAgICAgICBzdXJyb3VuZGluZyA9IFtsZWZ0LCB1cExlZnQsIHVwLCBkb3duLCBkb3duTGVmdF07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHN1cnJvdW5kaW5nID0gW2xlZnQsIHVwTGVmdCwgdXAsIHVwUmlnaHQsIHJpZ2h0LCByaWdodERvd24sIGRvd24sIGRvd25MZWZ0XTtcclxuICAgIH1cclxuICAgIHJldHVybiBzdXJyb3VuZGluZztcclxufVxyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuXHJcbmV4cG9ydCB7IGNyZWF0ZUdyaWQsZGVmaW5lU3Vycm91bmRpbmd9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC90YWJsZUdyaWQudHMiLCIvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVJBTkRPTSBGVU5DVElPTlM9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbi8vI3JlZ2lvbiAgLSBDcmVhdGVzIHJhbmRvbSBudW1iZXIgZm9yIHBhc3NlZCBtaW4gYW5kIG1heFxyXG5jb25zdCByYW5kb21OdW1iZXIgPSAobWF4TnVtOiBudW1iZXIsIG1pbk51bTogbnVtYmVyID0gMSk6IG51bWJlciA9PiB7XHJcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heE51bSAtIG1pbk51bSArIDEpICsgbWluTnVtKTtcclxufTtcclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLyNyZWdpb24gIC0gYXJyYXkgd2l0aCBzcGVjaWZpZWQgbnVtYmVyIG9mIHJhbmRvbSBudW1iZXJzXHJcbmNvbnN0IHJhbmRvbU51bWJlcnNBcnJheSA9IChhcnJMZW5ndGg6IG51bWJlciwgbWF4TnVtOiBudW1iZXIsIG1pbk51bTogbnVtYmVyID0gMSk6IG51bWJlcltdID0+IHtcclxuICAgIGxldCBhcnJheTogbnVtYmVyW10gPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyTGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgbmV3TnVtID0gcmFuZG9tTnVtYmVyKG1heE51bSwgbWluTnVtKTtcclxuICAgICAgICB3aGlsZSAoYXJyYXkuaW5kZXhPZihuZXdOdW0pICE9PSAtMSkge1xyXG4gICAgICAgICAgICBuZXdOdW0gPSByYW5kb21OdW1iZXIobWluTnVtLCBtYXhOdW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBhcnJheS5wdXNoKG5ld051bSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXJyYXk7XHJcbn1cclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbi8vI3JlZ2lvbiAtIHByZXZlbnRNZW51KCkgLSBuZW1hIGRlc25pIGtsaWsgbWVuaSBuYSB0YWJsaVxyXG5jb25zdCBwcmV2ZW50VGFibGVNZW51ID0gKGV2ZW50KTp2b2lkID0+IHtcclxuICAgIGxldCBjbGlja2VkUGxhY2UgPSBldmVudC50YXJnZXQ7XHJcbiAgICBpZiAoY2xpY2tlZFBsYWNlLnRhZ05hbWUgPT09IFwiVERcIiB8fCBjbGlja2VkUGxhY2UudGFnTmFtZSA9PT0gXCJUQUJMRVwiIHx8IGNsaWNrZWRQbGFjZS50YWdOYW1lID09PSBcIklNR1wiKSB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIH1cclxufVxyXG4vLyNlbmRyZWdpb25cclxuXHJcbmV4cG9ydCB7IHJhbmRvbU51bWJlcnNBcnJheSwgcHJldmVudFRhYmxlTWVudSB9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9oZWxwZXJGdW5jcy50cyIsImltcG9ydCB7IEdhbWUsIFBsYXllciwgZ2FtZU9wdGlvbnNTZWN0aW9uLCBnYW1lU3RhcnRCdXR0b24sIGdhbWVSZXNldEJ1dHRvbiwgZ2FtZVNlY3Rpb24sZ2FtZSwgcGxheWVyTmFtZUlucHV0LHdlbGNvbWVTY3JlZW4gfSBmcm9tICcuL2RhdGEnO1xyXG5pbXBvcnQgeyBnYW1lTW9kZSwgZ2FtZU1vZGVJbnB1dCB9IGZyb20gJy4vZ2FtZU1vZGUnO1xyXG5pbXBvcnQgeyBjcmVhdGVHcmlkIH0gZnJvbSAnLi90YWJsZUdyaWQnO1xyXG5pbXBvcnQgeyBzZXRNaW5lcywgY2xlYXJNaW5lcywgc2hvd01pbmVzLCB3cml0ZVRpcHMgfSBmcm9tICcuL21pbmVzQW5kVGlwcyc7XHJcbmltcG9ydCB7IG9wZW5FbXB0eUVsZW1lbnQsIHN0b3BDbGljayB9IGZyb20gJy4vZW1wdHlGbG93JztcclxuaW1wb3J0IHsgcHJldmVudFRhYmxlTWVudSB9IGZyb20gJy4vaGVscGVyRnVuY3MnO1xyXG5pbXBvcnQgeyBzdGFydFRpbWVySGFuZGxlciwgc3RvcFRpbWVySGFuZGxlciwgcmVzZXRUaW1lciwgdGltZXJQbGFjZSwgY2FsY1Njb3JlIH0gZnJvbSAnLi90aW1lcic7XHJcbmltcG9ydCB7IGhhbmRsZVJhbmtpbmcgfSBmcm9tICcuL3JhbmtpbmcnO1xyXG5pbXBvcnQgeyBib29tLCBnYW1lT3Zlciwgd2luLGdhbWVTaG93IH0gZnJvbSAnLi9hbmltYXRpb24nO1xyXG5cclxuXHJcbmNvbnN0IG1pbmVJY29uID0gXCJcXHVEODNEXFx1RENBM1wiOyAvLyBkZWZpbmlzZW1vIGlrb25pY3UgemEgbWludSB1IG5la29tIG1vbWVudHVcclxubGV0IGNsaWNrQ291bnRlciA9IDA7IC8vIGZvbGxvd3MgY2xpY2tzXHJcblxyXG4vLyNyZWdpb24gLSBtYW5hZ2VJbnB1dHMoKSAtIG1hbmFnZSBpbnB1dHMgb24gZG9jdW1lbnQgYmFzZWQgb24gZXZlbnRcclxuY29uc3QgbWFuYWdlSW5wdXRzID0gKGV2ZW50KTogc3RyaW5nID0+IHtcclxuICAgIGlmIChldmVudC50YXJnZXQuaWQgPT09IFwic3RhcnRcIikge1xyXG5cclxuICAgICAgICBwbGF5ZXJOYW1lSW5wdXQuc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICd0cnVlJyk7XHJcbiAgICAgICAgZ2FtZU1vZGVJbnB1dC5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ3RydWUnKTtcclxuICAgICAgICBnYW1lU3RhcnRCdXR0b24uc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICd0cnVlJyk7XHJcbiAgICAgICAgZ2FtZVJlc2V0QnV0dG9uLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcclxuICAgICAgICByZXR1cm4gXCJzdGFydFwiO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoZXZlbnQudGFyZ2V0LmlkID09PSBcInJlc2V0XCIpIHtcclxuICAgICAgICBnYW1lUmVzZXRCdXR0b24uc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICd0cnVlJyk7XHJcbiAgICAgICAgZ2FtZVN0YXJ0QnV0dG9uLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcclxuICAgICAgICBnYW1lTW9kZUlucHV0LnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcclxuICAgICAgICBnYW1lTW9kZUlucHV0LnZhbHVlID0gJ2JlZ2lubmVyJztcclxuICAgICAgICBwbGF5ZXJOYW1lSW5wdXQucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xyXG4gICAgICAgIGdhbWVTaG93KCk7XHJcbiAgICAgICAgZ2FtZS5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgICAgIGNsaWNrQ291bnRlciA9IDA7XHJcbiAgICAgICAgc3RvcFRpbWVySGFuZGxlcigpO1xyXG4gICAgICAgIHJlc2V0VGltZXIoKTtcclxuICAgICAgICB0aW1lclBsYWNlLnRleHRDb250ZW50ID0gXCIwMCA6IDAwIDogMDBcIjtcclxuICAgICAgICByZXR1cm4gXCJyZXNldFwiO1xyXG4gICAgfVxyXG59O1xyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vI3JlZ2lvbiAtIGNoZWNrTW92ZSgpIC0gcHJvdmVyYXZhIHBvdGV6IGkgcHJlZHV6aW1hIGRhbGplIGtvcmFrZVxyXG5jb25zdCBjaGVja01vdmUgPSAoZWxlbWVudDogSFRNTEVsZW1lbnQpID0+IHtcclxuICAgIGNvbnN0IHRhYmxlID0gR2FtZS5nZXRJbnN0YW5jZSgpLmdldEdhbWVUYWJsZSgpO1xyXG4gICAgY29uc3QgYXR0cmlidXRlID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLW1pbmVcIik7XHJcbiAgICBpZiAoYXR0cmlidXRlID09PSBcIlxcdUQ4M0RcXHVEQ0EzXCIpIHtcclxuICAgICAgICBpZiAoY2xpY2tDb3VudGVyID09PSAxKSB7XHJcbiAgICAgICAgICAgIHBsYW50TWluZXNBZ2FpbigpO1xyXG4gICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBvbkZpZWxkQ2xpY2spO1xyXG4gICAgICAgICAgICBjaGVja01vdmUoZWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnQuaWQpLmNsaWNrKCk7XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBib21iID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICAgICAgICAgIGJvbWIuc2V0QXR0cmlidXRlKCdzcmMnLCAnLi9pbWFnZXMvbWluZTUwLnBuZycpO1xyXG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2VtcHR5Jyk7XHJcbiAgICAgICAgICAgIHN0b3BUaW1lckhhbmRsZXIoKTtcclxuXHJcbiAgICAgICAgICAgIHRhYmxlLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBvbkZpZWxkQ2xpY2spO1xyXG4gICAgICAgICAgICB0YWJsZS5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGZsYWdJdCk7XHJcblxyXG5cclxuICAgICAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChib21iKTtcclxuICAgICAgICAgICAgc2hvd01pbmVzKHRhYmxlLCBtaW5lSWNvbik7XHJcbiAgICAgICAgICAgIGJvb20oKTtcclxuICAgICAgICAgICAgLy8gYWxlcnQoXCJCT09PT09PTS4uLi4uWW91J3JlIGRlYWQhXCIpO1xyXG5cclxuICAgICAgICAgICAgdGFibGUuY2xhc3NMaXN0LmFkZCgndGFibGUnKTtcclxuICAgICAgICAgICAgZ2FtZU92ZXIoKTtcclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoYXR0cmlidXRlID09PSBcIlwiKSB7XHJcbiAgICAgICAgb3BlbkVtcHR5RWxlbWVudCg8YW55PmVsZW1lbnQpO1xyXG4gICAgICAgIGNoZWNrUmVzdWx0KCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBlbGVtZW50LnRleHRDb250ZW50ID0gYXR0cmlidXRlO1xyXG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnY2xpY2tlZCcpO1xyXG4gICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKFwiZGF0YS1jbGlja1wiLCBcIjFcIik7XHJcbiAgICAgICAgY2hlY2tSZXN1bHQoKTtcclxuICAgIH1cclxufVxyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vI3JlZ2lvbiAtIGZsYWdJdCgpIC0gcG9zdGF2bGphbmplIHphc3RhdmUgbmEgZGVzbmkga2xpa1xyXG5jb25zdCBmbGFnSXQgPSAoZXZlbnQ6IGFueSkgPT4ge1xyXG4gICAgbGV0IGVsZW1lbnQgPSBldmVudC50YXJnZXQ7XHJcbiAgICBpZiAoZWxlbWVudC50YWdOYW1lID09PSBcIlREXCIpIHtcclxuICAgICAgICBpZiAoZXZlbnQud2hpY2ggPT09IDMpIHtcclxuICAgICAgICAgICAgLy8gbGV0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcclxuICAgICAgICAgICAgbGV0IGZsYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgICAgICAgICAgaWYgKFBsYXllci5nZXRJbnN0YW5jZSgpLmdldEdhbWVNb2RlKCkgPT09ICdiZWdpbm5lcicpIHtcclxuICAgICAgICAgICAgICAgIGZsYWcuc2V0QXR0cmlidXRlKCdzcmMnLCAnLi9pbWFnZXMvZmxhZ0IucG5nJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoUGxheWVyLmdldEluc3RhbmNlKCkuZ2V0R2FtZU1vZGUoKSA9PT0gJ2ludGVybWVkaWF0ZScpIHtcclxuICAgICAgICAgICAgICAgIGZsYWcuc2V0QXR0cmlidXRlKCdzcmMnLCAnLi9pbWFnZXMvZmxhZ0kucG5nJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7IGZsYWcuc2V0QXR0cmlidXRlKCdzcmMnLCAnLi9pbWFnZXMvZmxhZ0UucG5nJyk7IH1cclxuICAgICAgICAgICAgZmxhZy5jbGFzc0xpc3QuYWRkKCdmbGFnJyk7XHJcblxyXG5cclxuICAgICAgICAgICAgLy8gbGV0IGZsYWcgPSBcIlxcdTI2OTFcIjtcclxuICAgICAgICAgICAgaWYgKGVsZW1lbnQuaW5uZXJIVE1MID09PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKGZsYWcpO1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdlbXB0eScpO1xyXG4gICAgICAgICAgICAgICAgY2hlY2tSZXN1bHQoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfSBlbHNlIGlmIChlbGVtZW50LnRhZ05hbWUgPT09IFwiSU1HXCIpIHtcclxuICAgICAgICBpZiAoZXZlbnQud2hpY2ggPT09IDMpIHtcclxuICAgICAgICAgICAgZWxlbWVudC5wYXJlbnROb2RlLmNsYXNzTGlzdC5yZW1vdmUoJ2VtcHR5Jyk7XHJcbiAgICAgICAgICAgIGVsZW1lbnQucGFyZW50Tm9kZS5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLyNyZWdpb24gLSBwbGFudE1pbmVzQWdhaW4oKVxyXG5sZXQgcGxhbnRNaW5lc0FnYWluID0gKCkgPT4ge1xyXG4gICAgY29uc3QgdGFibGUgPSBHYW1lLmdldEluc3RhbmNlKCkuZ2V0R2FtZVRhYmxlKCk7XHJcbiAgICBsZXQgZ2FtZU1vZGVJbmZvID0gZ2FtZU1vZGUoZ2FtZU1vZGVJbnB1dC52YWx1ZSkgYXMgbnVtYmVyW107XHJcbiAgICBjbGVhck1pbmVzKHRhYmxlKTtcclxuICAgIHNldE1pbmVzKHRhYmxlLCBnYW1lTW9kZUluZm8sIG1pbmVJY29uKTtcclxuICAgIHdyaXRlVGlwcyh0YWJsZSk7XHJcbn07XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uIC0gY2hlY2tSZXN1bHQoKSAtIHByb3ZlcmF2YSByZXp1bHRhdFxyXG5mdW5jdGlvbiBjaGVja1Jlc3VsdCgpIHtcclxuICAgIGNvbnN0IHRhYmxlID0gR2FtZS5nZXRJbnN0YW5jZSgpLmdldEdhbWVUYWJsZSgpO1xyXG4gICAgbGV0IGdhbWVNb2RlSW5mbyA9IGdhbWVNb2RlKGdhbWVNb2RlSW5wdXQudmFsdWUpIGFzIG51bWJlcltdO1xyXG4gICAgbGV0IGNsb3NlZDogYW55ID0gW107XHJcbiAgICBsZXQgYWxsRmllbGRzID0gdGFibGUucXVlcnlTZWxlY3RvckFsbChcInRkXCIpO1xyXG4gICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChhbGxGaWVsZHMsIChmaWVsZDogYW55KSA9PiB7XHJcbiAgICAgICAgaWYgKGZpZWxkLmdldEF0dHJpYnV0ZShcImRhdGEtY2xpY2tcIiwgXCIxXCIpKSB7XHJcbiAgICAgICAgICAgIGNsb3NlZC5wdXNoKGZpZWxkKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoKGNsb3NlZC5sZW5ndGggPT09ICgoZ2FtZU1vZGVJbmZvWzBdICogZ2FtZU1vZGVJbmZvWzFdKSAtIGdhbWVNb2RlSW5mb1syXSkpKSB7XHJcbiAgICAgICAgc3RvcFRpbWVySGFuZGxlcigpO1xyXG4gICAgICAgIFBsYXllci5nZXRJbnN0YW5jZSgpLnNldFNjb3JlKGNhbGNTY29yZSgpKTtcclxuICAgICAgICB0YWJsZS5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgb25GaWVsZENsaWNrKTtcclxuICAgICAgICB0YWJsZS5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGZsYWdJdCk7XHJcbiAgICAgICAgaGFuZGxlUmFua2luZygpO1xyXG4gICAgICAgIHdpbigpO1xyXG4gICAgICAgIHRhYmxlLmNsYXNzTGlzdC5hZGQoJ3RhYmxlJyk7XHJcbiAgICB9XHJcbn1cclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLyNyZWdpb24gb25GaWVsZENsaWNrKCkgLSBkZWZpbmlzZSByYXNwb3JlZCBuYSBrbGlrXHJcbmNvbnN0IG9uRmllbGRDbGljayA9IChldmVudDogYW55KSA9PiB7XHJcbiAgICBsZXQgZmllbGQgPSBldmVudC50YXJnZXQ7XHJcbiAgICBpZiAoZmllbGQudGFnTmFtZSA9PT0gXCJURFwiKSB7XHJcbiAgICAgICAgZmllbGQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHN0b3BDbGljayk7XHJcbiAgICAgICAgZmllbGQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBzdG9wQ2xpY2spO1xyXG4gICAgICAgIGNsaWNrQ291bnRlcisrO1xyXG4gICAgICAgIGlmIChjbGlja0NvdW50ZXIgPT09IDEpIHsgc3RhcnRUaW1lckhhbmRsZXIoKSB9O1xyXG4gICAgICAgIGNoZWNrTW92ZShmaWVsZCk7XHJcbiAgICB9XHJcbn07XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uIC0gcHJpbnRHcmlkKCkgLSBjcmVhdGVzIGZ1bGwgR3JpZCBhbmQgYWRkcyBpdCB0byB0aGUgZG9jdW1lbnRcclxuY29uc3QgcHJpbnRHcmlkID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgbGV0IGdhbWVNb2RlSW5mbyA9IGdhbWVNb2RlKGdhbWVNb2RlSW5wdXQudmFsdWUpIGFzIG51bWJlcltdO1xyXG4gICAgLy9jcmVhdGUgdGFibGVcclxuICAgIGNyZWF0ZUdyaWQoZ2FtZU1vZGVJbmZvKTtcclxuICAgIGNvbnN0IHRhYmxlID0gR2FtZS5nZXRJbnN0YW5jZSgpLmdldEdhbWVUYWJsZSgpO1xyXG4gICAgdGFibGUuY2xhc3NMaXN0LmFkZChQbGF5ZXIuZ2V0SW5zdGFuY2UoKS5nZXRHYW1lTW9kZSgpKTtcclxuICAgIC8vc2V0IG1pbmVzXHJcbiAgICBzZXRNaW5lcyh0YWJsZSwgZ2FtZU1vZGVJbmZvLCBtaW5lSWNvbik7XHJcbiAgICAvLyAvLyAvL3NldCB0aXBzXHJcbiAgICB3cml0ZVRpcHModGFibGUpO1xyXG4gICAgLy8gLy8gLy9wcmludCB0YWJsZVxyXG4gICAgZ2FtZS5hcHBlbmRDaGlsZCh0YWJsZSk7XHJcbiAgICAvLyAvL3NldCBsaXN0ZW5lcnNcclxuICAgIHRhYmxlLmFkZEV2ZW50TGlzdGVuZXIoXCJjb250ZXh0bWVudVwiLCBwcmV2ZW50VGFibGVNZW51KTtcclxuICAgIHRhYmxlLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgZmxhZ0l0KTtcclxuICAgIHRhYmxlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25GaWVsZENsaWNrKTtcclxuXHJcbn07XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uIC0gb25DbGljaygpIC0gbWFpbiBmdW5jdGlvblxyXG5jb25zdCBvbkNsaWNrID0gKGV2ZW50KTogdm9pZCA9PiB7XHJcbiAgICBpZiAoZXZlbnQudGFyZ2V0LnRhZ05hbWUgPT09IFwiQlVUVE9OXCIpIHtcclxuICAgICAgICBpZiAobWFuYWdlSW5wdXRzKGV2ZW50KSA9PT0gJ3N0YXJ0Jykge1xyXG4gICAgICAgICAgICBQbGF5ZXIuZ2V0SW5zdGFuY2UoKS5zZXROYW1lKHBsYXllck5hbWVJbnB1dC52YWx1ZSk7XHJcbiAgICAgICAgICAgIGdhbWVTaG93KCk7XHJcbiAgICAgICAgICAgIHByaW50R3JpZCgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhQbGF5ZXIuZ2V0SW5zdGFuY2UoKS5nZXROYW1lKCkpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhQbGF5ZXIuZ2V0SW5zdGFuY2UoKS5nZXRHYW1lTW9kZSgpKTtcclxuICAgICAgICAgICAgaGFuZGxlUmFua2luZygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLyNyZWdpb24gLSBnYW1lT3B0aW9uc1NlY3Rpb24gZXZlbnQgbGlzdGVuZXJzXHJcbmdhbWVPcHRpb25zU2VjdGlvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uQ2xpY2spO1xyXG4vLyNlbmRyZWdpb25cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvYXBwLnRzIiwiaW1wb3J0IHsgR2FtZSwgUGxheWVyIH0gZnJvbSAnLi9kYXRhJztcclxuXHJcbi8vI3JlZ2lvbiAtIHNlbGVjdG9yc1xyXG4vLyBjb25zdCBjdXN0b21Sb3dzSW5wdXQgPSA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3VzdG9tUm93cycpO1xyXG4vLyBjb25zdCBjdXN0b21Db2xzSW5wdXQgPSA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3VzdG9tQ29scycpO1xyXG4vLyBjb25zdCBjdXN0b21NaW5lc0lucHV0ID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2N1c3RvbU1pbmVzJyk7XHJcbmNvbnN0IGdhbWVNb2RlSW5wdXQgPSA8SFRNTFNlbGVjdEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWVNb2RlJyk7XHJcbi8vIGNvbnN0IGN1c3RvbU1vZGVPcHRpb25zID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjdXN0b21Nb2RlT3B0aW9ucycpO1xyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vIC8vI3JlZ2lvbiAtIGdldEN1c3RvbVByb3BzKCkgLSBnZXRzIGN1c3RvbSBwcm9wZXJ0aWVzIGZyb20gdXNlciBpbnB1dFxyXG4vLyBjb25zdCBnZXRDdXN0b21Qcm9wcyA9ICgpID0+IHtcclxuLy8gICAgIGxldCBjdXN0b21Qcm9wcyA9IFtcclxuLy8gICAgICAgICBwYXJzZUludChjdXN0b21Sb3dzSW5wdXQudmFsdWUpLFxyXG4vLyAgICAgICAgIHBhcnNlSW50KGN1c3RvbUNvbHNJbnB1dC52YWx1ZSksXHJcbi8vICAgICAgICAgcGFyc2VJbnQoY3VzdG9tTWluZXNJbnB1dC52YWx1ZSksXHJcbi8vICAgICBdO1xyXG4vLyAgICAgcmV0dXJuIGN1c3RvbVByb3BzO1xyXG4vLyB9XHJcbi8vIC8vI2VuZHJlZ2lvblxyXG5cclxuLy8gLy8jcmVnaW9uIC0gZGlzcGxheUN1c3RvbU1vZGVPcHRzKCkgLSBoaWRlcyBvciBzaG93cyBkaXYgd2l0aCBjdXN0b20gZ2FtZSBvcHRpb25zIGluIGRvY3VtZW50XHJcbi8vIGxldCBkaXNwbGF5Q3VzdG9tTW9kZU9wdGlvbnMgPSAoKTogdm9pZCA9PiB7XHJcbi8vICAgICBpZiAoZ2FtZU1vZGVJbnB1dC52YWx1ZSA9PT0gXCJjdXN0b21cIikge1xyXG4vLyAgICAgICAgIGN1c3RvbU1vZGVPcHRpb25zIS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcclxuLy8gICAgIH0gZWxzZSB7IGN1c3RvbU1vZGVPcHRpb25zIS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTsgfVxyXG4vLyB9O1xyXG4vLyAvLyNlbmRyZWdpb25cclxuXHJcbi8vIC8vI3JlZ2lvbiAtIGN1c3RvbUlucHV0VmFsaWRhdGlvbigpIC0gY3VzdG9tIGdhbWUgbW9kZSBpbnB1dCB2YWxpZGF0aW9uXHJcbi8vIGNvbnN0IGN1c3RvbUlucHV0VmFsaWRhdGlvbiA9IChtb2RlSW5mbzogbnVtYmVyW10pID0+IHsvL2dhbWUgbW9kZSBpbmZvIFtyb3dzLGNvbHMsbWluZXNdXHJcbi8vICAgICBpZiAobW9kZUluZm9bMl0gPj0gbW9kZUluZm9bMF0gKiBtb2RlSW5mb1sxXSkgeyAgLy9udW0gb2YgbWluZXMgdmFsaWRhdGlvbixjYW4ndCBiZSBtb3JlIG1pbmVzIHRoYW4gZmllbGRzIG9yIGVxdWFsIHRvIG51bSBvZiBmaWVsZHNcclxuLy8gICAgICAgICBhbGVydChcIkNhbid0IGhhdmUgbW9yZSBtaW5lcyB0aGFuIGZpZWxkc1wiKTtcclxuLy8gICAgICAgICByZXR1cm4gZmFsc2U7XHJcbi8vICAgICB9IHJldHVybiB0cnVlO1xyXG4vLyB9O1xyXG4vLyAvLyNlbmRyZWdpb25cclxuXHJcbi8vI3JlZ2lvbiAtIGdhbWVNb2RlKCkgLSBnYW1lIG1vZGUgc3dpdGNoZXJcclxuY29uc3QgZ2FtZU1vZGUgPSAobW9kZTogc3RyaW5nKTogbnVtYmVyW10gfCBzdHJpbmcgPT4ge1xyXG4gICAgc3dpdGNoIChtb2RlKSB7XHJcbiAgICAgICAgY2FzZSBcImJlZ2lubmVyXCI6XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR2FtZSBtb2RlOiBCZWdpbm5lciA5eDkgdGFibGUgd2l0aCAxMCBtaW5lc1wiKTtcclxuICAgICAgICAgICAgUGxheWVyLmdldEluc3RhbmNlKCkuc2V0R2FtZU1vZGUobW9kZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBHYW1lLmdldEluc3RhbmNlKCkubW9kZUluZm8obW9kZSk7XHJcbiAgICAgICAgY2FzZSBcImludGVybWVkaWF0ZVwiOlxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdhbWUgbW9kZTogSW50ZXJtZWRpYXRlIDE2eDE2IHRhYmxlIHdpdGggNDAgbWluZXNcIik7XHJcbiAgICAgICAgICAgIFBsYXllci5nZXRJbnN0YW5jZSgpLnNldEdhbWVNb2RlKG1vZGUpO1xyXG4gICAgICAgICAgICByZXR1cm4gR2FtZS5nZXRJbnN0YW5jZSgpLm1vZGVJbmZvKG1vZGUpO1xyXG4gICAgICAgIGNhc2UgXCJleHBlcnRcIjpcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJHYW1lIG1vZGU6IEV4cGVydCAxNngzMCB0YWJsZSB3aXRoIDk5IG1pbmVzXCIpO1xyXG4gICAgICAgICAgICBQbGF5ZXIuZ2V0SW5zdGFuY2UoKS5zZXRHYW1lTW9kZShtb2RlKTtcclxuICAgICAgICAgICAgcmV0dXJuIEdhbWUuZ2V0SW5zdGFuY2UoKS5tb2RlSW5mbyhtb2RlKTtcclxuICAgICAgICAvLyBjYXNlIFwiY3VzdG9tXCI6XHJcbiAgICAgICAgLy8gICAgIFBsYXllci5nZXRJbnN0YW5jZSgpLnNldEdhbWVNb2RlKG1vZGUpO1xyXG4gICAgICAgIC8vICAgICBpZiAoY3VzdG9tSW5wdXRWYWxpZGF0aW9uKGdldEN1c3RvbVByb3BzKCkpID09PSBmYWxzZSkgeyByZXR1cm4gZ2FtZU1vZGUoXCJWYWxpZGF0aW9uXCIpIH1cclxuICAgICAgICAvLyAgICAgR2FtZS5nZXRJbnN0YW5jZSgpLnNldEN1c3RvbU1vZGUoZ2V0Q3VzdG9tUHJvcHMoKSk7XHJcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKGBHYW1lIG1vZGU6IEN1c3RvbSAke0dhbWUuZ2V0SW5zdGFuY2UoKS5tb2RlSW5mbyhtb2RlKVswXX14JHtHYW1lLmdldEluc3RhbmNlKCkubW9kZUluZm8obW9kZSlbMV19IHRhYmxlIHdpdGggJHtHYW1lLmdldEluc3RhbmNlKCkubW9kZUluZm8obW9kZSlbMl19IG1pbmUocylgKTtcclxuICAgICAgICAvLyAgICAgcmV0dXJuIEdhbWUuZ2V0SW5zdGFuY2UoKS5tb2RlSW5mbyhtb2RlKTtcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICBpZiAobW9kZSA9PT0gXCJWYWxpZGF0aW9uXCIpIHsgY29uc29sZS5lcnJvcihcIlZhbGlkYXRpb24gaXNzdWVcIik7IHJldHVybiBcImVycm9yIVwiIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdUaGVyZSBpcyBubyBnYW1lIG1vZGUgd2l0aCB0aGF0IG51bWJlciEnKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBcImVycm9yIVwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uIC0gZXZlbnQgbGlzdGVuZXJuc1xyXG5nYW1lTW9kZUlucHV0LnZhbHVlID0gXCJiZWdpbm5lclwiO1xyXG4vLyBnYW1lTW9kZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGRpc3BsYXlDdXN0b21Nb2RlT3B0aW9ucyk7XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuZXhwb3J0IHsgZ2FtZU1vZGUsIGdhbWVNb2RlSW5wdXQgfTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvZ2FtZU1vZGUudHMiLCJpbXBvcnQgeyBHYW1lLCBQbGF5ZXIgfSBmcm9tICcuL2RhdGEnO1xyXG5pbXBvcnQgeyBkZWZpbmVTdXJyb3VuZGluZyB9IGZyb20gJy4vdGFibGVHcmlkJztcclxuaW1wb3J0IHsgcmFuZG9tTnVtYmVyc0FycmF5IH0gZnJvbSAnLi9oZWxwZXJGdW5jcyc7XHJcbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09TUlORVM9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyNyZWdpb24gY3JlYXRlTWluZXMoKSAtIGNyZWF0ZSBtaW5lcyBiYXNlZCBvbiBnYW1lTW9kZVxyXG5jb25zdCBjcmVhdGVNaW5lcyA9IChtb2RlSW5mbzogbnVtYmVyW10pOiBudW1iZXJbXSA9PiB7Ly8ga3JlaXJhIG1pbmUgaSBzb3J0aXJhIGloIHBvIHZlbGljaW5pXHJcbiAgICBsZXQgbWluZXMgPSByYW5kb21OdW1iZXJzQXJyYXkobW9kZUluZm9bMl0sIChtb2RlSW5mb1swXSAqIG1vZGVJbmZvWzFdKSkuc29ydCgoYSwgYikgPT4geyByZXR1cm4gYSAtIGIgfSk7XHJcbiAgICBjb25zb2xlLmxvZyhcIk1pbmVzIGxvY2F0aW9uOiBcIiArIG1pbmVzKTsgLy8gcHJvdmVyYXZhbW8gcG96aWNpanUgbWluYSAvLyB6YSBkZXYgcG90cmViZVxyXG4gICAgcmV0dXJuIG1pbmVzO1xyXG59XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uIC0gc2V0TWluZXMoKSAtIHNldCBtaW5lcyBvbiB0YWJsZSAoYmluZCB0byBhdHRyaWJ1dGUgZGF0YS1taW5lKVxyXG5jb25zdCBzZXRNaW5lcyA9ICh0YWJsZTogSFRNTEVsZW1lbnQsIG1vZGVJbmZvOiBudW1iZXJbXSwgbWluZUljb246IGFueSk6IHZvaWQgPT4ge1xyXG4gICAgbGV0IG1pbmVzOiBudW1iZXJbXSA9IGNyZWF0ZU1pbmVzKG1vZGVJbmZvKTsvL2tyZWlyYW1vIG1pbmVcclxuICAgIGNvbnN0IGFsbEZpZWxkcyA9IHRhYmxlLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwidGRcIik7IC8vIHV6aW1hbW8gc3ZlIHRkIGVsZW1lbnRlIGl6IHRhYmVsZVxyXG4gICAgbWluZXMuZm9yRWFjaChtaW5lID0+IHsgIC8vIHBvc3RhdmxqYW1vIGlrb251IGJvbWJhIG5hIHN2YWtpIHRkIGtvamkgc2UgcG9rbGFwYSBzYSBuaXpvbSBtaW5hLlxyXG4gICAgICAgIGFsbEZpZWxkc1sobWluZSAtIDEpXS5zZXRBdHRyaWJ1dGUoXCJkYXRhLW1pbmVcIiwgbWluZUljb24pOyAvLyAtMSB6Ym9nIHJhemxpa2UgdSBwb3ppY2lqaSBwb2xqYSB1IG5penUgYWxsZmllbGRzIGkgcG96aWNpamUgbWluZVxyXG4gICAgfSk7XHJcbn1cclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLyNyZWdpb24gLSBjbGVhck1pbmVzKCkgLSBjbGVhciBtaW5lcyBmcm9tIHRhYmxlXHJcbmNvbnN0IGNsZWFyTWluZXMgPSAodGFibGU6IEhUTUxFbGVtZW50KTogdm9pZCA9PiB7XHJcbiAgICBjb25zdCBhbGxGaWVsZHMgPSB0YWJsZS5nZXRFbGVtZW50c0J5VGFnTmFtZShcInRkXCIpO1xyXG4gICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChhbGxGaWVsZHMsIChmaWVsZDogSFRNTFRhYmxlRGF0YUNlbGxFbGVtZW50KSA9PiB7XHJcbiAgICAgICAgZmllbGQuc2V0QXR0cmlidXRlKCdkYXRhLW1pbmUnLCAnJyk7XHJcbiAgICB9KTtcclxufVxyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vI3JlZ2lvbiAtIHNob3dNaW5lcygpIC0gc2hvdyBtaW5lcyBvbiBncmlkXHJcbmNvbnN0IHNob3dNaW5lcyA9ICh0YWJsZSwgbWluZUljb24pID0+IHtcclxuICAgIGNvbnN0IGFsbEZpZWxkcyA9IHRhYmxlLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwidGRcIik7XHJcbiAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKGFsbEZpZWxkcywgKGZpZWxkOiBIVE1MVGFibGVEYXRhQ2VsbEVsZW1lbnQpID0+IHtcclxuICAgICAgICBpZiAoZmllbGQuZ2V0QXR0cmlidXRlKCdkYXRhLW1pbmUnKSA9PT0gbWluZUljb24pIHtcclxuICAgICAgICAgICAgZmllbGQuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICAgICAgbGV0IGltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICAgICAgICAgIGlmIChQbGF5ZXIuZ2V0SW5zdGFuY2UoKS5nZXRHYW1lTW9kZSgpID09PSAnYmVnaW5uZXInKSB7XHJcbiAgICAgICAgICAgICAgICBpbWFnZS5zZXRBdHRyaWJ1dGUoJ3NyYycsICcuL2ltYWdlcy9taW5lQi5wbmcnKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChQbGF5ZXIuZ2V0SW5zdGFuY2UoKS5nZXRHYW1lTW9kZSgpID09PSAnaW50ZXJtZWRpYXRlJykge1xyXG4gICAgICAgICAgICAgICAgaW1hZ2Uuc2V0QXR0cmlidXRlKCdzcmMnLCAnLi9pbWFnZXMvbWluZUkucG5nJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7IGltYWdlLnNldEF0dHJpYnV0ZSgnc3JjJywgJy4vaW1hZ2VzL21pbmVFLnBuZycpOyB9XHJcbiAgICAgICAgICAgIGZpZWxkLmNsYXNzTGlzdC5hZGQoJ2VtcHR5Jyk7XHJcbiAgICAgICAgICAgIGZpZWxkLmFwcGVuZENoaWxkKGltYWdlKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufTtcclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vL05BUE9NRU5BIGRhdGEtbWluZSAtIGFrbyBqZSBib21iYSBzdGF2bGphIHNlIGlrb25hLCBha28gbmlqZSBzdGF2bGphIHNlIGJyb2ogYm9tYmkgdSBva3J1emVuanVcclxuXHJcbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09VElQUz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuLy8jcmVnaW9uIC0gd3JpdGUgdGlwcyBiYXNlZCBvbiBtaW5lcyBvbiB0aGUgZ2l2ZW4gdGFibGVcclxuY29uc3Qgd3JpdGVUaXBzID0gKHRhYmxlOiBIVE1MVGFibGVFbGVtZW50KTogdm9pZCA9PiB7XHJcbiAgICBjb25zdCBhbGxGaWVsZHMgPSB0YWJsZS5nZXRFbGVtZW50c0J5VGFnTmFtZShcInRkXCIpOyAvLyBzZWxla3R1amVtbyBzdmEgcG9samEgdSBkYXRvaiB0YWJlbGlcclxuICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoYWxsRmllbGRzLCBmaWVsZCA9PiB7IC8vIHphIHN2YWtvIHBvbGplXHJcbiAgICAgICAgaWYgKGZpZWxkLmdldEF0dHJpYnV0ZShcImRhdGEtbWluZVwiKSA9PT0gXCJcIikgeyAvLyBha28gamUgZWxlbWVudCBwcmF6YW4gKHRqLiBuaWplIG1pbmEsIGplciBzdSBtaW5lIHZlYyBwb3N0YXZsamVuZSBuYSB0YWJsaSlcclxuICAgICAgICAgICAgbGV0IG1pbmVzTnVtID0gY291bnRNaW5lcyhmaWVsZCk7IC8vIHByb3ZlcmF2YW1vIHN1c2VkbmEgcG9samEgaSBpc3Bpc3VqZW1vIGJyb2ogbWluYSB1IG9rb2xpbmlcclxuICAgICAgICAgICAgaWYgKG1pbmVzTnVtID09PSAwKSB7IGZpZWxkLnNldEF0dHJpYnV0ZShcImRhdGEtbWluZVwiLCBcIlwiKTsgZmllbGQuc2V0QXR0cmlidXRlKFwiZGF0YS1lbXB0eVwiLCBcIjFcIik7IH0vLyBha28gbmlqZSBtaW5hIGkgbmVtYSB1IG9rcnV6ZW5qdSB1cGlzdWplbW8gdSBkYXRhLWVtcHR5IDE7MSB6YSB0cnVlO1xyXG4gICAgICAgICAgICBlbHNlIHsgZmllbGQuc2V0QXR0cmlidXRlKFwiZGF0YS1taW5lXCIsIG1pbmVzTnVtLnRvU3RyaW5nKCkpOyBmaWVsZC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWVtcHR5XCIsIFwiMFwiKTsgLyplbGVtZW50LnRleHRDb250ZW50ID0gdGV4dDsgemEgZGV2IHBvdHJlYmUqLyB9IC8vYWtvIGltYSBtaW5hO2RhdGEtZW1wdHkgOyAwIHphIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vI3JlZ2lvbiAtIGZ1bmtjaWphIGtvamEgcHJvdmVyYXZhIHBvbGphIHUgb2tydXplbmp1XHJcbmZ1bmN0aW9uIGNvdW50TWluZXMoZmllbGQ6IEhUTUxUYWJsZUNlbGxFbGVtZW50KTogbnVtYmVyIHsgLy8gcHJvc2xlZGp1amVtbyBwb2xqZSBuYSBvc25vdnUga29qZWcgdnJzaW1vIHByb3ZlcnUgaSBicm9qIGtvbG9uYSB6Ym9nIG9yaWplbnRhY2lqZVxyXG4gICAgY29uc3QgZ2FtZU1vZGVJbmZvID0gR2FtZS5nZXRJbnN0YW5jZSgpLm1vZGVJbmZvKFBsYXllci5nZXRJbnN0YW5jZSgpLmdldEdhbWVNb2RlKCkpO1xyXG4gICAgY29uc3QgbnVtT2ZDb2xzOiBudW1iZXIgPSBnYW1lTW9kZUluZm9bMV07XHJcbiAgICBsZXQgY291bnRlciA9IDA7IC8vIGJyb2phYyBtaW5hIHUgb2tydXplbmp1IHBvbGphXHJcbiAgICBsZXQgc3Vycm91bmRpbmcgPSBkZWZpbmVTdXJyb3VuZGluZyhHYW1lLmdldEluc3RhbmNlKCkuZ2V0R2FtZVRhYmxlKCksIGZpZWxkKTsgLy8ga3JlaXJhbW8gb2tydXplbmplIChwb3ppdmFtbyBmdW5rY2lqdSB6YSB0bylcclxuICAgIHN1cnJvdW5kaW5nLmZvckVhY2goc3VyRmllbGQgPT4geyAvLyBwcm92ZXJhdmFtbyBzdmFrbyBwb2xqZSB1IG9rcnV6ZW5qdVxyXG4gICAgICAgIGlmIChzdXJGaWVsZCA9PT0gbnVsbCkgeyB9Ly8gYWtvIGplIHBvbGplIHZhbiB0YWJlbGUsIGlnbm9yaXNpXHJcbiAgICAgICAgZWxzZSBpZiAoc3VyRmllbGQuZ2V0QXR0cmlidXRlKFwiZGF0YS1taW5lXCIpID09PSBcIlxcdUQ4M0RcXHVEQ0EzXCIpIHsgLy8gemEgc3Zha3UgbWludVxyXG4gICAgICAgICAgICBjb3VudGVyKys7IC8vZG9kYWogamVkYW4gdSBicm9qYWNcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBjb3VudGVyOyAvLyBjZWxhIGZ1bmtjaWphIHZyYWNhIGJyb2phYyB0ai4gdWt1cGEgYnJvaiBtaW5hIHUgb2tydXplbmp1XHJcbn1cclxuLy8jZW5kcmVnaW9uXHJcblxyXG5leHBvcnQgeyBzZXRNaW5lcywgY2xlYXJNaW5lcywgc2hvd01pbmVzLCB3cml0ZVRpcHMgfTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvbWluZXNBbmRUaXBzLnRzIiwiaW1wb3J0IHsgR2FtZSwgUGxheWVyIH0gZnJvbSAnLi9kYXRhJztcclxuaW1wb3J0IHsgZGVmaW5lU3Vycm91bmRpbmcgfSBmcm9tICcuL3RhYmxlR3JpZCc7XHJcblxyXG5cclxuXHJcbi8vI3JlZ2lvbiAtIHN0b3BDbGljaygpIC0gc3RvcGlyYSBldmVudExJc3RlbmVyIG5hIGVsZW1lbnR1IGtvamkgamUga2xpa251dFxyXG5mdW5jdGlvbiBzdG9wQ2xpY2soZXZlbnQ6IGFueSkge1xyXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbn1cclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLz09PT09PT09PT09PT09PT09PT09PUVNUFRZIEZMT1c9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyNyZWdpb24gLSBvcGVuRW1wdHlFbGVtZW50KCkgLSBmbG93IGZ1bmN0aW9uXHJcblxyXG5sZXQgb3BlbkVtcHR5RWxlbWVudCA9IChlbGVtZW50OiBIVE1MVGFibGVEYXRhQ2VsbEVsZW1lbnQpID0+IHsvLyBwb2tyZWNlIGVtcHR5IGZsb3cgcHJvdmVydVxyXG4gICAgbGV0IGVtcHR5RmllbGRzID0gZmlyc3RFbXB0eUZpZWxkQ2hlY2soZWxlbWVudCk7Ly9wcm92ZXJhdmEgc2UgcHJ2byBwcmF6bm8gcG9samUgaSBldmlkZW50aXJhanUgb3N0YWxhIHByYXpuYSBwb2xqYSB1IG9rcnV6ZW5qdVxyXG4gICAgLy8gY29uc29sZS5sb2coZW1wdHlGaWVsZHMpO1xyXG4gICAgbGV0IHN0b3BTZWFyY2ggPSBmYWxzZTtcclxuXHJcbiAgICB3aGlsZSAoc3RvcFNlYXJjaCA9PSBmYWxzZSkge1xyXG4gICAgICAgIGlmIChlbXB0eUZpZWxkcy5sZW5ndGggIT0gMCkge1xyXG4gICAgICAgICAgICBsZXQgbmV3TWFpbkFycmF5OiBhbnlbXSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgZW1wdHlGaWVsZHMuZm9yRWFjaChmaWVsZCA9PiB7Ly8gemEgc3Zha28gcHJhem5vIHBvbGplXHJcbiAgICAgICAgICAgICAgICBlbXB0eUNlbGwoZmllbGQpOy8vIHRvdGFsbm8gZ2EgcHJhem5pbW9cclxuICAgICAgICAgICAgICAgIGxldCBzdWJBcnJheSA9IGRlZmluZVN1cnJvdW5kaW5nKEdhbWUuZ2V0SW5zdGFuY2UoKS5nZXRHYW1lVGFibGUoKSwgZmllbGQpOy8vcHJvdmVyYXZhbW8gb2tydXplbmplIHRvZyBwb2xqYVxyXG4gICAgICAgICAgICAgICAgc3ViQXJyYXkuZm9yRWFjaCgoZWxlbWVudCkgPT4gey8vemEgc3Zha28gcG9samUgaXogb2tydXplbmphIHRvZyBwb2xqYVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbGVtZW50ICE9PSBudWxsKSB7Ly9ha28gamUgZWxlbWVudCB1IG9rdmlydSB0YWJsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShcImRhdGEtY2xpY2tcIiwgXCIxXCIpOy8vcG9zdGF2bGphbW8gZGEgamUga2xpa251dG9cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc3RvcENsaWNrKTsvL2JyaXNlbW8gZXZlbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHN0b3BDbGljayk7Ly8gYnJpc2VtbyBldmVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV3TWFpbkFycmF5LmluZGV4T2YoZWxlbWVudCkgIT09IC0xKSB7IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7IG5ld01haW5BcnJheS5wdXNoKGVsZW1lbnQpIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRleHQgPSBlbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtaWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb250ZXh0ID09PSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW1wdHlDZWxsKDxhbnk+ZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIG5ld01haW5BcnJheSA9IGNoZWNrRW1wdHlGaWVsZHMobmV3TWFpbkFycmF5KTtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKG5ld01haW5BcnJheSk7XHJcbiAgICAgICAgICAgICAgICBlbXB0eUZpZWxkcyA9IG5ld01haW5BcnJheTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHN0b3BTZWFyY2ggPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHN0b3BTZWFyY2ggPSB0cnVlO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uIC0gZW1wdHlDZWxsKClcclxuY29uc3QgZW1wdHlDZWxsID0gKGVsZW1lbnQ6IEhUTUxUYWJsZURhdGFDZWxsRWxlbWVudCk6IHZvaWQgPT4ge1xyXG4gICAgaWYgKGVsZW1lbnQgIT09IG51bGwpIHtcclxuICAgICAgICBlbGVtZW50LmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWVtcHR5XCIsIFwiXCIpOy8vQUxFUlQgYnJpc2Ugc2UgaW5mbyBvIHRvbWUgZGEgbGkgamUgcHJhem5hIGNlbGlqYSwgcHJvdmVyaXRpIHphc3RvXHJcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiZW1wdHlcIik7Ly9jc3MgY2xhc2EgZGEgc2Ugb2JvamkgcHJhem5vIHBvbGplXHJcblxyXG4gICAgfVxyXG59XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uIC0gY2hlY2tFbXB0eUZpZWxkcygpIC0gY2hlY2sgZW1wdHkgZmllbGRzIGlmIGl0IGlzIHRvdGFsbHkgZW1wdHkgb3IgaXRzIGEgdGlwXHJcbmNvbnN0IGNoZWNrRW1wdHlGaWVsZHMgPSAoZmllbGRzOiBhbnkpID0+IHtcclxuICAgIGxldCBjaGVja2VkRW1wdHlGaWVsZHM6IEhUTUxUYWJsZURhdGFDZWxsRWxlbWVudFtdID0gW107XHJcbiAgICBmaWVsZHMuZm9yRWFjaChmaWVsZCA9PiB7XHJcbiAgICAgICAgaWYgKGZpZWxkID09PSBudWxsKSB7IH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZmllbGQuc2V0QXR0cmlidXRlKFwiZGF0YS1jbGlja1wiLCBcIjFcIik7Ly9zZXQgZmllbGQgYXMgY2xpY2tlZFxyXG4gICAgICAgICAgICBmaWVsZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc3RvcENsaWNrKTsvL3VrZGlkYSBldmVudFxyXG4gICAgICAgICAgICBmaWVsZC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHN0b3BDbGljayk7Ly91a2lkYSBldmVudFxyXG4gICAgICAgICAgICBjb25zdCBpc0VtcHR5ID0gZmllbGQuZ2V0QXR0cmlidXRlKFwiZGF0YS1lbXB0eVwiKTtcclxuICAgICAgICAgICAgY29uc3QgY29udGV4dCA9IGZpZWxkLmdldEF0dHJpYnV0ZShcImRhdGEtbWluZVwiKTtcclxuICAgICAgICAgICAgaWYgKGlzRW1wdHkgPT09IFwiMVwiKSB7Ly8gaWYgZmllbGQgaXMgdG90YWxseSBlbXB0eVxyXG4gICAgICAgICAgICAgICAgY2hlY2tlZEVtcHR5RmllbGRzLnB1c2goZmllbGQpO1xyXG4gICAgICAgICAgICAgICAgZmllbGQuY2xhc3NMaXN0LmFkZChcImVtcHR5XCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgeyBmaWVsZC50ZXh0Q29udGVudCA9IGNvbnRleHQ7ZmllbGQuY2xhc3NMaXN0LmFkZCgnY2xpY2tlZCcpOyB9Ly8gaWYgaXRzIHRpcCwgc2hvdyBpdFxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGNoZWNrZWRFbXB0eUZpZWxkczsgLy8gcmV0dXJuaW5nIGFycmF5IG9mIHRvdGFsbHkgZW1wdHkgZmllbGRzXHJcbn1cclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLyNyZWdpb24gLSBmaXJzdEVtcHR5RmllbGRDaGVjaygpIC0gRmlyc3QgY2xpY2tlZCBlbXB0eSBlbGVtZW50IGNoZWNrLCByZXR1cm5zIGFycmF5IG9mIGVtcHR5IGJsYW5rIGVsZW1lbnRzXHJcbmNvbnN0IGZpcnN0RW1wdHlGaWVsZENoZWNrID0gKGZpZWxkOiBIVE1MVGFibGVEYXRhQ2VsbEVsZW1lbnQpID0+IHsvL2NoZWNraW5nIGZpcnN0IGVtcHR5IGNsaWNrZWQgZmllbGRcclxuICAgIGZpZWxkLnNldEF0dHJpYnV0ZShcImRhdGEtY2xpY2tcIiwgXCIxXCIpOyAvLyBzZXQgY2xpY2tlZFxyXG4gICAgZmllbGQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHN0b3BDbGljayk7Ly9zdG9waXJhIGV2ZW50IGNsaWNrXHJcbiAgICBmaWVsZC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHN0b3BDbGljayk7IC8vIHN0b3BpcmEgZXZlbnQgbW91c2Vkb3duXHJcbiAgICBlbXB0eUNlbGwoZmllbGQpOyAvLyByZW1vdmUgZW1wdHkgYXR0cmlidXRlLCBjb2xvciBmaWVsZFxyXG5cclxuICAgIGNvbnN0IHN1cnJvdW5kRmllbGRzID0gZGVmaW5lU3Vycm91bmRpbmcoR2FtZS5nZXRJbnN0YW5jZSgpLmdldEdhbWVUYWJsZSgpLCBmaWVsZCk7Ly9rcmVpcmEgbml6IHN1c2VkbmloIHBvbGphXHJcbiAgICBjb25zdCBlbXB0eUZpZWxkcyA9IGNoZWNrRW1wdHlGaWVsZHMoc3Vycm91bmRGaWVsZHMpO1xyXG4gICAgcmV0dXJuIGVtcHR5RmllbGRzO1xyXG59XHJcbi8vI2VuZHJlZ2lvblxyXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5leHBvcnQgeyBvcGVuRW1wdHlFbGVtZW50LCBzdG9wQ2xpY2sgfTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvZW1wdHlGbG93LnRzIiwibGV0IHRpbWVyID0ge1xyXG4gICAgdGltZToge1xyXG4gICAgICAgIGhvdXJzOiAwLFxyXG4gICAgICAgIG1pbnV0ZXM6IDAsXHJcbiAgICAgICAgc2Vjb25kczogMFxyXG4gICAgfSxcclxuICAgIGludGVydmFsOiAxLFxyXG4gICAgdGltZUluY3JlbWVudDogKCkgPT4ge1xyXG4gICAgICAgIGlmICh0aW1lci50aW1lLnNlY29uZHMgPCA1OSkgeyB0aW1lci50aW1lLnNlY29uZHMrKyB9XHJcbiAgICAgICAgZWxzZSBpZiAodGltZXIudGltZS5zZWNvbmRzID09PSA1OSAmJiB0aW1lci50aW1lLm1pbnV0ZXMgPCA1OSkgeyB0aW1lci50aW1lLnNlY29uZHMgPSAwLCB0aW1lci50aW1lLm1pbnV0ZXMrKyB9XHJcbiAgICAgICAgZWxzZSBpZiAodGltZXIudGltZS5zZWNvbmRzID09PSA1OSAmJiB0aW1lci50aW1lLm1pbnV0ZXMgPT09IDU5KSB7IHRpbWVyLnRpbWUuc2Vjb25kcyA9IDAsIHRpbWVyLnRpbWUubWludXRlcyA9IDAsIHRpbWVyLnRpbWUuaG91cnMrKyB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5cclxubGV0IGNhbGNTY29yZSA9ICgpOiBudW1iZXIgPT4ge1xyXG4gICAgcmV0dXJuIHRpbWVyLnRpbWUuc2Vjb25kcyArICh0aW1lci50aW1lLm1pbnV0ZXMgKiA2MCkgKyAodGltZXIudGltZS5ob3VycyAqIDM2MCk7XHJcbn07XHJcblxyXG5cclxubGV0IGdldFN0cmluZ1RpbWUgPSAoKSA9PiB7XHJcbiAgICBsZXQgcHJldlRpbWUgPSBbdGltZXIudGltZS5ob3VycywgdGltZXIudGltZS5taW51dGVzLCB0aW1lci50aW1lLnNlY29uZHNdO1xyXG4gICAgbGV0IGN1cnJUaW1lID0gcHJldlRpbWUubWFwKCh0aW1lRWxlbWVudCkgPT4geyBpZiAodGltZUVsZW1lbnQgPCAxMCkgeyByZXR1cm4gXCIwXCIgKyB0aW1lRWxlbWVudCB9IGVsc2UgeyByZXR1cm4gdGltZUVsZW1lbnQgfSB9KTtcclxuICAgIHJldHVybiBgJHtjdXJyVGltZVswXX0gOiAke2N1cnJUaW1lWzFdfSA6ICR7Y3VyclRpbWVbMl19YDtcclxufTtcclxuXHJcbmxldCBzdGFydFRpbWVyID0gKHN0ZXAgPSAxKTogdm9pZCA9PiB7XHJcbiAgICB0aW1lci5pbnRlcnZhbCA9IHNldEludGVydmFsKHRpbWVyLnRpbWVJbmNyZW1lbnQsIHN0ZXAgKiAxMDAwKTtcclxufTtcclxuXHJcbmxldCBzdG9wVGltZXIgPSAoKTogdm9pZCA9PiB7XHJcbiAgICBjbGVhckludGVydmFsKHRpbWVyLmludGVydmFsKTtcclxufTtcclxuXHJcbmxldCByZXNldFRpbWVyID0gKCkgPT4ge1xyXG4gICAgZm9yIChsZXQgZWxlbWVudCBpbiB0aW1lci50aW1lKSB7IHRpbWVyLnRpbWVbZWxlbWVudF0gPSAwIH07XHJcbn1cclxuXHJcbmxldCBzdHJpbmdJbnRlcnZhbCA9IDA7IC8vIHphIGlzcGlzIHN0cmluZyB2cmVtZW5hXHJcbmNvbnN0IHRpbWVyUGxhY2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGltZXJQbGFjZScpO1xyXG5cclxubGV0IHN0YXJ0VGltZXJIYW5kbGVyID0gKCkgPT4ge1xyXG4gICAgc3RhcnRUaW1lcigpO1xyXG4gICAgc3RyaW5nSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7IHRpbWVyUGxhY2UudGV4dENvbnRlbnQgPSBnZXRTdHJpbmdUaW1lKCkgfSwgMTAwKTtcclxufTtcclxuXHJcbmxldCBzdG9wVGltZXJIYW5kbGVyID0gKCkgPT4ge1xyXG4gICAgc3RvcFRpbWVyKCk7XHJcbiAgICBjbGVhckludGVydmFsKHN0cmluZ0ludGVydmFsKTtcclxufTtcclxuXHJcblxyXG5leHBvcnQgeyBzdGFydFRpbWVySGFuZGxlciwgc3RvcFRpbWVyLCByZXNldFRpbWVyLCBnZXRTdHJpbmdUaW1lLCB0aW1lclBsYWNlLCBzdG9wVGltZXJIYW5kbGVyLCBjYWxjU2NvcmUgfTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3RpbWVyLnRzIiwiaW1wb3J0IHsgUGxheWVyIH0gZnJvbSAnLi9kYXRhJztcclxuaW1wb3J0IHsgY2FsY1Njb3JlIH0gZnJvbSAnLi90aW1lcic7XHJcblxyXG4vLyNyZWdpb24gLSBzZWxlY3RvcnNcclxuY29uc3Qgc2NvcmVMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Njb3JlTGlzdCcpO1xyXG5jb25zdCBnYW1lTW9kZU5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kZU5hbWUnKTtcclxuY29uc3QgbW9kZU5hbWVIZWFkaW5nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGVOYW1lSGVhZGluZycpO1xyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vI3JlZ2lvbiAtIHJhbmtpbmdUYWJsZSBkZWZpbml0aW9uXHJcbmxldCByYW5raW5nVGFibGU6IHt9ID0ge1xyXG4gICAgYmVnaW5uZXI6IFtbJ0pvaG4nLCAxNV0sIFsnTWFycnknLCAyMV0sIFsnVGltJywgMjRdLFsnQWxleCcsIDI2XV0sXHJcbiAgICBpbnRlcm1lZGlhdGU6IFtbJ1NhbScsIDQ0XSwgWydNYXJrJywgNDZdLCBbJ0ppbScsIDUwXV0sXHJcbiAgICBleHBlcnQ6IFtbJ01hcmlhJywgNThdLCBbJ0tpdCcsIDY2XSwgWydUb255JywgNzBdXVxyXG59O1xyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vI3JlZ2lvbiAtIHByZXNldFN0b3JhZ2UoKSAtIGNoZWNrcyBpZiB0aGVyZSdzIGRhdGFiYXNlIGluIGxvY2Fsc3RvcmFnZSBpZiBub3QgY3JlYXRlcyBvbmUsIG90aGVyd2lzZSBsb2FkcyBpdC5cclxuY29uc3QgcHJlc2V0U3RvcmFnZSA9ICgpOiB2b2lkID0+IHtcclxuICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncmFua2luZ1RhYmxlJykgPT09IG51bGwpIHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncmFua2luZ1RhYmxlJywgSlNPTi5zdHJpbmdpZnkocmFua2luZ1RhYmxlKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coYGRhdGFiYXNlIGZldGNoZWQgZnJvbSBsb2NhbHN0b3JhZ2VgLCBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncmFua2luZ1RhYmxlJykpO1xyXG4gICAgfVxyXG59O1xyXG4vLyNlbmRyZWdpb25cclxuXHJcbnByZXNldFN0b3JhZ2UoKTtcclxuXHJcbi8vI3JlZ2lvbiAtIHNhdmVEYXRhKCkgLVxyXG5jb25zdCBzYXZlRGF0YSA9ICgpID0+IHtcclxuICAgIGxldCBzdG9yYWdlRGF0YSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3JhbmtpbmdUYWJsZScpKTtcclxuICAgIGxldCBnYW1lTW9kZSA9IFBsYXllci5nZXRJbnN0YW5jZSgpLmdldEdhbWVNb2RlKCk7XHJcbiAgICBjb25zb2xlLmxvZyhgR2FtZSBtb2RlIGluc2lkZSBzYXZlRGF0YTogJHtnYW1lTW9kZX1gKTtcclxuXHJcbiAgICBsZXQgY3VycmVudE1vZGVUYWJsZSA9IHN0b3JhZ2VEYXRhW2dhbWVNb2RlXTtcclxuICAgIGNvbnNvbGUubG9nKGBDdXJyZW50IFRhYmxlIGluc2lkZSBzYXZlRGF0YTogJHtjdXJyZW50TW9kZVRhYmxlfWApO1xyXG4gICAgY3VycmVudE1vZGVUYWJsZSA9IHNjb3JlVmFsaWRhdGlvbihjdXJyZW50TW9kZVRhYmxlKTtcclxuICAgIGNvbnNvbGUubG9nKGBUYWJsZSBpbnNpZGUgc2F2ZURhdGE6ICR7Y3VycmVudE1vZGVUYWJsZX1gKTtcclxuICAgIGN1cnJlbnRNb2RlVGFibGUuc29ydCgoYSwgYikgPT4geyByZXR1cm4gYVsxXSAtIGJbMV19KTtcclxuICAgIGNvbnNvbGUubG9nKGBUYWJsZSBpbnNpZGUgc2F2ZURhdGE6ICR7Y3VycmVudE1vZGVUYWJsZX1gKTtcclxuICAgIGZvciAoY3VycmVudE1vZGVUYWJsZS5sZW5ndGg7IGN1cnJlbnRNb2RlVGFibGUubGVuZ3RoID4gNTspIHtcclxuICAgICAgICBjdXJyZW50TW9kZVRhYmxlLnBvcCgpO1xyXG4gICAgfVxyXG4gICAgc3RvcmFnZURhdGFbZ2FtZU1vZGVdID0gY3VycmVudE1vZGVUYWJsZTtcclxuICAgIGxldCBuZXdEYXRhID0gSlNPTi5zdHJpbmdpZnkoc3RvcmFnZURhdGEpO1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3JhbmtpbmdUYWJsZScsIG5ld0RhdGEpO1xyXG4gICAgcmFua2luZ1RhYmxlID0gc3RvcmFnZURhdGE7XHJcbn07XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uIC0gc2NvcmVWYWxpZGF0aW9uICgpIC0gdmFsaWRhdGVzIGlmIHNjb3JlIGlzIG5vdCBlcXVhbCB0byAwXHJcbmNvbnN0IHNjb3JlVmFsaWRhdGlvbiA9ICh0YWJsZTogKHN0cmluZyB8IG51bWJlcilbXVtdKSA9PiB7XHJcbiAgICBsZXQgbmV3VGFibGUgPSB0YWJsZTtcclxuICAgIGNvbnNvbGUubG9nKG5ld1RhYmxlKTtcclxuICAgIGNvbnN0IHBsYXllclNjb3JlID0gW1BsYXllci5nZXRJbnN0YW5jZSgpLmdldE5hbWUoKSwgUGxheWVyLmdldEluc3RhbmNlKCkuZ2V0U2NvcmUoKV07XHJcbiAgICBpZiAocGxheWVyU2NvcmVbMV0gIT09IDAgJiYgcGxheWVyU2NvcmVbMV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIG5ld1RhYmxlLnB1c2gocGxheWVyU2NvcmUpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCduZXcgdGFibGUgaW5zaWRlIGlmIHN0YXRlbWVudCcscGxheWVyU2NvcmUsbmV3VGFibGUpO1xyXG4gICAgfVxyXG4gICAgY29uc29sZS5sb2coJ25ld1RhYmxlJyxuZXdUYWJsZSk7XHJcbiAgICByZXR1cm4gbmV3VGFibGU7XHJcbn07XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuXHJcbi8vI3JlZ2lvbiAtIHdyaXRlRGF0YSgpIC0gcHJpbnRzIG91dCByYW5raW5nIHRhYmxlXHJcbmxldCBwcmludERhdGEgPSAoKSA9PiB7XHJcblxyXG4gICAgbGV0IHRhYmxlID0gcmFua2luZ1RhYmxlW1BsYXllci5nZXRJbnN0YW5jZSgpLmdldEdhbWVNb2RlKCldO1xyXG5cclxuICAgIGdhbWVNb2RlTmFtZS50ZXh0Q29udGVudCA9IFBsYXllci5nZXRJbnN0YW5jZSgpLmdldEdhbWVNb2RlKCkgKyAnIG1vZGUnO1xyXG4gICAgc2NvcmVMaXN0LmlubmVySFRNTCA9ICcnO1xyXG5cclxuICAgIHRhYmxlLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgbGV0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuICAgICAgICBsaS50ZXh0Q29udGVudCA9IGAke2VsZW1lbnRbMF19IC0gJHtlbGVtZW50WzFdfWA7XHJcbiAgICAgICAgc2NvcmVMaXN0LmFwcGVuZENoaWxkKGxpKTtcclxuICAgIH0pO1xyXG59O1xyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vI3JlZ2lvbiAtIGhhbmRsZVJhbmtpbmcoKSAtIG9uZSB0byBydWxlIHRoZW0gYWxsXHJcbmNvbnN0IGhhbmRsZVJhbmtpbmcgPSAoKSA9PiB7XHJcbiAgICAvLyBzY29yZUxpc3QuY2xhc3NMaXN0LnJlbW92ZSgnc2NvcmVEaXNwbGF5Jyk7XHJcbiAgICAvLyBnYW1lTW9kZU5hbWUuY2xhc3NMaXN0LnJlbW92ZSgnc2NvcmVEaXNwbGF5Jyk7XHJcbiAgICBjb25zb2xlLmxvZyhyYW5raW5nVGFibGUpO1xyXG4gICAgc2F2ZURhdGEoKTtcclxuICAgIHByaW50RGF0YSgpO1xyXG59O1xyXG4vLyNlbmRyZWdpb25cclxuXHJcbmV4cG9ydCB7IGhhbmRsZVJhbmtpbmcgfTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3JhbmtpbmcudHMiLCJpbXBvcnQgeyBHYW1lLCBnYW1lU2VjdGlvbiwgZ2FtZSwgd2VsY29tZVNjcmVlbiB9IGZyb20gJy4vZGF0YSc7XHJcblxyXG5jb25zdCBhYm91dEdhbWVCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWJvdXQtZ2FtZS1idXR0b24nKTtcclxuY29uc3QgdGFibGVCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFibGUtYnV0dG9uJyk7XHJcbmNvbnN0IGdhbWVSdWxlc0J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lLXJ1bGVzLWJ1dHRvbicpO1xyXG5jb25zdCBnYW1lUnVsZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZS1ydWxlcycpO1xyXG5jb25zdCBhYm91dEdhbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWJvdXQtZ2FtZScpO1xyXG5cclxuXHJcbmNvbnN0IGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJvZHlcIik7XHJcblxyXG5jb25zdCBib29tID0gKCkgPT4ge1xyXG4gICAgbGV0IGltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICBpbWFnZS5zZXRBdHRyaWJ1dGUoJ3NyYycsICcuL2ltYWdlcy9ib29tLnBuZycpO1xyXG4gICAgaW1hZ2UuY2xhc3NMaXN0LmFkZCgnYmlnLWJvb20nKTtcclxuICAgIGJvZHkuYXBwZW5kQ2hpbGQoaW1hZ2UpO1xyXG59O1xyXG5cclxuY29uc3QgZ2FtZU92ZXIgPSAoKSA9PiB7XHJcbiAgICBsZXQgaW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgIGltYWdlLnNldEF0dHJpYnV0ZSgnc3JjJywgJy4vaW1hZ2VzL2dhbWVvdmVyLnBuZycpO1xyXG4gICAgaW1hZ2UuY2xhc3NMaXN0LmFkZCgnZ2FtZS1vdmVyJyk7XHJcbiAgICBnYW1lLmFwcGVuZENoaWxkKGltYWdlKTtcclxufTtcclxuXHJcbmNvbnN0IHdpbiA9ICgpID0+IHtcclxuICAgIGxldCBpbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG4gICAgaW1hZ2Uuc2V0QXR0cmlidXRlKCdzcmMnLCAnLi9pbWFnZXMvd2luLnBuZycpO1xyXG4gICAgaW1hZ2UuY2xhc3NMaXN0LmFkZCgnd2luJyk7XHJcbiAgICBnYW1lLmFwcGVuZENoaWxkKGltYWdlKTtcclxufTtcclxuXHJcbmFib3V0R2FtZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIHdlbGNvbWVTY3JlZW4uY2xhc3NMaXN0LmFkZCgncmVtb3ZlJyk7XHJcbiAgICBnYW1lLmNsYXNzTGlzdC5hZGQoJ3JlbW92ZScpO1xyXG4gICAgZ2FtZVJ1bGVzLmNsYXNzTGlzdC5hZGQoJ3JlbW92ZScpO1xyXG4gICAgYWJvdXRHYW1lLmNsYXNzTGlzdC5yZW1vdmUoJ3JlbW92ZScpO1xyXG59KTtcclxuXHJcblxyXG5jb25zdCBnYW1lU2hvdyA9ICgpPT57XHJcbndlbGNvbWVTY3JlZW4uY2xhc3NMaXN0LmFkZCgncmVtb3ZlJyk7XHJcbmdhbWUuY2xhc3NMaXN0LnJlbW92ZSgncmVtb3ZlJyk7XHJcbmdhbWVSdWxlcy5jbGFzc0xpc3QuYWRkKCdyZW1vdmUnKTtcclxuYWJvdXRHYW1lLmNsYXNzTGlzdC5hZGQoJ3JlbW92ZScpO1xyXG59O1xyXG5cclxudGFibGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGdhbWVTaG93KTtcclxuXHJcblxyXG5nYW1lUnVsZXNCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICB3ZWxjb21lU2NyZWVuLmNsYXNzTGlzdC5hZGQoJ3JlbW92ZScpO1xyXG4gICAgZ2FtZS5jbGFzc0xpc3QuYWRkKCdyZW1vdmUnKTtcclxuICAgIGdhbWVSdWxlcy5jbGFzc0xpc3QucmVtb3ZlKCdyZW1vdmUnKTtcclxuICAgIGFib3V0R2FtZS5jbGFzc0xpc3QuYWRkKCdyZW1vdmUnKTtcclxuIH0pO1xyXG5cclxuZXhwb3J0IHsgYm9vbSwgZ2FtZU92ZXIsIHdpbiwgZ2FtZVNob3cgfTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvYW5pbWF0aW9uLnRzIl0sInNvdXJjZVJvb3QiOiIifQ==