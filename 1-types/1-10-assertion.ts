{
  // Type Assertions π©
  // νμμ λν΄μ μ λ§ 100% νμ μ κ°μ§κ³  μμ λ
  // νμμ΄ μλ μλ°μ€ν¬λ¦½νΈμ κ°μ΄ μ¨μΌν  λ λΆκ°νΌνκ² μΈ μ μλ€.
  // μλ°μ€ν¬λ¦½νΈμ΄κΈ° λλ¬Έμ νμμ€ν¬λ¦½νΈλ λ­ λ¦¬ν΄νλμ§ μ ν μ μ μμ§λ§, λ΄λΆμ μΌλ‘ λ¬΄μ‘°κ±΄ νΉμ  νμμ λ¦¬ν΄νλ ν¨μκ° μλ€κ³  ν λ,
  function jsStrFunc(): any {
    return "hello";
    // return 2  - (result as string).length : μ½λλ₯Ό μμ±ν  λ μλ¬κ° λ¨μ§ μμ§λ§ μ±μ μ€ννλ©΄ undefined λ‘ μΆλ ₯λ¨
  }

  const result = jsStrFunc();
  console.log(result.length); // νμ€λ μ΄ ν¨μκ° λ­ λ¦¬ν΄νλμ§ λͺ°λΌμ stringκ³Ό κ΄λ ¨λ λ©μλκ° μλμΌλ‘ λΆλ¬μμ§μ§ μλλ€..
  console.log((result as string).length);
  console.log((<string>result).length);

  const wrong: any = 5;
  console.log((wrong as Array<number>).push(1)); // π±
  // μλ¬ λ°μνκ³  μ±μ΄ μ’λ£λλ€. - μλ°μ€ν¬λ¦½νΈμ λκ°μ΄ μλνκΈ° λλ¬Έμ λλλ‘ μ°μ§ μλκ² μ’λ€.

  function findNumbers(): number[] | undefined {
    return undefined;
  }

  const numbers = findNumbers();
  // const numbers = findNumbers()!;
  numbers!.push(2); // π± λ¬΄μ‘°κ±΄ νμμ μ₯λ΄ν΄λ²λ¦Ό (μ΄κ±΄ λ¬΄μ‘°κ±΄ numberλ₯Ό κ°μ§ λ°°μ΄μ΄μΌ)
    
  const button = document.querySelector('class')!; // 100% μν©μΌ λ μ°λ κ² μ’λ€.
}