namespace abstract2 {
  
  class CoffeeMachine {
  grindBeans() { }
  preheat() { }
  extract() { }
  makeCoffee() {
    this.grindBeans();
    this.preheat();
    this.extract();
  }
}

// 이렇게 상속만 해놓고 부모 클래스의 함수를 재정의(오버라이딩) 하지 않으면 부모 클래스에서 구현된 함수 그대로를 사용하게 된다!
class LatteeMachine extends CoffeeMachine { }

// 그래서 makeCoffee()를 호출하면, 부모 클래스가 구현한대로
// grindBeands > preheat > extract 함수를 호출하게 된다.
const machine = new LatteeMachine();
machine.makeCoffee();

// 만약 자식 클래스에서 부모 클래스에 있는 함수를 재정의한다면?
// 자식 클래스에서 구현한대로 함수가 돌아간다.
// 부모 클래스와 똑같이 grindBeands > preheat > extract 함수를 순서대로 호출해주지 않는 이상, 아무 일도 일어나지 않는다.
// 즉 따지고보면 다른 함수가 되는 것!
class LatteeMachine2 extends CoffeeMachine {
  makeCoffee(): void {}
}

// 그래서 부모 클래스에 정의된 함수를의 행동을 따라가되 조금 베리에이션을 주고싶다면, ✨super를 이용해서 부모 클래스 함수를 호출해줘야 한다.
// 그렇게되면, 자식 클래스의 makeCoffee도 부모 클래스 함수 코드의 절차를 따라갈 수 있다.
class LatteeMachine3 extends CoffeeMachine {
  makeCoffee(): void {
    super.makeCoffee();
  }
}

// 오버라이딩은 부모 클래스에 정의된 내용을 자식 클래스에서 따라가면서도 응용할 수 있는 좋은 방법이지만, 🚨 실수로 인해 부모 클래스에서 의도적으로 작성된 코드를 잘못 덮어 씌울수도 있다. 이로 인해 꼭 행해야 하는 절차를 생략해버릴 수도 있다..
// ⭐️ 그래서 CoffeeMachine 예제처럼 클래스 내부에서 수행되야하는 함수의 절차가 중요하거나, 자식 클래스에서 달라져야하는 행동이 명확한 경우엔 🔥 abstract 클래스를 사용할 수 있다!

// 예시
abstract class Document {
  private header() {
    console.log('header');
  }
  protected abstract body(): void;
  private footer() {
    console.log('footer')
  }
  public write() {
    this.header();
    this.body();
    this.footer();
  }
}

// 1. Docs 클래스는 추상화 클래스이므로 상속을 해서 클래스를 정의해야한다.
// 2. header와 footer는 private에다가 정해져있기 때문에 건드리지 않는다.
// 3. abstract 함수인 body만 자식 클래스에서 원하는대로 구현하면 된다. 
// 4. write라는 public 함수는 header > body > footer 순으로 호출해준다.

// ✅ abstract 클래스를 상속하면 자식 클래스에서 super를 호출해야한다는 걱정없이 abstract으로 지정된 함수만 재정의하면 된다!!

class SimpleDocument extends Document {
  protected body(): void {
    console.log('body');
  }
}
  const doc = new SimpleDocument();
  doc.write(); // header > body > footer 출력

  class AwesomeDocument extends Document {
    protected body(): void {
      console.log('✨body✨');
    }
  }
  const awesomeDocs = new AwesomeDocument();
  doc.write(); // header > ✨body✨ > footer 출력
}
