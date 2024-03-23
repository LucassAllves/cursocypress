it('sem testes,ainda', () => { })
// trabalhando com conceito de assincronicidade.. tempo de espera com relação a resposta do sistema 
const getSomething = () => { 
    return new Promise ((resolve, reject) => {
        setTimeout(() => {
            resolve(13);
        }, 1000)
    })
}

const system = () => {
    console.log('init');
    getSomething().then(some => {
      console.log(`Something is ${some}`)
      console.log('end')
    })

    
    
}

system();