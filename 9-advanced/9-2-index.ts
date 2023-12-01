// 타입은 변환하는 것이 가능하다!
// 한가지 타입을 기본으로 해서 여러 가지 타입으로 transform도 가능하다.
{
  const obj = {
    name: 'yj'
  }
  obj.name; // yj
  obj['name'] // yj

  type Animal = {
    name: string;
    age: number;
    gender: 'male' | 'female';
  };

  type Name = Animal['name']; // string
  const text: Name = 'only string!';

  type Gender = Animal['gender']; // 'male' | 'female';

  type Keys = keyof Animal; // Animal에 있는 모든 key의 타입 'name' | 'age' | 'gender'
  const name: Keys = 'name';
  const age: Keys = 'age';
  const gender: Keys = 'gender';

  type Person = {
    name: string;
    gender: Animal['gender'];
  }
  const person: Person = {
    name: 'yj2',
    gender: 'female'
  }
}