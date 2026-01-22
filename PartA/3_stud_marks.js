function createStudent(usn, subCode, subName, cieMarks, seeMarks) {
    // Private variables
    let cie = cieMarks;
    let see = seeMarks;

    return {
        getDetails: function() {
            const total = cie + see;
            return `USN: ${usn}\nSubject: ${subCode} - ${subName}\nTotal Marks: ${total}`;
        }
    };
}

const student1 = createStudent("1MS23CS001", "CS31", "Data Structures", 45, 48);
console.log(student1.getDetails());