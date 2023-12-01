type PositionType = {
  x: number;
  y: number;
}

interface PositionInterface {
  x: number;
  y: number;
}

// object ⭐️
const obj1: PositionType = {
  x: 1,
  y: 1,
}
const obj2: PositionInterface = {
  x: 1,
  y: 1,
  z: 1, // 인터페이스 결합으로 인해 z 추가!
}

// class ⭐️
class Pos1 implements PositionType {
  x: number;
  y: number;
}
class Pos2 implements PositionInterface {
  x: number;
  y: number;
  z: number; // 인터페이스 결합으로 인해 z 추가!
}

// Extends ⭐️ 도 가능하다!
interface ZPositionInterface extends PositionInterface {
  z: number;
}
type ZPositionType = PositionType & { z: number }; // &(intersection)으로 extends가 가능하다!

// ✅ Only interface can be merged! 
// 인터페이스만 결합이 된다.한번 정의했음에도 뒤에서 재정의하면 이전 정의와 결합된다. 타입은 안된다!
interface PositionInterface {
  z: number;
}

// ✅ Type aliases can use computed properties
type Person = {
  name: string,
  age: number;
}
type Name = Person['name']; // 조금 더 활용성 높은 타입을 쓸 수 있다
type NumberType = number;
type Direction = 'left' | 'right' // 유니언도 타입만 사용 가능하다.

{
// ✨ 인터페이스
// 계약서, 규격 사항과 같다. 
// 다른 사람들과 의사 소통할 때, object와 object 간의 의사소통 시 정해진 인터페이스를 토대로 해서 서로 간의 상호작용이 가능하게 해주고
// 동일한 규격 사항을 따라갈 수 있게 도와주는 것이라고 생각하자.
// 뭔가를 구현할 때 규격이 필요하다면 타입보단 인터페이스를 쓰는게 더 정확하다!

interface CoffeeMaker {
  coffeeBeans: number;
  makeCoffee: (shots: number) => Coffee; 
}

class CoffeeMachine implements CoffeeMaker {
  coffeeBeans: number;
  makeCoffee: (shots: number) => Coffee;
}

// ✨ Type Aliases 
// 특정 데이터를 담을 때 어떠한 데이터를 담을 수 있을지 데이터의 모습, 데이터의 타입을 결정하는 것이다.
// 어떤 것을 구현하는 목적이 아니라 뭔가 데이터의 형태를 정의하여 담아두는 목적이라면 인터페이스보단 타입을 쓰는게 더 정확하다!
  type Position = {
    x: number;
    y: number;
  }
  const pos: Position = { x: 0, y: 0 };
  printPostion(pos);
}

// 클라이언트와 서버가 주고 받는 데이터라던지 리액트에서의 state, props 같은 건 대부분 type으로 정의하는게 좋다.
// 왜냐하면 이들 모두가 뭔가를 구현하기 위한게 아니라 데이터를 받아 사용하는 용도이기 때문이다.