const titleElement = document.querySelector("title");
const taskDiv = document.getElementById("task");
const timeSetDiv = document.getElementById("time-set");
const timeLeftDiv = document.getElementById("time-left");
let interval = undefined;

function updateTitle() {
    titleElement.innerText = taskDiv.innerText + "|" + timeLeftDiv.innerText;
}

function startNewTime() {
    if (interval !== undefined) {
        clearInterval(interval);
    }

    timeLeftDiv.innerText = timeSetDiv.innerText;
    const newTime = getNewTimeInMS();
    const endTime = new Date().getTime() + newTime;

    function updateTime() {
        const timeRemaining = endTime - new Date().getTime();
        if (timeRemaining <= 0) {
            timeLeftDiv.innerText = "00:00:00";
            clearInterval(interval);
        } else {
            const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

            const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            timeLeftDiv.innerText = formattedTime;
        }
        updateTitle();
    }
    
    interval = setInterval(updateTime, 1000);
}

function getNewTimeInMS() {
    const [hours, minutes, seconds] = timeLeftDiv.innerText.split(":").map(Number);
    const totalSeconds = (hours * 60 * 60) + (minutes * 60) + seconds;
    return totalSeconds * 1000;
}

taskDiv.addEventListener("blur", updateTitle);
timeSetDiv.addEventListener("blur", startNewTime);

updateTitle();
