import { Injectable } from '@angular/core';

export interface Servicio {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  imagenUrl?: string;
  categoria?: 'Soporte' | 'Desarrollo' | 'Seguridad' | 'Innovación' | 'Infraestructura';
  rating?: number;
  caracteristicas?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly SERVICES_KEY = 'nexus_services';
  private readonly FAVS_KEY = 'nexus_favoritos';
  
  private servicios: Servicio[] = [];
  private favoritosIds: number[] = [];

  constructor() {
    this.inicializarDatos();
  }

  /**
   * Inicializa la carga de datos desde LocalStorage o con valores por defecto
   * @private
   */
  private inicializarDatos() {
    const storedData = localStorage.getItem(this.SERVICES_KEY);
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      // Mapeo de seguridad: Si vienen datos viejos con 'descripcionBreve', los convertimos a 'descripcion'
      this.servicios = parsedData.map((s: any) => ({
        ...s,
        descripcion: s.descripcion || s.descripcionBreve || 'Sin descripción disponible',
        imagen: this.normalizarRutaImagen(s.imagen || s.imagenUrl || this.obtenerRutaImagen(s.id)),
        imagenUrl: this.normalizarRutaImagen(s.imagen || s.imagenUrl || this.obtenerRutaImagen(s.id)), // Compatibilidad con JS vanilla
        precio: Number(s.precio) || 0
      }));
      this.guardarServicios(); // Persistir los datos normalizados para limpiar el localStorage
    } else {
      this.servicios = [
        { id: 1, nombre: "Soporte Técnico 24/7", categoria: "Soporte", descripcion: "Asistencia inmediata las 24 horas, todos los días del año.", imagen: "/assets/img/soporte.jpg", imagenUrl: "/assets/img/soporte.jpg", precio: 199000, rating: 4, caracteristicas: ["Diagnóstico Remoto", "Soporte telefónico"] },
        { id: 2, nombre: "Desarrollo Web a Medida", categoria: "Desarrollo", descripcion: "Sitios web modernos, responsivos y optimizados.", imagen: "/assets/img/web.jpg", imagenUrl: "/assets/img/web.jpg", precio: 1500000, rating: 5, caracteristicas: ["Diseño responsivo", "SEO"] },
        { id: 3, nombre: "Consultoría en Ciberseguridad", categoria: "Seguridad", descripcion: "Auditorías y soluciones avanzadas para proteger tu empresa.", imagen: "/assets/img/seguridad.jpg", imagenUrl: "/assets/img/seguridad.jpg", precio: 350000, rating: 5, caracteristicas: ["Auditorías", "Pentesting"] },
        { id: 4, nombre: "Implementación de IA", categoria: "Innovación", descripcion: "Integra inteligencia artificial en tus procesos.", imagen: "/assets/img/ia.jpg", imagenUrl: "/assets/img/ia.jpg", precio: 2500000, rating: 4, caracteristicas: ["Chatbots", "Machine Learning"] },
        { id: 5, nombre: "Cloud Computing", categoria: "Infraestructura", descripcion: "Migración y gestión en AWS, Azure o Google Cloud.", imagen: "/assets/img/cloud.jpg", imagenUrl: "/assets/img/cloud.jpg", precio: 450000, rating: 5, caracteristicas: ["Migración", "Monitoreo"] },
        { id: 6, nombre: "Desarrollo de Apps Móviles", categoria: "Desarrollo", descripcion: "Apps nativas e híbridas para iOS y Android.", imagen: "/assets/img/mobile.jpg", imagenUrl: "/assets/img/mobile.jpg", precio: 2800000, rating: 4, caracteristicas: ["iOS", "Android"] },
        { id: 7, nombre: "Automatización RPA", categoria: "Innovación", descripcion: "Optimiza operaciones con RPA y workflows.", imagen: "/assets/img/rpa.jpg", imagenUrl: "/assets/img/rpa.jpg", precio: 1800000, rating: 4, caracteristicas: ["RPA", "Workflows"] },
        { id: 8, nombre: "Mantenimiento de Equipos", categoria: "Soporte", descripcion: "Diagnóstico y reparación de hardware.", imagen: "/assets/img/hardware.jpg", imagenUrl: "/assets/img/hardware.jpg", precio: 89000, rating: 5, caracteristicas: ["Hardware", "Garantía"] }
      ];
      this.guardarServicios();
    }

