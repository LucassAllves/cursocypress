it("nada agora", function() { })
// essa é uma das formas de trabalhar com arrow(Flecha)
//function soma(a, b){
//    return a + b
//}
//
//console.log (soma(3, 2))

// Essa é mais uma forma de flechar uma function
//const soma = function (a, b){
// return a + b
//}
//
//console.log (soma(3, 2))

//Essa é mais uma forma de exercitar a function
//const soma = (a, b) => {
//    return a + b
//} 
//
//console.log (soma(1, 6))


const soma = () => 5 + 5 

console.log (soma(4 + 1)) 

// essa é uma forma de você pegar o contexto.
it ("a function test...", function(){
    console.log("Function", this)
})

