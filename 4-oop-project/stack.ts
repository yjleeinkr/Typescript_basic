interface Stack {
    size: number;
    push(item: string): void;
    pop(): string | undefined;
}

class StackStructure implements Stack {
    public list: string[] = [];
    public size: number = 0;
    push(item: string): void {
        this.size += 1;
        this.list[this.size - 1] = item;
    }
    pop(): string | undefined {
        if (this.size === 0) return undefined;
        this.size -= 1;
        let arr: string[] = new Array(this.size);
        for (let i = 0; i < this.size; i++){
            arr[i] = this.list[i]
        }
        this.list = arr;
        return this.list[this.size - 1];
    }
}

const stack = new StackStructure();
console.log(stack)
stack.push('a')
stack.push('b')
stack.push('c')
stack.pop();
stack.push('d')
stack.push('e')
console.log(stack)
stack.pop()
console.log(stack)