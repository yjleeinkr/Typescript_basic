{
  type Todo = {
    title: string;
    description: string;
  }

  function display(todo: Todo) {
    todo.title = '누군가 업데이트할 수 있다!';
  }

  // Mapped Type에서 배운 것처럼 아래와 같이 Readonly라고 정의한 타입을 만들 수도 있겠지만, 웬만한 유틸리티 타입들은 이미 타입스크립트에 정의되어 있어서 가져다 쓰면 된다!
  type ReadOnly<T> = {
    readonly [K in keyof T]: T[K]
  }

  // ✨ Readonly 라는 utility type을 사용하면 업데이트가 불가능해 불변성을 유지할 수 있다.
  function display2(todo: Readonly<Todo>) {
    // todo.title = '누군가 업데이트할 수 있다!'; // 에러 발생
  }
}