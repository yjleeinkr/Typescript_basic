{
  class TimeoutError extends Error {}
  class OfflineError extends Error {}
  
  type SuccessState = {
    result: 'success';
  }

  type NetworkErrorState = {
    result: 'fail';
    reason: 'offline' | 'down' | 'timeout';
  }

  type ResultState = SuccessState | NetworkErrorState;
  class NetworkClient {
    tryConnect(): ResultState {
      // throw new Error('no network!');
      // 네트워크 에러는 사실 tryConnect라는 함수를 작성할 때 예상할 수 있는 에러다!
      // ✅ 따라서 예상하지 못하게 throw를 남발하면 안되고 예상 가능한 ERROR STATE를 미리 만들자
      try {
        // 요청 보내고..
        return { result: 'success' }
      } catch (err) {
        // ... 에러 처리 코드
        return {result: 'fail', reason: 'offline'}
      }
    }
  }

  class UserService {
    constructor(private client: NetworkClient) {}
    login() {
      return this.client.tryConnect();
      // login login...
    }
  }

  class App {
    constructor(private userService: UserService) { }
    run() {
      try {
        // 최상단 레벨에선 받은 Error State를 가지고 후속 처리가 가능하다.
        const loginResult = this.userService.login();
        if (loginResult.result === 'success') {
          console.log('로그인 성공')
        } else {
          console.log(loginResult.reason);
        }
      } catch (err) {
        
      }
    }
  }
}

/* 
  ✨ 하위 레벨: UI 코드나 특정 프레임워크 코드에 종속하지 않은 순수 로직을 담고 있음 
  => try-catch를 이용해서 exception 처리해주기
*/

/* 
  ✨ 애플리케이션 레벨 : 사용자가 바로 인터렉션 할 수 있는 부분을 담당하는 UI 컴포넌트나 프레임워크 코드 
  => Error State로 감싸주는 게 좋다.
*/

// function login(id, pw) {} - 실패 시 에러를 던져서 try-catch를 사용하게 만드는 것보다
// function login(id, pw) {} - Success | Fail 성공, 실패 유무를 대비해둔다.