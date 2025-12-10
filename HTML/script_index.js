// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== VARIABLES PRINCIPALES =====
    const imagenes = document.querySelectorAll('.imagen-galeria'); /* Selecciona varios elementos con selectores CSS, retorna lista. */
    const modal = document.getElementById('modal');
    const imagenAmpliada = document.getElementById('imagen-ampliada');/*  Selecciona un elemento único por ID, retorna solo ese elemento. */
    const recomendacionesGrid = document.getElementById('recomendaciones-grid');
    const cerrarModal = document.querySelector('.cerrar-modal');
    const inputBuscar = document.getElementById('buscadorInput');
    const botonBuscar = document.getElementById('buscadorButton');
    
    // ===== BASE DE DATOS =====
    const infoImagenes = {
        "IMG/imagenes/1.jpg": {
            titulo: "Amanecer en las Montañas",
            artista: "Ana Rodríguez",
            categoria: "Paisajes",
            fecha: "15 Marzo 2023",
            likes: 0,
            hdUrl: "IMG/imagenes/1.jpg"
        },
        //  ... resto de imágenes que no pondré porque no es necesario...
    };
    
    const likesEstado = {};
    
// BÚSQUEDA 
function buscar() {
    const texto = inputBuscar.value.trim().toLowerCase();
    
    // Si está vacío, no hacer nada
    if (!texto) return;
    
    // Mapa de búsquedas (más eficiente y organizado)
    const busquedas = {
        // Categorías principales
        'naturaleza': 'Naturaleza.html',
        'anime': 'Anime.html',
        'fotografia': 'Fotografia.html',
        'fotografía': 'Fotografia.html',
        'photo': 'Fotografia.html',
        
        // CGI/3D con múltiples variantes
        'cgi-3d': 'CGI-3D.html',
        'cgi3d': 'CGI-3D.html',
        'cgi': 'CGI-3D.html',
        '3d': 'CGI-3D.html',
        '3-d': 'CGI-3D.html',
        
        // Pixel Art
        'pixel-art': 'Pixel-Art.html',
        'pixelart': 'Pixel-Art.html',
        'pixel': 'Pixel-Art.html',
        
        // Páginas del sitio
        'sobre_nosotros': 'Sobre_nosotros.html',
        'sobre nosotros': 'Sobre_nosotros.html',
        'nosotros': 'Sobre_nosotros.html',
        'acerca de': 'Sobre_nosotros.html',
        
        'nuevo-contenido': 'nuevo-contenido.html',
        'nuevo contenido': 'nuevo-contenido.html',
        'nuevo': 'nuevo-contenido.html',
        'reciente': 'nuevo-contenido.html',
        
        // Página principal
        'inicio': 'index.html',
        'home': 'index.html',
        'index': 'index.html',
        'principal': 'index.html',
    };
    
    // Buscar en el mapa
    if (busquedas[texto]) {
        window.open(busquedas[texto], '_blank');
    } else {
        // Si no encuentra coincidencia exacta, buscar coincidencias parciales
        for (const [keyword, url] of Object.entries(busquedas)) {
            if (texto.includes(keyword) || keyword.includes(texto)) {
                window.open(url, '_blank');
                return;
            }
        }
        
        // Si no encuentra nada, mostrar mensaje
        alert(`Usted buscó "${texto}".`);
    }
}
    
    inputBuscar.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') buscar();
    });
    
    botonBuscar.addEventListener('click', buscar);
    
    // ===== ABRIR IMAGEN =====
    imagenes.forEach(imagen => {
        imagen.addEventListener('click', function() {
            abrirModal(this.getAttribute('src')); /* El elemento que disparó el evento -  Obtiene el valor del atributo src - Función que recibe una URL */
        });
    });
    
    // ===== CERRAR MODAL =====
    cerrarModal.addEventListener('click', function() {
        modal.style.display = 'none'; /* Oculta el modal cambiando su estilo CSS a display: none; (invisible). */
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) { /* Verifica si el clic fue directamente en el modal. */
            modal.style.display = 'none';
        }
    });
    
    //  BOTÓN ME GUSTA 
    document.getElementById('boton-me-gusta').addEventListener('click', function() {
        const src = imagenAmpliada.getAttribute('src');
        const info = infoImagenes[src] || {}; /* Obtiene la información de la imagen desde un objeto infoImagenes. Si no existe, usa un objeto vacío {}. */
        
        if (likesEstado[src] === undefined) { /* Verifica si una imagen no tiene like registrado (es la primera vez que se le da like). */
            likesEstado[src] = (info.likes || 0) + 1; /* Incrementa los likes de la imagen sumando 1 al conteo actual (o a 0 si no tiene). */
            this.innerHTML = `<i class="fas fa-heart"></i> ${likesEstado[src]}`; /* Actualiza el botón mostrando el ícono de corazón y el nuevo número de likes. */
            this.classList.add('activo'); /* Añade la clase CSS 'activo' al elemento actual (this), cambiando estilos css. */
        } else {
            delete likesEstado[src];
            const originalLikes = info.likes || 0;
            this.innerHTML = `<i class="far fa-heart"></i> ${originalLikes}`;
            this.classList.remove('activo');
        }
    });
    
    //  BOTÓN COMPARTIR 
    document.getElementById('boton-compartir').addEventListener('click', function() {
        alert('Hiciste click en compartir');
    });
    
