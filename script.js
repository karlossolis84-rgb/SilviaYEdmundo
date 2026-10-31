// Variables globales
let numeroPases = 2;
let nombreInvitado = "Familia e Invitados Especiales";

// Detectar parámetros en la URL al cargar la página
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    
    if (urlParams.get('admin') === 'true') {
        document.getElementById('panelAdmin').classList.remove('oculto');
    }

    if (urlParams.has('invitado')) {
        nombreInvitado = urlParams.get('invitado');
        document.getElementById('mostrarNombreInvitado').textContent = nombreInvitado;
    }

    if (urlParams.has('pases')) {
        numeroPases = parseInt(urlParams.get('pases'), 10) || 2;
    }

    actualizarTextosPases();
});

function actualizarTextosPases() {
    const badgePases = document.getElementById('badgePasesTexto');
    const textoPasesElemento = document.getElementById('cantidadPasesTexto');
    
    const textoPasesStr = numeroPases + (numeroPases === 1 ? ' pase reservado' : ' pases reservados');
    
    if (badgePases) badgePases.textContent = textoPasesStr;
    if (textoPasesElemento) textoPasesElemento.textContent = numeroPases + (numeroPases === 1 ? ' pase' : ' pases');
}

function abrirInvitacionSobre() {
    const solapaIzq = document.getElementById('solapaIzquierda');
    const solapaDer = document.getElementById('solapaDerecha');
    const contenidoPortada = document.getElementById('contenidoPortada');
    const pantallaInicial = document.getElementById('pantallaInicial');
    const contenidoPrincipal = document.getElementById('contenidoPrincipal');
    const musica = document.getElementById('musicaFondo');

    // Iniciar animación de apertura hacia los lados
    if (solapaIzq && solapaDer) {
        solapaIzq.classList.add('abrir-izq');
        solapaDer.classList.add('abrir-der');
    }
    
    if (contenidoPortada) {
        contenidoPortada.classList.add('desvanecer-centro');
    }

    // Reproducir música de fondo
    if (musica) {
        musica.play().catch(error => {
            console.log("El navegador requirió interacción previa para audio:", error);
        });
    }

    // Esperar a que se abran las puertas para mostrar el contenido
    setTimeout(() => {
        pantallaInicial.classList.add('oculto');
        contenidoPrincipal.classList.remove('oculto');
        iniciarContador();
    }, 900);
}

function toggleMusica() {
    const musica = document.getElementById('musicaFondo');
    const btnAudio = document.getElementById('btnAudio');

    if (musica.paused) {
        musica.play();
        btnAudio.textContent = "🎵";
    } else {
        musica.pause();
        btnAudio.textContent = "🔇";
    }
}

function iniciarContador() {
    const fechaEvento = new Date("Nov 22, 2026 17:30:00").getTime();

    const timer = setInterval(function() {
        const ahora = new Date().getTime();
        const diferencia = fechaEvento - ahora;

        if (diferencia < 0) {
            clearInterval(timer);
            document.getElementById("dias").textContent = "00";
            document.getElementById("horas").textContent = "00";
            document.getElementById("minutos").textContent = "00";
            document.getElementById("segundos").textContent = "00";
            return;
        }

        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

        document.getElementById("dias").textContent = String(dias).padStart(2, '0');
        document.getElementById("horas").textContent = String(horas).padStart(2, '0');
        document.getElementById("minutos").textContent = String(minutos).padStart(2, '0');
        document.getElementById("segundos").textContent = String(segundos).padStart(2, '0');
    }, 1000);
}

function enviarWhatsApp() {
    const telefono = "524442152155";
    const texto = `¡Hola Silvia y Edmundo! Soy ${nombreInvitado}. Confirmo nuestra asistencia para ${numeroPases} ${numeroPases === 1 ? 'persona' : 'personas'} a sus Bodas de Oro. ¡Allá nos vemos! 💍✨`;
    const urlWhatsApp = `https://wa.me/${telefono}?text=${encodeURIComponent(texto)}`;
    window.open(urlWhatsApp, '_blank');
}

function generarYEnviarInvitacion() {
    const nombreInput = document.getElementById('adminNombreInvitado').value.trim() || "Invitado Especial";
    const pasesSelect = document.getElementById('adminPases').value;
    const telInput = document.getElementById('adminTelInvitado').value.trim();

    const urlBase = "https://karlossolis84-rgb.github.io/SilviaYEdmundo/";
    const enlacePersonalizado = `${urlBase}?invitado=${encodeURIComponent(nombreInput)}&pases=${pasesSelect}`;

    const mensajeWhatsApp = `✨ ¡Hola ${nombreInput}! ✨\n\nSilvia y Edmundo tienen el honor de invitarte a celebrar sus Bodas de Oro 💍 (50 años de matrimonio).\n\nHemos reservado ${pasesSelect} ${pasesSelect === '1' ? 'pase' : 'pases'} especialmente para ti.\n\nPuedes ver todos los detalles de la invitación y confirmar tu asistencia en el siguiente enlace:\n${enlacePersonalizado}`;

    let urlShare = "";
    if (telInput !== "") {
        const telLimpio = telInput.replace(/\D/g, '');
        urlShare = `https://wa.me/${telLimpio}?text=${encodeURIComponent(mensajeWhatsApp)}`;
    } else {
        urlShare = `https://wa.me/?text=${encodeURIComponent(mensajeWhatsApp)}`;
    }

    window.open(urlShare, '_blank');
}

function ocultarAdminYVerInvitacion() {
    document.getElementById('panelAdmin').classList.add('oculto');
}