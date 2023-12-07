const x = {};
const y = {};
console.log(x);
console.log(y);
// 자바스크립트에서 모든 object는 Object라는 proto를 상속한다.
console.log(x.__proto__ === y.__proto__) // true
// x건 y건 모두 같은 proto를 상속한다!

const array = [];
// 자바스크립트에서 모든 배열은 Array라는 proto를 상속한다.
// 프로토의 모든 속성, 메소드를 사용할 수 있다.
console.log(array)
// array는 Array라는 proto를 상속하고 Array도 보면 Object라는 proto를 상속한다.

// 생성자 함수
function CoffeeMachine(beans) {
  this.beans = beans;
  // 만들어지는 인스턴스마다 해당 함수를 가지고 있으므로 
  // ✨ Instance member level이라고 한다.
  // this.makeCoffee = (shots) => {
  //   console.log('making...☕️');
  // }
}

// 🔥 Prototype member level
// 만들어진 인스턴스엔 해당 makeCoffee 함수가 들어있지 않고 프로토타입에 들어있다!
CoffeeMachine.prototype.makeCoffee = (shots) => {
  console.log('making...☕️');
}

// machine1, machine2 < CoffeeMachine < Object
const machine1 = new CoffeeMachine(10);
const machine2 = new CoffeeMachine(20);
console.log(machine1, machine2)

function LatteMachine(milk) {
  this.milk = milk;
}

// 위에서 만든 CoffeeMachine 상속하기
// Object.create(새로 만든 객체의 프로토타입이어야할 객체)
LatteMachine.prototype = Object.create(CoffeeMachine.prototype);

const latteMachine = new LatteMachine(123);
console.log(latteMachine)
// 위에서 CoffeeMachine을 프로토타입으로 상속했기 때문에
// latteMachine도 CoffeeMachine의 makeCoffee 함수를 사용할 수 있다!
latteMachine.makeCoffee();

// 즉 자바스크립트에선 인터페이스는 없지만 프로토타입을 통해 상속을 구현할 수 있다! 
// 이로 인해 코드의 재사용성을 높일 수 있다!