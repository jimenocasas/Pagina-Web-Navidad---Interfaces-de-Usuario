let paginaActual = 1;
const totalPaginas = 4; // Cambia esto según el número de páginas que tengas

function mostrarPagina(pagina) {
  for (let i = 1; i <= totalPaginas; i++) {
    document.getElementById(`pagina${i}`).style.display = 'none';
  }
  document.getElementById(`pagina${pagina}`).style.display = 'block';
  actualizarIndicador(pagina);
}

function paginaAnterior() {
  if (paginaActual > 1) {
    paginaActual--;
    mostrarPagina(paginaActual);
  }
}

function paginaSiguiente() {
  if (paginaActual < totalPaginas) {
    paginaActual++;
    mostrarPagina(paginaActual);
  }
}

function actualizarIndicador(pagina) {
    document.getElementById('indicador').innerText = `${pagina} / ${totalPaginas}`;
  }


// Inicializar la primera página
mostrarPagina(paginaActual);