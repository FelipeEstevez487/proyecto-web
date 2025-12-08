// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== VARIABLES PRINCIPALES =====
    const imagenes = document.querySelectorAll('.imagen-galeria');
    const modal = document.getElementById('modal');
    const imagenAmpliada = document.getElementById('imagen-ampliada');
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
            hdUrl: "IMG/imagenes-hd/1.jpg"
        },
        //  ... resto de imágenes que no pondré porque no es necesario...
    };
    
    const likesEstado = {};
    
    // ===== BÚSQUEDA =====
    function buscar() {
        const texto = inputBuscar.value.trim();
        if (texto) {
            alert(`Estás buscando: "${texto}"`);
        }
    }
    
    inputBuscar.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') buscar();
    });
    
    botonBuscar.addEventListener('click', buscar);
    
    // ===== ABRIR IMAGEN =====
    imagenes.forEach(imagen => {
        imagen.addEventListener('click', function() {
            abrirModal(this.getAttribute('src'));
        });
    });
    
    // ===== CERRAR MODAL =====
    cerrarModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // ===== BOTÓN ME GUSTA =====
    document.getElementById('boton-me-gusta').addEventListener('click', function() {
        const src = imagenAmpliada.getAttribute('src');
        const info = infoImagenes[src] || {};
        
        if (likesEstado[src] === undefined) {
            likesEstado[src] = (info.likes || 0) + 1;
            this.innerHTML = `<i class="fas fa-heart"></i> ${likesEstado[src]}`;
            this.classList.add('activo');
        } else {
            delete likesEstado[src];
            const originalLikes = info.likes || 0;
            this.innerHTML = `<i class="far fa-heart"></i> ${originalLikes}`;
            this.classList.remove('activo');
        }
    });
    
    // ===== BOTÓN COMPARTIR =====
    document.getElementById('boton-compartir').addEventListener('click', function() {
        alert('Hiciste click en compartir');
    });
    
    // ===== BOTÓN DESCARGAR =====
    document.getElementById('boton-descargar').addEventListener('click', function() {
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
    
    // ===== FUNCIÓN PARA ABRIR MODAL =====
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
        
        const btnLike = document.getElementById('boton-me-gusta');
        const likeCount = likesEstado[src] !== undefined ? likesEstado[src] : info.likes;
        btnLike.innerHTML = `<i class="${likesEstado[src] ? 'fas' : 'far'} fa-heart"></i> ${likeCount}`;
        if (likesEstado[src]) {
            btnLike.classList.add('activo');
        } else {
            btnLike.classList.remove('activo');
        }
        
        modal.style.display = 'block';
        generarRecomendaciones(src);
    }
    
    // ===== FUNCIÓN PARA GENERAR RECOMENDACIONES =====
    function generarRecomendaciones(srcActual) {
        recomendacionesGrid.innerHTML = '';
        
        const otrasImagenes = Array.from(imagenes).filter(img => img.src !== srcActual);
        const mezcladas = otrasImagenes.sort(() => 0.5 - Math.random());
        
        const esDesktop = window.innerWidth > 825;
        const cantidad = esDesktop ? 2 : 0;
        const recomendaciones = mezcladas.slice(0, cantidad);
        
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
    
    // ===== MENÚ HAMBURGUESA SIMPLIFICADO =====
    // Solo para cerrar el menú en móvil al hacer clic en enlaces
    const menuTogglePrincipal = document.getElementById('menu-toggle');
    
    if (menuTogglePrincipal) {
        document.querySelectorAll('.nav__vínculo, .menu-desplegable__opciones').forEach(enlace => {
            enlace.addEventListener('click', function() {
                if (window.innerWidth <= 825) {
                    menuTogglePrincipal.checked = false;
                    const menuCategorias = document.getElementById('menu-opciones');
                    if (menuCategorias) menuCategorias.checked = false;
                }
            });
        });
    }
});