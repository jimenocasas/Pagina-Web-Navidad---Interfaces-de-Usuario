function cerrarPopupCarrito() {
    document.getElementById("popup_Carrito").style.display = "none";
}

function añadirAlCarrito(number) {
    var cantidad = document.getElementById("cantidad_producto_" + number).innerHTML;
    console.log(cantidad);
    var nombre = document.getElementById("nombre_producto_" + number).innerHTML;
    var imagen = document.getElementById("imagen_producto_" + number).src;
    var precioTexto = document.getElementById("precio_producto_" + number).innerHTML;
    // Extraer el precio del texto
    var precio = parseFloat(precioTexto.match(/(\d+(\.\d+)?)/)[0]);

    if (cantidad == 0) {
        alert("Selecciona una cantidad mayor que 0.");
        return;}

    const usuarioSesionIniciada = obtenerUsuarioSesionIniciada();
    if (!usuarioSesionIniciada) {
        alert("Inicia sesión para añadir productos al carrito.");
        return;
    }

    //Comprobamos que ese email no tenga ya en su carrito ese producto, porque sino se añadiría dos veces
    //Lo que haremos será sumarle la cantidad que se quiera añadir al producto que ya está en el carrito
    var carritos = JSON.parse(localStorage.getItem('carritos')) || {};
    if (carritos['carrito_' + usuarioSesionIniciada.email]) {
        var productos = carritos['carrito_' + usuarioSesionIniciada.email];
        for (var i = 0; i < productos.length; i++) {
            if (productos[i].nombre === nombre) {
                productos[i].cantidad = parseInt(productos[i].cantidad) + parseInt(cantidad);
                localStorage.setItem('carritos', JSON.stringify(carritos));
                alert("Producto añadido al carrito.");
                return;
            }
        }
    }

    // Crear objeto producto
    var producto = {
        cantidad: parseInt(cantidad),
        nombre: nombre,
        imagen: imagen,
        precio: precio
    };



    // Si el carrito del usuario no existe, crearlo
    if (!carritos['carrito_' + usuarioSesionIniciada.email]) {
        carritos['carrito_' + usuarioSesionIniciada.email] = [];
    }

    // Añadir el producto al carrito del usuario
    carritos['carrito_' + usuarioSesionIniciada.email].push(producto);

    // Guardar el JSON general de carritos actualizado en localStorage
    localStorage.setItem('carritos', JSON.stringify(carritos));

    alert("Producto añadido al carrito.");
}



function obtenerUsuarioSesionIniciada() {
    const datosGuardados = JSON.parse(localStorage.getItem('datosUsuario')) || [];
    const usuarioActual = datosGuardados.find(usuario => usuario.sesionIniciada === 1);
    return usuarioActual;
}

function mostrarCarrito() {
    const usuarioSesionIniciada = obtenerUsuarioSesionIniciada();

    const carritos = JSON.parse(localStorage.getItem('carritos')) || {};
    const productos = carritos['carrito_' + usuarioSesionIniciada.email] || [];

    const contenedorCarrito = document.getElementById('contenedorCarrito');
    const carritoVacio = document.getElementById('carritoVacio');
    const carritoLleno = document.getElementById('carritoLleno');
    const productosCarrito = document.getElementById('productosCarrito');
    const totalCarrito = document.getElementById('totalCarrito');

    productosCarrito.innerHTML = '';
    let total = 0;

    if (productos.length === 0) {
        carritoVacio.style.display = 'block';
        carritoLleno.style.display = 'none';
    } else {
        carritoVacio.style.display = 'none';
        carritoLleno.style.display = 'block';

        productos.forEach((producto, index) => {
            const productoHTML = `
                <div class="producto-carrito">
                    <img src="${producto.imagen}" alt="Imagen del producto">
                    <p>${producto.nombre}</p>
                    <p>Cantidad: ${producto.cantidad}</p>
                    <p>Precio: $${producto.precio * producto.cantidad}</p>
                    <button class='boton-eliminar-carrito' onclick="eliminarDelCarrito(${index})">Eliminar</button>
                </div>
            `;
            productosCarrito.innerHTML += productoHTML;
            total += producto.precio * producto.cantidad;
        });

        totalCarrito.innerHTML = `<p>Total: $${total.toFixed(2)}</p>`;
    }
    document.getElementById('profileDropdown').style.display = 'none';
    document.getElementById('popup_Perfil').style.display = 'none';
    document.getElementById("popup_Carrito").style.display = "block";
}

function eliminarDelCarrito(index) {
    const usuarioSesionIniciada = obtenerUsuarioSesionIniciada();
    const carritos = JSON.parse(localStorage.getItem('carritos')) || {};
    const productos = carritos['carrito_' + usuarioSesionIniciada.email] || [];

    productos.splice(index, 1);

    carritos['carrito_' + usuarioSesionIniciada.email] = productos;
    localStorage.setItem('carritos', JSON.stringify(carritos));

    mostrarCarrito();
}

// Función para comprar la cesta y guardar en la estructura organizada
function comprarCesta() {
    const usuarioSesionIniciada = obtenerUsuarioSesionIniciada();
    if (!usuarioSesionIniciada) {
        alert('No hay un usuario con sesión iniciada.');
        return;
    }

    const carritos = JSON.parse(localStorage.getItem('carritos')) || {};
    const productos = carritos[`carrito_${usuarioSesionIniciada.email}`] || [];

    const fecha = new Date();
    const fechaCompra = `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`;
    const horaCompra = `${fecha.getHours()}:${fecha.getMinutes()}`;

    const compra = {
        fecha: fechaCompra,
        hora: horaCompra,
        productos: productos
    };

    var compras = JSON.parse(localStorage.getItem('compras')) || {};
    if (!compras[`compras_${usuarioSesionIniciada.email}`]) {
        compras[`compras_${usuarioSesionIniciada.email}`] = [];
    }

    compras[`compras_${usuarioSesionIniciada.email}`].push(compra);
    localStorage.setItem('compras', JSON.stringify(compras));

    carritos[`carrito_${usuarioSesionIniciada.email}`] = [];
    localStorage.setItem('carritos', JSON.stringify(carritos));

    mostrarCarrito();
    cerrarCarrito();
    alert("Compra realizada con éxito.");
}


function cerrarCarrito(){
    document.getElementById("popup_Carrito").style.display = "none";
}