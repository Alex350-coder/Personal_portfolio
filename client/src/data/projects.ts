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
