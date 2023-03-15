{
   // Array 사용하지 않고 단일 연결 리스트로 Stack 구현하기
    interface Stack {
        readonly size: number;
        push(value: string): void;
        pop(): string;
    }

    type StackNode = {
        readonly value: string;
        // next: StackNode | undefined;
        readonly next?: StackNode; // 값이 있을수도 없을수도 있는 경우 : | 대신 ? 로 정의
        // 한번 값이 들어오면 그 내부 값이 변경되지 않게 불변성유지를 위해 readonly 속성을 붙여준다.
    }

    class StackImpl implements Stack{
        private _size: number = 0;
        // readonly를 붙여버리면 내부에서도 변경이 불가능하므로 private 붙여준다.
        // 내부에서 사용하는 변수는 아래 getter와 겹치므로 _ 를 붙여서 쓰곤 한다.
        private head?: StackNode;

        // 보통 자료 구조 만들 때 얼만큼의 사이즈를 허용할건지 이니셜 밸류를 설정해두면 좋다
        constructor(private capacity: number){}

        get size() {
            return this._size
        }
        push(value: string) {
            if(this.size === this.capacity) throw new Error('Stack is full!')
            const node: StackNode = { value, next: this.head }
            this.head = node; 
            this._size++;
        }
        pop(): string {
            if (this.head == null) {
                throw new Error('Stack is empty!')
            }
            const node = this.head
            this.head = node.next
            this._size--;
            return node.value
        }
    }

    const stack = new StackImpl(10)
    stack.push('🥺1')
    stack.push('😩2')
    stack.push('🤗3')
    while (stack.size !== 0) {
        console.log(stack.pop())
    }

    stack.pop()

}