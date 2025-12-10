import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyC4SVIbgdvN3La4470uuC4onZEsVpviuKU",
    authDomain: "peluperu-48ad2.firebaseapp.com",
    projectId: "peluperu-48ad2",
    storageBucket: "peluperu-48ad2.firebasestorage.app",
    messagingSenderId: "761410708958",
    appId: "1:761410708958:web:84345ce18088dabbf8e94f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function calcularHora(horaTexto, minutosASumar) {
    const fecha = new Date(`2000-01-01T${horaTexto}:00`);
    fecha.setMinutes(fecha.getMinutes() + minutosASumar);
    const horas = fecha.getHours().toString().padStart(2, '0');
    const minutos = fecha.getMinutes().toString().padStart(2, '0');
    return `${horas}:${minutos}`;
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('bookingForm');
    const mensajeExito = document.getElementById('mensaje-exito');
    const boton = document.querySelector('.btn-reservar');
    const yearSpan = document.getElementById('year');
    if(yearSpan) yearSpan.textContent = new Date().getFullYear();

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const telefono = document.getElementById('telefono').value;
        const servicio = document.getElementById('servicio').value;
        const barbero = document.getElementById('barbero').value;
        const fecha = document.getElementById('fecha').value;
        const hora = document.getElementById('hora').value;

        if(boton) {
            boton.textContent = "Verificando disponibilidad...";
            boton.disabled = true;
        }

        try {
            // BLOQUEO TOTAL: Si hay alguien a esa hora, no deja reservar
            const q = query(collection(db, "reservas"), 
                where("fecha_reserva", "==", fecha),
                where("hora_reserva", "==", hora)
            );

            const querySnapshot = await getDocs(q);
            
            if (!querySnapshot.empty) {
                const horaAntes = calcularHora(hora, -30);
                const horaDespues = calcularHora(hora, 30);

                if(mensajeExito) {
                    mensajeExito.style.display = 'block';
                    mensajeExito.style.backgroundColor = '#fff3cd'; 
                    mensajeExito.style.color = '#856404';
                    mensajeExito.style.border = '1px solid #ffeeba';
                    mensajeExito.innerText = `⚠️ Las ${hora} ya está ocupada.\nPrueba a las ${horaAntes} o ${horaDespues}.`;
                }
                
                // Si falla por ocupado, reactivamos el botón
                if(boton) {
                    boton.textContent = "Confirmar Reserva";
                    boton.disabled = false;
                }
                return;
            }

            // GUARDAR RESERVA
            await addDoc(collection(db, "reservas"), {
                cliente: nombre,
                email: email,
                telefono: telefono,
                servicio: servicio,
                barbero: barbero,
                fecha_reserva: fecha,
                hora_reserva: hora,
                creado_el: new Date()
            });

            // Éxito visual
            if(boton) boton.style.display = 'none'; // Ocultamos botón temporalmente
            
            if(mensajeExito) {
                mensajeExito.style.display = 'block';
                mensajeExito.style.backgroundColor = '#d4af37';
                mensajeExito.style.color = '#333';
                mensajeExito.style.border = '1px solid #b5952f';
                mensajeExito.innerText = "✅ ¡Cita reservada con éxito!";
            }

            // --- AQUÍ ESTÁ EL ARREGLO ---
            // A los 3 segundos: limpiamos formulario Y reactivamos el botón
            setTimeout(() => { 
                form.reset(); 
                if(mensajeExito) mensajeExito.style.display = 'none'; // Ocultar mensaje
                if(boton) {
                    boton.style.display = 'block'; // Volver a mostrar botón
                    boton.textContent = "Confirmar Reserva";
                    boton.disabled = false;
                }
            }, 3000);

        } catch (error) {
            console.error("Error:", error);
            if(mensajeExito) {
                mensajeExito.style.display = 'block';
                mensajeExito.style.backgroundColor = '#ffcccc'; 
                mensajeExito.style.color = 'red';
                mensajeExito.innerText = "❌ Hubo un error técnico.";
            }
            if(boton) {
                boton.textContent = "Confirmar Reserva";
                boton.disabled = false;
            }
        }
    });
});