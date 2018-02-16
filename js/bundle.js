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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Game; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Player; });
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
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__data__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__gameMode__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tableGrid__ = __webpack_require__(3);



//#region - selectors
const gameStartButton = document.getElementById('start');
const gameResetButton = document.getElementById('reset');
const playerNameInput = document.getElementById('username');
const gameSection = document.getElementById('game');
//#endregion
playerNameInput.value = "";
//#region - testing func
const onClick = (event) => {
    if (event.target.id === "start") {
        __WEBPACK_IMPORTED_MODULE_0__data__["b" /* Player */].getInstance().setName(playerNameInput.value);
        Object(__WEBPACK_IMPORTED_MODULE_2__tableGrid__["a" /* createGrid */])(Object(__WEBPACK_IMPORTED_MODULE_1__gameMode__["a" /* gameMode */])(__WEBPACK_IMPORTED_MODULE_1__gameMode__["b" /* gameModeInput */].value));
        gameSection.appendChild(__WEBPACK_IMPORTED_MODULE_0__data__["a" /* Game */].getInstance().getGameTable());
        playerNameInput.setAttribute('disabled', 'true');
        __WEBPACK_IMPORTED_MODULE_1__gameMode__["b" /* gameModeInput */].setAttribute('disabled', 'true');
        gameStartButton.setAttribute('disabled', 'true');
        gameResetButton.removeAttribute('disabled');
    }
    else if (event.target.id === "reset") {
        gameResetButton.setAttribute('disabled', 'true');
        gameStartButton.removeAttribute('disabled');
        __WEBPACK_IMPORTED_MODULE_1__gameMode__["b" /* gameModeInput */].removeAttribute('disabled');
        __WEBPACK_IMPORTED_MODULE_1__gameMode__["b" /* gameModeInput */].value = 'beginner';
        playerNameInput.removeAttribute('disabled');
        playerNameInput.value = "";
        gameSection.innerHTML = "";
    }
};
//#endregion
//#region - event listeners
gameStartButton.addEventListener('click', onClick);
gameResetButton.addEventListener('click', onClick);
// 
//#endregion


/***/ }),
/* 2 */
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
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return createGrid; });
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



