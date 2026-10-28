// Fecha del evento: 22 de Noviembre de 2026, 19:30:00
const fechaEvento = new Date('November 22, 2026 19:30:00').getTime();

const reloj = setInterval(function() {
    const ahora = new Date().getTime();
    const diferencia = fechaEvento - ahora;

    // Cálculos de tiempo
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

    // Mostrar los valores en el HTML
    document.getElementById('dias').innerText = dias < 10 ? '0' + dias : dias;
    document.getElementById('horas').innerText = horas < 10 ? '0' + horas : horas;
    document.getElementById('minutos').innerText = minutos < 10 ? '0' + minutos : minutos;
    document.getElementById('segundos').innerText = segundos < 10 ? '0' + segundos : segundos;

    // Si la fecha ya pasó
    if (diferencia < 0) {
        clearInterval(reloj);
        document.getElementById('reloj').innerHTML = "<h3>¡Llegó el gran día!</h3>";
    }
}, 1000);

// Configuración del botón de WhatsApp con mensaje predeterminado
const telefono = "5210000000000"; // Reemplazar con el número real de WhatsApp
const mensaje = encodeURIComponent("¡Hola! Con mucho gusto confirmo mi asistencia a las Bodas de Oro de Silvia y Edmundo. ✨");
document.getElementById('btn-whatsapp').href = `https://wa.me/${telefono}?text=${mensaje}`;