    const storedFavs = localStorage.getItem(this.FAVS_KEY);
    this.favoritosIds = storedFavs ? JSON.parse(storedFavs) : [];
  }

  /**
   * Asegura que la ruta de la imagen sea válida y tenga el prefijo correcto
   */
  private normalizarRutaImagen(ruta: string): string {
    if (!ruta) return '/assets/img/logo.png';
    if (ruta.startsWith('http') || ruta.startsWith('/')) return ruta;
    
    // Extraer solo el nombre del archivo (ej: "src/assets/img/web.jpg" -> "web.jpg")
    const partes = ruta.split(/[\/\\]/);
    const nombreArchivo = partes[partes.length - 1];
    
    // Retornar la ruta relativa que entiende el servidor web (Vite/Angular)
    return `/assets/img/${nombreArchivo}`;
  }

  /**
   * Devuelve la ruta por defecto según el ID si la imagen está vacía
   */
  private obtenerRutaImagen(id: number): string {
    const mapas: { [key: number]: string } = {
      1: '/assets/img/soporte.jpg',
      2: '/assets/img/web.jpg',
      3: '/assets/img/seguridad.jpg',
      4: '/assets/img/ia.jpg',
      5: '/assets/img/cloud.jpg',
      6: '/assets/img/mobile.jpg',
      7: '/assets/img/rpa.jpg',
      8: '/assets/img/hardware.jpg'
    };
    return mapas[id] || '';
  }

  /**
   * Persiste la lista de servicios en LocalStorage
   * @private
   */
  private guardarServicios() {
    localStorage.setItem(this.SERVICES_KEY, JSON.stringify(this.servicios));
  }

  /**
   * Persiste la lista de IDs favoritos en LocalStorage
   * @private
   */
  private guardarFavoritos() {
    localStorage.setItem(this.FAVS_KEY, JSON.stringify(this.favoritosIds));
  }

  /**
   * Retorna la lista completa de servicios
   * @returns {Servicio[]} Array de servicios
   */
  getServicios(): Servicio[] {
    return [...this.servicios];
  }

  /**
   * Busca un servicio específico por su identificador único
   * @param {number} id - Identificador del servicio
   * @returns {Servicio | undefined} El servicio encontrado o undefined
   */
  getServicioById(id: number): Servicio | undefined {
    return this.servicios.find(s => s.id === id);
  }

  /**
   * Retorna los servicios con mejor calificación (destacados)
   * @param {number} limite - Cantidad de servicios a retornar (por defecto 3)
   * @returns {Servicio[]} Array de servicios destacados
   */
  getDestacados(limite: number = 3): Servicio[] {
    return [...this.servicios]
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, limite);
  }

  /**
   * Agrega un nuevo servicio al catálogo
   * @param {Omit<Servicio, 'id'>} nuevo - Datos del nuevo servicio
   * @returns {Servicio} Servicio creado con ID asignado
   */
  agregarServicio(nuevo: Omit<Servicio, 'id'>): Servicio {
    const nuevoId = this.servicios.length > 0 
      ? Math.max(...this.servicios.map(s => s.id)) + 1 
      : 1;
    
    const completo: Servicio = {
      ...nuevo,
      id: nuevoId,
      rating: nuevo.rating || 5,
      caracteristicas: nuevo.caracteristicas || []
    };

    this.servicios.push(completo);
    this.guardarServicios();
    return completo;
  }

  eliminarServicio(id: number): void {
    this.servicios = this.servicios.filter(s => s.id !== id);
    this.favoritosIds = this.favoritosIds.filter(favId => favId !== id);
    this.guardarServicios();
    this.guardarFavoritos();
  }

  limpiarTodo(): void {
    this.servicios = [];
    this.favoritosIds = [];
    this.guardarServicios();
    this.guardarFavoritos();
  }

  // --- Métodos de Favoritos ---

  getFavoritos(): Servicio[] {
    return this.servicios.filter(s => this.favoritosIds.includes(s.id));
  }

  esFavorito(id: number): boolean {
    return this.favoritosIds.includes(id);
  }

  toggleFavorito(id: number): boolean {
    const index = this.favoritosIds.indexOf(id);
    let agregado = false;

    if (index > -1) {
      this.favoritosIds.splice(index, 1);
    } else {
      this.favoritosIds.push(id);
      agregado = true;
    }

    this.guardarFavoritos();
    return agregado;
  }
}