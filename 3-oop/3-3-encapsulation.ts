{
  type Coffee = {
    shots: number;
    hasMilk: boolean;
  };

  // Encapsulation - 은닉화, 캡슐화 
  // 1. 서로 연관된 데이터, 함수를 한데 묶어주자
  // 2. 클래스 내부의 로직들이 외부에서 보이지 않도록 꼭 필요한 것만 노출하자!

  // public - 아무 키워드도 쓰지 않으면 public이 default라 외부에서 접근이 가능하다
  // private - 외부에서 접근 불가하지만 클래스 내부에서만 접근 가능
  // protected - 외부에선 접근할 수 없지만 해당 클래스를 상속한 자식 클래스 내부에선 접근 가능

  class CoffeeMaker {
    private static BEANS_GRAM_PER_SHOT: number = 7;
    // 외부에선 보이지 않고 직접적인 변경도 불가하다
    // 선언된 클래스 내에서만 접근 가능, 내부적으로 상수값이 필요할 때 사용
    private coffeeBeans: number = 0; // instance (object) level

    private constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }

    makeCoffee(shots: number): Coffee {
      if (this.coffeeBeans < shots * CoffeeMaker.BEANS_GRAM_PER_SHOT) {
        throw new Error("Not enough coffee beans!");
      }
      this.coffeeBeans -= shots * CoffeeMaker.BEANS_GRAM_PER_SHOT;
      return {
        shots,
        hasMilk: false,
      };
    }

    // static 함수
    // 클래스 내부의 어떤 속성값도 필요하지 않기 때문에 static을 붙여준다.
    // 어떤 오브젝트를 만들어주는 함수를 제공해준다면 누군가가 생성자를 이용해서 생성하는 것을 금지하기 위해 쓴다.
    // 이 경우 contructor 에 private을 불여 외부에선 항상 static 함수를 사용하게끔 권장한다고 함
    // ✨ 상속의 구조를 외부에서 신경쓰지 않도록 static 함수를 만들어 인스턴스를 생성할 수 있게 하는 것도 캡슐화의 하나라고 볼 수 있다.
    // 인스턴스 생성하는데 복잡한 로직이 들어간다면 static 함수를 통해 복잡성을 심플하게 만들 수 있다.
    static makeMachine(coffeeBeans: number): CoffeeMaker {
      return new CoffeeMaker(coffeeBeans);
    }

    // private 설정으로 외부에서 접근 불가한 데이터를 변경시켜주는 함수는 public으로 만들었다.
    // 유효성 검사도 할 수 있어서 안정성 있다.
    fillCoffeeBeans(beans: number) {
      if (beans < 0) {
        throw new Error("value for beans should be greater than 0");
      }
      this.coffeeBeans += beans;
    }
  }

  // const maker = new CoffeeMaker(32);
  // maker.fillCoffeeBeans(100)
  // maker.coffeeBeans = -34;
  // CoffeeMaker { coffeeBeans: -34 } invalid!
  // public 일때 외부에서 값을 바꿀 수 있기 때문에 위험하다
  //   console.log(maker);

  class User {
    firstName: string;
    lastName: string;
    // fullName: string;
    get fullName(): string {
      return `${this.firstName} ${this.lastName}`;
    }

    constructor(firstName: string, lastName: string) {
      this.firstName = firstName;
      this.lastName = lastName;
      // this.fullName = `${this.firstName} ${this.lastName}`; // 대신 getter를 사용해준다.
    }
  }

  const user = new User("Steve", "Jobs");
  console.log(user);
  // User { firstName: 'Steve', lastName: 'Jobs', fullName: 'Steve Jobs' }
  console.log(user.fullName); // Steve Jobs
  user.firstName = "yj";
  console.log(user.fullName); // yj Jobs
  // User { firstName: 'yj', lastName: 'Jobs', fullName: 'Steve Jobs' }
  // firstName을 바꿨어도 firstName만 바뀌고 이미 fullName이 정의 시 지정되어버렸기 때문에 바뀌지 않는다.
  // 이를 개선하기 위해 getter를 사용해준다

  class User2 {
    get fullName(): string {
      return `${this.firstName} ${this.lastName}`;
    }
    private internalAge = 4;
    get age(): number {
      return this.internalAge;
    }
    set age(num: number) {
      if (num < 0) {
        // 유효성 검사를 넣을 수도 있다.
      }
      this.internalAge = num;
    }
    constructor(private firstName: string, private lastName: string) {}
  }
  const user1 = new User2("yj", "Lee");
  console.log(user1); // User2 { firstName: 'yj', lastName: 'Lee', internalAge: 4 }
  user1.age = 8;
  console.log(user1); // User2 { firstName: 'yj', lastName: 'Lee', internalAge: 8 }
}
