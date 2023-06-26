from django.shortcuts import render, redirect
from .models import *
import os
from django.conf import settings
from django.http import HttpResponse
import requests

import json


from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User


from apiRest.views import ObtenerProductos

# Create your views here.


def index(request):
    prod_lista = Producto.objects.all()
    

    produc = Producto.objects.all()
    print(produc)


    productos = []
    for p in prod_lista:
        if p.stock > 0:
            productos.append(p)
            
    

    if not request.user.is_authenticated:
        
        sesion = "sesion_no_ini"
        return render(request, "tienda/index.html", {"productos": productos,"sesion":sesion})   
    else:
        
        
        sesion = "sesion_ini"
        return render(request, "tienda/index.html", {"productos": productos,"sesion":sesion})

    


def cargarCrudProductos(request):
    categorias = Categoria.objects.all()
    productos = Producto.objects.all()
    return render(request,"tienda/crudProductos.html",{"cate":categorias,"prod":productos})
    
def agregarProducto(request):
    v_categoria = Categoria.objects.get(id_categoria = request.POST['cmbCategoria'])

    v_sku = request.POST['txtSku']
    v_nombre = request.POST['txtnombre']
    v_precio = request.POST['txtprecio']
    v_stock = request.POST['txtStock']
    v_descripcion = request.POST['txtDescripcion']
    v_imagen = request.FILES['txtImagen']

    Producto.objects.create(sku = v_sku, nombre = v_nombre, precio = v_precio,stock = v_stock, descripcion = v_descripcion, imagenUrl=v_imagen,categoriaId = v_categoria)
    
    return redirect('/tienda/crudProductos')

def eliminarProducto(request,codigo_producto):
    producto = Producto.objects.get(sku = codigo_producto)
    ruta_imagen = os.path.join(settings.MEDIA_ROOT, str(producto.imagenUrl))
    os.remove(ruta_imagen)
    producto.delete()
    return redirect('/tienda/crudProductos')

def cargarEditarProducto(request, sku):
    prod = Producto.objects.get(sku = sku)
    categorias = Categoria.objects.all()
    return render(request, "tienda/editarProducto.html", {"prod": prod,"cate": categorias})


def editarProducto(request):
    v_categoria = Categoria.objects.get(id_categoria = request.POST['cmbCategoria'])

    v_sku = request.POST['txtSku']
    productoBD = Producto.objects.get(sku = v_sku)
    v_nombre = request.POST['txtnombre']
    v_precio = request.POST['txtprecio']
    v_stock = request.POST['txtStock']
    v_descripcion = request.POST['txtDescripcion']


    try:
        v_imagen = request.FILES['txtImagen']
        ruta_imagen = os.path.join(settings.MEDIA_ROOT, str(productoBD.imagenUrl))
        os.remove(ruta_imagen)
    except:
        v_imagen = productoBD.imagenUrl

    productoBD.nombre = v_nombre
    productoBD.precio = v_precio
    productoBD.stock = v_stock
    productoBD.descripcion = v_descripcion
    productoBD.categoriaId = v_categoria
    productoBD.imagenUrl = v_imagen
    
    productoBD.save()

    return redirect('/tienda/crudProductos')


#Registro y logins de usuarios


def cargarRegistroUsuario(request):
    return render(request, "tienda/registro.html")



def registroUsuario(request):
    v_email = request.POST['txtEmail']
    v_nombreUsuario = request.POST['txtNomUsuario']
    v_password = request.POST['txtPassword']
    v_nombre = request.POST['txtNombre']
    v_apellido = request.POST['txtApellido']
    

    try:
        usu = User.objects.get(username = v_nombreUsuario)
    except:
        usu = None

    if usu != None:
        error = 'usuario'
        return render(request,"tienda/registro.html", {"error": error})


    try:
        cor = User.objects.get(email = v_email)
    except:
        cor = None

    if cor != None:
        error = 'email'
        return render(request,"tienda/registro.html", {"error": error})


    
    if len(v_password) < 8:
        #Error contra muy corta
        error = "contrasenia"
        return render(request,"tienda/registro.html", {"error": error})


    else:
        user = User.objects.create_user(v_nombreUsuario,v_email,v_password)
        user.name = v_nombre
        user.last_name = v_apellido

        user.save()

        return redirect("/tienda/login")
        


#Login usuario

def cargarLogin(request):
    return render(request, "tienda/login.html")

def iniciarSesion(request):
    v_username = request.POST['txtUsername']
    v_password = request.POST['txtPassword']
    
    
    user = authenticate(username=v_username, password=v_password)
    if user is not None:    
        login(request, user)
        mensaje = "ini_sesion_correcto"
        return redirect("/tienda/index", {"mensaje": mensaje})
    
    else:
        mensaje = "ini_sesion_incorrecta"
        return render(request, "tienda/login.html",{"mensaje":mensaje})
    


#Carrito 

def carrito(request):   
    
    data = json.loads(request.body) 
    print(data)
    for p in data:
        print("SKU",p['sku'])
        print("CANTIDAD",p['cantidad'])
    return HttpResponse("Gooood!")
    

def cargarCarrito(request):
    return render(request, "tienda/carrito.html")



def realizarCompra(request):
    user = request.user
    venta = Venta.objects.create(cliente = user)
    data = json.loads(request.body) 
    productos =[]
    for p in data:
        productos.append(Producto.objects.get(sku = p['sku']))
    venta.productos.set(productos)

    return HttpResponse("Compra realizada")
