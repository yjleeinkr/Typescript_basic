namespace queue {
  interface Queue<T> {
    readonly size: number;
    enqueue(value: T): void;
    dequeue(): T;
  }

  type QueueNode<T> = {
    readonly value: T;
    next?: QueueNode<T>;
  };

  class QueueImpl<T> implements Queue<T> {
    private _size: number = 0;
    private head?: QueueNode<T>;
    private tail?: QueueNode<T>;

    get size() {
      return this._size;
    }

    constructor(readonly capa: number) {}

    enqueue(value: T): void {
      if (this.size === this.capa) throw new Error("This Queue is full!");
      const node: QueueNode<T> = { value };
      if (this.size === 0) {
        this.head = node;
      } else if (this.tail) {
        this.tail.next = node;
      }
      // this.tail!.next = node; // ✅ ! 연산자 (단언 연산자)
      // 피연산자가 null 이나 undefined가 아님을 단언할 때 사용
      // 하지만 단언 연산자로 처리하는 건 주의가 필요하다.
      // 왜냐하면 실제로 런타임에서 피연산자가 null이나 undefined일 경우 런타임 에러를 일으킬 수 있기 때문이다.
      // 따라서, this.tail값이 유효할 때만 해당 코드를 실행하게 조건문을 걸어주는 게 더 좋을 것 같다.
      this.tail = node;
      this._size++;
    }
    // 🚨 여기서 내가 왕 실수했던 것!!!!
    // 처음에 this.tail = { ...this.tail, next: node }; 이렇게 깊은 복사를 통해서 this.tail을 this.head와 다른 객체로 만들어버렸다.
    // 이렇게 하면 this.head와 this.tail은 다른 객체의 메모리 주소를 가리키게 되고...이후에 내가 enqueue를 아무리 많이 해도 this.head의 next는 변화하지 않는다..
    // 그래서 무조건 같은 메모리 주소를 가리키게 this.tail.next = node 로 해야 this.head.next 도 node를 물고갈 수 있다.

    dequeue(): T {
      if (!this.head || !this.tail) throw new Error("This Queue is empty");
      const node: QueueNode<T> = this.head;
      this.head = this.head.next;
      this._size--;
      return node.value;
    }
  }

  const queue = new QueueImpl(5);
  queue.enqueue("1");
  console.log("추가", queue);
  queue.enqueue("2");
  console.log("추가", queue);
  queue.enqueue("3");
  console.log("추가", queue);
  queue.enqueue("4");
  console.log("추가", queue);
  queue.enqueue("5");
  console.log("추가", queue);
  console.log("-------------------------------");
  while (queue.size !== 0) {
    console.log("queue에서 나와라", queue.dequeue());
    console.log("변경된 queue", queue);
  }
}
