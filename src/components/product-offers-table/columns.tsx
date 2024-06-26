import { ColumnDef } from "@tanstack/react-table";
import { RankingView } from "types/entities";
import { formatCurrency } from "utility/currency";
import { getRankingCircleFromNumber } from "utility/ranking";
import { getTimeDistance } from "utility/timeDistance";

export const columns: ColumnDef<RankingView>[] = [
   {
      header: "Rank",
      cell: (props) => {
         const row = props.row.original;
         return row.offer_rank ? getRankingCircleFromNumber(row.offer_rank) : null;
      },
   },
   {
      header: "Price",
      accessorFn: (row) => (row.offer_total_price ? formatCurrency(row.offer_total_price) : null),
   },
   {
      header: "Discount",
      cell: (props) => {
         const row = props.row.original;
         if (row.offer_rank === 1) return;
         if (!row.best_offer_distance_ratio) return null;
         const classNames = row.best_offer_distance_ratio < 0 ? "text-green-500" : "text-red-600";
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
      accessorKey: "store_name",
      header: "Store",
      cell: (props) => {
         const row = props.row.original;
         return row.store_is_my_store ? (
            <span className="font-semibold">{props.row.original.store_name}</span>
         ) : (
            row.store_name
         );
      },
   },
   {
      accessorKey: "marketplace_name",
      header: "Marketplace",
   },
   {
      accessorKey: "offer_barcode",
      header: "Barcode",
   },
   {
      accessorKey: "updated_at",
      header: "Last Update",
      accessorFn: (row) =>
         row.offer_created_at ? getTimeDistance(new Date(row.offer_created_at)) : null,
   },
];
