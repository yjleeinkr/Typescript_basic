{
    // Union Types : OR (|)
    type Direction = 'left' | 'right' | 'up' | 'down';
    function move(direction: Direction) {
        console.log(direction);
    }
    type TileSize = 8 | 16 | 32;
    const tile: TileSize = 16;

    type SuccessState = {
        response: {
            body: string;
        }
    }
    type FailState = {
        reason: string;
    }
    // function login -> success || fail
    type LoginState = SuccessState | FailState;
    function login() : LoginState {
        return { 
            response: {
                body: 'logged in!'
            }
        }
    }
    // function login(id: string, password: string): Promise<LoginState> {
    //     return {
    //         response: {
    //             body: 'logged in!'
    //         }
    //     }
    // }
    // 로그인 state에 따라 응답 내용이나 에러 메시지를 출력하는 함수
    function printLoginState(state: LoginState): void {
        if ('response' in state) {
            console.log(`success! ${state.response.body}`);
        } else {
            console.log(state.reason);
        }
    }
    // 위와 같이 많이 하기도 하지만 좋은 방법은 아니다. 따라서 Discriminated Union 을 사용하자
}