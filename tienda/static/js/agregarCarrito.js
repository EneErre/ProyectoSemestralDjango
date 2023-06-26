$(function(){
    let productos = localStorage.getItem('storaProductosCarrito') 
    let arrayProductos = JSON.parse(productos)

    if (arrayProductos === null){
        storageProductos = [];
        let jsonCarrito = JSON.stringify(storageProductos);
        localStorage.setItem("storageProductosCarrito", jsonCarrito);
    }
})





function agregarProducto(vSku){
    
    let codigo = vSku;

    let storageCarrito = localStorage.getItem('storageProductosCarrito');
    let arrayStorageCarrito = JSON.parse(storageCarrito);


    let vPrecio = document.getElementById(`precio${vSku}`).value;
    let vNombre = $(`#nombre${vSku}`).val()

    let vImagen = $(`#imagen${vSku}`).val()


    let cantidad = 1;

   if (arrayStorageCarrito.length ==0){
        const obj = {
            sku: codigo,
            nombre: vNombre,
            precio: vPrecio,
            imagen: vImagen,
            cantidad: cantidad
        }
        arrayStorageCarrito.push(obj)
    }else{
        let index = arrayStorageCarrito.findIndex(object => {
            return object.sku === codigo;
        })
        if (index == -1){
            const obj = {
                sku: codigo,
                nombre: vNombre,
                precio: vPrecio,
                imagen: vImagen,
                cantidad: cantidad
            }
            arrayStorageCarrito.push(obj)
        }
        else{
            arrayStorageCarrito[index].cantidad += 1;
        }
    }
    
    
    console.log(arrayStorageCarrito);
    let insertarJsonCarrito = JSON.stringify(arrayStorageCarrito);
    localStorage.setItem("storageProductosCarrito", insertarJsonCarrito);

}
