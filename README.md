# Typescript 

1. VSC 상에서 설정(cmd + ,)에서 `strict null` 검색 후 Typescript 항목 상의 `Strict Null Checks` 체크하기 `
2. `typescript` 전역 설치 후 버전 확인
3. `ts-node` : Typescript로 작성된 앱을 브라우저 외부에서 실행할 수 있게 해주는 Node.js 패키지 <br>
   => ts에서 js로 변환 및 실행까지 한꺼번에 도와준다.
```
npm i -g typescript
tsc -v 

npm i -g ts-node
ts-node -v
// ts-node 명령어 에러 시 PATH 설정 필요함
vi ~/.zshrc

// watch 옵션으로 변경 시 컴파일된 js 파일에 자동으로 반영된다
tsc main.ts -w
```

#### `ts-node [filename]` 에러가 난다면? <br>
- 타입스크립트에서 conosle을 인식하지 못해서 나타난 에러
```zsh
TSError: ⨯ Unable to compile TypeScript:
1-2-function.ts:30:9 - error TS2584: Cannot find name 'console'. 
Do you need to change your target library? Try changing the 'lib' compiler option to include 'dom'.
```
`@types/node` 설치로 해결 : Node.js 타입을 추가해준다.
```
npm i -g @types/node
```
