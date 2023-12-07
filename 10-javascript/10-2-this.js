console.log(this); // Window 객체가 출력된다.

function simpleFunc() {
  console.log(this);
}

simpleFunc(); // window.simpleFunc(); 와 같으므로 Window 객체가 출력된다.

class Counter {
  count = 0;
  increase = function () {
    console.log(this);
  }
}

const counter = new Counter();
console.log(counter)
counter.increase(); // this는 Counter 객체가 된다!
const caller = counter.increase; // this가 원래 Counter라는 클래스를 가리키고 있었으나 caller라는 변수로 할당해버려서 this의 정보를 잃어버리게 된다.
caller(); // undefined가 출력된다!

// this는 호출자마다 다르므로,
// ✨ 1. this의 정보를 잃어버리지 않으려면 bind로 this를 묶어줘야한다!
const callerBind = counter.increase.bind(counter);
callerBind(); // Counter {count: 0, increase: ƒ}가 출력된다!

class Bob {

}

const bob = new Bob();
bob.run = counter.increase;
bob.run(); // this는 Bob {run: ƒ}

// ✨ 2. 클래스 내에서 함수를 정의할 때 arrow function으로 정의하기
class Counter2 {
  count = 0;
  increase = () => {
    console.log(this); // 선언될 당시의 문맥, 스코프의 this 컨텍스트를 유지한다.
  }
}

const counter2 = new Counter2();
const caller2 = counter2.increase;
caller2() // Counter2 { count: 0, increase: ƒ }