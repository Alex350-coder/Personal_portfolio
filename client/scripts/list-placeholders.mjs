// Lists every `[[PLACEHOLDER: …]]` in client/src (tests excluded): the source for the registry in
// docs/ContentStrategy.md. Exit code is always 0; the Phase 6 gate (check-placeholders.mjs) fails builds.
import { readdirSync, readFileSync } from 'node:fs'
import { join, relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = fileURLToPath(new URL('../src', import.meta.url))
const PATTERN = /\[\[PLACEHOLDER: ([^\]]+)\]\]/g
const SKIP = (name) => /\.test\.tsx?$/.test(name) || name === 'test' || name === 'nebula-mock.tsx'

function* walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (SKIP(entry.name)) continue
    const path = join(dir, entry.name)
    if (entry.isDirectory()) yield* walk(path)
    else if (/\.(ts|tsx)$/.test(entry.name)) yield path
  }
}

const found = []
for (const file of walk(ROOT)) {
  readFileSync(file, 'utf8')
    .split('\n')
    .forEach((line, index) => {
      // Comments and the type definition only describe the convention.
      if (/^\s*(\*|\/\/|\/\*)/.test(line) || line.includes('${')) return
      for (const match of line.matchAll(PATTERN)) {
        found.push({ file: relative(ROOT, file).split(sep).join('/'), line: index + 1, what: match[1] })
      }
    })
}

for (const item of found) console.log(`src/${item.file}:${item.line}\t${item.what}`)
console.log(`\n${found.length} placeholder(s)`)
