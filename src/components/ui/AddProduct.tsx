import { Button } from "@/components/ui/button";
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { addNewProduct } from "repository/Supabase";
import { z } from "zod";

const addProductFormSchema = z.object({
   name: z.string().min(3).max(255),
   barcode: z.string(),
   shortcut: z.string(),
});

export const AddProduct: React.FC<{ onSubmitted: () => void }> = ({ onSubmitted }) => {
   const [open, setOpen] = useState(false);
   const form = useForm<z.infer<typeof addProductFormSchema>>({
      resolver: zodResolver(addProductFormSchema),
   });

   const onSubmit = async (values: z.infer<typeof addProductFormSchema>) => {
      await addNewProduct({
         name: values.name,
         barcode: values.barcode,
         shorcut: values.shortcut,
      });
      onSubmitted();
      setOpen(false);
   };

   useEffect(() => {
      if (!open) form.reset();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [open]);

   return (
      <Sheet open={open} onOpenChange={(open) => setOpen(open)}>
         <Button autoFocus className="h-8 px-3" onClick={() => setOpen(true)}>
            <Plus className="mr-2 w-4" />
            Add
         </Button>
         <SheetContent onOpenAutoFocus={(e) => e.preventDefault()}>
            <SheetHeader className="text-left mb-8">
               <SheetTitle>Add New Product</SheetTitle>
            </SheetHeader>

            <Form {...form}>
               <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                     control={form.control}
                     name="name"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Title</FormLabel>
                           <FormControl>
                              <Input
                                 placeholder="Apple iPhone 15 Pro 128GB Natural Titanium"
                                 {...field}
                              />
                           </FormControl>
                           {/* <FormDescription>This is your public display name.</FormDescription> */}
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="barcode"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Barcode</FormLabel>
                           <FormControl>
                              <Input placeholder="MPN, EAN, UPC, ISBN, etc." {...field} />
                           </FormControl>
                           {/* <FormDescription>
                              You can insert multiple barcodes, by separating them with a comma.
                           </FormDescription> */}
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="shortcut"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Shorcut URL</FormLabel>
                           <FormControl>
                              <Input
                                 placeholder="https://www.trovaprezzi.it/prezzi-scheda-prodotto/"
                                 {...field}
                              />
                           </FormControl>
                           <FormDescription>
                              You can insert a custom URL associated with this barcode.
                           </FormDescription>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <Button type="submit">Add Product</Button>
               </form>
            </Form>
         </SheetContent>
      </Sheet>
   );
};
