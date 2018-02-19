//==============================RANDOM FUNCTIONS======================================================

//#region  - Creates random number for passed min and max
const randomNumber = (maxNum: number, minNum: number = 1): number => {
    return Math.floor(Math.random() * (maxNum - minNum + 1) + minNum);
};
//#endregion

//#region  - array with specified number of random numbers
const randomNumbersArray = (arrLength: number, maxNum: number, minNum: number = 1): number[] => {
    let array: number[] = [];
    for (let i = 0; i < arrLength; i++) {
        let newNum = randomNumber(maxNum, minNum);
        while (array.indexOf(newNum) !== -1) {
            newNum = randomNumber(minNum, maxNum);
        }
        array.push(newNum);
    }
    return array;
}
//#endregion

//====================================================================================================

//#region - preventMenu() - nema desni klik meni na tabli
const preventTableMenu = (event):void => {
    let clickedPlace = event.target;
    if (clickedPlace.tagName === "TD" || clickedPlace.tagName === "TABLE" || clickedPlace.tagName === "IMG") {
        event.preventDefault();
    }
}
//#endregion

export { randomNumbersArray, preventTableMenu };