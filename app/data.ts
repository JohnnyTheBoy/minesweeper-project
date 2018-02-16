//#region - Game singleton class definition
class Game {

    private static _instance: Game = new Game();

    private _mode = {
        beginner: [9, 9, 10],
        intermediate: [16, 16, 40],
        expert: [16, 30, 99],
        custom: [0, 0, 0]
    };

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
    getUsername(): string {
        return this._name;
    }
    setUsername(value: string) {
        this._name = value;
    }

    getGameMode(): string {
        return this._gameMode;
    }

    setGameMode(value: string) {
        this._gameMode = value;
    }
}
//#endregion

export {Game, Player};