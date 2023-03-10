{
  // number
  let num: number = -7;

  // string
  let str: string = "hi";

  // boolean
  let bool: boolean = false;

  // undefined
  let name: undefined; // ๐ฉ ์ด๋ ๊ฒ undefined๋ null ๋ก๋ง ๋จ๋์ ์ผ๋ก ์ ์ํ๋ ๊ฒฝ์ฐ๋ ๊ฑฐ์ ์๋ค.
  let age: number | undefined; // ๋๋ถ๋ถ ์ด๋ ๊ฒ optionalํ๊ฒ ์ ์ํ ๋ ์ด๋ค.
  age = undefined;
  age = 30;
  // ๋ฌด์ธ๊ฐ๋ฅผ ์ฐพ์ผ๋ฉด number ๋ฅผ ๋ฐํํ๊ฑฐ๋ ์์ผ๋ฉด undefined๋ฅผ ๋ฐํํ  ๊ฒฝ์ฐ
  function find(): number | undefined {
    return 1;
    // return undefined;
  }
  // null ๐ฉ
  let person: string | null; // ๋ณดํธ์ ์ผ๋ก  undefined๋ฅผ ๋ง์ด ์ด๋ค.
  person = "yj";

  // unknown ๐ฉ
  // ํ์์ด ์๋ ์๋ฐ์คํฌ๋ฆฝํธ์ ์ฐ๋ํด์ ์ฐ๊ธฐ ์ํด ์๋ค. ๋๋๋ก ์ ์ฐ๋๊ฒ ์ข๋ค.
  let notSure: unknown;
  notSure = 1;
  notSure = true;

  // any ๐ฉ
  let anything: any = 0;
  anything = "hello";

  // null, unknown, any ๋ ๊ฑฐ์ ์ฐ์ง ์๋๋ค.

  // void : ์๋ฌด๊ฒ๋ ๋ฆฌํดํ์ง ์๋ ํจ์๋ฅผ ์ ์ํ  ๋ ์ด๋ค.
  // ๋ณดํต์ ํจ์๊ฐ ๋ฆฌํดํ๋ ํ์์ ์ฐ์ง๋ง, ์ถ๋ ฅ๋ง ํ๋ ํจ์์ผ ๊ฒฝ์ฐ void๋ฅผ ์ฐ๊ฑฐ๋, ์๋ฌด๊ฒ๋ ์ฐ์ง ์๋๋ค. ์ด๊ฑด ์ฝ๋ฉ ์ปจ๋ฒค์์ด๋ผ ํ์ฌ๋ง๋ค ๋ค๋ฅด๋ค.
  function printOnly(): void {
    console.log("hi");
    return;
  }

  // never : ํธ๋ค๋งํ  ์ ์๋ ์๋ฌ๊ฐ ๋ฐ์ํ์ ๋์ฒ๋ผ ์ ๋ ๋ฆฌํดํ  ๊ฒฝ์ฐ๊ฐ ์๋ ํจ์์ผ ๊ฒฝ์ฐ ์ด๋ค.
  function throwError(message: string): never {
    // 1. message -> server๋ก ๋ณด๋ด์ ๋ก๊ทธ๋ฅผ ๋จ๊ธฐ๊ณ  ์๋ฌ๋ฅผ ๋์ง๋ ๊ฒฝ์ฐ
    throw new Error(message);
    // 2. ๊ณ์ ๋ฃจํ๋ฅผ ๋๋ ๋ก์ง์ผ ๊ฒฝ์ฐ
    while (true) {}
    // return์ ์ธ ์ ์๋ค, ์ธ ๊ฒฝ์ฐ ์๋ฌ๊ฐ ๋๋ค.
  }

  // object
  let obj: object; // ๐ฉ ๋ฐฐ์ด์ด๊ฑด ๊ฐ์ฒด๊ฑด ์ด๋ค ํ์์ด๋  ๋ด์ ์ ์๋ ํ์์ ๋๋๋ก ์ฐ์ง ์๋ ๊ฒ์ด ์ข๋ค.
  function acceptSomeObject(obj: object) {}
  acceptSomeObject({ namae: "Ellie" });
  acceptSomeObject([1, 2, 3]);
}