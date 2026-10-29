// Variable global de pases
let pasesSeleccionados = 2;

// Actualizar cantidad de pases dinámicamente
function actualizarPases() {
    const select = document.getElementById('selectPases');
    pasesSeleccionados = select.value;
    const texto = pasesSeleccionados == 1 ? '1 persona' : `${pasesSeleccionados} personas`;
    document.getElementById('cantidadPasesTexto').innerText = texto;
}

// Abrir la invitación e iniciar audio
function abrirInvitacion() {
    document.getElementById('pantallaInicial').classList.add('oculto');
    document.getElementById('contenidoPrincipal').classList.remove('oculto');
    
    // Reproducir audio
    const audio = document.getElementById('musicaFondo');
    audio.play().catch(e => console.log("El navegador bloqueó la reproducción automática:", e));
    
    // Iniciar cuenta regresiva
    iniciarCuentaRegresiva();
}

// Alternar reproducción de música
function toggleMusica() {
    const audio = document.getElementById('musicaFondo');
    const btn = document.getElementById('btnAudio');
    if (audio.paused) {
        audio.play();
        btn.innerText = '🎵';
    } else {
        audio.pause();
        btn.innerText = '🔇';
    }
}

// Cuenta regresiva para el 22 de Noviembre de 2026 a las 17:30 h
function iniciarCuentaRegresiva() {
    const fechaEvento = new Date("Nov 22, 2026 17:30:00").getTime();

    const intervalo = setInterval(function() {
        const ahora = new Date().getTime();
        const diferencia = fechaEvento - ahora;

        if (diferencia < 0) {
            clearInterval(intervalo);
            document.getElementById("dias").innerText = "00";
            document.getElementById("horas").innerText = "00";
            document.getElementById("minutos").innerText = "00";
            document.getElementById("segundos").innerText = "00";
            return;
        }

        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

        document.getElementById("dias").innerText = dias < 10 ? '0' + dias : dias;
        document.getElementById("horas").innerText = horas < 10 ? '0' + horas : horas;
        document.getElementById("minutos").innerText = minutos < 10 ? '0' + minutos : minutos;
        document.getElementById("segundos").innerText = segundos < 10 ? '0' + segundos : segundos;
    }, 1000);
}

// Enlace directo a WhatsApp
function enviarWhatsApp() {
    const telefono = "524442152155"; // Número de teléfono configurado
    const textoPases = pasesSeleccionados == 1 ? "1 persona" : `${pasesSeleccionados} personas`;
    const mensaje = encodeURIComponent(`Hola, confirmo mi asistencia para la Boda de Oro de Silvia y Edmundo (${textoPases}). Nombres de los invitados: `);
    
    window.open(`https://wa.me/${telefono}?text=${mensaje}`, '_blank');
}