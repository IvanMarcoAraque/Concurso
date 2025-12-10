document.addEventListener('DOMContentLoaded', function() {
    
    console.log("--> Iniciando sistema de peluquería...");


    const galeriaImagenes = {
        "taper fade": "img/taper-fade.jpg",   
        "mohicano": "img/mohicano.jpg",       
        "mullet": "img/mullet.jpg",
        "buzz cut": "img/buzz-cut.jpg", 
        "pompadour": "img/pompadour.jpg",
        "undercut": "img/undercut.jpg",
        "french crop": "img/french-crop.jpg",
        "low fade": "img/low fade.jpg",
        "slicked back": "img/slicked-back.jpg",
        "crew cut": "img/crew-cut.jpg"
    };

    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const resultDiv = document.getElementById('result');
    const styleButtons = document.querySelectorAll('.style-btn');


    function cargarImagenLocal(estilo) {
        resultDiv.innerHTML = ''; 
        
        const estiloKey = estilo.toLowerCase().trim();
        const rutaImagen = galeriaImagenes[estiloKey];

        if (rutaImagen) {
            const img = new Image();
            img.className = 'result-image';
            img.alt = `Estilo ${estilo}`;
            
            img.onload = () => {
                resultDiv.appendChild(img);
                const caption = document.createElement('p');
                caption.className = 'caption';
                caption.innerHTML = `<strong>${estilo}</strong>`;
                resultDiv.appendChild(caption);
            };

            img.onerror = () => {
                console.error(`Error: No se encontró ${rutaImagen}`);
                resultDiv.innerHTML = `<p class="result-info" style="color:red">
                    Error 404: No encuentro el archivo <strong>"${rutaImagen}"</strong>.
                </p>`;
            };

            img.src = rutaImagen;
        } else {
            resultDiv.innerHTML = `<p class="result-info">No hay foto disponible para "${estilo}".</p>`;
        }
    }


    function generarImagenIA(termino) {
        resultDiv.innerHTML = `
            <p class="result-info">
                Buscando: <strong>${termino}</strong>...
            </p>`;

        const prompt = `realistic ${termino} haircut on a person in a modern barbershop, high detail, 4k`;
        const seed = Math.floor(Math.random() * 10000);
        const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=600&height=600&nologo=true&seed=${seed}`;

        const img = new Image();
        img.className = 'result-image';
        
        img.onload = () => {
            resultDiv.innerHTML = ''; 
            resultDiv.appendChild(img);
            

            const caption = document.createElement('p');
            caption.className = 'caption';
            caption.innerHTML = `<strong>${termino}</strong>`;
            resultDiv.appendChild(caption);
        };

        img.onerror = () => {
            resultDiv.innerHTML = '<p class="result-info" style="color:red;">El servidor está ocupado, intenta de nuevo.</p>';
        };

        img.src = imageUrl;
    }


    if (styleButtons) {
        styleButtons.forEach(button => {
            button.addEventListener('click', () => {
                const estilo = button.getAttribute('data-style');
                // Rellenamos el buscador visualmente (opcional)
                if(searchInput) searchInput.value = estilo; 
                cargarImagenLocal(estilo);
            });
        });
    }

    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault(); 
            const termino = searchInput.value.trim();
            if (termino) {
                generarImagenIA(termino);
            }
        });
    }

});