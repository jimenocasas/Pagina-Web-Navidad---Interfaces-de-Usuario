
function mostrarPopupCartas() {
    const datosGuardados = JSON.parse(localStorage.getItem('datosUsuario')) || [];
    const usuarioActual = datosGuardados.find(usuario => usuario.sesionIniciada === 1);

    if (usuarioActual) { 
        // Mostrar las cartas del usuario
        document.getElementById('popup_Cartas').style.display = 'block';
        document.getElementById('profileDropdown').style.display = 'none';
        document.getElementById('popup_Perfil').style.display = 'none';
    } else {
        alert("Debes iniciar sesión para ver tus cartas.");
    }
    // Mostrar las cartas del usuario en el popup de cartas 
    const email = usuarioActual.email;
    const cartasGuardadas = JSON.parse(localStorage.getItem(`cartas_${email}`)) || [];
    const contenedorCartas = document.getElementById('contenedorCartas');
    contenedorCartas.innerHTML = '';
    // Mostrar un mensaje si el usuario no ha enviado ninguna carta 
    if (cartasGuardadas.length === 0) {
        contenedorCartas.innerHTML = '<h1>No has enviado ninguna carta.</h1>';
    } else { // Mostrar las cartas del usuario
        cartasGuardadas.forEach((carta, index) => {
            const cartaDiv = document.createElement('div');
            cartaDiv.classList.add('carta');
            cartaDiv.setAttribute('draggable', true);
            cartaDiv.setAttribute('ondragstart', 'handleDragStart(event)');
            cartaDiv.setAttribute('ondrop', 'handleDrop(event)');
            cartaDiv.setAttribute('ondragover', 'handleDragOver(event)');
            cartaDiv.dataset.index = index; // Añadir el índice como atributo de datos
            cartaDiv.innerHTML = `
                <h2>Carta ${index + 1}</h2>
                <p><strong>Nombre: ${carta.nombre}</strong></p>
                <p>Ciudad: ${carta.ciudad}</p>
                <p>País: ${carta.pais}</p>
                <button onclick="eliminarCarta(${index})">Eliminar</button>
                <button onclick="verCarta(${index})">Ver</button>
            `;
            contenedorCartas.appendChild(cartaDiv);
        });
    }

    // Aplicar eventos de drag and drop a las cartas
    aplicarEventosDragAndDrop();
}

function cerrarPopupCartas() {
    document.getElementById('popup_Cartas').style.display = 'none';
}

function cerrarPopupVerCartas() {
    document.getElementById('popupVerCartas').style.display = 'none';
}
// Función para eliminar una carta del usuario 
function eliminarCarta(index) {
    const datosGuardados= JSON.parse(localStorage.getItem('datosUsuario'));
    const usuarioActual = datosGuardados.find(usuario => usuario.sesionIniciada === 1);
    if (usuarioActual){ // Verificar si hay un usuario con la sesión iniciada 
        const email = usuarioActual.email;
        if (confirm("¿Estás seguro de que deseas eliminar esta carta?")) { 
            const cartasGuardadas = JSON.parse(localStorage.getItem(`cartas_${email}`)) || [];
            cartasGuardadas.splice(index, 1);
            localStorage.setItem(`cartas_${email}`, JSON.stringify(cartasGuardadas));
            mostrarPopupCartas();
        }
    }
}
// Función para ver una carta del usuario 
function verCarta(index) {
    const datosGuardados = JSON.parse(localStorage.getItem('datosUsuario'));
    const usuarioActual = datosGuardados.find(usuario => usuario.sesionIniciada === 1);
    if (usuarioActual){ 
        const email = usuarioActual.email;
        const cartasGuardadas = JSON.parse(localStorage.getItem(`cartas_${email}`)) || [];
        if (cartasGuardadas[index] && cartasGuardadas[index].carta) {
            const carta = cartasGuardadas[index].carta;
            document.getElementById('contenidoCarta').innerText = carta;
            document.getElementById('popupVerCarta').style.display = 'block';
        } else {
            console.error('Carta no encontrada o formato incorrecto');
        }
    }
}

function cerrarPopupVerCarta() {
    document.getElementById('popupVerCarta').style.display = 'none';
}


let dragSrcEl = null;

