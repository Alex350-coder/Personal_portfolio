/** Missing content is written as `[[PLACEHOLDER: what is needed]]` (docs/ContentStrategy.md). */
export type Placeholder = `[[PLACEHOLDER: ${string}]]`

const PLACEHOLDER_PATTERN = /^\[\[PLACEHOLDER: .+\]\]$/

export function isPlaceholder(value: string): value is Placeholder {
  return PLACEHOLDER_PATTERN.test(value)
}
