document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const imagenes = document.querySelectorAll('.imagen-galeria');
    const modal = document.getElementById('modal');
    const paginaDescarga = document.getElementById('pagina-descarga');
    const imagenAmpliada = document.getElementById('imagen-ampliada');
    const imagenHd = document.getElementById('imagen-hd');
    const recomendacionesGrid = document.getElementById('recomendaciones-grid');
    const cerrarModal = document.querySelector('.cerrar-modal');
    const btnVolver = document.getElementById('btn-volver');
    const btnDescargaDirecta = document.getElementById('btn-descarga-directa');
    
    // Información de las imágenes
    const infoImagenes = {
        "IMG/imagenes/1.jpg": {
            titulo: "Amanecer en las Montañas",
            artista: "Ana Rodríguez",
            categoria: "Paisajes",
            fecha: "15 Marzo 2023",
            likes: 0,
            hdUrl: "IMG/imagenes-hd/1.jpg"
        },
        "IMG/imagenes/2.jpg": {
            titulo: "Retrato Urbano",
            artista: "Carlos Méndez",
            categoria: "Retratos",
            fecha: "22 Abril 2023",
            likes: 0,
            hdUrl: "IMG/imagenes-hd/2.jpg"
        },
        "IMG/imagenes/3.jpg": {
            titulo: "Arquitectura Moderna",
            artista: "Laura Fernández",
            categoria: "Arquitectura",
            fecha: "5 Mayo 2023",
            likes: 0,
            hdUrl: "IMG/imagenes-hd/3.jpg"
        },
        "IMG/imagenes/4.jpg": {
            titulo: "Abstracción Natural",
            artista: "Miguel Torres",
            categoria: "Abstracto",
            fecha: "18 Junio 2023",
            likes: 0,
            hdUrl: "IMG/imagenes-hd/4.jpg"
        },
        "IMG/imagenes/5.jpg": {
            titulo: "Detalles Macro",
            artista: "Sofía López",
            categoria: "Macro",
            fecha: "30 Julio 2023",
            likes: 0,
            hdUrl: "IMG/imagenes-hd/5.jpg"
        },
        "IMG/imagenes/6.jpg": {
            titulo: "Noche Estrellada",
            artista: "David García",
            categoria: "Nocturna",
            fecha: "12 Agosto 2023",
            likes: 0,
            hdUrl: "IMG/imagenes-hd/6.jpg"
        },
        "IMG/imagenes/7.jpg": {
            titulo: "Arte Digital",
            artista: "Elena Vargas",
            categoria: "Digital",
            fecha: "25 Septiembre 2023",
            likes: 0,
            hdUrl: "IMG/imagenes-hd/7.jpg"
        },
        "IMG/imagenes/8.jpg": {
            titulo: "Vida Urbana",
            artista: "Roberto Silva",
            categoria: "Callejera",
            fecha: "3 Octubre 2023",
            likes: 0,
            hdUrl: "IMG/imagenes-hd/8.jpg"
        },
        "IMG/imagenes/9.jpg": {
            titulo: "Costa Serena",
            artista: "Isabel Morales",
            categoria: "Paisajes",
            fecha: "17 Noviembre 2023",
            likes: 0,
            hdUrl: "IMG/imagenes-hd/9.jpg"
        },
        "IMG/imagenes/10.jpg": {
            titulo: "Expresión Artística",
            artista: "Javier Ruiz",
            categoria: "Retratos",
            fecha: "8 Diciembre 2023",
            likes: 0,
            hdUrl: "IMG/imagenes-hd/10.jpg"
        },
        "IMG/imagenes/11.jpg": {
            titulo: "Concepto Visual",
            artista: "Patricia Castro",
            categoria: "Conceptual",
            fecha: "21 Enero 2024",
            likes: 0,
            hdUrl: "IMG/imagenes-hd/11.jpg"
        },
        "IMG/imagenes/12.jpg": {
            titulo: "Geometría Abstracta",
            artista: "Fernando Ortega",
            categoria: "Abstracto",
            fecha: "14 Febrero 2024",
            likes: 0,
            hdUrl: "IMG/imagenes-hd/12.jpg"
        }
    };

    // Estado de likes
    const likesEstado = {};
    
    // Event Listeners para las imágenes de la galería
    imagenes.forEach(imagen => {
        imagen.addEventListener('click', function() {
            abrirModal(this.getAttribute('src'));
        });
    });
    
    // Cerrar modal
    cerrarModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Cerrar modal al hacer clic fuera del contenido
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
        if (event.target === paginaDescarga) {
            paginaDescarga.style.display = 'none';
        }
    });
    
    // Botón de me gusta
    document.getElementById('btn-me-gusta').addEventListener('click', function() {
        const src = imagenAmpliada.getAttribute('src');
        if (likesEstado[src] === undefined) {
            likesEstado[src] = (infoImagenes[src]?.likes || 0) + 1;
            this.innerHTML = `<i class="fas fa-heart"></i> ${likesEstado[src]}`;
            this.classList.add('activo');
        } else {
            delete likesEstado[src];
            const originalLikes = infoImagenes[src]?.likes || 0;
            this.innerHTML = `<i class="far fa-heart"></i> ${originalLikes}`;
            this.classList.remove('activo');
        }
    });
    
    // Botón de compartir
    document.getElementById('btn-compartir').addEventListener('click', function() {
        alert('Hiciste click en compartir');
    });
    
    // Botón de descargar
    document.getElementById('btn-descargar').addEventListener('click', function() {
        const src = imagenAmpliada.getAttribute('src');
        const info = infoImagenes[src] || {};
        
        const hdSrc = info.hdUrl || src;
        
        const nuevaPestana = window.open('', '_blank');
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
        nuevaPestana.document.close();
    });

    // Botón volver desde página de descarga
    btnVolver.addEventListener('click', function() {
        paginaDescarga.style.display = 'none';
        modal.style.display = 'block';
    });

    // Función para abrir el modal
    function abrirModal(src) {
        const info = infoImagenes[src] || {
            titulo: "Imagen sin título",
            artista: "Artista desconocido",
            categoria: "Sin categoría",
            fecha: "Fecha desconocida",
            likes: 0
        };
        
        imagenAmpliada.setAttribute('src', src);
        document.getElementById('titulo-imagen').textContent = info.titulo;
        document.getElementById('artista-imagen').textContent = info.artista;
        document.getElementById('categoria-imagen').textContent = info.categoria;
        document.getElementById('fecha-imagen').textContent = info.fecha;
        
        // Configurar botón de like
        const btnLike = document.getElementById('btn-me-gusta');
        const likeCount = likesEstado[src] !== undefined ? likesEstado[src] : info.likes;
        btnLike.innerHTML = `<i class="${likesEstado[src] ? 'fas' : 'far'} fa-heart"></i> ${likeCount}`;
        if (likesEstado[src]) {
            btnLike.classList.add('activo');
        } else {
            btnLike.classList.remove('activo');
        }
        
        modal.style.display = 'block';
        
        // Generar recomendaciones
        generarRecomendaciones(src);
    }

    // Función para generar recomendaciones
    function generarRecomendaciones(srcActual) {
        // Limpiar recomendaciones anteriores
        recomendacionesGrid.innerHTML = '';
        
        // Crear array de todas las imágenes excepto la actual
        const otrasImagenes = Array.from(imagenes).filter(img => img.src !== srcActual);
        
        // Mezclar aleatoriamente y tomar 6 imágenes
        const recomendaciones = otrasImagenes
            .sort(() => 0.5 - Math.random())
            .slice(0, 6);
        
        // Añadir las recomendaciones al grid
        recomendaciones.forEach(imagen => {
            const div = document.createElement('div');
            div.className = 'recomendacion';
            
            const img = document.createElement('img');
            img.src = imagen.src;
            img.alt = imagen.alt;
            
            img.addEventListener('click', function() {
                abrirModal(this.src);
            });
            
            div.appendChild(img);
            recomendacionesGrid.appendChild(div);
        });
    }
});

/* Menú Hamburguesa */
const hamburguesa = document.querySelector('.boton-categoria');
const menu = document.querySelector('.menu');

// Verificamos que los elementos existan antes de agregar event listeners
if (hamburguesa && menu) {
    hamburguesa.addEventListener('click', () => {
        menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
    });
}

// Cerrar el menú desplegable al hacer clic fuera de él
document.addEventListener('click', function(event) {
    // Obtenemos el contenedor del menú desplegable
    const menuContainer = document.querySelector('.Hamburguesa');
    // Obtenemos el checkbox que controla el menú
    const menuToggle = document.getElementById('menu-opciones');
    
    // Verificamos que los elementos existan
    if (menuContainer && menuToggle) {
        // Verificamos si el clic fue DENTRO del contenedor del menú
        if (!menuContainer.contains(event.target)) {
            // Si el clic fue FUERA del menú, desmarcamos el checkbox
            menuToggle.checked = false;
        }
    }
});

// Cerrar el menú desplegable al seleccionar una opción
document.querySelectorAll('.menu-desplegable a').forEach(link => {
    link.addEventListener('click', function() {
        const menuToggle = document.getElementById('menu-opciones');
        if (menuToggle) {
            menuToggle.checked = false;
        }
    });
});