// Funciones para el drag and drop de las cartas 
function handleDragStart(e) {
    if (e.target.tagName === 'BUTTON') {
        e.preventDefault();
        return;
    }
    dragSrcEl = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', this.dataset.index);
    this.classList.add('dragging');
}

// Función para el dragover de las cartas
function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
}

// Función para el drop de las cartas 
function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    const srcIndex = e.dataTransfer.getData('text/plain');
    const destIndex = this.dataset.index;
    if (srcIndex !== destIndex) {
        const cartas = document.querySelectorAll('.carta');
        const srcElement = cartas[srcIndex];
        const destElement = cartas[destIndex];

        // Intercambiar el contenido innerHTML de las cartas
        const tempHTML = srcElement.innerHTML;
        srcElement.innerHTML = destElement.innerHTML;
        destElement.innerHTML = tempHTML;

        // Reaplicar eventos de drag and drop a las cartas
        aplicarEventosDragAndDrop();

        // Actualizar el orden de las cartas en localStorage
        actualizarOrdenCartas();
    }
    return false;
}

// Función para el dragend de las cartas
function handleDragEnd() {
    this.classList.remove('dragging');
}

// Función para aplicar eventos de drag and drop a las cartas completando los moviminetos de las cartas.
function aplicarEventosDragAndDrop() {
    const cartas = document.querySelectorAll('.carta');
    cartas.forEach((carta) => {
        carta.addEventListener('dragstart', handleDragStart);
        carta.addEventListener('dragover', handleDragOver);
        carta.addEventListener('drop', handleDrop);
        carta.addEventListener('dragend', handleDragEnd);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    aplicarEventosDragAndDrop();
});

// Función para actualizar el orden de las cartas en localStorage 
function actualizarOrdenCartas() {
    const datosGuardados= JSON.parse(localStorage.getItem('datosUsuario'));
    const usuarioActual = datosGuardados.find(usuario => usuario.sesionIniciada === 1);
    if (usuarioActual){ 
        const email = usuarioActual.email;
        const cartas = document.querySelectorAll('.carta');
        const nuevasCartas = [];
        cartas.forEach(carta => {
            nuevasCartas.push({ // Crea un objeto con los datos de la carta 
                nombre: carta.querySelector('p strong').innerText.replace('Nombre: ', ''),
                ciudad: carta.querySelectorAll('p')[1].innerText.replace('Ciudad: ', ''),
                pais: carta.querySelectorAll('p')[2].innerText.replace('País: ', ''),
                carta: carta.querySelector('.carta-content p').innerText
            });
        });
        localStorage.setItem(`cartas_${email}`, JSON.stringify(nuevasCartas));
    }
}


function enviarCarta(event) {
    event.preventDefault(); // Prevenir el envío del formulario

    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const ciudad = document.getElementById('ciudad').value;
    const pais = document.getElementById('pais').value;
    const carta = document.getElementById('carta').value;

    const datosGuardados = JSON.parse(localStorage.getItem('datosUsuario'));
    if (isEmail_log_in(email)===0) { 
    // Verificar si el usuario ha iniciado sesión
        alert("Debes iniciar sesión para enviar una carta. ");
        return false;
    }
    else if(isEmail_log_in(email)===-1){ // Verificar si el correo electrónico no está registrado
        alert("El correo electrónico no está registrado.");
        return false;
    }

    // Crear un objeto con los datos de la carta 
    const nuevaCarta = {
        nombre,
        email,
        ciudad,
        pais,
        carta
    };

     // Obtener las cartas del usuario del localStorage usando su email como clave
     let cartasUsuario = JSON.parse(localStorage.getItem(`cartas_${email}`)) || [];
     cartasUsuario.push(nuevaCarta);
     localStorage.setItem(`cartas_${email}`, JSON.stringify(cartasUsuario));
 
     alert("Carta enviada exitosamente.");
     document.querySelector('.carta-form').reset();
     return true;
}
// Función para verificar si un correo electrónico está registrado en la base de datos
function isEmail_log_in(email) {
    const datosGuardados = JSON.parse(localStorage.getItem('datosUsuario')) || [];
    const usuario = datosGuardados.find(usuario => usuario.email === email);
    if(usuario){
        return usuario ? usuario.sesionIniciada : null;
    }else{
        return -1;
    }
}