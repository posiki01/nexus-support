# Nexus Support

Sitio web estático de una empresa de soluciones tecnológicas llamada **Nexus Support**. Permite explorar un catálogo de servicios de TI, ver detalles de cada uno, guardar favoritos y enviar mensajes de contacto. Todo el estado se persiste en el navegador mediante `localStorage`, sin necesidad de backend.

---

## Tecnologías utilizadas

- HTML5 semántico
- CSS3 (Grid, Flexbox, diseño responsivo)
- JavaScript vanilla (ES6+)
- `localStorage` para persistencia de datos

No utiliza frameworks, librerías externas ni dependencias de ningún tipo.

---

## Estructura del proyecto

```
├── index.html          # Página principal con hero y servicios destacados
├── servicios.html      # Catálogo completo con buscador y acciones CRUD
├── detalle.html        # Vista detallada de un servicio individual
├── agregar.html        # Formulario para agregar un nuevo servicio
├── favoritos.html      # Lista de servicios marcados como favoritos
├── contacto.html       # Formulario de contacto con info de la empresa
├── css/
│   └── styles.css      # Estilos globales, componentes y responsive
└── js/
    ├── data.js         # Datos iniciales, funciones CRUD y manejo de localStorage
    ├── main.js         # Renderizado de cards, buscador en tiempo real
    ├── crud.js         # Lógica del formulario de agregar servicio
    ├── detalle.js      # Carga y renderiza el detalle de un servicio
    ├── favoritos.js    # Gestión completa de favoritos (agregar, quitar, listar)
    └── contacto.js     # Validación del formulario de contacto
```

---

## Páginas y funcionalidades

### index.html — Inicio
- Hero con título, subtítulo y botones de acción
- Sección "Servicios Destacados" que muestra los primeros 3 servicios del catálogo
- Las cards incluyen nombre, descripción breve, rating con estrellas y precio

### servicios.html — Catálogo
- Grid con todos los servicios disponibles
- Buscador en tiempo real que filtra por nombre mientras el usuario escribe
- Botón para agregar un nuevo servicio (redirige a `agregar.html`)
- Botón para eliminar todos los servicios del catálogo (con confirmación)

### detalle.html — Detalle de servicio
- Recibe el `id` del servicio por query string (`?id=1`)
- Muestra nombre, categoría, rating, descripción completa, lista de características y precio
- Botón para marcar/desmarcar como favorito con cambio visual inmediato
- Botón de acceso directo al formulario de contacto

### agregar.html — Agregar servicio
- Formulario con campos: nombre, categoría, URL de imagen, precio y descripción
- Validaciones:
  - Nombre: mínimo 3 caracteres
  - Precio: número mayor a 0
  - Descripción: mínimo 10 caracteres
- Al guardar exitosamente, redirige automáticamente a `servicios.html`
- Muestra mensajes de éxito o error en pantalla

### favoritos.html — Favoritos
- Lista todos los servicios marcados como favoritos
- Cada ítem muestra nombre, precio y botones para ver detalle o eliminar de favoritos
- Si no hay favoritos, muestra un estado vacío con acceso al catálogo

### contacto.html — Contacto
- Formulario con campos: nombre completo, correo electrónico, servicio de interés y mensaje
- Validaciones en tiempo real con mensajes de error por campo:
  - Nombre: mínimo 3 caracteres
  - Email: formato válido
  - Mensaje: mínimo 10 caracteres
- Panel lateral con información de contacto: dirección, email, teléfono y horarios

---

## Módulos JavaScript

### `data.js`
Centraliza todos los datos y operaciones sobre servicios:
- Array `servicios` con 8 servicios precargados (Soporte, Desarrollo, Seguridad, Innovación, Infraestructura)
- `obtenerServicios()` — retorna el array completo
- `obtenerServicioPorId(id)` — busca un servicio por ID
- `agregarServicio(nuevo)` — genera un nuevo ID, agrega al array y guarda en storage
- `eliminarServicio(id)` — filtra el array y guarda en storage
- `guardarEnStorage()` / `cargarStorage()` — sincronización con `localStorage` bajo la clave `nexus_services`
- Al cargar el script, intenta restaurar datos guardados previamente

### `main.js`
- `renderizarEstrellas(rating)` — genera HTML de estrellas doradas/grises según el rating (1-5)
- `cargarServiciosDestacados()` — renderiza los primeros 3 servicios en el home
- `renderizarGridServicios(array)` — renderiza el grid completo en `servicios.html`
- `verDetalle(id)` — guarda el servicio en `localStorage` y navega a `detalle.html`
- `configurarBusquedaYEliminacion()` — enlaza el input de búsqueda y el botón de eliminar

### `crud.js`
- Escucha el submit del formulario de `agregar.html`
- Valida los campos antes de guardar
- Llama a `agregarServicio()` de `data.js` y redirige tras 1.5 segundos

### `detalle.js`
- Lee el parámetro `id` de la URL
- Construye el HTML del detalle con toda la información del servicio
- `toggleFavoritoDetalle(id)` — actualiza el botón de favorito sin recargar la página

### `favoritos.js`
- Persiste los IDs favoritos en `localStorage` bajo la clave `nexus_favoritos`
- `toggleFavorito(id)` — agrega o quita un servicio de favoritos y muestra una notificación flotante
- `cargarListaFavoritos()` — cruza los IDs guardados con el catálogo para renderizar la lista
- `mostrarNotificacion(mensaje)` — crea un toast temporal en la esquina inferior derecha

### `contacto.js`
- Valida los tres campos requeridos al hacer submit
- Muestra errores individuales debajo de cada campo
- Si todo es válido, muestra confirmación y resetea el formulario

---

## Diseño y estilos

- Paleta de colores: azul corporativo `#2185C5`, gris oscuro `#2D3748`, fondo claro `#E9EDF5`
- Header con diseño de bloques: logo sobre fondo verde oliva, acento azul decorativo y navegación
- Header sticky que permanece visible al hacer scroll
- Layout responsivo con media queries para pantallas menores a 768px
- Hover effects en cards con `transform: translateY`
- Mensajes de confirmación con colores semánticos (verde para éxito, rojo para error)

---

## Cómo ejecutar

Abre `index.html` directamente en el navegador. No requiere servidor, instalación ni dependencias externas.

```
# Opción simple
Doble clic en index.html

# Con servidor local (opcional, para evitar restricciones CORS)
npx serve .
# o
python -m http.server 8080
```

---

## Datos iniciales

El catálogo incluye 8 servicios precargados:

| ID | Nombre | Categoría | Precio |
|----|--------|-----------|--------|
| 1 | Soporte Técnico 24/7 | Soporte | $199.000/mes |
| 2 | Desarrollo Web a Medida | Desarrollo | $1.500.000 |
| 3 | Consultoría en Ciberseguridad | Seguridad | $350.000 |
| 4 | Implementación de IA | Innovación | $2.500.000 |
| 5 | Cloud Computing Empresarial | Infraestructura | $450.000 |
| 6 | Desarrollo de Apps Móviles | Desarrollo | $2.800.000 |
| 7 | Automatización de Procesos | Innovación | $1.800.000 |
| 8 | Mantenimiento de Equipos | Soporte | $89.000 |

Los datos se guardan en `localStorage` al primer uso. Para restaurar los datos originales, limpiar el `localStorage` del navegador.
