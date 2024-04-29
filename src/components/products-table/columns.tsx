import { Switch } from "@/components/ui/switch";
import { ColumnDef } from "@tanstack/react-table";
import { Tables } from "types/supabase";

export const columns: ColumnDef<Tables<"products">>[] = [
   {
      accessorKey: "image_url",
      header: "Image",
      cell(props) {
         const imageUrl = props.row.original.image_url;
         return (
            <img
               width={48}
               className={`aspect-square object-contain border rounded-sm ${imageUrl ? "p-1" : ""}`}
               src={imageUrl ?? "https://placehold.co/48x48/f4f4f5/aaaaaa?text=x"}
               alt={props.row.original.name}
            />
         );
      },
   },
   {
      accessorKey: "name",
      header: "Name",
   },
   {
      accessorKey: "created_at",
      header: "Created",
      accessorFn: (row) => new Date(row.created_at).toLocaleString(),
   },
   {
      accessorKey: "is_active",
      header: "Active",
      cell(props) {
         return (
            <Switch
               onClick={(event) => {
                  event.stopPropagation();
                  props.table.options.meta?.toggleActive(props.row.original.id);
               }}
               checked={props.row.original.is_active ?? false}
            />
         );
      },
   },
];
