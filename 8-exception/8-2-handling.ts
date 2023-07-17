// 에러 처리 시 어떤 부분에서 해줘야 의미있는 에러처리일지 생각하고 에러처리할 것
// ✨ 후속 처리가 필요한 부분에서 에러처리를 해주는 게 좋다.
// ex) UserService의 login 이 아닌 App의 run에서 해주는 게 좀 더 의미있다.
// 왜냐하면 login에서 에러처리(catch)를 해버리면 마지막 단계인 run에선 에러를 받지 못해서 에러에 따른 후속 처리를 해줄수가 없기 때문이다.
class NetworkClient {
  tryConnect(): void {
    throw new Error("no network!");
  }
}
class UserService {
  constructor(private client: NetworkClient) {}
  login() {
    this.client.tryConnect();
    // login...
  }
}

class App {
  constructor(private userService: UserService) {}
  run() {
    try {
      this.userService.login();
    } catch (err) {
      // show dialog to user 조금 더 의미있는 에러처리
      console.log("catched!");
    }
  }
}

const client = new NetworkClient();
const service = new UserService(client);
const app = new App(service);
app.run();
