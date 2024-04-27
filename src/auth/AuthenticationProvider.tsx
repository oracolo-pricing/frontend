import { User } from "@supabase/supabase-js";
import React, { ReactNode, useEffect, useState } from "react";
import supabase from "repository/Supabase";

const AuthenticationContext = React.createContext<{
   user: null | any;
   signInWithPassword: (email: string, password: string) => Promise<any>;
   signOut: () => Promise<any>;
}>({
   user: null,
   signInWithPassword: async () => {},
   signOut: async () => {},
});

export const AuthenticationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
   const [user, setUser] = React.useState<User | null>(null);
   const [initialized, setInitialized] = useState(false);

   async function signInWithPassword(email: string, password: string) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      if (data?.user) setUser(data.user);
   }

   async function signOut() {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
   }

   async function getSession() {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      return data;
   }

   useEffect(() => {
      getSession().then((data) => {
         if (data?.session?.user) setUser(data.session?.user);
         setInitialized(true);
      });
   }, []);

   return (
      <AuthenticationContext.Provider
         value={{
            user,
            signInWithPassword,
            signOut,
         }}
      >
         {initialized && children}
      </AuthenticationContext.Provider>
   );
};

export const useAuthentication = () => React.useContext(AuthenticationContext);
