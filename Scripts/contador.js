function actualizarContador() {
    const fechaObjetivo = new Date('December 24, 2024 23:59:00').getTime();
    const ahora = new Date().getTime();
    const diferencia = fechaObjetivo - ahora;

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

    document.getElementById('contador').innerHTML = `${dias} días ${horas} h ${minutos} min ${segundos} s`;
}

setInterval(actualizarContador, 1000);

