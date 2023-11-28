namespace abstract {
  // 어떤 상속 클래스를 이용할 때 무언가 반복되는 절차가 있고, 어떤 특정한 기능만 자식 클래스에서 행동이 달라진다면 추상 클래스를 만들어 볼 수 있다.
  type CoffeeCup = {
    shots: number;
    hasMilk?: boolean;
    hasSugar?: boolean;
  };

  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  // 추상 클래스는 자체적으로 인스턴스를 만들 수 없다.
  abstract class CoffeeMachine implements CoffeeMaker {
    private static BEANS_GRAM_PER_SHOT: number = 7; 
    private coffeeBeans: number = 0; 

    constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans < 0 ? 0 : coffeeBeans;
    }

    // static makeMachine(coffeeBeans: number): CoffeeMachine {
    //   return new CoffeeMachine(coffeeBeans);
    // }

    fillCoffeeBeans(beans: number) { 
      if (beans < 0) {
        throw new Error('value for beans should be greater than 0');
      }
      this.coffeeBeans += beans;
    }

    clean(): void {
      console.log('cleaning the machine 🫧');
    }

    private grindBeans(shots: number) {
      console.log(`grinding beans for ${shots}`);
       if (this.coffeeBeans < shots * CoffeeMachine.BEANS_GRAM_PER_SHOT) {
        throw new Error("원두가 부족합니다!");
       }
      this.coffeeBeans -= shots * CoffeeMachine.BEANS_GRAM_PER_SHOT;
    }

    private preheat()  {
      console.log('heating up...🔥');
    }

    // 1. 자식 클래스에서 절차적으로 따라야하는 기능에 abstract 키워드를 붙여주고
    // 2. 자식 클래스에 공유되야 하기 때문에 private이 아닌 protected를 붙여줘야 하며
    // 3. 자식 클래스에서 세부 구현 사항을 작성할 것이기때문에, abstract 클래스에선 구현부를 생략한다.
    // 함수 이름, 어떤 인자를 받아 어떤 값을 리턴하는지만 정의할 수 있다.
    protected abstract extract(shots: number): CoffeeCup;

    makeCoffee(shots: number): CoffeeCup {
      this.grindBeans(shots);
      this.preheat();
      return this.extract(shots);
    }
  }

  class CaffeLatteMachine extends CoffeeMachine {
    constructor(beans: number, public readonly serialNumber: string) {
      super(beans);
    }

    private steamMilk() {
      console.log('Steaming some milk...🥛')
    }

    // 추상화 클래스로 인해 makeCoffee를 오버라이딩할 필요가 없다!
    // makeCoffee(shots: number): CoffeeCup {
    //   const coffee = super.makeCoffee(shots);
    //   this.steamMilk()
    //   return { ...coffee, hasMilk: true }
    // }

    protected extract(shots: number): CoffeeCup {
      this.steamMilk();
      return {
        shots,
        hasMilk: true
      }
    }
  }
   
  class SweetCoffeeMaker extends CoffeeMachine {
    // makeCoffee(shots: number): CoffeeCup {
    //   const coffee = super.makeCoffee(shots);
    //   return {
    //     ...coffee, hasSugar: true,
    //   }
    // }

    protected extract(shots: number): CoffeeCup {
      return {
        shots,
        hasSugar: true
      }
    }
  }

  const machines = [
    // new CoffeeMachine(16),
    new CaffeLatteMachine(16, 'S1234'),
    new SweetCoffeeMaker(16)
  ]
  machines.forEach(machine => {
    console.log('------------------');
    const coffee = machine.makeCoffee(2)
    console.log('⭐️', coffee) 
  })
}