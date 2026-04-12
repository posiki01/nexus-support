const STORAGE_KEY = 'nexus_favoritos';

function obtenerFavoritos() {
    const f = localStorage.getItem(STORAGE_KEY);
    return f ? JSON.parse(f) : [];
}

function guardarFavoritos(fav) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fav));
}

function esFavorito(id) {
    return obtenerFavoritos().includes(id);
}

function toggleFavorito(id) {
    let favs = obtenerFavoritos();
    if (favs.includes(id)) {
        favs = favs.filter(i => i !== id);
        mostrarNotificacion('❌ Eliminado de favoritos');
    } else {
        favs.push(id);
        mostrarNotificacion('❤️ Agregado a favoritos');
    }
    guardarFavoritos(favs);
    actualizarBotonesFavorito(id);
    if (document.getElementById('lista-favoritos')) cargarListaFavoritos();
}

function actualizarBotonesFavorito(id) {
    const btnFav = document.querySelector(`.btn-detalle-fav`);
    if (btnFav && btnFav.getAttribute('onclick')?.includes(id)) {
        const esFav = esFavorito(id);
        btnFav.textContent = esFav ? '❤️ Favorito' : '🤍 Favorito';
        if (esFav) btnFav.classList.add('activo');
        else btnFav.classList.remove('activo');
    }
}

function eliminarDeFavoritos(id) {
    let favs = obtenerFavoritos();
    favs = favs.filter(i => i !== id);
    guardarFavoritos(favs);
    mostrarNotificacion('🗑️ Eliminado de favoritos');
    cargarListaFavoritos();
}

function cargarListaFavoritos() {
    const cont = document.getElementById('lista-favoritos');
    if (!cont) return;
    const favs = obtenerFavoritos();
    const serviciosFav = obtenerServicios().filter(s => favs.includes(s.id));
    if (serviciosFav.length === 0) {
        cont.innerHTML = '<div class="empty-state">💔 Aún no tienes servicios favoritos<br><br><button class="btn-primary" onclick="window.location.href=\'servicios.html\'">Explorar Servicios</button></div>';
        return;
    }
    cont.innerHTML = serviciosFav.map(s => `
        <div class="favorito-item">
            <div class="favorito-info">
                <h4>${s.nombre}</h4>
                <p>$${s.precio.toLocaleString()}${s.categoria === 'Soporte' ? '/mes' : ''}</p>
            </div>
            <div class="favorito-acciones">
                <button class="btn-servicio" style="width:auto;padding:6px 16px;" onclick="verDetalle(${s.id})">Ver más</button>
                <button class="btn-servicio" style="width:auto;padding:6px 16px;background-color:#E53E3E;" onclick="eliminarDeFavoritos(${s.id})">❌ Eliminar</button>
            </div>
        </div>
    `).join('');
}

function mostrarNotificacion(mensaje) {
    const n = document.createElement('div');
    n.textContent = mensaje;
    n.style.cssText = 'position:fixed;bottom:20px;right:20px;background:#4A5568;color:white;padding:10px 20px;border-radius:8px;z-index:1000;font-size:0.85rem;';
    document.body.appendChild(n);
    setTimeout(() => n.remove(), 2000);
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('lista-favoritos')) cargarListaFavoritos();
});