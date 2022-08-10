function getday() {
    var today = new Date();
    var options = {
        weekday:"long",
        day:"numeric",
        month:"long"
    }
    
    var curDay = today.toLocaleDateString("en-US",options);
    return curDay
}

module.exports = getday;