// ===== BOTÓN DESCARGAR =====
document.getElementById('boton-descargar').addEventListener('click', function() {
    const src = imagenAmpliada.getAttribute('src');
    const info = infoImagenes[src] || {};
    const hdSrc = info.hdUrl || src; /* Obtiene la versión HD de la imagen si existe en info.hdUrl. Si no, usa la imagen normal (src). */
    
    const rutaFija = 'IMG/imagen_prueba.png';

    const nuevaPestana = window.open('', '_blank');

    nuevaPestana.document.write(` 
        <!DOCTYPE html>
        <html>
            <head>
                <title>Pictly</title>
                <link rel="icon" type="image/png" href="icono2.png">
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        text-align: center;
                        padding: 40px;
                        background-color: #f5f5f5;
                    }
                    .contenedor-descarga {
                        max-width: 800px;
                        margin: 0 auto;
                        background: white;
                        padding: 30px;
                        border-radius: 10px;
                        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                    }
                    .imagen-hd {
                        max-width: 100%;
                        max-height: 70vh;
                        margin: 20px 0;
                        border-radius: 8px;
                        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                    }
                    .boton-descarga-hd {
                        padding: 15px 30px;
                        background-color: #2ecc71;
                        color: white;
                        border: none;
                        border-radius: 5px;
                        font-size: 1.2rem;
                        cursor: pointer;
                        margin: 20px 0;
                        transition: background-color 0.2s;
                    }
                    .boton-descarga-hd:hover {
                        background-color: #27ae60;
                    }
                    .info-descarga {
                        margin: 20px 0;
                        color: #555;
                    }
                </style>
            </head>
        <body>
            <div class="contenedor-descarga">
                <h2>Descargar Imagen en Alta Calidad</h2>
                <div class="info-descarga">
                    <p><strong>${info.titulo || "Imagen sin título"}</strong></p>
                    <p>Artista: ${info.artista || "Desconocido"}</p>
                </div>
                <!-- Muestra la imagen HD -->
                <img src="${hdSrc}" alt="Imagen en alta calidad" class="imagen-hd">
                <div>
                    <button onclick="descargarImagen()" class="boton-descarga-hd">
                        Descargar Imagen HD (8.2 MB)
                    </button>
                </div>
                <p>Esta imagen tiene una resolución de 4000x3000 px</p>
                <p>Formato: JPG | Calidad: 100%</p>
                <script>
                    // Definir la ruta de descarga fija que se pasa desde la página principal
                    const rutaDescarga = '${hdSrc}';
                    
                    function descargarImagen() {
                        const link = document.createElement('a');
                        link.href = rutaDescarga;
                        link.download = 'pictly-imagen.jpg';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    }
                <\/script>
            </div>
        </body>
        </html>
    `);
    nuevaPestana.document.close();
});

    // FUNCIÓN PARA ABRIR MODAL 
    function abrirModal(src) {
        const info = infoImagenes[src] || {
            titulo: "Imagen sin título",
            artista: "Artista desconocido",
            categoria: "Sin categoría",
            fecha: "Fecha desconocida",
            likes: 0
        };
        
        imagenAmpliada.setAttribute('src', src); /* Cambia la imagen mostrada en el modal, actualizando su atributo src con la nueva ruta de imagen. */
        document.getElementById('titulo-imagen').textContent = info.titulo;
        document.getElementById('artista-imagen').textContent = info.artista;
        document.getElementById('categoria-imagen').textContent = info.categoria;
        document.getElementById('fecha-imagen').textContent = info.fecha;
        
        const btnLike = document.getElementById('boton-me-gusta');
        const likeCount = likesEstado[src] !== undefined ? likesEstado[src] : info.likes; /* Obtiene el número de likes de una imagen: primero busca en likesEstado, y si no existe, usa info.likes (likes guardados). */
        btnLike.innerHTML = `<i class="${likesEstado[src] ? 'fas' : 'far'} fa-heart"></i> ${likeCount}`;
        if (likesEstado[src]) {
            btnLike.classList.add('activo');
        } else {
            btnLike.classList.remove('activo');
        }
        
        modal.style.display = 'block';
        generarRecomendaciones(src);
    }
    
    // FUNCIÓN PARA GENERAR RECOMENDACIONES
    function generarRecomendaciones(srcActual) {
    // Limpia el contenedor de recomendaciones
    recomendacionesGrid.innerHTML = '';
    
    // Filtra las imágenes excluyendo la actual
    const otrasImagenes = Array.from(imagenes).filter(img => img.src !== srcActual);
    
    // Mezcla aleatoriamente las imágenes restantes
    const mezcladas = otrasImagenes.sort(() => 0.5 - Math.random());
    
    // Determina cuántas recomendaciones mostrar según el dispositivo
    const esDesktop = window.innerWidth > 825;
    const cantidad = esDesktop ? 2 : 0;
    
    // Toma solo las primeras imágenes según la cantidad
    const recomendaciones = mezcladas.slice(0, cantidad);
    
    // Crea y muestra cada imagen recomendada
    recomendaciones.forEach(imagen => {
        const div = document.createElement('div');
        div.className = 'recomendacion';
        
        const img = document.createElement('img');
        img.src = imagen.src;
        img.alt = imagen.alt;
        
        // Hace clicable cada imagen recomendada
        img.addEventListener('click', function() {
            abrirModal(this.src);
        });
        
        // Añade la imagen al contenedor
        div.appendChild(img);
        recomendacionesGrid.appendChild(div);
    });
    }
    
    // MENÚ HAMBURGUESA SIMPLIFICADO
    // Solo para cerrar el menú en móvil al hacer clic en enlaces
    const menuTogglePrincipal = document.getElementById('menu-toggle');
    
    if (menuTogglePrincipal) { // Verifica si el checkbox del menú hamburguesa existe en la página
    document.querySelectorAll('.nav__vínculo, .menu-desplegable__opciones') // Selecciona TODOS los enlaces del menú de navegación
        .forEach(enlace => { // Para CADA enlace encontrado...
            enlace.addEventListener('click', function() { // Añade un evento al hacer CLIC
                if (window.innerWidth <= 825) { // Solo si estamos en DISPOSITIVO MÓVIL (pantalla ≤ 825px)
                    menuTogglePrincipal.checked = false; // Cierra el MENÚ PRINCIPAL desmarcando el checkbox
                    const menuCategorias = document.getElementById('menu-opciones'); // Busca el menú de CATEGORÍAS
                    if (menuCategorias) menuCategorias.checked = false; // Si existe, también lo CIERRA
                }
                // Si es escritorio ( > 825px ), NO hace nada - el menú permanece visible
            });
        });
    }
});