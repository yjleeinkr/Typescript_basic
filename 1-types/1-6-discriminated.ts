namespace DiscriminatedUnion {
    type SuccessState = {
        result: 'success',
        response: {
            body: string
        }
    }

    type FailState = {
        result: 'fail',
        reason: string
    }
    
    type LoginState = SuccessState | FailState;

    function login() : LoginState {
        return {
            result: 'success',
            response: {
                body: 'logged in!'
            }
        }
    }

    // ✨ Refactoring w/discriminated union
    function printLoginState(state: LoginState) {
        if (state.result === 'success') {
            console.log(`success! ${state.response.body}`);
        } else {
            console.log(state.reason)
        }
    }

}