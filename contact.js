// 1. IMPORTAR LAS FUNCIONES DE FIREBASE
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 2. TU CONFIGURACIÓN (¡PEGA AQUÍ LO QUE COPIASTE EN EL PASO 3!)
const firebaseConfig = {
  apiKey: "AIzaSyD...", 
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "123456...",
  appId: "1:123456..."
};

// 3. INICIALIZAR FIREBASE
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 4. LÓGICA DEL FORMULARIO
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('contact-feedback');
  
  // Actualizar año del footer (Mantenemos tu código original)
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Evita que la página se recargue

    // Obtener valores usando los IDs de tu HTML
    const name = document.getElementById('c-name').value.trim();
    const email = document.getElementById('c-email').value.trim();
    const phone = document.getElementById('c-phone').value.trim();
    const subject = document.getElementById('c-subject').value.trim();
    const message = document.getElementById('c-message').value.trim();

    if (!name || !email || !message) {
      alert('Por favor completa los campos requeridos (nombre, correo y mensaje).');
      return;
    }

    if (feedback) {
        feedback.textContent = 'Enviando mensaje...';
        feedback.style.display = 'block';
        feedback.style.color = 'blue';
    }

    try {
      await addDoc(collection(db, "mensajes"), {
        nombre: name,
        correo: email,
        telefono: phone,
        asunto: subject,
        mensaje: message,
        fecha: new Date() 
      });

      if (feedback) {
        feedback.textContent = '¡Mensaje guardado! Gracias, te contactaremos pronto.';
        feedback.style.color = 'green'; // Usar color de éxito
        
        setTimeout(() => { feedback.style.display = 'none'; }, 5000);
      }
      form.reset(); 

    } catch (error) {
      console.error("Error al guardar: ", error);
      if (feedback) {
        feedback.textContent = 'Hubo un error al enviar el mensaje. Inténtalo de nuevo.';
        feedback.style.color = 'red';
      }
    }
  });
});