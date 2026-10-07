// Dev-time image pipeline (Phase 4, P4-T08). Not part of the production build.
//
//   npm run images -- <project-slug> <source-dir>
//
// Reads PNG/JPG/WebP screenshots from <source-dir> and writes to public/projects/<slug>/:
//   <name>.jpg                 fallback <img src>, at most MAX_WIDTH wide
//   <name>-<w>.avif / .webp    derivatives listed by src/lib/media.ts (keep WIDTHS identical)
// Fails (exit 1) when an output exceeds MAX_BYTES, and prints the `media` entries to paste into
// src/data/projects.ts. Alt text is never guessed: it prints a [[PLACEHOLDER: alt text]] marker that
// the schema and the Phase 6 placeholder gate reject until a human writes the real description.
import { mkdirSync, readdirSync, statSync } from 'node:fs'
import { basename, extname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import sharp from 'sharp'

export const WIDTHS = [480, 960, 1600]
export const MAX_BYTES = 200 * 1024
const KEBAB_CASE = /^[a-z0-9]+(-[a-z0-9]+)*$/
const INPUT = /\.(png|jpe?g|webp)$/i

/** Mirrors `widthsFor` in src/lib/media.ts. */
export function widthsFor(intrinsic) {
  const top = Math.min(intrinsic, WIDTHS[WIDTHS.length - 1])
  return [...WIDTHS.filter((width) => width < top), top]
}

function outputName(file) {
  return basename(file, extname(file)).toLowerCase().replace(/[^a-z0-9]+/g, '-')
}

async function convert(file, outDir) {
  const name = outputName(file)
  const meta = await sharp(file).metadata()
  const width = Math.min(meta.width, WIDTHS[WIDTHS.length - 1])
  const height = Math.round((meta.height * width) / meta.width)
  const outputs = []

  const fallback = join(outDir, `${name}.jpg`)
  outputs.push(await sharp(file).resize({ width }).jpeg({ quality: 82, mozjpeg: true }).toFile(fallback))

  for (const target of widthsFor(width)) {
    const resized = () => sharp(file).resize({ width: target })
    outputs.push(await resized().avif({ quality: 55 }).toFile(join(outDir, `${name}-${target}.avif`)))
    outputs.push(await resized().webp({ quality: 78 }).toFile(join(outDir, `${name}-${target}.webp`)))
  }

  const oversized = outputs.filter((out) => out.size > MAX_BYTES)
  return { name, width, height, oversized: oversized.length, largest: Math.max(...outputs.map((out) => out.size)) }
}

async function main() {
  const [slug, source] = process.argv.slice(2)
  if (!slug || !source || !KEBAB_CASE.test(slug)) {
    console.error('Usage: npm run images -- <kebab-case-slug> <source-dir>')
    process.exit(2)
  }

  const sourceDir = resolve(source)
  const outDir = fileURLToPath(new URL(`../public/projects/${slug}/`, import.meta.url))
  mkdirSync(outDir, { recursive: true })

  const files = readdirSync(sourceDir)
    .filter((file) => INPUT.test(file) && statSync(join(sourceDir, file)).isFile())
    .toSorted()
  if (files.length === 0) {
    console.error(`No PNG/JPG/WebP files in ${sourceDir}`)
    process.exit(2)
  }

  const names = files.map((file) => outputName(file))
  const clash = names.find((name, index) => names.indexOf(name) !== index)
  if (clash) {
    console.error(`Two source files map to the same output name "${clash}"; rename one.`)
    process.exit(2)
  }

  let failed = false
  for (const file of files) {
    const result = await convert(join(sourceDir, file), outDir)
    const note = result.oversized ? `  !! ${result.oversized} output(s) above ${MAX_BYTES / 1024} KB` : ''
    console.log(`{ src: '/projects/${slug}/${result.name}.jpg', alt: '[[PLACEHOLDER: alt text]]', width: ${result.width}, height: ${result.height} },${note}`)
    if (result.oversized) failed = true
  }
  if (failed) {
    console.error('Some outputs exceed the image budget (docs/Performance.md); lower quality or width.')
    process.exit(1)
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await main()
