import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { columns } from "components/positioning-table/columns";
import { DataTable } from "components/ui/DataTable";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
   getActiveProductCount,
   getMyStoreCounters,
   getMyStoreRankingView,
} from "repository/Supabase";
import { CounterView, RankingView } from "types/entities";
import { useMediaQuery } from "usehooks-ts";

export const CounterCard: React.FC<{ title: string; value: string; subValue?: string }> = ({
   title,
   value,
   subValue,
}) => {
   return (
      <Card>
         <CardHeader className="p-4">
            <CardTitle className="text-base font-medium">{title}</CardTitle>
         </CardHeader>
         <CardContent className="p-4 text-2xl font-bold text-right">
            {value}
            {subValue && <CardDescription className="font-normal">{subValue}</CardDescription>}
         </CardContent>
      </Card>
   );
};

export const PositioningPage: React.FC = () => {
   const [rankings, setRankings] = useState<RankingView[]>([]);
   const [counters, setCounters] = useState<CounterView | null>();
   const [activeProductCount, setActiveProductCount] = useState<number | null>(null);
   const navigate = useNavigate();
   const isMobile = useMediaQuery("(max-width: 768px)");

   const [sortBy, setSortBy] = useState<keyof RankingView>("offer_rank");
   const [ascending, setAscending] = useState<boolean>(true);

   const fetch = async () => {
      getMyStoreRankingView({ order_by: sortBy, ascending }).then((data) => setRankings(data));
      getMyStoreCounters().then((data) => setCounters(data));
      getActiveProductCount().then((data) => setActiveProductCount(data));
   };

   const handleHeaderClick = (column: string) => {
      if (sortBy === column) {
         setAscending(!ascending);
      } else {
         setSortBy(column as keyof RankingView);
         setAscending(true);
      }
   };

   useEffect(() => {
      fetch();
      const interval = setInterval(fetch, 60000);
      return () => clearInterval(interval);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [sortBy, ascending]);

   return (
      <div className="overflow-auto w-full h-full">
         <div className={`p-4 grid gap-4 ${isMobile ? "grid-cols-2" : "grid-cols-3"}`}>
            <CounterCard
               title="Online Products"
               value={`${counters?.online_offer_count ?? "-"}/${activeProductCount ?? "-"}`}
            />
            <CounterCard
               title="Winning Offers"
               value={
                  counters?.winning_offer_count && counters?.online_offer_count
                     ? `${(
                          (counters.winning_offer_count / counters.online_offer_count) *
                          100
                       ).toFixed(0)}%`
                     : "–"
               }
            />
            <CounterCard
               title="Avg. Discount"
               value={
                  counters?.best_offer_distance_ratio_average
                     ? `${(counters.best_offer_distance_ratio_average * 100).toFixed(2)}%`
                     : "–"
               }
            />
         </div>

         {/* <div className="border-y min-h-4 p-4">Filters</div> */}

         <div className="whitespace-nowrap">
            <DataTable
               onRowClick={(row) => navigate(`/products/${row.original.product_id}`)}
               onHeaderClick={handleHeaderClick}
               columns={columns}
               data={rankings}
            />
         </div>
      </div>
   );
};
