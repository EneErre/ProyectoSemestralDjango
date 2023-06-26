$(function(){
    
    console.log($("#cambiarTema"));

    //Codigo que obtiene la latitud y longituda
    const success = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        


        apiClima(latitude,longitude);
    }

    const error = () =>{
        console.log("No se acepto el ver la localizacion");
    } 

    navigator.geolocation.getCurrentPosition(success, error); 

    setInterval(relojNavbar,1000);

})


//Llamado a la api que nos da nuestra temperatura
function apiClima(latitude, longitude){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=da4d398af2789ce687e5de34b5bfb64e&units=metric&units=standard/`)
        .then(response => response.json())
        .then(data =>{
            console.log(data);
            let codigoPokemon;
            let storagePokemones = localStorage.getItem("storagePokemones");
            let arrayPokemones = JSON.parse(storagePokemones);
            const temperatura = data.main.temp;
            const ubicacion = data.name
            
            let index;

            $("#navbarTemperatura").text(`C°${temperatura}`);
         
            if ( temperatura < 20){
                $("#txtMensajeTemperatura").text(`Hacen C°${temperatura} en ${ubicacion}. Abrigate o terminaras asi:`)
                codigoPokemon = 875;
                index = 5
            }
            else if (temperatura >=20 && temperatura < 30){
                $("#txtMensajeTemperatura").text(`Hacen C°${temperatura} en ${ubicacion}. Hace un buen clima, sale a disfrutar.`)
                codigoPokemon =272;
                index = 0
            }
            else{
                $("#txtMensajeTemperatura").text(`Hacen C°${temperatura} en ${ubicacion}. ME DERRITOOO`)
                codigoPokemon =126;
                index = 4
            }

            console.log(arrayPokemones);

                
                $("#imagenPokemon").attr("src",arrayPokemones[index].sprite)

        })

    

}

//Se obtiene la hora actual del sistema.
function relojNavbar(){
    let date = new Date
    let hora = date.getHours();
    let minutos = date.getMinutes();
    let segundos = date.getSeconds();
    
    $("#navbarHora").text(`${hora}:${minutos}:${segundos}`);
    
}


//Funcion para cambiar el tema.
$("#cambiarTema").on("change",function(){
    if ($("#cambiarTema").val() == "on"){
        console.log($("#cambiarTema").val());
        $("#cambiarTema").attr("value","of") 
        $("#navbar").attr("class","navbar navbar-expand-lg navbar-oscuro");
        $(".bodyClaro").attr("class","bodyOscuro")
        $(".headerProductosClaros").attr("class","headerProductosOscuros")
    } else{
        console.log($("#cambiarTema").val());
        $("#cambiarTema").attr("value","on") 
        $("#navbar").attr("class","navbar navbar-expand-lg navbar-claro");
        $(".headerProductosOscuros").attr("class","headerProductosClaros")
        $(".bodyOscuro").attr("class","bodyClaro")
    }
    
    
})