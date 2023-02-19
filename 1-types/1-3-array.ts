
{
    // Array 배열 정의 방법
    const fruits: string[] = ["🍏", "🍓"];
    const scores: Array<number> = [1, 2, 3];
    function printArray(fruits: readonly string[]) {
        // fruits.push('🍌') 인자 타입 앞에 readonly 속성이 붙으면 인자를 변경할 수 없다.
        // 하지만 아직까진 readonly Array<string> 이렇겐 쓸 수 없다.
        // 오직 readonly string[]만 쓸 수 있다. (배열 및 튜플 리터럴 형식에서만 쓸 수 있다)
        console.log(fruits);
    }
    printArray(fruits);

    // Tuple : 서로 다른 타입을 함께 가질 수 있는 배열이다.
    let student: [string, number];
    student = ["yj", 123];
    // Tuple 대신 interface, type alias, class 로 대체해서 쓰는게 좋다.
    // 왜냐면 student[0], student[1] 은 해당 데이터가 뭘 가리키는지 쉽게 알 수 없어 가독성이 떨어진다. 객체를 썼다면, student.name, student.score 이렇게 명시적으로 가져올 수 있다.
    const [name, score] = student; // 대신 object destructuring을 사용하면 가독성이 올라간다.
    console.log(name, score)

    // 그렇다면 tuple은 어디서 쓰나? 바로 React에서 배웠던 useState가 tuple의 좋은 예시이다!
    // import React, { useState } from 'react';
    // const [count, setCount] = useState(0);
    // [S, Dispatch<SetStateAction<S>>] 
    // 무언가 동적으로 리턴하는데 class나 interface로 묶기가 애매하고, 동적으로 관련 있는 다른 타입의 데이터를 묶어서 사용자가 이름을 정의해서 쓸 경우 Tuple이 유용할 수 있다.

}