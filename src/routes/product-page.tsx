import { columns } from "components/product-offers-table/columns";
import { DataTable } from "components/ui/DataTable";
import { Barcode } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBarcodesByProductId, getProductById, getProductRankingView } from "repository/Supabase";
import { RankingView } from "types/entities";
import { Tables } from "types/supabase";

export const ProductPage: React.FC = () => {
   const { id } = useParams();
   const [product, setProduct] = useState<Tables<"products">>();
   const [barcodes, setBarcodes] = useState<Tables<"barcodes">[]>();
   const [offers, setOffers] = useState<RankingView[]>([]);

   async function fetch(id: string) {
      getProductById(id).then((res) => setProduct(res));
      const barcodesRes = await getBarcodesByProductId(id);
      setBarcodes(barcodesRes);
      getProductRankingView(id).then((res) => setOffers(res));
   }

   useEffect(() => {
      if (!id) return;
      fetch(id);
   }, [id]);

   return (
      <div className="flex flex-col gap-8 w-full pt-4">
         <div className="flex flex-wrap gap-4 px-4">
            <img
               width={256}
               height={256}
               alt={product?.name}
               className={`${
                  product?.image_url ? "p-2" : ""
               } rounded-md border aspect-square object-contain max-w-[256px]`}
               src={product?.image_url ?? "https://placehold.co/400x400/f4f4f5/aaaaaa?text=x"}
            />
            <div>
               <div>
                  <h1 className="text-2xl font-bold mb-2">{product?.name}</h1>
               </div>
               <div className="">
                  <div className="flex gap-2">
                     {barcodes?.map((barcode) => (
                        <div key={barcode.barcode} className="p-2 bg-zinc-100 rounded-md">
                           <p className="text-sm font-mono flex gap-1 items-center">
                              <Barcode className="h-4" />
                              {barcode.barcode}
                           </p>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>

         <div className="whitespace-nowrap">
            <h2 className="px-4 text-lg font-bold mb-2">Offers</h2>
            <DataTable data={offers ?? []} columns={columns} />
         </div>
      </div>
   );
};
