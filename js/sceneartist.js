// Archivo: js/sceneArtist.js

export function createArtistScene(app, textoInicial) {
    const container = new PIXI.Container();

    // Fondo (opcional, si quisieras una textura)
     const fondoMarfil = PIXI.Sprite.from('imagenes/textura_papel.jpg');
     container.addChild(fondoMarfil);

    // Marco
    const marcoCrayon = new PIXI.Graphics();
    container.addChild(marcoCrayon);
    
    // Texto
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
    
    // Función para animar el marco
    container.update = () => {
        marcoCrayon.clear();
        marcoCrayon.stroke({ width: 4, color: 0x000000 });
        
        const margen = 30;
        const temblor = 5;

        // Lógica para dibujar el marco tembloroso (como antes)
        // ... (se puede copiar y pegar la función dibujarLineaTemblorosa aquí adentro)
    };
    
    return container;
}