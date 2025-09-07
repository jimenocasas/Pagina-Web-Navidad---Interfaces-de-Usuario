function mostrarPopup_R() {
    document.getElementById('popup_R').style.display = 'block';
    cerrarPopup_IS();
}

function cerrarPopup_R() {
    document.getElementById('popup_R').style.display = 'none';
}

function limpiarCamposR() {
    if (confirm("¿Estás seguro de que deseas limpiar todos los campos?")) {
        document.getElementById('formRegistro').reset();
        document.getElementById('camposHijos').innerHTML = '';
    }
}
// Reglas de validación de la contraseña
function validatePassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]{2,}/.test(password); // Al menos 2 números
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
        return "La contraseña debe tener al menos 8 caracteres.";
    }
    if (!hasUpperCase) {
        return "La contraseña debe contener al menos una letra mayúscula.";
    }
    if (!hasLowerCase) {
        return "La contraseña debe contener al menos una letra minúscula.";
    }
    if (!hasNumbers) {
        return "La contraseña debe contener al menos dos números.";
    }
    if (!hasSpecialChar) {
        return "La contraseña debe contener al menos un carácter especial.";
    }
    return "valid";
}

// Valida los elementos del registro y guarda los datos en local storage
function validarRegistro() {
    const usuario = document.getElementById('usuario_R').value; 
    const password = document.getElementById('password_R').value;  
    const repetirPassword = document.getElementById('repetir_password_R').value;    
    const email = document.getElementById('email_R').value;
    const ciudad = document.getElementById('ciudad_R').value;
    const pais = document.getElementById('pais_R').value;
    const hijos = document.getElementById('hijos_R').value;

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Patrón para validar el correo electrónico

    if (usuario.length < 3) {
        alert("El nombre de usuario debe tener al menos 3 caracteres.");
        return;
    }
    if (isUserRegistered(usuario) === true) {
        alert("El nombre de usuario ya está registrado.");
        return;
    }
    
    // Manejo de excepciones para la validación de la contraseña y el correo electrónico 
    const passwordValidationMessage = validatePassword(password);
    if (passwordValidationMessage !== "valid") {
        alert(passwordValidationMessage);
        return;
    }
    if (password !== repetirPassword) {
        alert("Las contraseñas no coinciden.");
        return;
    }
    if (!regexEmail.test(email)) {
        alert("El correo electrónico no es válido.");
        return;
    }
    if (ciudad.length < 3) {
        alert("La ciudad debe tener al menos 3 caracteres.");
        return;
    }
    if (pais.length < 3) {
        alert("El país debe tener al menos 3 caracteres.");
        return;
    }

    if (isEmailRegistered(email) === true) {
        alert("El correo electrónico ya está registrado.");
        return;
    }

    // Guardar los datos en local storage
    const datosUsuario = {
        usuario,
        password,
        email,
        ciudad,
        pais,
        genero: document.getElementById('genero_R').value, 
        hijos: [],
        sesionIniciada: 0
    };
    // Guardar los datos de los hijos en el objeto datosUsuario 
    const numHijos = document.getElementById('hijos_R').value;
    // Iterar sobre los campos de los hijos y guardar los datos en el objeto datosUsuario
    for (let i = 0; i < numHijos; i++) {
        const nombreHijo = document.getElementById(`nombreHijo${i}`).value;
        const edadHijo = document.getElementById(`edadHijo${i}`).value;
        const juguetesHijo = document.getElementById(`jugueteHijo${i}`).value;

        if (nombreHijo && edadHijo && juguetesHijo) {
            datosUsuario.hijos.push({ nombre: nombreHijo, edad: edadHijo, juguetes: juguetesHijo });
        } else {
            alert(`Por favor, completa todos los campos para el hijo ${i + 1}.`);
            return;
        }
    }

    // Obtener los usuarios registrados actuales
    let usuariosRegistrados = JSON.parse(localStorage.getItem('datosUsuario')) || [];
    // Añadir el nuevo usuario a la lista
    usuariosRegistrados.push(datosUsuario);
    // Guardar la lista actualizada en local storage
    localStorage.setItem('datosUsuario', JSON.stringify(usuariosRegistrados));
    alert("Registro exitoso.");
    cerrarPopup_R();
}

// Muestra los campos de los hijos en el formulario de registro 
function mostrarCamposHijos() {
    const numHijos = document.getElementById('hijos_R').value;
    const camposHijos = document.getElementById('camposHijos');
    camposHijos.innerHTML = '';

    for (let i = 0; i < numHijos; i++) {
        camposHijos.innerHTML += `
            <h3>Hijo/Hija ${i + 1}</h3>
            <input type="text" id="nombreHijo${i}" placeholder="Nombre" required minlength="3">
            <input type="number" id="edadHijo${i}" placeholder="Edad" required>
            <input type="text" id="jugueteHijo${i}" placeholder="Juguetes favoritos">
        `;
    }
}

// Cancela el registro y cierra el popup de registro 
function cancelarRegistro() {
    if (confirm("¿Estás seguro de que deseas cancelar el registro?")) {
        document.getElementById('formRegistro').reset();
        document.getElementById('camposHijos').innerHTML = '';
        cerrarPopup_R();
    }
}

// Valida si el correo electrónico ya está registrado en la base de datos local 
function isEmailRegistered(email) {
    const datosUsuario = JSON.parse(localStorage.getItem('datosUsuario')) || [];
    
    for (let i = 0; i < datosUsuario.length; i++) {
        if (datosUsuario[i].email === email) {
            return true;
        }
    }
    return false;
}

// Valida si el usuario ya está registrado en la base de datos local
function isUserRegistered(usuario) {
    const datosUsuario = JSON.parse(localStorage.getItem('datosUsuario')) || [];
    for (let i = 0; i < datosUsuario.length; i++) {
        if (datosUsuario[i].usuario === usuario) {
            return true;
        }
    }
    return false;
}