/*/ Busca la pantalla de bienvenida por su ID
const welcomeScreen = document.getElementById('welcome-screen');
        
// Busca el contenedor principal del portafolio por su ID
const mainPortfolio = document.getElementById('main-portfolio');

// Agrega un evento de clic a la pantalla de bienvenida
welcomeScreen.addEventListener('click', () => {
    // Hacemos que la pantalla de bienvenida se desvanezca
    welcomeScreen.style.opacity = '0';

    // Mostramos el contenido del portafolio
    mainPortfolio.classList.remove('hidden');

    // Después de que termine la animación de desvanecimiento (500ms),
    // ocultamos completamente la pantalla de bienvenida para que no interfiera.
    setTimeout(() => {
        welcomeScreen.style.display = 'none';
    }, 1000);
});*/
// Archivo: js/main-welcome.js

import { createCoderScene } from './scenecoder.js';
import { createArtistScene } from './sceneartist.js';

const app = new PIXI.Application();
await app.init({ background: '#000000', resizeTo: window });
document.body.appendChild(app.canvas);

let activeSceneContainer;

// --- LÓGICA DE TRANSICIÓN ---

function iniciarEscenaCoder() {
    activeSceneContainer = createCoderScene(app, () => {
        // Cuando el texto termina de escribirse, llamamos a la transición.
        iniciarTransicionGlitch();
    });
    app.stage.addChild(activeSceneContainer);
}

function iniciarTransicionGlitch() {
    const glitchFilter = new PIXI.filters.GlitchFilter();
    activeSceneContainer.filters = [glitchFilter];

    setTimeout(() => {
        // Limpiamos la escena anterior
        activeSceneContainer.destroyScene();
        app.stage.removeChild(activeSceneContainer);
        
        // Cambiamos a la escena final del artista
        mostrarEscenaArtista();
    }, 500);
}

function mostrarEscenaArtista() {
    app.renderer.background.color = '#F5F5DC'; // Color Marfil
    
    const textoOriginal = "Bienvenido a mi mundo...";
    activeSceneContainer = createArtistScene(app, textoOriginal);
    app.stage.addChild(activeSceneContainer);

    // *** ¡AQUÍ ESTÁ LA NUEVA LÓGICA! ***
    // Creamos y mostramos el botón de "Entrar" después de un momento.
    setTimeout(crearBotonEntrar, 500); // Espera 1 segundo para mostrar el botón
}

function crearBotonEntrar() {
    const estiloBoton = new PIXI.TextStyle({
        fontFamily: '"Special Elite", cursive',
        fontSize: 28,
        fill: '#FFFFFF',
        stroke: { color: '#000000', width: 4, join: 'round' }
    });

    const botonEntrar = new PIXI.Text({ text: '[ Entrar al Portafolio ]', style: estiloBoton });
    botonEntrar.anchor.set(0.5);
    botonEntrar.position.set(app.screen.width / 2, app.screen.height - 80); // Abajo en la pantalla

    // Hacer que el botón sea interactivo
    botonEntrar.eventMode = 'static';
    botonEntrar.cursor = 'pointer';

    // La acción clave: redirigir a index.html al hacer clic
    botonEntrar.on('pointerdown', () => {
        window.location.href = 'index.html';
    });

    // Añadir el botón a la escena
    activeSceneContainer.addChild(botonEntrar);
}


// --- LOOP PRINCIPAL Y ARRANQUE ---

app.ticker.add(() => {
    if (activeSceneContainer && activeSceneContainer.update) {
        activeSceneContainer.update();
    }
});

// Arrancamos todo con la primera escena
iniciarEscenaCoder();