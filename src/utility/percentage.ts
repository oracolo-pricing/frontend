export function formatAsPercentage(num: number | null | undefined) {
   if (num === null || num === undefined) {
      return "-";
   }
   
   return new Intl.NumberFormat("default", {
      style: "percent",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
   }).format(num);
}
