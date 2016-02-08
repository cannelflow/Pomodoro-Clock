// Initialize all your variables here, so you know what you're working with
var breakMinutes = 5, // always hold the total break minutes
  workMinutes = 25, // always hold the total work minutes
  breakTimer = breakMinutes * 60, // will be used to count down when the break timer starts
  workTimer = workMinutes * 60, // will be used to count down when the work timer starts
  display = document.querySelector("#timer"),
  status = 'Work!',
  isPaused = false, //determines if paused or not
  t;

//Control For Break Length
$("#minus").click(function () {
    if (breakMinutes > 1) {
        breakMinutes--;
        $("#breaktime").text(breakMinutes); // update total break time
    }
});
$("#plus").click(function () {
    breakMinutes++;
    $("#breaktime").text(breakMinutes); // update total break time
});

//control for Session Time
$("#minus2").click(function () {
    if (workMinutes > 1) {
        workMinutes--;
        $("#worktime").text(workMinutes); // update total work time
        $('#timer').text(workMinutes + ':00'); // update timer text
    }
});
$("#plus2").click(function () {
    workMinutes++;
    $("#worktime").text(workMinutes); // update total work time
    $("#timer").text(workMinutes + ':00'); // update timer text 
});

function startTimer() {
    t = setInterval(function () {
        if (status === 'Work!') {
            if (workTimer === 0) {
                status = 'Break';
                $('#status').text(status);
                breakTimer = breakMinutes * 60; // reset breaktimer to beginning
                updateDisplay(breakTimer);
            }
            else if (workTimer > 0) {
                workTimer -= 1;
                updateDisplay(workTimer);
            }
        }
        else if (status === 'Break') {
            if (breakTimer === 0) {
                status = 'Work!';
                $('#status').text('Work!');
                workTimer = workMinutes * 60; // reset worktimer to beginning
                updateDisplay(workTimer);
            }
            else if (breakTimer > 0) {
                breakTimer--;
                updateDisplay(breakTimer);
            }
        }
    }, 1000);
}

//removed it from the startTimer so it is much easier to read the code
function updateDisplay(timer) {
    var minutes, seconds;
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;
}

function startCount() {
    if (isPaused) {
        startTimer(); //if isPaused is true then it continues where it left off.
        isPaused = false;
    } else {
        clearTimeout(t);
        workTimer = workMinutes * 60; // if isPaused is false, then reset the timer and start at the beginning
        updateDisplay(workTimer);
        startTimer();
    }
}

function pauseCount() {
    clearTimeout(t);
    isPaused = true;
}

function resetCount() {
    pauseCount();
    workTimer = workMinutes * 60; // reset the work timer
    brakTimer = breakMinutes * 60; // reset the break timer
    updateDisplay(workTimer) // resets timer text to total work time
}