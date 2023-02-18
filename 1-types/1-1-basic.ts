{
  // number
  let num: number = -7;

  // string
  let str: string = "hi";

  // boolean
  let bool: boolean = false;

  // undefined
  let name: undefined; // 💩 이렇게 undefined나 null 로만 단독적으로 정의하는 경우는 거의 없다.
  let age: number | undefined; // 대부분 이렇게 optional하게 정의할때 쓴다.
  age = undefined;
  age = 30;
  // 무언가를 찾으면 number 를 반환하거나 없으면 undefined를 반환할 경우
  function find(): number | undefined {
    return 1;
    // return undefined;
  }
  // null 💩
  let person: string | null; // 보편적으론 undefined를 많이 쓴다.
  person = "yj";

  // unknown 💩
  // 타입이 없는 자바스크립트와 연동해서 쓰기 위해 있다. 되도록 안 쓰는게 좋다.
  let notSure: unknown;
  notSure = 1;
  notSure = true;

  // any 💩
  let anything: any = 0;
  anything = "hello";

  // null, unknown, any 는 거의 쓰지 않는다.

  // void : 아무것도 리턴하지 않는 함수를 정의할 때 쓴다.
  // 보통은 함수가 리턴하는 타입을 쓰지만, 출력만 하는 함수일 경우 void를 쓰거나, 아무것도 쓰지 않는다. 이건 코딩 컨벤션이라 회사마다 다르다.
  function printOnly(): void {
    console.log("hi");
    return;
  }

  // never : 핸들링할 수 없는 에러가 발생했을 때처럼 절대 리턴할 경우가 없는 함수일 경우 쓴다.
  function throwError(message: string): never {
    // 1. message -> server로 보내서 로그를 남기고 에러를 던지는 경우
    throw new Error(message);
    // 2. 계속 루프를 도는 로직일 경우
    while (true) {}
    // return을 쓸 수 없다, 쓸 경우 에러가 난다.
  }

  // object
  let obj: object; // 💩 배열이건 객체건 어떤 타입이든 담을 수 있는 타입은 되도록 쓰지 않는 것이 좋다.
  function acceptSomeObject(obj: object) {}
  acceptSomeObject({ namae: "Ellie" });
  acceptSomeObject([1, 2, 3]);
}