const titleElement = document.querySelector("title");
const taskDiv = document.getElementById("task");
const timeSetDiv = document.getElementById("time-set");
const timeLeftDiv = document.getElementById("time-left");
let interval = undefined;
const brownNoiseOnRadio = document.getElementById("brown-noise-on");
const brownNoiseOffRadio = document.getElementById("brown-noise-off");
const audioElement = new Audio("brown_noise.mp3");

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
            audioElement.pause();
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

function startAudio() {
    if (this.checked) {
        audioElement.play()
    }
}

function stopAudio() {
    if (this.checked) {
        audioElement.pause();
        audioElement.currentTime = 0;
    }
}

taskDiv.addEventListener("blur", updateTitle);
timeSetDiv.addEventListener("blur", startNewTime);
brownNoiseOnRadio.addEventListener("change", startAudio);
brownNoiseOffRadio.addEventListener("change", stopAudio);

updateTitle();
