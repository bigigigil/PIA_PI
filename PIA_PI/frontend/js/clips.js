const paisesConClips = [
    { id: "colombia", nombre: "Colombia", code: "CO" },
    { id: "coreadelsur", nombre: "Corea del Sur", code: "KR" },
    { id: "espania", nombre: "España", code: "ES" },
    { id: "japon", nombre: "Japón", code: "JP" },    
    { id: "mexico", nombre: "México", code: "MX" },
    { id: "sudafrica", nombre: "Sudáfrica", code: "ZA" },
    { id: "tunez", nombre: "Tunez", code: "TN" },
    { id: "uruguay", nombre: "Uruguay", code: "UY" },
    { id: "uzbekistan", nombre: "Uzbekistán", code: "UZ" }
];

const VIDEOS_POR_CARPETA = 3;

function crearFiltros() {
    const contenedorFiltros = document.getElementById('contenedor-filtros');

    let htmlFiltros = `<button class="btn btn-light rounded-pill filter-btn active me-2 d-inline-flex align-items-center" onclick="aplicarFiltro('todos', this)">
        <i class="bi bi-stars text-warning me-2 fs-5"></i> Todos
    </button>`;

    paisesConClips.forEach(pais => {
        htmlFiltros += `
        <button class="btn btn-light rounded-pill filter-btn me-2 d-inline-flex align-items-center shadow-sm" onclick="aplicarFiltro('${pais.id}', this)">
            <img src="https://flagsapi.com/${pais.code}/shiny/64.png" style="width: 24px; margin-right: 8px; border-radius: 4px;"> 
            ${pais.nombre}
        </button>`;
    });

    contenedorFiltros.innerHTML = htmlFiltros;
}

function renderizarVideos(filtroId) {
    const galeria = document.getElementById('galeria-clips');
    
    let paisesAMostrar = [];
    if (filtroId === 'todos') {
        paisesAMostrar = paisesConClips;
    } else {
        paisesAMostrar = paisesConClips.filter(p => p.id === filtroId);
    }

    let htmlCompleto = "";

    paisesAMostrar.forEach(pais => {
        for (let i = 1; i <= VIDEOS_POR_CARPETA; i++) {
            const rutaVideo = `./assets/clips/${pais.id}/${i}.mp4`;

            htmlCompleto += `
                <div class="card clip-card border-0 shadow-sm mb-4">
                    <div class="card-body">
                        
                        <h6 class="text-uppercase fw-bold text-muted mb-3 d-flex align-items-center">
                            <i class="bi bi-geo-alt-fill text-danger me-2"></i> Clip ${i} - ${pais.nombre}
                            <img src="https://flagsapi.com/${pais.code}/flat/64.png" style="width: 24px; margin-left: 8px;"> 
                        </h6>

                        <div class="rounded overflow-hidden shadow-sm mb-3 bg-black">
                            <video controls preload="metadata" style="width: 100%; height: auto; display: block; max-height: 500px;">
                                <source src="${rutaVideo}" type="video/mp4">
                                Tu navegador no soporta el reproductor de video.
                            </video>
                        </div>

                        <button class="btn btn-dark w-100 rounded-pill" onclick="location.href='editor.html?video=${rutaVideo}'">
                            <i class="bi bi-magic"></i> editar este video ଘ(∩^o^)⊃━☆゜
                        </button>
                    </div>
                </div>
            `;
        }
    });

    galeria.innerHTML = htmlCompleto;
}

function aplicarFiltro(filtroId, botonPresionado) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    botonPresionado.classList.add('active');

    renderizarVideos(filtroId);
}

window.onload = function () {
    crearFiltros();
    renderizarVideos('todos');
};