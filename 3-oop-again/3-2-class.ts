namespace withClass {
  type Coffee = {
    shots: number;
    hasMilk: boolean;
  };

  class CoffeeMaker {
    static BEANS_GRAM_PER_SHOT: number = 7;
    coffeeBeans: number = 0;

    constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }

    makeCoffee(shots: number): Coffee {
      if (this.coffeeBeans < shots * CoffeeMaker.BEANS_GRAM_PER_SHOT) {
        throw new Error("원두가 부족합니다!");
      }
      this.coffeeBeans -= shots * CoffeeMaker.BEANS_GRAM_PER_SHOT;
      return {
        shots,
        hasMilk: false,
      };
    }

    static makeMachine(coffeeBeans: number): CoffeeMaker {
      return new CoffeeMaker(coffeeBeans);
    }
  }
  const maker = new CoffeeMaker(32);
  const coffee = maker.makeCoffee(2);
  console.log("커피 나왔습니다", coffee);
  const coffee2 = maker.makeCoffee(2);
  console.log("커피 나왔습니다", coffee2);

  const coffeeMaker = CoffeeMaker.makeMachine(40);
}
