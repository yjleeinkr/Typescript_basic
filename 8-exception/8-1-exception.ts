namespace exception {
  type Position = {
    x: number;
    y: number;
  };

  let position: Position = { x: 0, y: 0 };

  type Command = "up" | "down" | "left" | "right" | "hi";

  function move(command: Command) {
    switch (command) {
      case "up":
        position.y += 1;
        break;
      case "down":
        position.y -= 1;
        break;
      case "left":
        position.x -= 1;
        break;
      case "right":
        position.x += 1;
        break;
      case "hi":
        position.x += 1;
        break;
      default:
        const invalid: never = command;
        // case 'hi' 가 없다면, 'string' 형식은 'never' 형식에 할당할 수 없습니다. 라는 에러가 뜬다.
        //✨ switch문 내에서 절대로 default로 오지 말아야하는 경우나 모든 케이스에 대해 코드를 구현하도록 강제해야할때 never 타입을 작성하곤 한다.
        throw new Error(`unknown command: ${invalid}`);
    }
  }
}

namespace Errorhandling {
  // Error(Exception) Handling: try -> catch -> finally
  function readFile(filename: string): string {
    if (filename === "not exist!") {
      throw new Error(`file not exist! : ${filename}`);
    }
    return "file contents";
  }

  function closeFile(filename: string) {
    //
  }

  const filename = "not exist!";
  try {
    console.log(readFile(filename));
  } catch (error) {
    console.log("catched error!");
  } finally {
    closeFile(filename);
    console.log("finally!");
  }
  console.log("!!!");
}
