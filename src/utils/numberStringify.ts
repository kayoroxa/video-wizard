export function numberStringify(views: number): string {
  const numero = views
  const numeroFormatado = numero
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  return numeroFormatado
}
