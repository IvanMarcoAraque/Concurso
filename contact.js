// 1. IMPORTAMOS FIREBASE DESDE LA WEB (Para que funcione sin instalar nada)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 2. TU CONFIGURACIÓN (Ya he puesto tus datos reales aquí)
const firebaseConfig = {
  apiKey: "AIzaSyC4SVIbgdvN3La4470uuC4onZEsVpviuKU",
  authDomain: "peluperu-48ad2.firebaseapp.com",
  projectId: "peluperu-48ad2",
  storageBucket: "peluperu-48ad2.firebasestorage.app",
  messagingSenderId: "761410708958",
  appId: "1:761410708958:web:84345ce18088dabbf8e94f"
};

// 3. INICIAMOS LA CONEXIÓN
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 4. LÓGICA DEL FORMULARIO
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('contact-feedback');
  
  // Ponemos el año actual en el footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  if (!form) return;

  // Escuchamos el envío
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('c-name').value;
    const email = document.getElementById('c-email').value;
    const phone = document.getElementById('c-phone').value;
    const subject = document.getElementById('c-subject').value;
    const message = document.getElementById('c-message').value;

    if (feedback) {
        feedback.textContent = 'Enviando mensaje...';
        feedback.style.display = 'block';
        feedback.style.color = 'blue';
    }

    try {
      // Guardamos en la colección "mensajes" de tu proyecto "peluperu-48ad2"
      await addDoc(collection(db, "mensajes"), {
        nombre: name,
        correo: email,
        telefono: phone,
        asunto: subject,
        mensaje: message,
        fecha: new Date()
      });

      if (feedback) {
        feedback.textContent = '¡Mensaje enviado con éxito!';
        feedback.style.color = 'green';
        setTimeout(() => { 
            feedback.style.display = 'none'; 
            form.reset(); 
        }, 3000);
      }
      
    } catch (error) {
      console.error("Error:", error);
      if (feedback) {
        feedback.textContent = 'Error al enviar. Revisa la consola (F12) para más detalles.';
        feedback.style.color = 'red';
      }
    }
  });
});