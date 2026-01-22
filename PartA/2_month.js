function createMonthConverter() {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    return function(input) {
        const num = Math.floor(Number(input)); // Strip decimals and convert to number
        
        if (isNaN(num) || num < 1 || num > 12) {
            return "Bad Number";
        }
        
        return months[num - 1];
    };
}

const getMonth = createMonthConverter();
console.log(getMonth(3.5)); // "March"
console.log(getMonth(13));  // "Bad Number"