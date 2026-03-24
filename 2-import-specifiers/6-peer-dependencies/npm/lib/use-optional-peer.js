export async function checkPositive(n) {
  try {
    const { default: isPositive } = await import("is-positive");
    return `is-positive says: ${isPositive(n)}`;
  } catch {
    return `is-positive not available, falling back: ${n > 0}`;
  }
}
