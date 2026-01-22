function vowelCount(str) {
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    const counts = { a: 0, e: 0, i: 0, o: 0, u: 0 };
    const lowerStr = str.toLowerCase();

    for (let char of lowerStr) {
        if (vowels.includes(char)) {
            counts[char]++;
        }
    }

    console.log(`Input: ${str}`);
    console.log(`Output: a, e, i, o, and u appear, respectively, ${counts.a}, ${counts.e}, ${counts.i}, ${counts.o}, ${counts.u}`);
}

// Example usage
vowelCount('Le Tour de France');