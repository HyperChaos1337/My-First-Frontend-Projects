const currentDate = new Date();
exports.date = currentDate;

exports.printMessage = function (name){
    const hour = currentDate.getHours();
    if(hour > 16)
        console.log("Добрый вечер,", name);
    else if(hour > 10)
        console.log("Добрый день,", name);
    else
        console.log("Доброе утро,", name);
}