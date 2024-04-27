import { createClient } from "@supabase/supabase-js";
import { NewProductForm, OfferWithStoreMarketplace } from "types/entities";
import { Database } from "types/supabase";

export const supabase = createClient<Database>(
   process.env.REACT_APP_SUPABASE_URL as string,
   process.env.REACT_APP_SUPABASE_ANON_KEY as string
);

export const getActiveProductCount = async () => {
   const { count, error } = await supabase
      .from("products")
      .select("*", { count: "exact", head: true })
      .eq("is_active", true);
   if (error) throw new Error(error.message);
   return count;
};

export const getStoreCounters = async (myStoreOnly: boolean = false) => {
   const { data, error } = await supabase
      .from("counters")
      .select("*")
      .eq("store_is_my_store", myStoreOnly)
      .single();
   // if (error) return null;
   return data;
};

export const getMyStoreCounters = async () => {
   return getStoreCounters(true);
};

export const getStoreRankingView = async (
   myStoreOnly: boolean = false,
   barcode: string | null = null,
   order_by = "offer_rank",
   ascending = true
) => {
   let query = supabase.from("rankings").select("*");
   if (myStoreOnly) query = query.eq("store_is_my_store", true);
   if (barcode) query = query.eq("barcode", barcode);
   query.order(order_by, { ascending });
   const { data, error } = await query;
   if (error) throw new Error(error.message);
   return data;
};

export const getProductRankingView = async (
   productId: string,
   order_by = "offer_rank",
   ascending = true
) => {
   const { data, error } = await supabase
      .from("rankings")
      .select("*")
      .eq("product_id", productId)
      .order(order_by, { ascending });
   if (error) throw new Error(error.message);
   return data;
};

export const getMyStoreRankingView = async () => {
   return getStoreRankingView(true);
};

export const getMyStore = async () => {
   const { data, error } = await supabase
      .from("stores")
      .select("*")
      .eq("is_my_store", true)
      .single();
   if (error) throw new Error(error.message);
   return data;
};

export const addNewProduct = async (productForm: NewProductForm) => {
   const { data: productsData } = await supabase
      .from("products")
      .insert({
         name: productForm.name,
      })
      .select();

   await supabase.from("barcodes").insert({
      barcode: productForm.barcode,
      product_id: productsData?.[0]?.id,
   });

   await supabase.from("shortcuts").insert({
      barcode: productForm.barcode,
      url: productForm.shorcut,
      marketplace_id: "c46a2f53-b4ac-4003-ae0a-ee0e3f4985e8", // TODO: fix hardcoded value
   });
};

export const getTasks = async (page = 1, pageSize = 25) => {
   const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("started_at", { ascending: false })
      .range((page - 1) * pageSize, page * pageSize - 1);

   if (error) throw new Error(error.message);
   return data;
};

export const getProductById = async (id: string) => {
   const { data, error } = await supabase.from("products").select("*").eq("id", id).single();

   if (error) throw new Error(error.message);
   return data;
};

export const getBarcodesByProductId = async (id: string) => {
   const { data, error } = await supabase.from("barcodes").select("*").eq("product_id", id);
   if (error) throw new Error(error.message);
   return data;
};

export const getOffersWithStoreMarketplaceByBarcodes = async (barcodes: string[]) => {
   const { data, error } = await supabase
      .from("offers")
      .select("*, store:store_id(*), marketplace:marketplace_id(*)")
      .in("barcode", barcodes)
      .order("price")
      .returns<OfferWithStoreMarketplace[]>();
   if (error) throw new Error(error.message);
   return data;
};

export const getProducts = async (
   page = 1,
   pageSize = 25,
   order_by = "created_at",
   ascending = false
) => {
   const { data, error } = await supabase
      .from("products")
      .select("*")
      .order(order_by, { ascending })
      .range((page - 1) * pageSize, page * pageSize - 1);

   if (error) throw new Error(error.message);
   return data;
};

export const toggleProductActive = async (id: string, is_active: boolean) => {
   const { error } = await supabase.from("products").update({ is_active }).eq("id", id);
   if (error) throw new Error(error.message);
};

export default supabase;
