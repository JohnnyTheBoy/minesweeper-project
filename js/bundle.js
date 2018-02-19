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
        Object(__WEBPACK_IMPORTED_MODULE_8__animation__["c" /* win */])();
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
            __WEBPACK_IMPORTED_MODULE_0__data__["h" /* welcomeScreen */].classList.add('remove');
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return win; });
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
tableButton.addEventListener('click', () => {
    __WEBPACK_IMPORTED_MODULE_0__data__["h" /* welcomeScreen */].classList.add('remove');
    __WEBPACK_IMPORTED_MODULE_0__data__["c" /* game */].classList.remove('remove');
    gameRules.classList.add('remove');
    aboutGame.classList.add('remove');
});
gameRulesButton.addEventListener('click', () => {
    __WEBPACK_IMPORTED_MODULE_0__data__["h" /* welcomeScreen */].classList.add('remove');
    __WEBPACK_IMPORTED_MODULE_0__data__["c" /* game */].classList.add('remove');
    gameRules.classList.remove('remove');
    aboutGame.classList.add('remove');
});



/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgODY1Zjc5ZmQ0NDI0MTg2MjI0M2YiLCJ3ZWJwYWNrOi8vLy4vYXBwL2RhdGEudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3RhYmxlR3JpZC50cyIsIndlYnBhY2s6Ly8vLi9hcHAvaGVscGVyRnVuY3MudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2FwcC50cyIsIndlYnBhY2s6Ly8vLi9hcHAvZ2FtZU1vZGUudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwL21pbmVzQW5kVGlwcy50cyIsIndlYnBhY2s6Ly8vLi9hcHAvZW1wdHlGbG93LnRzIiwid2VicGFjazovLy8uL2FwcC90aW1lci50cyIsIndlYnBhY2s6Ly8vLi9hcHAvcmFua2luZy50cyIsIndlYnBhY2s6Ly8vLi9hcHAvYW5pbWF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQzdEQTtBQUFBLHFCQUFxQjtBQUNyQixNQUFNLGVBQWUsR0FBc0IsUUFBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM1RSxNQUFNLGVBQWUsR0FBc0IsUUFBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM1RSxNQUFNLGVBQWUsR0FBcUIsUUFBUSxDQUFDLGNB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SUFDckMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDckMsQ0FBQyxDQUFDLENBQUM7QUFFMkIiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgODY1Zjc5ZmQ0NDI0MTg2MjI0M2YiLCIvLyNyZWdpb24gLSBzZWxlY3RvcnNcclxuY29uc3QgZ2FtZVN0YXJ0QnV0dG9uID0gPEhUTUxCdXR0b25FbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFydCcpO1xyXG5jb25zdCBnYW1lUmVzZXRCdXR0b24gPSA8SFRNTEJ1dHRvbkVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc2V0Jyk7XHJcbmNvbnN0IHBsYXllck5hbWVJbnB1dCA9IDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2VybmFtZScpO1xyXG5jb25zdCBnYW1lT3B0aW9uc1NlY3Rpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZS1vcHRpb25zJyk7XHJcbmNvbnN0IGdhbWVTZWN0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWUtcGxhY2UnKTtcclxuY29uc3Qgd2VsY29tZVNjcmVlbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3ZWxjb21lLXNjcmVlbicpO1xyXG5jb25zdCBnYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWUnKTtcclxuLy8jZW5kcmVnaW9uXHJcblxyXG5wbGF5ZXJOYW1lSW5wdXQudmFsdWUgPSBcIlwiO1xyXG5cclxuXHJcbi8vI3JlZ2lvbiAtIEdhbWUgc2luZ2xldG9uIGNsYXNzIGRlZmluaXRpb25cclxuXHJcbmNsYXNzIEdhbWUge1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IF9pbnN0YW5jZTogR2FtZSA9IG5ldyBHYW1lKCk7XHJcblxyXG4gICAgcHJpdmF0ZSBfbW9kZSA9IHtcclxuICAgICAgICBiZWdpbm5lcjogWzksIDksIDEwXSxcclxuICAgICAgICBpbnRlcm1lZGlhdGU6IFsxNiwgMTYsIDQwXSxcclxuICAgICAgICBleHBlcnQ6IFsxNiwgMzAsIDk5XSxcclxuICAgICAgICBjdXN0b206IFswLCAwLCAwXVxyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIF9nYW1lVGFibGU6IEhUTUxUYWJsZUVsZW1lbnQ7XHJcblxyXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IEdhbWUge1xyXG4gICAgICAgIHJldHVybiBHYW1lLl9pbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbW9kZUluZm8obW9kZU5hbWU6IHN0cmluZyk6IG51bWJlcltdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbW9kZVttb2RlTmFtZV07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldEN1c3RvbU1vZGUoaW5mbzogbnVtYmVyW10pIHtcclxuICAgICAgICB0aGlzLl9tb2RlLmN1c3RvbSA9IGluZm87XHJcbiAgICAgICAgY29uc29sZS5sb2coYEN1c3RvbSBtb2RlIHNldCB0byAke3RoaXMuX21vZGUuY3VzdG9tfWApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRHYW1lVGFibGUoZWxlbWVudCkge1xyXG4gICAgICAgIHRoaXMuX2dhbWVUYWJsZSA9IGVsZW1lbnQ7XHJcbiAgICAgICAgY29uc29sZS5sb2coYFRhYmxlIGNyZWF0ZWRgKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0R2FtZVRhYmxlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9nYW1lVGFibGU7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uIC0gUGxheWVyIC0gc2luZ2xldG9uIGNsYXNzIGRlZmluaXRpb25cclxuY2xhc3MgUGxheWVyIHtcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBfaW5zdGFuY2U6IFBsYXllciA9IG5ldyBQbGF5ZXIoKTtcclxuXHJcbiAgICBwcml2YXRlIF9uYW1lOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgcHJpdmF0ZSBfZ2FtZU1vZGU6IHN0cmluZyA9IFwibm9uZVwiO1xyXG4gICAgcHJpdmF0ZSBfc2NvcmU6IG51bWJlcjtcclxuXHJcbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogUGxheWVyIHtcclxuICAgICAgICByZXR1cm4gUGxheWVyLl9pbnN0YW5jZTtcclxuICAgIH1cclxuICAgIGdldE5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbmFtZTtcclxuICAgIH1cclxuICAgIHNldE5hbWUodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIGlmICh2YWx1ZSA9PT0gJycpe3ZhbHVlID0gJ3Vua25vd24gcGxheWVyJ31cclxuICAgICAgICB0aGlzLl9uYW1lID0gdmFsdWU7XHJcbiAgICAgICAgY29uc29sZS5sb2coYFBsYXllcnMgbmFtZSBzZXQgdG86ICR7dGhpcy5fbmFtZX1gKVxyXG4gICAgfVxyXG5cclxuICAgIGdldEdhbWVNb2RlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dhbWVNb2RlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEdhbWVNb2RlKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9nYW1lTW9kZSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFNjb3JlKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5fc2NvcmUgPSB2YWx1ZTtcclxuICAgICAgICBjb25zb2xlLmxvZyhgU2NvcmUgc2V0IHRvICR7dGhpcy5fc2NvcmV9YCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U2NvcmUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Njb3JlO1xyXG4gICAgfVxyXG59XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuZXhwb3J0IHsgR2FtZSwgUGxheWVyLCBnYW1lU3RhcnRCdXR0b24sIGdhbWVSZXNldEJ1dHRvbiwgcGxheWVyTmFtZUlucHV0LCBnYW1lT3B0aW9uc1NlY3Rpb24sIGdhbWVTZWN0aW9uLHdlbGNvbWVTY3JlZW4sZ2FtZSB9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9kYXRhLnRzIiwiaW1wb3J0IHsgR2FtZSwgUGxheWVyIH0gZnJvbSAnLi9kYXRhJztcclxuXHJcbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09VEFCTEUgR1JJRD09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuLy8jcmVnaW9uIC0gY3JlYXRlcyB0YWJsZSBncmlkIGZvciBnaXZlbiBnYW1lIG1vZGVcclxuY29uc3QgY3JlYXRlR3JpZCA9IChyb3dzQW5kQ29sczogbnVtYmVyW10pOiB2b2lkID0+IHtcclxuICAgIGxldCB0YWJsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RhYmxlJyk7XHJcbiAgICBsZXQgY2VsbENvdW50ZXIgPSAxO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByb3dzQW5kQ29sc1swXTsgaSsrKSB7XHJcbiAgICAgICAgbGV0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJyk7XHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCByb3dzQW5kQ29sc1sxXTsgaisrKSB7XHJcbiAgICAgICAgICAgIGxldCBjb2wgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpO1xyXG4gICAgICAgICAgICBjb2wuc2V0QXR0cmlidXRlKFwiaWRcIiwgY2VsbENvdW50ZXIgKyAnZmllbGQnKTtcclxuICAgICAgICAgICAgY29sLnNldEF0dHJpYnV0ZShcImRhdGEtaWRcIiwgY2VsbENvdW50ZXIgKyAnZmllbGQnKTtcclxuICAgICAgICAgICAgY29sLnNldEF0dHJpYnV0ZShcImRhdGEtbWluZVwiLCBcIlwiKTtcclxuICAgICAgICAgICAgY29sLnNldEF0dHJpYnV0ZShcImRhdGEtZW1wdHlcIiwgXCJcIik7XHJcbiAgICAgICAgICAgIGNvbC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWNsaWNrXCIsIFwiXCIpO1xyXG4gICAgICAgICAgICBjZWxsQ291bnRlcisrO1xyXG4gICAgICAgICAgICByb3cuYXBwZW5kQ2hpbGQoY29sKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGFibGUuYXBwZW5kQ2hpbGQocm93KTtcclxuICAgIH1cclxuICAgIEdhbWUuZ2V0SW5zdGFuY2UoKS5zZXRHYW1lVGFibGUodGFibGUpO1xyXG59O1xyXG4vLyNlbmRyZWdpb25cclxuXHJcblxyXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PUJPUkRFUlM9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbi8vI3JlZ2lvbiAtIGNyZWF0ZXMgbGVmdCBib3JkZXIgZm9yIHRhYmxlIGdyaWRcclxuY29uc3QgY3JlYXRlTGVmdEJvcmRlciA9IChudW1PZlJvd3M6IG51bWJlciwgbnVtT2ZDb2xzOiBudW1iZXIpID0+IHtcclxuICAgIGxldCBsZWZ0Qm9yZGVyRmllbGRzOiBudW1iZXJbXSA9IFsxXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtT2ZSb3dzIC0gMTsgaSsrKSB7XHJcbiAgICAgICAgbGV0IGJvcmRlckZpZWxkID0gbGVmdEJvcmRlckZpZWxkc1tpXSArIG51bU9mQ29scztcclxuICAgICAgICBsZWZ0Qm9yZGVyRmllbGRzLnB1c2goYm9yZGVyRmllbGQpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGxlZnRCb3JkZXJGaWVsZHM7XHJcbn1cclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLyNyZWdpb24gLSBjcmVhdGVzIHJpZ2h0IGJvcmRlciBmb3IgdGFibGUgZ3JpZFxyXG5jb25zdCBjcmVhdGVSaWdodEJvcmRlciA9IChudW1PZlJvd3M6IG51bWJlciwgbnVtT2ZDb2xzOiBudW1iZXIpID0+IHtcclxuICAgIGxldCByaWdodEJvcmRlckZpZWxkczogbnVtYmVyW10gPSBbbnVtT2ZDb2xzXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtT2ZSb3dzIC0gMTsgaSsrKSB7XHJcbiAgICAgICAgbGV0IGJvcmRlckZpZWxkID0gcmlnaHRCb3JkZXJGaWVsZHNbaV0gKyBudW1PZkNvbHM7XHJcbiAgICAgICAgcmlnaHRCb3JkZXJGaWVsZHMucHVzaChib3JkZXJGaWVsZCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmlnaHRCb3JkZXJGaWVsZHM7XHJcbn1cclxuLy8jZW5kcmVnaW9uXHJcblxyXG5cclxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1TVVJST1VORElORz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4vLyNyZWdpb24gLSBkZWZpbmVTdXJyb3VuZGluZygpIC0gY3JlYXRlcyBzdXJyb3VuZGluZyBiYXNlZCBvbiBmaWVsZCBwb3NpdGlvbiAoYmFzZWQgb24gaWQpXHJcblxyXG5jb25zdCBkZWZpbmVTdXJyb3VuZGluZyA9ICh0YWJsZTogRWxlbWVudCwgZWxlbWVudDogSFRNTEVsZW1lbnQpID0+IHsgLy8gZGVmaW5pc2VtbyBva29sbmEgcG9samEgbmEgb3Nub3Z1IGRhdG9nIHBvbGphIGkgYnJvamEga29sb25hIHRhYmVsZVxyXG4gICAgbGV0IHN1cnJvdW5kaW5nO1xyXG4gICAgY29uc3QgaWQgPSBwYXJzZUludChlbGVtZW50LmlkKTtcclxuICAgIGNvbnN0IGdhbWVNb2RlSW5mbyA9IEdhbWUuZ2V0SW5zdGFuY2UoKS5tb2RlSW5mbyhQbGF5ZXIuZ2V0SW5zdGFuY2UoKS5nZXRHYW1lTW9kZSgpKTtcclxuICAgIGNvbnN0IG51bU9mUm93cyA9IGdhbWVNb2RlSW5mb1swXTtcclxuICAgIGNvbnN0IG51bU9mQ29scyA9IGdhbWVNb2RlSW5mb1sxXTtcclxuXHJcbiAgICAvL2Jhc2Ugc3Vycm91bmRpbmdcclxuICAgIGNvbnN0IGxlZnQgPSB0YWJsZS5xdWVyeVNlbGVjdG9yKGBbaWQ9XCIke2lkIC0gMX1maWVsZFwiXWApO1xyXG4gICAgY29uc3QgdXBMZWZ0ID0gdGFibGUucXVlcnlTZWxlY3RvcihgW2lkPVwiJHtpZCAtIG51bU9mQ29scyAtIDF9ZmllbGRcIl1gKTtcclxuICAgIGNvbnN0IHVwID0gdGFibGUucXVlcnlTZWxlY3RvcihgW2lkPVwiJHtpZCAtIG51bU9mQ29sc31maWVsZFwiXWApO1xyXG4gICAgY29uc3QgdXBSaWdodCA9IHRhYmxlLnF1ZXJ5U2VsZWN0b3IoYFtpZD1cIiR7aWQgLSBudW1PZkNvbHMgKyAxfWZpZWxkXCJdYCk7XHJcbiAgICBjb25zdCByaWdodCA9IHRhYmxlLnF1ZXJ5U2VsZWN0b3IoYFtpZD1cIiR7aWQgKyAxfWZpZWxkXCJdYCk7XHJcbiAgICBjb25zdCByaWdodERvd24gPSB0YWJsZS5xdWVyeVNlbGVjdG9yKGBbaWQ9XCIke2lkICsgbnVtT2ZDb2xzICsgMX1maWVsZFwiXWApO1xyXG4gICAgY29uc3QgZG93biA9IHRhYmxlLnF1ZXJ5U2VsZWN0b3IoYFtpZD1cIiR7aWQgKyBudW1PZkNvbHN9ZmllbGRcIl1gKTtcclxuICAgIGNvbnN0IGRvd25MZWZ0ID0gdGFibGUucXVlcnlTZWxlY3RvcihgW2lkPVwiJHtpZCArIG51bU9mQ29scyAtIDF9ZmllbGRcIl1gKTtcclxuXHJcbiAgICAvL2NyZWF0ZSBib3JkZXJzXHJcbiAgICBjb25zdCBsZWZ0Qm9yZGVyID0gY3JlYXRlTGVmdEJvcmRlcihudW1PZlJvd3MsIG51bU9mQ29scyk7XHJcbiAgICBjb25zdCByaWdodEJvcmRlciA9IGNyZWF0ZVJpZ2h0Qm9yZGVyKG51bU9mUm93cywgbnVtT2ZDb2xzKTtcclxuXHJcbiAgICAvL3N1cnJvdW5kaW5nIGJhc2VkIG9uIGZpZWxkLWJvcmRlcnMgcmVsYXRpb25cclxuICAgIGlmIChsZWZ0Qm9yZGVyLmluZGV4T2YoaWQpICE9PSAtMSkge1xyXG4gICAgICAgIHN1cnJvdW5kaW5nID0gW3VwLCB1cFJpZ2h0LCByaWdodCwgcmlnaHREb3duLCBkb3duXTtcclxuICAgIH0gZWxzZSBpZiAocmlnaHRCb3JkZXIuaW5kZXhPZihpZCkgIT09IC0xKSB7XHJcbiAgICAgICAgc3Vycm91bmRpbmcgPSBbbGVmdCwgdXBMZWZ0LCB1cCwgZG93biwgZG93bkxlZnRdO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBzdXJyb3VuZGluZyA9IFtsZWZ0LCB1cExlZnQsIHVwLCB1cFJpZ2h0LCByaWdodCwgcmlnaHREb3duLCBkb3duLCBkb3duTGVmdF07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3Vycm91bmRpbmc7XHJcbn1cclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcblxyXG5leHBvcnQgeyBjcmVhdGVHcmlkLGRlZmluZVN1cnJvdW5kaW5nfTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvdGFibGVHcmlkLnRzIiwiLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1SQU5ET00gRlVOQ1RJT05TPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4vLyNyZWdpb24gIC0gQ3JlYXRlcyByYW5kb20gbnVtYmVyIGZvciBwYXNzZWQgbWluIGFuZCBtYXhcclxuY29uc3QgcmFuZG9tTnVtYmVyID0gKG1heE51bTogbnVtYmVyLCBtaW5OdW06IG51bWJlciA9IDEpOiBudW1iZXIgPT4ge1xyXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXhOdW0gLSBtaW5OdW0gKyAxKSArIG1pbk51bSk7XHJcbn07XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uICAtIGFycmF5IHdpdGggc3BlY2lmaWVkIG51bWJlciBvZiByYW5kb20gbnVtYmVyc1xyXG5jb25zdCByYW5kb21OdW1iZXJzQXJyYXkgPSAoYXJyTGVuZ3RoOiBudW1iZXIsIG1heE51bTogbnVtYmVyLCBtaW5OdW06IG51bWJlciA9IDEpOiBudW1iZXJbXSA9PiB7XHJcbiAgICBsZXQgYXJyYXk6IG51bWJlcltdID0gW107XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyckxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IG5ld051bSA9IHJhbmRvbU51bWJlcihtYXhOdW0sIG1pbk51bSk7XHJcbiAgICAgICAgd2hpbGUgKGFycmF5LmluZGV4T2YobmV3TnVtKSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgbmV3TnVtID0gcmFuZG9tTnVtYmVyKG1pbk51bSwgbWF4TnVtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYXJyYXkucHVzaChuZXdOdW0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFycmF5O1xyXG59XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4vLyNyZWdpb24gLSBwcmV2ZW50TWVudSgpIC0gbmVtYSBkZXNuaSBrbGlrIG1lbmkgbmEgdGFibGlcclxuY29uc3QgcHJldmVudFRhYmxlTWVudSA9IChldmVudCk6dm9pZCA9PiB7XHJcbiAgICBsZXQgY2xpY2tlZFBsYWNlID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgaWYgKGNsaWNrZWRQbGFjZS50YWdOYW1lID09PSBcIlREXCIgfHwgY2xpY2tlZFBsYWNlLnRhZ05hbWUgPT09IFwiVEFCTEVcIiB8fCBjbGlja2VkUGxhY2UudGFnTmFtZSA9PT0gXCJJTUdcIikge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9XHJcbn1cclxuLy8jZW5kcmVnaW9uXHJcblxyXG5leHBvcnQgeyByYW5kb21OdW1iZXJzQXJyYXksIHByZXZlbnRUYWJsZU1lbnUgfTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvaGVscGVyRnVuY3MudHMiLCJpbXBvcnQgeyBHYW1lLCBQbGF5ZXIsIGdhbWVPcHRpb25zU2VjdGlvbiwgZ2FtZVN0YXJ0QnV0dG9uLCBnYW1lUmVzZXRCdXR0b24sIGdhbWVTZWN0aW9uLGdhbWUsIHBsYXllck5hbWVJbnB1dCx3ZWxjb21lU2NyZWVuIH0gZnJvbSAnLi9kYXRhJztcclxuaW1wb3J0IHsgZ2FtZU1vZGUsIGdhbWVNb2RlSW5wdXQgfSBmcm9tICcuL2dhbWVNb2RlJztcclxuaW1wb3J0IHsgY3JlYXRlR3JpZCB9IGZyb20gJy4vdGFibGVHcmlkJztcclxuaW1wb3J0IHsgc2V0TWluZXMsIGNsZWFyTWluZXMsIHNob3dNaW5lcywgd3JpdGVUaXBzIH0gZnJvbSAnLi9taW5lc0FuZFRpcHMnO1xyXG5pbXBvcnQgeyBvcGVuRW1wdHlFbGVtZW50LCBzdG9wQ2xpY2sgfSBmcm9tICcuL2VtcHR5Rmxvdyc7XHJcbmltcG9ydCB7IHByZXZlbnRUYWJsZU1lbnUgfSBmcm9tICcuL2hlbHBlckZ1bmNzJztcclxuaW1wb3J0IHsgc3RhcnRUaW1lckhhbmRsZXIsIHN0b3BUaW1lckhhbmRsZXIsIHJlc2V0VGltZXIsIHRpbWVyUGxhY2UsIGNhbGNTY29yZSB9IGZyb20gJy4vdGltZXInO1xyXG5pbXBvcnQgeyBoYW5kbGVSYW5raW5nIH0gZnJvbSAnLi9yYW5raW5nJztcclxuaW1wb3J0IHsgYm9vbSwgZ2FtZU92ZXIsIHdpbiB9IGZyb20gJy4vYW5pbWF0aW9uJztcclxuXHJcblxyXG5jb25zdCBtaW5lSWNvbiA9IFwiXFx1RDgzRFxcdURDQTNcIjsgLy8gZGVmaW5pc2VtbyBpa29uaWN1IHphIG1pbnUgdSBuZWtvbSBtb21lbnR1XHJcbmxldCBjbGlja0NvdW50ZXIgPSAwOyAvLyBmb2xsb3dzIGNsaWNrc1xyXG5cclxuLy8jcmVnaW9uIC0gbWFuYWdlSW5wdXRzKCkgLSBtYW5hZ2UgaW5wdXRzIG9uIGRvY3VtZW50IGJhc2VkIG9uIGV2ZW50XHJcbmNvbnN0IG1hbmFnZUlucHV0cyA9IChldmVudCk6IHN0cmluZyA9PiB7XHJcbiAgICBpZiAoZXZlbnQudGFyZ2V0LmlkID09PSBcInN0YXJ0XCIpIHtcclxuXHJcbiAgICAgICAgcGxheWVyTmFtZUlucHV0LnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAndHJ1ZScpO1xyXG4gICAgICAgIGdhbWVNb2RlSW5wdXQuc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICd0cnVlJyk7XHJcbiAgICAgICAgZ2FtZVN0YXJ0QnV0dG9uLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAndHJ1ZScpO1xyXG4gICAgICAgIGdhbWVSZXNldEJ1dHRvbi5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XHJcbiAgICAgICAgcmV0dXJuIFwic3RhcnRcIjtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGV2ZW50LnRhcmdldC5pZCA9PT0gXCJyZXNldFwiKSB7XHJcbiAgICAgICAgZ2FtZVJlc2V0QnV0dG9uLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAndHJ1ZScpO1xyXG4gICAgICAgIGdhbWVTdGFydEJ1dHRvbi5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XHJcbiAgICAgICAgZ2FtZU1vZGVJbnB1dC5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XHJcbiAgICAgICAgZ2FtZU1vZGVJbnB1dC52YWx1ZSA9ICdiZWdpbm5lcic7XHJcbiAgICAgICAgcGxheWVyTmFtZUlucHV0LnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcclxuICAgICAgICBnYW1lLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgICAgY2xpY2tDb3VudGVyID0gMDtcclxuICAgICAgICBzdG9wVGltZXJIYW5kbGVyKCk7XHJcbiAgICAgICAgcmVzZXRUaW1lcigpO1xyXG4gICAgICAgIHRpbWVyUGxhY2UudGV4dENvbnRlbnQgPSBcIjAwIDogMDAgOiAwMFwiO1xyXG4gICAgICAgIHJldHVybiBcInJlc2V0XCI7XHJcbiAgICB9XHJcbn07XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uIC0gY2hlY2tNb3ZlKCkgLSBwcm92ZXJhdmEgcG90ZXogaSBwcmVkdXppbWEgZGFsamUga29yYWtlXHJcbmNvbnN0IGNoZWNrTW92ZSA9IChlbGVtZW50OiBIVE1MRWxlbWVudCkgPT4ge1xyXG4gICAgY29uc3QgdGFibGUgPSBHYW1lLmdldEluc3RhbmNlKCkuZ2V0R2FtZVRhYmxlKCk7XHJcbiAgICBjb25zdCBhdHRyaWJ1dGUgPSBlbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtbWluZVwiKTtcclxuICAgIGlmIChhdHRyaWJ1dGUgPT09IFwiXFx1RDgzRFxcdURDQTNcIikge1xyXG4gICAgICAgIGlmIChjbGlja0NvdW50ZXIgPT09IDEpIHtcclxuICAgICAgICAgICAgcGxhbnRNaW5lc0FnYWluKCk7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG9uRmllbGRDbGljayk7XHJcbiAgICAgICAgICAgIGNoZWNrTW92ZShlbGVtZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudC5pZCkuY2xpY2soKTtcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IGJvbWIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgICAgICAgICAgYm9tYi5zZXRBdHRyaWJ1dGUoJ3NyYycsICcuL2ltYWdlcy9taW5lNTAucG5nJyk7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZW1wdHknKTtcclxuICAgICAgICAgICAgc3RvcFRpbWVySGFuZGxlcigpO1xyXG5cclxuICAgICAgICAgICAgdGFibGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG9uRmllbGRDbGljayk7XHJcbiAgICAgICAgICAgIHRhYmxlLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgZmxhZ0l0KTtcclxuXHJcblxyXG4gICAgICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKGJvbWIpO1xyXG4gICAgICAgICAgICBzaG93TWluZXModGFibGUsIG1pbmVJY29uKTtcclxuICAgICAgICAgICAgYm9vbSgpO1xyXG4gICAgICAgICAgICAvLyBhbGVydChcIkJPT09PT09NLi4uLi5Zb3UncmUgZGVhZCFcIik7XHJcblxyXG4gICAgICAgICAgICB0YWJsZS5jbGFzc0xpc3QuYWRkKCd0YWJsZScpO1xyXG4gICAgICAgICAgICBnYW1lT3ZlcigpO1xyXG5cclxuXHJcblxyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChhdHRyaWJ1dGUgPT09IFwiXCIpIHtcclxuICAgICAgICBvcGVuRW1wdHlFbGVtZW50KDxhbnk+ZWxlbWVudCk7XHJcbiAgICAgICAgY2hlY2tSZXN1bHQoKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGVsZW1lbnQudGV4dENvbnRlbnQgPSBhdHRyaWJ1dGU7XHJcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdjbGlja2VkJyk7XHJcbiAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWNsaWNrXCIsIFwiMVwiKTtcclxuICAgICAgICBjaGVja1Jlc3VsdCgpO1xyXG4gICAgfVxyXG59XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uIC0gZmxhZ0l0KCkgLSBwb3N0YXZsamFuamUgemFzdGF2ZSBuYSBkZXNuaSBrbGlrXHJcbmNvbnN0IGZsYWdJdCA9IChldmVudDogYW55KSA9PiB7XHJcbiAgICBsZXQgZWxlbWVudCA9IGV2ZW50LnRhcmdldDtcclxuICAgIGlmIChlbGVtZW50LnRhZ05hbWUgPT09IFwiVERcIikge1xyXG4gICAgICAgIGlmIChldmVudC53aGljaCA9PT0gMykge1xyXG4gICAgICAgICAgICAvLyBsZXQgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgICAgICAgICBsZXQgZmxhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG4gICAgICAgICAgICBpZiAoUGxheWVyLmdldEluc3RhbmNlKCkuZ2V0R2FtZU1vZGUoKSA9PT0gJ2JlZ2lubmVyJykge1xyXG4gICAgICAgICAgICAgICAgZmxhZy5zZXRBdHRyaWJ1dGUoJ3NyYycsICcuL2ltYWdlcy9mbGFnQi5wbmcnKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChQbGF5ZXIuZ2V0SW5zdGFuY2UoKS5nZXRHYW1lTW9kZSgpID09PSAnaW50ZXJtZWRpYXRlJykge1xyXG4gICAgICAgICAgICAgICAgZmxhZy5zZXRBdHRyaWJ1dGUoJ3NyYycsICcuL2ltYWdlcy9mbGFnSS5wbmcnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHsgZmxhZy5zZXRBdHRyaWJ1dGUoJ3NyYycsICcuL2ltYWdlcy9mbGFnRS5wbmcnKTsgfVxyXG4gICAgICAgICAgICBmbGFnLmNsYXNzTGlzdC5hZGQoJ2ZsYWcnKTtcclxuXHJcblxyXG4gICAgICAgICAgICAvLyBsZXQgZmxhZyA9IFwiXFx1MjY5MVwiO1xyXG4gICAgICAgICAgICBpZiAoZWxlbWVudC5pbm5lckhUTUwgPT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoZmxhZyk7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2VtcHR5Jyk7XHJcbiAgICAgICAgICAgICAgICBjaGVja1Jlc3VsdCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9IGVsc2UgaWYgKGVsZW1lbnQudGFnTmFtZSA9PT0gXCJJTUdcIikge1xyXG4gICAgICAgIGlmIChldmVudC53aGljaCA9PT0gMykge1xyXG4gICAgICAgICAgICBlbGVtZW50LnBhcmVudE5vZGUuY2xhc3NMaXN0LnJlbW92ZSgnZW1wdHknKTtcclxuICAgICAgICAgICAgZWxlbWVudC5wYXJlbnROb2RlLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vI3JlZ2lvbiAtIHBsYW50TWluZXNBZ2FpbigpXHJcbmxldCBwbGFudE1pbmVzQWdhaW4gPSAoKSA9PiB7XHJcbiAgICBjb25zdCB0YWJsZSA9IEdhbWUuZ2V0SW5zdGFuY2UoKS5nZXRHYW1lVGFibGUoKTtcclxuICAgIGxldCBnYW1lTW9kZUluZm8gPSBnYW1lTW9kZShnYW1lTW9kZUlucHV0LnZhbHVlKSBhcyBudW1iZXJbXTtcclxuICAgIGNsZWFyTWluZXModGFibGUpO1xyXG4gICAgc2V0TWluZXModGFibGUsIGdhbWVNb2RlSW5mbywgbWluZUljb24pO1xyXG4gICAgd3JpdGVUaXBzKHRhYmxlKTtcclxufTtcclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLyNyZWdpb24gLSBjaGVja1Jlc3VsdCgpIC0gcHJvdmVyYXZhIHJlenVsdGF0XHJcbmZ1bmN0aW9uIGNoZWNrUmVzdWx0KCkge1xyXG4gICAgY29uc3QgdGFibGUgPSBHYW1lLmdldEluc3RhbmNlKCkuZ2V0R2FtZVRhYmxlKCk7XHJcbiAgICBsZXQgZ2FtZU1vZGVJbmZvID0gZ2FtZU1vZGUoZ2FtZU1vZGVJbnB1dC52YWx1ZSkgYXMgbnVtYmVyW107XHJcbiAgICBsZXQgY2xvc2VkOiBhbnkgPSBbXTtcclxuICAgIGxldCBhbGxGaWVsZHMgPSB0YWJsZS5xdWVyeVNlbGVjdG9yQWxsKFwidGRcIik7XHJcbiAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKGFsbEZpZWxkcywgKGZpZWxkOiBhbnkpID0+IHtcclxuICAgICAgICBpZiAoZmllbGQuZ2V0QXR0cmlidXRlKFwiZGF0YS1jbGlja1wiLCBcIjFcIikpIHtcclxuICAgICAgICAgICAgY2xvc2VkLnB1c2goZmllbGQpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGlmICgoY2xvc2VkLmxlbmd0aCA9PT0gKChnYW1lTW9kZUluZm9bMF0gKiBnYW1lTW9kZUluZm9bMV0pIC0gZ2FtZU1vZGVJbmZvWzJdKSkpIHtcclxuICAgICAgICBzdG9wVGltZXJIYW5kbGVyKCk7XHJcbiAgICAgICAgUGxheWVyLmdldEluc3RhbmNlKCkuc2V0U2NvcmUoY2FsY1Njb3JlKCkpO1xyXG4gICAgICAgIHRhYmxlLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBvbkZpZWxkQ2xpY2spO1xyXG4gICAgICAgIHRhYmxlLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgZmxhZ0l0KTtcclxuICAgICAgICBoYW5kbGVSYW5raW5nKCk7XHJcbiAgICAgICAgd2luKCk7XHJcbiAgICAgICAgdGFibGUuY2xhc3NMaXN0LmFkZCgndGFibGUnKTtcclxuICAgIH1cclxufVxyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vI3JlZ2lvbiBvbkZpZWxkQ2xpY2soKSAtIGRlZmluaXNlIHJhc3BvcmVkIG5hIGtsaWtcclxuY29uc3Qgb25GaWVsZENsaWNrID0gKGV2ZW50OiBhbnkpID0+IHtcclxuICAgIGxldCBmaWVsZCA9IGV2ZW50LnRhcmdldDtcclxuICAgIGlmIChmaWVsZC50YWdOYW1lID09PSBcIlREXCIpIHtcclxuICAgICAgICBmaWVsZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc3RvcENsaWNrKTtcclxuICAgICAgICBmaWVsZC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHN0b3BDbGljayk7XHJcbiAgICAgICAgY2xpY2tDb3VudGVyKys7XHJcbiAgICAgICAgaWYgKGNsaWNrQ291bnRlciA9PT0gMSkgeyBzdGFydFRpbWVySGFuZGxlcigpIH07XHJcbiAgICAgICAgY2hlY2tNb3ZlKGZpZWxkKTtcclxuICAgIH1cclxufTtcclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLyNyZWdpb24gLSBwcmludEdyaWQoKSAtIGNyZWF0ZXMgZnVsbCBHcmlkIGFuZCBhZGRzIGl0IHRvIHRoZSBkb2N1bWVudFxyXG5jb25zdCBwcmludEdyaWQgPSAoKTogdm9pZCA9PiB7XHJcbiAgICBsZXQgZ2FtZU1vZGVJbmZvID0gZ2FtZU1vZGUoZ2FtZU1vZGVJbnB1dC52YWx1ZSkgYXMgbnVtYmVyW107XHJcbiAgICAvL2NyZWF0ZSB0YWJsZVxyXG4gICAgY3JlYXRlR3JpZChnYW1lTW9kZUluZm8pO1xyXG4gICAgY29uc3QgdGFibGUgPSBHYW1lLmdldEluc3RhbmNlKCkuZ2V0R2FtZVRhYmxlKCk7XHJcbiAgICB0YWJsZS5jbGFzc0xpc3QuYWRkKFBsYXllci5nZXRJbnN0YW5jZSgpLmdldEdhbWVNb2RlKCkpO1xyXG4gICAgLy9zZXQgbWluZXNcclxuICAgIHNldE1pbmVzKHRhYmxlLCBnYW1lTW9kZUluZm8sIG1pbmVJY29uKTtcclxuICAgIC8vIC8vIC8vc2V0IHRpcHNcclxuICAgIHdyaXRlVGlwcyh0YWJsZSk7XHJcbiAgICAvLyAvLyAvL3ByaW50IHRhYmxlXHJcbiAgICBnYW1lLmFwcGVuZENoaWxkKHRhYmxlKTtcclxuICAgIC8vIC8vc2V0IGxpc3RlbmVyc1xyXG4gICAgdGFibGUuYWRkRXZlbnRMaXN0ZW5lcihcImNvbnRleHRtZW51XCIsIHByZXZlbnRUYWJsZU1lbnUpO1xyXG4gICAgdGFibGUuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBmbGFnSXQpO1xyXG4gICAgdGFibGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbkZpZWxkQ2xpY2spO1xyXG5cclxufTtcclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLyNyZWdpb24gLSBvbkNsaWNrKCkgLSBtYWluIGZ1bmN0aW9uXHJcbmNvbnN0IG9uQ2xpY2sgPSAoZXZlbnQpOiB2b2lkID0+IHtcclxuICAgIGlmIChldmVudC50YXJnZXQudGFnTmFtZSA9PT0gXCJCVVRUT05cIikge1xyXG4gICAgICAgIGlmIChtYW5hZ2VJbnB1dHMoZXZlbnQpID09PSAnc3RhcnQnKSB7XHJcbiAgICAgICAgICAgIFBsYXllci5nZXRJbnN0YW5jZSgpLnNldE5hbWUocGxheWVyTmFtZUlucHV0LnZhbHVlKTtcclxuICAgICAgICAgICAgd2VsY29tZVNjcmVlbi5jbGFzc0xpc3QuYWRkKCdyZW1vdmUnKTtcclxuICAgICAgICAgICAgcHJpbnRHcmlkKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFBsYXllci5nZXRJbnN0YW5jZSgpLmdldE5hbWUoKSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFBsYXllci5nZXRJbnN0YW5jZSgpLmdldEdhbWVNb2RlKCkpO1xyXG4gICAgICAgICAgICBoYW5kbGVSYW5raW5nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vI3JlZ2lvbiAtIGdhbWVPcHRpb25zU2VjdGlvbiBldmVudCBsaXN0ZW5lcnNcclxuZ2FtZU9wdGlvbnNTZWN0aW9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25DbGljayk7XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9hcHAudHMiLCJpbXBvcnQgeyBHYW1lLCBQbGF5ZXIgfSBmcm9tICcuL2RhdGEnO1xyXG5cclxuLy8jcmVnaW9uIC0gc2VsZWN0b3JzXHJcbi8vIGNvbnN0IGN1c3RvbVJvd3NJbnB1dCA9IDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjdXN0b21Sb3dzJyk7XHJcbi8vIGNvbnN0IGN1c3RvbUNvbHNJbnB1dCA9IDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjdXN0b21Db2xzJyk7XHJcbi8vIGNvbnN0IGN1c3RvbU1pbmVzSW5wdXQgPSA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3VzdG9tTWluZXMnKTtcclxuY29uc3QgZ2FtZU1vZGVJbnB1dCA9IDxIVE1MU2VsZWN0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZU1vZGUnKTtcclxuLy8gY29uc3QgY3VzdG9tTW9kZU9wdGlvbnMgPSA8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2N1c3RvbU1vZGVPcHRpb25zJyk7XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8gLy8jcmVnaW9uIC0gZ2V0Q3VzdG9tUHJvcHMoKSAtIGdldHMgY3VzdG9tIHByb3BlcnRpZXMgZnJvbSB1c2VyIGlucHV0XHJcbi8vIGNvbnN0IGdldEN1c3RvbVByb3BzID0gKCkgPT4ge1xyXG4vLyAgICAgbGV0IGN1c3RvbVByb3BzID0gW1xyXG4vLyAgICAgICAgIHBhcnNlSW50KGN1c3RvbVJvd3NJbnB1dC52YWx1ZSksXHJcbi8vICAgICAgICAgcGFyc2VJbnQoY3VzdG9tQ29sc0lucHV0LnZhbHVlKSxcclxuLy8gICAgICAgICBwYXJzZUludChjdXN0b21NaW5lc0lucHV0LnZhbHVlKSxcclxuLy8gICAgIF07XHJcbi8vICAgICByZXR1cm4gY3VzdG9tUHJvcHM7XHJcbi8vIH1cclxuLy8gLy8jZW5kcmVnaW9uXHJcblxyXG4vLyAvLyNyZWdpb24gLSBkaXNwbGF5Q3VzdG9tTW9kZU9wdHMoKSAtIGhpZGVzIG9yIHNob3dzIGRpdiB3aXRoIGN1c3RvbSBnYW1lIG9wdGlvbnMgaW4gZG9jdW1lbnRcclxuLy8gbGV0IGRpc3BsYXlDdXN0b21Nb2RlT3B0aW9ucyA9ICgpOiB2b2lkID0+IHtcclxuLy8gICAgIGlmIChnYW1lTW9kZUlucHV0LnZhbHVlID09PSBcImN1c3RvbVwiKSB7XHJcbi8vICAgICAgICAgY3VzdG9tTW9kZU9wdGlvbnMhLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xyXG4vLyAgICAgfSBlbHNlIHsgY3VzdG9tTW9kZU9wdGlvbnMhLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpOyB9XHJcbi8vIH07XHJcbi8vIC8vI2VuZHJlZ2lvblxyXG5cclxuLy8gLy8jcmVnaW9uIC0gY3VzdG9tSW5wdXRWYWxpZGF0aW9uKCkgLSBjdXN0b20gZ2FtZSBtb2RlIGlucHV0IHZhbGlkYXRpb25cclxuLy8gY29uc3QgY3VzdG9tSW5wdXRWYWxpZGF0aW9uID0gKG1vZGVJbmZvOiBudW1iZXJbXSkgPT4gey8vZ2FtZSBtb2RlIGluZm8gW3Jvd3MsY29scyxtaW5lc11cclxuLy8gICAgIGlmIChtb2RlSW5mb1syXSA+PSBtb2RlSW5mb1swXSAqIG1vZGVJbmZvWzFdKSB7ICAvL251bSBvZiBtaW5lcyB2YWxpZGF0aW9uLGNhbid0IGJlIG1vcmUgbWluZXMgdGhhbiBmaWVsZHMgb3IgZXF1YWwgdG8gbnVtIG9mIGZpZWxkc1xyXG4vLyAgICAgICAgIGFsZXJ0KFwiQ2FuJ3QgaGF2ZSBtb3JlIG1pbmVzIHRoYW4gZmllbGRzXCIpO1xyXG4vLyAgICAgICAgIHJldHVybiBmYWxzZTtcclxuLy8gICAgIH0gcmV0dXJuIHRydWU7XHJcbi8vIH07XHJcbi8vIC8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uIC0gZ2FtZU1vZGUoKSAtIGdhbWUgbW9kZSBzd2l0Y2hlclxyXG5jb25zdCBnYW1lTW9kZSA9IChtb2RlOiBzdHJpbmcpOiBudW1iZXJbXSB8IHN0cmluZyA9PiB7XHJcbiAgICBzd2l0Y2ggKG1vZGUpIHtcclxuICAgICAgICBjYXNlIFwiYmVnaW5uZXJcIjpcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJHYW1lIG1vZGU6IEJlZ2lubmVyIDl4OSB0YWJsZSB3aXRoIDEwIG1pbmVzXCIpO1xyXG4gICAgICAgICAgICBQbGF5ZXIuZ2V0SW5zdGFuY2UoKS5zZXRHYW1lTW9kZShtb2RlKTtcclxuICAgICAgICAgICAgcmV0dXJuIEdhbWUuZ2V0SW5zdGFuY2UoKS5tb2RlSW5mbyhtb2RlKTtcclxuICAgICAgICBjYXNlIFwiaW50ZXJtZWRpYXRlXCI6XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR2FtZSBtb2RlOiBJbnRlcm1lZGlhdGUgMTZ4MTYgdGFibGUgd2l0aCA0MCBtaW5lc1wiKTtcclxuICAgICAgICAgICAgUGxheWVyLmdldEluc3RhbmNlKCkuc2V0R2FtZU1vZGUobW9kZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBHYW1lLmdldEluc3RhbmNlKCkubW9kZUluZm8obW9kZSk7XHJcbiAgICAgICAgY2FzZSBcImV4cGVydFwiOlxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdhbWUgbW9kZTogRXhwZXJ0IDE2eDMwIHRhYmxlIHdpdGggOTkgbWluZXNcIik7XHJcbiAgICAgICAgICAgIFBsYXllci5nZXRJbnN0YW5jZSgpLnNldEdhbWVNb2RlKG1vZGUpO1xyXG4gICAgICAgICAgICByZXR1cm4gR2FtZS5nZXRJbnN0YW5jZSgpLm1vZGVJbmZvKG1vZGUpO1xyXG4gICAgICAgIC8vIGNhc2UgXCJjdXN0b21cIjpcclxuICAgICAgICAvLyAgICAgUGxheWVyLmdldEluc3RhbmNlKCkuc2V0R2FtZU1vZGUobW9kZSk7XHJcbiAgICAgICAgLy8gICAgIGlmIChjdXN0b21JbnB1dFZhbGlkYXRpb24oZ2V0Q3VzdG9tUHJvcHMoKSkgPT09IGZhbHNlKSB7IHJldHVybiBnYW1lTW9kZShcIlZhbGlkYXRpb25cIikgfVxyXG4gICAgICAgIC8vICAgICBHYW1lLmdldEluc3RhbmNlKCkuc2V0Q3VzdG9tTW9kZShnZXRDdXN0b21Qcm9wcygpKTtcclxuICAgICAgICAvLyAgICAgY29uc29sZS5sb2coYEdhbWUgbW9kZTogQ3VzdG9tICR7R2FtZS5nZXRJbnN0YW5jZSgpLm1vZGVJbmZvKG1vZGUpWzBdfXgke0dhbWUuZ2V0SW5zdGFuY2UoKS5tb2RlSW5mbyhtb2RlKVsxXX0gdGFibGUgd2l0aCAke0dhbWUuZ2V0SW5zdGFuY2UoKS5tb2RlSW5mbyhtb2RlKVsyXX0gbWluZShzKWApO1xyXG4gICAgICAgIC8vICAgICByZXR1cm4gR2FtZS5nZXRJbnN0YW5jZSgpLm1vZGVJbmZvKG1vZGUpO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIGlmIChtb2RlID09PSBcIlZhbGlkYXRpb25cIikgeyBjb25zb2xlLmVycm9yKFwiVmFsaWRhdGlvbiBpc3N1ZVwiKTsgcmV0dXJuIFwiZXJyb3IhXCIgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1RoZXJlIGlzIG5vIGdhbWUgbW9kZSB3aXRoIHRoYXQgbnVtYmVyIScpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiZXJyb3IhXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgIH1cclxufTtcclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLyNyZWdpb24gLSBldmVudCBsaXN0ZW5lcm5zXHJcbmdhbWVNb2RlSW5wdXQudmFsdWUgPSBcImJlZ2lubmVyXCI7XHJcbi8vIGdhbWVNb2RlSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZGlzcGxheUN1c3RvbU1vZGVPcHRpb25zKTtcclxuLy8jZW5kcmVnaW9uXHJcblxyXG5leHBvcnQgeyBnYW1lTW9kZSwgZ2FtZU1vZGVJbnB1dCB9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9nYW1lTW9kZS50cyIsImltcG9ydCB7IEdhbWUsIFBsYXllciB9IGZyb20gJy4vZGF0YSc7XHJcbmltcG9ydCB7IGRlZmluZVN1cnJvdW5kaW5nIH0gZnJvbSAnLi90YWJsZUdyaWQnO1xyXG5pbXBvcnQgeyByYW5kb21OdW1iZXJzQXJyYXkgfSBmcm9tICcuL2hlbHBlckZ1bmNzJztcclxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1NSU5FUz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vI3JlZ2lvbiBjcmVhdGVNaW5lcygpIC0gY3JlYXRlIG1pbmVzIGJhc2VkIG9uIGdhbWVNb2RlXHJcbmNvbnN0IGNyZWF0ZU1pbmVzID0gKG1vZGVJbmZvOiBudW1iZXJbXSk6IG51bWJlcltdID0+IHsvLyBrcmVpcmEgbWluZSBpIHNvcnRpcmEgaWggcG8gdmVsaWNpbmlcclxuICAgIGxldCBtaW5lcyA9IHJhbmRvbU51bWJlcnNBcnJheShtb2RlSW5mb1syXSwgKG1vZGVJbmZvWzBdICogbW9kZUluZm9bMV0pKS5zb3J0KChhLCBiKSA9PiB7IHJldHVybiBhIC0gYiB9KTtcclxuICAgIGNvbnNvbGUubG9nKFwiTWluZXMgbG9jYXRpb246IFwiICsgbWluZXMpOyAvLyBwcm92ZXJhdmFtbyBwb3ppY2lqdSBtaW5hIC8vIHphIGRldiBwb3RyZWJlXHJcbiAgICByZXR1cm4gbWluZXM7XHJcbn1cclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLyNyZWdpb24gLSBzZXRNaW5lcygpIC0gc2V0IG1pbmVzIG9uIHRhYmxlIChiaW5kIHRvIGF0dHJpYnV0ZSBkYXRhLW1pbmUpXHJcbmNvbnN0IHNldE1pbmVzID0gKHRhYmxlOiBIVE1MRWxlbWVudCwgbW9kZUluZm86IG51bWJlcltdLCBtaW5lSWNvbjogYW55KTogdm9pZCA9PiB7XHJcbiAgICBsZXQgbWluZXM6IG51bWJlcltdID0gY3JlYXRlTWluZXMobW9kZUluZm8pOy8va3JlaXJhbW8gbWluZVxyXG4gICAgY29uc3QgYWxsRmllbGRzID0gdGFibGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJ0ZFwiKTsgLy8gdXppbWFtbyBzdmUgdGQgZWxlbWVudGUgaXogdGFiZWxlXHJcbiAgICBtaW5lcy5mb3JFYWNoKG1pbmUgPT4geyAgLy8gcG9zdGF2bGphbW8gaWtvbnUgYm9tYmEgbmEgc3Zha2kgdGQga29qaSBzZSBwb2tsYXBhIHNhIG5pem9tIG1pbmEuXHJcbiAgICAgICAgYWxsRmllbGRzWyhtaW5lIC0gMSldLnNldEF0dHJpYnV0ZShcImRhdGEtbWluZVwiLCBtaW5lSWNvbik7IC8vIC0xIHpib2cgcmF6bGlrZSB1IHBvemljaWppIHBvbGphIHUgbml6dSBhbGxmaWVsZHMgaSBwb3ppY2lqZSBtaW5lXHJcbiAgICB9KTtcclxufVxyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vI3JlZ2lvbiAtIGNsZWFyTWluZXMoKSAtIGNsZWFyIG1pbmVzIGZyb20gdGFibGVcclxuY29uc3QgY2xlYXJNaW5lcyA9ICh0YWJsZTogSFRNTEVsZW1lbnQpOiB2b2lkID0+IHtcclxuICAgIGNvbnN0IGFsbEZpZWxkcyA9IHRhYmxlLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwidGRcIik7XHJcbiAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKGFsbEZpZWxkcywgKGZpZWxkOiBIVE1MVGFibGVEYXRhQ2VsbEVsZW1lbnQpID0+IHtcclxuICAgICAgICBmaWVsZC5zZXRBdHRyaWJ1dGUoJ2RhdGEtbWluZScsICcnKTtcclxuICAgIH0pO1xyXG59XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uIC0gc2hvd01pbmVzKCkgLSBzaG93IG1pbmVzIG9uIGdyaWRcclxuY29uc3Qgc2hvd01pbmVzID0gKHRhYmxlLCBtaW5lSWNvbikgPT4ge1xyXG4gICAgY29uc3QgYWxsRmllbGRzID0gdGFibGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJ0ZFwiKTtcclxuICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoYWxsRmllbGRzLCAoZmllbGQ6IEhUTUxUYWJsZURhdGFDZWxsRWxlbWVudCkgPT4ge1xyXG4gICAgICAgIGlmIChmaWVsZC5nZXRBdHRyaWJ1dGUoJ2RhdGEtbWluZScpID09PSBtaW5lSWNvbikge1xyXG4gICAgICAgICAgICBmaWVsZC5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgICAgICAgICBsZXQgaW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgICAgICAgICAgaWYgKFBsYXllci5nZXRJbnN0YW5jZSgpLmdldEdhbWVNb2RlKCkgPT09ICdiZWdpbm5lcicpIHtcclxuICAgICAgICAgICAgICAgIGltYWdlLnNldEF0dHJpYnV0ZSgnc3JjJywgJy4vaW1hZ2VzL21pbmVCLnBuZycpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKFBsYXllci5nZXRJbnN0YW5jZSgpLmdldEdhbWVNb2RlKCkgPT09ICdpbnRlcm1lZGlhdGUnKSB7XHJcbiAgICAgICAgICAgICAgICBpbWFnZS5zZXRBdHRyaWJ1dGUoJ3NyYycsICcuL2ltYWdlcy9taW5lSS5wbmcnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHsgaW1hZ2Uuc2V0QXR0cmlidXRlKCdzcmMnLCAnLi9pbWFnZXMvbWluZUUucG5nJyk7IH1cclxuICAgICAgICAgICAgZmllbGQuY2xhc3NMaXN0LmFkZCgnZW1wdHknKTtcclxuICAgICAgICAgICAgZmllbGQuYXBwZW5kQ2hpbGQoaW1hZ2UpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59O1xyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vTkFQT01FTkEgZGF0YS1taW5lIC0gYWtvIGplIGJvbWJhIHN0YXZsamEgc2UgaWtvbmEsIGFrbyBuaWplIHN0YXZsamEgc2UgYnJvaiBib21iaSB1IG9rcnV6ZW5qdVxyXG5cclxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1USVBTPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4vLyNyZWdpb24gLSB3cml0ZSB0aXBzIGJhc2VkIG9uIG1pbmVzIG9uIHRoZSBnaXZlbiB0YWJsZVxyXG5jb25zdCB3cml0ZVRpcHMgPSAodGFibGU6IEhUTUxUYWJsZUVsZW1lbnQpOiB2b2lkID0+IHtcclxuICAgIGNvbnN0IGFsbEZpZWxkcyA9IHRhYmxlLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwidGRcIik7IC8vIHNlbGVrdHVqZW1vIHN2YSBwb2xqYSB1IGRhdG9qIHRhYmVsaVxyXG4gICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChhbGxGaWVsZHMsIGZpZWxkID0+IHsgLy8gemEgc3Zha28gcG9samVcclxuICAgICAgICBpZiAoZmllbGQuZ2V0QXR0cmlidXRlKFwiZGF0YS1taW5lXCIpID09PSBcIlwiKSB7IC8vIGFrbyBqZSBlbGVtZW50IHByYXphbiAodGouIG5pamUgbWluYSwgamVyIHN1IG1pbmUgdmVjIHBvc3RhdmxqZW5lIG5hIHRhYmxpKVxyXG4gICAgICAgICAgICBsZXQgbWluZXNOdW0gPSBjb3VudE1pbmVzKGZpZWxkKTsgLy8gcHJvdmVyYXZhbW8gc3VzZWRuYSBwb2xqYSBpIGlzcGlzdWplbW8gYnJvaiBtaW5hIHUgb2tvbGluaVxyXG4gICAgICAgICAgICBpZiAobWluZXNOdW0gPT09IDApIHsgZmllbGQuc2V0QXR0cmlidXRlKFwiZGF0YS1taW5lXCIsIFwiXCIpOyBmaWVsZC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWVtcHR5XCIsIFwiMVwiKTsgfS8vIGFrbyBuaWplIG1pbmEgaSBuZW1hIHUgb2tydXplbmp1IHVwaXN1amVtbyB1IGRhdGEtZW1wdHkgMTsxIHphIHRydWU7XHJcbiAgICAgICAgICAgIGVsc2UgeyBmaWVsZC5zZXRBdHRyaWJ1dGUoXCJkYXRhLW1pbmVcIiwgbWluZXNOdW0udG9TdHJpbmcoKSk7IGZpZWxkLnNldEF0dHJpYnV0ZShcImRhdGEtZW1wdHlcIiwgXCIwXCIpOyAvKmVsZW1lbnQudGV4dENvbnRlbnQgPSB0ZXh0OyB6YSBkZXYgcG90cmViZSovIH0gLy9ha28gaW1hIG1pbmE7ZGF0YS1lbXB0eSA7IDAgemEgZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uIC0gZnVua2NpamEga29qYSBwcm92ZXJhdmEgcG9samEgdSBva3J1emVuanVcclxuZnVuY3Rpb24gY291bnRNaW5lcyhmaWVsZDogSFRNTFRhYmxlQ2VsbEVsZW1lbnQpOiBudW1iZXIgeyAvLyBwcm9zbGVkanVqZW1vIHBvbGplIG5hIG9zbm92dSBrb2plZyB2cnNpbW8gcHJvdmVydSBpIGJyb2oga29sb25hIHpib2cgb3JpamVudGFjaWplXHJcbiAgICBjb25zdCBnYW1lTW9kZUluZm8gPSBHYW1lLmdldEluc3RhbmNlKCkubW9kZUluZm8oUGxheWVyLmdldEluc3RhbmNlKCkuZ2V0R2FtZU1vZGUoKSk7XHJcbiAgICBjb25zdCBudW1PZkNvbHM6IG51bWJlciA9IGdhbWVNb2RlSW5mb1sxXTtcclxuICAgIGxldCBjb3VudGVyID0gMDsgLy8gYnJvamFjIG1pbmEgdSBva3J1emVuanUgcG9samFcclxuICAgIGxldCBzdXJyb3VuZGluZyA9IGRlZmluZVN1cnJvdW5kaW5nKEdhbWUuZ2V0SW5zdGFuY2UoKS5nZXRHYW1lVGFibGUoKSwgZmllbGQpOyAvLyBrcmVpcmFtbyBva3J1emVuamUgKHBveml2YW1vIGZ1bmtjaWp1IHphIHRvKVxyXG4gICAgc3Vycm91bmRpbmcuZm9yRWFjaChzdXJGaWVsZCA9PiB7IC8vIHByb3ZlcmF2YW1vIHN2YWtvIHBvbGplIHUgb2tydXplbmp1XHJcbiAgICAgICAgaWYgKHN1ckZpZWxkID09PSBudWxsKSB7IH0vLyBha28gamUgcG9samUgdmFuIHRhYmVsZSwgaWdub3Jpc2lcclxuICAgICAgICBlbHNlIGlmIChzdXJGaWVsZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLW1pbmVcIikgPT09IFwiXFx1RDgzRFxcdURDQTNcIikgeyAvLyB6YSBzdmFrdSBtaW51XHJcbiAgICAgICAgICAgIGNvdW50ZXIrKzsgLy9kb2RhaiBqZWRhbiB1IGJyb2phY1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGNvdW50ZXI7IC8vIGNlbGEgZnVua2NpamEgdnJhY2EgYnJvamFjIHRqLiB1a3VwYSBicm9qIG1pbmEgdSBva3J1emVuanVcclxufVxyXG4vLyNlbmRyZWdpb25cclxuXHJcbmV4cG9ydCB7IHNldE1pbmVzLCBjbGVhck1pbmVzLCBzaG93TWluZXMsIHdyaXRlVGlwcyB9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9taW5lc0FuZFRpcHMudHMiLCJpbXBvcnQgeyBHYW1lLCBQbGF5ZXIgfSBmcm9tICcuL2RhdGEnO1xyXG5pbXBvcnQgeyBkZWZpbmVTdXJyb3VuZGluZyB9IGZyb20gJy4vdGFibGVHcmlkJztcclxuXHJcblxyXG5cclxuLy8jcmVnaW9uIC0gc3RvcENsaWNrKCkgLSBzdG9waXJhIGV2ZW50TElzdGVuZXIgbmEgZWxlbWVudHUga29qaSBqZSBrbGlrbnV0XHJcbmZ1bmN0aW9uIHN0b3BDbGljayhldmVudDogYW55KSB7XHJcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxufVxyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vPT09PT09PT09PT09PT09PT09PT09RU1QVFkgRkxPVz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vI3JlZ2lvbiAtIG9wZW5FbXB0eUVsZW1lbnQoKSAtIGZsb3cgZnVuY3Rpb25cclxuXHJcbmxldCBvcGVuRW1wdHlFbGVtZW50ID0gKGVsZW1lbnQ6IEhUTUxUYWJsZURhdGFDZWxsRWxlbWVudCkgPT4gey8vIHBva3JlY2UgZW1wdHkgZmxvdyBwcm92ZXJ1XHJcbiAgICBsZXQgZW1wdHlGaWVsZHMgPSBmaXJzdEVtcHR5RmllbGRDaGVjayhlbGVtZW50KTsvL3Byb3ZlcmF2YSBzZSBwcnZvIHByYXpubyBwb2xqZSBpIGV2aWRlbnRpcmFqdSBvc3RhbGEgcHJhem5hIHBvbGphIHUgb2tydXplbmp1XHJcbiAgICAvLyBjb25zb2xlLmxvZyhlbXB0eUZpZWxkcyk7XHJcbiAgICBsZXQgc3RvcFNlYXJjaCA9IGZhbHNlO1xyXG5cclxuICAgIHdoaWxlIChzdG9wU2VhcmNoID09IGZhbHNlKSB7XHJcbiAgICAgICAgaWYgKGVtcHR5RmllbGRzLmxlbmd0aCAhPSAwKSB7XHJcbiAgICAgICAgICAgIGxldCBuZXdNYWluQXJyYXk6IGFueVtdID0gW107XHJcblxyXG4gICAgICAgICAgICBlbXB0eUZpZWxkcy5mb3JFYWNoKGZpZWxkID0+IHsvLyB6YSBzdmFrbyBwcmF6bm8gcG9samVcclxuICAgICAgICAgICAgICAgIGVtcHR5Q2VsbChmaWVsZCk7Ly8gdG90YWxubyBnYSBwcmF6bmltb1xyXG4gICAgICAgICAgICAgICAgbGV0IHN1YkFycmF5ID0gZGVmaW5lU3Vycm91bmRpbmcoR2FtZS5nZXRJbnN0YW5jZSgpLmdldEdhbWVUYWJsZSgpLCBmaWVsZCk7Ly9wcm92ZXJhdmFtbyBva3J1emVuamUgdG9nIHBvbGphXHJcbiAgICAgICAgICAgICAgICBzdWJBcnJheS5mb3JFYWNoKChlbGVtZW50KSA9PiB7Ly96YSBzdmFrbyBwb2xqZSBpeiBva3J1emVuamEgdG9nIHBvbGphXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQgIT09IG51bGwpIHsvL2FrbyBqZSBlbGVtZW50IHUgb2t2aXJ1IHRhYmxlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKFwiZGF0YS1jbGlja1wiLCBcIjFcIik7Ly9wb3N0YXZsamFtbyBkYSBqZSBrbGlrbnV0b1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzdG9wQ2xpY2spOy8vYnJpc2VtbyBldmVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgc3RvcENsaWNrKTsvLyBicmlzZW1vIGV2ZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXdNYWluQXJyYXkuaW5kZXhPZihlbGVtZW50KSAhPT0gLTEpIHsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHsgbmV3TWFpbkFycmF5LnB1c2goZWxlbWVudCkgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGV4dCA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1pZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRleHQgPT09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbXB0eUNlbGwoPGFueT5lbGVtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgbmV3TWFpbkFycmF5ID0gY2hlY2tFbXB0eUZpZWxkcyhuZXdNYWluQXJyYXkpO1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cobmV3TWFpbkFycmF5KTtcclxuICAgICAgICAgICAgICAgIGVtcHR5RmllbGRzID0gbmV3TWFpbkFycmF5O1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgc3RvcFNlYXJjaCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgc3RvcFNlYXJjaCA9IHRydWU7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLyNyZWdpb24gLSBlbXB0eUNlbGwoKVxyXG5jb25zdCBlbXB0eUNlbGwgPSAoZWxlbWVudDogSFRNTFRhYmxlRGF0YUNlbGxFbGVtZW50KTogdm9pZCA9PiB7XHJcbiAgICBpZiAoZWxlbWVudCAhPT0gbnVsbCkge1xyXG4gICAgICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShcImRhdGEtZW1wdHlcIiwgXCJcIik7Ly9BTEVSVCBicmlzZSBzZSBpbmZvIG8gdG9tZSBkYSBsaSBqZSBwcmF6bmEgY2VsaWphLCBwcm92ZXJpdGkgemFzdG9cclxuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJlbXB0eVwiKTsvL2NzcyBjbGFzYSBkYSBzZSBvYm9qaSBwcmF6bm8gcG9samVcclxuXHJcbiAgICB9XHJcbn1cclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLyNyZWdpb24gLSBjaGVja0VtcHR5RmllbGRzKCkgLSBjaGVjayBlbXB0eSBmaWVsZHMgaWYgaXQgaXMgdG90YWxseSBlbXB0eSBvciBpdHMgYSB0aXBcclxuY29uc3QgY2hlY2tFbXB0eUZpZWxkcyA9IChmaWVsZHM6IGFueSkgPT4ge1xyXG4gICAgbGV0IGNoZWNrZWRFbXB0eUZpZWxkczogSFRNTFRhYmxlRGF0YUNlbGxFbGVtZW50W10gPSBbXTtcclxuICAgIGZpZWxkcy5mb3JFYWNoKGZpZWxkID0+IHtcclxuICAgICAgICBpZiAoZmllbGQgPT09IG51bGwpIHsgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBmaWVsZC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWNsaWNrXCIsIFwiMVwiKTsvL3NldCBmaWVsZCBhcyBjbGlja2VkXHJcbiAgICAgICAgICAgIGZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzdG9wQ2xpY2spOy8vdWtkaWRhIGV2ZW50XHJcbiAgICAgICAgICAgIGZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgc3RvcENsaWNrKTsvL3VraWRhIGV2ZW50XHJcbiAgICAgICAgICAgIGNvbnN0IGlzRW1wdHkgPSBmaWVsZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWVtcHR5XCIpO1xyXG4gICAgICAgICAgICBjb25zdCBjb250ZXh0ID0gZmllbGQuZ2V0QXR0cmlidXRlKFwiZGF0YS1taW5lXCIpO1xyXG4gICAgICAgICAgICBpZiAoaXNFbXB0eSA9PT0gXCIxXCIpIHsvLyBpZiBmaWVsZCBpcyB0b3RhbGx5IGVtcHR5XHJcbiAgICAgICAgICAgICAgICBjaGVja2VkRW1wdHlGaWVsZHMucHVzaChmaWVsZCk7XHJcbiAgICAgICAgICAgICAgICBmaWVsZC5jbGFzc0xpc3QuYWRkKFwiZW1wdHlcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7IGZpZWxkLnRleHRDb250ZW50ID0gY29udGV4dDtmaWVsZC5jbGFzc0xpc3QuYWRkKCdjbGlja2VkJyk7IH0vLyBpZiBpdHMgdGlwLCBzaG93IGl0XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gY2hlY2tlZEVtcHR5RmllbGRzOyAvLyByZXR1cm5pbmcgYXJyYXkgb2YgdG90YWxseSBlbXB0eSBmaWVsZHNcclxufVxyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vI3JlZ2lvbiAtIGZpcnN0RW1wdHlGaWVsZENoZWNrKCkgLSBGaXJzdCBjbGlja2VkIGVtcHR5IGVsZW1lbnQgY2hlY2ssIHJldHVybnMgYXJyYXkgb2YgZW1wdHkgYmxhbmsgZWxlbWVudHNcclxuY29uc3QgZmlyc3RFbXB0eUZpZWxkQ2hlY2sgPSAoZmllbGQ6IEhUTUxUYWJsZURhdGFDZWxsRWxlbWVudCkgPT4gey8vY2hlY2tpbmcgZmlyc3QgZW1wdHkgY2xpY2tlZCBmaWVsZFxyXG4gICAgZmllbGQuc2V0QXR0cmlidXRlKFwiZGF0YS1jbGlja1wiLCBcIjFcIik7IC8vIHNldCBjbGlja2VkXHJcbiAgICBmaWVsZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc3RvcENsaWNrKTsvL3N0b3BpcmEgZXZlbnQgY2xpY2tcclxuICAgIGZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgc3RvcENsaWNrKTsgLy8gc3RvcGlyYSBldmVudCBtb3VzZWRvd25cclxuICAgIGVtcHR5Q2VsbChmaWVsZCk7IC8vIHJlbW92ZSBlbXB0eSBhdHRyaWJ1dGUsIGNvbG9yIGZpZWxkXHJcblxyXG4gICAgY29uc3Qgc3Vycm91bmRGaWVsZHMgPSBkZWZpbmVTdXJyb3VuZGluZyhHYW1lLmdldEluc3RhbmNlKCkuZ2V0R2FtZVRhYmxlKCksIGZpZWxkKTsvL2tyZWlyYSBuaXogc3VzZWRuaWggcG9samFcclxuICAgIGNvbnN0IGVtcHR5RmllbGRzID0gY2hlY2tFbXB0eUZpZWxkcyhzdXJyb3VuZEZpZWxkcyk7XHJcbiAgICByZXR1cm4gZW1wdHlGaWVsZHM7XHJcbn1cclxuLy8jZW5kcmVnaW9uXHJcbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbmV4cG9ydCB7IG9wZW5FbXB0eUVsZW1lbnQsIHN0b3BDbGljayB9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9lbXB0eUZsb3cudHMiLCJsZXQgdGltZXIgPSB7XHJcbiAgICB0aW1lOiB7XHJcbiAgICAgICAgaG91cnM6IDAsXHJcbiAgICAgICAgbWludXRlczogMCxcclxuICAgICAgICBzZWNvbmRzOiAwXHJcbiAgICB9LFxyXG4gICAgaW50ZXJ2YWw6IDEsXHJcbiAgICB0aW1lSW5jcmVtZW50OiAoKSA9PiB7XHJcbiAgICAgICAgaWYgKHRpbWVyLnRpbWUuc2Vjb25kcyA8IDU5KSB7IHRpbWVyLnRpbWUuc2Vjb25kcysrIH1cclxuICAgICAgICBlbHNlIGlmICh0aW1lci50aW1lLnNlY29uZHMgPT09IDU5ICYmIHRpbWVyLnRpbWUubWludXRlcyA8IDU5KSB7IHRpbWVyLnRpbWUuc2Vjb25kcyA9IDAsIHRpbWVyLnRpbWUubWludXRlcysrIH1cclxuICAgICAgICBlbHNlIGlmICh0aW1lci50aW1lLnNlY29uZHMgPT09IDU5ICYmIHRpbWVyLnRpbWUubWludXRlcyA9PT0gNTkpIHsgdGltZXIudGltZS5zZWNvbmRzID0gMCwgdGltZXIudGltZS5taW51dGVzID0gMCwgdGltZXIudGltZS5ob3VycysrIH1cclxuICAgIH1cclxufTtcclxuXHJcblxyXG5sZXQgY2FsY1Njb3JlID0gKCk6IG51bWJlciA9PiB7XHJcbiAgICByZXR1cm4gdGltZXIudGltZS5zZWNvbmRzICsgKHRpbWVyLnRpbWUubWludXRlcyAqIDYwKSArICh0aW1lci50aW1lLmhvdXJzICogMzYwKTtcclxufTtcclxuXHJcblxyXG5sZXQgZ2V0U3RyaW5nVGltZSA9ICgpID0+IHtcclxuICAgIGxldCBwcmV2VGltZSA9IFt0aW1lci50aW1lLmhvdXJzLCB0aW1lci50aW1lLm1pbnV0ZXMsIHRpbWVyLnRpbWUuc2Vjb25kc107XHJcbiAgICBsZXQgY3VyclRpbWUgPSBwcmV2VGltZS5tYXAoKHRpbWVFbGVtZW50KSA9PiB7IGlmICh0aW1lRWxlbWVudCA8IDEwKSB7IHJldHVybiBcIjBcIiArIHRpbWVFbGVtZW50IH0gZWxzZSB7IHJldHVybiB0aW1lRWxlbWVudCB9IH0pO1xyXG4gICAgcmV0dXJuIGAke2N1cnJUaW1lWzBdfSA6ICR7Y3VyclRpbWVbMV19IDogJHtjdXJyVGltZVsyXX1gO1xyXG59O1xyXG5cclxubGV0IHN0YXJ0VGltZXIgPSAoc3RlcCA9IDEpOiB2b2lkID0+IHtcclxuICAgIHRpbWVyLmludGVydmFsID0gc2V0SW50ZXJ2YWwodGltZXIudGltZUluY3JlbWVudCwgc3RlcCAqIDEwMDApO1xyXG59O1xyXG5cclxubGV0IHN0b3BUaW1lciA9ICgpOiB2b2lkID0+IHtcclxuICAgIGNsZWFySW50ZXJ2YWwodGltZXIuaW50ZXJ2YWwpO1xyXG59O1xyXG5cclxubGV0IHJlc2V0VGltZXIgPSAoKSA9PiB7XHJcbiAgICBmb3IgKGxldCBlbGVtZW50IGluIHRpbWVyLnRpbWUpIHsgdGltZXIudGltZVtlbGVtZW50XSA9IDAgfTtcclxufVxyXG5cclxubGV0IHN0cmluZ0ludGVydmFsID0gMDsgLy8gemEgaXNwaXMgc3RyaW5nIHZyZW1lbmFcclxuY29uc3QgdGltZXJQbGFjZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aW1lclBsYWNlJyk7XHJcblxyXG5sZXQgc3RhcnRUaW1lckhhbmRsZXIgPSAoKSA9PiB7XHJcbiAgICBzdGFydFRpbWVyKCk7XHJcbiAgICBzdHJpbmdJbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHsgdGltZXJQbGFjZS50ZXh0Q29udGVudCA9IGdldFN0cmluZ1RpbWUoKSB9LCAxMDApO1xyXG59O1xyXG5cclxubGV0IHN0b3BUaW1lckhhbmRsZXIgPSAoKSA9PiB7XHJcbiAgICBzdG9wVGltZXIoKTtcclxuICAgIGNsZWFySW50ZXJ2YWwoc3RyaW5nSW50ZXJ2YWwpO1xyXG59O1xyXG5cclxuXHJcbmV4cG9ydCB7IHN0YXJ0VGltZXJIYW5kbGVyLCBzdG9wVGltZXIsIHJlc2V0VGltZXIsIGdldFN0cmluZ1RpbWUsIHRpbWVyUGxhY2UsIHN0b3BUaW1lckhhbmRsZXIsIGNhbGNTY29yZSB9O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvdGltZXIudHMiLCJpbXBvcnQgeyBQbGF5ZXIgfSBmcm9tICcuL2RhdGEnO1xyXG5pbXBvcnQgeyBjYWxjU2NvcmUgfSBmcm9tICcuL3RpbWVyJztcclxuXHJcbi8vI3JlZ2lvbiAtIHNlbGVjdG9yc1xyXG5jb25zdCBzY29yZUxpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2NvcmVMaXN0Jyk7XHJcbmNvbnN0IGdhbWVNb2RlTmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RlTmFtZScpO1xyXG5jb25zdCBtb2RlTmFtZUhlYWRpbmcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kZU5hbWVIZWFkaW5nJyk7XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uIC0gcmFua2luZ1RhYmxlIGRlZmluaXRpb25cclxubGV0IHJhbmtpbmdUYWJsZToge30gPSB7XHJcbiAgICBiZWdpbm5lcjogW1snSm9obicsIDE1XSwgWydNYXJyeScsIDIxXSwgWydUaW0nLCAyNF0sWydBbGV4JywgMjZdXSxcclxuICAgIGludGVybWVkaWF0ZTogW1snU2FtJywgNDRdLCBbJ01hcmsnLCA0Nl0sIFsnSmltJywgNTBdXSxcclxuICAgIGV4cGVydDogW1snTWFyaWEnLCA1OF0sIFsnS2l0JywgNjZdLCBbJ1RvbnknLCA3MF1dXHJcbn07XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uIC0gcHJlc2V0U3RvcmFnZSgpIC0gY2hlY2tzIGlmIHRoZXJlJ3MgZGF0YWJhc2UgaW4gbG9jYWxzdG9yYWdlIGlmIG5vdCBjcmVhdGVzIG9uZSwgb3RoZXJ3aXNlIGxvYWRzIGl0LlxyXG5jb25zdCBwcmVzZXRTdG9yYWdlID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdyYW5raW5nVGFibGUnKSA9PT0gbnVsbCkge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdyYW5raW5nVGFibGUnLCBKU09OLnN0cmluZ2lmeShyYW5raW5nVGFibGUpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhgZGF0YWJhc2UgZmV0Y2hlZCBmcm9tIGxvY2Fsc3RvcmFnZWAsIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdyYW5raW5nVGFibGUnKSk7XHJcbiAgICB9XHJcbn07XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxucHJlc2V0U3RvcmFnZSgpO1xyXG5cclxuLy8jcmVnaW9uIC0gc2F2ZURhdGEoKSAtXHJcbmNvbnN0IHNhdmVEYXRhID0gKCkgPT4ge1xyXG4gICAgbGV0IHN0b3JhZ2VEYXRhID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncmFua2luZ1RhYmxlJykpO1xyXG4gICAgbGV0IGdhbWVNb2RlID0gUGxheWVyLmdldEluc3RhbmNlKCkuZ2V0R2FtZU1vZGUoKTtcclxuICAgIGNvbnNvbGUubG9nKGBHYW1lIG1vZGUgaW5zaWRlIHNhdmVEYXRhOiAke2dhbWVNb2RlfWApO1xyXG5cclxuICAgIGxldCBjdXJyZW50TW9kZVRhYmxlID0gc3RvcmFnZURhdGFbZ2FtZU1vZGVdO1xyXG4gICAgY29uc29sZS5sb2coYEN1cnJlbnQgVGFibGUgaW5zaWRlIHNhdmVEYXRhOiAke2N1cnJlbnRNb2RlVGFibGV9YCk7XHJcbiAgICBjdXJyZW50TW9kZVRhYmxlID0gc2NvcmVWYWxpZGF0aW9uKGN1cnJlbnRNb2RlVGFibGUpO1xyXG4gICAgY29uc29sZS5sb2coYFRhYmxlIGluc2lkZSBzYXZlRGF0YTogJHtjdXJyZW50TW9kZVRhYmxlfWApO1xyXG4gICAgY3VycmVudE1vZGVUYWJsZS5zb3J0KChhLCBiKSA9PiB7IHJldHVybiBhWzFdIC0gYlsxXX0pO1xyXG4gICAgY29uc29sZS5sb2coYFRhYmxlIGluc2lkZSBzYXZlRGF0YTogJHtjdXJyZW50TW9kZVRhYmxlfWApO1xyXG4gICAgZm9yIChjdXJyZW50TW9kZVRhYmxlLmxlbmd0aDsgY3VycmVudE1vZGVUYWJsZS5sZW5ndGggPiA1Oykge1xyXG4gICAgICAgIGN1cnJlbnRNb2RlVGFibGUucG9wKCk7XHJcbiAgICB9XHJcbiAgICBzdG9yYWdlRGF0YVtnYW1lTW9kZV0gPSBjdXJyZW50TW9kZVRhYmxlO1xyXG4gICAgbGV0IG5ld0RhdGEgPSBKU09OLnN0cmluZ2lmeShzdG9yYWdlRGF0YSk7XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncmFua2luZ1RhYmxlJywgbmV3RGF0YSk7XHJcbiAgICByYW5raW5nVGFibGUgPSBzdG9yYWdlRGF0YTtcclxufTtcclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLyNyZWdpb24gLSBzY29yZVZhbGlkYXRpb24gKCkgLSB2YWxpZGF0ZXMgaWYgc2NvcmUgaXMgbm90IGVxdWFsIHRvIDBcclxuY29uc3Qgc2NvcmVWYWxpZGF0aW9uID0gKHRhYmxlOiAoc3RyaW5nIHwgbnVtYmVyKVtdW10pID0+IHtcclxuICAgIGxldCBuZXdUYWJsZSA9IHRhYmxlO1xyXG4gICAgY29uc29sZS5sb2cobmV3VGFibGUpO1xyXG4gICAgY29uc3QgcGxheWVyU2NvcmUgPSBbUGxheWVyLmdldEluc3RhbmNlKCkuZ2V0TmFtZSgpLCBQbGF5ZXIuZ2V0SW5zdGFuY2UoKS5nZXRTY29yZSgpXTtcclxuICAgIGlmIChwbGF5ZXJTY29yZVsxXSAhPT0gMCAmJiBwbGF5ZXJTY29yZVsxXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgbmV3VGFibGUucHVzaChwbGF5ZXJTY29yZSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ25ldyB0YWJsZSBpbnNpZGUgaWYgc3RhdGVtZW50JyxwbGF5ZXJTY29yZSxuZXdUYWJsZSk7XHJcbiAgICB9XHJcbiAgICBjb25zb2xlLmxvZygnbmV3VGFibGUnLG5ld1RhYmxlKTtcclxuICAgIHJldHVybiBuZXdUYWJsZTtcclxufTtcclxuLy8jZW5kcmVnaW9uXHJcblxyXG5cclxuLy8jcmVnaW9uIC0gd3JpdGVEYXRhKCkgLSBwcmludHMgb3V0IHJhbmtpbmcgdGFibGVcclxubGV0IHByaW50RGF0YSA9ICgpID0+IHtcclxuXHJcbiAgICBsZXQgdGFibGUgPSByYW5raW5nVGFibGVbUGxheWVyLmdldEluc3RhbmNlKCkuZ2V0R2FtZU1vZGUoKV07XHJcblxyXG4gICAgZ2FtZU1vZGVOYW1lLnRleHRDb250ZW50ID0gUGxheWVyLmdldEluc3RhbmNlKCkuZ2V0R2FtZU1vZGUoKSArICcgbW9kZSc7XHJcbiAgICBzY29yZUxpc3QuaW5uZXJIVE1MID0gJyc7XHJcblxyXG4gICAgdGFibGUuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICBsZXQgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG4gICAgICAgIGxpLnRleHRDb250ZW50ID0gYCR7ZWxlbWVudFswXX0gLSAke2VsZW1lbnRbMV19YDtcclxuICAgICAgICBzY29yZUxpc3QuYXBwZW5kQ2hpbGQobGkpO1xyXG4gICAgfSk7XHJcbn07XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uIC0gaGFuZGxlUmFua2luZygpIC0gb25lIHRvIHJ1bGUgdGhlbSBhbGxcclxuY29uc3QgaGFuZGxlUmFua2luZyA9ICgpID0+IHtcclxuICAgIC8vIHNjb3JlTGlzdC5jbGFzc0xpc3QucmVtb3ZlKCdzY29yZURpc3BsYXknKTtcclxuICAgIC8vIGdhbWVNb2RlTmFtZS5jbGFzc0xpc3QucmVtb3ZlKCdzY29yZURpc3BsYXknKTtcclxuICAgIGNvbnNvbGUubG9nKHJhbmtpbmdUYWJsZSk7XHJcbiAgICBzYXZlRGF0YSgpO1xyXG4gICAgcHJpbnREYXRhKCk7XHJcbn07XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuZXhwb3J0IHsgaGFuZGxlUmFua2luZyB9O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvcmFua2luZy50cyIsImltcG9ydCB7IEdhbWUsIGdhbWVTZWN0aW9uLCBnYW1lLCB3ZWxjb21lU2NyZWVuIH0gZnJvbSAnLi9kYXRhJztcclxuXHJcbmNvbnN0IGFib3V0R2FtZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhYm91dC1nYW1lLWJ1dHRvbicpO1xyXG5jb25zdCB0YWJsZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YWJsZS1idXR0b24nKTtcclxuY29uc3QgZ2FtZVJ1bGVzQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWUtcnVsZXMtYnV0dG9uJyk7XHJcbmNvbnN0IGdhbWVSdWxlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lLXJ1bGVzJyk7XHJcbmNvbnN0IGFib3V0R2FtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhYm91dC1nYW1lJyk7XHJcblxyXG5cclxuY29uc3QgYm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYm9keVwiKTtcclxuXHJcbmNvbnN0IGJvb20gPSAoKSA9PiB7XHJcbiAgICBsZXQgaW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgIGltYWdlLnNldEF0dHJpYnV0ZSgnc3JjJywgJy4vaW1hZ2VzL2Jvb20ucG5nJyk7XHJcbiAgICBpbWFnZS5jbGFzc0xpc3QuYWRkKCdiaWctYm9vbScpO1xyXG4gICAgYm9keS5hcHBlbmRDaGlsZChpbWFnZSk7XHJcbn07XHJcblxyXG5jb25zdCBnYW1lT3ZlciA9ICgpID0+IHtcclxuICAgIGxldCBpbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG4gICAgaW1hZ2Uuc2V0QXR0cmlidXRlKCdzcmMnLCAnLi9pbWFnZXMvZ2FtZW92ZXIucG5nJyk7XHJcbiAgICBpbWFnZS5jbGFzc0xpc3QuYWRkKCdnYW1lLW92ZXInKTtcclxuICAgIGdhbWUuYXBwZW5kQ2hpbGQoaW1hZ2UpO1xyXG59O1xyXG5cclxuY29uc3Qgd2luID0gKCkgPT4ge1xyXG4gICAgbGV0IGltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICBpbWFnZS5zZXRBdHRyaWJ1dGUoJ3NyYycsICcuL2ltYWdlcy93aW4ucG5nJyk7XHJcbiAgICBpbWFnZS5jbGFzc0xpc3QuYWRkKCd3aW4nKTtcclxuICAgIGdhbWUuYXBwZW5kQ2hpbGQoaW1hZ2UpO1xyXG59O1xyXG5cclxuYWJvdXRHYW1lQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgd2VsY29tZVNjcmVlbi5jbGFzc0xpc3QuYWRkKCdyZW1vdmUnKTtcclxuICAgIGdhbWUuY2xhc3NMaXN0LmFkZCgncmVtb3ZlJyk7XHJcbiAgICBnYW1lUnVsZXMuY2xhc3NMaXN0LmFkZCgncmVtb3ZlJyk7XHJcbiAgICBhYm91dEdhbWUuY2xhc3NMaXN0LnJlbW92ZSgncmVtb3ZlJyk7XHJcbn0pO1xyXG5cclxudGFibGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICB3ZWxjb21lU2NyZWVuLmNsYXNzTGlzdC5hZGQoJ3JlbW92ZScpO1xyXG4gICAgZ2FtZS5jbGFzc0xpc3QucmVtb3ZlKCdyZW1vdmUnKTtcclxuICAgIGdhbWVSdWxlcy5jbGFzc0xpc3QuYWRkKCdyZW1vdmUnKTtcclxuICAgIGFib3V0R2FtZS5jbGFzc0xpc3QuYWRkKCdyZW1vdmUnKTtcclxuIH0pO1xyXG5cclxuZ2FtZVJ1bGVzQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgd2VsY29tZVNjcmVlbi5jbGFzc0xpc3QuYWRkKCdyZW1vdmUnKTtcclxuICAgIGdhbWUuY2xhc3NMaXN0LmFkZCgncmVtb3ZlJyk7XHJcbiAgICBnYW1lUnVsZXMuY2xhc3NMaXN0LnJlbW92ZSgncmVtb3ZlJyk7XHJcbiAgICBhYm91dEdhbWUuY2xhc3NMaXN0LmFkZCgncmVtb3ZlJyk7XHJcbiB9KTtcclxuXHJcbmV4cG9ydCB7IGJvb20sIGdhbWVPdmVyLCB3aW4gfTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvYW5pbWF0aW9uLnRzIl0sInNvdXJjZVJvb3QiOiIifQ==