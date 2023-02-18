# Typescript 

1. VSC 상에서 설정(cmd + ,)에서 `strict null` 검색 후 Typescript 항목 상의 `Strict Null Checks` 체크하기 `
2. typescript 전역 설치 후 버전 확인
```
npm i -g typescript
tsc -v 

npm i -g ts-node
// ts-node 명령어 에러 시 PATH 설정 필요함
vi ~/.zshrc

// watch 옵션으로 변경 시 컴파일된 js 파일에 자동으로 반영된다
tsc main.ts -w
```