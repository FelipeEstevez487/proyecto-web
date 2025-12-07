// ===== INICIALIZACIÓN Y VARIABLES GLOBALES =====

// Espera a que el DOM esté completamente cargado antes de ejecutar el código
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== VARIABLES DEL DOM - Elementos principales =====
    const imagenes = document.querySelectorAll('.imagen-galeria'); // Todas las imágenes de la galería
    const modal = document.getElementById('modal'); // Ventana modal principal
    const paginaDescarga = document.getElementById('pagina-descarga'); // Página de descarga HD
    const imagenAmpliada = document.getElementById('imagen-ampliada'); // Imagen ampliada en el modal
    const imagenHd = document.getElementById('imagen-hd'); // Imagen HD en página de descarga
    const recomendacionesGrid = document.getElementById('recomendaciones-grid'); // Contenedor de recomendaciones
    const cerrarModal = document.querySelector('.cerrar-modal'); // Botón para cerrar modal
    const btnVolver = document.getElementById('btn-volver'); // Botón volver de descarga
    const btnDescargaDirecta = document.getElementById('btn-descarga-directa'); // Botón descarga directa
    
    // ===== BASE DE DATOS DE IMÁGENES =====
    // Objeto que contiene información detallada de cada imagen
    const infoImagenes = {
        "IMG/imagenes/1.jpg": {
            titulo: "Amanecer en las Montañas",
            artista: "Ana Rodríguez",
            categoria: "Paisajes",
            fecha: "15 Marzo 2023",
            likes: 0, // Contador de likes inicial
            hdUrl: "IMG/imagenes-hd/1.jpg" // URL de la versión HD
        },
        // ... más imágenes con la misma estructura
    };

    // ===== ESTADO DE LIKES =====
    // Objeto para almacenar qué imágenes tienen like activo
    const likesEstado = {}; // Ej: {"IMG/imagenes/1.jpg": true}
    
    // ===== EVENT LISTENERS PARA GALERÍA =====
    // Agrega evento click a cada imagen para abrir el modal
    imagenes.forEach(imagen => {
        imagen.addEventListener('click', function() {
            // Obtiene la ruta (src) de la imagen clickeada y abre modal
            abrirModal(this.getAttribute('src'));
        });
    });
    
    // ===== CERRAR MODAL =====
    // Cierra el modal al hacer click en la "X"
    cerrarModal.addEventListener('click', function() {
        modal.style.display = 'none'; // Oculta el modal
    });
    
    // ===== CERRAR MODALES AL HACER CLIC FUERA =====
    // Cierra modales si el click es en el fondo oscuro (overlay)
    window.addEventListener('click', function(event) {
        if (event.target === modal) { // Si click en fondo del modal
            modal.style.display = 'none';
        }
        if (event.target === paginaDescarga) { // Si click en fondo de página descarga
            paginaDescarga.style.display = 'none';
        }
    });
    
    // ===== BOTÓN ME GUSTA =====
    document.getElementById('btn-me-gusta').addEventListener('click', function() {
        const src = imagenAmpliada.getAttribute('src'); // Obtiene ruta de imagen actual
        
        // Lógica para alternar like
        if (likesEstado[src] === undefined) { // Si NO tiene like
            // Suma 1 al contador (usa likes de infoImagenes o 0 como fallback)
            likesEstado[src] = (infoImagenes[src]?.likes || 0) + 1;
            // Actualiza texto del botón (operador de encadenamiento opcional ?.)
            this.innerHTML = `<i class="fas fa-heart"></i> ${likesEstado[src]}`;
            this.classList.add('activo'); // Añade clase visual de activo
        } else { // Si YA tiene like
            delete likesEstado[src]; // Elimina el like del estado
            const originalLikes = infoImagenes[src]?.likes || 0; // Vuelve a likes originales
            this.innerHTML = `<i class="far fa-heart"></i> ${originalLikes}`;
            this.classList.remove('activo'); // Quita clase visual
        }
    });
    
    // ===== BOTÓN COMPARTIR =====
    document.getElementById('btn-compartir').addEventListener('click', function() {
        alert('Hiciste click en compartir'); // Placeholder - aquí iría lógica real de compartir
    });
    
    // ===== BOTÓN DESCARGAR =====
    document.getElementById('btn-descargar').addEventListener('click', function() {
        const src = imagenAmpliada.getAttribute('src'); // Ruta imagen actual
        const info = infoImagenes[src] || {}; // Info de la imagen (objeto vacío si no existe)
        
        // Usa URL HD si existe, sino la normal
        const hdSrc = info.hdUrl || src;
        
        // Abre nueva pestaña/página para descarga
        const nuevaPestana = window.open('', '_blank');
        nuevaPestana.document.write(`
            <!DOCTYPE html>
            <html>
                <head>
                    <title>Pictly</title>
                    <link rel="icon" type="image/png" href="/IMG/icono/icono2.png">
                    <style>
                        /* Estilos para la página de descarga */
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
                            // Crea nombre de archivo: reemplaza espacios por guiones y convierte a minúsculas
                            link.download = 'pictly-${(info.titulo || "imagen").replace(/\\s+/g, "-").toLowerCase()}.jpg';
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                        }
                    <\/script> <!-- Barra invertida para escapar la barra de cierre </script> -->
                </div>
            </body>
            </html>
        `);
        nuevaPestana.document.close(); // Cierra el stream de escritura del documento
    });

    // BOTÓN VOLVER DESDE PÁGINA DE DESCARGA
    btnVolver.addEventListener('click', function() {
        paginaDescarga.style.display = 'none'; // Oculta página descarga
        modal.style.display = 'block'; // Muestra modal principal
    });

    // FUNCIÓN PARA ABRIR MODAL
    function abrirModal(src) {
        // Obtiene información de la imagen o usa valores por defecto
        const info = infoImagenes[src] || {
            titulo: "Imagen sin título",
            artista: "Artista desconocido",
            categoria: "Sin categoría",
            fecha: "Fecha desconocida",
            likes: 0
        };
        
        // Actualiza elementos del modal con la información
        imagenAmpliada.setAttribute('src', src);
        document.getElementById('titulo-imagen').textContent = info.titulo;
        document.getElementById('artista-imagen').textContent = info.artista;
        document.getElementById('categoria-imagen').textContent = info.categoria;
        document.getElementById('fecha-imagen').textContent = info.fecha;
        
        // ===== CONFIGURAR BOTÓN DE LIKE =====
        const btnLike = document.getElementById('btn-me-gusta');
        // Usa likes del estado o likes originales de la imagen
        const likeCount = likesEstado[src] !== undefined ? likesEstado[src] : info.likes;
        // Cambia entre corazón sólido (fas) y vacío (far)
        btnLike.innerHTML = `<i class="${likesEstado[src] ? 'fas' : 'far'} fa-heart"></i> ${likeCount}`;
        if (likesEstado[src]) {
            btnLike.classList.add('activo');
        } else {
            btnLike.classList.remove('activo');
        }
        
        modal.style.display = 'block'; // Muestra el modal
        
        generarRecomendaciones(src); // Genera imágenes recomendadas
    }

    // FUNCIÓN PARA GENERAR RECOMENDACIONES 
    function generarRecomendaciones(srcActual) {
        // Limpia recomendaciones anteriores
        recomendacionesGrid.innerHTML = '';
        
        // Crea array excluyendo la imagen actual
        const otrasImagenes = Array.from(imagenes).filter(img => img.src !== srcActual);
        
        // Mezcla aleatoriamente y toma 6 imágenes
        const recomendaciones = otrasImagenes
            .sort(() => 0.5 - Math.random()) // Mezcla aleatoria
            .slice(0, 6); // Toma las primeras 6
        
        // Añade cada recomendación al grid
        recomendaciones.forEach(imagen => {
            const div = document.createElement('div');
            div.className = 'recomendacion';
            
            const img = document.createElement('img');
            img.src = imagen.src;
            img.alt = imagen.alt;
            
            // Permite abrir el modal al hacer click en la recomendación
            img.addEventListener('click', function() {
                abrirModal(this.src);
            });
            
            div.appendChild(img);
            recomendacionesGrid.appendChild(div);
        });
    }
});

