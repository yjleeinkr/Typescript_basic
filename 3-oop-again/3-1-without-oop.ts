namespace withoutOOP {
  type Coffee = {
    shots: number;
    hasMilk: boolean;
  };

  const BEANS_GRAM_PER_SHOT: number = 7;
  let coffeeBeans: number = 0;

  function makeCoffee(shots: number): Coffee {
    if (coffeeBeans < shots * BEANS_GRAM_PER_SHOT) {
      throw new Error("원두가 부족합니다!");
    }
    coffeeBeans -= shots * BEANS_GRAM_PER_SHOT;
    return {
      shots,
      hasMilk: false,
    };
  }

  coffeeBeans += 3 * BEANS_GRAM_PER_SHOT;
  const coffee = makeCoffee(2);
  console.log("커피 나왔습니다", coffee);
  const coffee2 = makeCoffee(2);
  console.log("커피 나왔습니다", coffee2);
}
