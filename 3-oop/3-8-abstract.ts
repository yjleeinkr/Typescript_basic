{
  // 추상화 활용! - abstract
  // 상속 클래스를 사용할 때 무언가 반복되는 이 클래스에서 절차적으로 진행되야하는 것이 있고, 어떤 특정한 행동만 자식 클래스에서 변형해서 다르게 쓴다면,
  // abstract 클래스를 써볼 수 있다!
  type Coffee = {
    shots: number;
    hasMilk?: boolean;
    hasSugar?: boolean;
  };

  interface CoffeeMaker {
    makeCoffee(shots: number): Coffee;
  }

    // 추상 클래스는 그 자체로 인스턴스, 오브젝트를 만들 수가 없다! new CoffeeMachine 이런 걸 못함
    // 대신 필요한 것들(함수 인자, 함수의 리턴값) 을 추상적으로 정의만 해놓는다. 
  abstract class CoffeeMachine implements CoffeeMaker {
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

      // 자식 클래스들마다 달라질 수 있는 행동이 있다면, 함수 앞에 abstract를 붙여준다.
      // abstract가 붙은 함수는 자식 클래스에서 그 세부사항을 구현할 것이므로 함수의 구현사항은 작성하지 않고 정의만 해둔다.
    protected abstract extract(shots: number): Coffee
   
    makeCoffee(shots: number): Coffee {
      this.grindBeans(shots);
      this.preheat();
      return this.extract(shots);
    }

    // static makeMachine(coffeeBeans: number): CoffeeMachine {
    //   return new CoffeeMachine(coffeeBeans);
    // }

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
    // CoffeeMachine을 상속받는 자식 클래스에서 makeCoffee를 쓸 때 super를 까먹을 수도 있다.
    // 그렇게 할 경우, 부모 클래스에서 makeCoffee 시 거쳤던 grindBeans, preheat 등의 절차들을 실수로 놓칠 수 있다.
    // 이런 것들을 안전하게 하기 위해서 abstract를 사용할 수 있다!
    // makeCoffee(shots: number): Coffee {
    //   const coffee = super.makeCoffee(shots);
    //   this.steamMilk();
    //   return {
    //     ...coffee,
    //     hasMilk: true,
    //   };
    // }
      // makeCoffee를 오버롸이팅 할 필요가 없다.
    protected extract(shots: number): Coffee {
        this.steamMilk()
        return {
            shots,
            hasMilk: true
        }
    }
  }

  class SweetCoffeeMachine extends CoffeeMachine {
    protected extract(shots: number): Coffee {
      return {
        shots,
        hasSugar: true,
      };
    }
  }

  const machines = [
    // new CoffeeMachine(16),
    new CaffeLatteMachine(16, "1"),
    new SweetCoffeeMachine(16),
    // new CoffeeMachine(16),
    new CaffeLatteMachine(16, "1"),
    new SweetCoffeeMachine(16),
  ];

  machines.forEach((machine) => {
    console.log("----------------");
    machine.makeCoffee(2);
  });
}
