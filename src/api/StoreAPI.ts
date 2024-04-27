import axios from "axios";
import { Tables } from "types/supabase";

export const axiosClient = axios.create({
   baseURL: process.env.REACT_APP_STORE_MANAGER_URL,
   headers: {
      "Content-Type": "application/json",
   },
});

export function _() {
   return axiosClient.get("/_");
}
