// import run, { print as printMessage } from './10-3-module1.js';
// export default 로 내보낸 건 import 해올 시 이름을 자유롭게 지정할 수 있다.
// 반면 export 로 내보낸 건 as를 사용하여 이름을 지정해야한다. 

// console.log(run(1, 2));
// printMessage();

// 혹은 전부 export로 내보냈다면, 아래와 같이 * 로 전체를 다 가져와 써도 된다.
import * as calculator from './10-3-module1.js';
console.log(calculator.add(1, 2))
calculator.print()

// 모듈화를 이용하면 파일들 간의 이름 충돌을 방지할 수 있고, 서로 간의 코드를 분리해 모듈성도 높여주며, 재사용성도 올라간다.
