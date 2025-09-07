
let intervaloTiempoCC;
let intervaloMovimiento;
let intervaloTiempoMemory;

function mostrarJuego(juego) {
    const contenedorJuego = document.getElementById('contenedor-juego');
    contenedorJuego.innerHTML = '';

    // Limpiar intervalos previos
    clearInterval(intervaloTiempoCC);
    clearInterval(intervaloMovimiento);
    clearInterval(intervaloTiempoMemory);

    if (juego === 'clickTheCircle') {
        iniciarClickTheCircle();
    } else if (juego === 'LaberintoNavideño') {
        iniciarLaberintoNavideño();
    } else if (juego === 'memory') {
        iniciarMemory();
    }
}

function iniciarClickTheCircle() {
    let puntos = 0;
    let tiempoRestanteCC = 60;

    const contenedorJuego = document.getElementById('contenedor-juego');
    contenedorJuego.innerHTML = `
        <div id="click-the-circle">
            <div id="circle" class="circle"></div>
        </div>
        <p>Puntuación: <span id="puntuacion">0</span></p>
        <p>Tiempo restante: <span id="tiempo">60</span> segundos</p>
    `;

    const circle = document.getElementById('circle');
    const puntuacion = document.getElementById('puntuacion');
    const tiempo = document.getElementById('tiempo');

    if (!circle || !puntuacion || !tiempo) return; // Verificación de elementos

    circle.addEventListener('click', () => {
        puntos++;
        puntuacion.textContent = puntos;
    });

    function moverCirculo() {
        const contenedor = document.getElementById('click-the-circle');
        if (contenedor) {
            const maxX = contenedor.clientWidth - circle.clientWidth;
            const maxY = contenedor.clientHeight - circle.clientHeight;
            const randomX = Math.floor(Math.random() * maxX);
            const randomY = Math.floor(Math.random() * maxY);
            circle.style.left = `${randomX}px`;
            circle.style.top = `${randomY}px`;
        }
    }

    function actualizarTiempoCC() {
        if (tiempoRestanteCC > 0) {
            tiempoRestanteCC--;
            tiempo.textContent = tiempoRestanteCC;
        } else {
            alert(`¡Tiempo terminado! Puntuación final: ${puntos}`);
            clearInterval(intervaloMovimiento);
            clearInterval(intervaloTiempoCC);
        }
    }

    intervaloMovimiento = setInterval(moverCirculo, 800); // Mueve el círculo cada 800ms
    intervaloTiempoCC = setInterval(actualizarTiempoCC, 1000); // Actualiza el tiempo cada segundo
}

/**************************************************************************************/

function iniciarMemory() {
    let tiempoRestanteMemory = 60;
    const contenedorJuego = document.getElementById('contenedor-juego');
    contenedorJuego.innerHTML = `
        <div class="memory-game" id="memory-game">
            <!-- Las cartas se generarán aquí -->
        </div>
        <p>Tiempo restante: <span id="tiempoMemory">60</span> segundos</p>
    `;

    const cartas = [
        '🎄', '🎄', '🎅', '🎅', '❄️', '❄️', '🎁', '🎁',
        '⛄', '⛄', '🦌', '🦌', '🔔', '🔔', '🌟', '🌟'
    ];

    const memoryGame = document.getElementById('memory-game');
    let primeraCarta, segundaCarta;
    let bloqueoTablero = false;
    let paresEncontrados = 0;

    function barajarCartas() {
        cartas.sort(() => 0.5 - Math.random());
    }

    function crearCartas() {
        barajarCartas();
        cartas.forEach(contenido => {
            const cartaElemento = document.createElement('div');
            cartaElemento.classList.add('memory-card');
            cartaElemento.dataset.contenido = contenido;
            cartaElemento.innerHTML = `
                <div class="front"></div>
                <div class="back">${contenido}</div>
            `;
            cartaElemento.addEventListener('click', voltearCarta);
            memoryGame.appendChild(cartaElemento);
        });
    }

    function voltearCarta() {
        if (bloqueoTablero) return;
        if (this === primeraCarta) return;

        this.classList.add('flipped');

        if (!primeraCarta) {
            primeraCarta = this;
            return;
        }

        segundaCarta = this;
        chequearPareja();
    }

    function chequearPareja() {
        let esPareja = primeraCarta.dataset.contenido === segundaCarta.dataset.contenido;
        esPareja ? desactivarCartas() : desvoltearCartas();
    }

    function desactivarCartas() {
        primeraCarta.removeEventListener('click', voltearCarta);
        segundaCarta.removeEventListener('click', voltearCarta);

        resetearTablero();
        paresEncontrados++;

        if (paresEncontrados === cartas.length / 2) {
            clearInterval(intervaloTiempoMemory);
            alert('¡Has ganado!');
        }
    }

    function desvoltearCartas() {
        bloqueoTablero = true;

        setTimeout(() => {
            primeraCarta.classList.remove('flipped');
            segundaCarta.classList.remove('flipped');
            resetearTablero();
        }, 1000);
    }

    function resetearTablero() {
        [primeraCarta, segundaCarta] = [null, null];
        bloqueoTablero = false;
    }

    function actualizarTiempoMemory() {
        if (tiempoRestanteMemory > 0) {
            tiempoRestanteMemory--;
            document.getElementById('tiempoMemory').textContent = tiempoRestanteMemory;
        } else {
            clearInterval(intervaloTiempoMemory);
            alert('¡Tiempo terminado!');
        }
    }

    crearCartas();
    intervaloTiempoMemory = setInterval(actualizarTiempoMemory, 1000);
}


