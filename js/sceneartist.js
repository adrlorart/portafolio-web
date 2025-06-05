// Archivo: js/sceneArtist.js


export function createArtistScene(app, textoInicial) {
    console.log("[sceneartist.js] -> createArtistScene: Iniciando...");//comprobar inicio

    const container = new PIXI.Container();

    // Fondo (opcional, si quisieras una textura)
     const fondoMarfil = PIXI.Sprite.from('imagenes/textura_papel.jpeg');
     console.log(`[sceneartist.js] -> Intentando cargar textura: ${fondoMarfil}`);//combrobar carga de textura

     container.addChild(fondoMarfil);

    // Marco
    const marcoCrayon = new PIXI.Graphics();
    container.addChild(marcoCrayon);
    console.log("[sceneartist.js] -> Gráfico para marcoCrayon añadido al contenedor.");//comprobar adicion

    
    // 3. Lógica para dibujar una línea temblorosa
    // Esta función se usará dentro de container.update
    function lineaTemblorosa(graphics, x1, y1, x2, y2, ampTemblor) {
        graphics.moveTo(x1, y1);
        const segmentos = 20;
        for (let j = 1; j <= segmentos; j++) {
            const t = j / segmentos;
            const interpX = x1 + (x2 - x1) * t;
            const interpY = y1 + (y2 - y1) * t;
            const offsetX = (Math.random() - 0.5) * ampTemblor * 2;
            const offsetY = (Math.random() - 0.5) * ampTemblor * 2;
            graphics.lineTo(interpX + offsetX, interpY + offsetY);
        }
    }

    // 4. Texto
    const estiloTextoArtista = new PIXI.TextStyle({
        fontFamily: '"Special Elite", cursive',
        fontSize: 40,
        fill: '#333333',
        align: 'center',
    });
    const textoFinal = new PIXI.Text({ text: textoInicial, style: estiloTextoArtista });
    textoFinal.anchor.set(0.5);
    textoFinal.position.set(app.screen.width / 2, app.screen.height / 2);
    container.addChild(textoFinal);
    console.log("[sceneartist.js] -> Texto final añadido al contenedor.");//comp add text

    
    // 5. Función de actualización para animar el marco
    // Esta función DEBE ser llamada por el ticker en main-welcome.js
    let updateCount = 0; // Contador para depuración
    container.update = (ticker) => { // ticker es opcional pero a veces útil
        // Descomenta la siguiente línea para spam en consola y verificar si se llama:
        /* updateCount++;
         if (updateCount % 60 === 0) { // Loguea una vez por segundo aprox.
             console.log("[sceneArtist.js] -> container.update() ejecutándose...");
         }
        */
        marcoCrayon.clear(); // Borra el dibujo del marco del fotograma anterior
        marcoCrayon.stroke({ width: 4, color: 0x000000 }); // Define el estilo del trazo (negro, 4px)
        
        const margen = 30;
        const temblor = 5; // Amplitud del "temblor"
        const w = app.screen.width;
        const h = app.screen.height;

        // Dibujar los 4 lados del marco usando la función definida arriba
        lineaTemblorosa(marcoCrayon, margen, margen, w - margen, margen, temblor); // Lado superior
        lineaTemblorosa(marcoCrayon, w - margen, margen, w - margen, h - margen, temblor); // Lado derecho
        lineaTemblorosa(marcoCrayon, w - margen, h - margen, margen, h - margen, temblor); // Lado inferior
        lineaTemblorosa(marcoCrayon, margen, h - margen, margen, margen, temblor); // Lado izquierdo
    };

// Función para limpiar esta escena si es necesario
    container.destroyScene = () => {
        console.log("[sceneartist.js] -> Destruyendo escena del artista.");
        if (texturaFondoArtista && !texturaFondoArtista.destroyed) {
             texturaFondoArtista.destroy(true); // Opcional: destruir textura para liberar memoria
        }
    };

    console.log("[sceneartist.js] -> Creación de escena del artista completada. El marco debería dibujarse si 'update' es llamado.");
    return container;
}