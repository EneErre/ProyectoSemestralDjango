$(function(){
    let storagePokemones = localStorage.getItem("storagePokemones");
    if(storagePokemones === null){
        apiPokemon();
    }


    //apiPokemon();

    
})


function apiPokemon(){
    let listaPokemones = [1,2,3,875,272, 126]
    
    for (const i of listaPokemones) {
        
        fetch(`https://pokeapi.co/api/v2/pokemon-form/${i}/`)
        .then(response => response.json())
        .then(data =>{
            let stringPokemones = localStorage.getItem("storagePokemones");
            
            if (stringPokemones === null){
                const obj ={
                    codigo: i,
                    nombre: data.name,
                    sprite: data.sprites.front_default
                }
                let arrayIngresar = [obj]
                
                let stringIngresar = JSON.stringify(arrayIngresar);
                localStorage.setItem("storagePokemones",stringIngresar);
            }
            else{
                let arrayPokemones = JSON.parse(stringPokemones);
                const obj ={
                    codigo: i,
                    nombre: data.name,
                    sprite: data.sprites.front_default
                }
                console.log(obj);
                arrayPokemones.push(obj);
                let stringIngresar = JSON.stringify(arrayPokemones);
                localStorage.setItem("storagePokemones",stringIngresar);
            }            
        })  
    };
}