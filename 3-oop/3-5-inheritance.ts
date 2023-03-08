{
  type Coffee = {
    shots: number;
    hasMilk: boolean;
  };

  interface CoffeeMaker {
    makeCoffee(shots: number): Coffee;
  }

  class CoffeeMachine implements CoffeeMaker {
    private static BEANS_GRAM_PER_SHOT: number = 7;
    private coffeeBeans: number = 0;

    // 상속해줄 클래스에게 constructor 를 전달해주려면 private 대신 public이나 protected 키워드를 붙인다.
    public constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }

    private grindBeans(shots: number) {
      console.log(`grinding beans for ${shots}`);
      if (this.coffeeBeans < shots * CoffeeMachine.BEANS_GRAM_PER_SHOT) {
        throw new Error("Not enough coffee beans!");
      }
      this.coffeeBeans -= shots * CoffeeMachine.BEANS_GRAM_PER_SHOT;
    }

    private preheat(): void {
      console.log("heating up...🔥");
    }

    private extract(shots: number): Coffee {
      console.log(`Pulling ${shots} shots...☕️`);
      return {
        shots,
        hasMilk: false,
      };
    }
    makeCoffee(shots: number): Coffee {
      this.grindBeans(shots);
      this.preheat();
      return this.extract(shots);
    }

    static makeMachine(coffeeBeans: number): CoffeeMachine {
      return new CoffeeMachine(coffeeBeans);
    }

    fillCoffeeBeans(beans: number) {
      if (beans < 0) {
        throw new Error("value for beans should be greater than 0");
      }
      this.coffeeBeans += beans;
    }
    clean(): void {
      console.log("cleaning the machine...🧼");
    }
  }
  // 상속 키워드 extends : 상속할 클래스를 지정하는 키워드
  class CaffeLatteMachine extends CoffeeMachine {
    constructor(beans: number, public readonly serialNumber: string) {
      // 자식 클래스에서 constructor를 또 선언할 경우, super를 호출해야한다!
      // 그리고 부모 클래스에서 필요했던 생성자 함수의 인자도 똑같이 가져와서 super호출 시 인자로 전달해줘야한다!
      super(beans);
    }
    private steamMilk(): void {
      console.log("steaming some milk...🥛");
    }
    makeCoffee(shots: number): Coffee {
      // super로 부모 클래스의 메소드를 가져다 쓸 수 있다!
      const coffee = super.makeCoffee(shots);
      this.steamMilk();
      return {
        ...coffee,
        hasMilk: true,
      };
    }
  }

  const machine = new CoffeeMachine(23);
  const latteMachine = new CaffeLatteMachine(23, "ABCD");
  const latte = latteMachine.makeCoffee(1);
  console.log(latte);
  /*
    grinding beans for 1
    heating up...🔥 
    Pulling 1 shots...☕️
    steaming some milk...🥛
    { shots: 1, hasMilk: true }
  */
  console.log(latteMachine.serialNumber);
}