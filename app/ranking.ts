import { Player } from './data';
import { calcScore } from './timer';

//#region - selectors
const rankingGameMode = document.getElementById('game-mode-name');
const scoreList = document.getElementById('score-list');

//#endregion

//#region - rankingTable definition
let rankingTable: {} = {
    beginner: [['John', 25], ['Marry', 26], ['Tim', 29], ['Alex', 35], ['Olivia', 40]],
    intermediate: [['Sam', 44], ['Emily', 46], ['Jim', 50], ['Charlotte', 53], ['Willy', 55]],
    expert: [['Maria', 58], ['Kit', 66], ['Tony', 70], ['Zoey', 75], ["Natalie", 80]]
};
//#endregion

//#region - presetStorage() - checks if there's database in localstorage if not creates one, otherwise loads it.
const presetStorage = (): void => {
    if (localStorage.getItem('rankingTable') === null) {
        localStorage.setItem('rankingTable', JSON.stringify(rankingTable));
        // console.log(`database fetched from localstorage`, localStorage.getItem('rankingTable'));// for dev purpose
    }
};
//#endregion

presetStorage();

//#region - saveData() - saves data
const saveData = () => {
    let storageData = JSON.parse(localStorage.getItem('rankingTable'));
    let gameMode = Player.getInstance().getGameMode();
    let currentModeTable = storageData[gameMode];
    currentModeTable = scoreValidation(currentModeTable);
    currentModeTable.sort((a, b) => { return a[1] - b[1] });
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
const scoreValidation = (table: (string | number)[][]) => {
    let newTable = table;
    const playerScore = [Player.getInstance().getName(), Player.getInstance().getScore()];
    if (playerScore[1] !== 0 && playerScore[1] !== undefined) {
        newTable.push(playerScore);
    }
    return newTable;
};
//#endregion


//#region - writeData() - prints out ranking table
let printData = () => {
    let table = rankingTable[Player.getInstance().getGameMode()];
    rankingGameMode.textContent = Player.getInstance().getGameMode() + ' mode';
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
    saveData();
    printData();
};
//#endregion

export { handleRanking };
