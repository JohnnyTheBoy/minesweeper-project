let timer = {
    time: {
        hours: 0,
        minutes: 0,
        seconds: 0
    },
    interval: 1,
    timeIncrement: () => {
        if (timer.time.seconds < 59) { timer.time.seconds++ }
        else if (timer.time.seconds === 59 && timer.time.minutes < 59) { timer.time.seconds = 0, timer.time.minutes++ }
        else if (timer.time.seconds === 59 && timer.time.minutes === 59) { timer.time.seconds = 0, timer.time.minutes = 0, timer.time.hours++ }
    }
};


let calcScore = (): number => {
    return timer.time.seconds + (timer.time.minutes * 60) + (timer.time.hours * 360);
};


let getStringTime = () => {
    let prevTime = [timer.time.hours, timer.time.minutes, timer.time.seconds];
    let currTime = prevTime.map((timeElement) => { if (timeElement < 10) { return "0" + timeElement } else { return timeElement } });
    return `${currTime[0]} : ${currTime[1]} : ${currTime[2]}`;
};

let startTimer = (step = 1): void => {
    timer.interval = setInterval(timer.timeIncrement, step * 1000);
};

let stopTimer = (): void => {
    clearInterval(timer.interval);
};

let resetTimer = () => {
    for (let element in timer.time) { timer.time[element] = 0 };
}

let stringInterval = 0; // za ispis string vremena
const timerPlace = document.getElementById('timer-place');

let startTimerHandler = () => {
    startTimer();
    stringInterval = setInterval(() => { timerPlace.textContent = getStringTime() }, 100);
};

let stopTimerHandler = () => {
    stopTimer();
    clearInterval(stringInterval);
};


export { startTimerHandler, stopTimer, resetTimer, getStringTime, timerPlace, stopTimerHandler, calcScore };
