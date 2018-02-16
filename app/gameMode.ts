import { Game, Player } from './data';

//#region - selectors
const customRowsInput = <HTMLInputElement>document.getElementById('customRows');
const customColsInput = <HTMLInputElement>document.getElementById('customCols');
const customMinesInput = <HTMLInputElement>document.getElementById('customMines');
const gameModeInput = <HTMLSelectElement>document.getElementById('gameMode');
const customModeOptions = <HTMLElement>document.getElementById('customModeOptions');
//#endregion

//#region - getCustomProps() - gets custom properties from user input
const getCustomProps = () => {
    let customProps = [
        parseInt(customRowsInput.value),
        parseInt(customColsInput.value),
        parseInt(customMinesInput.value),
    ];
    return customProps;
}
//#endregion

//#region - displayCustomModeOpts() - hides or shows div with custom game options in document
let displayCustomModeOptions = (): void => {
    if (gameModeInput.value === "custom") {
        customModeOptions!.classList.remove('hidden');
    } else { customModeOptions!.classList.add('hidden'); }
};
//#endregion

//#region - customInputValidation() - custom game mode input validation
const customInputValidation = (modeInfo: number[]) => {//game mode info [rows,cols,mines]
    if (modeInfo[2] >= modeInfo[0] * modeInfo[1]) {  //num of mines validation,can't be more mines than fields or equal to num of fields
        alert("Can't have more mines than fields");
        return false;
    } return true;
};
//#endregion

//#region - gameMode() - game mode switcher
const gameMode = (mode: string): number[] | string => {
    switch (mode) {
        case "beginner":
            console.log("Game mode: Beginner 9x9 table with 10 mines");
            Player.getInstance().setGameMode(mode);
            return Game.getInstance().modeInfo(mode);
        case "intermediate":
            console.log("Game mode: Intermediate 16x16 table with 40 mines");
            Player.getInstance().setGameMode(mode);
            return Game.getInstance().modeInfo(mode);
        case "expert":
            console.log("Game mode: Expert 16x30 table with 99 mines");
            Player.getInstance().setGameMode(mode);
            return Game.getInstance().modeInfo(mode);
        case "custom":
            Player.getInstance().setGameMode(mode);
            if (customInputValidation(getCustomProps()) === false) { return gameMode("Validation") }
            Game.getInstance().setCustomMode(getCustomProps());
            console.log(`Game mode: Custom ${Game.getInstance().modeInfo(mode)[0]}x${Game.getInstance().modeInfo(mode)[1]} table with ${Game.getInstance().modeInfo(mode)[2]} mine(s)`);
            return Game.getInstance().modeInfo(mode);
        default:
            if (mode === "Validation") { console.error("Validation issue"); return "error!" }
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

export { gameMode, gameModeInput };