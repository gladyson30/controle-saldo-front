const formatadorMoeda = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export function formatarMoeda(valor: number): string {
  return formatadorMoeda.format(valor);
}

export function formatarPercentual(valor: number): string {
  return `${valor.toFixed(2).replace('.', ',')}%`;
}