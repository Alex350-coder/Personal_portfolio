import type { Project } from '@/data/project.schema'

/**
 * Project dataset (Rules §10: typed local data, no runtime GitHub API). Selection and statuses:
 * docs/ProjectShowcase.md §Inventory, owner-confirmed 2026-10-06. Summaries derive from the repos'
 * public GitHub descriptions/READMEs; nothing here is a measured or invented claim. `year` is the
 * year the repository was created on GitHub. No project has a live demo, so no `links.live`.
 * Adding a project = adding an entry here (plus assets in later phases).
 */
const GITHUB = 'https://github.com/Alex350-coder'

export const projects: readonly Project[] = [
  {
    slug: 'attack-surface-studio',
    title: 'Attack Surface Studio',
    summary:
      'Plataforma de grafo de conocimiento para evaluar superficie de ataque: orquesta Nmap, ffuf y Nuclei y normaliza resultados en nodos y aristas.',
    category: 'seguridad',
    status: 'completado',
    year: 2026,
    stack: ['nextjs', 'react', 'nestjs', 'typescript', 'drizzle', 'bullmq', 'redis', 'postgresql', 'nmap', 'ffuf', 'nuclei', 'docker', 'vitest', 'playwright'],
    featured: 1,
    links: { repo: `${GITHUB}/Attack-surface-studio` },
    cover: { src: '/projects/attack-surface-studio/01-landing.jpg', alt: 'Página de inicio de Attack Surface Studio sobre fondo oscuro, con el lema «See your attack surface as it actually connects».', width: 1568, height: 688 },
    media: [
      { src: '/projects/attack-surface-studio/01-landing.jpg', alt: 'Página de inicio de Attack Surface Studio sobre fondo oscuro, con el lema «See your attack surface as it actually connects».', width: 1568, height: 688 },
      { src: '/projects/attack-surface-studio/13-grafo-nodo.jpg', alt: 'Línea de tiempo de un proyecto con un nodo de dominio del grafo seleccionado y su panel de detalle abierto.', width: 1536, height: 674 },
      { src: '/projects/attack-surface-studio/16-settings-scope.jpg', alt: 'Ajustes del proyecto con la lista de objetivos dentro del alcance y las exclusiones.', width: 1536, height: 674 },
      { src: '/projects/attack-surface-studio/17-report-builder.jpg', alt: 'Constructor de reportes con el título del informe y nodos del grafo seleccionados.', width: 1536, height: 674 },
    ],
    problem:
      'Unifica la salida de varias herramientas de reconocimiento en un grafo y valida que el objetivo esté dentro del alcance antes de ejecutar nada.',
  },
  {
    slug: 'saas-pensiones',
    title: 'Pensiones — SaaS para restaurantes',
    summary:
      'SaaS de suscripciones de pensiones de comida para restaurantes: monolito modular NestJS, React, Prisma, PostgreSQL, JWT con rotación y chat en tiempo real.',
    category: 'web',
    status: 'completado',
    year: 2026,
    stack: ['nestjs', 'react', 'vite', 'tailwindcss', 'shadcn-ui', 'typescript', 'prisma', 'postgresql', 'socketio', 'playwright'],
    featured: 2,
    links: { repo: `${GITHUB}/SaaS-pensiones` },
    cover: { src: '/projects/saas-pensiones/01-home.jpg', alt: 'Página de inicio de Pensiones con el título «Tu pensión mensual, sin complicaciones» y una tarjeta con el menú del día.', width: 1568, height: 686 },
    media: [
      { src: '/projects/saas-pensiones/01-home.jpg', alt: 'Página de inicio de Pensiones con el título «Tu pensión mensual, sin complicaciones» y una tarjeta con el menú del día.', width: 1568, height: 686 },
      { src: '/projects/saas-pensiones/03-restaurant-detail.jpg', alt: 'Detalle de un restaurante con su menú del día y el precio de la pensión mensual.', width: 1568, height: 686 },
      { src: '/projects/saas-pensiones/05-client-dashboard.jpg', alt: 'Panel del cliente con su pensión activa, el progreso del pago y las acciones del día.', width: 1568, height: 686 },
      { src: '/projects/saas-pensiones/08-admin-dashboard.jpg', alt: 'Panel del restaurante con métricas de pensionarios, reservas e ingresos estimados.', width: 1568, height: 686 },
      { src: '/projects/saas-pensiones/10-admin-pensionarios.jpg', alt: 'Listado de pensionarios del restaurante con periodo, precio y estado de cada uno.', width: 1568, height: 686 },
    ],
    problem:
      'Gestiona las suscripciones de pensiones de comida de un restaurante: clientes, estados de pago y administración, con acceso por roles.',
    highlights: [
      '~96 % de cobertura en backend',
      'Refresh tokens JWT con rotación y revocación por familia',
      'Cookie httpOnly con protección CSRF (double-submit)',
    ],
  },
  {
    slug: 'threat-intelligence-dashboard',
    title: 'Threat Intelligence Dashboard',
    summary:
      'Consulta de IOC (IP, dominio, URL, hash) agregada desde AbuseIPDB y VirusTotal, con abstracción de proveedores y degradación controlada.',
    category: 'seguridad',
    status: 'en-desarrollo',
    year: 2026,
    stack: ['react', 'vite', 'tailwindcss', 'nodejs', 'typescript'],
    featured: 3,
    links: { repo: `${GITHUB}/Threat_Intelligence_Dashboard` },
    cover: { src: '/projects/threat-intelligence-dashboard/01-home-hero.jpg', alt: 'Página de inicio del Threat Intelligence Dashboard con el botón para iniciar una investigación.', width: 1568, height: 686 },
    media: [
      { src: '/projects/threat-intelligence-dashboard/01-home-hero.jpg', alt: 'Página de inicio del Threat Intelligence Dashboard con el botón para iniciar una investigación.', width: 1568, height: 686 },
      { src: '/projects/threat-intelligence-dashboard/03-search-error-state.jpg', alt: 'Estado de error cuando ningún proveedor de inteligencia responde, con un botón para reintentar.', width: 1568, height: 688 },
      { src: '/projects/threat-intelligence-dashboard/04-history.jpg', alt: 'Historial de búsquedas de indicadores con tipo, veredicto, puntuación y fecha.', width: 1568, height: 688 },
      { src: '/projects/threat-intelligence-dashboard/06-dashboard-light-mode.jpg', alt: 'Panel de búsqueda de indicadores en modo claro.', width: 1568, height: 686 },
    ],
    problem:
      'Reúne en una sola consulta la reputación de un indicador de compromiso desde varios proveedores y sigue funcionando si uno de ellos falla.',
  },
  {
    slug: 'health-his',
    title: 'Sistema de información hospitalaria',
    summary:
      'Sistema de información hospitalaria de escritorio, offline-first, con Tauri 2, React, Rust y SQLite cifrado (SQLCipher).',
    category: 'software',
    status: 'completado',
    year: 2026,
    stack: ['tauri', 'rust', 'react', 'typescript', 'sqlite'],
    featured: 4,
    links: { repo: `${GITHUB}/Health_HIS` },
    problem:
      'Gestiona pacientes, historial, camas, programación de quirófano e inventario sin conexión, con la base de datos cifrada en el equipo.',
  },
  {
    slug: 'electroshop-microservicios',
    title: 'ElectroShop — microservicios',
    summary:
      'E-commerce sobre microservicios: frontend React 19 con Vite, servicios NestJS tras un gateway, MySQL y Docker Compose. El pago es simulado.',
    category: 'web',
    status: 'completado',
    year: 2025,
    stack: ['react', 'vite', 'nestjs', 'typescript', 'typeorm', 'mysql', 'docker', 'github-actions'],
    featured: 5,
    links: { repo: `${GITHUB}/Ecomerce-microservicios` },
    cover: { src: '/projects/electroshop-microservicios/01-home.jpg', alt: 'Inicio de ElectroShop con el titular «Descubre la Tecnología del Futuro» y el botón de compra.', width: 1568, height: 686 },
    media: [
      { src: '/projects/electroshop-microservicios/01-home.jpg', alt: 'Inicio de ElectroShop con el titular «Descubre la Tecnología del Futuro» y el botón de compra.', width: 1568, height: 686 },
      { src: '/projects/electroshop-microservicios/03-catalog.jpg', alt: 'Catálogo de productos con imagen, precio y disponibilidad.', width: 1568, height: 686 },
      { src: '/projects/electroshop-microservicios/04-product-detail.jpg', alt: 'Detalle de un producto con imagen, precio, valoración y características.', width: 1568, height: 686 },
      { src: '/projects/electroshop-microservicios/08-checkout.jpg', alt: 'Pantalla de finalizar compra con los datos de envío y el resumen del pedido.', width: 1568, height: 686 },
      { src: '/projects/electroshop-microservicios/11-order-history.jpg', alt: 'Historial de pedidos con el estado y el total de cada uno.', width: 1568, height: 688 },
    ],
    problem:
      'Divide una tienda en línea en servicios independientes (autenticación, usuarios, productos, carrito, pedidos, inventario y pago simulado) detrás de un gateway.',
  },
  {
    slug: 'rutex-transportes',
    title: 'Rutex — transporte',
    summary: 'Reserva de asientos y envío de encomiendas con seguimiento público: backend Django 5 y frontend React 19.',
    category: 'web',
    status: 'completado',
    year: 2026,
    stack: ['django', 'python', 'react', 'typescript', 'github-actions'],
    links: { repo: `${GITHUB}/TransportApp` },
    cover: { src: '/projects/rutex-transportes/01-landing.jpg', alt: 'Página de inicio de RUTEX Transportes con el buscador de viajes y la ilustración de un autobús.', width: 1440, height: 900 },
    media: [
      { src: '/projects/rutex-transportes/01-landing.jpg', alt: 'Página de inicio de RUTEX Transportes con el buscador de viajes y la ilustración de un autobús.', width: 1440, height: 900 },
      { src: '/projects/rutex-transportes/02-busqueda-viajes.jpg', alt: 'Resultados de búsqueda de viajes de Lima a Arequipa con horarios y precios.', width: 1440, height: 900 },
      { src: '/projects/rutex-transportes/03-mapa-asientos.jpg', alt: 'Selección de asiento en el mapa del bus junto al resumen del viaje.', width: 1440, height: 900 },
      { src: '/projects/rutex-transportes/05-rastreo.jpg', alt: 'Rastreo público de una encomienda con su línea de estados.', width: 1440, height: 900 },
    ],
    problem: 'Permite reservar asientos de bus y registrar encomiendas con un código de rastreo consultable públicamente.',
  },
  {
    slug: 'cinemax',
    title: 'Cinemax',
    summary:
      'Reserva de entradas de cine con selección de asientos, snacks, pago y panel de administración: monorepo NestJS y React.',
    category: 'web',
    status: 'completado',
    year: 2026,
    stack: ['nestjs', 'react', 'typescript', 'zustand', 'tanstack-query'],
    links: { repo: `${GITHUB}/Cinema` },
    cover: { src: '/projects/cinemax/07-seleccion-asientos.jpg', alt: 'Selección de asientos de una sala de cine con el resumen de la reserva.', width: 1568, height: 686 },
    media: [
      { src: '/projects/cinemax/07-seleccion-asientos.jpg', alt: 'Selección de asientos de una sala de cine con el resumen de la reserva.', width: 1568, height: 686 },
      { src: '/projects/cinemax/09-seleccion-snacks.jpg', alt: 'Selección de snacks y combos antes del pago.', width: 1568, height: 686 },
      { src: '/projects/cinemax/11-reserva-confirmada.jpg', alt: 'Pantalla de reserva confirmada con el código de la entrada.', width: 1568, height: 686 },
      { src: '/projects/cinemax/13-admin-dashboard.jpg', alt: 'Panel de administración con métricas y reservas recientes.', width: 1568, height: 686 },
    ],
    problem: 'Cubre el flujo de compra de entradas de cine, desde elegir asiento hasta pagar, más un panel de administración.',
  },
  {
    slug: 'academy-app',
    title: 'AcademyApp',
    summary:
      'SaaS académico multi-tenant y multi-rol: Spring Boot 3 (Java 21), Spring Security con JWT y React; documenta su auditoría de seguridad.',
    category: 'web',
    status: 'en-desarrollo',
    year: 2026,
    stack: ['java', 'spring-boot', 'react', 'postgresql', 'redis', 'docker'],
    links: { repo: `${GITHUB}/AcademyApp` },
    cover: { src: '/projects/academy-app/01-landing.jpg', alt: 'Página de inicio de AcademyApp con el titular «Gestiona tu institución educativa con datos en tiempo real».', width: 1600, height: 1000 },
    media: [
      { src: '/projects/academy-app/01-landing.jpg', alt: 'Página de inicio de AcademyApp con el titular «Gestiona tu institución educativa con datos en tiempo real».', width: 1600, height: 1000 },
      { src: '/projects/academy-app/10-director-reportes.jpg', alt: 'Panel del director con reportes: alumnos en riesgo y rendimiento por curso.', width: 1600, height: 1000 },
      { src: '/projects/academy-app/11-director-docentes.jpg', alt: 'Lista de docentes de la institución.', width: 1600, height: 1000 },
      { src: '/projects/academy-app/13-director-cursos.jpg', alt: 'Lista de cursos de la institución.', width: 1600, height: 1000 },
    ],
    problem:
      'Proyecto personal para practicar arquitectura hexagonal, multi-tenancy y endurecimiento de seguridad; las limitaciones conocidas están documentadas en el README.',
  },
  {
    slug: 'erd-studio',
    title: 'ERD Studio',
    summary:
      'Editor de diagramas ER en notación Chen con transformación automática al modelo lógico, autoguardado, deshacer/rehacer y regresión visual.',
    category: 'herramientas',
    status: 'completado',
    year: 2026,
    stack: ['typescript', 'playwright'],
    links: { repo: `${GITHUB}/Conceptual-logic-diagram-generator` },
    cover: { src: '/projects/erd-studio/04-editor-dominio-hotel.jpg', alt: 'Editor conceptual en notación Chen con las entidades Hotel, Habitación, Departamento y Empleado y sus relaciones.', width: 1600, height: 1000 },
    media: [
      { src: '/projects/erd-studio/04-editor-dominio-hotel.jpg', alt: 'Editor conceptual en notación Chen con las entidades Hotel, Habitación, Departamento y Empleado y sus relaciones.', width: 1600, height: 1000 },
      { src: '/projects/erd-studio/07-editor-especializacion-isa.jpg', alt: 'Especialización ISA: la entidad Vehículo con los subtipos Auto y Moto.', width: 1600, height: 1000 },
      { src: '/projects/erd-studio/09-editor-modelo-logico.jpg', alt: 'Modelo lógico derivado automáticamente, con tablas y columnas por completar.', width: 1280, height: 800 },
      { src: '/projects/erd-studio/03-editor-conceptual-vista-general.jpg', alt: 'Vista general de un diagrama conceptual grande con muchas entidades, atributos y relaciones.', width: 1280, height: 800 },
    ],
    problem: 'Permite dibujar un modelo conceptual y obtener su modelo lógico de forma automática.',
  },
  {
    slug: 'atelier-construct',
    title: 'Atelier Construct',
    summary:
      'Landing de una constructora guiada por scroll: Next.js, Tailwind v4, GSAP y una secuencia de 240 fotogramas en canvas, con soporte de movimiento reducido.',
    category: 'web',
    status: 'completado',
    year: 2026,
    stack: ['nextjs', 'react', 'tailwindcss', 'gsap', 'typescript'],
    links: { repo: `${GITHUB}/Visual_Porject-Construccion` },
    problem: 'Ejercicio visual de landing guiada por scroll con secuencia de fotogramas en canvas que respeta prefers-reduced-motion.',
  },
  {
    slug: 'personal-tasks',
    title: 'Personal Tasks',
    summary:
      'Gestor personal de tareas diarias, de mediano y largo plazo con mapa de calor de rachas: Django REST Framework y React.',
    category: 'web',
    status: 'completado',
    year: 2026,
    stack: ['django', 'python', 'react', 'vite', 'javascript'],
    links: { repo: `${GITHUB}/Personal_tasks_web` },
    problem: 'Herramienta personal para seguir metas a distintos plazos y visualizar la constancia con un mapa de calor de rachas.',
  },
  {
    slug: 'p2p-exchange-simulado',
    title: 'Exchange P2P (dinero simulado)',
    summary:
      'Exchange P2P con dinero simulado: ledger de partida doble, matching parcial de órdenes y pruebas de concurrencia.',
    category: 'software',
    status: 'en-desarrollo',
    year: 2026,
    stack: ['typescript'],
    links: { repo: `${GITHUB}/Dota_2_gambling` },
    problem:
      'Ejercicio de ingeniería de sistemas financieros: contabilidad de partida doble, emparejamiento parcial de órdenes y concurrencia, sin dinero real.',
  },
  {
    slug: 'security-notes',
    title: 'Write-ups y notas de seguridad',
    summary:
      'Write-ups de laboratorios de práctica (DockerLabs, TheHackLabs) y notas de Nmap, Burp Suite, ffuf, Gobuster y SQLmap.',
    category: 'seguridad',
    status: 'activo',
    year: 2026,
    stack: ['nmap', 'burp-suite', 'ffuf', 'gobuster', 'sqlmap', 'bash'],
    links: { repo: `${GITHUB}/WritteUps` },
    problem: 'Registro de práctica en laboratorios de seguridad ofensiva, con guías rápidas de las herramientas usadas.',
  },
]
