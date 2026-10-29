// Abrir invitación y reproducir música
document.getElementById('btn-abrir').addEventListener('click', function() {
    // Ocultar pantalla de bienvenida
    const bienvenida = document.getElementById('pantalla-bienvenida');
    bienvenida.style.opacity = '0';
    setTimeout(() => {
        bienvenida.style.display = 'none';
    }, 800);

    // Mostrar contenido principal
    document.getElementById('invitacion-principal').classList.remove('oculto');

    // Reproducir música
    const musica = document.getElementById('musica-fondo');
    musica.play().catch(error => {
        console.log("El navegador requiere interacción para reproducir audio:", error);
    });
});

// Fecha del evento: 22 de Noviembre de 2026, 19:30:00
const fechaEvento = new Date('November 22, 2026 19:30:00').getTime();

const reloj = setInterval(function() {
    const ahora = new Date().getTime();
    const diferencia = fechaEvento - ahora;

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

    document.getElementById('dias').innerText = dias < 10 ? '0' + dias : dias;
    document.getElementById('horas').innerText = horas < 10 ? '0' + horas : horas;
    document.getElementById('minutos').innerText = minutos < 10 ? '0' + minutos : minutos;
    document.getElementById('segundos').innerText = segundos < 10 ? '0' + segundos : segundos;

    if (diferencia < 0) {
        clearInterval(reloj);
        document.getElementById('reloj').innerHTML = "<h3>¡Llegó el gran día!</h3>";
    }
}, 1000);

// Configuración del botón de WhatsApp
const telefono = "5214440000000"; // Reemplaza con tu número real con código de país y área
const mensaje = encodeURIComponent("¡Hola! Con mucho gusto confirmo mi asistencia a las Bodas de Oro de Silvia y Edmundo. ✨");
document.getElementById('btn-whatsapp').href = `https://wa.me/${telefono}?text=${mensaje}`;