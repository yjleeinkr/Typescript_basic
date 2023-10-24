namespace encapsulation {
  type Coffee = {
    shots: number;
    hasMilk: boolean;
  };

  // public : 외부 공개
  // private : 외부에서 볼 수 없고, 접근도 할 수 없다.
  // protected : 외부에선 접근 불가하지만, 해당 클래스를 상속한 자식 클래스에서만 접근 가능하게 설정 가능

  class CoffeeMaker {
    private static BEANS_GRAM_PER_SHOT: number = 7; // CoffeeMaker.BEANS_GRAM_PER_SHOT을 외부에선 볼 수 없다! class level
    private coffeeBeans: number = 0;  // instance (object) level

    private constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans < 0 ? 0 : coffeeBeans;
    }

    // static으로 인스턴스, 오브젝트를 만들어주는 함수를 제공하고 있다면, 누군가 생성자를 이용해서 생성하는 것을 금지하기 위해 contructor에 private을 붙여서 외부에선 항상 static 함수를 사용하게 권장하는 것이 더 좋다.
    static makeMachine(coffeeBeans: number): CoffeeMaker {
      return new CoffeeMaker(coffeeBeans);
    }

    fillCoffeeBeans(beans: number) { // 아무것도 명시하고있지 않으면 public이다.
      if (beans < 0) {
        throw new Error('value for beans should be greater than 0');
      }
      this.coffeeBeans += beans;
    }

    makeCoffee(shots: number): Coffee {
      if (this.coffeeBeans < shots * CoffeeMaker.BEANS_GRAM_PER_SHOT) {
        throw new Error("원두가 부족합니다!");
      }
      this.coffeeBeans -= shots * CoffeeMaker.BEANS_GRAM_PER_SHOT;
      return {
        shots,
        hasMilk: false,
      };
    }

  }
  // const maker = new CoffeeMaker(32);
  // maker.coffeeBeans = 3; // private coffeeBeans를 private으로 해두었기때문에 외부에서 바꿀 수 없다.
  // maker.coffeeBeans = -34; // invalid
  const maker = CoffeeMaker.makeMachine(-3) // 음수를 넣어도 0으로 들어가게 처리
  maker.fillCoffeeBeans(10) 
  console.log(maker)

  class User {
     firstName: string;
     lastName: string;
    // fullName: string; 💩
    get fullName(): string {
      return `${this.firstName} ${this.lastName}`
    }
    constructor(firstName: string, lastName: string) {
      this.firstName = firstName;
      this.lastName = lastName;
      // this.fullName = `${firstName} ${lastName}` 💩
    }
  }

  const user = new User('yj', 'lee')
  console.log(user.fullName) // yj lee
  user.firstName = 'hj' 
  console.log(user)
  console.log(user.fullName) // yj lee
  // hj lee가 아니라 그대로 yj lee가 나온다! 왜냐하면 firstName을 바꿨어도 firstName만 바뀌고, contructor는 오브젝트가 만들어질 때 딱 한번 호출되는 생성자 함수여서 이미 인스턴스 생성 시 fullName이 지정되어버렸기 때문에 바뀌지 않는다.
  // ✨ 이 때 getters를 사용해주면 된다!

  class User2 {
    // firstName: string;  
    // lastName: string;
    // contructor에서 firstName과 lastName에 접근제어자를 붙여주면 멤버 변수를 따로 명시하지 않아도 된다!
    get fullName(): string {
      return `${this.firstName} ${this.lastName}`
    }
    private internalAge = 4;
    get age(): number{
      return this.internalAge;
    }
    set age(num: number) {
      if (num <= 0) throw new Error('어려지고싶나요? 안됩니다.')
      this.internalAge = num;
    }
    constructor(private firstName: string, private lastName: string) {
      // this.firstName = firstName;
      // this.lastName = lastName;
      // contructor에서 firstName과 lastName에 접근제어자를 붙여주면 멤버 변수에 일일이 할당해주지 않아도 된다!
    }
  }
  const user2 = new User2('Jaeyong', 'Lee');
  console.log(user2)
  user2.age = 1; // 쓰기 전용 - 할당해줄 땐 setter가 발동
  console.log(user2.age) // 읽기 전용 - 읽을 땐 getter가 발동
  console.log(user2)
}

