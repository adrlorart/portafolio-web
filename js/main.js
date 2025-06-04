// Busca la pantalla de bienvenida por su ID
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
});