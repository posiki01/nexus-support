function renderizarEstrellasDetalle(rating) {
    let estrellas = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            estrellas += '<span class="star-gold">★</span>';
        } else {
            estrellas += '<span class="star-gray">★</span>';
        }
    }
    return estrellas;
}

function cargarDetalle() {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));
    const servicio = obtenerServicioPorId(id);
    const contenedor = document.getElementById('detalle-contenido');
    
    if (!servicio || !contenedor) {
        if (contenedor) contenedor.innerHTML = '<div style="text-align:center;padding:40px;">Servicio no encontrado</div>';
        return;
    }
    
    contenedor.innerHTML = `
        <div class="detalle-container">
            <div class="detalle-imagen">
                🖥️
            </div>
            <div class="detalle-info">
                <h1>${servicio.nombre}</h1>
                <div class="detalle-categoria">${servicio.categoria}</div>
                <div class="detalle-rating">${renderizarEstrellasDetalle(servicio.rating)}</div>
                <p class="detalle-descripcion">${servicio.descripcionCompleta || servicio.descripcionBreve}</p>
                <ul class="detalle-caracteristicas">
                    ${servicio.caracteristicas.map(c => `<li>${c}</li>`).join('')}
                </ul>
                <div class="detalle-precio">$${servicio.precio.toLocaleString()}${servicio.categoria === 'Soporte' ? '/mes' : ''}</div>
                <div class="detalle-botones">
                    <button class="btn-detalle-fav ${esFavorito(servicio.id) ? 'activo' : ''}" onclick="toggleFavoritoDetalle(${servicio.id})">
                        ${esFavorito(servicio.id) ? '❤️ Favorito' : '🤍 Favorito'}
                    </button>
                    <button class="btn-detalle-contacto" onclick="window.location.href='contacto.html'">📩 Contacto</button>
                </div>
            </div>
        </div>
    `;
}

function toggleFavoritoDetalle(id) {
    toggleFavorito(id);
    const btn = document.querySelector('.btn-detalle-fav');
    if (btn) {
        const esFav = esFavorito(id);
        btn.textContent = esFav ? '❤️ Favorito' : '🤍 Favorito';
        if (esFav) btn.classList.add('activo');
        else btn.classList.remove('activo');
    }
}

document.addEventListener('DOMContentLoaded', cargarDetalle);