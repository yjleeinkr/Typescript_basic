// tryConnect에서 발생할 에러가 많다면?
class TimeoutError extends Error {}
class OfflineError extends Error {}

class NetworkClient {
  tryConnect(): void {
    throw new Error('no network!')
  }
}

class UserService {
  constructor(private client: NetworkClient) { }
  login() {
    this.client.tryConnect();
    // login login...
  }
}

class App {
  constructor(private userService: UserService) { }
  // 에러 처리는 어떤 부분에서 해줘야 의미있는 에러처리일지 생각하고 에러처리하는 게 좋다.
  // ✅ 후속 처리가 필요한 부분에서 에러 처리를 해주는 게 좋다!
  run() {
    try {
      this.userService.login();
    } catch (err) {
      // 🚨 catch에서 받아오는 err는 any 타입이다. catch로 에러를 받는 순간 타입에 대한 정보가 사라진다!!
      // 후속 처리... show dialog to user 
      if (err instanceof OfflineError) {
        // 따라서 이런식으로 에러마다 처리가 불가능하다.
      }
    }
  }
}

const client = new NetworkClient();
const service = new UserService(client);
// service.login();
const app = new App(service);
app.run()