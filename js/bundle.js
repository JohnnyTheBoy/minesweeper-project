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
const gameStartButton = document.getElementById('start');
const gameResetButton = document.getElementById('reset');
const playerNameInput = document.getElementById('player-name');
const gameOptionsSection = document.getElementById('options');
const gameSection = document.getElementById('game-place');
playerNameInput.value = "";
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
    }
    setGameTable(element) {
        this._gameTable = element;
    }
    getGameTable() {
        return this._gameTable;
    }
}
Game._instance = new Game();
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



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return createGrid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return defineSurrounding; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__data__ = __webpack_require__(0);

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
const createLeftBorder = (numOfRows, numOfCols) => {
    let leftBorderFields = [1];
    for (let i = 0; i < numOfRows - 1; i++) {
        let borderField = leftBorderFields[i] + numOfCols;
        leftBorderFields.push(borderField);
    }
    return leftBorderFields;
};
const createRightBorder = (numOfRows, numOfCols) => {
    let rightBorderFields = [numOfCols];
    for (let i = 0; i < numOfRows - 1; i++) {
        let borderField = rightBorderFields[i] + numOfCols;
        rightBorderFields.push(borderField);
    }
    return rightBorderFields;
};
const defineSurrounding = (table, element) => {
    let surrounding;
    const id = parseInt(element.id);
    const gameModeInfo = __WEBPACK_IMPORTED_MODULE_0__data__["a" /* Game */].getInstance().modeInfo(__WEBPACK_IMPORTED_MODULE_0__data__["b" /* Player */].getInstance().getGameMode());
    const numOfRows = gameModeInfo[0];
    const numOfCols = gameModeInfo[1];
    const left = table.querySelector(`[id="${id - 1}field"]`);
    const upLeft = table.querySelector(`[id="${id - numOfCols - 1}field"]`);
    const up = table.querySelector(`[id="${id - numOfCols}field"]`);
    const upRight = table.querySelector(`[id="${id - numOfCols + 1}field"]`);
    const right = table.querySelector(`[id="${id + 1}field"]`);
    const rightDown = table.querySelector(`[id="${id + numOfCols + 1}field"]`);
    const down = table.querySelector(`[id="${id + numOfCols}field"]`);
    const downLeft = table.querySelector(`[id="${id + numOfCols - 1}field"]`);
    const leftBorder = createLeftBorder(numOfRows, numOfCols);
    const rightBorder = createRightBorder(numOfRows, numOfCols);
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



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return randomNumbersArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return preventTableMenu; });
const randomNumber = (maxNum, minNum = 1) => {
    return Math.floor(Math.random() * (maxNum - minNum + 1) + minNum);
};
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
const preventTableMenu = (event) => {
    let clickedPlace = event.target;
    if (clickedPlace.tagName === "TD" || clickedPlace.tagName === "TR" || clickedPlace.tagName === "TABLE" || clickedPlace.tagName === "IMG") {
        event.preventDefault();
    }
};



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









const mineIcon = "\uD83D\uDCA3";
let clickCounter = 0;
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
let plantMinesAgain = () => {
    const table = __WEBPACK_IMPORTED_MODULE_0__data__["a" /* Game */].getInstance().getGameTable();
    let gameModeInfo = Object(__WEBPACK_IMPORTED_MODULE_1__gameMode__["a" /* gameMode */])(__WEBPACK_IMPORTED_MODULE_1__gameMode__["b" /* gameModeInput */].value);
    Object(__WEBPACK_IMPORTED_MODULE_3__minesAndTips__["a" /* clearMines */])(table);
    Object(__WEBPACK_IMPORTED_MODULE_3__minesAndTips__["c" /* setMines */])(table, gameModeInfo, mineIcon);
    Object(__WEBPACK_IMPORTED_MODULE_3__minesAndTips__["e" /* writeTips */])(table);
};
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
const printGrid = () => {
    let gameModeInfo = Object(__WEBPACK_IMPORTED_MODULE_1__gameMode__["a" /* gameMode */])(__WEBPACK_IMPORTED_MODULE_1__gameMode__["b" /* gameModeInput */].value);
    Object(__WEBPACK_IMPORTED_MODULE_2__tableGrid__["a" /* createGrid */])(gameModeInfo);
    const table = __WEBPACK_IMPORTED_MODULE_0__data__["a" /* Game */].getInstance().getGameTable();
    table.classList.add(__WEBPACK_IMPORTED_MODULE_0__data__["b" /* Player */].getInstance().getGameMode());
    Object(__WEBPACK_IMPORTED_MODULE_3__minesAndTips__["c" /* setMines */])(table, gameModeInfo, mineIcon);
    Object(__WEBPACK_IMPORTED_MODULE_3__minesAndTips__["e" /* writeTips */])(table);
    __WEBPACK_IMPORTED_MODULE_8__animation__["b" /* gameGridSection */].appendChild(table);
    table.addEventListener("contextmenu", __WEBPACK_IMPORTED_MODULE_5__helperFuncs__["a" /* preventTableMenu */]);
    table.addEventListener("mousedown", flagIt);
    table.addEventListener('click', onFieldClick);
};
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
__WEBPACK_IMPORTED_MODULE_0__data__["c" /* gameOptionsSection */].addEventListener('click', onClick);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return gameMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return gameModeInput; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__data__ = __webpack_require__(0);

const gameModeInput = document.getElementById('game-mode');
const gameMode = (mode) => {
    switch (mode) {
        case "beginner":
            __WEBPACK_IMPORTED_MODULE_0__data__["b" /* Player */].getInstance().setGameMode(mode);
            return __WEBPACK_IMPORTED_MODULE_0__data__["a" /* Game */].getInstance().modeInfo(mode);
        case "intermediate":
            __WEBPACK_IMPORTED_MODULE_0__data__["b" /* Player */].getInstance().setGameMode(mode);
            return __WEBPACK_IMPORTED_MODULE_0__data__["a" /* Game */].getInstance().modeInfo(mode);
        case "expert":
            __WEBPACK_IMPORTED_MODULE_0__data__["b" /* Player */].getInstance().setGameMode(mode);
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
gameModeInput.value = "beginner";



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



const createMines = (modeInfo) => {
    let mines = Object(__WEBPACK_IMPORTED_MODULE_2__helperFuncs__["b" /* randomNumbersArray */])(modeInfo[2], (modeInfo[0] * modeInfo[1])).sort((a, b) => { return a - b; });
    return mines;
};
const setMines = (table, modeInfo, mineIcon) => {
    let mines = createMines(modeInfo);
    const allFields = table.getElementsByTagName("td");
    mines.forEach(mine => {
        allFields[(mine - 1)].setAttribute("data-mine", mineIcon);
    });
};
const clearMines = (table) => {
    const allFields = table.getElementsByTagName("td");
    Array.prototype.forEach.call(allFields, (field) => {
        field.setAttribute('data-mine', '');
    });
};
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



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return openEmptyElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return stopClick; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__data__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tableGrid__ = __webpack_require__(1);


const stopClick = (event) => {
    event.stopPropagation();
};
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
const emptyCell = (element) => {
    if (element !== null) {
        element.innerHTML = "";
        element.setAttribute("data-empty", "");
        element.classList.add("empty");
    }
};
const checkEmptyFields = (fields) => {
    let checkedEmptyFields = [];
    fields.forEach(field => {
        if (field === null) { }
        else {
            field.setAttribute("data-click", "1");
            field.addEventListener("click", stopClick);
            field.addEventListener("mousedown", stopClick);
            const isEmpty = field.getAttribute("data-empty");
            const context = field.getAttribute("data-mine");
            if (isEmpty === "1") {
                checkedEmptyFields.push(field);
                field.classList.add("empty");
            }
            else {
                field.textContent = context;
                field.classList.add('clicked');
            }
        }
    });
    return checkedEmptyFields;
};
const firstEmptyFieldCheck = (field) => {
    field.setAttribute("data-click", "1");
    field.addEventListener("click", stopClick);
    field.addEventListener("mousedown", stopClick);
    emptyCell(field);
    const surroundFields = Object(__WEBPACK_IMPORTED_MODULE_1__tableGrid__["b" /* defineSurrounding */])(__WEBPACK_IMPORTED_MODULE_0__data__["a" /* Game */].getInstance().getGameTable(), field);
    const emptyFields = checkEmptyFields(surroundFields);
    return emptyFields;
};



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
let stringInterval = 0;
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

const rankingGameMode = document.getElementById('game-mode-name');
const scoreList = document.getElementById('score-list');
let rankingTable = {
    beginner: [['John', 25], ['Marry', 26], ['Tim', 29], ['Alex', 35], ['Olivia', 40]],
    intermediate: [['Sam', 44], ['Emily', 46], ['Jim', 50], ['Charlotte', 53], ['Willy', 55]],
    expert: [['Maria', 58], ['Kit', 66], ['Tony', 70], ['Zoey', 75], ["Natalie", 80]]
};
const presetStorage = () => {
    if (localStorage.getItem('rankingTable') === null) {
        localStorage.setItem('rankingTable', JSON.stringify(rankingTable));
    }
};
presetStorage();
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
const scoreValidation = (table) => {
    let newTable = table;
    const playerScore = [__WEBPACK_IMPORTED_MODULE_0__data__["b" /* Player */].getInstance().getName(), __WEBPACK_IMPORTED_MODULE_0__data__["b" /* Player */].getInstance().getScore()];
    if (playerScore[1] !== 0 && playerScore[1] !== undefined) {
        newTable.push(playerScore);
    }
    return newTable;
};
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
const handleRanking = () => {
    saveData();
    printData();
};



/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return boom; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return gameOver; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return win; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return gameShow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return gameGridSection; });
const aboutGameButton = document.getElementById('about-game-button');
const gameButton = document.getElementById('game-button');
const gameRulesButton = document.getElementById('game-rules-button');
const welcomeScreen = document.getElementById('welcome-screen');
const gameRules = document.getElementById('game-rules');
const aboutGame = document.getElementById('about-game');
const gameGridSection = document.getElementById('game');
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
    gameGridSection.appendChild(image);
};
const win = () => {
    let image = document.createElement('img');
    image.setAttribute('src', './images/win.png');
    image.classList.add('win');
    gameGridSection.appendChild(image);
};
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



