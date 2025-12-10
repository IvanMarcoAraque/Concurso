document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('bookingForm');
    const mensaje = document.getElementById('mensaje-exito');
    const boton = document.querySelector('.btn-reservar');

    if(form) { // Solo si el formulario existe
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Evita recarga y error 405

            // Ocultamos el botón
            if(boton) boton.style.display = 'none';

            // Mostramos el mensaje bonito
            if(mensaje) mensaje.style.display = 'block';

            // Opcional: limpiar campos
            form.reset();
        });
    }

    // Año del footer
    const yearSpan = document.getElementById('year');
    if(yearSpan) yearSpan.textContent = new Date().getFullYear();
});