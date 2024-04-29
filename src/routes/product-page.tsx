import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { columns } from "components/product-offers-table/columns";
import { DataTable } from "components/ui/DataTable";
import { Barcode } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
   getBarcodesAndShortcutsByProductId,
   getProductById,
   getProductRankingView,
} from "repository/Supabase";
import { BarcodeWithShortcut, RankingView } from "types/entities";
import { Tables } from "types/supabase";

export const ProductImage: React.FC<{
   url?: string | null;
   alt?: string | null;
}> = ({ url, alt }) => {
   return (
      <>
         <DropdownMenu>
            <DropdownMenuTrigger>
               <img
                  width={256}
                  height={256}
                  alt={alt ?? "Product image"}
                  className={`${
                     url ? "p-2" : ""
                  } rounded-md border aspect-square object-contain max-w-[256px]`}
                  src={url ?? "https://placehold.co/400x400/f4f4f5/aaaaaa?text=x"}
               />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
               {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
               {/* <DropdownMenuSeparator /> */}
               <DropdownMenuItem>Change URL</DropdownMenuItem>
            </DropdownMenuContent>
         </DropdownMenu>
      </>
   );
};

export const ProductPage: React.FC = () => {
   const { id } = useParams();
   const [product, setProduct] = useState<Tables<"products">>();
   const [barcodes, setBarcodes] = useState<BarcodeWithShortcut[]>();
   const [offers, setOffers] = useState<RankingView[]>([]);

   async function fetch() {
      if (!id) return;
      getProductById(id).then((res) => setProduct(res));
      const barcodesRes = await getBarcodesAndShortcutsByProductId(id);
      setBarcodes(barcodesRes);
      getProductRankingView(id).then((res) => setOffers(res));
   }

   useEffect(() => {
      fetch();
      const interval = setInterval(fetch, 60000);
      return () => clearInterval(interval);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <div className="flex flex-col gap-8 w-full pt-4">
         <div className="flex flex-wrap gap-4 px-4">
            <ProductImage url={product?.image_url} alt={product?.name} />
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
