function pluralize(noun, number) {
    // 1. If number is 1, return singular
    if (number === 1) {
        return `${number} ${noun}`;
    } 
    
    // 2. Handle specific collective nouns (Exceptions)
    if (noun === "sheep") {
        return `${number} sheep`;
    }
    if (noun === "goose") {
        return `${number} geese`;
    }

    // 3. Default rule: add "s"
    return `${number} ${noun}s`;
}

// Test Cases
console.log(pluralize("cat", 5));    // "5 cats"
console.log(pluralize("dog", 1));    // "1 dog"
console.log(pluralize("sheep", 3));  // "3 sheep"
console.log(pluralize("goose", 2));  // "2 geese"
