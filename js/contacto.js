function validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-contacto');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const mensaje = document.getElementById('mensaje').value;
        let errores = [];
        
        if (!nombre || nombre.trim().length < 3) {
            errores.push({ campo: 'nombre', msg: 'Nombre debe tener al menos 3 caracteres' });
        }
        if (!email || !validarEmail(email)) {
            errores.push({ campo: 'email', msg: 'Correo electrónico válido requerido' });
        }
        if (!mensaje || mensaje.trim().length < 10) {
            errores.push({ campo: 'mensaje', msg: 'Mensaje debe tener al menos 10 caracteres' });
        }
        
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
        
        if (errores.length > 0) {
            errores.forEach(e => {
                const errDiv = document.getElementById(`error-${e.campo}`);
                if (errDiv) errDiv.textContent = e.msg;
            });
            mostrarConfirmacion(false, 'Por favor corrige los errores');
        } else {
            mostrarConfirmacion(true, '✓ Mensaje enviado con éxito! Te contactaremos pronto.');
            form.reset();
        }
    });
});

function mostrarConfirmacion(exito, msg) {
    const div = document.getElementById('mensaje-confirmacion');
    div.textContent = msg;
    div.className = `mensaje-confirmacion ${exito ? 'exito' : 'error'}`;
    setTimeout(() => {
        div.textContent = '';
        div.className = 'mensaje-confirmacion';
    }, 4000);
}