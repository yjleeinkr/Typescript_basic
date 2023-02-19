{
    let text = 'hello'
    // 자동 타입 추론
    // 하지만 function의 인자나 return값은 타입 추론을 사용하지 않는 게 좋다.
    // 명시해주는 것이 best

    function addNum(num1: number, num2: number) {
        return num1 + num2
    }
}