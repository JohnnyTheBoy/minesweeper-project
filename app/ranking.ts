import { Player } from './data';

//#region - selectors
const gameMode = Player.getInstance().getGameMode();
const ranking = document.getElementById('ranking');
//#endregion

//#region - rankingTable definition
let rankingTable = {
    beginner: [['John', 15], ['Marry', 21], ['Tim', 24]],
    intermediate: [['Sam', 44], ['Mark', 46], ['Jim', 50]],
    expert: [['Maria', 58], ['Kit', 66], ['Tony', 70]]
};
//#endregion

//#region - presetStorage() - checks if there's database in localstorage if not creates one, otherwise loads it.
const presetStorage = () => {
    if (localStorage.getItem('rankingTable') !== null) {
        const database = JSON.parse(localStorage.getItem('rankingTable'));
        rankingTable = database;
    }
    else { localStorage.setItem('rankingTable', JSON.stringify(rankingTable)) }
};
//#endregion

//#region - saveData() - saves player data
const saveData = () => {
    let table = rankingTable[gameMode];
    table.push([Player.getInstance().getName(), Player.getInstance().getScore()])
    table.sort((a, b) => { return a[1] - b[1]; });
    for (table.length; table.length > 6;) {
        table.pop();
    }
    rankingTable[gameMode] = table;
    localStorage.setItem('rankingTable', table);
};
//#endregion

//#region - writeData() - prints out ranking table
let printData = () => {
    let table = rankingTable[gameMode];
    ranking.innerHTML = '';

    table.forEach(element => {
        let li = document.createElement('li');
        li.textContent = `${element[0]} - ${element[1]}`;
        ranking.appendChild(li);
    });
};
//#endregion

//#region - handleRanking() - one to rule them all
const handleRanking = () => {
    saveData();
    printData();
};
//#endregion
