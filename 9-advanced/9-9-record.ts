type PageInfo = {
  title: string;
}
type Page = 'home' | 'about' | 'contact';

// Record<T, U> : map과 비슷하다. 특정 타입과 또 다른 타입을 묶고 싶을 때, T를 key로 쓰고 U를 값으로 쓸 수 있다.
const nav: Record<Page, PageInfo> = {
  home: { title: 'Home'},
  about: { title: 'About'},
  contact: { title: 'Contact'},
}

// 아래와 같이 정의되있다!
type Record2<K extends keyof any, T> = {
  [P in K]: T;
}
// keyof any : 객체의 키가 될 수 있는 어떤 값을 나타내는데,
// 즉, keyof any === string | number | symbol 이라고 한다.

// 
type Product = 'cat' | 'dog';
type NewProduct = Capitalize<Product>; // 'Cat' | 'Dog' 대문자화 시켜주는 타입