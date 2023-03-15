{
  interface Employee {
    pay(): void;
  }

  class FullTimeEmployee implements Employee {
    pay() {
      console.log("full time!");
    }
    workFullTime() {}
  }

  class PartTimeEmployee implements Employee {
    pay() {
      console.log("part time!");
    }
    workPartTime() {}
  }

  // 💩 세부적인 타입(추상적인 인터페이스를 모두 받을 수있는 자식 클래스들)을 인자로 받아서 정말 추상적인 타입으로 다시 리턴하는 함수는 좋지 않다!
  function payBad(employee: Employee): Employee {
    employee.pay();
    return employee;
  }

  // ✨ 아무 타입이나 받지 않고 제네릭에 조건을 걸어준다. 
  // 💫 extends 키워드를 통해 특정 인터페이스를 확장, 구현한 인자만 가능하게 설정한다.
  function pay<T extends Employee>(employee: T): T {
      employee.pay()
      return employee;
  }

  const yj = new FullTimeEmployee();
  const studentYj = new PartTimeEmployee();
  yj.workFullTime();
  studentYj.workPartTime();

  const yjAfterPay = pay(yj);
  const studentYjAfterPay = pay(studentYj);
  // yjAfterPay.workFullTime() 을 하지 못함! 왜냐하면 Employee라는 인터페이스를 리턴하기 때문에 원래의 FullTimeEmployee의 속성을 잃어버린다.
  // 정말 타입에 자신있다면, 아래와 같이 Type Assertions - as 를 사용할 수도 있겠지만 좋지 않다
  //   const yjAfterPay2 = pay(yj) as FullTimeEmployee;
  //   yjAfterPay2.workFullTime();
    
    // keyof obj : obj가 가지고 있는 키의 타입을 말한다.
    function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
      return obj[key]
    }

    const obj = { name: 'yj', age: 30 };
    console.log(getValue(obj, 'name'))
    console.log(getValue(obj, 'age'))
    // console.log(getValue(obj, 'wrongKey')) 제네릭 keysof 로 특정 객체의 키 타입을 반환해주기 때문
}