// MENÚ HAMBURGUESA - PRINCIPAL

const hamburguesa = document.querySelector('.boton-categoria'); // Botón categorías
const menu = document.querySelector('.menu'); // Menú desplegable

// Verificamos que los elementos existan antes de agregar event listeners
if (hamburguesa && menu) {
    hamburguesa.addEventListener('click', () => {
        // Alterna entre mostrar y ocultar el menú
        menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
    });
}

// CERRAR MENÚ AL HACER CLIC FUERA

document.addEventListener('click', function(event) {
    const menuContainer = document.querySelector('.Hamburguesa'); // Contenedor del menú
    const menuToggle = document.getElementById('menu-opciones'); // Checkbox que controla el menú
    
    // Verificamos que los elementos existan
    if (menuContainer && menuToggle) {
        // Si el clic NO fue dentro del contenedor del menú
        if (!menuContainer.contains(event.target)) {
            menuToggle.checked = false; // Desmarca el checkbox (cierra menú)
        }
    }
});

// CERRAR MENÚ AL SELECCIONAR UNA OPCIÓN

document.querySelectorAll('.menu-desplegable a').forEach(link => {
    link.addEventListener('click', function() {
        const menuToggle = document.getElementById('menu-opciones');
        if (menuToggle) {
            menuToggle.checked = false; // Cierra menú al seleccionar opción
        }
    });
});

