{

    // 상속의 문제점! : 일명 족보가 꼬인다, 클래스는 수직적으로 관계가 형성되고, 부모의 세부사항이 바뀌면 그걸 받는 자식 클래스들에도 영향을 미치게 된다.
    // 타입스크립트에선 2개 이상의 부모 클래스를 상속받을 수 없다.
    // 그래서 필요한 게 Composition이다! Favor composition over inheritance! 레고처럼 필요한 것들을 가져와서 조립해서 쓰는 것을 말한다
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
    // 싸구려 우유 거품기 
    class CheapMilkSteamer {
        private steamMilk(): void {
            // 복잡한 구현...
            console.log("steaming some milk...🥛");
        }
        makeMilk(cup: Coffee) : Coffee{
            this.steamMilk();
            return {
                ...cup,
                hasMilk: true
            }
      }
    }

    // 설탕 제조기
    class CandySugarMixer{
        private getSugar() {
          // 복잡한 구현...
          console.log("Getting some sugar from candy 🍭");
          return true;
        }
        addSugar(cup: Coffee): Coffee {
            const sugar = this.getSugar();
            return {
                ...cup,
                hasSugar: sugar,
            }
        }
    }
    class CaffeLatteMachine extends CoffeeMachine {
        constructor(beans: number, public readonly serialNumber: string, private milkFrother: CheapMilkSteamer) {
            super(beans);
        }

        // private steamMilk(): void {
        //     console.log("steaming some milk...🥛");
        // } 
        makeCoffee(shots: number): Coffee {
          const coffee = super.makeCoffee(shots);
          // CheapMilkSteamer라는 클래스를 dependency injection 했기 때문에 기존의 steamMilk 함수는 지워도 된다!
          // this.steamMilk();
          // return {
          //     ...coffee,
          //     hasMilk: true,
          // };
          // 대신 아래와 같이 inject해준 애를 써준다.
            return this.milkFrother.makeMilk(coffee);
        }
    }

    class SweetCoffeeMaker extends CoffeeMachine {
        // getSugar() {
        //     console.log('Getting some sugar 🍬');
        // }
        constructor(private beans: number, private sugar: CandySugarMixer) {
            super(beans);
        }
        makeCoffee(shots: number): Coffee {
            const coffee = super.makeCoffee(shots);
            // this.getSugar();
            // return {
            //     ...coffee,
            //     hasSugar: true,
            // };
            return this.sugar.addSugar(coffee);
        }
    }

    // 이렇게 클래스들 간의 상호작용, 의사소통이 발생하는 경우엔 
    // 클래스 자신을 노출하는 것이 아니라 계약서(인터페이스)를 통해서 계약서에 의거해서 의사소통을 해야한다!
    class SweetCaffeLatteMachine extends CoffeeMachine {
        constructor(
            private beans: number,
            private milkFrother: CheapMilkSteamer,
            private sugar: CandySugarMixer
        ) {
            super(beans)
        }
        makeCoffee(shots: number) : Coffee {
            const coffee = super.makeCoffee(shots);
            const CaffeLatte = this.milkFrother.makeMilk(coffee);
            return this.sugar.addSugar(CaffeLatte);
        }
    }
    // 우유 거품기, 설탕 제조기처럼 각각의 필요한 기능을 각 클래스로 따로 만들어둠으로써 필요한 곳에서 이것 저것 가져다가 쓰는 행위를 composition이라고 한다!
    // 외부에서 주입 받음으로써 컴포지션을 이용해 필요한 기능을 재사용할 수 있다. 코드의 재사용을 높여주는 아이이다
    // 💩 위의 코드처럼 클래스와 클래스 간에 커플링되서 가는 것, 서로 잘 알고 지내는 것은 좋지 않다!
    const cheapMilkMaker = new CheapMilkSteamer();
    const candySugar = new CandySugarMixer();
    const sweetMachine = new SweetCoffeeMaker(12, candySugar);
    const latteMachine = new CaffeLatteMachine(12, 'SS', cheapMilkMaker);
    const sweetLatteMachine = new SweetCaffeLatteMachine(12, cheapMilkMaker, candySugar)
}
// 리팩토링
// 클래스들끼리 커플링된 것들을 인터페이스를 통해 디커플링한다!
// 즉, 인터페이스를 통해 클래스들끼리 상호작용한다!
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

        public constructor(coffeeBeans: number, private milk: MilkFrother, private sugar: SugarProvider ) {
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
            const coffee = this.extract(shots);
            const sugarAdded = this.sugar.addSugar(coffee);
            return this.milk.makeMilk(sugarAdded);
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

    interface MilkFrother {
      makeMilk(cup: Coffee): Coffee;
    }
    interface SugarProvider {
      addSugar(cup: Coffee): Coffee;
    }

    class CheapMilkSteamer implements MilkFrother {
        private steamMilk(): void {
            // 복잡한 구현...
            console.log("steaming some milk...🥛");
        }
        makeMilk(cup: Coffee): Coffee {
            this.steamMilk();
            return {
                ...cup,
                hasMilk: true
            }
        }
    }
    
    class FancyMilkSteamer implements MilkFrother {
        private steamMilk(): void{
            console.log("Fancy steaming some milk...🥛");
        }
        makeMilk(cup: Coffee): Coffee {
            this.steamMilk();
            return {
                ...cup,
                hasMilk: true,
            }
        }
    }

    class ColdMilkSteamer implements MilkFrother {
        private steamMilk(): void{
            console.log("Fancy steaming some milk...🥛");
        }
        makeMilk(cup: Coffee): Coffee {
            this.steamMilk();
            return {
                ...cup,
                hasMilk: true,
            }
        }
    }

    class NoMilk implements MilkFrother {
        makeMilk(cup: Coffee): Coffee {
            return cup;
        }
    }

    class CandySugarMixer implements SugarProvider {
      private getSugar() {
        // 복잡한 구현...
        console.log("Getting some sugar from candy 🍭");
        return true;
      }
      addSugar(cup: Coffee): Coffee {
        const sugar = this.getSugar();
        return {
          ...cup,
          hasSugar: sugar,
        };
      }
    }

    class SugarMixer implements SugarProvider {
      private getSugar() {
        // 복잡한 구현...
        console.log("Getting some sugar from jar🫙");
        return true;
      }
      addSugar(cup: Coffee): Coffee {
        const sugar = this.getSugar();
        return {
          ...cup,
          hasSugar: sugar,
        };
      }
    }

    class NoSugar implements SugarProvider {
        addSugar(cup: Coffee): Coffee {
            return cup;
        }
    }
    // 굳이 이렇게 많은 클래스를 따로 만들지 않고 부품들과 베이스인 CoffeeMachine만 남겨둔다.
    // class CaffeLatteMachine extends CoffeeMachine {
    //   constructor(
    //     beans: number,
    //     public readonly serialNumber: string,
    //     private milkFrother: MilkFrother
    //   ) {
    //     super(beans);
    //   }

    //   makeCoffee(shots: number): Coffee {
    //     const coffee = super.makeCoffee(shots);
    //     return this.milkFrother.makeMilk(coffee);
    //   }
    // }

    // class SweetCoffeeMaker extends CoffeeMachine {
    //   constructor(private beans: number, private sugar: SugarProvider) {
    //     super(beans);
    //   }
    //   makeCoffee(shots: number): Coffee {
    //     const coffee = super.makeCoffee(shots);
    //     return this.sugar.addSugar(coffee);
    //   }
    // }

    // class SweetCaffeLatteMachine extends CoffeeMachine {
    //   constructor(
    //     private beans: number,
    //     private milkFrother: MilkFrother,
    //     private sugar: SugarProvider
    //   ) {
    //     super(beans);
    //   }
    //   makeCoffee(shots: number): Coffee {
    //     const coffee = super.makeCoffee(shots);
    //     const CaffeLatte = this.milkFrother.makeMilk(coffee);
    //     return this.sugar.addSugar(CaffeLatte);
    //   }
    // }

    // Milk
    const cheapMilkMaker = new CheapMilkSteamer();
    const fancyMilkMaker = new FancyMilkSteamer();
    const coldMilkMaker = new ColdMilkSteamer()
    const noMilk = new NoMilk();

    // Sugar
    const candySugar = new CandySugarMixer();
    const Sugar = new SugarMixer();
    const noSugar = new NoSugar();

    // 인터페이스를 통해 클래스를 컴포지션하면 여러가지 기계, 객체를 내 마음으로 조립해서 만들 수 있다!
    // const sweetCandyMachine = new SweetCoffeeMaker(12, candySugar);
    // const sweetMachine = new SweetCoffeeMaker(12, Sugar);

    // const latteMachine = new CaffeLatteMachine(12, 'SS', fancyMilkMaker);
    // const coldLatterMachine = new CaffeLatteMachine(12, 'SS', coldMilkMaker);
    // const sweetLatteMachine = new SweetCaffeLatteMachine(12, cheapMilkMaker, candySugar);

    // 상속을 통하지 않아도, 컴포지션을 통해 CoffeeMachine 클래스 하나만으로 여러 커피머신을 만들어 볼 수 있다!
    const sweetCandyMachine = new CoffeeMachine(12, noMilk, candySugar);
    const sweetMachine = new CoffeeMachine(12, noMilk, Sugar);

    const latteMachine = new CoffeeMachine(12, fancyMilkMaker, noSugar);
    const coldLatterMachine = new CoffeeMachine(12, coldMilkMaker, noSugar);
    const sweetLatteMachine = new CoffeeMachine(12, cheapMilkMaker, candySugar);
    
    // 그렇다고 상속이 무조건 나쁜건 아니다! 상속이 필요할 땐 써야한다.
    // 다만, 상속관계가 수직적으로 너무 깊어질 경우엔 컴포지션을 이용해서 대체할 수 없는지 생각해본다.
}
