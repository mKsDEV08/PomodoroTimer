let sessionState = "Session"
let state = "Start";

let sessionParagraph = document.querySelector("#sessionParagraph")
sessionParagraph.innerHTML = sessionState

let countdown = document.querySelector("#countdown")

let sessionMinutes = 25
let sessionTime = sessionMinutes * 60

let breakMinutes = 5
let breakTime = breakMinutes * 60

document.querySelector("#sessionLess").addEventListener("click", () => {
    if (sessionMinutes > 1) {
        sessionMinutes -= 1
        sessionTime = sessionMinutes * 60
        document.querySelector("#sessionTime").innerHTML = sessionMinutes
        countdown.innerHTML = sessionMinutes + ":00"
    }
})

document.querySelector("#sessionMore").addEventListener("click", () => {
    if (sessionMinutes < 60) {
        sessionMinutes += 1
        sessionTime = sessionMinutes * 60
        document.querySelector("#sessionTime").innerHTML = sessionMinutes
        countdown.innerHTML = sessionMinutes + ":00"
    }
})

document.querySelector("#breakLess").addEventListener("click", () => {
    if (breakMinutes > 1) {
        breakMinutes -= 1
        breakTime = breakMinutes * 60
        document.querySelector("#breakTime").innerHTML = breakMinutes
    }
})

document.querySelector("#breakMore").addEventListener("click", () => {
    if (breakMinutes < 60) {
        breakMinutes += 1
        breakTime = breakMinutes * 60
        document.querySelector("#breakTime").innerHTML = breakMinutes
    }
})

let interval;
let timeLeft = null;

let alarm = new Audio("./static/alarm.mp3")

function updateCountdown() {
    let minutes = Math.floor(timeLeft / 60)
    let seconds = timeLeft % 60

    if (seconds < 10) {
        seconds = "0" + seconds
    }
    countdown.innerHTML = minutes + ":" + seconds
}

function startTimer() {
    if (timeLeft === null) {
        timeLeft = sessionTime
    }
    document.querySelector("#timeControls").hidden = true
    interval = setInterval(() => {
        timeLeft--;
        updateCountdown()

        if (timeLeft === 0) {
            clearInterval(interval)
            alarm.play()
            if (sessionState === "Session") {
                sessionState = "Break"
                sessionParagraph.innerHTML = sessionState
                timeLeft = breakTime
                startTimer()
            } else {
                sessionState = "Session"
                sessionParagraph.innerHTML = sessionState
                timeLeft = sessionTime
                startTimer()
            }
            updateCountdown()
        }

    }, 1000)
}

function pauseTimer() {
    clearInterval(interval)
}

function resetTimer() {
    clearInterval(interval)
    timeLeft = null
    document.querySelector("#timeControls").hidden = false
    sessionState = "Session"
    sessionParagraph.innerHTML = sessionState
    countdown.innerHTML = sessionMinutes + ":00"
}

let startPause = document.querySelector("#startPause")
startPause.addEventListener("click", () => {
    if (state === "Start") {
        startTimer()
        state = "Pause"
    } else {
        pauseTimer()
        state = "Start"
    }
})

let reset = document.querySelector("#reset")
reset.addEventListener("click", () => {
    resetTimer()
})