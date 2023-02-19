{
    // Type alias 
    type Student = {
        name: string,
        age: number,
    }
    const student: Student = {
        name: 'yj',
        age: 31
    }
    // String Literal Types
    type Json = 'json';
    const json: Json = 'json';
    // 다른 문자열 넣을 경우 에러 
}