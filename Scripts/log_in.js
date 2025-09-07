function mostrarPopup_IS() {
    document.getElementById('popup_IS').style.display = 'block';
    cerrarPopup_R();
}

// Función para cerrar el popup de inicio de sesión
function cerrarPopup_IS() {
    document.getElementById('popup_IS').style.display = 'none';
    limpiarCamposIS();
    
}

function limpiarCamposIS() {
    document.getElementById('usuario_IS').value = '';
    document.getElementById('password_IS').value = '';

}

function iniciarSesion() {
    const usuario = document.getElementById('usuario_IS').value;
    const password = document.getElementById('password_IS').value;
    // Obtener los datos de usuario guardados en local storage
    const datosGuardados = JSON.parse(localStorage.getItem('datosUsuario')) || [];
    let usuarioEncontrado = null;
    
    for (let i = 0; i < datosGuardados.length; i++) {
        if (datosGuardados[i].usuario === usuario && datosGuardados[i].password === password) {
            usuarioEncontrado = datosGuardados[i];
            break;
        }
    }

    // Verificar si se encontró un usuario con las credenciales ingresadas
    if (usuarioEncontrado) {
        usuarioEncontrado.sesionIniciada = 1; // Cambiar el valor de sesionIniciada a 1
        localStorage.setItem('datosUsuario', JSON.stringify(datosGuardados)); // Guardar los datos actualizados en local storage
        alert("Inicio de sesión exitoso.");
        cerrarPopup_IS();
        actualizarBarraNavegacion();
    } else {
        alert("Usuario o contraseña incorrectos.");
    }
}

function actualizarBarraNavegacion() { // Función para actualizar la barra de navegación al iniciar sesión
    document.querySelector('.sing-in').style.display = 'none';
    document.querySelector('.register').style.display = 'none';
    document.getElementById('profileMenu').style.display = 'block';
}

function cerrarSesion() { 
    if (confirm("¿Estás seguro de que deseas cerrar la sesión?")) {
        const datosGuardados = JSON.parse(localStorage.getItem('datosUsuario')) || [];
        
        for (let i = 0; i < datosGuardados.length; i++) {
            if (datosGuardados[i].sesionIniciada === 1) {
                datosGuardados[i].sesionIniciada = 0; // Cambiar el valor de sesionIniciada a 0
                break;
            }
        }
        localStorage.setItem('datosUsuario', JSON.stringify(datosGuardados)); // Guardar los datos actualizados en local storage
        alert("Sesión cerrada.");
        actualizarBarraNavegacionAlCerrarSesion();
        location.reload();
    }
}

function actualizarBarraNavegacionAlCerrarSesion() { 
    document.querySelector('.sing-in').style.display = 'block';
    document.querySelector('.register').style.display = 'block';
    document.getElementById('profileMenu').style.display = 'none';
}