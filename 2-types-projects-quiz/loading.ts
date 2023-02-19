{
  /**
   * Print Loading State
   */
  // state라는 공통된 속성을 가지고 있으므로 이걸 활용하기! (discriminated union)
  type LoadingState = {
    state: 'loading';
  };

  type SuccessState = {
    state: 'success';
    response: {
      body: string;
    };
  };

  type FailState = {
    state: 'fail';
    reason: string;
  };

  type ResourceLoadState = LoadingState | SuccessState | FailState;

  function printLoginState(state: ResourceLoadState) {
    switch (state.state) {
      case 'loading':
        console.log("👀 loading...");
        break;
      case 'success':
        console.log(`😃 ${state.response.body}`)
        break;
      case 'fail':
        console.log(`😱 ${state.reason}`);
        break;
      default:
        console.log(`unknown state! : ${state}`)
    }
  }

  printLoginState({ state: 'loading' }); // 👀 loading...
  printLoginState({ state: 'success', response: { body: 'loaded' } }); // 😃 loaded
  printLoginState({ state: 'fail', reason: 'no network' }); // 😱 no network
}
