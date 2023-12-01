// map 타입 : 기존에 있는 타입들을 이용하면서 조금 다른 형태로 변환할 수 있는 것

type Video = {
  title: string;
  author: string;
  description: string;
};

// 🔥 이렇게 반복적인 작업을 방지해주고 재사용성을 높이는 것이 Map type이다!
// type VideoOptional = {
//   title?: string;
//   author?: string;
//   description?: string;
// };

// [1, 2].map(v => v * v); // [1, 4]
// ⭐️ 배열 메소드인 map처럼 기존의 타입을 다른 형태로 변환해서 타입 정의를 할 수 있다.
type Optional<T> = {
  [P in keyof T]?: T[P] // for...in 처럼 key를 돌 수 있다.
  // ✨ [] 배열 안에서 keyof T를 반복문처럼 빙글빙글 돈다. 즉 P는 keyof T, 즉 T의 모든 키값들을 쫙 순회한다.
  // 즉 아래 주석처리한 VideoOptional과 같은 타입이 나온다.
}
type VideoOptional = Optional<Video>
const videoOpt: VideoOptional = {
  title: 'Hello Map!',
}

type Animal = {
  name: string;
  age: number;
}
const animal: Optional<Animal> = { name: 'hey' }

type ReadOnly<T> = {
  readonly [P in keyof T] ?: T[P]
}
const video: ReadOnly<Video> = {
  title: '타이틀!',
  author: 'yj'
}

// video.title = '안 바뀌는 타이틀..' // 위에서 ReadOnly로 type 지정을 했기 떄문이다.

// type VideoReadOnly = {
//   readonly title?: string;
//   readonly author?: string;
//   readonly description?: string;
// };

type Nullable<T> = { [P in keyof T]: T[P] | null }
const nullableObj: Nullable<Video> = {
  title: null,
  author: null,
  description: null,
}

type Proxy<T> = {
  get(): T;
  set(value: T): void;
}
type Proxify<T> = {
  [P in keyof T]: Proxy<T[P]>; // Proxy 라는 타입으로 한단계 감쌌다. 
}