document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-agregar');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const nombre = document.getElementById('nombre-servicio').value;
        const categoria = document.getElementById('categoria').value;
        const imagenUrl = document.getElementById('url-imagen').value;
        const precio = parseFloat(document.getElementById('precio').value);
        const descripcion = document.getElementById('descripcion').value;
        
        if (!nombre || nombre.length < 3) {
            mostrarMsg(false, 'Nombre debe tener al menos 3 caracteres');
            return;
        }
        if (isNaN(precio) || precio <= 0) {
            mostrarMsg(false, 'Precio válido requerido');
            return;
        }
        if (!descripcion || descripcion.length < 10) {
            mostrarMsg(false, 'Descripción debe tener al menos 10 caracteres');
            return;
        }
        
        const nuevo = {
            nombre: nombre,
            categoria: categoria,
            imagenUrl: imagenUrl || "",
            precio: precio,
            descripcionBreve: descripcion,
            descripcionCompleta: descripcion
        };
        
        agregarServicio(nuevo);
        mostrarMsg(true, '✓ Servicio agregado exitosamente!');
        form.reset();
        
        setTimeout(() => {
            window.location.href = 'servicios.html';
        }, 1500);
    });
});

function mostrarMsg(exito, msg) {
    const div = document.getElementById('mensaje-crud');
    div.textContent = msg;
    div.className = `mensaje-confirmacion ${exito ? 'exito' : 'error'}`;
    setTimeout(() => {
        div.textContent = '';
        div.className = 'mensaje-confirmacion';
    }, 3000);
}