namespace composition {
  // 상속의 문제점?! 상속의 깊이가 깊어질수록 서로간의 관계가 복잡해질 수 있다.
  // 상속은 수직적으로 관계가 형성되는데 부모 클래스의 구현 사항 중 하나만 수정해도 이를 상속하는 모든 자식 클래스에 영향을 끼친다.
  // 클래스는 하나의 클래스만 상속할 수 있다.

  // 이러한 상속의 문제점때문에 composition을 사용하는게 좋다.
  // Favor COMPOSITION over inheritance 상속보단 컴포지션을 선호해랏!
  // 레고만들듯이 조립해서 만들어가기
  // 필요한 기능을 클래스 내에서 매번 만드는 것이 아니라 각각의 기능별로 클래스를 따로 만들어서 필요한 곳에서 가져다쓰는 것을 composite 하는 것이 중요하다.  => 코드의 재사용을 높여준다.

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

    constructor(coffeeBeans: number,
      private milk: MilkFrother,
      private sugar: SugarProvider) {
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

    private extract(shots: number): CoffeeCup {
      console.log(`Pulling ${shots} shots...☕️`);
      return { shots, hasMilk: false };
    }

    makeCoffee(shots: number): CoffeeCup {
      this.grindBeans(shots);
      this.preheat();
      const coffee = this.extract(shots);
      const sugarAdded = this.sugar.addSugar(coffee);
      return this.milk.makeMilk(sugarAdded);
    }
  }

  // ✨ 인터페이스를 통해 디커플링하기!
  interface MilkFrother {
    makeMilk(cup: CoffeeCup): CoffeeCup;
  }

  interface SugarProvider{
    addSugar(cup: CoffeeCup): CoffeeCup;
  }

  class CheapMilkSteamer implements MilkFrother {
    private steamMilk(): void {
      // 복잡한 내부 과정...
      console.log('Steaming some milk...🥛🔥');
    }
    makeMilk(cup: CoffeeCup): CoffeeCup{
      this.steamMilk();
      return {
        ...cup,
        hasMilk: true
      }
    }
  }

  class FancyMilkSteamer implements MilkFrother {
    private steamMilk(): void {
      // 복잡한 내부 과정...
      console.log('Fancy steaming some milk...🥛🔥🧈');
    }
    makeMilk(cup: CoffeeCup): CoffeeCup {
      this.steamMilk();
      return {
        ...cup,
        hasMilk: true
      }
    }
  }

  class ColdMilkSteamer implements MilkFrother {
    private steamMilk() {
      console.log('Steaming some COLD milk...🥛🔥🧈');
    }
    makeMilk(cup: CoffeeCup): CoffeeCup {
      this.steamMilk();
      return {
        ...cup,
        hasMilk: true
      }
    }
  }

  class NoMilk implements MilkFrother {
    makeMilk(cup: CoffeeCup): CoffeeCup {
      return cup;
    }
  }

  class CandySugarMixer implements SugarProvider {
    private getSugar() {
      console.log('Getting some sugar from candy 🍭');
      // 복잡한 내부 과정...
      return true;
    }
    addSugar(cup: CoffeeCup): CoffeeCup {
      const sugar = this.getSugar();
      return {
        ...cup,
        hasSugar: sugar
      }
    }
  }

  class SugarMixer implements SugarProvider {
    private getSugar() {
      console.log('Getting some sugar from jar 🫙');
      return true
    }
    addSugar(cup: CoffeeCup): CoffeeCup {
      const sugar = this.getSugar();
      return {
        ...cup,
        hasSugar: sugar
      }
    }
  }

  class NoSugar implements SugarProvider {
    addSugar(cup: CoffeeCup): CoffeeCup {
      return cup;
    }
  }
  // class CaffeLatteMachine extends CoffeeMachine {
  //   constructor(beans: number, public readonly serialNumber: string, private milkFrother: MilkFrother) {
  //     super(beans);
  //   }

  //   // private steamMilk() {
  //   //   console.log('Steaming some milk...🥛')
  //   // }

  //   makeCoffee(shots: number): CoffeeCup {
  //     const coffee = super.makeCoffee(shots);
  //     return this.milkFrother.makeMilk(coffee);
  //     // this.steamMilk()
  //     // return { ...coffee, hasMilk: true }
  //   }
  // }
   
  // class SweetCoffeeMaker extends CoffeeMachine {
  //   constructor(beans: number, private sugar: SugarProvider) {
  //     super(beans)
  //   };
    
  //   makeCoffee(shots: number): CoffeeCup {
  //     const coffee = super.makeCoffee(shots);
  //     return this.sugar.addSugar(coffee);
  //   }
  // }

  // 💩 클래스들끼리 서로 커플링(클래스와 클래스끼리 관계를 짓는 것) 되어있는 건 좋지 않다. 
  // class SweetCaffeLatteMachine extends CoffeeMachine {
  //   constructor(
  //     private beans: number,
  //     private milk: MilkFrother,
  //     private sugar: SugarProvider
  //   ) {
  //     super(beans); 
  //   }

  //   makeCoffee(shots: number): CoffeeCup {
  //     const coffee = super.makeCoffee(shots);
  //     const sweetCoffee = this.sugar.addSugar(coffee);
  //     return this.milk.makeMilk(sweetCoffee);
  //   }
  // }

  // Milk
  const cheapMilkMaker = new CheapMilkSteamer();
  const fancyMilkMaker = new FancyMilkSteamer();
  const coldMilkMaker = new ColdMilkSteamer();
  const noMilk = new NoMilk();

  // Sugar
  const candySugar = new CandySugarMixer();
  const sugar = new SugarMixer();
  const noSugar = new NoSugar()

  // 
  // const sweetCandyMachine = new SweetCoffeeMaker(12, candySugar);
  const sweetCandyMachine = new CoffeeMachine(12, noMilk, candySugar);
  // const sweetMachine = new SweetCoffeeMaker(12, sugar);
  const sweetMachine = new CoffeeMachine(12, noMilk, sugar);

  // const latteMachine = new CaffeLatteMachine(12, 'SS', cheapMilkMaker);
  const latteMachine = new CoffeeMachine(12, cheapMilkMaker, noSugar);
  // const coldLatteMachine = new CaffeLatteMachine(12, 'SS', coldMilkMaker);
  const coldLatteMachine = new CoffeeMachine(12, coldMilkMaker, noSugar);
  // const fancyLatteMachine = new CaffeLatteMachine(12, 'SS', fancyMilkMaker);
  const fancyLatteMachine = new CoffeeMachine(12, fancyMilkMaker, noSugar);
  // const sweetLatteMachine = new SweetCaffeLatteMachine(12, cheapMilkMaker, candySugar);
  const sweetLatteMachine = new CoffeeMachine(12, cheapMilkMaker, candySugar);
  // 이렇게 될 경우, 오로지 해당 클래스에 해당하는 인스턴스만 넣을 수 있어서 매우 제한적이고 확장성이 떨어진다.
  // 클래스들끼리 의사소통이 발생하는 경우, 클래스 자체를 노출하는 것이 아니라 계약서를 통해서, 계약서에 의거해서 의사소통해야한다.
  // 계약서 == 인터페이스를 통해 클래스 간 상호작용을 하는 것이 더 좋다. - 디커플링의 원칙

  // ✅ 주석 처리한 것 처럼 컴포지션을 사용하면 여러 커피머신이 필요 없다!
  // 기본 클래스인 CoffeeMachine과 그에 필요한 각 부품들의 인터페이스, 클래스만 생성하면 원하는대로 조합하여 다양한 인스턴스를 생성할 수 있다!
}