/***************************************************************************************/

function iniciarLaberintoNavideño() {
    const contenedorJuego = document.getElementById('contenedor-juego');
    contenedorJuego.innerHTML = `
        <div id="laberinto-navideño">
            <!-- El laberinto se generará aquí -->
        </div>
    `;

    const laberinto = generarLaberinto(20, 20);

    const laberintoNavideño = document.getElementById('laberinto-navideño');

    for (let i = 0; i < laberinto.length; i++) {
        for (let j = 0; j < laberinto[i].length; j++) {
            const celda = document.createElement('div');
            celda.classList.add('celda');
            if (laberinto[i][j] === 1) {
                celda.classList.add('pared');
            } else if (laberinto[i][j] === 2) {
                celda.classList.add('meta');
            }
            laberintoNavideño.appendChild(celda);
        }
    }

    const elfo = document.createElement('div');
    elfo.id = 'elfo';
    laberintoNavideño.children[0].appendChild(elfo);

    document.addEventListener('keydown', moverElfo);
}

function generarLaberinto(ancho, alto) {
    const laberinto = Array.from({ length: alto }, () => Array(ancho).fill(1));
    const fronteras = [];

    function añadirFronteras(x, y) {
        if (x > 1 && laberinto[y][x - 2] === 1) fronteras.push([x - 2, y, x - 1, y]);
        if (x < ancho - 2 && laberinto[y][x + 2] === 1) fronteras.push([x + 2, y, x + 1, y]);
        if (y > 1 && laberinto[y - 2][x] === 1) fronteras.push([x, y - 2, x, y - 1]);
        if (y < alto - 2 && laberinto[y + 2][x] === 1) fronteras.push([x, y + 2, x, y + 1]);
    }

    function recorrer(x, y) {
        laberinto[y][x] = 0;
        añadirFronteras(x, y);

        while (fronteras.length > 0) {
            const [nx, ny, wx, wy] = fronteras.splice(Math.floor(Math.random() * fronteras.length), 1)[0];
            if (laberinto[ny][nx] === 1) {
                laberinto[ny][nx] = 0;
                laberinto[wy][wx] = 0;
                añadirFronteras(nx, ny);
            }
        }
    }

    laberinto[0][0] = 0;
    recorrer(0, 0);

    // Asegurarse de que la meta no esté rodeada por paredes
    laberinto[alto - 1][ancho - 1] = 2;
    laberinto[alto - 2][ancho - 1] = 0;
    laberinto[alto - 1][ancho - 2] = 0;

    return laberinto;
}

function moverElfo(event) {
    const elfo = document.getElementById('elfo');
    const laberintoNavideño = document.getElementById('laberinto-navideño');
    const celdas = Array.from(laberintoNavideño.children);
    const elfoIndex = celdas.indexOf(elfo.parentElement);

    let nuevaPosicion;
    if (event.code === 'KeyW') {
        nuevaPosicion = elfoIndex - 20;
    } else if (event.code === 'KeyS') {
        nuevaPosicion = elfoIndex + 20;
    } else if (event.code === 'KeyA') {
        nuevaPosicion = elfoIndex - 1;
    } else if (event.code === 'KeyD') {
        nuevaPosicion = elfoIndex + 1;
    }

    if (nuevaPosicion >= 0 && nuevaPosicion < celdas.length && !celdas[nuevaPosicion].classList.contains('pared')) {
        celdas[nuevaPosicion].appendChild(elfo);
        if (celdas[nuevaPosicion].classList.contains('meta')) {
            alert('¡Has llegado a la meta!');

        }
    }
}