/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOTY1NWI2YTE3MzAyN2M3YmQ1YjUiLCJ3ZWJwYWNrOi8vLy4vYXBwL2RhdGEudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3RhYmxlR3JpZC50cyIsIndlYnBhY2s6Ly8vLi9hcHAvaGVscGVyRnVuY3MudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2FwcC50cyIsIndlYnBhY2s6Ly8vLi9hcHAvZ2FtZU1vZGUudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwL21pbmVzQW5kVGlwcy50cyIsIndlYnBhY2s6Ly8vLi9hcHAvZW1wdHlGbG93LnRzIiwid2VicGFjazovLy8uL2FwcC90aW1lci50cyIsIndlYnBhY2s6Ly8vLi9hcHAvcmFua2luZy50cyIsIndlYnBhY2s6Ly8vLi9hcHAvYW5pbWF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUM1REE7QUFBQSxNQUFNLGVBQWUsR0FBc0IsUUFBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM1RSxNQUFNLGVBQWUsR0FBc0IsUUFBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM1RSxNQUFNLGVBQWUsR0FBcUIsUUFBUSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENB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LGdCQUFnQixDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztBQUtXIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDMpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDk2NTViNmExNzMwMjdjN2JkNWI1IiwiLy8jcmVnaW9uIC0gc2VsZWN0b3JzXHJcbmNvbnN0IGdhbWVTdGFydEJ1dHRvbiA9IDxIVE1MQnV0dG9uRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhcnQnKTtcclxuY29uc3QgZ2FtZVJlc2V0QnV0dG9uID0gPEhUTUxCdXR0b25FbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXNldCcpO1xyXG5jb25zdCBwbGF5ZXJOYW1lSW5wdXQgPSA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWVyLW5hbWUnKTtcclxuY29uc3QgZ2FtZU9wdGlvbnNTZWN0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ29wdGlvbnMnKTtcclxuY29uc3QgZ2FtZVNlY3Rpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZS1wbGFjZScpO1xyXG5cclxuLy8jZW5kcmVnaW9uXHJcblxyXG5wbGF5ZXJOYW1lSW5wdXQudmFsdWUgPSBcIlwiO1xyXG5cclxuXHJcbi8vI3JlZ2lvbiAtIEdhbWUgc2luZ2xldG9uIGNsYXNzIGRlZmluaXRpb25cclxuXHJcbmNsYXNzIEdhbWUge1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IF9pbnN0YW5jZTogR2FtZSA9IG5ldyBHYW1lKCk7XHJcblxyXG4gICAgcHJpdmF0ZSBfbW9kZSA9IHtcclxuICAgICAgICBiZWdpbm5lcjogWzksIDksIDEwXSxcclxuICAgICAgICBpbnRlcm1lZGlhdGU6IFsxNiwgMTYsIDQwXSxcclxuICAgICAgICBleHBlcnQ6IFsxNiwgMzAsIDk5XSxcclxuICAgICAgICBjdXN0b206IFswLCAwLCAwXVxyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIF9nYW1lVGFibGU6IEhUTUxUYWJsZUVsZW1lbnQ7XHJcblxyXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IEdhbWUge1xyXG4gICAgICAgIHJldHVybiBHYW1lLl9pbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbW9kZUluZm8obW9kZU5hbWU6IHN0cmluZyk6IG51bWJlcltdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbW9kZVttb2RlTmFtZV07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldEN1c3RvbU1vZGUoaW5mbzogbnVtYmVyW10pIHtcclxuICAgICAgICB0aGlzLl9tb2RlLmN1c3RvbSA9IGluZm87XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coYEN1c3RvbSBtb2RlIHNldCB0byAke3RoaXMuX21vZGUuY3VzdG9tfWApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRHYW1lVGFibGUoZWxlbWVudCkge1xyXG4gICAgICAgIHRoaXMuX2dhbWVUYWJsZSA9IGVsZW1lbnQ7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coYFRhYmxlIGNyZWF0ZWRgKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0R2FtZVRhYmxlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9nYW1lVGFibGU7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uIC0gUGxheWVyIC0gc2luZ2xldG9uIGNsYXNzIGRlZmluaXRpb25cclxuY2xhc3MgUGxheWVyIHtcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBfaW5zdGFuY2U6IFBsYXllciA9IG5ldyBQbGF5ZXIoKTtcclxuXHJcbiAgICBwcml2YXRlIF9uYW1lOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgcHJpdmF0ZSBfZ2FtZU1vZGU6IHN0cmluZyA9IFwibm9uZVwiO1xyXG4gICAgcHJpdmF0ZSBfc2NvcmU6IG51bWJlcjtcclxuXHJcbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogUGxheWVyIHtcclxuICAgICAgICByZXR1cm4gUGxheWVyLl9pbnN0YW5jZTtcclxuICAgIH1cclxuICAgIGdldE5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbmFtZTtcclxuICAgIH1cclxuICAgIHNldE5hbWUodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIGlmICh2YWx1ZSA9PT0gJycpIHsgdmFsdWUgPSAndW5rbm93biBwbGF5ZXInIH1cclxuICAgICAgICB0aGlzLl9uYW1lID0gdmFsdWU7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coYFBsYXllcnMgbmFtZSBzZXQgdG86ICR7dGhpcy5fbmFtZX1gKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRHYW1lTW9kZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9nYW1lTW9kZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRHYW1lTW9kZSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fZ2FtZU1vZGUgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRTY29yZSh2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuX3Njb3JlID0gdmFsdWU7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coYFNjb3JlIHNldCB0byAke3RoaXMuX3Njb3JlfWApO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFNjb3JlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zY29yZTtcclxuICAgIH1cclxufVxyXG4vLyNlbmRyZWdpb25cclxuXHJcbmV4cG9ydCB7IEdhbWUsIFBsYXllciwgZ2FtZVN0YXJ0QnV0dG9uLCBnYW1lUmVzZXRCdXR0b24sIHBsYXllck5hbWVJbnB1dCwgZ2FtZU9wdGlvbnNTZWN0aW9uLCBnYW1lU2VjdGlvbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL2RhdGEudHMiLCJpbXBvcnQgeyBHYW1lLCBQbGF5ZXIgfSBmcm9tICcuL2RhdGEnO1xyXG5cclxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1UQUJMRSBHUklEPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4vLyNyZWdpb24gLSBjcmVhdGVzIHRhYmxlIGdyaWQgZm9yIGdpdmVuIGdhbWUgbW9kZVxyXG5jb25zdCBjcmVhdGVHcmlkID0gKHJvd3NBbmRDb2xzOiBudW1iZXJbXSk6IHZvaWQgPT4ge1xyXG4gICAgbGV0IHRhYmxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGFibGUnKTtcclxuICAgIGxldCBjZWxsQ291bnRlciA9IDE7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJvd3NBbmRDb2xzWzBdOyBpKyspIHtcclxuICAgICAgICBsZXQgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKTtcclxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHJvd3NBbmRDb2xzWzFdOyBqKyspIHtcclxuICAgICAgICAgICAgbGV0IGNvbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XHJcbiAgICAgICAgICAgIGNvbC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBjZWxsQ291bnRlciArICdmaWVsZCcpO1xyXG4gICAgICAgICAgICBjb2wuc2V0QXR0cmlidXRlKFwiZGF0YS1pZFwiLCBjZWxsQ291bnRlciArICdmaWVsZCcpO1xyXG4gICAgICAgICAgICBjb2wuc2V0QXR0cmlidXRlKFwiZGF0YS1taW5lXCIsIFwiXCIpO1xyXG4gICAgICAgICAgICBjb2wuc2V0QXR0cmlidXRlKFwiZGF0YS1lbXB0eVwiLCBcIlwiKTtcclxuICAgICAgICAgICAgY29sLnNldEF0dHJpYnV0ZShcImRhdGEtY2xpY2tcIiwgXCJcIik7XHJcbiAgICAgICAgICAgIGNlbGxDb3VudGVyKys7XHJcbiAgICAgICAgICAgIHJvdy5hcHBlbmRDaGlsZChjb2wpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0YWJsZS5hcHBlbmRDaGlsZChyb3cpO1xyXG4gICAgfVxyXG4gICAgR2FtZS5nZXRJbnN0YW5jZSgpLnNldEdhbWVUYWJsZSh0YWJsZSk7XHJcbn07XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuXHJcbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Qk9SREVSUz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuLy8jcmVnaW9uIC0gY3JlYXRlcyBsZWZ0IGJvcmRlciBmb3IgdGFibGUgZ3JpZFxyXG5jb25zdCBjcmVhdGVMZWZ0Qm9yZGVyID0gKG51bU9mUm93czogbnVtYmVyLCBudW1PZkNvbHM6IG51bWJlcikgPT4ge1xyXG4gICAgbGV0IGxlZnRCb3JkZXJGaWVsZHM6IG51bWJlcltdID0gWzFdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1PZlJvd3MgLSAxOyBpKyspIHtcclxuICAgICAgICBsZXQgYm9yZGVyRmllbGQgPSBsZWZ0Qm9yZGVyRmllbGRzW2ldICsgbnVtT2ZDb2xzO1xyXG4gICAgICAgIGxlZnRCb3JkZXJGaWVsZHMucHVzaChib3JkZXJGaWVsZCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbGVmdEJvcmRlckZpZWxkcztcclxufVxyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vI3JlZ2lvbiAtIGNyZWF0ZXMgcmlnaHQgYm9yZGVyIGZvciB0YWJsZSBncmlkXHJcbmNvbnN0IGNyZWF0ZVJpZ2h0Qm9yZGVyID0gKG51bU9mUm93czogbnVtYmVyLCBudW1PZkNvbHM6IG51bWJlcikgPT4ge1xyXG4gICAgbGV0IHJpZ2h0Qm9yZGVyRmllbGRzOiBudW1iZXJbXSA9IFtudW1PZkNvbHNdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1PZlJvd3MgLSAxOyBpKyspIHtcclxuICAgICAgICBsZXQgYm9yZGVyRmllbGQgPSByaWdodEJvcmRlckZpZWxkc1tpXSArIG51bU9mQ29scztcclxuICAgICAgICByaWdodEJvcmRlckZpZWxkcy5wdXNoKGJvcmRlckZpZWxkKTtcclxuICAgIH1cclxuICAgIHJldHVybiByaWdodEJvcmRlckZpZWxkcztcclxufVxyXG4vLyNlbmRyZWdpb25cclxuXHJcblxyXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVNVUlJPVU5ESU5HPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbi8vI3JlZ2lvbiAtIGRlZmluZVN1cnJvdW5kaW5nKCkgLSBjcmVhdGVzIHN1cnJvdW5kaW5nIGJhc2VkIG9uIGZpZWxkIHBvc2l0aW9uIChiYXNlZCBvbiBpZClcclxuXHJcbmNvbnN0IGRlZmluZVN1cnJvdW5kaW5nID0gKHRhYmxlOiBFbGVtZW50LCBlbGVtZW50OiBIVE1MRWxlbWVudCkgPT4geyAvLyBkZWZpbmlzZW1vIG9rb2xuYSBwb2xqYSBuYSBvc25vdnUgZGF0b2cgcG9samEgaSBicm9qYSBrb2xvbmEgdGFiZWxlXHJcbiAgICBsZXQgc3Vycm91bmRpbmc7XHJcbiAgICBjb25zdCBpZCA9IHBhcnNlSW50KGVsZW1lbnQuaWQpO1xyXG4gICAgY29uc3QgZ2FtZU1vZGVJbmZvID0gR2FtZS5nZXRJbnN0YW5jZSgpLm1vZGVJbmZvKFBsYXllci5nZXRJbnN0YW5jZSgpLmdldEdhbWVNb2RlKCkpO1xyXG4gICAgY29uc3QgbnVtT2ZSb3dzID0gZ2FtZU1vZGVJbmZvWzBdO1xyXG4gICAgY29uc3QgbnVtT2ZDb2xzID0gZ2FtZU1vZGVJbmZvWzFdO1xyXG5cclxuICAgIC8vYmFzZSBzdXJyb3VuZGluZ1xyXG4gICAgY29uc3QgbGVmdCA9IHRhYmxlLnF1ZXJ5U2VsZWN0b3IoYFtpZD1cIiR7aWQgLSAxfWZpZWxkXCJdYCk7XHJcbiAgICBjb25zdCB1cExlZnQgPSB0YWJsZS5xdWVyeVNlbGVjdG9yKGBbaWQ9XCIke2lkIC0gbnVtT2ZDb2xzIC0gMX1maWVsZFwiXWApO1xyXG4gICAgY29uc3QgdXAgPSB0YWJsZS5xdWVyeVNlbGVjdG9yKGBbaWQ9XCIke2lkIC0gbnVtT2ZDb2xzfWZpZWxkXCJdYCk7XHJcbiAgICBjb25zdCB1cFJpZ2h0ID0gdGFibGUucXVlcnlTZWxlY3RvcihgW2lkPVwiJHtpZCAtIG51bU9mQ29scyArIDF9ZmllbGRcIl1gKTtcclxuICAgIGNvbnN0IHJpZ2h0ID0gdGFibGUucXVlcnlTZWxlY3RvcihgW2lkPVwiJHtpZCArIDF9ZmllbGRcIl1gKTtcclxuICAgIGNvbnN0IHJpZ2h0RG93biA9IHRhYmxlLnF1ZXJ5U2VsZWN0b3IoYFtpZD1cIiR7aWQgKyBudW1PZkNvbHMgKyAxfWZpZWxkXCJdYCk7XHJcbiAgICBjb25zdCBkb3duID0gdGFibGUucXVlcnlTZWxlY3RvcihgW2lkPVwiJHtpZCArIG51bU9mQ29sc31maWVsZFwiXWApO1xyXG4gICAgY29uc3QgZG93bkxlZnQgPSB0YWJsZS5xdWVyeVNlbGVjdG9yKGBbaWQ9XCIke2lkICsgbnVtT2ZDb2xzIC0gMX1maWVsZFwiXWApO1xyXG5cclxuICAgIC8vY3JlYXRlIGJvcmRlcnNcclxuICAgIGNvbnN0IGxlZnRCb3JkZXIgPSBjcmVhdGVMZWZ0Qm9yZGVyKG51bU9mUm93cywgbnVtT2ZDb2xzKTtcclxuICAgIGNvbnN0IHJpZ2h0Qm9yZGVyID0gY3JlYXRlUmlnaHRCb3JkZXIobnVtT2ZSb3dzLCBudW1PZkNvbHMpO1xyXG5cclxuICAgIC8vc3Vycm91bmRpbmcgYmFzZWQgb24gZmllbGQtYm9yZGVycyByZWxhdGlvblxyXG4gICAgaWYgKGxlZnRCb3JkZXIuaW5kZXhPZihpZCkgIT09IC0xKSB7XHJcbiAgICAgICAgc3Vycm91bmRpbmcgPSBbdXAsIHVwUmlnaHQsIHJpZ2h0LCByaWdodERvd24sIGRvd25dO1xyXG4gICAgfSBlbHNlIGlmIChyaWdodEJvcmRlci5pbmRleE9mKGlkKSAhPT0gLTEpIHtcclxuICAgICAgICBzdXJyb3VuZGluZyA9IFtsZWZ0LCB1cExlZnQsIHVwLCBkb3duLCBkb3duTGVmdF07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHN1cnJvdW5kaW5nID0gW2xlZnQsIHVwTGVmdCwgdXAsIHVwUmlnaHQsIHJpZ2h0LCByaWdodERvd24sIGRvd24sIGRvd25MZWZ0XTtcclxuICAgIH1cclxuICAgIHJldHVybiBzdXJyb3VuZGluZztcclxufVxyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuXHJcbmV4cG9ydCB7IGNyZWF0ZUdyaWQsZGVmaW5lU3Vycm91bmRpbmd9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC90YWJsZUdyaWQudHMiLCIvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVJBTkRPTSBGVU5DVElPTlM9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbi8vI3JlZ2lvbiAgLSBDcmVhdGVzIHJhbmRvbSBudW1iZXIgZm9yIHBhc3NlZCBtaW4gYW5kIG1heFxyXG5jb25zdCByYW5kb21OdW1iZXIgPSAobWF4TnVtOiBudW1iZXIsIG1pbk51bTogbnVtYmVyID0gMSk6IG51bWJlciA9PiB7XHJcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heE51bSAtIG1pbk51bSArIDEpICsgbWluTnVtKTtcclxufTtcclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLyNyZWdpb24gIC0gYXJyYXkgd2l0aCBzcGVjaWZpZWQgbnVtYmVyIG9mIHJhbmRvbSBudW1iZXJzXHJcbmNvbnN0IHJhbmRvbU51bWJlcnNBcnJheSA9IChhcnJMZW5ndGg6IG51bWJlciwgbWF4TnVtOiBudW1iZXIsIG1pbk51bTogbnVtYmVyID0gMSk6IG51bWJlcltdID0+IHtcclxuICAgIGxldCBhcnJheTogbnVtYmVyW10gPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyTGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgbmV3TnVtID0gcmFuZG9tTnVtYmVyKG1heE51bSwgbWluTnVtKTtcclxuICAgICAgICB3aGlsZSAoYXJyYXkuaW5kZXhPZihuZXdOdW0pICE9PSAtMSkge1xyXG4gICAgICAgICAgICBuZXdOdW0gPSByYW5kb21OdW1iZXIobWluTnVtLCBtYXhOdW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBhcnJheS5wdXNoKG5ld051bSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXJyYXk7XHJcbn1cclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbi8vI3JlZ2lvbiAtIHByZXZlbnRUYWJsZU1lbnUoKSAtIHByZXZlbnRzIGRlZmF1bHQgcmlnaHQgY2xpY2sgb24gdGFibGUgZWxlbWVudHNcclxuY29uc3QgcHJldmVudFRhYmxlTWVudSA9IChldmVudCk6dm9pZCA9PiB7XHJcbiAgICBsZXQgY2xpY2tlZFBsYWNlID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgaWYgKGNsaWNrZWRQbGFjZS50YWdOYW1lID09PSBcIlREXCIgfHwgY2xpY2tlZFBsYWNlLnRhZ05hbWUgPT09IFwiVFJcIiB8fCBjbGlja2VkUGxhY2UudGFnTmFtZSA9PT0gXCJUQUJMRVwiIHx8IGNsaWNrZWRQbGFjZS50YWdOYW1lID09PSBcIklNR1wiKSB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIH1cclxufVxyXG4vLyNlbmRyZWdpb25cclxuXHJcbmV4cG9ydCB7IHJhbmRvbU51bWJlcnNBcnJheSwgcHJldmVudFRhYmxlTWVudSB9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9oZWxwZXJGdW5jcy50cyIsImltcG9ydCB7IEdhbWUsIFBsYXllciwgZ2FtZU9wdGlvbnNTZWN0aW9uLCBnYW1lU3RhcnRCdXR0b24sIGdhbWVSZXNldEJ1dHRvbiwgZ2FtZVNlY3Rpb24sIHBsYXllck5hbWVJbnB1dCB9IGZyb20gJy4vZGF0YSc7XHJcbmltcG9ydCB7IGdhbWVNb2RlLCBnYW1lTW9kZUlucHV0IH0gZnJvbSAnLi9nYW1lTW9kZSc7XHJcbmltcG9ydCB7IGNyZWF0ZUdyaWQgfSBmcm9tICcuL3RhYmxlR3JpZCc7XHJcbmltcG9ydCB7IHNldE1pbmVzLCBjbGVhck1pbmVzLCBzaG93TWluZXMsIHdyaXRlVGlwcywgc2V0TWluZUljb24gfSBmcm9tICcuL21pbmVzQW5kVGlwcyc7XHJcbmltcG9ydCB7IG9wZW5FbXB0eUVsZW1lbnQsIHN0b3BDbGljayB9IGZyb20gJy4vZW1wdHlGbG93JztcclxuaW1wb3J0IHsgcHJldmVudFRhYmxlTWVudSB9IGZyb20gJy4vaGVscGVyRnVuY3MnO1xyXG5pbXBvcnQgeyBzdGFydFRpbWVySGFuZGxlciwgc3RvcFRpbWVySGFuZGxlciwgcmVzZXRUaW1lciwgdGltZXJQbGFjZSwgY2FsY1Njb3JlIH0gZnJvbSAnLi90aW1lcic7XHJcbmltcG9ydCB7IGhhbmRsZVJhbmtpbmcgfSBmcm9tICcuL3JhbmtpbmcnO1xyXG5pbXBvcnQgeyBib29tLCBnYW1lT3Zlciwgd2luLCBnYW1lU2hvdywgZ2FtZUdyaWRTZWN0aW9uIH0gZnJvbSAnLi9hbmltYXRpb24nO1xyXG5cclxuXHJcbmNvbnN0IG1pbmVJY29uID0gXCJcXHVEODNEXFx1RENBM1wiOyAvLyBkZWZpbmlzZW1vIGlrb25pY3UgemEgbWludSB1IG5la29tIG1vbWVudHVcclxubGV0IGNsaWNrQ291bnRlciA9IDA7IC8vIGZvbGxvd3MgY2xpY2tzXHJcblxyXG4vLyNyZWdpb24gLSBtYW5hZ2VJbnB1dHMoKSAtIG1hbmFnZSBpbnB1dHMgb24gZG9jdW1lbnQsIGJhc2VkIG9uIGV2ZW50XHJcbmNvbnN0IG1hbmFnZUlucHV0cyA9IChldmVudCk6IHN0cmluZyA9PiB7XHJcbiAgICBpZiAoZXZlbnQudGFyZ2V0LmlkID09PSBcInN0YXJ0XCIpIHtcclxuXHJcbiAgICAgICAgcGxheWVyTmFtZUlucHV0LnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAndHJ1ZScpO1xyXG4gICAgICAgIGdhbWVNb2RlSW5wdXQuc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICd0cnVlJyk7XHJcbiAgICAgICAgZ2FtZVN0YXJ0QnV0dG9uLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAndHJ1ZScpO1xyXG4gICAgICAgIGdhbWVSZXNldEJ1dHRvbi5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XHJcbiAgICAgICAgcmV0dXJuIFwic3RhcnRcIjtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGV2ZW50LnRhcmdldC5pZCA9PT0gXCJyZXNldFwiKSB7XHJcbiAgICAgICAgZ2FtZVJlc2V0QnV0dG9uLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAndHJ1ZScpO1xyXG4gICAgICAgIGdhbWVTdGFydEJ1dHRvbi5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XHJcbiAgICAgICAgZ2FtZU1vZGVJbnB1dC5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XHJcbiAgICAgICAgZ2FtZU1vZGVJbnB1dC52YWx1ZSA9ICdiZWdpbm5lcic7XHJcbiAgICAgICAgcGxheWVyTmFtZUlucHV0LnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcclxuICAgICAgICBnYW1lU2hvdygpO1xyXG4gICAgICAgIGdhbWVHcmlkU2VjdGlvbi5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgICAgIGNsaWNrQ291bnRlciA9IDA7XHJcbiAgICAgICAgc3RvcFRpbWVySGFuZGxlcigpO1xyXG4gICAgICAgIHJlc2V0VGltZXIoKTtcclxuICAgICAgICB0aW1lclBsYWNlLnRleHRDb250ZW50ID0gXCIwMCA6IDAwIDogMDBcIjtcclxuICAgICAgICByZXR1cm4gXCJyZXNldFwiO1xyXG4gICAgfVxyXG59O1xyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vI3JlZ2lvbiAtIGNoZWNrTW92ZSgpIC0gY2hlY2sgcmVzdWx0IG9mIG1vdmUgdGhhdCBwbGF5ZXIgbWFkZSBhbmQgZGVjaWRlcyB3aGF0IHRoZW5cclxuY29uc3QgY2hlY2tNb3ZlID0gKGVsZW1lbnQ6IEhUTUxFbGVtZW50KSA9PiB7XHJcbiAgICBjb25zdCB0YWJsZSA9IEdhbWUuZ2V0SW5zdGFuY2UoKS5nZXRHYW1lVGFibGUoKTtcclxuICAgIGNvbnN0IGF0dHJpYnV0ZSA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1taW5lXCIpO1xyXG4gICAgaWYgKGF0dHJpYnV0ZSA9PT0gXCJcXHVEODNEXFx1RENBM1wiKSB7XHJcbiAgICAgICAgaWYgKGNsaWNrQ291bnRlciA9PT0gMSkge1xyXG4gICAgICAgICAgICBwbGFudE1pbmVzQWdhaW4oKTtcclxuICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgb25GaWVsZENsaWNrKTtcclxuICAgICAgICAgICAgY2hlY2tNb3ZlKGVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IGJvbWIgPSBzZXRNaW5lSWNvbigpO1xyXG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2VtcHR5Jyk7XHJcbiAgICAgICAgICAgIHN0b3BUaW1lckhhbmRsZXIoKTtcclxuICAgICAgICAgICAgdGFibGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG9uRmllbGRDbGljayk7XHJcbiAgICAgICAgICAgIHRhYmxlLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgZmxhZ0l0KTtcclxuICAgICAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChib21iKTtcclxuICAgICAgICAgICAgc2hvd01pbmVzKHRhYmxlLCBtaW5lSWNvbik7XHJcbiAgICAgICAgICAgIGJvb20oKTtcclxuICAgICAgICAgICAgdGFibGUuY2xhc3NMaXN0LmFkZCgndGFibGUnKTtcclxuICAgICAgICAgICAgZ2FtZU92ZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChhdHRyaWJ1dGUgPT09IFwiXCIpIHtcclxuICAgICAgICBvcGVuRW1wdHlFbGVtZW50KDxhbnk+ZWxlbWVudCk7XHJcbiAgICAgICAgY2hlY2tXaW4oKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGVsZW1lbnQudGV4dENvbnRlbnQgPSBhdHRyaWJ1dGU7XHJcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdjbGlja2VkJyk7XHJcbiAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWNsaWNrXCIsIFwiMVwiKTtcclxuICAgICAgICBjaGVja1dpbigpO1xyXG4gICAgfVxyXG59XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uIC0gZmxhZ0l0KCkgLSBwdXRzIGZsYWcgb24gcmlnaHQgY2xpY2tcclxuY29uc3QgZmxhZ0l0ID0gKGV2ZW50OiBhbnkpID0+IHtcclxuICAgIGxldCBlbGVtZW50ID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgaWYgKGVsZW1lbnQudGFnTmFtZSA9PT0gXCJURFwiKSB7XHJcbiAgICAgICAgaWYgKGV2ZW50LndoaWNoID09PSAzKSB7XHJcbiAgICAgICAgICAgIGxldCBmbGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICAgICAgICAgIGlmIChQbGF5ZXIuZ2V0SW5zdGFuY2UoKS5nZXRHYW1lTW9kZSgpID09PSAnYmVnaW5uZXInKSB7XHJcbiAgICAgICAgICAgICAgICBmbGFnLnNldEF0dHJpYnV0ZSgnc3JjJywgJy4vaW1hZ2VzL2ZsYWdCLnBuZycpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKFBsYXllci5nZXRJbnN0YW5jZSgpLmdldEdhbWVNb2RlKCkgPT09ICdpbnRlcm1lZGlhdGUnKSB7XHJcbiAgICAgICAgICAgICAgICBmbGFnLnNldEF0dHJpYnV0ZSgnc3JjJywgJy4vaW1hZ2VzL2ZsYWdJLnBuZycpO1xyXG4gICAgICAgICAgICB9IGVsc2UgeyBmbGFnLnNldEF0dHJpYnV0ZSgnc3JjJywgJy4vaW1hZ2VzL2ZsYWdFLnBuZycpOyB9XHJcbiAgICAgICAgICAgIGZsYWcuY2xhc3NMaXN0LmFkZCgnZmxhZycpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGVsZW1lbnQuaW5uZXJIVE1MID09PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzdG9wQ2xpY2spO1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChmbGFnKTtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZW1wdHknKTtcclxuICAgICAgICAgICAgICAgIGNoZWNrV2luKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKGVsZW1lbnQudGFnTmFtZSA9PT0gXCJJTUdcIikge1xyXG4gICAgICAgIGlmIChldmVudC53aGljaCA9PT0gMykge1xyXG4gICAgICAgICAgICBlbGVtZW50LnBhcmVudE5vZGUuY2xhc3NMaXN0LnJlbW92ZSgnZW1wdHknKTtcclxuICAgICAgICAgICAgZWxlbWVudC5wYXJlbnROb2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25GaWVsZENsaWNrKTtcclxuICAgICAgICAgICAgZWxlbWVudC5wYXJlbnROb2RlLmlubmVySFRNTCA9IFwiXCI7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLyNyZWdpb24gLSBwbGFudE1pbmVzQWdhaW4oKVxyXG5sZXQgcGxhbnRNaW5lc0FnYWluID0gKCkgPT4ge1xyXG4gICAgY29uc3QgdGFibGUgPSBHYW1lLmdldEluc3RhbmNlKCkuZ2V0R2FtZVRhYmxlKCk7XHJcbiAgICBsZXQgZ2FtZU1vZGVJbmZvID0gZ2FtZU1vZGUoZ2FtZU1vZGVJbnB1dC52YWx1ZSkgYXMgbnVtYmVyW107XHJcbiAgICBjbGVhck1pbmVzKHRhYmxlKTtcclxuICAgIHNldE1pbmVzKHRhYmxlLCBnYW1lTW9kZUluZm8sIG1pbmVJY29uKTtcclxuICAgIHdyaXRlVGlwcyh0YWJsZSk7XHJcbn07XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uIC0gY2hlY2tXaW4oKVxyXG5mdW5jdGlvbiBjaGVja1dpbigpIHtcclxuICAgIGNvbnN0IHRhYmxlID0gR2FtZS5nZXRJbnN0YW5jZSgpLmdldEdhbWVUYWJsZSgpO1xyXG4gICAgbGV0IGdhbWVNb2RlSW5mbyA9IGdhbWVNb2RlKGdhbWVNb2RlSW5wdXQudmFsdWUpIGFzIG51bWJlcltdO1xyXG4gICAgbGV0IGNsb3NlZDogYW55ID0gW107XHJcbiAgICBsZXQgYWxsRmllbGRzID0gdGFibGUucXVlcnlTZWxlY3RvckFsbChcInRkXCIpO1xyXG4gICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChhbGxGaWVsZHMsIChmaWVsZDogYW55KSA9PiB7XHJcbiAgICAgICAgaWYgKGZpZWxkLmdldEF0dHJpYnV0ZShcImRhdGEtY2xpY2tcIiwgXCIxXCIpKSB7XHJcbiAgICAgICAgICAgIGNsb3NlZC5wdXNoKGZpZWxkKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoKGNsb3NlZC5sZW5ndGggPT09ICgoZ2FtZU1vZGVJbmZvWzBdICogZ2FtZU1vZGVJbmZvWzFdKSAtIGdhbWVNb2RlSW5mb1syXSkpKSB7XHJcbiAgICAgICAgc3RvcFRpbWVySGFuZGxlcigpO1xyXG4gICAgICAgIFBsYXllci5nZXRJbnN0YW5jZSgpLnNldFNjb3JlKGNhbGNTY29yZSgpKTtcclxuICAgICAgICB0YWJsZS5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgb25GaWVsZENsaWNrKTtcclxuICAgICAgICB0YWJsZS5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGZsYWdJdCk7XHJcbiAgICAgICAgaGFuZGxlUmFua2luZygpO1xyXG4gICAgICAgIHdpbigpO1xyXG4gICAgICAgIHRhYmxlLmNsYXNzTGlzdC5hZGQoJ3RhYmxlJyk7XHJcbiAgICB9XHJcbn1cclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLyNyZWdpb24gb25GaWVsZENsaWNrKCkgLSB3aGF0IHRvIGRvIHdoZW4gcGxheWVyIGNsaWNrcyBvbiBmaWVsZFxyXG5jb25zdCBvbkZpZWxkQ2xpY2sgPSAoZXZlbnQ6IGFueSkgPT4ge1xyXG4gICAgbGV0IGZpZWxkID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgaWYgKGZpZWxkLnRhZ05hbWUgPT09IFwiVERcIikge1xyXG4gICAgICAgIGZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzdG9wQ2xpY2spO1xyXG4gICAgICAgIGZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgc3RvcENsaWNrKTtcclxuICAgICAgICBjbGlja0NvdW50ZXIrKztcclxuICAgICAgICBpZiAoY2xpY2tDb3VudGVyID09PSAxKSB7IHN0YXJ0VGltZXJIYW5kbGVyKCkgfTtcclxuICAgICAgICBjaGVja01vdmUoZmllbGQpO1xyXG4gICAgfVxyXG59O1xyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vI3JlZ2lvbiAtIHByaW50R3JpZCgpIC0gY3JlYXRlcyBmdWxsIEdyaWQgYW5kIGFkZHMgaXQgdG8gdGhlIGRvY3VtZW50XHJcbmNvbnN0IHByaW50R3JpZCA9ICgpOiB2b2lkID0+IHtcclxuICAgIGxldCBnYW1lTW9kZUluZm8gPSBnYW1lTW9kZShnYW1lTW9kZUlucHV0LnZhbHVlKSBhcyBudW1iZXJbXTtcclxuICAgIC8vY3JlYXRlIHRhYmxlXHJcbiAgICBjcmVhdGVHcmlkKGdhbWVNb2RlSW5mbyk7XHJcbiAgICBjb25zdCB0YWJsZSA9IEdhbWUuZ2V0SW5zdGFuY2UoKS5nZXRHYW1lVGFibGUoKTtcclxuICAgIHRhYmxlLmNsYXNzTGlzdC5hZGQoUGxheWVyLmdldEluc3RhbmNlKCkuZ2V0R2FtZU1vZGUoKSk7XHJcbiAgICAvL3NldCBtaW5lc1xyXG4gICAgc2V0TWluZXModGFibGUsIGdhbWVNb2RlSW5mbywgbWluZUljb24pO1xyXG4gICAgLy8gLy8gLy9zZXQgdGlwc1xyXG4gICAgd3JpdGVUaXBzKHRhYmxlKTtcclxuICAgIC8vIC8vIC8vcHJpbnQgdGFibGVcclxuICAgIGdhbWVHcmlkU2VjdGlvbi5hcHBlbmRDaGlsZCh0YWJsZSk7XHJcbiAgICAvLyAvL3NldCBsaXN0ZW5lcnNcclxuICAgIHRhYmxlLmFkZEV2ZW50TGlzdGVuZXIoXCJjb250ZXh0bWVudVwiLCBwcmV2ZW50VGFibGVNZW51KTtcclxuICAgIHRhYmxlLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgZmxhZ0l0KTtcclxuICAgIHRhYmxlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25GaWVsZENsaWNrKTtcclxuXHJcbn07XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uIC0gb25DbGljaygpIC0gbWFpbiBmdW5jdGlvblxyXG5jb25zdCBvbkNsaWNrID0gKGV2ZW50KTogdm9pZCA9PiB7XHJcbiAgICBpZiAoZXZlbnQudGFyZ2V0LnRhZ05hbWUgPT09IFwiQlVUVE9OXCIpIHtcclxuICAgICAgICBpZiAobWFuYWdlSW5wdXRzKGV2ZW50KSA9PT0gJ3N0YXJ0Jykge1xyXG4gICAgICAgICAgICBQbGF5ZXIuZ2V0SW5zdGFuY2UoKS5zZXROYW1lKHBsYXllck5hbWVJbnB1dC52YWx1ZSk7XHJcbiAgICAgICAgICAgIGdhbWVTaG93KCk7XHJcbiAgICAgICAgICAgIHByaW50R3JpZCgpO1xyXG4gICAgICAgICAgICBoYW5kbGVSYW5raW5nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vI3JlZ2lvbiAtIGdhbWVPcHRpb25zU2VjdGlvbiBldmVudCBsaXN0ZW5lcnNcclxuZ2FtZU9wdGlvbnNTZWN0aW9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25DbGljayk7XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9hcHAudHMiLCJpbXBvcnQgeyBHYW1lLCBQbGF5ZXIgfSBmcm9tICcuL2RhdGEnO1xyXG5cclxuLy8jcmVnaW9uIC0gc2VsZWN0b3JzXHJcbi8vIGNvbnN0IGN1c3RvbVJvd3NJbnB1dCA9IDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjdXN0b21Sb3dzJyk7XHJcbi8vIGNvbnN0IGN1c3RvbUNvbHNJbnB1dCA9IDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjdXN0b21Db2xzJyk7XHJcbi8vIGNvbnN0IGN1c3RvbU1pbmVzSW5wdXQgPSA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3VzdG9tTWluZXMnKTtcclxuY29uc3QgZ2FtZU1vZGVJbnB1dCA9IDxIVE1MU2VsZWN0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZS1tb2RlJyk7XHJcbi8vIGNvbnN0IGN1c3RvbU1vZGVPcHRpb25zID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjdXN0b21Nb2RlT3B0aW9ucycpO1xyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vIC8vI3JlZ2lvbiAtIGdldEN1c3RvbVByb3BzKCkgLSBnZXRzIGN1c3RvbSBwcm9wZXJ0aWVzIGZyb20gdXNlciBpbnB1dFxyXG4vLyBjb25zdCBnZXRDdXN0b21Qcm9wcyA9ICgpID0+IHtcclxuLy8gICAgIGxldCBjdXN0b21Qcm9wcyA9IFtcclxuLy8gICAgICAgICBwYXJzZUludChjdXN0b21Sb3dzSW5wdXQudmFsdWUpLFxyXG4vLyAgICAgICAgIHBhcnNlSW50KGN1c3RvbUNvbHNJbnB1dC52YWx1ZSksXHJcbi8vICAgICAgICAgcGFyc2VJbnQoY3VzdG9tTWluZXNJbnB1dC52YWx1ZSksXHJcbi8vICAgICBdO1xyXG4vLyAgICAgcmV0dXJuIGN1c3RvbVByb3BzO1xyXG4vLyB9XHJcbi8vIC8vI2VuZHJlZ2lvblxyXG5cclxuLy8gLy8jcmVnaW9uIC0gZGlzcGxheUN1c3RvbU1vZGVPcHRzKCkgLSBoaWRlcyBvciBzaG93cyBkaXYgd2l0aCBjdXN0b20gZ2FtZSBvcHRpb25zIGluIGRvY3VtZW50XHJcbi8vIGxldCBkaXNwbGF5Q3VzdG9tTW9kZU9wdGlvbnMgPSAoKTogdm9pZCA9PiB7XHJcbi8vICAgICBpZiAoZ2FtZU1vZGVJbnB1dC52YWx1ZSA9PT0gXCJjdXN0b21cIikge1xyXG4vLyAgICAgICAgIGN1c3RvbU1vZGVPcHRpb25zIS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcclxuLy8gICAgIH0gZWxzZSB7IGN1c3RvbU1vZGVPcHRpb25zIS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTsgfVxyXG4vLyB9O1xyXG4vLyAvLyNlbmRyZWdpb25cclxuXHJcbi8vIC8vI3JlZ2lvbiAtIGN1c3RvbUlucHV0VmFsaWRhdGlvbigpIC0gY3VzdG9tIGdhbWUgbW9kZSBpbnB1dCB2YWxpZGF0aW9uXHJcbi8vIGNvbnN0IGN1c3RvbUlucHV0VmFsaWRhdGlvbiA9IChtb2RlSW5mbzogbnVtYmVyW10pID0+IHsvL2dhbWUgbW9kZSBpbmZvIFtyb3dzLGNvbHMsbWluZXNdXHJcbi8vICAgICBpZiAobW9kZUluZm9bMl0gPj0gbW9kZUluZm9bMF0gKiBtb2RlSW5mb1sxXSkgeyAgLy9udW0gb2YgbWluZXMgdmFsaWRhdGlvbixjYW4ndCBiZSBtb3JlIG1pbmVzIHRoYW4gZmllbGRzIG9yIGVxdWFsIHRvIG51bSBvZiBmaWVsZHNcclxuLy8gICAgICAgICBhbGVydChcIkNhbid0IGhhdmUgbW9yZSBtaW5lcyB0aGFuIGZpZWxkc1wiKTtcclxuLy8gICAgICAgICByZXR1cm4gZmFsc2U7XHJcbi8vICAgICB9IHJldHVybiB0cnVlO1xyXG4vLyB9O1xyXG4vLyAvLyNlbmRyZWdpb25cclxuXHJcbi8vI3JlZ2lvbiAtIGdhbWVNb2RlKCkgLSBnYW1lIG1vZGUgc3dpdGNoZXJcclxuY29uc3QgZ2FtZU1vZGUgPSAobW9kZTogc3RyaW5nKTogbnVtYmVyW10gfCBzdHJpbmcgPT4ge1xyXG4gICAgc3dpdGNoIChtb2RlKSB7XHJcbiAgICAgICAgY2FzZSBcImJlZ2lubmVyXCI6XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiR2FtZSBtb2RlOiBCZWdpbm5lciA5eDkgdGFibGUgd2l0aCAxMCBtaW5lc1wiKTtcclxuICAgICAgICAgICAgUGxheWVyLmdldEluc3RhbmNlKCkuc2V0R2FtZU1vZGUobW9kZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBHYW1lLmdldEluc3RhbmNlKCkubW9kZUluZm8obW9kZSk7XHJcbiAgICAgICAgY2FzZSBcImludGVybWVkaWF0ZVwiOlxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkdhbWUgbW9kZTogSW50ZXJtZWRpYXRlIDE2eDE2IHRhYmxlIHdpdGggNDAgbWluZXNcIik7XHJcbiAgICAgICAgICAgIFBsYXllci5nZXRJbnN0YW5jZSgpLnNldEdhbWVNb2RlKG1vZGUpO1xyXG4gICAgICAgICAgICByZXR1cm4gR2FtZS5nZXRJbnN0YW5jZSgpLm1vZGVJbmZvKG1vZGUpO1xyXG4gICAgICAgIGNhc2UgXCJleHBlcnRcIjpcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJHYW1lIG1vZGU6IEV4cGVydCAxNngzMCB0YWJsZSB3aXRoIDk5IG1pbmVzXCIpO1xyXG4gICAgICAgICAgICBQbGF5ZXIuZ2V0SW5zdGFuY2UoKS5zZXRHYW1lTW9kZShtb2RlKTtcclxuICAgICAgICAgICAgcmV0dXJuIEdhbWUuZ2V0SW5zdGFuY2UoKS5tb2RlSW5mbyhtb2RlKTtcclxuICAgICAgICAvLyBjYXNlIFwiY3VzdG9tXCI6XHJcbiAgICAgICAgLy8gICAgIFBsYXllci5nZXRJbnN0YW5jZSgpLnNldEdhbWVNb2RlKG1vZGUpO1xyXG4gICAgICAgIC8vICAgICBpZiAoY3VzdG9tSW5wdXRWYWxpZGF0aW9uKGdldEN1c3RvbVByb3BzKCkpID09PSBmYWxzZSkgeyByZXR1cm4gZ2FtZU1vZGUoXCJWYWxpZGF0aW9uXCIpIH1cclxuICAgICAgICAvLyAgICAgR2FtZS5nZXRJbnN0YW5jZSgpLnNldEN1c3RvbU1vZGUoZ2V0Q3VzdG9tUHJvcHMoKSk7XHJcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKGBHYW1lIG1vZGU6IEN1c3RvbSAke0dhbWUuZ2V0SW5zdGFuY2UoKS5tb2RlSW5mbyhtb2RlKVswXX14JHtHYW1lLmdldEluc3RhbmNlKCkubW9kZUluZm8obW9kZSlbMV19IHRhYmxlIHdpdGggJHtHYW1lLmdldEluc3RhbmNlKCkubW9kZUluZm8obW9kZSlbMl19IG1pbmUocylgKTtcclxuICAgICAgICAvLyAgICAgcmV0dXJuIEdhbWUuZ2V0SW5zdGFuY2UoKS5tb2RlSW5mbyhtb2RlKTtcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICBpZiAobW9kZSA9PT0gXCJWYWxpZGF0aW9uXCIpIHsgY29uc29sZS5lcnJvcihcIlZhbGlkYXRpb24gaXNzdWVcIik7IHJldHVybiBcImVycm9yIVwiIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdUaGVyZSBpcyBubyBnYW1lIG1vZGUgd2l0aCB0aGF0IG51bWJlciEnKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBcImVycm9yIVwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uIC0gZXZlbnQgbGlzdGVuZXJuc1xyXG5nYW1lTW9kZUlucHV0LnZhbHVlID0gXCJiZWdpbm5lclwiO1xyXG4vLyBnYW1lTW9kZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGRpc3BsYXlDdXN0b21Nb2RlT3B0aW9ucyk7Ly9cclxuLy8jZW5kcmVnaW9uXHJcblxyXG5leHBvcnQgeyBnYW1lTW9kZSwgZ2FtZU1vZGVJbnB1dCB9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9nYW1lTW9kZS50cyIsImltcG9ydCB7IEdhbWUsIFBsYXllciB9IGZyb20gJy4vZGF0YSc7XHJcbmltcG9ydCB7IGRlZmluZVN1cnJvdW5kaW5nIH0gZnJvbSAnLi90YWJsZUdyaWQnO1xyXG5pbXBvcnQgeyByYW5kb21OdW1iZXJzQXJyYXkgfSBmcm9tICcuL2hlbHBlckZ1bmNzJztcclxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1NSU5FUz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vI3JlZ2lvbiBjcmVhdGVNaW5lcygpIC0gY3JlYXRlIG1pbmVzIGJhc2VkIG9uIGdhbWUgbW9kZVxyXG5jb25zdCBjcmVhdGVNaW5lcyA9IChtb2RlSW5mbzogbnVtYmVyW10pOiBudW1iZXJbXSA9PiB7Ly8gY3JlYXRlcyByYW5kb20gbnVtYmVyIG9mIG1pbmVzIGFuZCBzb3J0cyB0aGVtIGJ5IHNpemVcclxuICAgIGxldCBtaW5lcyA9IHJhbmRvbU51bWJlcnNBcnJheShtb2RlSW5mb1syXSwgKG1vZGVJbmZvWzBdICogbW9kZUluZm9bMV0pKS5zb3J0KChhLCBiKSA9PiB7IHJldHVybiBhIC0gYiB9KTtcclxuICAgIC8vIGNvbnNvbGUubG9nKFwiTWluZXMgbG9jYXRpb246IFwiICsgbWluZXMpOyAvLyBmb3IgZGV2IHB1cnBvc2VzXHJcbiAgICByZXR1cm4gbWluZXM7XHJcbn1cclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLyNyZWdpb24gLSBzZXRNaW5lcygpIC0gc2V0IG1pbmVzIG9uIHRhYmxlXHJcbmNvbnN0IHNldE1pbmVzID0gKHRhYmxlOiBIVE1MRWxlbWVudCwgbW9kZUluZm86IG51bWJlcltdLCBtaW5lSWNvbjogYW55KTogdm9pZCA9PiB7XHJcbiAgICBsZXQgbWluZXM6IG51bWJlcltdID0gY3JlYXRlTWluZXMobW9kZUluZm8pO1xyXG4gICAgY29uc3QgYWxsRmllbGRzID0gdGFibGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJ0ZFwiKTtcclxuICAgIG1pbmVzLmZvckVhY2gobWluZSA9PiB7IFxyXG4gICAgICAgIGFsbEZpZWxkc1sobWluZSAtIDEpXS5zZXRBdHRyaWJ1dGUoXCJkYXRhLW1pbmVcIiwgbWluZUljb24pO1xyXG4gICAgfSk7XHJcbn1cclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLyNyZWdpb24gLSBjbGVhck1pbmVzKCkgLSBjbGVhciBtaW5lcyBmcm9tIHRhYmxlXHJcbmNvbnN0IGNsZWFyTWluZXMgPSAodGFibGU6IEhUTUxFbGVtZW50KTogdm9pZCA9PiB7XHJcbiAgICBjb25zdCBhbGxGaWVsZHMgPSB0YWJsZS5nZXRFbGVtZW50c0J5VGFnTmFtZShcInRkXCIpO1xyXG4gICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChhbGxGaWVsZHMsIChmaWVsZDogSFRNTFRhYmxlRGF0YUNlbGxFbGVtZW50KSA9PiB7XHJcbiAgICAgICAgZmllbGQuc2V0QXR0cmlidXRlKCdkYXRhLW1pbmUnLCAnJyk7XHJcbiAgICB9KTtcclxufVxyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vI3JlZ2lvbiAtIHNldE1pbmVJY29uKCkgLSBzZXRzIG1pbmUgaWNvbiBiYXNlZCBvbiBnYW1lIG1vZGVcclxuY29uc3Qgc2V0TWluZUljb24gPSAoKSA9PiB7XHJcbiAgICBsZXQgaW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgIGlmIChQbGF5ZXIuZ2V0SW5zdGFuY2UoKS5nZXRHYW1lTW9kZSgpID09PSAnYmVnaW5uZXInKSB7XHJcbiAgICAgICAgaW1hZ2Uuc2V0QXR0cmlidXRlKCdzcmMnLCAnLi9pbWFnZXMvbWluZUIucG5nJyk7XHJcbiAgICB9IGVsc2UgaWYgKFBsYXllci5nZXRJbnN0YW5jZSgpLmdldEdhbWVNb2RlKCkgPT09ICdpbnRlcm1lZGlhdGUnKSB7XHJcbiAgICAgICAgaW1hZ2Uuc2V0QXR0cmlidXRlKCdzcmMnLCAnLi9pbWFnZXMvbWluZUkucG5nJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGltYWdlLnNldEF0dHJpYnV0ZSgnc3JjJywgJy4vaW1hZ2VzL21pbmVFLnBuZycpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGltYWdlO1xyXG59XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uIC0gc2hvd01pbmVzKCkgLSBzaG93IG1pbmVzIG9uIGdyaWRcclxuY29uc3Qgc2hvd01pbmVzID0gKHRhYmxlLCBtaW5lSWNvbikgPT4ge1xyXG4gICAgY29uc3QgYWxsRmllbGRzID0gdGFibGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJ0ZFwiKTtcclxuICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoYWxsRmllbGRzLCAoZmllbGQ6IEhUTUxUYWJsZURhdGFDZWxsRWxlbWVudCkgPT4ge1xyXG4gICAgICAgIGlmIChmaWVsZC5nZXRBdHRyaWJ1dGUoJ2RhdGEtbWluZScpID09PSBtaW5lSWNvbikge1xyXG4gICAgICAgICAgICBmaWVsZC5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgICAgICAgICBmaWVsZC5jbGFzc0xpc3QuYWRkKCdlbXB0eScpO1xyXG4gICAgICAgICAgICBmaWVsZC5hcHBlbmRDaGlsZChzZXRNaW5lSWNvbigpKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufTtcclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVRJUFM9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbi8vI3JlZ2lvbiAtIHdyaXRlVGlwcygpIC0gd3JpdGUgdGlwcyBiYXNlZCBvbiBtaW5lcyBvbiB0aGUgZ2l2ZW4gdGFibGVcclxuY29uc3Qgd3JpdGVUaXBzID0gKHRhYmxlOiBIVE1MVGFibGVFbGVtZW50KTogdm9pZCA9PiB7XHJcbiAgICBjb25zdCBhbGxGaWVsZHMgPSB0YWJsZS5nZXRFbGVtZW50c0J5VGFnTmFtZShcInRkXCIpO1xyXG4gICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChhbGxGaWVsZHMsIGZpZWxkID0+IHtcclxuICAgICAgICBpZiAoZmllbGQuZ2V0QXR0cmlidXRlKFwiZGF0YS1taW5lXCIpID09PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIGxldCBtaW5lc051bSA9IGNvdW50TWluZXMoZmllbGQpO1xyXG4gICAgICAgICAgICBpZiAobWluZXNOdW0gPT09IDApIHsgZmllbGQuc2V0QXR0cmlidXRlKFwiZGF0YS1taW5lXCIsIFwiXCIpOyBmaWVsZC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWVtcHR5XCIsIFwiMVwiKTsgfVxyXG4gICAgICAgICAgICBlbHNlIHsgZmllbGQuc2V0QXR0cmlidXRlKFwiZGF0YS1taW5lXCIsIG1pbmVzTnVtLnRvU3RyaW5nKCkpOyBmaWVsZC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWVtcHR5XCIsIFwiMFwiKTsgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vI3JlZ2lvbiAtIGNvdW50TWluZXMoKSAtIGNvdW50cyBtaW5lcyBpbiBzdXJyb3VuZGluZ1xyXG5mdW5jdGlvbiBjb3VudE1pbmVzKGZpZWxkOiBIVE1MVGFibGVDZWxsRWxlbWVudCk6IG51bWJlciB7XHJcbiAgICBjb25zdCBnYW1lTW9kZUluZm8gPSBHYW1lLmdldEluc3RhbmNlKCkubW9kZUluZm8oUGxheWVyLmdldEluc3RhbmNlKCkuZ2V0R2FtZU1vZGUoKSk7XHJcbiAgICBjb25zdCBudW1PZkNvbHM6IG51bWJlciA9IGdhbWVNb2RlSW5mb1sxXTtcclxuICAgIGxldCBjb3VudGVyID0gMDtcclxuICAgIGxldCBzdXJyb3VuZGluZyA9IGRlZmluZVN1cnJvdW5kaW5nKEdhbWUuZ2V0SW5zdGFuY2UoKS5nZXRHYW1lVGFibGUoKSwgZmllbGQpO1xyXG4gICAgc3Vycm91bmRpbmcuZm9yRWFjaChzdXJGaWVsZCA9PiB7XHJcbiAgICAgICAgaWYgKHN1ckZpZWxkID09PSBudWxsKSB7IH1cclxuICAgICAgICBlbHNlIGlmIChzdXJGaWVsZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLW1pbmVcIikgPT09IFwiXFx1RDgzRFxcdURDQTNcIikge1xyXG4gICAgICAgICAgICBjb3VudGVyKys7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gY291bnRlcjtcclxufVxyXG4vLyNlbmRyZWdpb25cclxuXHJcbmV4cG9ydCB7IHNldE1pbmVzLCBjbGVhck1pbmVzLCBzaG93TWluZXMsIHdyaXRlVGlwcywgc2V0TWluZUljb24gfTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvbWluZXNBbmRUaXBzLnRzIiwiaW1wb3J0IHsgR2FtZSwgUGxheWVyIH0gZnJvbSAnLi9kYXRhJztcclxuaW1wb3J0IHsgZGVmaW5lU3Vycm91bmRpbmcgfSBmcm9tICcuL3RhYmxlR3JpZCc7XHJcblxyXG5cclxuLy8jcmVnaW9uIC0gc3RvcENsaWNrKCkgLSBzdG9waXJhIGV2ZW50TElzdGVuZXIgbmEgZWxlbWVudHUga29qaSBqZSBrbGlrbnV0XHJcbmNvbnN0IHN0b3BDbGljayA9IChldmVudDogYW55KSA9PiB7XHJcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxufTtcclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLz09PT09PT09PT09PT09PT09PT09PUVNUFRZIEZMT1c9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyNyZWdpb24gLSBvcGVuRW1wdHlFbGVtZW50KCkgLSBmbG93IGZ1bmN0aW9uXHJcblxyXG5sZXQgb3BlbkVtcHR5RWxlbWVudCA9IChlbGVtZW50OiBIVE1MVGFibGVEYXRhQ2VsbEVsZW1lbnQpID0+IHtcclxuICAgIGxldCBlbXB0eUZpZWxkcyA9IGZpcnN0RW1wdHlGaWVsZENoZWNrKGVsZW1lbnQpO1xyXG4gICAgbGV0IHN0b3BTZWFyY2ggPSBmYWxzZTtcclxuICAgIHdoaWxlIChzdG9wU2VhcmNoID09IGZhbHNlKSB7XHJcbiAgICAgICAgaWYgKGVtcHR5RmllbGRzLmxlbmd0aCAhPSAwKSB7XHJcbiAgICAgICAgICAgIGxldCBuZXdNYWluQXJyYXk6IGFueVtdID0gW107XHJcblxyXG4gICAgICAgICAgICBlbXB0eUZpZWxkcy5mb3JFYWNoKGZpZWxkID0+IHtcclxuICAgICAgICAgICAgICAgIGVtcHR5Q2VsbChmaWVsZCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3ViQXJyYXkgPSBkZWZpbmVTdXJyb3VuZGluZyhHYW1lLmdldEluc3RhbmNlKCkuZ2V0R2FtZVRhYmxlKCksIGZpZWxkKTtcclxuICAgICAgICAgICAgICAgIHN1YkFycmF5LmZvckVhY2goKGVsZW1lbnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbWVudCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShcImRhdGEtY2xpY2tcIiwgXCIxXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzdG9wQ2xpY2spO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgc3RvcENsaWNrKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5ld01haW5BcnJheS5pbmRleE9mKGVsZW1lbnQpICE9PSAtMSkgeyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgeyBuZXdNYWluQXJyYXkucHVzaChlbGVtZW50KSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb250ZXh0ID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWlkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29udGV4dCA9PT0gJycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVtcHR5Q2VsbCg8YW55PmVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBuZXdNYWluQXJyYXkgPSBjaGVja0VtcHR5RmllbGRzKG5ld01haW5BcnJheSk7XHJcbiAgICAgICAgICAgICAgICBlbXB0eUZpZWxkcyA9IG5ld01haW5BcnJheTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHN0b3BTZWFyY2ggPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHN0b3BTZWFyY2ggPSB0cnVlO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcblxyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vI3JlZ2lvbiAtIGVtcHR5Q2VsbCgpXHJcbmNvbnN0IGVtcHR5Q2VsbCA9IChlbGVtZW50OiBIVE1MVGFibGVEYXRhQ2VsbEVsZW1lbnQpOiB2b2lkID0+IHtcclxuICAgIGlmIChlbGVtZW50ICE9PSBudWxsKSB7XHJcbiAgICAgICAgZWxlbWVudC5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKFwiZGF0YS1lbXB0eVwiLCBcIlwiKTtcclxuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJlbXB0eVwiKTtcclxuICAgIH1cclxufVxyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vI3JlZ2lvbiAtIGNoZWNrRW1wdHlGaWVsZHMoKSAtIGNoZWNrIGVtcHR5IGZpZWxkcyBpZiBpdCBpcyB0b3RhbGx5IGVtcHR5IG9yIGl0cyBhIHRpcFxyXG5jb25zdCBjaGVja0VtcHR5RmllbGRzID0gKGZpZWxkczogYW55KSA9PiB7XHJcbiAgICBsZXQgY2hlY2tlZEVtcHR5RmllbGRzOiBIVE1MVGFibGVEYXRhQ2VsbEVsZW1lbnRbXSA9IFtdO1xyXG4gICAgZmllbGRzLmZvckVhY2goZmllbGQgPT4ge1xyXG4gICAgICAgIGlmIChmaWVsZCA9PT0gbnVsbCkgeyB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGZpZWxkLnNldEF0dHJpYnV0ZShcImRhdGEtY2xpY2tcIiwgXCIxXCIpOy8vc2V0IGZpZWxkIGFzIGNsaWNrZWRcclxuICAgICAgICAgICAgZmllbGQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHN0b3BDbGljayk7Ly91a2RpZGEgZXZlbnRcclxuICAgICAgICAgICAgZmllbGQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBzdG9wQ2xpY2spOy8vdWtpZGEgZXZlbnRcclxuICAgICAgICAgICAgY29uc3QgaXNFbXB0eSA9IGZpZWxkLmdldEF0dHJpYnV0ZShcImRhdGEtZW1wdHlcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbnRleHQgPSBmaWVsZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLW1pbmVcIik7XHJcbiAgICAgICAgICAgIGlmIChpc0VtcHR5ID09PSBcIjFcIikgey8vIGlmIGZpZWxkIGlzIHRvdGFsbHkgZW1wdHlcclxuICAgICAgICAgICAgICAgIGNoZWNrZWRFbXB0eUZpZWxkcy5wdXNoKGZpZWxkKTtcclxuICAgICAgICAgICAgICAgIGZpZWxkLmNsYXNzTGlzdC5hZGQoXCJlbXB0eVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHsgZmllbGQudGV4dENvbnRlbnQgPSBjb250ZXh0OyBmaWVsZC5jbGFzc0xpc3QuYWRkKCdjbGlja2VkJyk7IH0vLyBpZiBpdHMgdGlwLCBzaG93IGl0XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gY2hlY2tlZEVtcHR5RmllbGRzOyAvLyByZXR1cm5pbmcgYXJyYXkgb2YgdG90YWxseSBlbXB0eSBmaWVsZHNcclxufVxyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vI3JlZ2lvbiAtIGZpcnN0RW1wdHlGaWVsZENoZWNrKCkgLSBmaXJzdCBjbGlja2VkIGVtcHR5IGVsZW1lbnQgY2hlY2ssIHJldHVybnMgYXJyYXkgb2YgZW1wdHkgYmxhbmsgZWxlbWVudHNcclxuY29uc3QgZmlyc3RFbXB0eUZpZWxkQ2hlY2sgPSAoZmllbGQ6IEhUTUxUYWJsZURhdGFDZWxsRWxlbWVudCkgPT4gey8vY2hlY2tpbmcgZmlyc3QgZW1wdHkgY2xpY2tlZCBmaWVsZFxyXG4gICAgZmllbGQuc2V0QXR0cmlidXRlKFwiZGF0YS1jbGlja1wiLCBcIjFcIik7IC8vIHNldCBjbGlja2VkXHJcbiAgICBmaWVsZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc3RvcENsaWNrKTsvL3N0b3BpcmEgZXZlbnQgY2xpY2tcclxuICAgIGZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgc3RvcENsaWNrKTsgLy8gc3RvcGlyYSBldmVudCBtb3VzZWRvd25cclxuICAgIGVtcHR5Q2VsbChmaWVsZCk7IC8vIHJlbW92ZSBlbXB0eSBhdHRyaWJ1dGUsIGNvbG9yIGZpZWxkXHJcblxyXG4gICAgY29uc3Qgc3Vycm91bmRGaWVsZHMgPSBkZWZpbmVTdXJyb3VuZGluZyhHYW1lLmdldEluc3RhbmNlKCkuZ2V0R2FtZVRhYmxlKCksIGZpZWxkKTsvL2tyZWlyYSBuaXogc3VzZWRuaWggcG9samFcclxuICAgIGNvbnN0IGVtcHR5RmllbGRzID0gY2hlY2tFbXB0eUZpZWxkcyhzdXJyb3VuZEZpZWxkcyk7XHJcbiAgICByZXR1cm4gZW1wdHlGaWVsZHM7XHJcbn1cclxuLy8jZW5kcmVnaW9uXHJcbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbmV4cG9ydCB7IG9wZW5FbXB0eUVsZW1lbnQsIHN0b3BDbGljayB9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9lbXB0eUZsb3cudHMiLCJsZXQgdGltZXIgPSB7XHJcbiAgICB0aW1lOiB7XHJcbiAgICAgICAgaG91cnM6IDAsXHJcbiAgICAgICAgbWludXRlczogMCxcclxuICAgICAgICBzZWNvbmRzOiAwXHJcbiAgICB9LFxyXG4gICAgaW50ZXJ2YWw6IDEsXHJcbiAgICB0aW1lSW5jcmVtZW50OiAoKSA9PiB7XHJcbiAgICAgICAgaWYgKHRpbWVyLnRpbWUuc2Vjb25kcyA8IDU5KSB7IHRpbWVyLnRpbWUuc2Vjb25kcysrIH1cclxuICAgICAgICBlbHNlIGlmICh0aW1lci50aW1lLnNlY29uZHMgPT09IDU5ICYmIHRpbWVyLnRpbWUubWludXRlcyA8IDU5KSB7IHRpbWVyLnRpbWUuc2Vjb25kcyA9IDAsIHRpbWVyLnRpbWUubWludXRlcysrIH1cclxuICAgICAgICBlbHNlIGlmICh0aW1lci50aW1lLnNlY29uZHMgPT09IDU5ICYmIHRpbWVyLnRpbWUubWludXRlcyA9PT0gNTkpIHsgdGltZXIudGltZS5zZWNvbmRzID0gMCwgdGltZXIudGltZS5taW51dGVzID0gMCwgdGltZXIudGltZS5ob3VycysrIH1cclxuICAgIH1cclxufTtcclxuXHJcblxyXG5sZXQgY2FsY1Njb3JlID0gKCk6IG51bWJlciA9PiB7XHJcbiAgICByZXR1cm4gdGltZXIudGltZS5zZWNvbmRzICsgKHRpbWVyLnRpbWUubWludXRlcyAqIDYwKSArICh0aW1lci50aW1lLmhvdXJzICogMzYwKTtcclxufTtcclxuXHJcblxyXG5sZXQgZ2V0U3RyaW5nVGltZSA9ICgpID0+IHtcclxuICAgIGxldCBwcmV2VGltZSA9IFt0aW1lci50aW1lLmhvdXJzLCB0aW1lci50aW1lLm1pbnV0ZXMsIHRpbWVyLnRpbWUuc2Vjb25kc107XHJcbiAgICBsZXQgY3VyclRpbWUgPSBwcmV2VGltZS5tYXAoKHRpbWVFbGVtZW50KSA9PiB7IGlmICh0aW1lRWxlbWVudCA8IDEwKSB7IHJldHVybiBcIjBcIiArIHRpbWVFbGVtZW50IH0gZWxzZSB7IHJldHVybiB0aW1lRWxlbWVudCB9IH0pO1xyXG4gICAgcmV0dXJuIGAke2N1cnJUaW1lWzBdfSA6ICR7Y3VyclRpbWVbMV19IDogJHtjdXJyVGltZVsyXX1gO1xyXG59O1xyXG5cclxubGV0IHN0YXJ0VGltZXIgPSAoc3RlcCA9IDEpOiB2b2lkID0+IHtcclxuICAgIHRpbWVyLmludGVydmFsID0gc2V0SW50ZXJ2YWwodGltZXIudGltZUluY3JlbWVudCwgc3RlcCAqIDEwMDApO1xyXG59O1xyXG5cclxubGV0IHN0b3BUaW1lciA9ICgpOiB2b2lkID0+IHtcclxuICAgIGNsZWFySW50ZXJ2YWwodGltZXIuaW50ZXJ2YWwpO1xyXG59O1xyXG5cclxubGV0IHJlc2V0VGltZXIgPSAoKSA9PiB7XHJcbiAgICBmb3IgKGxldCBlbGVtZW50IGluIHRpbWVyLnRpbWUpIHsgdGltZXIudGltZVtlbGVtZW50XSA9IDAgfTtcclxufVxyXG5cclxubGV0IHN0cmluZ0ludGVydmFsID0gMDsgLy8gc2F2aW5nIGludGVydmFsIG51bSBmb3Igc3RyaW5nIHByaW50XHJcbmNvbnN0IHRpbWVyUGxhY2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGltZXItcGxhY2UnKTtcclxuXHJcbmxldCBzdGFydFRpbWVySGFuZGxlciA9ICgpID0+IHtcclxuICAgIHN0YXJ0VGltZXIoKTtcclxuICAgIHN0cmluZ0ludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4geyB0aW1lclBsYWNlLnRleHRDb250ZW50ID0gZ2V0U3RyaW5nVGltZSgpIH0sIDEwMCk7XHJcbn07XHJcblxyXG5sZXQgc3RvcFRpbWVySGFuZGxlciA9ICgpID0+IHtcclxuICAgIHN0b3BUaW1lcigpO1xyXG4gICAgY2xlYXJJbnRlcnZhbChzdHJpbmdJbnRlcnZhbCk7XHJcbn07XHJcblxyXG5cclxuZXhwb3J0IHsgc3RhcnRUaW1lckhhbmRsZXIsIHN0b3BUaW1lciwgcmVzZXRUaW1lciwgZ2V0U3RyaW5nVGltZSwgdGltZXJQbGFjZSwgc3RvcFRpbWVySGFuZGxlciwgY2FsY1Njb3JlIH07XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC90aW1lci50cyIsImltcG9ydCB7IFBsYXllciB9IGZyb20gJy4vZGF0YSc7XHJcbmltcG9ydCB7IGNhbGNTY29yZSB9IGZyb20gJy4vdGltZXInO1xyXG5cclxuLy8jcmVnaW9uIC0gc2VsZWN0b3JzXHJcbmNvbnN0IHJhbmtpbmdHYW1lTW9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lLW1vZGUtbmFtZScpO1xyXG5jb25zdCBzY29yZUxpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2NvcmUtbGlzdCcpO1xyXG5cclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLyNyZWdpb24gLSByYW5raW5nVGFibGUgZGVmaW5pdGlvblxyXG5sZXQgcmFua2luZ1RhYmxlOiB7fSA9IHtcclxuICAgIGJlZ2lubmVyOiBbWydKb2huJywgMjVdLCBbJ01hcnJ5JywgMjZdLCBbJ1RpbScsIDI5XSwgWydBbGV4JywgMzVdLCBbJ09saXZpYScsIDQwXV0sXHJcbiAgICBpbnRlcm1lZGlhdGU6IFtbJ1NhbScsIDQ0XSwgWydFbWlseScsIDQ2XSwgWydKaW0nLCA1MF0sIFsnQ2hhcmxvdHRlJywgNTNdLCBbJ1dpbGx5JywgNTVdXSxcclxuICAgIGV4cGVydDogW1snTWFyaWEnLCA1OF0sIFsnS2l0JywgNjZdLCBbJ1RvbnknLCA3MF0sIFsnWm9leScsIDc1XSwgW1wiTmF0YWxpZVwiLCA4MF1dXHJcbn07XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uIC0gcHJlc2V0U3RvcmFnZSgpIC0gY2hlY2tzIGlmIHRoZXJlJ3MgZGF0YWJhc2UgaW4gbG9jYWxzdG9yYWdlIGlmIG5vdCBjcmVhdGVzIG9uZSwgb3RoZXJ3aXNlIGxvYWRzIGl0LlxyXG5jb25zdCBwcmVzZXRTdG9yYWdlID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdyYW5raW5nVGFibGUnKSA9PT0gbnVsbCkge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdyYW5raW5nVGFibGUnLCBKU09OLnN0cmluZ2lmeShyYW5raW5nVGFibGUpKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhgZGF0YWJhc2UgZmV0Y2hlZCBmcm9tIGxvY2Fsc3RvcmFnZWAsIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdyYW5raW5nVGFibGUnKSk7Ly8gZm9yIGRldiBwdXJwb3NlXHJcbiAgICB9XHJcbn07XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxucHJlc2V0U3RvcmFnZSgpO1xyXG5cclxuLy8jcmVnaW9uIC0gc2F2ZURhdGEoKSAtIHNhdmVzIGRhdGFcclxuY29uc3Qgc2F2ZURhdGEgPSAoKSA9PiB7XHJcbiAgICBsZXQgc3RvcmFnZURhdGEgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdyYW5raW5nVGFibGUnKSk7XHJcbiAgICBsZXQgZ2FtZU1vZGUgPSBQbGF5ZXIuZ2V0SW5zdGFuY2UoKS5nZXRHYW1lTW9kZSgpO1xyXG4gICAgbGV0IGN1cnJlbnRNb2RlVGFibGUgPSBzdG9yYWdlRGF0YVtnYW1lTW9kZV07XHJcbiAgICBjdXJyZW50TW9kZVRhYmxlID0gc2NvcmVWYWxpZGF0aW9uKGN1cnJlbnRNb2RlVGFibGUpO1xyXG4gICAgY3VycmVudE1vZGVUYWJsZS5zb3J0KChhLCBiKSA9PiB7IHJldHVybiBhWzFdIC0gYlsxXSB9KTtcclxuICAgIGZvciAoY3VycmVudE1vZGVUYWJsZS5sZW5ndGg7IGN1cnJlbnRNb2RlVGFibGUubGVuZ3RoID4gNTspIHtcclxuICAgICAgICBjdXJyZW50TW9kZVRhYmxlLnBvcCgpO1xyXG4gICAgfVxyXG4gICAgc3RvcmFnZURhdGFbZ2FtZU1vZGVdID0gY3VycmVudE1vZGVUYWJsZTtcclxuICAgIGxldCBuZXdEYXRhID0gSlNPTi5zdHJpbmdpZnkoc3RvcmFnZURhdGEpO1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3JhbmtpbmdUYWJsZScsIG5ld0RhdGEpO1xyXG4gICAgcmFua2luZ1RhYmxlID0gc3RvcmFnZURhdGE7XHJcbn07XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uIC0gc2NvcmVWYWxpZGF0aW9uICgpIC0gdmFsaWRhdGVzIGlmIHNjb3JlIGlzIG5vdCBlcXVhbCB0byAwXHJcbmNvbnN0IHNjb3JlVmFsaWRhdGlvbiA9ICh0YWJsZTogKHN0cmluZyB8IG51bWJlcilbXVtdKSA9PiB7XHJcbiAgICBsZXQgbmV3VGFibGUgPSB0YWJsZTtcclxuICAgIGNvbnN0IHBsYXllclNjb3JlID0gW1BsYXllci5nZXRJbnN0YW5jZSgpLmdldE5hbWUoKSwgUGxheWVyLmdldEluc3RhbmNlKCkuZ2V0U2NvcmUoKV07XHJcbiAgICBpZiAocGxheWVyU2NvcmVbMV0gIT09IDAgJiYgcGxheWVyU2NvcmVbMV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIG5ld1RhYmxlLnB1c2gocGxheWVyU2NvcmUpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5ld1RhYmxlO1xyXG59O1xyXG4vLyNlbmRyZWdpb25cclxuXHJcblxyXG4vLyNyZWdpb24gLSB3cml0ZURhdGEoKSAtIHByaW50cyBvdXQgcmFua2luZyB0YWJsZVxyXG5sZXQgcHJpbnREYXRhID0gKCkgPT4ge1xyXG4gICAgbGV0IHRhYmxlID0gcmFua2luZ1RhYmxlW1BsYXllci5nZXRJbnN0YW5jZSgpLmdldEdhbWVNb2RlKCldO1xyXG4gICAgcmFua2luZ0dhbWVNb2RlLnRleHRDb250ZW50ID0gUGxheWVyLmdldEluc3RhbmNlKCkuZ2V0R2FtZU1vZGUoKSArICcgbW9kZSc7XHJcbiAgICBzY29yZUxpc3QuaW5uZXJIVE1MID0gJyc7XHJcbiAgICB0YWJsZS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgIGxldCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcbiAgICAgICAgbGkudGV4dENvbnRlbnQgPSBgJHtlbGVtZW50WzBdfSAtICR7ZWxlbWVudFsxXX1gO1xyXG4gICAgICAgIHNjb3JlTGlzdC5hcHBlbmRDaGlsZChsaSk7XHJcbiAgICB9KTtcclxufTtcclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLyNyZWdpb24gLSBoYW5kbGVSYW5raW5nKCkgLSBvbmUgdG8gcnVsZSB0aGVtIGFsbFxyXG5jb25zdCBoYW5kbGVSYW5raW5nID0gKCkgPT4ge1xyXG4gICAgc2F2ZURhdGEoKTtcclxuICAgIHByaW50RGF0YSgpO1xyXG59O1xyXG4vLyNlbmRyZWdpb25cclxuXHJcbmV4cG9ydCB7IGhhbmRsZVJhbmtpbmcgfTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3JhbmtpbmcudHMiLCJpbXBvcnQgeyBHYW1lLCBnYW1lU2VjdGlvbiB9IGZyb20gJy4vZGF0YSc7XHJcblxyXG4vLyNyZWdpb24gLSBET00gc2VsZWN0b3JzXHJcbmNvbnN0IGFib3V0R2FtZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhYm91dC1nYW1lLWJ1dHRvbicpO1xyXG5jb25zdCBnYW1lQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWUtYnV0dG9uJyk7XHJcbmNvbnN0IGdhbWVSdWxlc0J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lLXJ1bGVzLWJ1dHRvbicpO1xyXG5cclxuY29uc3Qgd2VsY29tZVNjcmVlbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3ZWxjb21lLXNjcmVlbicpO1xyXG5jb25zdCBnYW1lUnVsZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZS1ydWxlcycpO1xyXG5jb25zdCBhYm91dEdhbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWJvdXQtZ2FtZScpO1xyXG5jb25zdCBnYW1lR3JpZFNlY3Rpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZScpO1xyXG5jb25zdCBib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJib2R5XCIpO1xyXG4vLyNlbmRyZWdpb25cclxuXHJcblxyXG5jb25zdCBib29tID0gKCkgPT4ge1xyXG4gICAgbGV0IGltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICBpbWFnZS5zZXRBdHRyaWJ1dGUoJ3NyYycsICcuL2ltYWdlcy9ib29tLnBuZycpO1xyXG4gICAgaW1hZ2UuY2xhc3NMaXN0LmFkZCgnYmlnLWJvb20nKTtcclxuICAgIGJvZHkuYXBwZW5kQ2hpbGQoaW1hZ2UpO1xyXG59O1xyXG5cclxuY29uc3QgZ2FtZU92ZXIgPSAoKSA9PiB7XHJcbiAgICBsZXQgaW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgIGltYWdlLnNldEF0dHJpYnV0ZSgnc3JjJywgJy4vaW1hZ2VzL2dhbWVvdmVyLnBuZycpO1xyXG4gICAgaW1hZ2UuY2xhc3NMaXN0LmFkZCgnZ2FtZS1vdmVyJyk7XHJcbiAgICBnYW1lR3JpZFNlY3Rpb24uYXBwZW5kQ2hpbGQoaW1hZ2UpO1xyXG59O1xyXG5cclxuY29uc3Qgd2luID0gKCkgPT4ge1xyXG4gICAgbGV0IGltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICBpbWFnZS5zZXRBdHRyaWJ1dGUoJ3NyYycsICcuL2ltYWdlcy93aW4ucG5nJyk7XHJcbiAgICBpbWFnZS5jbGFzc0xpc3QuYWRkKCd3aW4nKTtcclxuICAgIGdhbWVHcmlkU2VjdGlvbi5hcHBlbmRDaGlsZChpbWFnZSk7XHJcbn07XHJcblxyXG4vLyNyZWdpb24gLSBoZWFkZXIgbmF2XHJcblxyXG5jb25zdCBhYm91dEdhbWVTaG93ID0gKCkgPT4ge1xyXG4gICAgd2VsY29tZVNjcmVlbi5jbGFzc0xpc3QuYWRkKCdyZW1vdmUnKTtcclxuICAgIGdhbWVHcmlkU2VjdGlvbi5jbGFzc0xpc3QuYWRkKCdyZW1vdmUnKTtcclxuICAgIGdhbWVSdWxlcy5jbGFzc0xpc3QuYWRkKCdyZW1vdmUnKTtcclxuICAgIGFib3V0R2FtZS5jbGFzc0xpc3QucmVtb3ZlKCdyZW1vdmUnKTtcclxufTtcclxuXHJcbmNvbnN0IGdhbWVSdWxlc1Nob3cgPSAoKSA9PiB7XHJcbiAgICB3ZWxjb21lU2NyZWVuLmNsYXNzTGlzdC5hZGQoJ3JlbW92ZScpO1xyXG4gICAgZ2FtZUdyaWRTZWN0aW9uLmNsYXNzTGlzdC5hZGQoJ3JlbW92ZScpO1xyXG4gICAgZ2FtZVJ1bGVzLmNsYXNzTGlzdC5yZW1vdmUoJ3JlbW92ZScpO1xyXG4gICAgYWJvdXRHYW1lLmNsYXNzTGlzdC5hZGQoJ3JlbW92ZScpO1xyXG59O1xyXG5cclxuY29uc3QgZ2FtZVNob3cgPSAoKSA9PiB7XHJcbiAgICB3ZWxjb21lU2NyZWVuLmNsYXNzTGlzdC5hZGQoJ3JlbW92ZScpO1xyXG4gICAgZ2FtZUdyaWRTZWN0aW9uLmNsYXNzTGlzdC5yZW1vdmUoJ3JlbW92ZScpO1xyXG4gICAgZ2FtZVJ1bGVzLmNsYXNzTGlzdC5hZGQoJ3JlbW92ZScpO1xyXG4gICAgYWJvdXRHYW1lLmNsYXNzTGlzdC5hZGQoJ3JlbW92ZScpO1xyXG59O1xyXG5cclxuYWJvdXRHYW1lQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYWJvdXRHYW1lU2hvdyk7XHJcbmdhbWVSdWxlc0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGdhbWVSdWxlc1Nob3cpO1xyXG5nYW1lQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZ2FtZVNob3cpO1xyXG5cclxuLy8jZW5kcmVnaW9uXHJcblxyXG5cclxuZXhwb3J0IHsgYm9vbSwgZ2FtZU92ZXIsIHdpbiwgZ2FtZVNob3csIGdhbWVHcmlkU2VjdGlvbiB9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9hbmltYXRpb24udHMiXSwic291cmNlUm9vdCI6IiJ9