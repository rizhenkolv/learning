var timeMoning = "06:00";
var now = new Date();
var hours = now.getHours();
var minutes = now.getMinutes();
hours = hours.toString().length == 1 ? '0' + hours : hours.toString();
minutes = minutes.toString().length == 1 ? '0' + minutes : minutes.toString();
var currentTime = hours + ":" + minutes;
console.log(currentTime);

if (timeMoning == currentTime) {
    return true;
} else {
    return false;
}

var movementTimestamp = new Date(1676369191495);
var hoursMovement = movementTimestamp.getHours();
var minutesMovement = movementTimestamp.getMinutes();
hoursMovement = hoursMovement.toString().length == 1 ? '0' + hoursMovement : hoursMovement.toString();
minutesMovement = minutesMovement.toString().length == 1 ? '0' + minutesMovement : minutesMovement.toString();
var movementTime = hoursMovement + ":" + minutesMovement;
var differrence = currentTime - movementTimestamp;

