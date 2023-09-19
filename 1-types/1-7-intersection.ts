{
  // Intersection Type : And (&)
  type Student = {
    name: string;
    score: number;
  };

  type Worker = {
    employeeId: number;
    work: () => void;
  };

  // person 인자 전달 시 Student와 Worker가 가져야할 속성을 다 포함해야한다.
  function interWork(person: Student & Worker) {
    console.log(person.name, person.employeeId, person.work());
  }

  // 아래 속성 중 하나라도 빠지면 에러
  interWork({
    name: "yj",
    score: 500,
    employeeId: 3,
    work: () => {},
  });
}
