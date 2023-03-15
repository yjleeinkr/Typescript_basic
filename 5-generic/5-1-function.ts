{
    function checkNotNullBad(arg: number | null): number {
        if (arg == null) throw new Error('not valid number');
        return arg;
    }

    function checkNotNullAnyBad(arg: any | null): any {
        if (arg == null) throw new Error("not valid number");
        return arg;
    }
    // 이럴 때 generic을 사용해준다!
    // 코딩을 할 때 타입이 결정된다.
    function checkNotNull<T>(arg: T | null): T {
        if (arg == null) throw new Error("not valid number");
        return arg;
    }

    const number = checkNotNull(123);
    const bool: boolean = checkNotNull(true);
    // 유연하지만 타입 보장이 가능하다!
}