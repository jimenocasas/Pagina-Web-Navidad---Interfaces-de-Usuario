// Función para calcular el día actual
function calcularDiaActual() {
    const hoy = new Date();
    return hoy.getDate();
}

// Función para abrir el pop-up con el contenido del día
function openPopup(day) {
    const currentDay = calcularDiaActual();
    if (day <= currentDay) {
        document.getElementById('popup_Calendario_' + day).style.display = 'block';
    } else {
        alert("EL DÍA ESTÁ POR LLEGAR.");
    }
}

function cerrarPopup(numero) {
    document.getElementById('popup_Calendario_' + numero).style.display = 'none';
}