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
const gameOptionsSection = document.getElementById('game-options');
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
        // Game._instance = this;
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
        // Player._instance = this;
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
        Object(__WEBPACK_IMPORTED_MODULE_8__animation__["c" /* win */])();
        table.classList.add('table');
        Object(__WEBPACK_IMPORTED_MODULE_6__timer__["d" /* stopTimerHandler */])();
        __WEBPACK_IMPORTED_MODULE_0__data__["b" /* Player */].getInstance().setScore(Object(__WEBPACK_IMPORTED_MODULE_6__timer__["a" /* calcScore */])());
        Object(__WEBPACK_IMPORTED_MODULE_7__ranking__["a" /* handleRanking */])();
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
            console.log(__WEBPACK_IMPORTED_MODULE_0__data__["b" /* Player */].getInstance().getName());
            console.log(__WEBPACK_IMPORTED_MODULE_0__data__["b" /* Player */].getInstance().getGameMode());
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
    currentModeTable.sort((a, b) => { return a[1][0] - b[1][0]; });
    for (currentModeTable.length; currentModeTable.length > 6;) {
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
    if (__WEBPACK_IMPORTED_MODULE_0__data__["b" /* Player */].getInstance().getScore() !== 0 && __WEBPACK_IMPORTED_MODULE_0__data__["b" /* Player */].getInstance().getScore() !== undefined) {
        const playerScore = [__WEBPACK_IMPORTED_MODULE_0__data__["b" /* Player */].getInstance().getName(), __WEBPACK_IMPORTED_MODULE_0__data__["b" /* Player */].getInstance().getScore()];
        newTable.push(playerScore);
    }
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
    scoreList.classList.remove('scoreDisplay');
    gameModeName.classList.remove('scoreDisplay');
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
    __WEBPACK_IMPORTED_MODULE_0__data__["e" /* gameSection */].appendChild(image);
};
const win = () => {
    let image = document.createElement('img');
    image.setAttribute('src', './images/win.png');
    image.classList.add('win');
    __WEBPACK_IMPORTED_MODULE_0__data__["e" /* gameSection */].appendChild(image);
};



