export function formatCurrency(value: number | bigint) {
   return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
   }).format(value);
}
