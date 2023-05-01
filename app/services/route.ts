export function createRoute(...url: Array<string | undefined>) {
  return [...url].filter(Boolean).join("");
}
