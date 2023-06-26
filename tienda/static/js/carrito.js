$(function(){

    let jsonStorage = localStorage.getItem("storageProductosCarrito");
    let arrayCarrito = JSON.parse(jsonStorage);
    console.log(jsonStorage);
    console.log(arrayCarrito);

    let contCarrito = $("#containerCarrito");
    for (const i of arrayCarrito) {
        let codigo = i.sku;
        let imagen = i.imagen;
        let nombre = i.nombre;
        let precio = i.precio;
        let cantidad = i.cantidad;
        let precioTotal = precio * cantidad;
        let html = $(`<div id="prodCod${codigo}" class="row mt-3 rowProducto">
        <div class="col">
            <img class="imgCarrito" src=${imagen} alt="" srcset="">
        </div>
        <div class="col text-center">
            <p id="nombreProducto">${nombre}</p>
        </div>
        <div class="col">
            <p id="cantidadProductos${codigo}"> ${cantidad} </p>
            <button onclick="quitarCantidad(${codigo})" id="btnQuitarCantidad" class="btn btn-danger"> 
                <i class="material-icons">exposure_neg_1</i></button>
            <button onclick="agregarCantidad(${codigo})" id="btnAgregarCantidad" class="btn btn-success">
                <i class="material-icons">exposure_plus_1</i>
            </button>  
            
        </div>
        <div class="col">
            <p id="precioTotal${codigo}" class="p">${precioTotal}</p>
        </div>
        </div>`);
        contCarrito.append(html);
    }
    totalPagar();
});





function quitarCantidad(codigo){
    let eliminado = false;
    let sku = codigo
    let arrayTemporal = [];
    let jsonStorage = localStorage.getItem("storageProductosCarrito");
    let arrayCarrito = JSON.parse(jsonStorage);
    
    
    console.log(arrayCarrito);




    let index = arrayCarrito.findIndex(object => {
        return object.sku == sku;
    })

    console.log(index);

    
    
    arrayCarrito[index].cantidad = arrayCarrito[index].cantidad - 1;   

    let filtro = arrayCarrito.filter(e => e.cantidad <= 0);
    console.log("filtro",filtro);
    if(filtro.length > 0){
        for (const i of arrayCarrito) {
            if(i.sku != codigo){
                arrayTemporal.push(i);
            }
            else{
                eliminado = true
            }
        }
    }

    console.log(arrayTemporal);
    if(eliminado){
        let setStorage = JSON.stringify(arrayTemporal);
        localStorage.setItem("storageProductosCarrito",setStorage);  
    }
    else{
        let setStorage = JSON.stringify(arrayCarrito);
        localStorage.setItem("storageProductosCarrito",setStorage);  
    }
    


    let cantidad = arrayCarrito[index].cantidad;
    let precio = arrayCarrito[index].precio;
    cargarCarrito(codigo,cantidad,precio);
    totalPagar();
}

function agregarCantidad(codigo){
    let jsonStorage = localStorage.getItem("storageProductosCarrito");
    let arrayCarrito = JSON.parse(jsonStorage);
    let index = arrayCarrito.findIndex(object => {
        return object.sku == codigo;
    })
    
    arrayCarrito[index].cantidad = arrayCarrito[index].cantidad + 1;   
    
    let cantidad = arrayCarrito[index].cantidad;
    
    let precio = arrayCarrito[index].precio;

    let setStorage = JSON.stringify(arrayCarrito);
    localStorage.setItem("storageProductosCarrito",setStorage);  

    cargarCarrito(codigo,cantidad,precio);
    totalPagar();
};



function cargarCarrito(codigo,cantidad,precio){
    $(`#precioTotal${codigo}`).text(cantidad * precio);
    if(cantidad > 0){
        $(`#cantidadProductos${codigo}`).text(cantidad);
    }
    else{
        $(`#prodCod${codigo}`).remove();
    }
};


function totalPagar(){
    let jsonStorage = localStorage.getItem("storageProductosCarrito");
    let arrayCarrito = JSON.parse(jsonStorage);

    let totalPagar = 0;
    for (const i of arrayCarrito) {
        let totalProducto = i.cantidad * i.precio;
        totalPagar += totalProducto;
    }
    $("#totalPagar").text(`$${totalPagar}`)
}; 



let btnCarrito = document.getElementById("btnComprar");

btnCarrito.addEventListener('click',function(){

    let jsonStorage = localStorage.getItem("storageProductosCarrito");
    let arrayCarrito = JSON.parse(jsonStorage);

    
    productos = arrayCarrito;

    let token = document.getElementsByName('csrfmiddlewaretoken')[0].value;

    fetch('/tienda/realizarCompra',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'X-CSRFToken':token
        },
        body:JSON.stringify(productos)

    })


})