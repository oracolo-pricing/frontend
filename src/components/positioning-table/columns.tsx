import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ColumnDef } from "@tanstack/react-table";
import { RankingView } from "types/entities";
import { formatCurrency } from "utility/currency";
import { getRankingCircleFromNumber } from "utility/ranking";
import { getTimeDistance } from "utility/timeDistance";

export const EllipsedText = ({ text, length = 30 }: { text: string | null; length?: number }) => {
   if (!text) return null;
   if (text.length <= length) return <>{text}</>;
   return (
      <TooltipProvider>
         <Tooltip>
            <TooltipTrigger>{text.slice(0, length)}…</TooltipTrigger>
            <TooltipContent>{text}</TooltipContent>
         </Tooltip>
      </TooltipProvider>
   );
};

export const columns: ColumnDef<RankingView>[] = [
   {
      id: "offer_rank",
      header: "Rank",
      cell: (props) => {
         const row = props.row.original;
         return row.offer_rank ? getRankingCircleFromNumber(row.offer_rank) : null;
      },
   },
   {
      id: "product_name",
      accessorKey: "product_name",
      header: "Product",
      cell: (props) => <EllipsedText text={props.row.original.product_name} />,
   },
   {
      id: "offer_total_price",
      header: "Price",
      accessorFn: (row) => (row.offer_total_price ? formatCurrency(row.offer_total_price) : null),
   },
   {
      id: "best_offer_distance_ratio",
      header: "Discount",
      cell: (props) => {
         const row = props.row.original;
         if (!row.best_offer_distance_ratio) return null;
         const classNames = row.best_offer_distance_ratio < 0 ? "text-green-600" : "text-red-600";
         const sign = row.best_offer_distance_ratio < 0 ? "" : "+";
         return (
            <div className={classNames}>
               {sign}
               {(row.best_offer_distance_ratio * 100).toFixed(1)}%
            </div>
         );
      },
   },
   {
      id: "marketplace_name",
      accessorKey: "marketplace_name",
      header: "Marketplace",
   },
   {
      id: "offer_barcode",
      accessorKey: "offer_barcode",
      header: "Barcode",
   },
   {
      id: "offer_created_at",
      accessorKey: "updated_at",
      header: "Last Update",
      accessorFn: (row) =>
         row.offer_created_at ? getTimeDistance(new Date(row.offer_created_at)) : null,
   },
];
