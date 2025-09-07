
//Función para reservar una videollamada con Papá Noel
function reservarVideollamada(event){
    event.preventDefault();

    const nombre = document.getElementById('nombre-videollamada').value;
    const email = document.getElementById('email-videollamada').value;
    const fecha = document.getElementById('fecha-videollamada').value;
    const hora = document.getElementById('hora-videollamada').value;
    const mensaje = document.getElementById('mensaje-videollamada').value;

    //Comprobamos que el email esté registrado y la sesión iniciada
    const emailEstado = isEmailLogIn_cita_papa_noel(email); //-1 si no está registrado, 0 si no ha iniciado sesión, 1 si está registrado y ha iniciado sesión

    if (emailEstado === 0) {
        alert("Debes iniciar sesión para reservar una cita.");
        return;
    }
    else if (emailEstado === -1) {
        alert("El correo electrónico no está registrado.");
        return;
    }

    // Verificar que la fecha y hora de la reserva sean posteriores al día y hora actuales

    const fechaHoraReserva = new Date(`${fecha}T${hora}`);
    const fechaHoraActual = new Date();

    if (fechaHoraReserva <= fechaHoraActual) {
        alert("La fecha y hora de la reserva deben ser posteriores a la fecha y hora actuales.");
        return;
    }

    // Verificar si la fecha de la reserva es hoy
    const fechaActual = new Date(fechaHoraActual.toDateString());
    const fechaReserva = new Date(fechaHoraReserva.toDateString());

    if (fechaReserva.getTime() === fechaActual.getTime()) {
        // Si la fecha de la reserva es hoy, verificar que la hora sea al menos con 12 horas de previo aviso
        const diferenciaHoras = (fechaHoraReserva - fechaHoraActual) / (1000 * 60 * 60);
        if (diferenciaHoras < 12) {
            alert("Si la reserva es para hoy, debe hacerse con al menos 12 horas de previo aviso.");
            return;
        }
    }
    // Obtener el JSON general de carritos desde localStorage
    var videollamadas = JSON.parse(localStorage.getItem('videollamadas')) || {};

    // Si el carrito del usuario no existe, crearlo
    if (!videollamadas['videollamada_' + email]) {
        videollamadas['videollamada_' + email] = [];
    }

    // Crear un objeto con los datos de la cita
    const nuevaCita = {
        nombre,
        email,
        fecha,
        hora,
        mensaje
    };

    // Guardar la cita en el localStorage

    videollamadas['videollamada_' + email].push(nuevaCita);
    localStorage.setItem('videollamadas', JSON.stringify(videollamadas));

    /*let citasUsuario = JSON.parse(localStorage.getItem(`citas_${email}`)) || [];
    citasUsuario.push(nuevaCita);
    localStorage.setItem(`citas_${email}`, JSON.stringify(citasUsuario));*/

    alert("Cita reservada exitosamente.");
    document.getElementById('form-cita-papa-noel').reset();
}


// Función para verificar si un correo electrónico está registrado y la sesión está iniciada
function isEmailLogIn_cita_papa_noel(email_entrante) {
    
    // Recuperar los datos guardados en localStorage
    const datosGuardados = JSON.parse(localStorage.getItem('datosUsuario')) || [];
    console.log("Datos recuperados del localStorage:", datosGuardados);

    // Verificar si los datos son válidos
    if (!Array.isArray(datosGuardados)) {
        console.error("Error: los datos del usuario no son un arreglo válido.");
        return -1;
    }

    // Normalizar y buscar el usuario por correo electrónico
    const usuario = datosGuardados.find(
        usuario => usuario.email === email_entrante
    );
    console.log("Usuario encontrado:", usuario);

    if (usuario) {
        console.log(`Usuario encontrado: ${usuario.email}, sesión iniciada: ${usuario.sesionIniciada}`);
        return usuario.sesionIniciada;
    } else {
        console.warn("Correo electrónico no registrado.");
        return -1; // Usuario no encontrado
    }
}
