//#region - selectors
const gameStartButton = <HTMLButtonElement>document.getElementById('start');
const gameResetButton = <HTMLButtonElement>document.getElementById('reset');
const playerNameInput = <HTMLInputElement>document.getElementById('username');
const gameOptionsSection = document.getElementById('gameOptions');
const gameSection = <HTMLElement>document.getElementById('game');
//#endregion

playerNameInput.value = "";



//#region - Game singleton class definition
class Game {

    private static _instance: Game = new Game();

    private _mode = {
        beginner: [9, 9, 10],
        intermediate: [16, 16, 40],
        expert: [16, 30, 99],
        custom: [0, 0, 0]
    };

    private _gameTable:HTMLTableElement;

    constructor() {
        if (Game._instance) { throw new Error("Error, wrong use of Game instance!") }
        Game._instance = this;
    }

    public static getInstance(): Game {
        return Game._instance;
    }

    public modeInfo(modeName: string): number[] {
        return this._mode[modeName];
    }

    public setCustomMode(info: number[]) {
        this._mode.custom = info;
        console.log(`Custom mode set to ${this._mode.custom}`);
    }

    public setGameTable (element) {
        this._gameTable = element;
        console.log(`Table created`);
    }

    public getGameTable(){
        return this._gameTable;
    }
}
//#endregion

//#region - Player - singleton class definition
class Player {

    private static _instance: Player = new Player();
    private _name: string = "";
    private _gameMode: string = "none";

    constructor() {
        if (Player._instance) { throw new Error("Error, wrong use of Player instance!") }
        Player._instance = this;
    }

    public static getInstance(): Player {
        return Player._instance;
    }
    getName(): string {
        return this._name;
    }
    setName(value: string) {
        this._name = value;
        console.log(`Players name set to: ${this._name}`)
    }

    getGameMode(): string {
        return this._gameMode;
    }

    setGameMode(value: string) {
        this._gameMode = value;
    }
}
//#endregion

export {Game, Player, gameStartButton, gameResetButton, playerNameInput, gameOptionsSection, gameSection};