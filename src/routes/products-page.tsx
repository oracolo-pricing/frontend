import { columns } from "components/products-table/columns";
import { AddProduct } from "components/ui/AddProduct";
import { DataTable } from "components/ui/DataTable";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts, toggleProductActive } from "repository/Supabase";
import { Tables } from "types/supabase";

export const ProductsPage: React.FC = () => {
   const [products, setProducts] = useState<Tables<"products">[]>([]);
   const navigate = useNavigate();

   function fetch() {
      getProducts().then(setProducts);
   }

   async function toggleActive(id: string) {
      await toggleProductActive(id, !products.find((p) => p.id === id)?.is_active);
      fetch();
   }

   useEffect(() => {
      fetch();
      const interval = setInterval(fetch, 60000);
      return () => clearInterval(interval);
   }, []);

   return (
      <>
         <div className="w-full">
            <div className="flex border-b p-2 justify-end">
               <AddProduct onSubmitted={fetch} />
            </div>
            <DataTable
               onRowClick={(row) => navigate(`/products/${row.original.id}`)}
               data={products}
               columns={columns}
               meta={{
                  toggleActive,
               }}
            />
         </div>
      </>
   );
};
