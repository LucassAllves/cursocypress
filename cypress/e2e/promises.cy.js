it("Sem testes,ainda", () => {});
//Trabalhando com conceito de assincronicidade... tempo de espera com relação a resposta do sistema

const getSomeThing = (callback) => {
  setTimeout(() => {
    callback(11);
  }, 1000);
};

const system = () => {
  console.log("Init");
  getSomeThing((some) => console.log(`Something is ${some}`));
  console.log("End");
};

// resultado com callback(fazemos todas as demais tarefas para retornar o something quando concluir a chamada callback)
// Init
// End
// Something is 12

const getSomething1 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(12);
    }, 1000);
  });
};

const system1 = () => {
  console.log("init");
  getSomething1().then((someThing) => {
    console.log(`Something is ${someThing}`);
    console.log("end");
  });
};

// Resultado com a promisse(forma simplificada do callback)(Esperamos de fato resolver a função esperado para seguir para proximo passo)
// Init
// Something is 12
// End

// Usando assyc para simplificar ainda mais(A documentação do cypress recomenda não utilizar)

const getSomething2 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(13);
    }, 1000);
  });
};

const system2 = async () => {
  console.log("init");
  const someThing = await getSomething2();
  console.log(`Something is ${someThing}`);
  console.log("end");
};

system();
system1();
system2();
