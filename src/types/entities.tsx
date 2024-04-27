import { Tables } from "types/supabase";

export type OfferWithStoreMarketplace = Tables<"offers"> & {
   store: Tables<"stores">;
   marketplace: Tables<"marketplaces">;
};

export type RankingView = Tables<"rankings">;
export type CounterView = Tables<"counters">;

export type Task = Tables<"tasks">;
export type NewProductForm = {
   name: string;
   barcode: string;
   shorcut: string;
};

/**
export type ValueWithAttribute = Tables<"attribute_value"> & {
   attribute: Tables<"attribute">;
};

export type OfferWithSupplier = Tables<"offer"> & {
   supplier: Tables<"supplier">;
   price?: Tables<"price">[];
};

export type DetailedVariant = Tables<"variant"> & {
   offer: OfferWithSupplier[];
   value: ValueWithAttribute[];
};

export type ProductWithVariants = Tables<"product"> & {
   taxonomy: Tables<"taxonomy">;
   variant: DetailedVariant[];
};

export type ProductWithVariantsPreview = {
   count: number;
   id: string;
   title?: string;
   taxonomy: {
      id: string;
      path: string;
   };
   variant: {
      variant_id: string;
      variant_title?: string;
      variant_images: string[];
      variant_ean: string;
      offer: {
         offer_id: number;
         offer_price: number;
         offer_quantity: number;
         supplier: {
            supplier_id: string;
            supplier_name: string;
         };
         price: {
            price_id: string;
            price_value: number;
         }[];
      }[];
   }[];
};
 */
