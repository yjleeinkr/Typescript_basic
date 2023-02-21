{
    type Coffee = {
        shots: number,
        hasMilk: boolean
    }

    type CoffeeMachine_T = {
        coffeeBeans: number,
        makeCoffee : () => Coffee
    }

    class CoffeeMachine  {
        coffeeBeans: number = 0;
        public BEANS_GRAM_PER_SHOT: number = 7;

        constructor(coffeeBeans: number) {
            this.coffeeBeans += coffeeBeans;
        }

       makeCoffee(shots: number, hasMilk?: boolean) : Coffee {
           if (this.coffeeBeans < shots * this.BEANS_GRAM_PER_SHOT) {
               throw new Error('Not enough coffee beans!');
           }
           this.coffeeBeans -= shots * this.BEANS_GRAM_PER_SHOT;
           return {
               shots: shots, hasMilk : hasMilk ?? false,
           }
       }
    }

    const nespresso = new CoffeeMachine(90);
    const coffee = nespresso.makeCoffee(2, true)
    const coffee2 = nespresso.makeCoffee(2)
    console.log(nespresso)
    console.log(coffee)
    console.log(coffee2)
}