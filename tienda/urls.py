from django.urls import path,include
from . import views




urlpatterns = [
    path('index',views.index, name="index"),

    path('crudProductos',views.cargarCrudProductos, name='crudProductos'),

    path('agregarProductoForm',views.agregarProducto),

    path('eliminarProducto/<codigo_producto>',views.eliminarProducto),
    path('editarProducto/<sku>',views.cargarEditarProducto),

    path('editarProducto',views.editarProducto),

    path('login',views.cargarLogin, name="login_usuario"),
    path('loginForm',views.iniciarSesion, name="iniciar_sesion"),


    path('registroUsuario',views.cargarRegistroUsuario, name="registro_usuario"),
    path('registroUsuarioForm',views.registroUsuario),
    
    #path('carrito',views.carrito),
    path('carrito',views.cargarCarrito),
    path('realizarCompra',views.realizarCompra)


]