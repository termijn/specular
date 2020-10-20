exports.info = function(component, message) {
    let now = new Date();
    let date = now.getFullYear() +  '-' + toFixedString(now.getMonth() +1) + '-' + toFixedString(now.getDate());
    let time = toFixedString(now.getHours()) + ':' + toFixedString(now.getMinutes()) + ':' + toFixedString(now.getSeconds());
    console.log(date + ' ' + time  + ' [' + component + '] ' +  message);
}

function toFixedString(i) {
    return i.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
}