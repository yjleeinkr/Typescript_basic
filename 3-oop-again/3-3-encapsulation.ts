namespace withClass {
  type Coffee = {
    shots: number;
    hasMilk: boolean;
  };

  // public : 외부 공개
  // private : 외부에서 볼 수 없고, 접근도 할 수 없다.
  // protected : 외부에선 접근 불가하지만, 해당 클래스를 상속한 자식 클래스에서만 접근 가능하게 설정 가능

  class CoffeeMaker {
    private static BEANS_GRAM_PER_SHOT: number = 7; // CoffeeMaker.BEANS_GRAM_PER_SHOT을 외부에선 볼 수 없다! class level
    private coffeeBeans: number = 0;  // instance (object) level

    private constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans < 0 ? 0 : coffeeBeans;
    }

    // static으로 인스턴스, 오브젝트를 만들어주는 함수를 제공하고 있다면, 누군가 생성자를 이용해서 생성하는 것을 금지하기 위해 contructor에 private을 붙여서 외부에선 항상 static 함수를 사용하게 권장하는 것이 더 좋다.
    static makeMachine(coffeeBeans: number): CoffeeMaker {
      return new CoffeeMaker(coffeeBeans);
    }

    fillCoffeeBeans(beans: number) { // 아무것도 명시하고있지 않으면 public이다.
      if (beans < 0) {
        throw new Error('value for beans should be greater than 0');
      }
      this.coffeeBeans += beans;
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

  }
  // const maker = new CoffeeMaker(32);
  // maker.coffeeBeans = 3; // private coffeeBeans를 private으로 해두었기때문에 외부에서 바꿀 수 없다.
  // maker.coffeeBeans = -34; // invalid
  const maker = CoffeeMaker.makeMachine(-3) // 음수를 넣어도 0으로 들어가게 처리
  maker.fillCoffeeBeans(10) 
  console.log(maker)
}