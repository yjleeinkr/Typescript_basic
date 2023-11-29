{
  function checkNotNullNum(arg: number | null): number {
    if (arg == null) throw new Error('not valid number');
    return arg;
  }
  const result = checkNotNullNum(1000000000);
  console.log(result);

  // 💩 타입을 유연하게 두기 위해 타입에 대한 정보가 없는 any를 넣는 건 좋지 않다!
  function checkNotNullAnyBad(arg: any | null): any {
    if (arg == null) throw new Error('not valid number');
    return arg;
  }
  const result2 = checkNotNullAnyBad('str')
  
  // generic: 통상적인, 일반적인, 다 포용하는.. 등의 의미
  // 유연하지만 타입 보장이 가능하다.
  // 인자 타입과 리턴 타입이 같게 보장할 수 있다.
  function checkNotNull<T>(arg: T | null): T { 
    if (arg == null) throw new Error('not valid number');
    return arg;
  }

  const number = checkNotNull(123);
  const bool: boolean = checkNotNull(true);
}