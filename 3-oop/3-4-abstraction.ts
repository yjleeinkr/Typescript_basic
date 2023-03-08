{
  type Coffee = {
    shots: number;
    hasMilk: boolean;
  };

  // 또는 interface를 통해서 추상화가 가능하다.
  // 계약서와 같은 것

  interface CoffeeMaker {
    makeCoffee(shots: number): Coffee;
  }
  // 보통 interface 명 앞에 I 라는 prefix를 붙이는 사람들도 많지만, 인터페이스는 외부적으로 사용하는 이름이기 때문에 최대한 간단한 이름을 붙여주고, 구현하는 클래스에서 다른 이름을 가져가는 게 더 좋다.

  interface CommercialCoffeeMaker {
    makeCoffee(shots: number): Coffee;
    fillCoffeeBeans(beans: number): void;
    clean(): void;
  }

  // 클래스 CoffeeMachine은 인터페이스 CoffeeMaker를 구현하는 클래스이다.
  // 인터페이스가 지정된 클래스는 인터페이스에 규약된 모든 함수들을 구현해야한다.
 // 키워드 implements : 인터페이스 지정 키워드
  class CoffeeMachine implements CoffeeMaker, CommercialCoffeeMaker {
    private static BEANS_GRAM_PER_SHOT: number = 7;
    private coffeeBeans: number = 0;

    private constructor(coffeeBeans: number) {
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

  class AmateurUser {
    constructor(private machine: CoffeeMaker) {}
    makeCoffee() {
      const coffee = this.machine.makeCoffee(2);
      console.log(coffee);
    }
  }

  class ProBarista {
    constructor(private machine: CommercialCoffeeMaker) {}
    makeCoffee() {
      const coffee = this.machine.makeCoffee(2);
      console.log(coffee);
      this.machine.fillCoffeeBeans(45);
      this.machine.clean();
    }
  }

  const maker: CoffeeMachine = CoffeeMachine.makeMachine(32);
  maker.fillCoffeeBeans(32);
  maker.makeCoffee(2);
  // maker. 하면 많은 함수가 보인다. 사용자는 어떤 함수를 써야할지 헷갈릴 수 있다.
  // 이 때 도움을 주는 게 추상화이다!
  // 추상화? 인터페이스를 간단하게 만듦으로써 사용자가 간편하게 많은 생각을 하지 않고도 심플하게 사용할 수 있도록 도와준다.

  // 접근제어자를 붙여서 즉 encapsulation을 통해 추상화가 가능하다.
  // 노출될 필요가 없는 함수 앞에 접근제어자 private을 붙여준다.

  // 또는 interface를 통해서 추상화가 가능하다.

  const maker2: CoffeeMaker = CoffeeMachine.makeMachine(32);
  // maker2.fillCoffeeBeans(32); 인터페이스 CoffeeMaker에는 fillCoffeeBeans가 정의되어있지 않아서 사용하지 못한다.
  // => 인터페이스를 이용해 내가 얼마만큼의 행동을 약속, 허용할건 지 결정할 수 있다.
  maker2.makeCoffee(2);

  // class CoffeeMachine 타입 지정 시 : public으로 지정한 모든 함수에 접근 가능
  // interface로 (CoffeeMaker나 CommercialCoffeeMaker) 타입을 제한해서 받게 되면 해당 인터페이스 내에 정의된 함수에만 접근 가능하다!

  const maker3: CommercialCoffeeMaker = CoffeeMachine.makeMachine(32);
  maker3.fillCoffeeBeans(32);
  maker3.makeCoffee(3);
  maker3.clean();

  console.log("----------");
  const coffeeMaker: CoffeeMachine = CoffeeMachine.makeMachine(32);
  const amateur = new AmateurUser(coffeeMaker);
  const pro = new ProBarista(coffeeMaker);
  amateur.makeCoffee();
  console.log("----------");
  pro.makeCoffee();

  // 📌 동일한 오브젝트 인스턴스일지라도 이 오브젝트는 2가지의 인터페이스를 구현하기 때문에 아마추어 유저와 프로 바리스타는 커피머신을 받아오는 게 아니라 각 인터페이스를 생성자에서 받아오므로 클래스보다는 좁은 범위의 인터페이스에서 규약된 함수들로만 접근 가능하다!!

  // 사용자들은 해당 AmateurUser나 ProBarista 클래스들의 다른 복잡한 기능이나 내부 구현을 알 필요도 없고, 이 인터페이스만 어떻게 사용하면 되는지 알면 된다!

  // ✨ 캡슐화와 추상화의 차이
  // 캡슐화 : 외부에 노출되지않아도 되거나, 되어선 안되는 데이터, 메소드, 내부 구현 사항들을 보호하고, 사용자가 활용하고 볼 수 있는, 봐도 되는 데이터 등을 공개하는 등 데이터를 판별하여 보호 및 노출하는 과정
  // 추상화 : 상속이나 인터페이스 등을 통해 각 클래스가 공통적으로 가지고 있어야하는 구현사항, 로직을 통일시키고, 불필요한 세부적인 것들은 제거하여 효율적이고 공통적인, 유연성있는, 재사용가능한 클래스를 만들어내는 과정이다.
}

