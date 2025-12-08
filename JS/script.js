// ===== INICIALIZACIÓN =====
// Espera a que el DOM esté completamente cargado antes de ejecutar el código
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== VARIABLES PRINCIPALES =====
    // Selecciona todas las imágenes de la galería
    const imagenes = document.querySelectorAll('.imagen-galeria');
    // Obtiene el modal principal
    const modal = document.getElementById('modal');
    // Obtiene la imagen ampliada dentro del modal
    const imagenAmpliada = document.getElementById('imagen-ampliada');
    // Obtiene el contenedor de recomendaciones
    const recomendacionesGrid = document.getElementById('recomendaciones-grid');
    // Obtiene el botón para cerrar el modal
    const cerrarModal = document.querySelector('.cerrar-modal');
    // Obtiene el campo de entrada del buscador
    const inputBuscar = document.getElementById('buscadorInput');
    // Obtiene el botón del buscador
    const botonBuscar = document.getElementById('buscadorButton');
    
    // ===== BASE DE DATOS =====
    // Objeto que almacena información detallada de cada imagen (solo muestra una como ejemplo)
    const infoImagenes = {
        "IMG/imagenes/1.jpg": {
            titulo: "Amanecer en las Montañas",
            artista: "Ana Rodríguez",
            categoria: "Paisajes",
            fecha: "15 Marzo 2023",
            likes: 0,
            hdUrl: "IMG/imagenes-hd/1.jpg"
        },
        // ... resto de imágenes que no pondré porque no es necesario...
    };
    
    // Objeto para almacenar los likes que el usuario da durante la sesión
    const likesEstado = {};
    
    // ===== BÚSQUEDA =====
    // Función que maneja la búsqueda (actualmente solo muestra un alert con el texto)
    function buscar() {
        // Elimina espacios en blanco al inicio y final del texto
        const texto = inputBuscar.value.trim();
        // Si hay texto, muestra un alert
        if (texto) {
            alert(`Estás buscando: "${texto}"`);
        }
    }
    
    // Ejecuta la búsqueda al presionar Enter en el input
    inputBuscar.addEventListener('keypress', function(e) {
        // Verifica si la tecla presionada es Enter
        if (e.key === 'Enter') buscar();
    });
    
    // Ejecuta la búsqueda al hacer clic en el botón
    botonBuscar.addEventListener('click', buscar);
    
    // ===== ABRIR IMAGEN =====
    // Agrega un event listener a cada imagen de la galería
    imagenes.forEach(imagen => {
        imagen.addEventListener('click', function() {
            // Al hacer clic, abre el modal pasando la ruta de la imagen
            abrirModal(this.getAttribute('src'));
        });
    });
    
    // ===== CERRAR MODAL =====
    // Cierra el modal al hacer clic en el botón de cerrar
    cerrarModal.addEventListener('click', function() {
        // Oculta el modal cambiando su display a 'none'
        modal.style.display = 'none';
    });
    
    // Cierra el modal si se hace clic fuera de su contenido
    window.addEventListener('click', function(event) {
        // Si el clic fue directamente en el modal (fondo oscuro)
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // ===== BOTÓN ME GUSTA =====
    // Agrega funcionalidad al botón de "Me gusta"
    document.getElementById('boton-me-gusta').addEventListener('click', function() {
        // Obtiene la ruta de la imagen actualmente ampliada
        const src = imagenAmpliada.getAttribute('src');
        // Obtiene la información de la imagen, o un objeto vacío si no existe
        const info = infoImagenes[src] || {};
        
        // Si no hay un like guardado para esta imagen en la sesión actual
        if (likesEstado[src] === undefined) {
            // Incrementa el contador de likes (suma 1 a los likes originales)
            likesEstado[src] = (info.likes || 0) + 1;
            // Actualiza el texto del botón con el nuevo número y cambia el ícono a corazón lleno
            this.innerHTML = `<i class="fas fa-heart"></i> ${likesEstado[src]}`;
            // Añade la clase 'activo' para cambiar el estilo
            this.classList.add('activo');
        } else {
            // Si ya había un like, lo elimina (toggle)
            delete likesEstado[src];
            // Vuelve a los likes originales
            const originalLikes = info.likes || 0;
            // Restaura el texto del botón con el número original y cambia el ícono a corazón vacío
            this.innerHTML = `<i class="far fa-heart"></i> ${originalLikes}`;
            // Remueve la clase 'activo'
            this.classList.remove('activo');
        }
    });
    
    // ===== BOTÓN COMPARTIR =====
    // Agrega funcionalidad al botón de compartir (actualmente solo muestra un alert)
    document.getElementById('boton-compartir').addEventListener('click', function() {
        alert('Hiciste click en compartir');
    });
    
    // ===== BOTÓN DESCARGAR =====
    // Agrega funcionalidad al botón de descargar
    document.getElementById('boton-descargar').addEventListener('click', function() {
        // Obtiene la ruta de la imagen actual
        const src = imagenAmpliada.getAttribute('src');
        // Obtiene la información de la imagen
        const info = infoImagenes[src] || {};
        // Usa la URL en alta definición si existe, de lo contrario usa la normal
        const hdSrc = info.hdUrl || src;
        
        // Abre una nueva pestaña con una página personalizada para descargar
        const nuevaPestana = window.open('', '_blank');
        // Escribe el contenido HTML de la nueva pestaña
        nuevaPestana.document.write(`
            <!DOCTYPE html>
            <html>
                <head>
                    <title>Pictly</title>
                    <link rel="icon" type="image/png" href="/IMG/icono/icono2.png">
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
                    <img src="${hdSrc}" alt="Imagen en alta calidad" class="imagen-hd">
                    <div>
                        <button onclick="descargarImagen()" class="boton-descarga-hd">
                            Descargar Imagen HD (8.2 MB)
                        </button>
                    </div>
                    <p>Esta imagen tiene una resolución de 4000x3000 px</p>
                    <p>Formato: JPG | Calidad: 100%</p>
                    <script>
                        function descargarImagen() {
                            const link = document.createElement('a');
                            link.href = '${hdSrc}';
                            link.download = 'pictly-${(info.titulo || "imagen").replace(/\\s+/g, "-").toLowerCase()}.jpg';
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                        }
                    <\/script>
                </div>
            </body>
            </html>
        `);
        // Cierra el flujo de escritura del documento para que se renderice
        nuevaPestana.document.close();
    });
    
    // ===== FUNCIÓN PARA ABRIR MODAL =====
    function abrirModal(src) {
        // Obtiene la información de la imagen, o valores por defecto si no existe
        const info = infoImagenes[src] || {
            titulo: "Imagen sin título",
            artista: "Artista desconocido",
            categoria: "Sin categoría",
            fecha: "Fecha desconocida",
            likes: 0
        };
        
        // Establece la fuente de la imagen ampliada
        imagenAmpliada.setAttribute('src', src);
        // Actualiza el título de la imagen
        document.getElementById('titulo-imagen').textContent = info.titulo;
        // Actualiza el artista
        document.getElementById('artista-imagen').textContent = info.artista;
        // Actualiza la categoría
        document.getElementById('categoria-imagen').textContent = info.categoria;
        // Actualiza la fecha
        document.getElementById('fecha-imagen').textContent = info.fecha;
        
        // Configura el botón de "Me gusta"
        const btnLike = document.getElementById('boton-me-gusta');
        // Determina el número de likes a mostrar (likes en sesión o los originales)
        const likeCount = likesEstado[src] !== undefined ? likesEstado[src] : info.likes;
        // Actualiza el HTML del botón con el ícono adecuado (corazón lleno o vacío) y el número
        btnLike.innerHTML = `<i class="${likesEstado[src] ? 'fas' : 'far'} fa-heart"></i> ${likeCount}`;
        // Agrega o remueve la clase 'activo' dependiendo del estado de like
        if (likesEstado[src]) {
            btnLike.classList.add('activo');
        } else {
            btnLike.classList.remove('activo');
        }
        
        // Muestra el modal
        modal.style.display = 'block';
        // Genera recomendaciones basadas en la imagen actual
        generarRecomendaciones(src);
    }
    
    // ===== FUNCIÓN PARA GENERAR RECOMENDACIONES =====
    function generarRecomendaciones(srcActual) {
        // Limpia el contenedor de recomendaciones
        recomendacionesGrid.innerHTML = '';
        
        // Filtra las imágenes excluyendo la actual
        const otrasImagenes = Array.from(imagenes).filter(img => img.src !== srcActual);
        // Mezcla aleatoriamente las imágenes restantes
        const mezcladas = otrasImagenes.sort(() => 0.5 - Math.random());
        
        // Determina cuántas recomendaciones mostrar según el ancho de pantalla
        const esDesktop = window.innerWidth > 825;
        const cantidad = esDesktop ? 2 : 0;  // En móvil no muestra recomendaciones (0)
        // Toma las primeras 'cantidad' imágenes de la lista mezclada
        const recomendaciones = mezcladas.slice(0, cantidad);
        
        // Para cada imagen recomendada, crea un elemento y lo agrega al grid
        recomendaciones.forEach(imagen => {
            const div = document.createElement('div');
            div.className = 'recomendacion';
            
            const img = document.createElement('img');
            img.src = imagen.src;
            img.alt = imagen.alt;
            
            // Al hacer clic en una recomendación, abre el modal con esa imagen
            img.addEventListener('click', function() {
                abrirModal(this.src);
            });
            
            div.appendChild(img);
            recomendacionesGrid.appendChild(div);
        });
    }
    
    // ===== MENÚ HAMBURGUESA SIMPLIFICADO =====
    // Solo para cerrar el menú en móvil al hacer clic en enlaces
    const menuTogglePrincipal = document.getElementById('menu-toggle');
    
    if (menuTogglePrincipal) {
        // Selecciona todos los enlaces del menú principal y del desplegable
        document.querySelectorAll('.nav__vínculo, .menu-desplegable__opciones').forEach(enlace => {
            // Agrega un event listener a cada enlace
            enlace.addEventListener('click', function() {
                // Si estamos en móvil (ancho <= 825px)
                if (window.innerWidth <= 825) {
                    // Desmarca el checkbox del menú principal para cerrarlo
                    menuTogglePrincipal.checked = false;
                    // También cierra el menú de categorías si existe
                    const menuCategorias = document.getElementById('menu-opciones');
                    if (menuCategorias) menuCategorias.checked = false;
                }
            });
        });
    }
});