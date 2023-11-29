namespace Stack {
  // 어떤 타입이든 받을 수 있는 스택 구조로 개선해보기
  interface Stack <T>{
    readonly size: number;
    push(value: T): void;
    pop(): T;
  }

  type StackNode <T> = {
    readonly value: T;
    readonly next?: StackNode<T>;
  }

  class StackImpl<T> implements Stack<T> {
    private _size: number = 0;
    private head?: StackNode<T>;

    constructor(private capacity: number) { }
    
    get size() {
      return this._size;
    }

    push(value: T) {
      if (this._size === this.capacity) throw new Error('Stack is full!');
      const node = { value, next: this.head };
      this.head = node;
      this._size++;
    }

    pop(): T {
      if (this.head == null) throw new Error('Stack is empty!');
      const node = this.head;
      this.head = node.next;
      this._size--;
      return node.value;
    }
  }

  const stack = new StackImpl<string>(10);
  stack.push('A')
  stack.push('B')
  stack.push('C')
  stack.push('D')
  stack.push('E')
  while (stack.size !== 0) {
   console.log(stack.pop()) 
  }

  const numberStack = new StackImpl<number>(5);
  numberStack.push(1)
  numberStack.push(2)
  numberStack.push(3)
  numberStack.push(4)
  numberStack.push(5);
  while (numberStack.size !== 0) {
    console.log(numberStack.pop())
  }
  // 장기적으로 재사용될 가능성이 크다고 여겨지면 제네릭으로 다양한 타입을 받을 수 있도록 구현해보는게 좋을 것 같다.
}