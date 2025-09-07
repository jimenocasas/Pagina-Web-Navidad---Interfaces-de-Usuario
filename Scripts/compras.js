
// Función para mostrar las compras
function mostrarCompras() {
    // Obtener el email del usuario con sesión iniciada
    var datosUsuarios = JSON.parse(localStorage.getItem('datosUsuario')) || [];
    var usuarioActual = datosUsuarios.find(usuario => usuario.sesionIniciada === 1);

    if (!usuarioActual) {
        alert('No hay un usuario con sesión iniciada.');
        return;
    }

    var email = usuarioActual.email;
    var compras = JSON.parse(localStorage.getItem('compras')) || {};
    var comprasUsuario = compras[`compras_${email}`] || [];

    var contenedorCompras = document.getElementById("productosComprados");
    var comprasVacias = document.getElementById("comprasVacias");
    var comprasRealizadas = document.getElementById("comprasRealizadas");
    var popupCompras = document.getElementById("popup_Compras");

    contenedorCompras.innerHTML = "";

    if (comprasUsuario.length > 0) {
        comprasVacias.style.display = "none";
        comprasUsuario.forEach((compra) => {
            var divCompra = document.createElement("div");
            divCompra.classList.add("compra");

            var fechaHora = document.createElement("p");
            fechaHora.innerHTML = `Fecha: ${compra.fecha} - Hora: ${compra.hora}`;
            divCompra.appendChild(fechaHora);

            var ul = document.createElement("ul");
            compra.productos.forEach(producto => {
                var li = document.createElement("li");
                li.innerHTML = `${producto.nombre} - ${producto.precio}€ - Cantidad: ${producto.cantidad}`;
                ul.appendChild(li);
            });
            divCompra.appendChild(ul);
            contenedorCompras.appendChild(divCompra);
        });
        comprasRealizadas.style.display = "block";
    } else {
        comprasVacias.style.display = "block";
        comprasRealizadas.style.display = "none";
    }

    document.getElementById('profileDropdown').style.display = 'none';
    document.getElementById('popup_Perfil').style.display = 'none';
    popupCompras.style.display = "block";
}

// Función para cerrar el popup de compras
function cerrarCompras() {
    document.getElementById("popup_Compras").style.display = "none";
}
