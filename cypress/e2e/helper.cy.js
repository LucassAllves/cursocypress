///<reference types ='cypress'/>

// helpers(ajudantes)

describe("Helper", () => {
  it("Wrap", () => {
    // wrap serve para encapsular
    const obj = { nome: "User", idade: 20 }; //definimos os valores das variaveis
    expect(obj).to.have.property("nome"); // inspecionamos se exite o valor nome
    cy.wrap(obj).should("have.property", "nome"); //aqui validamos usando o should com wrap pois sem ele da erro.

    cy.visit("https://www.wcaquino.me/cypress/componentes.html ");
    cy.get("#formNome").then(($el) => {
      //$el.val('funciona???')esse é um comando Jquery so que precisamos rodar no cypress
      cy.wrap($el).type("funciona via cypress"); // ai usamos o wrap para encapsular o metodo para rodar via cypress
    });

    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(10);
      }, 500);
    });

    cy.get("#buttonSimple").then(() =>
      console.log("Encontrei o Primeiro Botao")
    ); // pegamos dois valores e imprimimos no console
      //promise.then(num => console.log(num))pegamos a promise e gerenciamos ela
    cy.get("#buttonList").then(() => console.log("Encontrei o Segundo Botao"));
    cy.wrap(promise).then((ret) => console.log(ret)); //encapsulamos a promises dentro de wrap para o cypress coordenar as ações
  });
 
  //ITS PEGA UMA PROPRIEDADE DO OBJETO
  it("Its", () => {
    const obj = { nome: "User", idade: 20 };
    cy.wrap(obj).should("have.property", "nome", "User"); // estou verificando se existe a propriedade
    cy.wrap(obj).its("nome").should("be.equal", "User"); // estouusando o its para ver se tem  o valor

    const obj2 = { nome: "User", idade: 20, endereco: { rua: "dos bobos" } };
    cy.wrap(obj2).its("endereco").should("have.property", "rua");
    cy.wrap(obj2).its("endereco").its("rua").should("contain", "bobos");
    cy.wrap(obj2).its("endereco.rua").should("contain", "bobos");

    cy.visit("https://www.wcaquino.me/cypress/componentes.html");
    cy.title().its("length").should("be.equal", 20); // mais uma validação com its vendo quantos caracters tem com length
  });
  
  // PRENDENDO A INVOKAR UMA FUNÇÃO
  it("Invok", () => {
    const getValue = () => 1; //COLOCAMOS O VALOR 1 DENTRO DO GETVALUE
    const soma = (a, b) => a + b; // coloquei os valores em soma
    cy.wrap({ fn: getValue }).invoke("fn").should("be.equal", 1); //AGORA INVOCAMOS O GET QUE ESTA DENTRO DO FN E COMPARAMOS
    cy.wrap({ fn: soma }).invoke("fn", 2, 5).should("be.equal", 7); //encapsulei com wrap invokei a soma de 2 + 5 e fiz um assert se deu 7

    cy.visit("https://www.wcaquino.me/cypress/componentes.html ");
    cy.get("#formNome").invoke("val", "Texto Via Invoke"); // Dei um get no campo e com invoke eu coloquei o valor no campo digitando o mesmo.
    cy.window().invoke("alert", "Da pra Ver?"); // peguei o window da pagina e invokei uma msg de alert
    cy.get("#resultado").invoke(
      "html",
      '<input type="button", value="hached!"/>'
    ); // peguei o valor e invokei para mudar o HTML da pagina adicionando esse valores de botão.
  });
});