/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMTIyYTcxZWEwOGQzY2IyMmZmOWUiLCJ3ZWJwYWNrOi8vLy4vYXBwL2RhdGEudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3RhYmxlR3JpZC50cyIsIndlYnBhY2s6Ly8vLi9hcHAvaGVscGVyRnVuY3MudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2FwcC50cyIsIndlYnBhY2s6Ly8vLi9hcHAvZ2FtZU1vZGUudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwL21pbmVzQW5kVGlwcy50cyIsIndlYnBhY2s6Ly8vLi9hcHAvZW1wdHlGbG93LnRzIiwid2VicGFjazovLy8uL2FwcC90aW1lci50cyIsIndlYnBhY2s6Ly8vLi9hcHAvcmFua2luZy50cyIsIndlYnBhY2s6Ly8vLi9hcHAvYW5pbWF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUM3REE7QUFBQSxxQkFBcUI7QUFDckIsTUFBTSxlQUFlLEdBQXNCLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDNUUsTUFBTSxlQUFlLEdBQXNCLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDNUUsTUFBTSxlQUFlLEdBQXFCLFFBQVEsQ0FBQyxjQUFj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WUFBWTtBQUVhOzs7Ozs7Ozs7Ozs7QUN2RlU7QUFFbkMsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUU3QyxNQUFNLElBQUksR0FBRyxHQUFHLEVBQUU7SUFDZCxJQUFJLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFDLEtBQUssQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDOUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDaEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUM1QixDQUFDLENBQUM7QUFFRixNQUFNLFFBQVEsR0FBRyxHQUFHLEVBQUU7SUFDbEIsSUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMxQyxLQUFLLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBQyx1QkFBdUIsQ0FBQyxDQUFDO0lBQ2xELEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2pDLDBEQUFXLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ25DLENBQUMsQ0FBQztBQUVGLE1BQU0sR0FBRyxHQUFHLEdBQUcsRUFBRTtJQUNiLElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUM3QyxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMzQiwwREFBVyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNuQyxDQUFDLENBQUM7QUFJMkIiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMTIyYTcxZWEwOGQzY2IyMmZmOWUiLCIvLyNyZWdpb24gLSBzZWxlY3RvcnNcclxuY29uc3QgZ2FtZVN0YXJ0QnV0dG9uID0gPEhUTUxCdXR0b25FbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFydCcpO1xyXG5jb25zdCBnYW1lUmVzZXRCdXR0b24gPSA8SFRNTEJ1dHRvbkVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc2V0Jyk7XHJcbmNvbnN0IHBsYXllck5hbWVJbnB1dCA9IDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2VybmFtZScpO1xyXG5jb25zdCBnYW1lT3B0aW9uc1NlY3Rpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZS1vcHRpb25zJyk7XHJcbmNvbnN0IGdhbWVTZWN0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWUtcGxhY2UnKTtcclxuLy8jZW5kcmVnaW9uXHJcblxyXG5wbGF5ZXJOYW1lSW5wdXQudmFsdWUgPSBcIlwiO1xyXG5cclxuXHJcbi8vI3JlZ2lvbiAtIEdhbWUgc2luZ2xldG9uIGNsYXNzIGRlZmluaXRpb25cclxuXHJcbmNsYXNzIEdhbWUge1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IF9pbnN0YW5jZTogR2FtZSA9IG5ldyBHYW1lKCk7XHJcblxyXG4gICAgcHJpdmF0ZSBfbW9kZSA9IHtcclxuICAgICAgICBiZWdpbm5lcjogWzksIDksIDEwXSxcclxuICAgICAgICBpbnRlcm1lZGlhdGU6IFsxNiwgMTYsIDQwXSxcclxuICAgICAgICBleHBlcnQ6IFsxNiwgMzAsIDk5XSxcclxuICAgICAgICBjdXN0b206IFswLCAwLCAwXVxyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIF9nYW1lVGFibGU6IEhUTUxUYWJsZUVsZW1lbnQ7XHJcblxyXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAvLyBHYW1lLl9pbnN0YW5jZSA9IHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBHYW1lIHtcclxuICAgICAgICByZXR1cm4gR2FtZS5faW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG1vZGVJbmZvKG1vZGVOYW1lOiBzdHJpbmcpOiBudW1iZXJbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21vZGVbbW9kZU5hbWVdO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRDdXN0b21Nb2RlKGluZm86IG51bWJlcltdKSB7XHJcbiAgICAgICAgdGhpcy5fbW9kZS5jdXN0b20gPSBpbmZvO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGBDdXN0b20gbW9kZSBzZXQgdG8gJHt0aGlzLl9tb2RlLmN1c3RvbX1gKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0R2FtZVRhYmxlKGVsZW1lbnQpIHtcclxuICAgICAgICB0aGlzLl9nYW1lVGFibGUgPSBlbGVtZW50O1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGBUYWJsZSBjcmVhdGVkYCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEdhbWVUYWJsZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZ2FtZVRhYmxlO1xyXG4gICAgfVxyXG59XHJcblxyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vI3JlZ2lvbiAtIFBsYXllciAtIHNpbmdsZXRvbiBjbGFzcyBkZWZpbml0aW9uXHJcbmNsYXNzIFBsYXllciB7XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgX2luc3RhbmNlOiBQbGF5ZXIgPSBuZXcgUGxheWVyKCk7XHJcblxyXG4gICAgcHJpdmF0ZSBfbmFtZTogc3RyaW5nID0gXCJcIjtcclxuICAgIHByaXZhdGUgX2dhbWVNb2RlOiBzdHJpbmcgPSBcIm5vbmVcIjtcclxuICAgIHByaXZhdGUgX3Njb3JlOiBudW1iZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAvLyBQbGF5ZXIuX2luc3RhbmNlID0gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IFBsYXllciB7XHJcbiAgICAgICAgcmV0dXJuIFBsYXllci5faW5zdGFuY2U7XHJcbiAgICB9XHJcbiAgICBnZXROYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX25hbWU7XHJcbiAgICB9XHJcbiAgICBzZXROYW1lKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAodmFsdWUgPT09ICcnKXt2YWx1ZSA9ICd1bmtub3duIHBsYXllcid9XHJcbiAgICAgICAgdGhpcy5fbmFtZSA9IHZhbHVlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGBQbGF5ZXJzIG5hbWUgc2V0IHRvOiAke3RoaXMuX25hbWV9YClcclxuICAgIH1cclxuXHJcbiAgICBnZXRHYW1lTW9kZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9nYW1lTW9kZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRHYW1lTW9kZSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fZ2FtZU1vZGUgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRTY29yZSh2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuX3Njb3JlID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U2NvcmUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Njb3JlO1xyXG4gICAgfVxyXG59XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuZXhwb3J0IHsgR2FtZSwgUGxheWVyLCBnYW1lU3RhcnRCdXR0b24sIGdhbWVSZXNldEJ1dHRvbiwgcGxheWVyTmFtZUlucHV0LCBnYW1lT3B0aW9uc1NlY3Rpb24sIGdhbWVTZWN0aW9uIH07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL2RhdGEudHMiLCJpbXBvcnQgeyBHYW1lLCBQbGF5ZXIgfSBmcm9tICcuL2RhdGEnO1xyXG5cclxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1UQUJMRSBHUklEPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4vLyNyZWdpb24gLSBjcmVhdGVzIHRhYmxlIGdyaWQgZm9yIGdpdmVuIGdhbWUgbW9kZVxyXG5jb25zdCBjcmVhdGVHcmlkID0gKHJvd3NBbmRDb2xzOiBudW1iZXJbXSk6IHZvaWQgPT4ge1xyXG4gICAgbGV0IHRhYmxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGFibGUnKTtcclxuICAgIGxldCBjZWxsQ291bnRlciA9IDE7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJvd3NBbmRDb2xzWzBdOyBpKyspIHtcclxuICAgICAgICBsZXQgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKTtcclxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHJvd3NBbmRDb2xzWzFdOyBqKyspIHtcclxuICAgICAgICAgICAgbGV0IGNvbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XHJcbiAgICAgICAgICAgIGNvbC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBjZWxsQ291bnRlciArICdmaWVsZCcpO1xyXG4gICAgICAgICAgICBjb2wuc2V0QXR0cmlidXRlKFwiZGF0YS1pZFwiLCBjZWxsQ291bnRlciArICdmaWVsZCcpO1xyXG4gICAgICAgICAgICBjb2wuc2V0QXR0cmlidXRlKFwiZGF0YS1taW5lXCIsIFwiXCIpO1xyXG4gICAgICAgICAgICBjb2wuc2V0QXR0cmlidXRlKFwiZGF0YS1lbXB0eVwiLCBcIlwiKTtcclxuICAgICAgICAgICAgY29sLnNldEF0dHJpYnV0ZShcImRhdGEtY2xpY2tcIiwgXCJcIik7XHJcbiAgICAgICAgICAgIGNlbGxDb3VudGVyKys7XHJcbiAgICAgICAgICAgIHJvdy5hcHBlbmRDaGlsZChjb2wpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0YWJsZS5hcHBlbmRDaGlsZChyb3cpO1xyXG4gICAgfVxyXG4gICAgR2FtZS5nZXRJbnN0YW5jZSgpLnNldEdhbWVUYWJsZSh0YWJsZSk7XHJcbn07XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuXHJcbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Qk9SREVSUz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuLy8jcmVnaW9uIC0gY3JlYXRlcyBsZWZ0IGJvcmRlciBmb3IgdGFibGUgZ3JpZFxyXG5jb25zdCBjcmVhdGVMZWZ0Qm9yZGVyID0gKG51bU9mUm93czogbnVtYmVyLCBudW1PZkNvbHM6IG51bWJlcikgPT4ge1xyXG4gICAgbGV0IGxlZnRCb3JkZXJGaWVsZHM6IG51bWJlcltdID0gWzFdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1PZlJvd3MgLSAxOyBpKyspIHtcclxuICAgICAgICBsZXQgYm9yZGVyRmllbGQgPSBsZWZ0Qm9yZGVyRmllbGRzW2ldICsgbnVtT2ZDb2xzO1xyXG4gICAgICAgIGxlZnRCb3JkZXJGaWVsZHMucHVzaChib3JkZXJGaWVsZCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbGVmdEJvcmRlckZpZWxkcztcclxufVxyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vI3JlZ2lvbiAtIGNyZWF0ZXMgcmlnaHQgYm9yZGVyIGZvciB0YWJsZSBncmlkXHJcbmNvbnN0IGNyZWF0ZVJpZ2h0Qm9yZGVyID0gKG51bU9mUm93czogbnVtYmVyLCBudW1PZkNvbHM6IG51bWJlcikgPT4ge1xyXG4gICAgbGV0IHJpZ2h0Qm9yZGVyRmllbGRzOiBudW1iZXJbXSA9IFtudW1PZkNvbHNdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1PZlJvd3MgLSAxOyBpKyspIHtcclxuICAgICAgICBsZXQgYm9yZGVyRmllbGQgPSByaWdodEJvcmRlckZpZWxkc1tpXSArIG51bU9mQ29scztcclxuICAgICAgICByaWdodEJvcmRlckZpZWxkcy5wdXNoKGJvcmRlckZpZWxkKTtcclxuICAgIH1cclxuICAgIHJldHVybiByaWdodEJvcmRlckZpZWxkcztcclxufVxyXG4vLyNlbmRyZWdpb25cclxuXHJcblxyXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVNVUlJPVU5ESU5HPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbi8vI3JlZ2lvbiAtIGRlZmluZVN1cnJvdW5kaW5nKCkgLSBjcmVhdGVzIHN1cnJvdW5kaW5nIGJhc2VkIG9uIGZpZWxkIHBvc2l0aW9uIChiYXNlZCBvbiBpZClcclxuXHJcbmNvbnN0IGRlZmluZVN1cnJvdW5kaW5nID0gKHRhYmxlOiBFbGVtZW50LCBlbGVtZW50OiBIVE1MRWxlbWVudCkgPT4geyAvLyBkZWZpbmlzZW1vIG9rb2xuYSBwb2xqYSBuYSBvc25vdnUgZGF0b2cgcG9samEgaSBicm9qYSBrb2xvbmEgdGFiZWxlXHJcbiAgICBsZXQgc3Vycm91bmRpbmc7XHJcbiAgICBjb25zdCBpZCA9IHBhcnNlSW50KGVsZW1lbnQuaWQpO1xyXG4gICAgY29uc3QgZ2FtZU1vZGVJbmZvID0gR2FtZS5nZXRJbnN0YW5jZSgpLm1vZGVJbmZvKFBsYXllci5nZXRJbnN0YW5jZSgpLmdldEdhbWVNb2RlKCkpO1xyXG4gICAgY29uc3QgbnVtT2ZSb3dzID0gZ2FtZU1vZGVJbmZvWzBdO1xyXG4gICAgY29uc3QgbnVtT2ZDb2xzID0gZ2FtZU1vZGVJbmZvWzFdO1xyXG5cclxuICAgIC8vYmFzZSBzdXJyb3VuZGluZ1xyXG4gICAgY29uc3QgbGVmdCA9IHRhYmxlLnF1ZXJ5U2VsZWN0b3IoYFtpZD1cIiR7aWQgLSAxfWZpZWxkXCJdYCk7XHJcbiAgICBjb25zdCB1cExlZnQgPSB0YWJsZS5xdWVyeVNlbGVjdG9yKGBbaWQ9XCIke2lkIC0gbnVtT2ZDb2xzIC0gMX1maWVsZFwiXWApO1xyXG4gICAgY29uc3QgdXAgPSB0YWJsZS5xdWVyeVNlbGVjdG9yKGBbaWQ9XCIke2lkIC0gbnVtT2ZDb2xzfWZpZWxkXCJdYCk7XHJcbiAgICBjb25zdCB1cFJpZ2h0ID0gdGFibGUucXVlcnlTZWxlY3RvcihgW2lkPVwiJHtpZCAtIG51bU9mQ29scyArIDF9ZmllbGRcIl1gKTtcclxuICAgIGNvbnN0IHJpZ2h0ID0gdGFibGUucXVlcnlTZWxlY3RvcihgW2lkPVwiJHtpZCArIDF9ZmllbGRcIl1gKTtcclxuICAgIGNvbnN0IHJpZ2h0RG93biA9IHRhYmxlLnF1ZXJ5U2VsZWN0b3IoYFtpZD1cIiR7aWQgKyBudW1PZkNvbHMgKyAxfWZpZWxkXCJdYCk7XHJcbiAgICBjb25zdCBkb3duID0gdGFibGUucXVlcnlTZWxlY3RvcihgW2lkPVwiJHtpZCArIG51bU9mQ29sc31maWVsZFwiXWApO1xyXG4gICAgY29uc3QgZG93bkxlZnQgPSB0YWJsZS5xdWVyeVNlbGVjdG9yKGBbaWQ9XCIke2lkICsgbnVtT2ZDb2xzIC0gMX1maWVsZFwiXWApO1xyXG5cclxuICAgIC8vY3JlYXRlIGJvcmRlcnNcclxuICAgIGNvbnN0IGxlZnRCb3JkZXIgPSBjcmVhdGVMZWZ0Qm9yZGVyKG51bU9mUm93cywgbnVtT2ZDb2xzKTtcclxuICAgIGNvbnN0IHJpZ2h0Qm9yZGVyID0gY3JlYXRlUmlnaHRCb3JkZXIobnVtT2ZSb3dzLCBudW1PZkNvbHMpO1xyXG5cclxuICAgIC8vc3Vycm91bmRpbmcgYmFzZWQgb24gZmllbGQtYm9yZGVycyByZWxhdGlvblxyXG4gICAgaWYgKGxlZnRCb3JkZXIuaW5kZXhPZihpZCkgIT09IC0xKSB7XHJcbiAgICAgICAgc3Vycm91bmRpbmcgPSBbdXAsIHVwUmlnaHQsIHJpZ2h0LCByaWdodERvd24sIGRvd25dO1xyXG4gICAgfSBlbHNlIGlmIChyaWdodEJvcmRlci5pbmRleE9mKGlkKSAhPT0gLTEpIHtcclxuICAgICAgICBzdXJyb3VuZGluZyA9IFtsZWZ0LCB1cExlZnQsIHVwLCBkb3duLCBkb3duTGVmdF07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHN1cnJvdW5kaW5nID0gW2xlZnQsIHVwTGVmdCwgdXAsIHVwUmlnaHQsIHJpZ2h0LCByaWdodERvd24sIGRvd24sIGRvd25MZWZ0XTtcclxuICAgIH1cclxuICAgIHJldHVybiBzdXJyb3VuZGluZztcclxufVxyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuXHJcbmV4cG9ydCB7IGNyZWF0ZUdyaWQsZGVmaW5lU3Vycm91bmRpbmd9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC90YWJsZUdyaWQudHMiLCIvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVJBTkRPTSBGVU5DVElPTlM9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbi8vI3JlZ2lvbiAgLSBDcmVhdGVzIHJhbmRvbSBudW1iZXIgZm9yIHBhc3NlZCBtaW4gYW5kIG1heFxyXG5jb25zdCByYW5kb21OdW1iZXIgPSAobWF4TnVtOiBudW1iZXIsIG1pbk51bTogbnVtYmVyID0gMSk6IG51bWJlciA9PiB7XHJcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heE51bSAtIG1pbk51bSArIDEpICsgbWluTnVtKTtcclxufTtcclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLyNyZWdpb24gIC0gYXJyYXkgd2l0aCBzcGVjaWZpZWQgbnVtYmVyIG9mIHJhbmRvbSBudW1iZXJzXHJcbmNvbnN0IHJhbmRvbU51bWJlcnNBcnJheSA9IChhcnJMZW5ndGg6IG51bWJlciwgbWF4TnVtOiBudW1iZXIsIG1pbk51bTogbnVtYmVyID0gMSk6IG51bWJlcltdID0+IHtcclxuICAgIGxldCBhcnJheTogbnVtYmVyW10gPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyTGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgbmV3TnVtID0gcmFuZG9tTnVtYmVyKG1heE51bSwgbWluTnVtKTtcclxuICAgICAgICB3aGlsZSAoYXJyYXkuaW5kZXhPZihuZXdOdW0pICE9PSAtMSkge1xyXG4gICAgICAgICAgICBuZXdOdW0gPSByYW5kb21OdW1iZXIobWluTnVtLCBtYXhOdW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBhcnJheS5wdXNoKG5ld051bSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXJyYXk7XHJcbn1cclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbi8vI3JlZ2lvbiAtIHByZXZlbnRNZW51KCkgLSBuZW1hIGRlc25pIGtsaWsgbWVuaSBuYSB0YWJsaVxyXG5jb25zdCBwcmV2ZW50VGFibGVNZW51ID0gKGV2ZW50KTp2b2lkID0+IHtcclxuICAgIGxldCBjbGlja2VkUGxhY2UgPSBldmVudC50YXJnZXQ7XHJcbiAgICBpZiAoY2xpY2tlZFBsYWNlLnRhZ05hbWUgPT09IFwiVERcIiB8fCBjbGlja2VkUGxhY2UudGFnTmFtZSA9PT0gXCJUQUJMRVwiIHx8IGNsaWNrZWRQbGFjZS50YWdOYW1lID09PSBcIklNR1wiKSB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIH1cclxufVxyXG4vLyNlbmRyZWdpb25cclxuXHJcbmV4cG9ydCB7IHJhbmRvbU51bWJlcnNBcnJheSwgcHJldmVudFRhYmxlTWVudSB9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9oZWxwZXJGdW5jcy50cyIsImltcG9ydCB7IEdhbWUsIFBsYXllciwgZ2FtZU9wdGlvbnNTZWN0aW9uLCBnYW1lU3RhcnRCdXR0b24sIGdhbWVSZXNldEJ1dHRvbiwgZ2FtZVNlY3Rpb24sIHBsYXllck5hbWVJbnB1dCB9IGZyb20gJy4vZGF0YSc7XHJcbmltcG9ydCB7IGdhbWVNb2RlLCBnYW1lTW9kZUlucHV0IH0gZnJvbSAnLi9nYW1lTW9kZSc7XHJcbmltcG9ydCB7IGNyZWF0ZUdyaWQgfSBmcm9tICcuL3RhYmxlR3JpZCc7XHJcbmltcG9ydCB7IHNldE1pbmVzLCBjbGVhck1pbmVzLCBzaG93TWluZXMsIHdyaXRlVGlwcyB9IGZyb20gJy4vbWluZXNBbmRUaXBzJztcclxuaW1wb3J0IHsgb3BlbkVtcHR5RWxlbWVudCwgc3RvcENsaWNrIH0gZnJvbSAnLi9lbXB0eUZsb3cnO1xyXG5pbXBvcnQgeyBwcmV2ZW50VGFibGVNZW51IH0gZnJvbSAnLi9oZWxwZXJGdW5jcyc7XHJcbmltcG9ydCB7IHN0YXJ0VGltZXJIYW5kbGVyLCBzdG9wVGltZXJIYW5kbGVyLCByZXNldFRpbWVyLCB0aW1lclBsYWNlLCBjYWxjU2NvcmUgfSBmcm9tICcuL3RpbWVyJztcclxuaW1wb3J0IHsgaGFuZGxlUmFua2luZyB9IGZyb20gJy4vcmFua2luZyc7XHJcbmltcG9ydCB7IGJvb20sIGdhbWVPdmVyLCB3aW4gfSBmcm9tICcuL2FuaW1hdGlvbic7XHJcblxyXG5cclxuY29uc3QgbWluZUljb24gPSBcIlxcdUQ4M0RcXHVEQ0EzXCI7IC8vIGRlZmluaXNlbW8gaWtvbmljdSB6YSBtaW51IHUgbmVrb20gbW9tZW50dVxyXG5sZXQgY2xpY2tDb3VudGVyID0gMDsgLy8gZm9sbG93cyBjbGlja3NcclxuXHJcbi8vI3JlZ2lvbiAtIG1hbmFnZUlucHV0cygpIC0gbWFuYWdlIGlucHV0cyBvbiBkb2N1bWVudCBiYXNlZCBvbiBldmVudFxyXG5jb25zdCBtYW5hZ2VJbnB1dHMgPSAoZXZlbnQpOiBzdHJpbmcgPT4ge1xyXG4gICAgaWYgKGV2ZW50LnRhcmdldC5pZCA9PT0gXCJzdGFydFwiKSB7XHJcblxyXG4gICAgICAgIHBsYXllck5hbWVJbnB1dC5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ3RydWUnKTtcclxuICAgICAgICBnYW1lTW9kZUlucHV0LnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAndHJ1ZScpO1xyXG4gICAgICAgIGdhbWVTdGFydEJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ3RydWUnKTtcclxuICAgICAgICBnYW1lUmVzZXRCdXR0b24ucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xyXG4gICAgICAgIHJldHVybiBcInN0YXJ0XCI7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChldmVudC50YXJnZXQuaWQgPT09IFwicmVzZXRcIikge1xyXG4gICAgICAgIGdhbWVSZXNldEJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ3RydWUnKTtcclxuICAgICAgICBnYW1lU3RhcnRCdXR0b24ucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xyXG4gICAgICAgIGdhbWVNb2RlSW5wdXQucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xyXG4gICAgICAgIGdhbWVNb2RlSW5wdXQudmFsdWUgPSAnYmVnaW5uZXInO1xyXG4gICAgICAgIHBsYXllck5hbWVJbnB1dC5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XHJcbiAgICAgICAgcGxheWVyTmFtZUlucHV0LnZhbHVlID0gXCJcIjtcclxuICAgICAgICBnYW1lU2VjdGlvbi5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgICAgIGNsaWNrQ291bnRlciA9IDA7XHJcbiAgICAgICAgc3RvcFRpbWVySGFuZGxlcigpO1xyXG4gICAgICAgIHJlc2V0VGltZXIoKTtcclxuICAgICAgICB0aW1lclBsYWNlLnRleHRDb250ZW50ID0gXCIwMCA6IDAwIDogMDBcIjtcclxuICAgICAgICByZXR1cm4gXCJyZXNldFwiO1xyXG4gICAgfVxyXG59O1xyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vI3JlZ2lvbiAtIGNoZWNrTW92ZSgpIC0gcHJvdmVyYXZhIHBvdGV6IGkgcHJlZHV6aW1hIGRhbGplIGtvcmFrZVxyXG5jb25zdCBjaGVja01vdmUgPSAoZWxlbWVudDogSFRNTEVsZW1lbnQpID0+IHtcclxuICAgIGNvbnN0IHRhYmxlID0gR2FtZS5nZXRJbnN0YW5jZSgpLmdldEdhbWVUYWJsZSgpO1xyXG4gICAgY29uc3QgYXR0cmlidXRlID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLW1pbmVcIik7XHJcbiAgICBpZiAoYXR0cmlidXRlID09PSBcIlxcdUQ4M0RcXHVEQ0EzXCIpIHtcclxuICAgICAgICBpZiAoY2xpY2tDb3VudGVyID09PSAxKSB7XHJcbiAgICAgICAgICAgIHBsYW50TWluZXNBZ2FpbigpO1xyXG4gICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBvbkZpZWxkQ2xpY2spO1xyXG4gICAgICAgICAgICBjaGVja01vdmUoZWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnQuaWQpLmNsaWNrKCk7XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBib21iID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICAgICAgICAgIGJvbWIuc2V0QXR0cmlidXRlKCdzcmMnLCAnLi9pbWFnZXMvbWluZTUwLnBuZycpO1xyXG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2VtcHR5Jyk7XHJcbiAgICAgICAgICAgIHN0b3BUaW1lckhhbmRsZXIoKTtcclxuXHJcbiAgICAgICAgICAgIHRhYmxlLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBvbkZpZWxkQ2xpY2spO1xyXG4gICAgICAgICAgICB0YWJsZS5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGZsYWdJdCk7XHJcblxyXG5cclxuICAgICAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChib21iKTtcclxuICAgICAgICAgICAgc2hvd01pbmVzKHRhYmxlLCBtaW5lSWNvbik7XHJcbiAgICAgICAgICAgIGJvb20oKTtcclxuICAgICAgICAgICAgLy8gYWxlcnQoXCJCT09PT09PTS4uLi4uWW91J3JlIGRlYWQhXCIpO1xyXG5cclxuICAgICAgICAgICAgdGFibGUuY2xhc3NMaXN0LmFkZCgndGFibGUnKTtcclxuICAgICAgICAgICAgZ2FtZU92ZXIoKTtcclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoYXR0cmlidXRlID09PSBcIlwiKSB7XHJcbiAgICAgICAgb3BlbkVtcHR5RWxlbWVudCg8YW55PmVsZW1lbnQpO1xyXG4gICAgICAgIGNoZWNrUmVzdWx0KCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBlbGVtZW50LnRleHRDb250ZW50ID0gYXR0cmlidXRlO1xyXG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnY2xpY2tlZCcpO1xyXG4gICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKFwiZGF0YS1jbGlja1wiLCBcIjFcIik7XHJcbiAgICAgICAgY2hlY2tSZXN1bHQoKTtcclxuICAgIH1cclxufVxyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vI3JlZ2lvbiAtIGZsYWdJdCgpIC0gcG9zdGF2bGphbmplIHphc3RhdmUgbmEgZGVzbmkga2xpa1xyXG5jb25zdCBmbGFnSXQgPSAoZXZlbnQ6IGFueSkgPT4ge1xyXG4gICAgbGV0IGVsZW1lbnQgPSBldmVudC50YXJnZXQ7XHJcbiAgICBpZiAoZWxlbWVudC50YWdOYW1lID09PSBcIlREXCIpIHtcclxuICAgICAgICBpZiAoZXZlbnQud2hpY2ggPT09IDMpIHtcclxuICAgICAgICAgICAgLy8gbGV0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcclxuICAgICAgICAgICAgbGV0IGZsYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgICAgICAgICAgaWYgKFBsYXllci5nZXRJbnN0YW5jZSgpLmdldEdhbWVNb2RlKCkgPT09ICdiZWdpbm5lcicpIHtcclxuICAgICAgICAgICAgICAgIGZsYWcuc2V0QXR0cmlidXRlKCdzcmMnLCAnLi9pbWFnZXMvZmxhZ0IucG5nJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoUGxheWVyLmdldEluc3RhbmNlKCkuZ2V0R2FtZU1vZGUoKSA9PT0gJ2ludGVybWVkaWF0ZScpIHtcclxuICAgICAgICAgICAgICAgIGZsYWcuc2V0QXR0cmlidXRlKCdzcmMnLCAnLi9pbWFnZXMvZmxhZ0kucG5nJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7IGZsYWcuc2V0QXR0cmlidXRlKCdzcmMnLCAnLi9pbWFnZXMvZmxhZ0UucG5nJyk7IH1cclxuICAgICAgICAgICAgZmxhZy5jbGFzc0xpc3QuYWRkKCdmbGFnJyk7XHJcblxyXG5cclxuICAgICAgICAgICAgLy8gbGV0IGZsYWcgPSBcIlxcdTI2OTFcIjtcclxuICAgICAgICAgICAgaWYgKGVsZW1lbnQuaW5uZXJIVE1MID09PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKGZsYWcpO1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdlbXB0eScpO1xyXG4gICAgICAgICAgICAgICAgY2hlY2tSZXN1bHQoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfSBlbHNlIGlmIChlbGVtZW50LnRhZ05hbWUgPT09IFwiSU1HXCIpIHtcclxuICAgICAgICBpZiAoZXZlbnQud2hpY2ggPT09IDMpIHtcclxuICAgICAgICAgICAgZWxlbWVudC5wYXJlbnROb2RlLmNsYXNzTGlzdC5yZW1vdmUoJ2VtcHR5Jyk7XHJcbiAgICAgICAgICAgIGVsZW1lbnQucGFyZW50Tm9kZS5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLyNyZWdpb24gLSBwbGFudE1pbmVzQWdhaW4oKVxyXG5sZXQgcGxhbnRNaW5lc0FnYWluID0gKCkgPT4ge1xyXG4gICAgY29uc3QgdGFibGUgPSBHYW1lLmdldEluc3RhbmNlKCkuZ2V0R2FtZVRhYmxlKCk7XHJcbiAgICBsZXQgZ2FtZU1vZGVJbmZvID0gZ2FtZU1vZGUoZ2FtZU1vZGVJbnB1dC52YWx1ZSkgYXMgbnVtYmVyW107XHJcbiAgICBjbGVhck1pbmVzKHRhYmxlKTtcclxuICAgIHNldE1pbmVzKHRhYmxlLCBnYW1lTW9kZUluZm8sIG1pbmVJY29uKTtcclxuICAgIHdyaXRlVGlwcyh0YWJsZSk7XHJcbn07XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uIC0gY2hlY2tSZXN1bHQoKSAtIHByb3ZlcmF2YSByZXp1bHRhdFxyXG5mdW5jdGlvbiBjaGVja1Jlc3VsdCgpIHtcclxuICAgIGNvbnN0IHRhYmxlID0gR2FtZS5nZXRJbnN0YW5jZSgpLmdldEdhbWVUYWJsZSgpO1xyXG4gICAgbGV0IGdhbWVNb2RlSW5mbyA9IGdhbWVNb2RlKGdhbWVNb2RlSW5wdXQudmFsdWUpIGFzIG51bWJlcltdO1xyXG4gICAgbGV0IGNsb3NlZDogYW55ID0gW107XHJcbiAgICBsZXQgYWxsRmllbGRzID0gdGFibGUucXVlcnlTZWxlY3RvckFsbChcInRkXCIpO1xyXG4gICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChhbGxGaWVsZHMsIChmaWVsZDogYW55KSA9PiB7XHJcbiAgICAgICAgaWYgKGZpZWxkLmdldEF0dHJpYnV0ZShcImRhdGEtY2xpY2tcIiwgXCIxXCIpKSB7XHJcbiAgICAgICAgICAgIGNsb3NlZC5wdXNoKGZpZWxkKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoKGNsb3NlZC5sZW5ndGggPT09ICgoZ2FtZU1vZGVJbmZvWzBdICogZ2FtZU1vZGVJbmZvWzFdKSAtIGdhbWVNb2RlSW5mb1syXSkpKSB7XHJcbiAgICAgICAgd2luKCk7XHJcbiAgICAgICAgdGFibGUuY2xhc3NMaXN0LmFkZCgndGFibGUnKTtcclxuICAgICAgICBzdG9wVGltZXJIYW5kbGVyKCk7XHJcbiAgICAgICAgUGxheWVyLmdldEluc3RhbmNlKCkuc2V0U2NvcmUoY2FsY1Njb3JlKCkpO1xyXG4gICAgICAgIGhhbmRsZVJhbmtpbmcoKTtcclxuICAgICAgICB0YWJsZS5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgb25GaWVsZENsaWNrKTtcclxuICAgICAgICB0YWJsZS5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGZsYWdJdCk7XHJcbiAgICB9XHJcbn1cclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLyNyZWdpb24gb25GaWVsZENsaWNrKCkgLSBkZWZpbmlzZSByYXNwb3JlZCBuYSBrbGlrXHJcbmNvbnN0IG9uRmllbGRDbGljayA9IChldmVudDogYW55KSA9PiB7XHJcbiAgICBsZXQgZmllbGQgPSBldmVudC50YXJnZXQ7XHJcbiAgICBpZiAoZmllbGQudGFnTmFtZSA9PT0gXCJURFwiKSB7XHJcbiAgICAgICAgZmllbGQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHN0b3BDbGljayk7XHJcbiAgICAgICAgZmllbGQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBzdG9wQ2xpY2spO1xyXG4gICAgICAgIGNsaWNrQ291bnRlcisrO1xyXG4gICAgICAgIGlmIChjbGlja0NvdW50ZXIgPT09IDEpIHsgc3RhcnRUaW1lckhhbmRsZXIoKSB9O1xyXG4gICAgICAgIGNoZWNrTW92ZShmaWVsZCk7XHJcbiAgICB9XHJcbn07XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uIC0gcHJpbnRHcmlkKCkgLSBjcmVhdGVzIGZ1bGwgR3JpZCBhbmQgYWRkcyBpdCB0byB0aGUgZG9jdW1lbnRcclxuY29uc3QgcHJpbnRHcmlkID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgbGV0IGdhbWVNb2RlSW5mbyA9IGdhbWVNb2RlKGdhbWVNb2RlSW5wdXQudmFsdWUpIGFzIG51bWJlcltdO1xyXG4gICAgLy9jcmVhdGUgdGFibGVcclxuICAgIGNyZWF0ZUdyaWQoZ2FtZU1vZGVJbmZvKTtcclxuICAgIGNvbnN0IHRhYmxlID0gR2FtZS5nZXRJbnN0YW5jZSgpLmdldEdhbWVUYWJsZSgpO1xyXG4gICAgdGFibGUuY2xhc3NMaXN0LmFkZChQbGF5ZXIuZ2V0SW5zdGFuY2UoKS5nZXRHYW1lTW9kZSgpKTtcclxuICAgIC8vc2V0IG1pbmVzXHJcbiAgICBzZXRNaW5lcyh0YWJsZSwgZ2FtZU1vZGVJbmZvLCBtaW5lSWNvbik7XHJcbiAgICAvLyAvLyAvL3NldCB0aXBzXHJcbiAgICB3cml0ZVRpcHModGFibGUpO1xyXG4gICAgLy8gLy8gLy9wcmludCB0YWJsZVxyXG4gICAgZ2FtZVNlY3Rpb24uYXBwZW5kQ2hpbGQodGFibGUpO1xyXG4gICAgLy8gLy9zZXQgbGlzdGVuZXJzXHJcbiAgICB0YWJsZS5hZGRFdmVudExpc3RlbmVyKFwiY29udGV4dG1lbnVcIiwgcHJldmVudFRhYmxlTWVudSk7XHJcbiAgICB0YWJsZS5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGZsYWdJdCk7XHJcbiAgICB0YWJsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uRmllbGRDbGljayk7XHJcblxyXG59O1xyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vI3JlZ2lvbiAtIG9uQ2xpY2soKSAtIG1haW4gZnVuY3Rpb25cclxuY29uc3Qgb25DbGljayA9IChldmVudCk6IHZvaWQgPT4ge1xyXG4gICAgaWYgKGV2ZW50LnRhcmdldC50YWdOYW1lID09PSBcIkJVVFRPTlwiKSB7XHJcbiAgICAgICAgaWYgKG1hbmFnZUlucHV0cyhldmVudCkgPT09ICdzdGFydCcpIHtcclxuICAgICAgICAgICAgUGxheWVyLmdldEluc3RhbmNlKCkuc2V0TmFtZShwbGF5ZXJOYW1lSW5wdXQudmFsdWUpO1xyXG4gICAgICAgICAgICBwcmludEdyaWQoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coUGxheWVyLmdldEluc3RhbmNlKCkuZ2V0TmFtZSgpKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coUGxheWVyLmdldEluc3RhbmNlKCkuZ2V0R2FtZU1vZGUoKSk7XHJcbiAgICAgICAgICAgIGhhbmRsZVJhbmtpbmcoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uIC0gZ2FtZU9wdGlvbnNTZWN0aW9uIGV2ZW50IGxpc3RlbmVyc1xyXG5nYW1lT3B0aW9uc1NlY3Rpb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbkNsaWNrKTtcclxuLy8jZW5kcmVnaW9uXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL2FwcC50cyIsImltcG9ydCB7IEdhbWUsIFBsYXllciB9IGZyb20gJy4vZGF0YSc7XHJcblxyXG4vLyNyZWdpb24gLSBzZWxlY3RvcnNcclxuY29uc3QgY3VzdG9tUm93c0lucHV0ID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2N1c3RvbVJvd3MnKTtcclxuY29uc3QgY3VzdG9tQ29sc0lucHV0ID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2N1c3RvbUNvbHMnKTtcclxuY29uc3QgY3VzdG9tTWluZXNJbnB1dCA9IDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjdXN0b21NaW5lcycpO1xyXG5jb25zdCBnYW1lTW9kZUlucHV0ID0gPEhUTUxTZWxlY3RFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lTW9kZScpO1xyXG5jb25zdCBjdXN0b21Nb2RlT3B0aW9ucyA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3VzdG9tTW9kZU9wdGlvbnMnKTtcclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLyNyZWdpb24gLSBnZXRDdXN0b21Qcm9wcygpIC0gZ2V0cyBjdXN0b20gcHJvcGVydGllcyBmcm9tIHVzZXIgaW5wdXRcclxuY29uc3QgZ2V0Q3VzdG9tUHJvcHMgPSAoKSA9PiB7XHJcbiAgICBsZXQgY3VzdG9tUHJvcHMgPSBbXHJcbiAgICAgICAgcGFyc2VJbnQoY3VzdG9tUm93c0lucHV0LnZhbHVlKSxcclxuICAgICAgICBwYXJzZUludChjdXN0b21Db2xzSW5wdXQudmFsdWUpLFxyXG4gICAgICAgIHBhcnNlSW50KGN1c3RvbU1pbmVzSW5wdXQudmFsdWUpLFxyXG4gICAgXTtcclxuICAgIHJldHVybiBjdXN0b21Qcm9wcztcclxufVxyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vI3JlZ2lvbiAtIGRpc3BsYXlDdXN0b21Nb2RlT3B0cygpIC0gaGlkZXMgb3Igc2hvd3MgZGl2IHdpdGggY3VzdG9tIGdhbWUgb3B0aW9ucyBpbiBkb2N1bWVudFxyXG5sZXQgZGlzcGxheUN1c3RvbU1vZGVPcHRpb25zID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgaWYgKGdhbWVNb2RlSW5wdXQudmFsdWUgPT09IFwiY3VzdG9tXCIpIHtcclxuICAgICAgICBjdXN0b21Nb2RlT3B0aW9ucyEuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XHJcbiAgICB9IGVsc2UgeyBjdXN0b21Nb2RlT3B0aW9ucyEuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7IH1cclxufTtcclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLyNyZWdpb24gLSBjdXN0b21JbnB1dFZhbGlkYXRpb24oKSAtIGN1c3RvbSBnYW1lIG1vZGUgaW5wdXQgdmFsaWRhdGlvblxyXG5jb25zdCBjdXN0b21JbnB1dFZhbGlkYXRpb24gPSAobW9kZUluZm86IG51bWJlcltdKSA9PiB7Ly9nYW1lIG1vZGUgaW5mbyBbcm93cyxjb2xzLG1pbmVzXVxyXG4gICAgaWYgKG1vZGVJbmZvWzJdID49IG1vZGVJbmZvWzBdICogbW9kZUluZm9bMV0pIHsgIC8vbnVtIG9mIG1pbmVzIHZhbGlkYXRpb24sY2FuJ3QgYmUgbW9yZSBtaW5lcyB0aGFuIGZpZWxkcyBvciBlcXVhbCB0byBudW0gb2YgZmllbGRzXHJcbiAgICAgICAgYWxlcnQoXCJDYW4ndCBoYXZlIG1vcmUgbWluZXMgdGhhbiBmaWVsZHNcIik7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSByZXR1cm4gdHJ1ZTtcclxufTtcclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLyNyZWdpb24gLSBnYW1lTW9kZSgpIC0gZ2FtZSBtb2RlIHN3aXRjaGVyXHJcbmNvbnN0IGdhbWVNb2RlID0gKG1vZGU6IHN0cmluZyk6IG51bWJlcltdIHwgc3RyaW5nID0+IHtcclxuICAgIHN3aXRjaCAobW9kZSkge1xyXG4gICAgICAgIGNhc2UgXCJiZWdpbm5lclwiOlxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdhbWUgbW9kZTogQmVnaW5uZXIgOXg5IHRhYmxlIHdpdGggMTAgbWluZXNcIik7XHJcbiAgICAgICAgICAgIFBsYXllci5nZXRJbnN0YW5jZSgpLnNldEdhbWVNb2RlKG1vZGUpO1xyXG4gICAgICAgICAgICByZXR1cm4gR2FtZS5nZXRJbnN0YW5jZSgpLm1vZGVJbmZvKG1vZGUpO1xyXG4gICAgICAgIGNhc2UgXCJpbnRlcm1lZGlhdGVcIjpcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJHYW1lIG1vZGU6IEludGVybWVkaWF0ZSAxNngxNiB0YWJsZSB3aXRoIDQwIG1pbmVzXCIpO1xyXG4gICAgICAgICAgICBQbGF5ZXIuZ2V0SW5zdGFuY2UoKS5zZXRHYW1lTW9kZShtb2RlKTtcclxuICAgICAgICAgICAgcmV0dXJuIEdhbWUuZ2V0SW5zdGFuY2UoKS5tb2RlSW5mbyhtb2RlKTtcclxuICAgICAgICBjYXNlIFwiZXhwZXJ0XCI6XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR2FtZSBtb2RlOiBFeHBlcnQgMTZ4MzAgdGFibGUgd2l0aCA5OSBtaW5lc1wiKTtcclxuICAgICAgICAgICAgUGxheWVyLmdldEluc3RhbmNlKCkuc2V0R2FtZU1vZGUobW9kZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBHYW1lLmdldEluc3RhbmNlKCkubW9kZUluZm8obW9kZSk7XHJcbiAgICAgICAgY2FzZSBcImN1c3RvbVwiOlxyXG4gICAgICAgICAgICBQbGF5ZXIuZ2V0SW5zdGFuY2UoKS5zZXRHYW1lTW9kZShtb2RlKTtcclxuICAgICAgICAgICAgaWYgKGN1c3RvbUlucHV0VmFsaWRhdGlvbihnZXRDdXN0b21Qcm9wcygpKSA9PT0gZmFsc2UpIHsgcmV0dXJuIGdhbWVNb2RlKFwiVmFsaWRhdGlvblwiKSB9XHJcbiAgICAgICAgICAgIEdhbWUuZ2V0SW5zdGFuY2UoKS5zZXRDdXN0b21Nb2RlKGdldEN1c3RvbVByb3BzKCkpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgR2FtZSBtb2RlOiBDdXN0b20gJHtHYW1lLmdldEluc3RhbmNlKCkubW9kZUluZm8obW9kZSlbMF19eCR7R2FtZS5nZXRJbnN0YW5jZSgpLm1vZGVJbmZvKG1vZGUpWzFdfSB0YWJsZSB3aXRoICR7R2FtZS5nZXRJbnN0YW5jZSgpLm1vZGVJbmZvKG1vZGUpWzJdfSBtaW5lKHMpYCk7XHJcbiAgICAgICAgICAgIHJldHVybiBHYW1lLmdldEluc3RhbmNlKCkubW9kZUluZm8obW9kZSk7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgaWYgKG1vZGUgPT09IFwiVmFsaWRhdGlvblwiKSB7IGNvbnNvbGUuZXJyb3IoXCJWYWxpZGF0aW9uIGlzc3VlXCIpOyByZXR1cm4gXCJlcnJvciFcIiB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignVGhlcmUgaXMgbm8gZ2FtZSBtb2RlIHdpdGggdGhhdCBudW1iZXIhJyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJlcnJvciFcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vI3JlZ2lvbiAtIGV2ZW50IGxpc3RlbmVybnNcclxuZ2FtZU1vZGVJbnB1dC52YWx1ZSA9IFwiYmVnaW5uZXJcIjtcclxuZ2FtZU1vZGVJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBkaXNwbGF5Q3VzdG9tTW9kZU9wdGlvbnMpO1xyXG4vLyNlbmRyZWdpb25cclxuXHJcbmV4cG9ydCB7IGdhbWVNb2RlLCBnYW1lTW9kZUlucHV0IH07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL2dhbWVNb2RlLnRzIiwiaW1wb3J0IHsgR2FtZSwgUGxheWVyIH0gZnJvbSAnLi9kYXRhJztcclxuaW1wb3J0IHsgZGVmaW5lU3Vycm91bmRpbmcgfSBmcm9tICcuL3RhYmxlR3JpZCc7XHJcbmltcG9ydCB7IHJhbmRvbU51bWJlcnNBcnJheSB9IGZyb20gJy4vaGVscGVyRnVuY3MnO1xyXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PU1JTkVTPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8jcmVnaW9uIGNyZWF0ZU1pbmVzKCkgLSBjcmVhdGUgbWluZXMgYmFzZWQgb24gZ2FtZU1vZGVcclxuY29uc3QgY3JlYXRlTWluZXMgPSAobW9kZUluZm86IG51bWJlcltdKTogbnVtYmVyW10gPT4gey8vIGtyZWlyYSBtaW5lIGkgc29ydGlyYSBpaCBwbyB2ZWxpY2luaVxyXG4gICAgbGV0IG1pbmVzID0gcmFuZG9tTnVtYmVyc0FycmF5KG1vZGVJbmZvWzJdLCAobW9kZUluZm9bMF0gKiBtb2RlSW5mb1sxXSkpLnNvcnQoKGEsIGIpID0+IHsgcmV0dXJuIGEgLSBiIH0pO1xyXG4gICAgY29uc29sZS5sb2coXCJNaW5lcyBsb2NhdGlvbjogXCIgKyBtaW5lcyk7IC8vIHByb3ZlcmF2YW1vIHBvemljaWp1IG1pbmEgLy8gemEgZGV2IHBvdHJlYmVcclxuICAgIHJldHVybiBtaW5lcztcclxufVxyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vI3JlZ2lvbiAtIHNldE1pbmVzKCkgLSBzZXQgbWluZXMgb24gdGFibGUgKGJpbmQgdG8gYXR0cmlidXRlIGRhdGEtbWluZSlcclxuY29uc3Qgc2V0TWluZXMgPSAodGFibGU6IEhUTUxFbGVtZW50LCBtb2RlSW5mbzogbnVtYmVyW10sIG1pbmVJY29uOiBhbnkpOiB2b2lkID0+IHtcclxuICAgIGxldCBtaW5lczogbnVtYmVyW10gPSBjcmVhdGVNaW5lcyhtb2RlSW5mbyk7Ly9rcmVpcmFtbyBtaW5lXHJcbiAgICBjb25zdCBhbGxGaWVsZHMgPSB0YWJsZS5nZXRFbGVtZW50c0J5VGFnTmFtZShcInRkXCIpOyAvLyB1emltYW1vIHN2ZSB0ZCBlbGVtZW50ZSBpeiB0YWJlbGVcclxuICAgIG1pbmVzLmZvckVhY2gobWluZSA9PiB7ICAvLyBwb3N0YXZsamFtbyBpa29udSBib21iYSBuYSBzdmFraSB0ZCBrb2ppIHNlIHBva2xhcGEgc2Egbml6b20gbWluYS5cclxuICAgICAgICBhbGxGaWVsZHNbKG1pbmUgLSAxKV0uc2V0QXR0cmlidXRlKFwiZGF0YS1taW5lXCIsIG1pbmVJY29uKTsgLy8gLTEgemJvZyByYXpsaWtlIHUgcG96aWNpamkgcG9samEgdSBuaXp1IGFsbGZpZWxkcyBpIHBvemljaWplIG1pbmVcclxuICAgIH0pO1xyXG59XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uIC0gY2xlYXJNaW5lcygpIC0gY2xlYXIgbWluZXMgZnJvbSB0YWJsZVxyXG5jb25zdCBjbGVhck1pbmVzID0gKHRhYmxlOiBIVE1MRWxlbWVudCk6IHZvaWQgPT4ge1xyXG4gICAgY29uc3QgYWxsRmllbGRzID0gdGFibGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJ0ZFwiKTtcclxuICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoYWxsRmllbGRzLCAoZmllbGQ6IEhUTUxUYWJsZURhdGFDZWxsRWxlbWVudCkgPT4ge1xyXG4gICAgICAgIGZpZWxkLnNldEF0dHJpYnV0ZSgnZGF0YS1taW5lJywgJycpO1xyXG4gICAgfSk7XHJcbn1cclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLyNyZWdpb24gLSBzaG93TWluZXMoKSAtIHNob3cgbWluZXMgb24gZ3JpZFxyXG5jb25zdCBzaG93TWluZXMgPSAodGFibGUsIG1pbmVJY29uKSA9PiB7XHJcbiAgICBjb25zdCBhbGxGaWVsZHMgPSB0YWJsZS5nZXRFbGVtZW50c0J5VGFnTmFtZShcInRkXCIpO1xyXG4gICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChhbGxGaWVsZHMsIChmaWVsZDogSFRNTFRhYmxlRGF0YUNlbGxFbGVtZW50KSA9PiB7XHJcbiAgICAgICAgaWYgKGZpZWxkLmdldEF0dHJpYnV0ZSgnZGF0YS1taW5lJykgPT09IG1pbmVJY29uKSB7XHJcbiAgICAgICAgICAgIGZpZWxkLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgICAgICAgIGxldCBpbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG4gICAgICAgICAgICBpZiAoUGxheWVyLmdldEluc3RhbmNlKCkuZ2V0R2FtZU1vZGUoKSA9PT0gJ2JlZ2lubmVyJykge1xyXG4gICAgICAgICAgICAgICAgaW1hZ2Uuc2V0QXR0cmlidXRlKCdzcmMnLCAnLi9pbWFnZXMvbWluZUIucG5nJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoUGxheWVyLmdldEluc3RhbmNlKCkuZ2V0R2FtZU1vZGUoKSA9PT0gJ2ludGVybWVkaWF0ZScpIHtcclxuICAgICAgICAgICAgICAgIGltYWdlLnNldEF0dHJpYnV0ZSgnc3JjJywgJy4vaW1hZ2VzL21pbmVJLnBuZycpO1xyXG4gICAgICAgICAgICB9IGVsc2UgeyBpbWFnZS5zZXRBdHRyaWJ1dGUoJ3NyYycsICcuL2ltYWdlcy9taW5lRS5wbmcnKTsgfVxyXG4gICAgICAgICAgICBmaWVsZC5jbGFzc0xpc3QuYWRkKCdlbXB0eScpO1xyXG4gICAgICAgICAgICBmaWVsZC5hcHBlbmRDaGlsZChpbWFnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn07XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy9OQVBPTUVOQSBkYXRhLW1pbmUgLSBha28gamUgYm9tYmEgc3RhdmxqYSBzZSBpa29uYSwgYWtvIG5pamUgc3RhdmxqYSBzZSBicm9qIGJvbWJpIHUgb2tydXplbmp1XHJcblxyXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVRJUFM9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbi8vI3JlZ2lvbiAtIHdyaXRlIHRpcHMgYmFzZWQgb24gbWluZXMgb24gdGhlIGdpdmVuIHRhYmxlXHJcbmNvbnN0IHdyaXRlVGlwcyA9ICh0YWJsZTogSFRNTFRhYmxlRWxlbWVudCk6IHZvaWQgPT4ge1xyXG4gICAgY29uc3QgYWxsRmllbGRzID0gdGFibGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJ0ZFwiKTsgLy8gc2VsZWt0dWplbW8gc3ZhIHBvbGphIHUgZGF0b2ogdGFiZWxpXHJcbiAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKGFsbEZpZWxkcywgZmllbGQgPT4geyAvLyB6YSBzdmFrbyBwb2xqZVxyXG4gICAgICAgIGlmIChmaWVsZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLW1pbmVcIikgPT09IFwiXCIpIHsgLy8gYWtvIGplIGVsZW1lbnQgcHJhemFuICh0ai4gbmlqZSBtaW5hLCBqZXIgc3UgbWluZSB2ZWMgcG9zdGF2bGplbmUgbmEgdGFibGkpXHJcbiAgICAgICAgICAgIGxldCBtaW5lc051bSA9IGNvdW50TWluZXMoZmllbGQpOyAvLyBwcm92ZXJhdmFtbyBzdXNlZG5hIHBvbGphIGkgaXNwaXN1amVtbyBicm9qIG1pbmEgdSBva29saW5pXHJcbiAgICAgICAgICAgIGlmIChtaW5lc051bSA9PT0gMCkgeyBmaWVsZC5zZXRBdHRyaWJ1dGUoXCJkYXRhLW1pbmVcIiwgXCJcIik7IGZpZWxkLnNldEF0dHJpYnV0ZShcImRhdGEtZW1wdHlcIiwgXCIxXCIpOyB9Ly8gYWtvIG5pamUgbWluYSBpIG5lbWEgdSBva3J1emVuanUgdXBpc3VqZW1vIHUgZGF0YS1lbXB0eSAxOzEgemEgdHJ1ZTtcclxuICAgICAgICAgICAgZWxzZSB7IGZpZWxkLnNldEF0dHJpYnV0ZShcImRhdGEtbWluZVwiLCBtaW5lc051bS50b1N0cmluZygpKTsgZmllbGQuc2V0QXR0cmlidXRlKFwiZGF0YS1lbXB0eVwiLCBcIjBcIik7IC8qZWxlbWVudC50ZXh0Q29udGVudCA9IHRleHQ7IHphIGRldiBwb3RyZWJlKi8gfSAvL2FrbyBpbWEgbWluYTtkYXRhLWVtcHR5IDsgMCB6YSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLyNyZWdpb24gLSBmdW5rY2lqYSBrb2phIHByb3ZlcmF2YSBwb2xqYSB1IG9rcnV6ZW5qdVxyXG5mdW5jdGlvbiBjb3VudE1pbmVzKGZpZWxkOiBIVE1MVGFibGVDZWxsRWxlbWVudCk6IG51bWJlciB7IC8vIHByb3NsZWRqdWplbW8gcG9samUgbmEgb3Nub3Z1IGtvamVnIHZyc2ltbyBwcm92ZXJ1IGkgYnJvaiBrb2xvbmEgemJvZyBvcmlqZW50YWNpamVcclxuICAgIGNvbnN0IGdhbWVNb2RlSW5mbyA9IEdhbWUuZ2V0SW5zdGFuY2UoKS5tb2RlSW5mbyhQbGF5ZXIuZ2V0SW5zdGFuY2UoKS5nZXRHYW1lTW9kZSgpKTtcclxuICAgIGNvbnN0IG51bU9mQ29sczogbnVtYmVyID0gZ2FtZU1vZGVJbmZvWzFdO1xyXG4gICAgbGV0IGNvdW50ZXIgPSAwOyAvLyBicm9qYWMgbWluYSB1IG9rcnV6ZW5qdSBwb2xqYVxyXG4gICAgbGV0IHN1cnJvdW5kaW5nID0gZGVmaW5lU3Vycm91bmRpbmcoR2FtZS5nZXRJbnN0YW5jZSgpLmdldEdhbWVUYWJsZSgpLCBmaWVsZCk7IC8vIGtyZWlyYW1vIG9rcnV6ZW5qZSAocG96aXZhbW8gZnVua2NpanUgemEgdG8pXHJcbiAgICBzdXJyb3VuZGluZy5mb3JFYWNoKHN1ckZpZWxkID0+IHsgLy8gcHJvdmVyYXZhbW8gc3Zha28gcG9samUgdSBva3J1emVuanVcclxuICAgICAgICBpZiAoc3VyRmllbGQgPT09IG51bGwpIHsgfS8vIGFrbyBqZSBwb2xqZSB2YW4gdGFiZWxlLCBpZ25vcmlzaVxyXG4gICAgICAgIGVsc2UgaWYgKHN1ckZpZWxkLmdldEF0dHJpYnV0ZShcImRhdGEtbWluZVwiKSA9PT0gXCJcXHVEODNEXFx1RENBM1wiKSB7IC8vIHphIHN2YWt1IG1pbnVcclxuICAgICAgICAgICAgY291bnRlcisrOyAvL2RvZGFqIGplZGFuIHUgYnJvamFjXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gY291bnRlcjsgLy8gY2VsYSBmdW5rY2lqYSB2cmFjYSBicm9qYWMgdGouIHVrdXBhIGJyb2ogbWluYSB1IG9rcnV6ZW5qdVxyXG59XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuZXhwb3J0IHsgc2V0TWluZXMsIGNsZWFyTWluZXMsIHNob3dNaW5lcywgd3JpdGVUaXBzIH07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL21pbmVzQW5kVGlwcy50cyIsImltcG9ydCB7IEdhbWUsIFBsYXllciB9IGZyb20gJy4vZGF0YSc7XHJcbmltcG9ydCB7IGRlZmluZVN1cnJvdW5kaW5nIH0gZnJvbSAnLi90YWJsZUdyaWQnO1xyXG5cclxuXHJcblxyXG4vLyNyZWdpb24gLSBzdG9wQ2xpY2soKSAtIHN0b3BpcmEgZXZlbnRMSXN0ZW5lciBuYSBlbGVtZW50dSBrb2ppIGplIGtsaWtudXRcclxuZnVuY3Rpb24gc3RvcENsaWNrKGV2ZW50OiBhbnkpIHtcclxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG59XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy89PT09PT09PT09PT09PT09PT09PT1FTVBUWSBGTE9XPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8jcmVnaW9uIC0gb3BlbkVtcHR5RWxlbWVudCgpIC0gZmxvdyBmdW5jdGlvblxyXG5cclxubGV0IG9wZW5FbXB0eUVsZW1lbnQgPSAoZWxlbWVudDogSFRNTFRhYmxlRGF0YUNlbGxFbGVtZW50KSA9PiB7Ly8gcG9rcmVjZSBlbXB0eSBmbG93IHByb3ZlcnVcclxuICAgIGxldCBlbXB0eUZpZWxkcyA9IGZpcnN0RW1wdHlGaWVsZENoZWNrKGVsZW1lbnQpOy8vcHJvdmVyYXZhIHNlIHBydm8gcHJhem5vIHBvbGplIGkgZXZpZGVudGlyYWp1IG9zdGFsYSBwcmF6bmEgcG9samEgdSBva3J1emVuanVcclxuICAgIC8vIGNvbnNvbGUubG9nKGVtcHR5RmllbGRzKTtcclxuICAgIGxldCBzdG9wU2VhcmNoID0gZmFsc2U7XHJcblxyXG4gICAgd2hpbGUgKHN0b3BTZWFyY2ggPT0gZmFsc2UpIHtcclxuICAgICAgICBpZiAoZW1wdHlGaWVsZHMubGVuZ3RoICE9IDApIHtcclxuICAgICAgICAgICAgbGV0IG5ld01haW5BcnJheTogYW55W10gPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGVtcHR5RmllbGRzLmZvckVhY2goZmllbGQgPT4gey8vIHphIHN2YWtvIHByYXpubyBwb2xqZVxyXG4gICAgICAgICAgICAgICAgZW1wdHlDZWxsKGZpZWxkKTsvLyB0b3RhbG5vIGdhIHByYXpuaW1vXHJcbiAgICAgICAgICAgICAgICBsZXQgc3ViQXJyYXkgPSBkZWZpbmVTdXJyb3VuZGluZyhHYW1lLmdldEluc3RhbmNlKCkuZ2V0R2FtZVRhYmxlKCksIGZpZWxkKTsvL3Byb3ZlcmF2YW1vIG9rcnV6ZW5qZSB0b2cgcG9samFcclxuICAgICAgICAgICAgICAgIHN1YkFycmF5LmZvckVhY2goKGVsZW1lbnQpID0+IHsvL3phIHN2YWtvIHBvbGplIGl6IG9rcnV6ZW5qYSB0b2cgcG9samFcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbWVudCAhPT0gbnVsbCkgey8vYWtvIGplIGVsZW1lbnQgdSBva3ZpcnUgdGFibGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWNsaWNrXCIsIFwiMVwiKTsvL3Bvc3RhdmxqYW1vIGRhIGplIGtsaWtudXRvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHN0b3BDbGljayk7Ly9icmlzZW1vIGV2ZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBzdG9wQ2xpY2spOy8vIGJyaXNlbW8gZXZlbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5ld01haW5BcnJheS5pbmRleE9mKGVsZW1lbnQpICE9PSAtMSkgeyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgeyBuZXdNYWluQXJyYXkucHVzaChlbGVtZW50KSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb250ZXh0ID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWlkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29udGV4dCA9PT0gJycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVtcHR5Q2VsbCg8YW55PmVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBuZXdNYWluQXJyYXkgPSBjaGVja0VtcHR5RmllbGRzKG5ld01haW5BcnJheSk7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhuZXdNYWluQXJyYXkpO1xyXG4gICAgICAgICAgICAgICAgZW1wdHlGaWVsZHMgPSBuZXdNYWluQXJyYXk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBzdG9wU2VhcmNoID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBzdG9wU2VhcmNoID0gdHJ1ZTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufVxyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vI3JlZ2lvbiAtIGVtcHR5Q2VsbCgpXHJcbmNvbnN0IGVtcHR5Q2VsbCA9IChlbGVtZW50OiBIVE1MVGFibGVEYXRhQ2VsbEVsZW1lbnQpOiB2b2lkID0+IHtcclxuICAgIGlmIChlbGVtZW50ICE9PSBudWxsKSB7XHJcbiAgICAgICAgZWxlbWVudC5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKFwiZGF0YS1lbXB0eVwiLCBcIlwiKTsvL0FMRVJUIGJyaXNlIHNlIGluZm8gbyB0b21lIGRhIGxpIGplIHByYXpuYSBjZWxpamEsIHByb3Zlcml0aSB6YXN0b1xyXG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImVtcHR5XCIpOy8vY3NzIGNsYXNhIGRhIHNlIG9ib2ppIHByYXpubyBwb2xqZVxyXG5cclxuICAgIH1cclxufVxyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vI3JlZ2lvbiAtIGNoZWNrRW1wdHlGaWVsZHMoKSAtIGNoZWNrIGVtcHR5IGZpZWxkcyBpZiBpdCBpcyB0b3RhbGx5IGVtcHR5IG9yIGl0cyBhIHRpcFxyXG5jb25zdCBjaGVja0VtcHR5RmllbGRzID0gKGZpZWxkczogYW55KSA9PiB7XHJcbiAgICBsZXQgY2hlY2tlZEVtcHR5RmllbGRzOiBIVE1MVGFibGVEYXRhQ2VsbEVsZW1lbnRbXSA9IFtdO1xyXG4gICAgZmllbGRzLmZvckVhY2goZmllbGQgPT4ge1xyXG4gICAgICAgIGlmIChmaWVsZCA9PT0gbnVsbCkgeyB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGZpZWxkLnNldEF0dHJpYnV0ZShcImRhdGEtY2xpY2tcIiwgXCIxXCIpOy8vc2V0IGZpZWxkIGFzIGNsaWNrZWRcclxuICAgICAgICAgICAgZmllbGQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHN0b3BDbGljayk7Ly91a2RpZGEgZXZlbnRcclxuICAgICAgICAgICAgZmllbGQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBzdG9wQ2xpY2spOy8vdWtpZGEgZXZlbnRcclxuICAgICAgICAgICAgY29uc3QgaXNFbXB0eSA9IGZpZWxkLmdldEF0dHJpYnV0ZShcImRhdGEtZW1wdHlcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbnRleHQgPSBmaWVsZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLW1pbmVcIik7XHJcbiAgICAgICAgICAgIGlmIChpc0VtcHR5ID09PSBcIjFcIikgey8vIGlmIGZpZWxkIGlzIHRvdGFsbHkgZW1wdHlcclxuICAgICAgICAgICAgICAgIGNoZWNrZWRFbXB0eUZpZWxkcy5wdXNoKGZpZWxkKTtcclxuICAgICAgICAgICAgICAgIGZpZWxkLmNsYXNzTGlzdC5hZGQoXCJlbXB0eVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHsgZmllbGQudGV4dENvbnRlbnQgPSBjb250ZXh0O2ZpZWxkLmNsYXNzTGlzdC5hZGQoJ2NsaWNrZWQnKTsgfS8vIGlmIGl0cyB0aXAsIHNob3cgaXRcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBjaGVja2VkRW1wdHlGaWVsZHM7IC8vIHJldHVybmluZyBhcnJheSBvZiB0b3RhbGx5IGVtcHR5IGZpZWxkc1xyXG59XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uIC0gZmlyc3RFbXB0eUZpZWxkQ2hlY2soKSAtIEZpcnN0IGNsaWNrZWQgZW1wdHkgZWxlbWVudCBjaGVjaywgcmV0dXJucyBhcnJheSBvZiBlbXB0eSBibGFuayBlbGVtZW50c1xyXG5jb25zdCBmaXJzdEVtcHR5RmllbGRDaGVjayA9IChmaWVsZDogSFRNTFRhYmxlRGF0YUNlbGxFbGVtZW50KSA9PiB7Ly9jaGVja2luZyBmaXJzdCBlbXB0eSBjbGlja2VkIGZpZWxkXHJcbiAgICBmaWVsZC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWNsaWNrXCIsIFwiMVwiKTsgLy8gc2V0IGNsaWNrZWRcclxuICAgIGZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzdG9wQ2xpY2spOy8vc3RvcGlyYSBldmVudCBjbGlja1xyXG4gICAgZmllbGQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBzdG9wQ2xpY2spOyAvLyBzdG9waXJhIGV2ZW50IG1vdXNlZG93blxyXG4gICAgZW1wdHlDZWxsKGZpZWxkKTsgLy8gcmVtb3ZlIGVtcHR5IGF0dHJpYnV0ZSwgY29sb3IgZmllbGRcclxuXHJcbiAgICBjb25zdCBzdXJyb3VuZEZpZWxkcyA9IGRlZmluZVN1cnJvdW5kaW5nKEdhbWUuZ2V0SW5zdGFuY2UoKS5nZXRHYW1lVGFibGUoKSwgZmllbGQpOy8va3JlaXJhIG5peiBzdXNlZG5paCBwb2xqYVxyXG4gICAgY29uc3QgZW1wdHlGaWVsZHMgPSBjaGVja0VtcHR5RmllbGRzKHN1cnJvdW5kRmllbGRzKTtcclxuICAgIHJldHVybiBlbXB0eUZpZWxkcztcclxufVxyXG4vLyNlbmRyZWdpb25cclxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuZXhwb3J0IHsgb3BlbkVtcHR5RWxlbWVudCwgc3RvcENsaWNrIH07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL2VtcHR5Rmxvdy50cyIsImxldCB0aW1lciA9IHtcclxuICAgIHRpbWU6IHtcclxuICAgICAgICBob3VyczogMCxcclxuICAgICAgICBtaW51dGVzOiAwLFxyXG4gICAgICAgIHNlY29uZHM6IDBcclxuICAgIH0sXHJcbiAgICBpbnRlcnZhbDogMSxcclxuICAgIHRpbWVJbmNyZW1lbnQ6ICgpID0+IHtcclxuICAgICAgICBpZiAodGltZXIudGltZS5zZWNvbmRzIDwgNTkpIHsgdGltZXIudGltZS5zZWNvbmRzKysgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRpbWVyLnRpbWUuc2Vjb25kcyA9PT0gNTkgJiYgdGltZXIudGltZS5taW51dGVzIDwgNTkpIHsgdGltZXIudGltZS5zZWNvbmRzID0gMCwgdGltZXIudGltZS5taW51dGVzKysgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRpbWVyLnRpbWUuc2Vjb25kcyA9PT0gNTkgJiYgdGltZXIudGltZS5taW51dGVzID09PSA1OSkgeyB0aW1lci50aW1lLnNlY29uZHMgPSAwLCB0aW1lci50aW1lLm1pbnV0ZXMgPSAwLCB0aW1lci50aW1lLmhvdXJzKysgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuXHJcbmxldCBjYWxjU2NvcmUgPSAoKTogbnVtYmVyID0+IHtcclxuICAgIHJldHVybiB0aW1lci50aW1lLnNlY29uZHMgKyAodGltZXIudGltZS5taW51dGVzICogNjApICsgKHRpbWVyLnRpbWUuaG91cnMgKiAzNjApO1xyXG59O1xyXG5cclxuXHJcbmxldCBnZXRTdHJpbmdUaW1lID0gKCkgPT4ge1xyXG4gICAgbGV0IHByZXZUaW1lID0gW3RpbWVyLnRpbWUuaG91cnMsIHRpbWVyLnRpbWUubWludXRlcywgdGltZXIudGltZS5zZWNvbmRzXTtcclxuICAgIGxldCBjdXJyVGltZSA9IHByZXZUaW1lLm1hcCgodGltZUVsZW1lbnQpID0+IHsgaWYgKHRpbWVFbGVtZW50IDwgMTApIHsgcmV0dXJuIFwiMFwiICsgdGltZUVsZW1lbnQgfSBlbHNlIHsgcmV0dXJuIHRpbWVFbGVtZW50IH0gfSk7XHJcbiAgICByZXR1cm4gYCR7Y3VyclRpbWVbMF19IDogJHtjdXJyVGltZVsxXX0gOiAke2N1cnJUaW1lWzJdfWA7XHJcbn07XHJcblxyXG5sZXQgc3RhcnRUaW1lciA9IChzdGVwID0gMSk6IHZvaWQgPT4ge1xyXG4gICAgdGltZXIuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCh0aW1lci50aW1lSW5jcmVtZW50LCBzdGVwICogMTAwMCk7XHJcbn07XHJcblxyXG5sZXQgc3RvcFRpbWVyID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgY2xlYXJJbnRlcnZhbCh0aW1lci5pbnRlcnZhbCk7XHJcbn07XHJcblxyXG5sZXQgcmVzZXRUaW1lciA9ICgpID0+IHtcclxuICAgIGZvciAobGV0IGVsZW1lbnQgaW4gdGltZXIudGltZSkgeyB0aW1lci50aW1lW2VsZW1lbnRdID0gMCB9O1xyXG59XHJcblxyXG5sZXQgc3RyaW5nSW50ZXJ2YWwgPSAwOyAvLyB6YSBpc3BpcyBzdHJpbmcgdnJlbWVuYVxyXG5jb25zdCB0aW1lclBsYWNlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RpbWVyUGxhY2UnKTtcclxuXHJcbmxldCBzdGFydFRpbWVySGFuZGxlciA9ICgpID0+IHtcclxuICAgIHN0YXJ0VGltZXIoKTtcclxuICAgIHN0cmluZ0ludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4geyB0aW1lclBsYWNlLnRleHRDb250ZW50ID0gZ2V0U3RyaW5nVGltZSgpIH0sIDEwMCk7XHJcbn07XHJcblxyXG5sZXQgc3RvcFRpbWVySGFuZGxlciA9ICgpID0+IHtcclxuICAgIHN0b3BUaW1lcigpO1xyXG4gICAgY2xlYXJJbnRlcnZhbChzdHJpbmdJbnRlcnZhbCk7XHJcbn07XHJcblxyXG5cclxuZXhwb3J0IHsgc3RhcnRUaW1lckhhbmRsZXIsIHN0b3BUaW1lciwgcmVzZXRUaW1lciwgZ2V0U3RyaW5nVGltZSwgdGltZXJQbGFjZSwgc3RvcFRpbWVySGFuZGxlciwgY2FsY1Njb3JlIH07XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC90aW1lci50cyIsImltcG9ydCB7IFBsYXllciB9IGZyb20gJy4vZGF0YSc7XHJcbmltcG9ydCB7IGNhbGNTY29yZSB9IGZyb20gJy4vdGltZXInO1xyXG5cclxuLy8jcmVnaW9uIC0gc2VsZWN0b3JzXHJcbmNvbnN0IHNjb3JlTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzY29yZUxpc3QnKTtcclxuY29uc3QgZ2FtZU1vZGVOYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGVOYW1lJyk7XHJcbmNvbnN0IG1vZGVOYW1lSGVhZGluZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RlTmFtZUhlYWRpbmcnKTtcclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLyNyZWdpb24gLSByYW5raW5nVGFibGUgZGVmaW5pdGlvblxyXG5sZXQgcmFua2luZ1RhYmxlOiB7fSA9IHtcclxuICAgIGJlZ2lubmVyOiBbWydKb2huJywgMTVdLCBbJ01hcnJ5JywgMjFdLCBbJ1RpbScsIDI0XSxbJ0FsZXgnLCAyNl1dLFxyXG4gICAgaW50ZXJtZWRpYXRlOiBbWydTYW0nLCA0NF0sIFsnTWFyaycsIDQ2XSwgWydKaW0nLCA1MF1dLFxyXG4gICAgZXhwZXJ0OiBbWydNYXJpYScsIDU4XSwgWydLaXQnLCA2Nl0sIFsnVG9ueScsIDcwXV1cclxufTtcclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLyNyZWdpb24gLSBwcmVzZXRTdG9yYWdlKCkgLSBjaGVja3MgaWYgdGhlcmUncyBkYXRhYmFzZSBpbiBsb2NhbHN0b3JhZ2UgaWYgbm90IGNyZWF0ZXMgb25lLCBvdGhlcndpc2UgbG9hZHMgaXQuXHJcbmNvbnN0IHByZXNldFN0b3JhZ2UgPSAoKTogdm9pZCA9PiB7XHJcbiAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3JhbmtpbmdUYWJsZScpID09PSBudWxsKSB7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3JhbmtpbmdUYWJsZScsIEpTT04uc3RyaW5naWZ5KHJhbmtpbmdUYWJsZSkpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGBkYXRhYmFzZSBmZXRjaGVkIGZyb20gbG9jYWxzdG9yYWdlYCwgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3JhbmtpbmdUYWJsZScpKTtcclxuICAgIH1cclxufTtcclxuLy8jZW5kcmVnaW9uXHJcblxyXG5wcmVzZXRTdG9yYWdlKCk7XHJcblxyXG4vLyNyZWdpb24gLSBzYXZlRGF0YSgpIC1cclxuY29uc3Qgc2F2ZURhdGEgPSAoKSA9PiB7XHJcbiAgICBsZXQgc3RvcmFnZURhdGEgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdyYW5raW5nVGFibGUnKSk7XHJcbiAgICBsZXQgZ2FtZU1vZGUgPSBQbGF5ZXIuZ2V0SW5zdGFuY2UoKS5nZXRHYW1lTW9kZSgpO1xyXG4gICAgY29uc29sZS5sb2coYEdhbWUgbW9kZSBpbnNpZGUgc2F2ZURhdGE6ICR7Z2FtZU1vZGV9YCk7XHJcblxyXG4gICAgbGV0IGN1cnJlbnRNb2RlVGFibGU6IChzdHJpbmcgfCBudW1iZXIpW11bXSA9IHN0b3JhZ2VEYXRhW2dhbWVNb2RlXTtcclxuICAgIGNvbnNvbGUubG9nKGBDdXJyZW50IFRhYmxlIGluc2lkZSBzYXZlRGF0YTogJHtjdXJyZW50TW9kZVRhYmxlfWApO1xyXG4gICAgY3VycmVudE1vZGVUYWJsZSA9IHNjb3JlVmFsaWRhdGlvbihjdXJyZW50TW9kZVRhYmxlKTtcclxuICAgIGNvbnNvbGUubG9nKGBUYWJsZSBpbnNpZGUgc2F2ZURhdGE6ICR7Y3VycmVudE1vZGVUYWJsZX1gKTtcclxuICAgIGN1cnJlbnRNb2RlVGFibGUuc29ydCgoYSwgYikgPT4geyByZXR1cm4gYVsxXVswXSAtIGJbMV1bMF0gfSk7XHJcbiAgICBmb3IgKGN1cnJlbnRNb2RlVGFibGUubGVuZ3RoOyBjdXJyZW50TW9kZVRhYmxlLmxlbmd0aCA+IDY7KSB7XHJcbiAgICAgICAgY3VycmVudE1vZGVUYWJsZS5wb3AoKTtcclxuICAgIH1cclxuICAgIHN0b3JhZ2VEYXRhW2dhbWVNb2RlXSA9IGN1cnJlbnRNb2RlVGFibGU7XHJcbiAgICBsZXQgbmV3RGF0YSA9IEpTT04uc3RyaW5naWZ5KHN0b3JhZ2VEYXRhKTtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdyYW5raW5nVGFibGUnLCBuZXdEYXRhKTtcclxuICAgIHJhbmtpbmdUYWJsZSA9IHN0b3JhZ2VEYXRhO1xyXG59O1xyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vI3JlZ2lvbiAtIHNjb3JlVmFsaWRhdGlvbiAoKSAtIHZhbGlkYXRlcyBpZiBzY29yZSBpcyBub3QgZXF1YWwgdG8gMFxyXG5jb25zdCBzY29yZVZhbGlkYXRpb24gPSAodGFibGU6IChzdHJpbmcgfCBudW1iZXIpW11bXSkgPT4ge1xyXG4gICAgbGV0IG5ld1RhYmxlID0gdGFibGU7XHJcbiAgICBpZiAoUGxheWVyLmdldEluc3RhbmNlKCkuZ2V0U2NvcmUoKSAhPT0gMCAmJiBQbGF5ZXIuZ2V0SW5zdGFuY2UoKS5nZXRTY29yZSgpICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBjb25zdCBwbGF5ZXJTY29yZSA9IFtQbGF5ZXIuZ2V0SW5zdGFuY2UoKS5nZXROYW1lKCksIFBsYXllci5nZXRJbnN0YW5jZSgpLmdldFNjb3JlKCldO1xyXG4gICAgICAgIG5ld1RhYmxlLnB1c2gocGxheWVyU2NvcmUpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5ld1RhYmxlO1xyXG59O1xyXG4vLyNlbmRyZWdpb25cclxuXHJcblxyXG4vLyNyZWdpb24gLSB3cml0ZURhdGEoKSAtIHByaW50cyBvdXQgcmFua2luZyB0YWJsZVxyXG5sZXQgcHJpbnREYXRhID0gKCkgPT4ge1xyXG5cclxuICAgIGxldCB0YWJsZSA9IHJhbmtpbmdUYWJsZVtQbGF5ZXIuZ2V0SW5zdGFuY2UoKS5nZXRHYW1lTW9kZSgpXTtcclxuXHJcbiAgICBnYW1lTW9kZU5hbWUudGV4dENvbnRlbnQgPSBQbGF5ZXIuZ2V0SW5zdGFuY2UoKS5nZXRHYW1lTW9kZSgpICsgJyBtb2RlJztcclxuICAgIHNjb3JlTGlzdC5pbm5lckhUTUwgPSAnJztcclxuXHJcbiAgICB0YWJsZS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgIGxldCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcbiAgICAgICAgbGkudGV4dENvbnRlbnQgPSBgJHtlbGVtZW50WzBdfSAtICR7ZWxlbWVudFsxXX1gO1xyXG4gICAgICAgIHNjb3JlTGlzdC5hcHBlbmRDaGlsZChsaSk7XHJcbiAgICB9KTtcclxufTtcclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLyNyZWdpb24gLSBoYW5kbGVSYW5raW5nKCkgLSBvbmUgdG8gcnVsZSB0aGVtIGFsbFxyXG5jb25zdCBoYW5kbGVSYW5raW5nID0gKCkgPT4ge1xyXG4gICAgc2NvcmVMaXN0LmNsYXNzTGlzdC5yZW1vdmUoJ3Njb3JlRGlzcGxheScpO1xyXG4gICAgZ2FtZU1vZGVOYW1lLmNsYXNzTGlzdC5yZW1vdmUoJ3Njb3JlRGlzcGxheScpO1xyXG4gICAgY29uc29sZS5sb2cocmFua2luZ1RhYmxlKTtcclxuICAgIHNhdmVEYXRhKCk7XHJcbiAgICBwcmludERhdGEoKTtcclxufTtcclxuLy8jZW5kcmVnaW9uXHJcblxyXG5leHBvcnQgeyBoYW5kbGVSYW5raW5nIH07XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9yYW5raW5nLnRzIiwiaW1wb3J0IHtnYW1lU2VjdGlvbn0gZnJvbSAnLi9kYXRhJztcclxuXHJcbmNvbnN0IGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJvZHlcIik7XHJcblxyXG5jb25zdCBib29tID0gKCkgPT57XHJcbiAgICBsZXQgaW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgIGltYWdlLnNldEF0dHJpYnV0ZSgnc3JjJywnLi9pbWFnZXMvYm9vbS5wbmcnKTtcclxuICAgIGltYWdlLmNsYXNzTGlzdC5hZGQoJ2JpZy1ib29tJyk7XHJcbiAgICBib2R5LmFwcGVuZENoaWxkKGltYWdlKTtcclxufTtcclxuXHJcbmNvbnN0IGdhbWVPdmVyID0gKCkgPT4ge1xyXG4gICAgbGV0IGltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICBpbWFnZS5zZXRBdHRyaWJ1dGUoJ3NyYycsJy4vaW1hZ2VzL2dhbWVvdmVyLnBuZycpO1xyXG4gICAgaW1hZ2UuY2xhc3NMaXN0LmFkZCgnZ2FtZS1vdmVyJyk7XHJcbiAgICBnYW1lU2VjdGlvbi5hcHBlbmRDaGlsZChpbWFnZSk7XHJcbn07XHJcblxyXG5jb25zdCB3aW4gPSAoKSA9PiB7XHJcbiAgICBsZXQgaW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgIGltYWdlLnNldEF0dHJpYnV0ZSgnc3JjJywnLi9pbWFnZXMvd2luLnBuZycpO1xyXG4gICAgaW1hZ2UuY2xhc3NMaXN0LmFkZCgnd2luJyk7XHJcbiAgICBnYW1lU2VjdGlvbi5hcHBlbmRDaGlsZChpbWFnZSk7XHJcbn07XHJcblxyXG5cclxuXHJcbmV4cG9ydCB7Ym9vbSwgZ2FtZU92ZXIsIHdpbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL2FuaW1hdGlvbi50cyJdLCJzb3VyY2VSb290IjoiIn0=