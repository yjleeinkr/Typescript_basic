{
  // Type Assertions 💩
  // 타입에 대해서 정말 100% 확신을 가지고 있을 때
  // 타입이 없는 자바스크립트와 같이 써야할 때 불가피하게 쓸 수 있다.
  // 자바스크립트이기 때문에 타입스크립트는 뭘 리턴하는지 전혀 알 수 없지만, 내부적으로 무조건 특정 타입을 리턴하는 함수가 있다고 할때,
  function jsStrFunc(): any {
    return "hello";
    // return 2  - (result as string).length : 코드를 작성할 땐 에러가 뜨지 않지만 앱을 실행하면 undefined 로 출력됨
  }

  const result = jsStrFunc();
  console.log(result.length); // 타스는 이 함수가 뭘 리턴하는지 몰라서 string과 관련된 메소드가 자동으로 불러와지지 않는다..
  console.log((result as string).length);
  console.log((<string>result).length);

  const wrong: any = 5;
  console.log((wrong as Array<number>).push(1)); // 😱
  // 에러 발생하고 앱이 종료된다. - 자바스크립트와 똑같이 작동하기 때문에 되도록 쓰지 않는게 좋다.

  function findNumbers(): number[] | undefined {
    return undefined;
  }

  const numbers = findNumbers();
  // const numbers = findNumbers()!;
  numbers!.push(2); // 😱 무조건 타입을 장담해버림 (이건 무조건 number를 가진 배열이야)
    
  const button = document.querySelector('class')!; // 100% 상황일 때 쓰는 게 좋다.
}