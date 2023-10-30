namespace polymorphism {
  type CoffeeCup = {
    shots: number;
    hasMilk?: boolean;
    hasSugar?: boolean;
  };

  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  class CoffeeMachine implements CoffeeMaker {
    private static BEANS_GRAM_PER_SHOT: number = 7; 
    private coffeeBeans: number = 0; 

    constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans < 0 ? 0 : coffeeBeans;
    }

    static makeMachine(coffeeBeans: number): CoffeeMachine {
      return new CoffeeMachine(coffeeBeans);
    }

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

    private extract(shots: number): CoffeeCup {
      console.log(`Pulling ${shots} shots...☕️`);
      return { shots, hasMilk: false };
    }

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

    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      this.steamMilk()
      return { ...coffee, hasMilk: true }
    }
  }
   
  class SweetCoffeeMaker extends CoffeeMachine {
    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      return {
        ...coffee, hasSugar: true,
      }
    }
  }

  const machines = [
    new CoffeeMachine(16),
    new CaffeLatteMachine(16, 'S1234'),
    new SweetCoffeeMaker(16)
  ]
  machines.forEach(machine => {
    console.log('------------------');
    const coffee = machine.makeCoffee(2)
    console.log('⭐️', coffee) 
    // 다형성은 특정 인터페이스나 부모 클래스를 상속한 다양한 자식, 파생 클래스들이 공통된 api들을 각 클래스의 특징에 맞게 다양하게 응용해서 구현할 수 있는 것을 뜻한다.
  })
}