// MENÚ HAMBURGUESA PARA MÓVILES 

const hamburguesaBtn = document.getElementById('hamburguesaBtn'); // Botón hamburguesa móvil
const navLista = document.getElementById('navLista'); // Lista de navegación

if (hamburguesaBtn && navLista) {
    hamburguesaBtn.addEventListener('click', function() {
        // Alternar clase 'active' para animación del botón
        this.classList.toggle('active');
        
        // Alternar visibilidad del menú
        navLista.classList.toggle('active');
        
        // Previene scroll del body cuando el menú está abierto
        document.body.style.overflow = navLista.classList.contains('active') ? 'hidden' : '';
    });
    
    // CERRAR MENÚ AL HACER CLIC EN UN ENLACE 
    document.querySelectorAll('.nav__vínculo, .menu-desplegable__opciones').forEach(enlace => {
        enlace.addEventListener('click', function() {
            hamburguesaBtn.classList.remove('active');
            navLista.classList.remove('active');
            document.body.style.overflow = ''; // Restaura scroll
        });
    });
    
    //  CERRAR MENÚ AL HACER CLIC FUERA 
    document.addEventListener('click', function(event) {
        // Si el clic NO fue en el menú NI en el botón, y el menú está abierto
        if (!navLista.contains(event.target) && !hamburguesaBtn.contains(event.target) && navLista.classList.contains('active')) {
            hamburguesaBtn.classList.remove('active');
            navLista.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// FUNCIONES PARA DEBUG/DEMO DEL HEADER 

/* HEADER - Funciones para demo y debug */
function updateSizeIndicator() {
    const width = window.innerWidth;
    document.getElementById('widthValue').textContent = width;
    
    const icon = document.getElementById('screenIcon');
    if (width <= 825) {
        icon.textContent = '📱';
        icon.title = 'Modo móvil activado';
    } else {
        icon.textContent = '💻';
        icon.title = 'Modo escritorio';
    }
}

// Función para simular pantalla móvil (solo para demo)
function simulateMobile() {
    window.resizeTo(400, 800); // Cambia tamaño de ventana
    setTimeout(() => {
        const hamburger = document.getElementById('Hamburguesa-principal');
        hamburger.checked = true; // Abre menú automáticamente
    }, 500); // Espera 500ms para que se redimensione
}

// Función para abrir/cerrar el menú hamburguesa (demo)
function toggleHamburger() {
    const hamburger = document.getElementById('Hamburguesa-principal');
    hamburger.checked = !hamburger.checked; // Alterna estado
    
    if (hamburger.checked) {
        alert('Menú hamburguesa abierto');
    } else {
        alert('Menú hamburguesa cerrado');
    }
}

// Función para abrir/cerrar el submenú de categorías (demo)
function toggleCategories() {
    const categories = document.getElementById('menu-opciones');
    categories.checked = !categories.checked;
    
    if (categories.checked) {
        alert('Submenú de categorías abierto');
    } else {
        alert('Submenú de categorías cerrado');
    }
}

// Función para reiniciar la demo
function resetDemo() {
    const hamburger = document.getElementById('Hamburguesa-principal');
    const categories = document.getElementById('menu-opciones');
    hamburger.checked = false;
    categories.checked = false;
    window.resizeTo(1024, 768); // Tamaño por defecto
    alert('Demo reiniciada - Menú cerrado y tamaño restablecido');
}

//  EVENTOS PARA MEJOR EXPERIENCIA EN MÓVIL

// Cerrar menú al hacer clic en enlaces (solo para demo)
document.querySelectorAll('.nav__vínculo, .menu-desplegable__opciones').forEach(link => {
    link.addEventListener('click', function(e) {
        if (window.innerWidth <= 825) { // Solo en móvil
            const hamburger = document.getElementById('Hamburguesa-principal');
            hamburger.checked = false; // Cierra menú hamburguesa
            
            const categories = document.getElementById('menu-opciones');
            categories.checked = false; // Cierra submenú
            
            console.log('Menú cerrado después de hacer clic en:', this.textContent);
        }
    });
});

// Cerrar menú al hacer clic fuera (overlay) - solo en móvil
document.querySelector('.nav__lista').addEventListener('click', function(e) {
    if (e.target === this && window.innerWidth <= 825) {
        const hamburger = document.getElementById('Hamburguesa-principal');
        hamburger.checked = false;
    }
});

//  INICIALIZACIÓN 

// Actualiza indicador de tamaño al cargar y redimensionar
window.addEventListener('load', updateSizeIndicator);
window.addEventListener('resize', updateSizeIndicator);
updateSizeIndicator(); // Llamada inicial


