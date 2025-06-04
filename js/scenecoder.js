// Archivo: js/SceneCoder.js

export function createCoderScene(app, onComplete) {
    const container = new PIXI.Container();

    const textoCompleto = "Bienvenido a mi mundo...";
    const estiloTextoCodigo = new PIXI.TextStyle({
        fontFamily: '"Courier New", Courier, monospace',
        fontSize: 36,
        fill: '#00FF41',
        align: 'center',
    });

    const textoMaquina = new PIXI.Text({ text: '', style: estiloTextoCodigo });
    textoMaquina.anchor.set(0.5);
    textoMaquina.position.set(app.screen.width / 2, app.screen.height / 2);

    const cursor = new PIXI.Text({ text: '|', style: estiloTextoCodigo });
    cursor.anchor.set(0.5);
    cursor.position.set(textoMaquina.x + textoMaquina.width / 2, app.screen.height / 2);

    container.addChild(textoMaquina, cursor);

    // Animación de escritura
    let i = 0;
    const velocidadEscritura = 150;
    function escribir() {
        if (i < textoCompleto.length) {
            textoMaquina.text += textoCompleto.charAt(i++);
            cursor.x = textoMaquina.x + textoMaquina.width / 2;
            setTimeout(escribir, velocidadEscritura);
        } else {
            if (onComplete) onComplete(); // Llama a la función de completado
        }
    }

    // Cursor parpadeante
    const cursorInterval = setInterval(() => { cursor.visible = !cursor.visible; }, 400);

    // Iniciar la animación
    escribir();

    // Función para detener las animaciones de esta escena
    container.destroyScene = () => {
        clearInterval(cursorInterval);
    };

    return container;
}