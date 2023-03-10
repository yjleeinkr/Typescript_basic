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
      console.log("heating up...๐ฅ");
    }

    private extract(shots: number): Coffee {
      console.log(`Pulling ${shots} shots...โ๏ธ`);
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
      console.log("cleaning the machine...๐งผ");
    }
  }

  class CaffeLatteMachine extends CoffeeMachine {
    constructor(beans: number, public readonly serialNumber: string) {
      super(beans);
    }
    private steamMilk(): void {
      console.log("steaming some milk...๐ฅ");
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
  // machines์ coffeeMachine[] ์ด์ coffeeMaker[] ์ด๋ค!
  // coffeeMaker[] ๋ฅผ ์ง์?ํ๋ฉด ํด๋น ์ธํฐํ์ด์ค์ ๊ท์ฝ๋ makeCoffee๋ง ์ฌ์ฉํ? ์ ์๋ค.

  machines.forEach((machine) => {
    console.log("----------------");
    machine.makeCoffee(2);
    // ๋คํ์ฑ : ๋์ผํ ํจ์๋ฅผ ์ด๋ค ํด๋์ค์ธ์ง ๊ตฌ๋ถํ์ง ์๊ณ? ๊ณตํต๋ api๋ฅผ ํธ์ถํ? ์ ์๋ค๋ ๊ฒ ํฐ ์ฅ์?์ด๋ค!
    // ํ๋์ ์ธํฐํ์ด์ค๋ ๋ถ๋ชจ ํด๋์ค๋ฅผ ์์ํ ์์ ํด๋์ค๋ค์ด ์ธํฐํ์ด์ค๋ ๋ถ๋ชจ์ ํจ์๋ค์ ๋ฐ๋ผ๊ฐ๋ฉด์ ๋ค๋ฅธ ๋ฐฉ์์ผ๋ก ๋ค์ํ๊ฒ ๊ตฌ์ฑํจ์ผ๋ก์จ ์กฐ๊ธ ๋ ๋คํ์ฑ์ ๋ง๋ค์ด ๋ณผ ์ ์๋ ๊ฑธ ๋ปํ๋ค.
  });
}
