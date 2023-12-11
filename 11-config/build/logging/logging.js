"use strict";
console.log('hello!!');
// tsc logging.ts -w watch 모드로 자바스크립트로 컴파일
// tsc --init 하면 tsconfig.json 파일이 생성된다.
// 그리고 src 폴더 안에 > ts파일이 있으면 빌드할 시에 해당 폴더까지 빌드물로 나올줄 알았으나 자바스크립트 파일로만 컴파일되었다.
// 그 이유는 컴파일 시에 타입스크립트 파일이 처음 나오는 곳을 최상위로 결정하기 때문이다.
