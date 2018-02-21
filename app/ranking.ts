import { Player } from './data';
import { calcScore } from './timer';

//#region - selectors
const scoreList = document.getElementById('score-list');
const gameModeName = document.getElementById('game-mode-name');
//#endregion

//#region - rankingTable definition
let rankingTable: {} = {
    beginner: [['John', 15], ['Marry', 21], ['Tim', 24],['Alex', 26]],
    intermediate: [['Sam', 44], ['Mark', 46], ['Jim', 50]],
    expert: [['Maria', 58], ['Kit', 66], ['Tony', 70]]
};
//#endregion

//#region - presetStorage() - checks if there's database in localstorage if not creates one, otherwise loads it.
const presetStorage = (): void => {
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
    let gameMode = Player.getInstance().getGameMode();
    console.log(`Game mode inside saveData: ${gameMode}`);

    let currentModeTable = storageData[gameMode];
    console.log(`Current Table inside saveData: ${currentModeTable}`);
    currentModeTable = scoreValidation(currentModeTable);
    console.log(`Table inside saveData: ${currentModeTable}`);
    currentModeTable.sort((a, b) => { return a[1] - b[1]});
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
const scoreValidation = (table: (string | number)[][]) => {
    let newTable = table;
    console.log(newTable);
    const playerScore = [Player.getInstance().getName(), Player.getInstance().getScore()];
    if (playerScore[1] !== 0 && playerScore[1] !== undefined) {
        newTable.push(playerScore);
        console.log('new table inside if statement',playerScore,newTable);
    }
    console.log('newTable',newTable);
    return newTable;
};
//#endregion


//#region - writeData() - prints out ranking table
let printData = () => {

    let table = rankingTable[Player.getInstance().getGameMode()];

    gameModeName.textContent = Player.getInstance().getGameMode() + ' mode';
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
