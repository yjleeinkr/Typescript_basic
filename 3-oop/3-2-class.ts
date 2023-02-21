{
  type Coffee = {
    shots: number;
    hasMilk: boolean;
  };

  class CoffeeMaker {
    static BEANS_GRAM_PER_SHOT: number = 7; // 변하지 않는 상수 -> static을 붙이면 class level
    coffeeBeans: number = 0; // instance (object) level

    constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }

    makeCoffee(shots: number): Coffee {
      if (this.coffeeBeans < shots * CoffeeMaker.BEANS_GRAM_PER_SHOT) {
        throw new Error("Not enough coffee beans!");
      }
      this.coffeeBeans -= shots * CoffeeMaker.BEANS_GRAM_PER_SHOT;
      return {
        shots,
        hasMilk: false,
      };
    }

    // static 함수
    // 클래스 내부의 어떤 속성값도 필요하지 않기 때문에 static을 붙여준다.
    static makeMachine(coffeeBeans: number): CoffeeMaker {
      return new CoffeeMaker(coffeeBeans);
    }
      
  }

  const maker = new CoffeeMaker(32);
  const maker2 = new CoffeeMaker(14);
  console.log(maker);
  // CoffeeMaker { BEANS_GRAM_PER_SHOT: 7, coffeeBeans: 32 }
  // => static으로 정의 시 CoffeeMaker { coffeeBeans: 32 }
  console.log(maker2);
  // CoffeeMaker { BEANS_GRAM_PER_SHOT: 7, coffeeBeans: 14 }
  //  => static으로 정의 시 CoffeeMaker { coffeeBeans: 14 }
  // 오브젝트(인스턴스)를 만들 때마다 상수가 들어있다. 즉, 다른 오브젝트임에도 같은 데이터가 들어있다.
  // 오브젝트를 만들때마다 중복적으로 데이터가 생성되기 떄문에 메모리에 낭비가 될 수 있다.
  // 이 때 static이라는 키워드를 붙이게 되면 class level로 지정되어진다. class level로 되어 있으면 이미 class와 연결이 되어 있기 때문에 오브젝트마다 만들어지지 않는다.
  // 클래스 자체에 있는 데이터이므로 쓸 때는 this를 쓰지 않고 '클래스명.데이터' 이렇게 쓴다.
  // this.BEANS_GRAM_PER_SHOT 가 아니라 CoffeeMaker.BEANS_GRAM_PER_SHOT 이렇게 쓴다.

  // 오브젝트마다 새로 만들어져야 할 데이터가 있다면 멤버 변수로 정의
  // 클래스 레벨에서 함께 공유될 수 있는거라면 static 이용
  // 이 때 static은 멤버 변수뿐만 아니라 함수에도 적용이 된다.
    
  // 외부에서 인스턴스를 만들지 않고도 클래스명.함수명 이렇게 접근할 수 있다.
    const maker3 = CoffeeMaker.makeMachine(3);
  // Math api의 경우 우리가 따로 const math = new Math()로 생성하지 않았음에도 Math.abs()등이 사용가능하다. 이는 Math안의 메소드들이 다 클래스레벨로 있기 때문이다.
}
