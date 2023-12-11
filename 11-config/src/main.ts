'use strict';
console.log('여기도 출력')
// compilerOptions 
// compilerOptions > outDir : 빌드한 결과물이 저장되는 디렉토리 설정
// compilerOptions > rootDir : typescript가 있어야할 루트 디렉토리 지정, 이 디렉토리 바깥에 ts파일이 존재하면 컴파일 시 에러가 발생한다.

// exclude : 컴파일하지 않을 파일들을 배열로 열거 시 해당 파일들은 제외하고 컴파일한다.
// include : 컴파일할 파일들을 배열로 열거하면 해당 파일들만 컴파일한다.

class Car {
  engine = 0;
  move() {
    const engine = this.engine + 1;
    console.log(engine);
  }
}

const car = new Car();
car.move();