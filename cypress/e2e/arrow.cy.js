describe("Arrow Function", () => {
  it("nada agora", function () {});
  // essa é uma das formas de trabalhar com arrow(Flecha)
  function soma(a, b) {
    return a + b;
  }

  console.log(soma(3, 2));

  // Essa é mais uma forma de flechar uma function
  const soma1 = function (a, b) {
    return a + b;
  };

  console.log(soma1(3, 2));

  // Essa é mais uma forma de exercitar a function
  const soma3 = (a, b) => {
    return a + b;
  };

  console.log(soma3(1, 6));

  const soma4 = () => 5 + 5;

  console.log(soma4(4 + 1));

  // essa é uma forma de você pegar o contexto.
  it("a function test...", function () {
    console.log("Function", this);
  });
});
