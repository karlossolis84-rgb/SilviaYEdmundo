let numeroPases = 2;
let nombreInvitado = "Familia e Invitados Especiales";

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
    
    // Apagar música por completo al cargar la portada
    const musica = document.getElementById('musicaFondo');
    if (musica) {
        musica.pause();
        musica.currentTime = 0;
    }
});

function actualizarTextosPases() {
    const badgePases = document.getElementById('badgePasesTexto');
    const textoPasesElemento = document.getElementById('cantidadPasesTexto');
    
    const textoPasesStr = numeroPases + (numeroPases === 1 ? ' pase reservado' : ' pases reservados');
    
    if (badgePases) badgePases.textContent = textoPasesStr;
    if (textoPasesElemento) textoPasesElemento.textContent = numeroPases + (numeroPases === 1 ? ' pase' : ' pases');
}

// 1. Al presionar el sello de la mariposa: se abre el sobre y aparece la tarjeta con nombres y pases
function abrirSobre() {
    const sup = document.getElementById('sobreSuperior');
    const izq = document.getElementById('sobreIzquierda');
    const der = document.getElementById('sobreDerecha');
    const sello = document.getElementById('contenedorSello');
    const tarjetaInterior = document.getElementById('tarjetaInterior');

    if (sup && izq && der && sello) {
        sup.classList.add('abrir-arriba');
        izq.classList.add('abrir-izq');
        der.classList.add('abrir-der');
        sello.classList.add('desvanecer-centro');
    }

    setTimeout(() => {
        sello.style.display = 'none';
        tarjetaInterior.classList.remove('oculto');
    }, 600);
}

// 2. Al presionar el botón "Ver Invitación": arranca la música y muestra la invitación completa
function entrarInvitacionPrincipal() {
    const pantallaInicial = document.getElementById('pantallaInicial');
    const contenidoPrincipal = document.getElementById('contenidoPrincipal');
    const musica = document.getElementById('musicaFondo');

    if (musica) {
        musica.currentTime = 0;
        musica.play().catch(error => {
            console.log("Reproducción bloqueada por el navegador:", error);
        });
    }

    pantallaInicial.classList.add('oculto');
    contenidoPrincipal.classList.remove('oculto');
    iniciarContador();
}

// Control de audio flotante
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