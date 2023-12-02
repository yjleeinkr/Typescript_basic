{
  type Todo = {
    title: string;
    description: string;
    label: string;
    priority: 'high' | 'low';
  }

  // ✨ Partial type도 mapped type에서 배웠던 Optional 과 같다.
  type Optional<T> = {
    [P in keyof T]?: T[P];
  }

  // Partial<T> : 기존 타입 중에서 부분적인 것만 허용하고 싶을 때 활용할 수 있다.
  function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>): Todo {
    return {...todo, ...fieldsToUpdate}
  }

  const todo: Todo = {
    title: '타입스크립트',
    description: 'utility type 공부하기~',
    label: 'typescript',
    priority: 'high',
  }

  const updated = updateTodo(todo, { priority: 'low' })
  console.log(updated) 
  /*
  {
    title: '타입스크립트',
    description: 'utility type 공부하기~',
    label: 'typescript',
    priority: 'low'
  }
   */
}