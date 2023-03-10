{
 // Javascript ๐ฉ
  function jsAdd(num1, num2) {
    return num1 + num2;
  } 
  // Typescript โจ
  function add(num1: number, num2: number): number {
    return num1 + num2;
  } 
  // Javascript ๐ฉ
  function jsFetchNum(id) {
    // code ...
    return new Promise((resolve, reject) => {
      resolve(100);
    });
  } 
  // Typescript โจ
  function fetchNum(id: string): Promise<number> {
   // code about fetching ...
    return new Promise((resolve, reject) => {
      resolve(100);
    });
  }

  // Optional parameter : ์ธ์๋ฅผ ์ ๋ฌํ์ง ์์ ๊ฒฝ์ฐ undefined๋ก ์ถ๋ ฅํด์ค๋ค.
  function printName(firstName: string, lastName?: string) {
    console.log(firstName);
    console.log(lastName);
  }
  printName("Steve", "Jobs");
  printName("yj"); // yj ๋ฐ undefined ์ถ๋ ฅ
  printName("yj", undefined);

  // optional parameter ๋์  | ์ฌ์ฉํ๋ฉด?
  function printName2(firstName: string, lastName: string | undefined) {
    console.log(firstName);
    console.log(lastName);
  }
  printName2("Steve", "Jobs");
  // printName2('yj'); // ๋ฌด์กฐ๊ฑด ๋๋ฒ์งธ ์ธ์๊ฐ ๋ค์ด๊ฐ์ค์ผ ์๋ฌ๊ฐ ์๋๋ค.
  printName2("yj", undefined);

  // Default parameter : ์ธ์๋ฅผ ์ ๋ฌํ์ง ์์ ๊ฒฝ์ฐ default๊ฐ์ผ๋ก ์ ํด์ค ๊ฐ์ด ์ถ๋ ฅ๋๋ค.
  function printMessage(message: string = "default message") {
    console.log(message);
  }
  printMessage(); // default message
    
  // Rest parameter : ์ธ์ ๊ฐ์๊ฐ ์ ํด์ ธ ์์ง ์์ ๊ฒฝ์ฐ ์ฌ์ฉ, ์ธ์๋ฅผ ๋ฐฐ์ด๋ก ๋ฐ์์ฌ ์ ์๋ค.
  function addNumbers(...numbers: number[]): number {
    return numbers.reduce((a, b) => a + b);
  };
  console.log(addNumbers(1,2)) // 3
  console.log(addNumbers(1,2,3,4)) // 10
}