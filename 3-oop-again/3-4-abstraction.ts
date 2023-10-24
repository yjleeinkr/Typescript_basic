namespace abstraction {
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  interface CommercialCoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
    fillCoffeeBeans(beans: number): void;
    clean(): void;
  }

  class CoffeeMachine implements CoffeeMaker, CommercialCoffeeMaker {
    private static BEANS_GRAM_PER_SHOT: number = 7; 
    private coffeeBeans: number = 0; 

    private constructor(coffeeBeans: number) {
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
 
  const maker: CoffeeMachine = CoffeeMachine.makeMachine(-3);
  maker.fillCoffeeBeans(32);
  maker.makeCoffee(2)
  // 1. 접근제어자(private)를 사용한 캡슐화를 통해 추상화가 가능
  // 2. 인터페이스를 통해서 추상화 가능
  // 인터페이스를 이용하면 얼만큼의 행동을 약속할건지, 보장, 허용할건지 정할 수 있다.
  const maker2: CommercialCoffeeMaker = CoffeeMachine.makeMachine(32);
  maker2.fillCoffeeBeans(32); 
  maker2.makeCoffee(3);
  maker2.clean();

  // 인터페이스를 통해서 각 구현부 클래스들의 행동 범위를 정할 수 있다.
  class AmateurUser {
    constructor(private machine: CoffeeMaker) { }
    makeCoffee() {
      const coffee = this.machine.makeCoffee(2);
      console.log('아마추어가 만듭니다..', coffee);
    }
  }

  class ProBarista {
    constructor(private machine: CommercialCoffeeMaker) { }
    makeCoffee() {
      const coffee = this.machine.makeCoffee(2);
      console.log('바리스타가 만듭니다..', coffee);
      this.machine.fillCoffeeBeans(50);
      this.machine.clean();
    }    
  }
  const machine: CommercialCoffeeMaker = CoffeeMachine.makeMachine(32);
  const amateur = new AmateurUser(machine);
  const pro = new ProBarista(machine)
  amateur.makeCoffee()
  pro.makeCoffee()
}

