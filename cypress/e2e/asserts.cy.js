/// <reference types="cypress"/>
// aqui vamos verificar a validações iprementadas
it("Equality..", () => {
  const a = 1

  expect(a).equal(1)
  expect(a, "deveria ser 1").equal(1)
  expect(a).to.be.equal(1)
  expect(a).not.to.be.equal("b") // para negar que as variaveis são iguais!
})

it("Truthy", () => {
  const a = true
  const b = null
  let c
  expect(a).to.be.true
  expect(true).to.be.true
  expect(b).to.be.null
  expect(a).to.be.not.null
  expect(c).to.be.undefined
})

it("Object equality", () => {
  const obj = {
    a: 1,
    b: 2,
  }
  expect(obj).equal(obj)
  expect(obj).equals(obj)
  expect(obj).eq(obj)
  expect(obj).to.be.equal(obj)
  expect(obj).to.be.deep.equal({ a: 1, b: 2 }) //para verificar com os parametro tem que colocar o deep
  expect(obj).include({ a: 1 })
  expect(obj).to.be.property("b") //Setar a proprieade
  expect(obj).to.have.property("b", 2) // aqui pegamos a propriesdade e verificamos se ela tem o valor 2
  expect(obj).to.not.be.empty // verifica se o objeto nao esta vazio.
  expect({}).to.be.empty // verifica se esta vazio
})

it("Arrays", () => {
  const arr = [1, 2, 3]
  expect(arr).to.have.members([1, 2, 3])
  expect(arr).to.include.members([1, 3])
  expect(arr).to.not.be.empty
})

it("types", () => {
  const num = 1
  const str = "string"

  expect(num).to.be.a("number") // Verifica se é interio
  expect(str).to.be.a("string") // verifica se é string
  expect({}).to.be.a("object")
  expect([]).to.be.a("array")
  expect({}).to.be.an("object")
  expect([]).to.be.an("array")
})

it("String", () => {
  const str = "String de teste"

  expect(str).to.be.equal("String de teste")
  expect(str).to.have.length(15) //verifica pelo tanto de caracteres
  expect(str).to.to.contains("de") // verifica por apenas um dos textos
  expect(str).to.match(/de/) // verifica por um texto
  expect(str).to.match(/^String/) //pega o primeiro texto
  expect(str).to.match(/teste$/) //paga o ultimo texto
  expect(str).to.match(/.{15}/) //pega pela quantidade de carcteres
  expect(str).to.match(/|w+/) //pega somente letras
  expect(str).to.match(/|D+/) // nao contem numeros
})

it("Numbers", () => {
  const number = 4
  const floatNumber = 5.2123

  expect(number).to.be.equal(4)
  expect(number).to.be.above(3) //Esse numero é acima de 3
  expect(number).to.be.below(7) //esse numero é acima de 7
  expect(floatNumber).to.be.equal(5.2123)
  expect(floatNumber).to.be.closeTo(5.2, 0.1) // procurar numero proximo
  expect(floatNumber).to.be.above(5) //verifica se esta acima de 5
})
