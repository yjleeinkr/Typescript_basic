{
  // Enum

  // Javascript에는 존재하지 않는 타입이다.
  // 최대한 enum처럼 정의하자면 아래와 같다.
  // 변하지 않는 값 (상수)을 나타낼 때 스네이크 케이스로 정의하거나
  // 같은 그룹으로 묶을 수 있는 상수는 Object.freeze()로 정의했다.
  const MAX_NUM = 6;
  const DAYS_ENUM = Object.freeze({ Monday: 0, Tuesday: 1, Wednesday: 2 });

  // Typescript
  enum Days {
    Monday = 1,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday,
  }

  console.log(Days.Tuesday); // 1 자동으로 0부터 숫자를 매겨준다. (숫자 자동 할당)
  // 첫 인자 Monday에 1을 부여하면 1부터 시작한다.

  // enum은 되도록 쓰지 않는게 좋다. 💩
  let day = Days.Friday;
  day = 10; // 숫자 자동 할당 시 타입 보장이 되지 않는다.
  // 요일은 0~6 || 1~7 까지 있으므로 위에서 10은 유효하지 않은 넘버이다)
  console.log(day);
  // 따라서 보통 union type을 써주자
  type DaysOfWeek = "Monday" | "Tuesday" | "Wednesday";
  let dayOfWeek: DaysOfWeek = "Monday";

  // dayOfWeek = 'yj' 할 경우 에러
}