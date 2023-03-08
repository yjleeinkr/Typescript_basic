{
  type Coffee = {
    shots: number;
    hasMilk?: boolean;
    hasSugar?: boolean;
  };

  interface CoffeeMaker {
    makeCoffee(shots: number): Coffee;
  }

  class CoffeeMachine implements CoffeeMaker {
    private static BEANS_GRAM_PER_SHOT: number = 7;
    private coffeeBeans: number = 0;

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

  class CaffeLatteMachine extends CoffeeMachine {
    constructor(beans: number, public readonly serialNumber: string) {
      super(beans);
    }
    private steamMilk(): void {
      console.log("steaming some milk...🥛");
    }
    makeCoffee(shots: number): Coffee {
      const coffee = super.makeCoffee(shots);
      this.steamMilk();
      return {
        ...coffee,
        hasMilk: true,
      };
    }
  }

  class SweetCoffeeMachine extends CoffeeMachine {
    makeCoffee(shots: number): Coffee {
      const coffee = super.makeCoffee(shots);
      return {
        ...coffee,
        hasSugar: true,
      };
    }
  }

  const sweetCoffee = new SweetCoffeeMachine(32).makeCoffee(3);
  console.log(sweetCoffee);

  const machines = [
    new CoffeeMachine(16),
    new CaffeLatteMachine(16, "1"),
    new SweetCoffeeMachine(16),
    new CoffeeMachine(16),
    new CaffeLatteMachine(16, "1"),
    new SweetCoffeeMachine(16),
  ];
  // machines은 coffeeMachine[] 이자 coffeeMaker[] 이다!
  // coffeeMaker[] 를 지정하면 해당 인터페이스에 규약된 makeCoffee만 사용할 수 있다.

  machines.forEach((machine) => {
    console.log("----------------");
    machine.makeCoffee(2);
    // 다형성 : 동일한 함수를 어떤 클래스인지 구분하지 않고 공통된 api를 호출할 수 있다는 게 큰 장점이다!
    // 하나의 인터페이스나 부모 클래스를 상속한 자식 클래스들이 인터페이스나 부모의 함수들을 따라가면서 다른 방식으로 다양하게 구성함으로써 조금 더 다형성을 만들어 볼 수 있는 걸 뜻한다.
  });
}
