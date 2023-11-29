namespace constraints {
  // 제네릭에 조건 constraints 을 걸어보자. 
  interface Employee {
    pay(): void;
  }

  class FullTimeEmployee implements Employee {
    pay(): void {
      console.log('full time! 💰')
    }
    workFullTime() {
      
    }
  }

  class PartTimeEmployee implements Employee {
    pay(): void {
      console.log('part time! 💵')
    }
    workPartTime() {
    }
  }
  // 💩 세부적인 타입을 인자로 받아서 추상적인 타입으로 리턴하는 함수는 좋지 않다!
  function payBad(employee: Employee): Employee {
    employee.pay();
    return employee;
  }

  // ✅ 제네릭에 조건을 걸어서 제한된 범위 내에서 일반화된 타입 사용이 가능하다.
  // extends 키워드를 통해 특정 인터페이스를 확장, 구현한 인자만 가능하게 설정하는 것이다.
  function pay<T extends Employee>(employee: T): T {
    // 제네릭이긴하지만~ Employee라는 인터페이스를 확장한 타입만 가능해~~
    employee.pay();
    return employee;
  }

  const yj = new FullTimeEmployee();
  const hc = new PartTimeEmployee();

  yj.workFullTime();
  hc.workPartTime();
  const yjAfterPayBad = payBad(yj);
  const hcAfterPayBad = payBad(hc);
  // yjAfterPay.workFullTime(); // 💩 에러발생! workFullTime()이 사라짐
  // 왜냐하면 pay라는 함수는 interface를 리턴하기 때문에 클래스에 각각 정의했던 세부 속성은 잃어버리기 때문이다.
  // 타입에 자신이 있다면, 아래와 같이 Type assertion을 사용할 수 있지만 되도록 쓰지 않는게 좋다.
  const yjAfterPayNotGood = payBad(yj) as FullTimeEmployee;
  yjAfterPayNotGood.workFullTime();

  const yjAfterPay = pay(yj);
  const hcAfterPay = pay(hc);
  yjAfterPay.workFullTime();
  hcAfterPay.workPartTime();

  const obj = {
    name: 'yj',
    age: 30,
  }

  const obj2 = {
    pet: 'hoochu 🐈‍⬛',
    age: 3,
  }

  // 타입이 보장되면서 객체와 키값을 넣어서 값을 가져오는 함수를 만들어보면?
  // keyof obj : obj가 가지고 있는 키의 타입을 뜻한다.
  function getValue<T, K extends keyof T>(object: T, key: K) : T[K] {
    return object[key];
  }

  console.log(getValue(obj, 'name'))
  console.log(getValue(obj, 'age'))
  console.log(getValue(obj2, 'pet'))
  console.log(getValue(obj2, 'age'))

}