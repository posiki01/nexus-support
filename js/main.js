function renderizarEstrellas(rating) {
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

function cargarServiciosDestacados() {
    const contenedor = document.getElementById('servicios-destacados');
    if (!contenedor) return;
    const destacados = obtenerServicios().slice(0, 3);
    contenedor.innerHTML = destacados.map(s => `
        <div class="card">
            <h3>${s.nombre}</h3>
            <p>${s.descripcionBreve.substring(0, 80)}...</p>
            <div class="card-rating">${renderizarEstrellas(s.rating)}</div>
            <div class="card-price">$${s.precio.toLocaleString()}${s.categoria === 'Soporte' ? '/mes' : ''}</div>
            <button class="btn-card" onclick="verDetalle(${s.id})">Ver más →</button>
        </div>
    `).join('');
}

function renderizarGridServicios(serviciosArray) {
    const grid = document.getElementById('servicios-grid');
    if (!grid) return;
    if (serviciosArray.length === 0) {
        grid.innerHTML = '<div style="text-align:center;padding:40px;">No hay servicios disponibles</div>';
        return;
    }
    grid.innerHTML = serviciosArray.map(s => `
        <div class="servicio-card" data-id="${s.id}">
            <h4>${s.nombre}</h4>
            <div class="servicio-categoria">${s.categoria}</div>
            <div class="servicio-rating">${renderizarEstrellas(s.rating)}</div>
            <div class="servicio-precio">$${s.precio.toLocaleString()}${s.categoria === 'Soporte' ? '/mes' : ''}</div>
            <button class="btn-servicio" onclick="verDetalle(${s.id})">Ver más</button>
        </div>
    `).join('');
}

function verDetalle(id) {
    const servicio = obtenerServicioPorId(id);
    if (servicio) {
        localStorage.setItem('servicio_seleccionado', JSON.stringify(servicio));
        window.location.href = `detalle.html?id=${id}`;
    }
}

function configurarBusquedaYEliminacion() {
    const buscador = document.getElementById('buscador');
    const btnEliminar = document.getElementById('btn-eliminar-seleccionados');
    
    if (buscador) {
        buscador.addEventListener('input', () => {
            const termino = buscador.value.toLowerCase();
            const filtrados = obtenerServicios().filter(s => s.nombre.toLowerCase().includes(termino));
            renderizarGridServicios(filtrados);
        });
    }
    
    if (btnEliminar) {
        btnEliminar.addEventListener('click', () => {
            if (confirm('¿Eliminar todos los servicios? Esta acción no se puede deshacer.')) {
                servicios = [];
                guardarEnStorage();
                renderizarGridServicios([]);
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('servicios-destacados')) cargarServiciosDestacados();
    if (document.getElementById('servicios-grid')) {
        renderizarGridServicios(obtenerServicios());
        configurarBusquedaYEliminacion();
    }
});