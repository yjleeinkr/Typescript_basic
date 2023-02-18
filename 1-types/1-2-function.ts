{
 // Javascript 💩
  function jsAdd(num1, num2) {
    return num1 + num2;
  } 
  // Typescript ✨
  function add(num1: number, num2: number): number {
    return num1 + num2;
  } 
  // Javascript 💩
  function jsFetchNum(id) {
    // code ...
    return new Promise((resolve, reject) => {
      resolve(100);
    });
  } 
  // Typescript ✨
  function fetchNum(id: string): Promise<number> {
   // code about fetching ...
    return new Promise((resolve, reject) => {
      resolve(100);
    });
  }

  // Optional parameter : 인자를 전달하지 않을 경우 undefined로 출력해준다.
  function printName(firstName: string, lastName?: string) {
    console.log(firstName);
    console.log(lastName);
  }
  printName("Steve", "Jobs");
  printName("yj"); // yj 및 undefined 출력
  printName("yj", undefined);

  // optional parameter 대신 | 사용하면?
  function printName2(firstName: string, lastName: string | undefined) {
    console.log(firstName);
    console.log(lastName);
  }
  printName2("Steve", "Jobs");
  // printName2('yj'); // 무조건 두번째 인자가 들어가줘야 에러가 안난다.
  printName2("yj", undefined);

  // Default parameter : 인자를 전달하지 않을 경우 default값으로 정해준 값이 출력된다.
  function printMessage(message: string = "default message") {
    console.log(message);
  }
  printMessage(); // default message
    
  // Rest parameter : 인자 개수가 정해져 있지 않을 경우 사용, 인자를 배열로 받아올 수 있다.
  function addNumbers(...numbers: number[]): number {
    return numbers.reduce((a, b) => a + b);
  };
  console.log(addNumbers(1,2)) // 3
  console.log(addNumbers(1,2,3,4)) // 10
}