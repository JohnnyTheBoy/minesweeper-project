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


//#region - selectors
const gameStartButton = document.getElementById('start');
const gameResetButton = document.getElementById('reset');
const playerNameInput = document.getElementById('username');
//#endregion
playerNameInput.value = "";
//#region - testing func
const onClick = (event) => {
    console.log(event.target.id);
    if (event.target.id === "start") {
        Object(__WEBPACK_IMPORTED_MODULE_1__gameMode__["a" /* gameMode */])(__WEBPACK_IMPORTED_MODULE_1__gameMode__["b" /* gameModeInput */].value);
        __WEBPACK_IMPORTED_MODULE_0__data__["b" /* Player */].getInstance().setName(playerNameInput.value);
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



/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzllZTY3OWIxOTMzMWZlYjFmMTQiLCJ3ZWJwYWNrOi8vLy4vYXBwL2RhdGEudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2FwcC50cyIsIndlYnBhY2s6Ly8vLi9hcHAvZ2FtZU1vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7QUM3REE7QUFBQSwyQ0FBMkM7QUFDM0M7SUFXSTtRQVBRLFVBQUssR0FBRztZQUNaLFFBQVEsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ3BCLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO1lBQzFCLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO1lBQ3BCLE1BQU0sRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ3BCLENBQUM7UUFHRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsb0NBQW9DLENBQUM7UUFBQyxDQUFDO1FBQzdFLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0lBQzFC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QUMsQ0FBQztRQUM3QztZQUNJLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxZQUFZLENBQUMsQ0FBQyxDQUFDO2dCQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQztnQkFBQyxNQUFNLENBQUMsUUFBUTtZQUFDLENBQUM7WUFDakYsSUFBSSxDQUFDLENBQUM7Z0JBQ0YsT0FBTyxDQUFDLEtBQUssQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDO2dCQUN6RCxNQUFNLENBQUMsUUFBUSxDQUFDO1lBQ3BCLENBQUM7SUFDVCxDQUFDO0FBQ0wsQ0FBQyxDQUFDO0FBQ0YsWUFBWTtBQUVaLDRCQUE0QjtBQUM1QixhQUFhLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQztBQUNqQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLHdCQUF3QixDQUFDLENBQUM7QUFDbkUsWUFBWTtBQUV1QiIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA3OWVlNjc5YjE5MzMxZmViMWYxNCIsIi8vI3JlZ2lvbiAtIEdhbWUgc2luZ2xldG9uIGNsYXNzIGRlZmluaXRpb25cclxuY2xhc3MgR2FtZSB7XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBHYW1lID0gbmV3IEdhbWUoKTtcclxuXHJcbiAgICBwcml2YXRlIF9tb2RlID0ge1xyXG4gICAgICAgIGJlZ2lubmVyOiBbOSwgOSwgMTBdLFxyXG4gICAgICAgIGludGVybWVkaWF0ZTogWzE2LCAxNiwgNDBdLFxyXG4gICAgICAgIGV4cGVydDogWzE2LCAzMCwgOTldLFxyXG4gICAgICAgIGN1c3RvbTogWzAsIDAsIDBdXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIGlmIChHYW1lLl9pbnN0YW5jZSkgeyB0aHJvdyBuZXcgRXJyb3IoXCJFcnJvciwgd3JvbmcgdXNlIG9mIEdhbWUgaW5zdGFuY2UhXCIpIH1cclxuICAgICAgICBHYW1lLl9pbnN0YW5jZSA9IHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBHYW1lIHtcclxuICAgICAgICByZXR1cm4gR2FtZS5faW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG1vZGVJbmZvKG1vZGVOYW1lOiBzdHJpbmcpOiBudW1iZXJbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21vZGVbbW9kZU5hbWVdO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRDdXN0b21Nb2RlKGluZm86IG51bWJlcltdKSB7XHJcbiAgICAgICAgdGhpcy5fbW9kZS5jdXN0b20gPSBpbmZvO1xyXG4gICAgfVxyXG59XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uIC0gUGxheWVyIC0gc2luZ2xldG9uIGNsYXNzIGRlZmluaXRpb25cclxuY2xhc3MgUGxheWVyIHtcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IFBsYXllciA9IG5ldyBQbGF5ZXIoKTtcclxuICAgIHByaXZhdGUgX25hbWU6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBwcml2YXRlIF9nYW1lTW9kZTogc3RyaW5nID0gXCJub25lXCI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgaWYgKFBsYXllci5faW5zdGFuY2UpIHsgdGhyb3cgbmV3IEVycm9yKFwiRXJyb3IsIHdyb25nIHVzZSBvZiBQbGF5ZXIgaW5zdGFuY2UhXCIpIH1cclxuICAgICAgICBQbGF5ZXIuX2luc3RhbmNlID0gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IFBsYXllciB7XHJcbiAgICAgICAgcmV0dXJuIFBsYXllci5faW5zdGFuY2U7XHJcbiAgICB9XHJcbiAgICBnZXROYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX25hbWU7XHJcbiAgICB9XHJcbiAgICBzZXROYW1lKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9uYW1lID0gdmFsdWU7XHJcbiAgICAgICAgY29uc29sZS5sb2coYFBsYXllcnMgbmFtZSBzZXQgdG86ICR7dGhpcy5fbmFtZX1gKVxyXG4gICAgfVxyXG5cclxuICAgIGdldEdhbWVNb2RlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dhbWVNb2RlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEdhbWVNb2RlKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9nYW1lTW9kZSA9IHZhbHVlO1xyXG4gICAgfVxyXG59XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuZXhwb3J0IHtHYW1lLCBQbGF5ZXJ9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9kYXRhLnRzIiwiaW1wb3J0IHsgR2FtZSwgUGxheWVyIH0gZnJvbSAnLi9kYXRhJztcclxuaW1wb3J0IHsgZ2FtZU1vZGUsIGdhbWVNb2RlSW5wdXQgfSBmcm9tICcuL2dhbWVNb2RlJztcclxuXHJcbi8vI3JlZ2lvbiAtIHNlbGVjdG9yc1xyXG5jb25zdCBnYW1lU3RhcnRCdXR0b24gPSA8SFRNTEJ1dHRvbkVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXJ0Jyk7XHJcbmNvbnN0IGdhbWVSZXNldEJ1dHRvbiA9IDxIVE1MQnV0dG9uRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzZXQnKTtcclxuY29uc3QgcGxheWVyTmFtZUlucHV0ID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXJuYW1lJyk7XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxucGxheWVyTmFtZUlucHV0LnZhbHVlID0gXCJcIjtcclxuXHJcbi8vI3JlZ2lvbiAtIHRlc3RpbmcgZnVuY1xyXG5jb25zdCBvbkNsaWNrID0gKGV2ZW50KTogdm9pZCA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhldmVudC50YXJnZXQuaWQpO1xyXG4gICAgaWYgKGV2ZW50LnRhcmdldC5pZCA9PT0gXCJzdGFydFwiKSB7XHJcbiAgICAgICAgZ2FtZU1vZGUoZ2FtZU1vZGVJbnB1dC52YWx1ZSk7XHJcbiAgICAgICAgUGxheWVyLmdldEluc3RhbmNlKCkuc2V0TmFtZShwbGF5ZXJOYW1lSW5wdXQudmFsdWUpO1xyXG4gICAgICAgIHBsYXllck5hbWVJbnB1dC5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ3RydWUnKTtcclxuICAgICAgICBnYW1lTW9kZUlucHV0LnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAndHJ1ZScpO1xyXG4gICAgICAgIGdhbWVTdGFydEJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ3RydWUnKTtcclxuICAgICAgICBnYW1lUmVzZXRCdXR0b24ucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoZXZlbnQudGFyZ2V0LmlkID09PSBcInJlc2V0XCIpIHtcclxuICAgICAgICBnYW1lUmVzZXRCdXR0b24uc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICd0cnVlJyk7XHJcbiAgICAgICAgZ2FtZVN0YXJ0QnV0dG9uLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcclxuICAgICAgICBnYW1lTW9kZUlucHV0LnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcclxuICAgICAgICBnYW1lTW9kZUlucHV0LnZhbHVlID0gJ2JlZ2lubmVyJztcclxuICAgICAgICBwbGF5ZXJOYW1lSW5wdXQucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xyXG4gICAgICAgIHBsYXllck5hbWVJbnB1dC52YWx1ZSA9IFwiXCI7XHJcbiAgICB9XHJcbn07XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uIC0gZXZlbnQgbGlzdGVuZXJzXHJcbmdhbWVTdGFydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uQ2xpY2spO1xyXG5nYW1lUmVzZXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbkNsaWNrKTtcclxuLy8gXHJcbi8vI2VuZHJlZ2lvblxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvYXBwLnRzIiwiaW1wb3J0IHsgR2FtZSwgUGxheWVyIH0gZnJvbSAnLi9kYXRhJztcclxuXHJcbi8vI3JlZ2lvbiAtIHNlbGVjdG9yc1xyXG5jb25zdCBjdXN0b21Sb3dzSW5wdXQgPSA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3VzdG9tUm93cycpO1xyXG5jb25zdCBjdXN0b21Db2xzSW5wdXQgPSA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3VzdG9tQ29scycpO1xyXG5jb25zdCBjdXN0b21NaW5lc0lucHV0ID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2N1c3RvbU1pbmVzJyk7XHJcbmNvbnN0IGdhbWVNb2RlSW5wdXQgPSA8SFRNTFNlbGVjdEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWVNb2RlJyk7XHJcbmNvbnN0IGN1c3RvbU1vZGVPcHRpb25zID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjdXN0b21Nb2RlT3B0aW9ucycpO1xyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vI3JlZ2lvbiAtIGdldEN1c3RvbVByb3BzKCkgLSBnZXRzIGN1c3RvbSBwcm9wZXJ0aWVzIGZyb20gdXNlciBpbnB1dFxyXG5jb25zdCBnZXRDdXN0b21Qcm9wcyA9ICgpID0+IHtcclxuICAgIGxldCBjdXN0b21Qcm9wcyA9IFtcclxuICAgICAgICBwYXJzZUludChjdXN0b21Sb3dzSW5wdXQudmFsdWUpLFxyXG4gICAgICAgIHBhcnNlSW50KGN1c3RvbUNvbHNJbnB1dC52YWx1ZSksXHJcbiAgICAgICAgcGFyc2VJbnQoY3VzdG9tTWluZXNJbnB1dC52YWx1ZSksXHJcbiAgICBdO1xyXG4gICAgcmV0dXJuIGN1c3RvbVByb3BzO1xyXG59XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uIC0gZGlzcGxheUN1c3RvbU1vZGVPcHRzKCkgLSBoaWRlcyBvciBzaG93cyBkaXYgd2l0aCBjdXN0b20gZ2FtZSBvcHRpb25zIGluIGRvY3VtZW50XHJcbmxldCBkaXNwbGF5Q3VzdG9tTW9kZU9wdGlvbnMgPSAoKTogdm9pZCA9PiB7XHJcbiAgICBpZiAoZ2FtZU1vZGVJbnB1dC52YWx1ZSA9PT0gXCJjdXN0b21cIikge1xyXG4gICAgICAgIGN1c3RvbU1vZGVPcHRpb25zIS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcclxuICAgIH0gZWxzZSB7IGN1c3RvbU1vZGVPcHRpb25zIS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTsgfVxyXG59O1xyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vI3JlZ2lvbiAtIGN1c3RvbUlucHV0VmFsaWRhdGlvbigpIC0gY3VzdG9tIGdhbWUgbW9kZSBpbnB1dCB2YWxpZGF0aW9uXHJcbmNvbnN0IGN1c3RvbUlucHV0VmFsaWRhdGlvbiA9IChtb2RlSW5mbzogbnVtYmVyW10pID0+IHsvL2dhbWUgbW9kZSBpbmZvIFtyb3dzLGNvbHMsbWluZXNdXHJcbiAgICBpZiAobW9kZUluZm9bMl0gPj0gbW9kZUluZm9bMF0gKiBtb2RlSW5mb1sxXSkgeyAgLy9udW0gb2YgbWluZXMgdmFsaWRhdGlvbixjYW4ndCBiZSBtb3JlIG1pbmVzIHRoYW4gZmllbGRzIG9yIGVxdWFsIHRvIG51bSBvZiBmaWVsZHNcclxuICAgICAgICBhbGVydChcIkNhbid0IGhhdmUgbW9yZSBtaW5lcyB0aGFuIGZpZWxkc1wiKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9IHJldHVybiB0cnVlO1xyXG59O1xyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vI3JlZ2lvbiAtIGdhbWVNb2RlKCkgLSBnYW1lIG1vZGUgc3dpdGNoZXJcclxuY29uc3QgZ2FtZU1vZGUgPSAobW9kZTogc3RyaW5nKTogbnVtYmVyW10gfCBzdHJpbmcgPT4ge1xyXG4gICAgc3dpdGNoIChtb2RlKSB7XHJcbiAgICAgICAgY2FzZSBcImJlZ2lubmVyXCI6XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR2FtZSBtb2RlOiBCZWdpbm5lciA5eDkgdGFibGUgd2l0aCAxMCBtaW5lc1wiKTtcclxuICAgICAgICAgICAgUGxheWVyLmdldEluc3RhbmNlKCkuc2V0R2FtZU1vZGUobW9kZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBHYW1lLmdldEluc3RhbmNlKCkubW9kZUluZm8obW9kZSk7XHJcbiAgICAgICAgY2FzZSBcImludGVybWVkaWF0ZVwiOlxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdhbWUgbW9kZTogSW50ZXJtZWRpYXRlIDE2eDE2IHRhYmxlIHdpdGggNDAgbWluZXNcIik7XHJcbiAgICAgICAgICAgIFBsYXllci5nZXRJbnN0YW5jZSgpLnNldEdhbWVNb2RlKG1vZGUpO1xyXG4gICAgICAgICAgICByZXR1cm4gR2FtZS5nZXRJbnN0YW5jZSgpLm1vZGVJbmZvKG1vZGUpO1xyXG4gICAgICAgIGNhc2UgXCJleHBlcnRcIjpcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJHYW1lIG1vZGU6IEV4cGVydCAxNngzMCB0YWJsZSB3aXRoIDk5IG1pbmVzXCIpO1xyXG4gICAgICAgICAgICBQbGF5ZXIuZ2V0SW5zdGFuY2UoKS5zZXRHYW1lTW9kZShtb2RlKTtcclxuICAgICAgICAgICAgcmV0dXJuIEdhbWUuZ2V0SW5zdGFuY2UoKS5tb2RlSW5mbyhtb2RlKTtcclxuICAgICAgICBjYXNlIFwiY3VzdG9tXCI6XHJcbiAgICAgICAgICAgIFBsYXllci5nZXRJbnN0YW5jZSgpLnNldEdhbWVNb2RlKG1vZGUpO1xyXG4gICAgICAgICAgICBpZiAoY3VzdG9tSW5wdXRWYWxpZGF0aW9uKGdldEN1c3RvbVByb3BzKCkpID09PSBmYWxzZSkgeyByZXR1cm4gZ2FtZU1vZGUoXCJWYWxpZGF0aW9uXCIpIH1cclxuICAgICAgICAgICAgR2FtZS5nZXRJbnN0YW5jZSgpLnNldEN1c3RvbU1vZGUoZ2V0Q3VzdG9tUHJvcHMoKSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBHYW1lIG1vZGU6IEN1c3RvbSAke0dhbWUuZ2V0SW5zdGFuY2UoKS5tb2RlSW5mbyhtb2RlKVswXX14JHtHYW1lLmdldEluc3RhbmNlKCkubW9kZUluZm8obW9kZSlbMV19IHRhYmxlIHdpdGggJHtHYW1lLmdldEluc3RhbmNlKCkubW9kZUluZm8obW9kZSlbMl19IG1pbmUocylgKTtcclxuICAgICAgICAgICAgcmV0dXJuIEdhbWUuZ2V0SW5zdGFuY2UoKS5tb2RlSW5mbyhtb2RlKTtcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICBpZiAobW9kZSA9PT0gXCJWYWxpZGF0aW9uXCIpIHsgY29uc29sZS5lcnJvcihcIlZhbGlkYXRpb24gaXNzdWVcIik7IHJldHVybiBcImVycm9yIVwiIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdUaGVyZSBpcyBubyBnYW1lIG1vZGUgd2l0aCB0aGF0IG51bWJlciEnKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBcImVycm9yIVwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uIC0gZXZlbnQgbGlzdGVuZXJuc1xyXG5nYW1lTW9kZUlucHV0LnZhbHVlID0gXCJiZWdpbm5lclwiO1xyXG5nYW1lTW9kZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGRpc3BsYXlDdXN0b21Nb2RlT3B0aW9ucyk7XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuZXhwb3J0IHsgZ2FtZU1vZGUsIGdhbWVNb2RlSW5wdXQgfTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvZ2FtZU1vZGUudHMiXSwic291cmNlUm9vdCI6IiJ9