/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOWZiMGFiZDRiYmRhOWM2ZTc0ZmEiLCJ3ZWJwYWNrOi8vLy4vYXBwL2RhdGEudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2FwcC50cyIsIndlYnBhY2s6Ly8vLi9hcHAvZ2FtZU1vZGUudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3RhYmxlR3JpZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7OztBQzdEQTtBQUFBLDJDQUEyQztBQUMzQztJQWFJO1FBVFEsVUFBSyxHQUFHO1lBQ1osUUFBUSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDcEIsWUFBWSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7WUFDMUIsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7WUFDcEIsTUFBTSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDcEIsQ0FBQztRQUtFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxvQ0FBb0MsQ0FBQztRQUFDLENBQUM7UUFDN0UsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7SUFDMUIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxXQUFXO1FBQ3JCLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFFTSxRQUFRLENBQUMsUUFBZ0I7UUFDNUIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVNLGFBQWEsQ0FBQyxJQUFjO1FBQy9CLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUN6QixPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVNLFlBQVksQ0FBRSxPQUFPO1FBQ3hCLElBQUksQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDO1FBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVNLFlBQVk7UUFDZixNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUMzQixDQUFDOztBQXBDYyxjQUFTLEdBQVMsSUFBSSxJQUFJLEVBQUUsQ0FBQztBQXNDaEQsWUFBWTtBQUVaLCtDQUErQztBQUMvQztJQU1JO1FBSFEsVUFBSyxHQUFXLEVBQUUsQ0FBQztRQUNuQixjQUFTLEdBQVcsTUFBTSxDQUFDO1FBRy9CLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxzQ0FBc0MsQ0FBQztRQUFDLENBQUM7UUFDakYsTUFBTSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7SUFDNUIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxXQUFXO1FBQ3JCLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO0lBQzVCLENBQUM7SUFDRCxPQUFPO1FBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDdEIsQ0FBQztJQUNELE9BQU8sQ0FBQyxLQUFhO1FBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNyRCxDQUFDO0lBRUQsV0FBVztRQUNQLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFFRCxXQUFXLENBQUMsS0FBYTtRQUNyQixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztJQUMzQixDQUFDOztBQTFCYyxnQkFBUyxHQUFXLElBQUksTUFBTSxFQUFFLENBQUM7QUE0QnBELFlBQVk7QUFFVTs7Ozs7Ozs7Ozs7O0FDNUVnQjtBQUNlO0FBQ2Q7QUFFdkMscUJBQXFCO0FBQ3JCLE1BQU0sZUFBZSxHQUFzQixRQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzVFLE1BQU0sZUFBZSxHQUFzQixRQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzVFLE1BQU0sZUFBZSxHQUFxQixRQUFRLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBRTlFLE1BQU0sV0FBVyxHQUFnQixRQUFRLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ2pFLFlBQVk7QUFFWixlQUFlLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUUzQix3QkFBd0I7QUFDeEIsTUFBTSxPQUFPLEdBQUcsQ0FBQyxLQUFLLEVBQVEsRUFBRTtJQUU1QixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQzlCLHFEQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwRCxzRUFBVSxDQUFDLG1FQUFRLENBQUMsZ0VBQWEsQ0FBQyxLQUFLLENBQWEsQ0FBQyxDQUFDO1FBQ3RELFdBQVcsQ0FBQyxXQUFXLENBQUMsbURBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO1FBQzNELGVBQWUsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ2pELGdFQUFhLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUMvQyxlQUFlLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNqRCxlQUFlLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFDRCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNuQyxlQUFlLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNqRCxlQUFlLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzVDLGdFQUFhLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzFDLGdFQUFhLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQztRQUNqQyxlQUFlLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzVDLGVBQWUsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQzNCLFdBQVcsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBQy9CLENBQUM7QUFDTCxDQUFDLENBQUM7QUFDRixZQUFZO0FBRVosMkJBQTJCO0FBQzNCLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDbkQsZUFBZSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNuRCxHQUFHO0FBQ0gsWUFBWTs7Ozs7Ozs7Ozs7QUMxQzBCO0FBRXRDLHFCQUFxQjtBQUNyQixNQUFNLGVBQWUsR0FBcUIsUUFBUSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUNoRixNQUFNLGVBQWUsR0FBcUIsUUFBUSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUNoRixNQUFNLGdCQUFnQixHQUFxQixRQUFRLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQ2xGLE1BQU0sYUFBYSxHQUFzQixRQUFRLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQzdFLE1BQU0saUJBQWlCLEdBQWdCLFFBQVEsQ0FBQyxjQUFjLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUNwRixZQUFZO0FBRVoscUVBQXFFO0FBQ3JFLE1BQU0sY0FBYyxHQUFHLEdBQUcsRUFBRTtJQUN4QixJQUFJLFdBQVcsR0FBRztRQUNkLFFBQVEsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDO1FBQy9CLFFBQVEsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDO1FBQy9CLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUM7S0FDbkMsQ0FBQztJQUNGLE1BQU0sQ0FBQyxXQUFXLENBQUM7QUFDdkIsQ0FBQztBQUNELFlBQVk7QUFFWiw2RkFBNkY7QUFDN0YsSUFBSSx3QkFBd0IsR0FBRyxHQUFTLEVBQUU7SUFDdEMsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLEtBQUssS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ25DLGlCQUFrQixDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQUMsaUJBQWtCLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUFDLENBQUM7QUFDMUQsQ0FBQyxDQUFDO0FBQ0YsWUFBWTtBQUVaLHVFQUF1RTtBQUN2RSxNQUFNLHFCQUFxQixHQUFHLENBQUMsUUFBa0IsRUFBRSxFQUFFO0lBQ2pELEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzQyxLQUFLLENBQUMsbUNBQW1DLENBQUMsQ0FBQztRQUMzQyxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO0FBQ2xCLENBQUMsQ0FBQztBQUNGLFlBQVk7QUFFWiwyQ0FBMkM7QUFDM0MsTUFBTSxRQUFRLEdBQUcsQ0FBQyxJQUFZLEVBQXFCLEVBQUU7SUFDakQsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNYLEtBQUssVUFBVTtZQUNYLE9BQU8sQ0FBQyxHQUFHLENBQUMsNkNBQTZDLENBQUMsQ0FBQztZQUMzRCxxREFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2QyxNQUFNLENBQUMsbURBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0MsS0FBSyxjQUFjO1lBQ2YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtREFBbUQsQ0FBQyxDQUFDO1lBQ2pFLHFEQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3ZDLE1BQU0sQ0FBQyxtREFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QyxLQUFLLFFBQVE7WUFDVCxPQUFPLENBQUMsR0FBRyxDQUFDLDZDQUE2QyxDQUFDLENBQUM7WUFDM0QscURBQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkMsTUFBTSxDQUFDLG1EQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdDLEtBQUssUUFBUTtZQUNULHFEQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3ZDLEVBQUUsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLGNBQWMsRUFBRSxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQztZQUFDLENBQUM7WUFDeEYsbURBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztZQUNuRCxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixtREFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxtREFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsZUFBZSxtREFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDNUssTUFBTSxDQUFDLG1EQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdDO1lBQ0ksRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLFlBQVksQ0FBQyxDQUFDLENBQUM7Z0JBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2dCQUFDLE1BQU0sQ0FBQyxRQUFRO1lBQUMsQ0FBQztZQUNqRixJQUFJLENBQUMsQ0FBQztnQkFDRixPQUFPLENBQUMsS0FBSyxDQUFDLHlDQUF5QyxDQUFDLENBQUM7Z0JBQ3pELE1BQU0sQ0FBQyxRQUFRLENBQUM7WUFDcEIsQ0FBQztJQUNULENBQUM7QUFDTCxDQUFDLENBQUM7QUFDRixZQUFZO0FBRVosNEJBQTRCO0FBQzVCLGFBQWEsQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDO0FBQ2pDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsd0JBQXdCLENBQUMsQ0FBQztBQUNuRSxZQUFZO0FBRXVCOzs7Ozs7Ozs7O0FDMUVHO0FBRXRDLHNHQUFzRztBQUV0RyxrREFBa0Q7QUFDbEQsTUFBTSxVQUFVLEdBQUcsQ0FBQyxXQUFxQixFQUFRLEVBQUU7SUFDL0MsSUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM1QyxJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUM7SUFDcEIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUN0QyxJQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDdEMsSUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2QyxHQUFHLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxXQUFXLEdBQUcsT0FBTyxDQUFDLENBQUM7WUFDOUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsV0FBVyxHQUFHLE9BQU8sQ0FBQyxDQUFDO1lBQ25ELEdBQUcsQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ2xDLEdBQUcsQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ25DLEdBQUcsQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ25DLFdBQVcsRUFBRSxDQUFDO1lBQ2QsR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN6QixDQUFDO1FBQ0QsS0FBSyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBQ0QsbURBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDM0MsQ0FBQyxDQUFDO0FBQ0YsWUFBWTtBQUdaLHNHQUFzRztBQUV0Ryw4Q0FBOEM7QUFDOUMsTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLFNBQWlCLEVBQUUsU0FBaUIsRUFBRSxFQUFFO0lBQzlELElBQUksZ0JBQWdCLEdBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNyQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUNyQyxJQUFJLFdBQVcsR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUM7UUFDbEQsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFDRCxNQUFNLENBQUMsZ0JBQWdCLENBQUM7QUFDNUIsQ0FBQztBQUNELFlBQVk7QUFFWiwrQ0FBK0M7QUFDL0MsTUFBTSxpQkFBaUIsR0FBRyxDQUFDLFNBQWlCLEVBQUUsU0FBaUIsRUFBRSxFQUFFO0lBQy9ELElBQUksaUJBQWlCLEdBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM5QyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUNyQyxJQUFJLFdBQVcsR0FBRyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUM7UUFDbkQsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFDRCxNQUFNLENBQUMsaUJBQWlCLENBQUM7QUFDN0IsQ0FBQztBQUNELFlBQVk7QUFHWixzR0FBc0c7QUFFdEcsMkZBQTJGO0FBRTNGLE1BQU0saUJBQWlCLEdBQUcsQ0FBQyxLQUFjLEVBQUUsT0FBb0IsRUFBRSxFQUFFO0lBQy9ELElBQUksV0FBVyxDQUFDO0lBQ2hCLE1BQU0sRUFBRSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDaEMsTUFBTSxZQUFZLEdBQUcsbURBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMscURBQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0lBQ3JGLE1BQU0sU0FBUyxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsQyxNQUFNLFNBQVMsR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFbEMsa0JBQWtCO0lBQ2xCLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMxRCxNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxHQUFHLFNBQVMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3hFLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLEdBQUcsU0FBUyxTQUFTLENBQUMsQ0FBQztJQUNoRSxNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxHQUFHLFNBQVMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3pFLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMzRCxNQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxHQUFHLFNBQVMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzNFLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLEdBQUcsU0FBUyxTQUFTLENBQUMsQ0FBQztJQUNsRSxNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxHQUFHLFNBQVMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBRTFFLGdCQUFnQjtJQUNoQixNQUFNLFVBQVUsR0FBRyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDMUQsTUFBTSxXQUFXLEdBQUcsaUJBQWlCLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBRTVELDZDQUE2QztJQUM3QyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoQyxXQUFXLEdBQUcsQ0FBQyxFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4QyxXQUFXLEdBQUcsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ0osV0FBVyxHQUFHLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ2hGLENBQUM7SUFDRCxNQUFNLENBQUMsV0FBVyxDQUFDO0FBQ3ZCLENBQUM7QUFDRCxZQUFZO0FBRVosc0dBQXNHO0FBR2pGIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDEpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDlmYjBhYmQ0YmJkYTljNmU3NGZhIiwiLy8jcmVnaW9uIC0gR2FtZSBzaW5nbGV0b24gY2xhc3MgZGVmaW5pdGlvblxyXG5jbGFzcyBHYW1lIHtcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IEdhbWUgPSBuZXcgR2FtZSgpO1xyXG5cclxuICAgIHByaXZhdGUgX21vZGUgPSB7XHJcbiAgICAgICAgYmVnaW5uZXI6IFs5LCA5LCAxMF0sXHJcbiAgICAgICAgaW50ZXJtZWRpYXRlOiBbMTYsIDE2LCA0MF0sXHJcbiAgICAgICAgZXhwZXJ0OiBbMTYsIDMwLCA5OV0sXHJcbiAgICAgICAgY3VzdG9tOiBbMCwgMCwgMF1cclxuICAgIH07XHJcblxyXG4gICAgcHJpdmF0ZSBfZ2FtZVRhYmxlOkhUTUxUYWJsZUVsZW1lbnQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgaWYgKEdhbWUuX2luc3RhbmNlKSB7IHRocm93IG5ldyBFcnJvcihcIkVycm9yLCB3cm9uZyB1c2Ugb2YgR2FtZSBpbnN0YW5jZSFcIikgfVxyXG4gICAgICAgIEdhbWUuX2luc3RhbmNlID0gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IEdhbWUge1xyXG4gICAgICAgIHJldHVybiBHYW1lLl9pbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbW9kZUluZm8obW9kZU5hbWU6IHN0cmluZyk6IG51bWJlcltdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbW9kZVttb2RlTmFtZV07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldEN1c3RvbU1vZGUoaW5mbzogbnVtYmVyW10pIHtcclxuICAgICAgICB0aGlzLl9tb2RlLmN1c3RvbSA9IGluZm87XHJcbiAgICAgICAgY29uc29sZS5sb2coYEN1c3RvbSBtb2RlIHNldCB0byAke3RoaXMuX21vZGUuY3VzdG9tfWApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRHYW1lVGFibGUgKGVsZW1lbnQpIHtcclxuICAgICAgICB0aGlzLl9nYW1lVGFibGUgPSBlbGVtZW50O1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGBUYWJsZSBjcmVhdGVkYCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEdhbWVUYWJsZSgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9nYW1lVGFibGU7XHJcbiAgICB9XHJcbn1cclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLyNyZWdpb24gLSBQbGF5ZXIgLSBzaW5nbGV0b24gY2xhc3MgZGVmaW5pdGlvblxyXG5jbGFzcyBQbGF5ZXIge1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogUGxheWVyID0gbmV3IFBsYXllcigpO1xyXG4gICAgcHJpdmF0ZSBfbmFtZTogc3RyaW5nID0gXCJcIjtcclxuICAgIHByaXZhdGUgX2dhbWVNb2RlOiBzdHJpbmcgPSBcIm5vbmVcIjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBpZiAoUGxheWVyLl9pbnN0YW5jZSkgeyB0aHJvdyBuZXcgRXJyb3IoXCJFcnJvciwgd3JvbmcgdXNlIG9mIFBsYXllciBpbnN0YW5jZSFcIikgfVxyXG4gICAgICAgIFBsYXllci5faW5zdGFuY2UgPSB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogUGxheWVyIHtcclxuICAgICAgICByZXR1cm4gUGxheWVyLl9pbnN0YW5jZTtcclxuICAgIH1cclxuICAgIGdldE5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbmFtZTtcclxuICAgIH1cclxuICAgIHNldE5hbWUodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX25hbWUgPSB2YWx1ZTtcclxuICAgICAgICBjb25zb2xlLmxvZyhgUGxheWVycyBuYW1lIHNldCB0bzogJHt0aGlzLl9uYW1lfWApXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0R2FtZU1vZGUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZ2FtZU1vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0R2FtZU1vZGUodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2dhbWVNb2RlID0gdmFsdWU7XHJcbiAgICB9XHJcbn1cclxuLy8jZW5kcmVnaW9uXHJcblxyXG5leHBvcnQge0dhbWUsIFBsYXllcn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL2RhdGEudHMiLCJpbXBvcnQgeyBHYW1lLCBQbGF5ZXIgfSBmcm9tICcuL2RhdGEnO1xyXG5pbXBvcnQgeyBnYW1lTW9kZSwgZ2FtZU1vZGVJbnB1dCB9IGZyb20gJy4vZ2FtZU1vZGUnO1xyXG5pbXBvcnQge2NyZWF0ZUdyaWR9IGZyb20gJy4vdGFibGVHcmlkJztcclxuXHJcbi8vI3JlZ2lvbiAtIHNlbGVjdG9yc1xyXG5jb25zdCBnYW1lU3RhcnRCdXR0b24gPSA8SFRNTEJ1dHRvbkVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXJ0Jyk7XHJcbmNvbnN0IGdhbWVSZXNldEJ1dHRvbiA9IDxIVE1MQnV0dG9uRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzZXQnKTtcclxuY29uc3QgcGxheWVyTmFtZUlucHV0ID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXJuYW1lJyk7XHJcblxyXG5jb25zdCBnYW1lU2VjdGlvbiA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZScpO1xyXG4vLyNlbmRyZWdpb25cclxuXHJcbnBsYXllck5hbWVJbnB1dC52YWx1ZSA9IFwiXCI7XHJcblxyXG4vLyNyZWdpb24gLSB0ZXN0aW5nIGZ1bmNcclxuY29uc3Qgb25DbGljayA9IChldmVudCk6IHZvaWQgPT4ge1xyXG5cclxuICAgIGlmIChldmVudC50YXJnZXQuaWQgPT09IFwic3RhcnRcIikge1xyXG4gICAgICAgIFBsYXllci5nZXRJbnN0YW5jZSgpLnNldE5hbWUocGxheWVyTmFtZUlucHV0LnZhbHVlKTtcclxuICAgICAgICBjcmVhdGVHcmlkKGdhbWVNb2RlKGdhbWVNb2RlSW5wdXQudmFsdWUpIGFzIG51bWJlcltdKTtcclxuICAgICAgICBnYW1lU2VjdGlvbi5hcHBlbmRDaGlsZChHYW1lLmdldEluc3RhbmNlKCkuZ2V0R2FtZVRhYmxlKCkpO1xyXG4gICAgICAgIHBsYXllck5hbWVJbnB1dC5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ3RydWUnKTtcclxuICAgICAgICBnYW1lTW9kZUlucHV0LnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAndHJ1ZScpO1xyXG4gICAgICAgIGdhbWVTdGFydEJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ3RydWUnKTtcclxuICAgICAgICBnYW1lUmVzZXRCdXR0b24ucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoZXZlbnQudGFyZ2V0LmlkID09PSBcInJlc2V0XCIpIHtcclxuICAgICAgICBnYW1lUmVzZXRCdXR0b24uc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICd0cnVlJyk7XHJcbiAgICAgICAgZ2FtZVN0YXJ0QnV0dG9uLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcclxuICAgICAgICBnYW1lTW9kZUlucHV0LnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcclxuICAgICAgICBnYW1lTW9kZUlucHV0LnZhbHVlID0gJ2JlZ2lubmVyJztcclxuICAgICAgICBwbGF5ZXJOYW1lSW5wdXQucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xyXG4gICAgICAgIHBsYXllck5hbWVJbnB1dC52YWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgZ2FtZVNlY3Rpb24uaW5uZXJIVE1MID0gXCJcIjtcclxuICAgIH1cclxufTtcclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLyNyZWdpb24gLSBldmVudCBsaXN0ZW5lcnNcclxuZ2FtZVN0YXJ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25DbGljayk7XHJcbmdhbWVSZXNldEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uQ2xpY2spO1xyXG4vLyBcclxuLy8jZW5kcmVnaW9uXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9hcHAudHMiLCJpbXBvcnQgeyBHYW1lLCBQbGF5ZXIgfSBmcm9tICcuL2RhdGEnO1xyXG5cclxuLy8jcmVnaW9uIC0gc2VsZWN0b3JzXHJcbmNvbnN0IGN1c3RvbVJvd3NJbnB1dCA9IDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjdXN0b21Sb3dzJyk7XHJcbmNvbnN0IGN1c3RvbUNvbHNJbnB1dCA9IDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjdXN0b21Db2xzJyk7XHJcbmNvbnN0IGN1c3RvbU1pbmVzSW5wdXQgPSA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3VzdG9tTWluZXMnKTtcclxuY29uc3QgZ2FtZU1vZGVJbnB1dCA9IDxIVE1MU2VsZWN0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZU1vZGUnKTtcclxuY29uc3QgY3VzdG9tTW9kZU9wdGlvbnMgPSA8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2N1c3RvbU1vZGVPcHRpb25zJyk7XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uIC0gZ2V0Q3VzdG9tUHJvcHMoKSAtIGdldHMgY3VzdG9tIHByb3BlcnRpZXMgZnJvbSB1c2VyIGlucHV0XHJcbmNvbnN0IGdldEN1c3RvbVByb3BzID0gKCkgPT4ge1xyXG4gICAgbGV0IGN1c3RvbVByb3BzID0gW1xyXG4gICAgICAgIHBhcnNlSW50KGN1c3RvbVJvd3NJbnB1dC52YWx1ZSksXHJcbiAgICAgICAgcGFyc2VJbnQoY3VzdG9tQ29sc0lucHV0LnZhbHVlKSxcclxuICAgICAgICBwYXJzZUludChjdXN0b21NaW5lc0lucHV0LnZhbHVlKSxcclxuICAgIF07XHJcbiAgICByZXR1cm4gY3VzdG9tUHJvcHM7XHJcbn1cclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLyNyZWdpb24gLSBkaXNwbGF5Q3VzdG9tTW9kZU9wdHMoKSAtIGhpZGVzIG9yIHNob3dzIGRpdiB3aXRoIGN1c3RvbSBnYW1lIG9wdGlvbnMgaW4gZG9jdW1lbnRcclxubGV0IGRpc3BsYXlDdXN0b21Nb2RlT3B0aW9ucyA9ICgpOiB2b2lkID0+IHtcclxuICAgIGlmIChnYW1lTW9kZUlucHV0LnZhbHVlID09PSBcImN1c3RvbVwiKSB7XHJcbiAgICAgICAgY3VzdG9tTW9kZU9wdGlvbnMhLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xyXG4gICAgfSBlbHNlIHsgY3VzdG9tTW9kZU9wdGlvbnMhLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpOyB9XHJcbn07XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uIC0gY3VzdG9tSW5wdXRWYWxpZGF0aW9uKCkgLSBjdXN0b20gZ2FtZSBtb2RlIGlucHV0IHZhbGlkYXRpb25cclxuY29uc3QgY3VzdG9tSW5wdXRWYWxpZGF0aW9uID0gKG1vZGVJbmZvOiBudW1iZXJbXSkgPT4gey8vZ2FtZSBtb2RlIGluZm8gW3Jvd3MsY29scyxtaW5lc11cclxuICAgIGlmIChtb2RlSW5mb1syXSA+PSBtb2RlSW5mb1swXSAqIG1vZGVJbmZvWzFdKSB7ICAvL251bSBvZiBtaW5lcyB2YWxpZGF0aW9uLGNhbid0IGJlIG1vcmUgbWluZXMgdGhhbiBmaWVsZHMgb3IgZXF1YWwgdG8gbnVtIG9mIGZpZWxkc1xyXG4gICAgICAgIGFsZXJ0KFwiQ2FuJ3QgaGF2ZSBtb3JlIG1pbmVzIHRoYW4gZmllbGRzXCIpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0gcmV0dXJuIHRydWU7XHJcbn07XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uIC0gZ2FtZU1vZGUoKSAtIGdhbWUgbW9kZSBzd2l0Y2hlclxyXG5jb25zdCBnYW1lTW9kZSA9IChtb2RlOiBzdHJpbmcpOiBudW1iZXJbXSB8IHN0cmluZyA9PiB7XHJcbiAgICBzd2l0Y2ggKG1vZGUpIHtcclxuICAgICAgICBjYXNlIFwiYmVnaW5uZXJcIjpcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJHYW1lIG1vZGU6IEJlZ2lubmVyIDl4OSB0YWJsZSB3aXRoIDEwIG1pbmVzXCIpO1xyXG4gICAgICAgICAgICBQbGF5ZXIuZ2V0SW5zdGFuY2UoKS5zZXRHYW1lTW9kZShtb2RlKTtcclxuICAgICAgICAgICAgcmV0dXJuIEdhbWUuZ2V0SW5zdGFuY2UoKS5tb2RlSW5mbyhtb2RlKTtcclxuICAgICAgICBjYXNlIFwiaW50ZXJtZWRpYXRlXCI6XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR2FtZSBtb2RlOiBJbnRlcm1lZGlhdGUgMTZ4MTYgdGFibGUgd2l0aCA0MCBtaW5lc1wiKTtcclxuICAgICAgICAgICAgUGxheWVyLmdldEluc3RhbmNlKCkuc2V0R2FtZU1vZGUobW9kZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBHYW1lLmdldEluc3RhbmNlKCkubW9kZUluZm8obW9kZSk7XHJcbiAgICAgICAgY2FzZSBcImV4cGVydFwiOlxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdhbWUgbW9kZTogRXhwZXJ0IDE2eDMwIHRhYmxlIHdpdGggOTkgbWluZXNcIik7XHJcbiAgICAgICAgICAgIFBsYXllci5nZXRJbnN0YW5jZSgpLnNldEdhbWVNb2RlKG1vZGUpO1xyXG4gICAgICAgICAgICByZXR1cm4gR2FtZS5nZXRJbnN0YW5jZSgpLm1vZGVJbmZvKG1vZGUpO1xyXG4gICAgICAgIGNhc2UgXCJjdXN0b21cIjpcclxuICAgICAgICAgICAgUGxheWVyLmdldEluc3RhbmNlKCkuc2V0R2FtZU1vZGUobW9kZSk7XHJcbiAgICAgICAgICAgIGlmIChjdXN0b21JbnB1dFZhbGlkYXRpb24oZ2V0Q3VzdG9tUHJvcHMoKSkgPT09IGZhbHNlKSB7IHJldHVybiBnYW1lTW9kZShcIlZhbGlkYXRpb25cIikgfVxyXG4gICAgICAgICAgICBHYW1lLmdldEluc3RhbmNlKCkuc2V0Q3VzdG9tTW9kZShnZXRDdXN0b21Qcm9wcygpKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYEdhbWUgbW9kZTogQ3VzdG9tICR7R2FtZS5nZXRJbnN0YW5jZSgpLm1vZGVJbmZvKG1vZGUpWzBdfXgke0dhbWUuZ2V0SW5zdGFuY2UoKS5tb2RlSW5mbyhtb2RlKVsxXX0gdGFibGUgd2l0aCAke0dhbWUuZ2V0SW5zdGFuY2UoKS5tb2RlSW5mbyhtb2RlKVsyXX0gbWluZShzKWApO1xyXG4gICAgICAgICAgICByZXR1cm4gR2FtZS5nZXRJbnN0YW5jZSgpLm1vZGVJbmZvKG1vZGUpO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIGlmIChtb2RlID09PSBcIlZhbGlkYXRpb25cIikgeyBjb25zb2xlLmVycm9yKFwiVmFsaWRhdGlvbiBpc3N1ZVwiKTsgcmV0dXJuIFwiZXJyb3IhXCIgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1RoZXJlIGlzIG5vIGdhbWUgbW9kZSB3aXRoIHRoYXQgbnVtYmVyIScpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiZXJyb3IhXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgIH1cclxufTtcclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLyNyZWdpb24gLSBldmVudCBsaXN0ZW5lcm5zXHJcbmdhbWVNb2RlSW5wdXQudmFsdWUgPSBcImJlZ2lubmVyXCI7XHJcbmdhbWVNb2RlSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZGlzcGxheUN1c3RvbU1vZGVPcHRpb25zKTtcclxuLy8jZW5kcmVnaW9uXHJcblxyXG5leHBvcnQgeyBnYW1lTW9kZSwgZ2FtZU1vZGVJbnB1dCB9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9nYW1lTW9kZS50cyIsImltcG9ydCB7IEdhbWUsIFBsYXllciB9IGZyb20gJy4vZGF0YSc7XHJcblxyXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVRBQkxFIEdSSUQ9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbi8vI3JlZ2lvbiAtIGNyZWF0ZXMgdGFibGUgZ3JpZCBmb3IgZ2l2ZW4gZ2FtZSBtb2RlXHJcbmNvbnN0IGNyZWF0ZUdyaWQgPSAocm93c0FuZENvbHM6IG51bWJlcltdKTogdm9pZCA9PiB7XHJcbiAgICBsZXQgdGFibGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0YWJsZScpO1xyXG4gICAgbGV0IGNlbGxDb3VudGVyID0gMTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcm93c0FuZENvbHNbMF07IGkrKykge1xyXG4gICAgICAgIGxldCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpO1xyXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgcm93c0FuZENvbHNbMV07IGorKykge1xyXG4gICAgICAgICAgICBsZXQgY29sID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKTtcclxuICAgICAgICAgICAgY29sLnNldEF0dHJpYnV0ZShcImlkXCIsIGNlbGxDb3VudGVyICsgJ2ZpZWxkJyk7XHJcbiAgICAgICAgICAgIGNvbC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWlkXCIsIGNlbGxDb3VudGVyICsgJ2ZpZWxkJyk7XHJcbiAgICAgICAgICAgIGNvbC5zZXRBdHRyaWJ1dGUoXCJkYXRhLW1pbmVcIiwgXCJcIik7XHJcbiAgICAgICAgICAgIGNvbC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWVtcHR5XCIsIFwiXCIpO1xyXG4gICAgICAgICAgICBjb2wuc2V0QXR0cmlidXRlKFwiZGF0YS1jbGlja1wiLCBcIlwiKTtcclxuICAgICAgICAgICAgY2VsbENvdW50ZXIrKztcclxuICAgICAgICAgICAgcm93LmFwcGVuZENoaWxkKGNvbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRhYmxlLmFwcGVuZENoaWxkKHJvdyk7XHJcbiAgICB9XHJcbiAgICBHYW1lLmdldEluc3RhbmNlKCkuc2V0R2FtZVRhYmxlKHRhYmxlKTtcclxufTtcclxuLy8jZW5kcmVnaW9uXHJcblxyXG5cclxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1CT1JERVJTPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4vLyNyZWdpb24gLSBjcmVhdGVzIGxlZnQgYm9yZGVyIGZvciB0YWJsZSBncmlkXHJcbmNvbnN0IGNyZWF0ZUxlZnRCb3JkZXIgPSAobnVtT2ZSb3dzOiBudW1iZXIsIG51bU9mQ29sczogbnVtYmVyKSA9PiB7XHJcbiAgICBsZXQgbGVmdEJvcmRlckZpZWxkczogbnVtYmVyW10gPSBbMV07XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bU9mUm93cyAtIDE7IGkrKykge1xyXG4gICAgICAgIGxldCBib3JkZXJGaWVsZCA9IGxlZnRCb3JkZXJGaWVsZHNbaV0gKyBudW1PZkNvbHM7XHJcbiAgICAgICAgbGVmdEJvcmRlckZpZWxkcy5wdXNoKGJvcmRlckZpZWxkKTtcclxuICAgIH1cclxuICAgIHJldHVybiBsZWZ0Qm9yZGVyRmllbGRzO1xyXG59XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uIC0gY3JlYXRlcyByaWdodCBib3JkZXIgZm9yIHRhYmxlIGdyaWRcclxuY29uc3QgY3JlYXRlUmlnaHRCb3JkZXIgPSAobnVtT2ZSb3dzOiBudW1iZXIsIG51bU9mQ29sczogbnVtYmVyKSA9PiB7XHJcbiAgICBsZXQgcmlnaHRCb3JkZXJGaWVsZHM6IG51bWJlcltdID0gW251bU9mQ29sc107XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bU9mUm93cyAtIDE7IGkrKykge1xyXG4gICAgICAgIGxldCBib3JkZXJGaWVsZCA9IHJpZ2h0Qm9yZGVyRmllbGRzW2ldICsgbnVtT2ZDb2xzO1xyXG4gICAgICAgIHJpZ2h0Qm9yZGVyRmllbGRzLnB1c2goYm9yZGVyRmllbGQpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJpZ2h0Qm9yZGVyRmllbGRzO1xyXG59XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuXHJcbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09U1VSUk9VTkRJTkc9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuLy8jcmVnaW9uIC0gZGVmaW5lU3Vycm91bmRpbmcoKSAtIGNyZWF0ZXMgc3Vycm91bmRpbmcgYmFzZWQgb24gZmllbGQgcG9zaXRpb24gKGJhc2VkIG9uIGlkKVxyXG5cclxuY29uc3QgZGVmaW5lU3Vycm91bmRpbmcgPSAodGFibGU6IEVsZW1lbnQsIGVsZW1lbnQ6IEhUTUxFbGVtZW50KSA9PiB7IC8vIGRlZmluaXNlbW8gb2tvbG5hIHBvbGphIG5hIG9zbm92dSBkYXRvZyBwb2xqYSBpIGJyb2phIGtvbG9uYSB0YWJlbGVcclxuICAgIGxldCBzdXJyb3VuZGluZztcclxuICAgIGNvbnN0IGlkID0gcGFyc2VJbnQoZWxlbWVudC5pZCk7XHJcbiAgICBjb25zdCBnYW1lTW9kZUluZm8gPSBHYW1lLmdldEluc3RhbmNlKCkubW9kZUluZm8oUGxheWVyLmdldEluc3RhbmNlKCkuZ2V0R2FtZU1vZGUoKSk7XHJcbiAgICBjb25zdCBudW1PZlJvd3MgPSBnYW1lTW9kZUluZm9bMF07XHJcbiAgICBjb25zdCBudW1PZkNvbHMgPSBnYW1lTW9kZUluZm9bMV07XHJcblxyXG4gICAgLy9iYXNlIHN1cnJvdW5kaW5nXHJcbiAgICBjb25zdCBsZWZ0ID0gdGFibGUucXVlcnlTZWxlY3RvcihgW2lkPVwiJHtpZCAtIDF9ZmllbGRcIl1gKTtcclxuICAgIGNvbnN0IHVwTGVmdCA9IHRhYmxlLnF1ZXJ5U2VsZWN0b3IoYFtpZD1cIiR7aWQgLSBudW1PZkNvbHMgLSAxfWZpZWxkXCJdYCk7XHJcbiAgICBjb25zdCB1cCA9IHRhYmxlLnF1ZXJ5U2VsZWN0b3IoYFtpZD1cIiR7aWQgLSBudW1PZkNvbHN9ZmllbGRcIl1gKTtcclxuICAgIGNvbnN0IHVwUmlnaHQgPSB0YWJsZS5xdWVyeVNlbGVjdG9yKGBbaWQ9XCIke2lkIC0gbnVtT2ZDb2xzICsgMX1maWVsZFwiXWApO1xyXG4gICAgY29uc3QgcmlnaHQgPSB0YWJsZS5xdWVyeVNlbGVjdG9yKGBbaWQ9XCIke2lkICsgMX1maWVsZFwiXWApO1xyXG4gICAgY29uc3QgcmlnaHREb3duID0gdGFibGUucXVlcnlTZWxlY3RvcihgW2lkPVwiJHtpZCArIG51bU9mQ29scyArIDF9ZmllbGRcIl1gKTtcclxuICAgIGNvbnN0IGRvd24gPSB0YWJsZS5xdWVyeVNlbGVjdG9yKGBbaWQ9XCIke2lkICsgbnVtT2ZDb2xzfWZpZWxkXCJdYCk7XHJcbiAgICBjb25zdCBkb3duTGVmdCA9IHRhYmxlLnF1ZXJ5U2VsZWN0b3IoYFtpZD1cIiR7aWQgKyBudW1PZkNvbHMgLSAxfWZpZWxkXCJdYCk7XHJcblxyXG4gICAgLy9jcmVhdGUgYm9yZGVyc1xyXG4gICAgY29uc3QgbGVmdEJvcmRlciA9IGNyZWF0ZUxlZnRCb3JkZXIobnVtT2ZSb3dzLCBudW1PZkNvbHMpO1xyXG4gICAgY29uc3QgcmlnaHRCb3JkZXIgPSBjcmVhdGVSaWdodEJvcmRlcihudW1PZlJvd3MsIG51bU9mQ29scyk7XHJcblxyXG4gICAgLy9zdXJyb3VuZGluZyBiYXNlZCBvbiBmaWVsZC1ib3JkZXJzIHJlbGF0aW9uXHJcbiAgICBpZiAobGVmdEJvcmRlci5pbmRleE9mKGlkKSAhPT0gLTEpIHtcclxuICAgICAgICBzdXJyb3VuZGluZyA9IFt1cCwgdXBSaWdodCwgcmlnaHQsIHJpZ2h0RG93biwgZG93bl07XHJcbiAgICB9IGVsc2UgaWYgKHJpZ2h0Qm9yZGVyLmluZGV4T2YoaWQpICE9PSAtMSkge1xyXG4gICAgICAgIHN1cnJvdW5kaW5nID0gW2xlZnQsIHVwTGVmdCwgdXAsIGRvd24sIGRvd25MZWZ0XTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc3Vycm91bmRpbmcgPSBbbGVmdCwgdXBMZWZ0LCB1cCwgdXBSaWdodCwgcmlnaHQsIHJpZ2h0RG93biwgZG93biwgZG93bkxlZnRdO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN1cnJvdW5kaW5nO1xyXG59XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5cclxuZXhwb3J0IHsgY3JlYXRlR3JpZH07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3RhYmxlR3JpZC50cyJdLCJzb3VyY2VSb290IjoiIn0=