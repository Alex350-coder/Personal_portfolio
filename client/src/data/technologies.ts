import type { Placeholder } from '@/lib/placeholder'

/**
 * Technologies shown in `#tecnologias`. Source: docs/ProfileData.md §3 restricted to what the repos
 * evidence (badge-only items such as C#, PowerShell, MongoDB, Pandas are left out until the owner
 * confirms them; ContentStrategy.md item #3). No levels, no percentages.
 * `id` is stable: projects reference technologies by `TechId` (Phase 3).
 */

export interface TechGroup {
  id: 'lenguajes' | 'frontend' | 'backend' | 'seguridad' | 'ia'
  label: string
}

export interface Technology {
  id: string
  label: string | Placeholder
  group: TechGroup['id']
  /** Optional https link to the official site. */
  url?: string
}

export const techGroups = [
  { id: 'lenguajes', label: 'Lenguajes' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend y herramientas' },
  { id: 'seguridad', label: 'Seguridad' },
  { id: 'ia', label: 'IA' },
] as const satisfies readonly TechGroup[]

export const technologies = [
  { id: 'typescript', label: 'TypeScript', group: 'lenguajes' },
  { id: 'javascript', label: 'JavaScript', group: 'lenguajes' },
  { id: 'java', label: 'Java', group: 'lenguajes' },
  { id: 'python', label: 'Python', group: 'lenguajes' },
  { id: 'rust', label: 'Rust', group: 'lenguajes' },
  { id: 'bash', label: 'Bash', group: 'lenguajes' },

  { id: 'react', label: 'React', group: 'frontend' },
  { id: 'nextjs', label: 'Next.js', group: 'frontend' },
  { id: 'vite', label: 'Vite', group: 'frontend' },
  { id: 'tailwindcss', label: 'Tailwind CSS', group: 'frontend' },
  { id: 'shadcn-ui', label: 'shadcn/ui', group: 'frontend' },
  { id: 'tanstack-query', label: 'TanStack Query', group: 'frontend' },
  { id: 'zustand', label: 'Zustand', group: 'frontend' },
  { id: 'react-hook-form', label: 'React Hook Form', group: 'frontend' },
  { id: 'zod', label: 'Zod', group: 'frontend' },
  { id: 'react-flow', label: 'React Flow', group: 'frontend' },
  { id: 'gsap', label: 'GSAP ScrollTrigger', group: 'frontend' },

  { id: 'nodejs', label: 'Node.js', group: 'backend' },
  { id: 'nestjs', label: 'NestJS', group: 'backend' },
  { id: 'spring-boot', label: 'Spring Boot', group: 'backend' },
  { id: 'django', label: 'Django y DRF', group: 'backend' },
  { id: 'tauri', label: 'Tauri 2', group: 'backend' },
  { id: 'socketio', label: 'Socket.IO', group: 'backend' },
  { id: 'bullmq', label: 'BullMQ', group: 'backend' },
  { id: 'prisma', label: 'Prisma', group: 'backend' },
  { id: 'drizzle', label: 'Drizzle ORM', group: 'backend' },
  { id: 'typeorm', label: 'TypeORM', group: 'backend' },
  { id: 'postgresql', label: 'PostgreSQL', group: 'backend' },
  { id: 'mysql', label: 'MySQL', group: 'backend' },
  { id: 'sqlite', label: 'SQLite y SQLCipher', group: 'backend' },
  { id: 'redis', label: 'Redis', group: 'backend' },
  { id: 'docker', label: 'Docker y Docker Compose', group: 'backend' },
  { id: 'github-actions', label: 'GitHub Actions', group: 'backend' },
  { id: 'vitest', label: 'Vitest', group: 'backend' },
  { id: 'playwright', label: 'Playwright', group: 'backend' },
  { id: 'supertest', label: 'Supertest', group: 'backend' },

  { id: 'nmap', label: 'Nmap', group: 'seguridad' },
  { id: 'burp-suite', label: 'Burp Suite', group: 'seguridad' },
  { id: 'ffuf', label: 'ffuf', group: 'seguridad' },
  { id: 'gobuster', label: 'Gobuster', group: 'seguridad' },
  { id: 'sqlmap', label: 'SQLmap', group: 'seguridad' },
  { id: 'nuclei', label: 'Nuclei', group: 'seguridad' },

  // Health_HIS README discloses a Claude-based documentation framework (ProfileData.md §2.5).
  { id: 'claude', label: 'Claude', group: 'ia' },
  { id: 'ia-otras', label: '[[PLACEHOLDER: other AI tools the owner wants to list]]', group: 'ia' },
] as const satisfies readonly Technology[]

export type TechId = (typeof technologies)[number]['id']
