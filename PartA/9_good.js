function notBad(str) {
    const notIndex = str.indexOf('not');
    const badIndex = str.indexOf('bad');

    // Check if both exist and 'bad' comes after 'not'
    if (notIndex !== -1 && badIndex !== -1 && badIndex > notIndex) {
        // Replace from the start of 'not' to the end of 'bad'
        return str.slice(0, notIndex) + 'good' + str.slice(badIndex + 3);
    }

    return str;
}

console.log(notBad('This dinner is not that bad!')); // "This dinner is good!"
console.log(notBad('This dinner is bad!'));          // "This dinner is bad!"