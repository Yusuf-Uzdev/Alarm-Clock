const selectMenu = document.querySelectorAll("select"),
 currentTime = document.querySelector("h1"),
 content = document.querySelector(".content"),
 setAlarmBtn = document.querySelector("button"),
 alarmImage = document.querySelector(".alarm-image");


 // is used to store the time when the alarm is set.
let alarmTime, isAlarmSet = false, // is a boolean variable to check whether the alarm is set or not.
ringTone = new Audio("./ringtone.mp3")

for (let i = 12; i  > 0; i--){
    i = i < 10 ? "0" + i : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 59; i >= 0; i --){
    i = i < 10 ? "0" + i : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 2; i  > 0; i--){
    let ampm = i == 1 ? "AM" : "PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

// These three for-loops are used to generate the options for hours, minutes, and AM/PM select tags.
// The first loop generates the hours' options from 12 to 1 in descending order.
// The second loop generates the minutes' options from 59 to 0 in descending order.
// The third loop generates the AM/PM options with only two values (AM and PM).

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

setInterval(() => {
    //getting hours, mins, seconds

    let date = new Date(),
    h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds(),
    ampm = "AM"

    if(h >= 12){
        h = h -12;
        ampm = "PM"

    }

    h = h == 0 ? h = 12 : h;

    h = h < 10 ? "0" + h:h;
    m = m < 10 ? "0" + m:m;
    s = s < 10 ? "0" + s:s;

    currentTime.innerHTML = `${h}:${m}:${s} ${ampm}`;

    if(alarmTime == `${h}:${m} ${ampm}`) {
       ringTone.play();
       ringTone.loop = true;
       document.querySelector(".alarm-image").classList.add("ringing");     
    } else{
    ringTone.pause();
    document.querySelector(".alarm-image").classList.remove("ringing");
}
    
}, 1000);


const setAlarm = () => {

    if(isAlarmSet) { //if alarm set is true
        alarmTime = ""; // clear the value of alarm time
        ringTone.pause(); // pause the ringtone
        content.classList.remove("disable");
        setAlarmBtn.innerHTML = "Set Alarm";
        return isAlarmSet = false; // return isalarmset value to false
    }
    // getting hour, minute, ampm select tag value
    let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
    if(time.includes("Hour") || time.includes("Minuts") || time.includes("AM/PM")){
        return alert("Please, select a valid time to set Alarm!")
    }
    isAlarmSet = true;
    alarmTime = time;
    content.classList.add("disable");
    setAlarmBtn.innerHTML = "Clear Alarm";
}

setAlarmBtn.addEventListener("click",setAlarm);





