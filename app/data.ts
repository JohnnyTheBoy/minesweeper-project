//#region - selectors
const gameStartButton = <HTMLButtonElement>document.getElementById('start');
const gameResetButton = <HTMLButtonElement>document.getElementById('reset');
const playerNameInput = <HTMLInputElement>document.getElementById('player-name');
const gameOptionsSection = document.getElementById('options');
const gameSection = document.getElementById('game-place');

//#endregion

playerNameInput.value = "";


//#region - Game singleton class definition

class Game {

    private static readonly _instance: Game = new Game();

    private _mode = {
        beginner: [9, 9, 10],
        intermediate: [16, 16, 40],
        expert: [16, 30, 99],
        custom: [0, 0, 0]
    };

    private _gameTable: HTMLTableElement;

    private constructor() {
    }

    public static getInstance(): Game {
        return Game._instance;
    }

    public modeInfo(modeName: string): number[] {
        return this._mode[modeName];
    }

    public setCustomMode(info: number[]) {
        this._mode.custom = info;
        // console.log(`Custom mode set to ${this._mode.custom}`);
    }

    public setGameTable(element) {
        this._gameTable = element;
        // console.log(`Table created`);
    }

    public getGameTable() {
        return this._gameTable;
    }
}

//#endregion

//#region - Player - singleton class definition
class Player {

    private static readonly _instance: Player = new Player();

    private _name: string = "";
    private _gameMode: string = "none";
    private _score: number;

    private constructor() {
    }

    public static getInstance(): Player {
        return Player._instance;
    }
    getName(): string {
        return this._name;
    }
    setName(value: string) {
        if (value === '') { value = 'unknown player' }
        this._name = value;
        // console.log(`Players name set to: ${this._name}`);
    }

    getGameMode(): string {
        return this._gameMode;
    }

    setGameMode(value: string) {
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
//#endregion

export { Game, Player, gameStartButton, gameResetButton, playerNameInput, gameOptionsSection, gameSection};