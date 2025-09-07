
//Función para abrir el pop-up con el contenido del producto
function abrirPopUpMarketplace(producto) {
    document.getElementById('popup_Marketplace_' + producto).style.display = 'block';
}

function cerrarPopUpMarketplace(producto) {
    document.getElementById('popup_Marketplace_' + producto).style.display = 'none';
}

function sumarArticulo(producto) {
    // Obtener el elemento que contiene la cantidad
    var cantidadElemento = document.getElementById('cantidad_producto_' + producto);
    var cantidad = parseInt(cantidadElemento.innerHTML);
    if (cantidad < 9){
        cantidad++;
    }
    cantidadElemento.innerHTML = cantidad;
}

function restarArticulo(producto) {
    var cantidad = parseInt(document.getElementById('cantidad_producto_'+ producto).innerHTML);
    if (cantidad > 0) {
        cantidad--;
    }
    document.getElementById('cantidad_producto_' + producto).innerHTML = cantidad;
}