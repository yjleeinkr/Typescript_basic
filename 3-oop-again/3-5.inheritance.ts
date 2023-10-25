namespace inheritance {
  // 상속을 이용해서 커피머신 클래스를 상속하는 다른 종류의 커피머신을 만들어보자!
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
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
    // 4. 자식 클래스에 생성자 함수를 또 구현하는 경우 super로 부모 클래스의 생성자 함수를 실행해줘야한다.
    constructor(beans: number, public readonly serialNumber: string) {
      super(beans);
    }
    private steamMilk() {
      console.log('Steaming some milk...🥛')
    }
    makeCoffee(shots: number): CoffeeCup {
      // 3. 여기서 super 키워드를 사용해서 자식에서 부모 클래스의 함수를 이용할 수 있다.
      // 이렇게 하면 부모 내의 함수를 사용하는 것이기 때문에 아래처럼 모든 과정이 다 나온다. 
      const coffee = super.makeCoffee(shots);
      this.steamMilk()
      return { ...coffee, hasMilk: true }
      /*
      grinding beans for 3
      heating up...🔥
      Pulling 3 shots...☕️
      Steaming some milk...🥛 // 자식 클래스에서 추가한 함수
      { shots: 3, hasMilk: true }
      */ 
    }
   }
  
  const machine = new CoffeeMachine(23);
  const blackCoffee = machine.makeCoffee(3);
  console.log(blackCoffee) 
  /* 1. 부모 클래스의 인스턴스는 모든 커피 만드는 과정이 다 나오지만 
  grinding beans for 3
  heating up...🔥
  Pulling 3 shots...☕️
  { shots: 3, hasMilk: false }
  */
  const latteMachine = new CaffeLatteMachine(23, 'S1234');
  const latte = latteMachine.makeCoffee(3)
  console.log(latte) // 2. 상속한 자식의 인스턴스는 커피 결과만 나온다. { shots: 3, hasMilk: true } 
  // 상속을 사용하면 공통적인 기능은 그대로 사용하면서 이 자식 클래스에서만 해당 클래스에 특화된 뭔가를 할 수 있다.
  console.log(latteMachine.serialNumber)
}

