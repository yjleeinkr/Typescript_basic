// Array

type Student = {
    passed: boolean;
}

const students: Student[] = [{ passed: true }, { passed: true }, { passed: false }];
const result = students.every((student)=>student.passed)
console.log(result)