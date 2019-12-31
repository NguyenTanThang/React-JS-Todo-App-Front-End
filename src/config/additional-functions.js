const isNull = (obj) => {
    if (
        obj === undefined || obj === "undefined" ||
        obj === null || obj === "null" || obj === ""
    ) return true;
    else return false;
}

const isAnyNull = (...objs) => {
    console.log(objs);
    let returnedValue = false;

    for (let index = 0; index < objs.length; index++) {
        const element = objs[index];
        if (isNull(element)) {
            returnedValue = true;
            break;
        }
    }

    return returnedValue;
}

const getReadableDate = (jsonDate) => {
    const dateObj = new Date(jsonDate);

    let months = [];
    months[0] = "January";
    months[1] = "February";
    months[2] = "March";
    months[3] = "April";
    months[4] = "May";
    months[5] = "June";
    months[6] = "July";
    months[7] = "August";
    months[8] = "September";
    months[9] = "October";
    months[10] = "November";
    months[11] = "December";

    let year = dateObj.getFullYear();
    let month = months[dateObj.getMonth()];
    let date = dateObj.getDate();

    return `${date} - ${month} - ${year}`;
}

const getDateForInput = (jsonDate) => {
    const dateObj = new Date(jsonDate);

    let months = [];
    months[0] = "01";
    months[1] = "02";
    months[2] = "03";
    months[3] = "04";
    months[4] = "05";
    months[5] = "06";
    months[6] = "07";
    months[7] = "08";
    months[8] = "09";
    months[9] = "10";
    months[10] = "11";
    months[11] = "12";

    let year = dateObj.getFullYear();
    let month = months[dateObj.getMonth()];
    let date = dateObj.getDate().toString();

    const dateCharArray = date.split("");
    if (dateCharArray.length === 1){
        date = "0" + date;
    }

    return `${year}-${month}-${date}`;
}

module.exports = {
    isNull,
    isAnyNull,
    getReadableDate,
    getDateForInput
}