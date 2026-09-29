/**
 * Minimal className joiner. Filters out falsy values so callers can write
 * `cx(styles.root, isActive && styles.active, className)` without noise.
 */
export function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
