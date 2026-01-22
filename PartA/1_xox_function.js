// function translate(text) {
//     // Regex matches any single consonant, case-insensitive
//     return text.replace(/([bcdfghjklmnpqrstvwxyz])/gi, "$1o$1");
// }

// console.log(translate("this is fun")); // "tothohisos isos fofunon"


function translate(text) {
    let result = "";
    const consonants = "bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ";

    for (let i = 0; i < text.length; i++) {
        let char = text[i];

        // Check if the current character exists in our consonant list
        if (consonants.includes(char)) {
            result += char + "o" + char;
        } else {
            result += char;
        }
    }
    return result;
}

console.log(translate("this is fun")); // "tothohisos isos fofunon"