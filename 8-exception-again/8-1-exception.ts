// 예상 가능한 에러 = Error state (사용자의 입력 오류, 필요한 정보를 입력하지 않아서 생긴 에러 등)
// 예상치 못한 에러 = Exception (네트워크 오류, 메모리 부족 등)
// 로그인의 경우 로그인 실패는 예외 상황(exception)이 아니라 앱을 사용하는 use case 중 발생할 수 있는 케이스이기 때문에 ErrorState를 만들어서 관리하는 게 좋다.

// Error(Exception) Handling: try -> catch -> finally
function readFile(fileName: string): string {
  if (fileName === 'not exist!') throw new Error(`file not exist ${fileName}`);
  return 'file contents📝';
}

function closeFile(fileName: string) {
  console.log('closed File')
}

function run() {
  const fileName = 'not exist!';
  try {
    console.log(readFile(fileName));
  } catch (err) {
    console.log('catched!!');
    return; // finally 없이 try-catch 문 이후에 다른 코드를 작성했다면, catch에서 뭔가 return을 해버리면 실행되지않고 함수가 종료된다.
    // 따라서 에러 유무에 상관없이 마지막에 꼭 해줘야 할 일이 있다면 finally에서 실행할 것
  } finally {
    closeFile(fileName);
    // catch에서 return을 해도 finally는 무조건 실행된다.
  }
}

run();