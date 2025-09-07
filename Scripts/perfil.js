
// Funciones para mostrar y cerrar el popup de perfil
function mostrarPopupPerfil() {
    const datosGuardados = JSON.parse(localStorage.getItem('datosUsuario'));
    if (datosGuardados) { // Verificar si hay datos de usuario guardados
        const usuarioActual = datosGuardados.find(usuario => usuario.sesionIniciada === 1);
        if (usuarioActual) { // Verificar si hay un usuario con la sesión iniciada
        document.getElementById('perfil_usuario').value = usuarioActual.usuario;
        document.getElementById('perfil_password').value = usuarioActual.password;
        document.getElementById('perfil_email').value = usuarioActual.email;
        document.getElementById('perfil_ciudad').value = usuarioActual.ciudad;
        document.getElementById('perfil_pais').value = usuarioActual.pais;
        document.getElementById('perfil_genero').value = usuarioActual.genero;
        if (Array.isArray(usuarioActual.hijos)) {  // Verificar si el usuario tiene hijos
            document.getElementById('perfil_hijos').value = usuarioActual.hijos.length;
            mostrarCamposHijosPerfil(usuarioActual.hijos);
        } else {
            document.getElementById('perfil_hijos').value = 0;
            mostrarCamposHijosPerfil([]);
        }
        }
    }   // Si no hay datos de usuario guardados, no se hace nada
    document.getElementById('popup_Perfil').style.display = 'block';
    document.getElementById('profileDropdown').style.display = 'none';
    document.getElementById('popup_Cartas').style.display = 'none';
}

function cerrarPopupPerfil() {
    document.getElementById('popup_Perfil').style.display = 'none';
}

// Función para mostrar los campos de los hijos en el formulario de perfil 
function mostrarCamposHijosPerfil(hijos) {
    const numHijos = hijos.length;
    const camposHijosPerfil = document.getElementById('camposHijosPerfil');
    camposHijosPerfil.innerHTML = '';
    for (let i = 0; i < numHijos; i++) {
        camposHijosPerfil.innerHTML += `
            <h3>Hijo/Hija ${i + 1}</h3>
            <input type="text" id="nombreHijoPerfil${i}" placeholder="Nombre" required minlength="3" value="${hijos[i].nombre}">
            <input type="number" id="edadHijoPerfil${i}" placeholder="Edad" required value="${hijos[i].edad}">
            <input type="text" id="jugueteHijoPerfil${i}" placeholder="Juguetes favoritos" value="${hijos[i].juguetes}">
        `; 
    }
}
// Funciones para mostrar y cerrar el menú de perfil
function toggleProfileMenu() {
    const profileDropdown = document.getElementById('profileDropdown');
    profileDropdown.style.display = profileDropdown.style.display === 'block' ? 'none' : 'block';
}


function guardarPerfil() {
    const datosGuardados = JSON.parse(localStorage.getItem('datosUsuario')) || [];
    const usuarioActual = datosGuardados.find(usuario => usuario.sesionIniciada === 1);

    if (usuarioActual) { 
        const nuevoUsuario = document.getElementById('perfil_usuario').value;
        const nuevoEmail = document.getElementById('perfil_email').value;

        // Verificar si el nuevo nombre de usuario o correo electrónico ya están registrados
        const usuarioExistente = datosGuardados.find(usuario => usuario.usuario === nuevoUsuario && usuario !== usuarioActual);
        const emailExistente = datosGuardados.find(usuario => usuario.email === nuevoEmail && usuario !== usuarioActual);

        if (usuarioExistente) {
            alert("El nombre de usuario ya está registrado.");
            return;
        }

        if (emailExistente) {
            alert("El correo electrónico ya está registrado.");
            return;
        }
        // Actualizar los datos del usuario actual con los nuevos datos del formulario de perfil 
        usuarioActual.usuario = nuevoUsuario;
        usuarioActual.password = document.getElementById('perfil_password').value;
        usuarioActual.email = nuevoEmail;
        usuarioActual.ciudad = document.getElementById('perfil_ciudad').value;
        usuarioActual.pais = document.getElementById('perfil_pais').value;
        usuarioActual.genero = document.getElementById('perfil_genero').value;

        const numHijos = document.getElementById('perfil_hijos').value;
        usuarioActual.hijos = []; // Limpiar el array antes de añadir los hijos actualizados
        for (let i = 0; i < numHijos; i++) {
            const nombreHijo = document.getElementById(`nombreHijoPerfil${i}`).value;
            const edadHijo = document.getElementById(`edadHijoPerfil${i}`).value;
            const juguetesHijo = document.getElementById(`jugueteHijoPerfil${i}`).value;

            if (nombreHijo && edadHijo && juguetesHijo) {
                usuarioActual.hijos.push({ nombre: nombreHijo, edad: edadHijo, juguetes: juguetesHijo });
            } else {
                alert(`Por favor, completa todos los campos para el hijo ${i + 1}.`);
                return;
            }
        }

        localStorage.setItem('datosUsuario', JSON.stringify(datosGuardados));
        alert("Perfil actualizado.");
        cerrarPopupPerfil();
    } else {
        alert("No se encontró el usuario actual.");
    }
}
// Función para eliminar un hijo del perfil en el formulario de perfil 
document.getElementById('perfil_hijos').addEventListener('change', function() {
    const numHijos = this.value;
    const camposHijosPerfil = document.getElementById('camposHijosPerfil');
    camposHijosPerfil.innerHTML = '';
    for (let i = 0; i < numHijos; i++) {
        camposHijosPerfil.innerHTML += `
            <h3>Hijo/Hija ${i + 1}</h3>
            <input type="text" id="nombreHijoPerfil${i}" placeholder="Nombre" required minlength="3">
            <input type="number" id="edadHijoPerfil${i}" placeholder="Edad" required>
            <input type="text" id="jugueteHijoPerfil${i}" placeholder="Juguetes favoritos">
        `;
    }
});