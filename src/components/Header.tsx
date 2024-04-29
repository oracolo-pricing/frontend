import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sparkle } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyStore } from "repository/Supabase";
import { Tables } from "types/supabase";

export const Header: React.FC = () => {
   const [myStore, setMyStore] = useState<Tables<"stores"> | null>(null);
   const navigate = useNavigate();

   const fetch = async () => {
      const data = await getMyStore();
      setMyStore(data);
   };

   useEffect(() => {
      fetch();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <header className="px-4 py-2 border-b flex items-center justify-between sticky top-0 z-50 bg-white">
         <Button
            onClick={() => navigate("/positioning")}
            variant="ghost"
            className="py-0 px-0 hover:bg-transparent"
         >
            <div className="flex items-center gap-[2px]">
               <Sparkle className="w-5 stroke-primary" stroke="rgb(22, 163, 74)" />
               <span className="text-xl font-semibold tracking-tight text-primary mt-[-3px]">
                  oracolo
               </span>
            </div>
         </Button>
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
               <Button variant="ghost" className="py-0 px-0 rounded-full">
                  <Avatar>
                     {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                     <AvatarFallback>
                        {myStore?.name &&
                           myStore.name
                              .split(" ")
                              .map((word) => word[0].trim())
                              .join("")}
                     </AvatarFallback>
                  </Avatar>
               </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-2">
               <DropdownMenuLabel>{myStore?.name}</DropdownMenuLabel>
               <DropdownMenuSeparator />
               <DropdownMenuItem>Profile</DropdownMenuItem>
               <DropdownMenuItem>Billing</DropdownMenuItem>
               <DropdownMenuItem>Team</DropdownMenuItem>
               <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
         </DropdownMenu>
      </header>
   );
};
