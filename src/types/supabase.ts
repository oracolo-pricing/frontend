export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      barcodes: {
        Row: {
          barcode: string
          created_at: string
          product_id: string | null
        }
        Insert: {
          barcode: string
          created_at?: string
          product_id?: string | null
        }
        Update: {
          barcode?: string
          created_at?: string
          product_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_barcodes_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_barcodes_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "rankings"
            referencedColumns: ["product_id"]
          },
        ]
      }
      marketplaces: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      offers: {
        Row: {
          barcode: string
          created_at: string
          id: string
          is_available: boolean
          marketplace_id: string | null
          price: number
          shipping_price: number | null
          store_id: string
          title: string | null
          url: string
        }
        Insert: {
          barcode: string
          created_at?: string
          id?: string
          is_available: boolean
          marketplace_id?: string | null
          price: number
          shipping_price?: number | null
          store_id?: string
          title?: string | null
          url: string
        }
        Update: {
          barcode?: string
          created_at?: string
          id?: string
          is_available?: boolean
          marketplace_id?: string | null
          price?: number
          shipping_price?: number | null
          store_id?: string
          title?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_offers_barcode_fkey"
            columns: ["barcode"]
            isOneToOne: false
            referencedRelation: "barcodes"
            referencedColumns: ["barcode"]
          },
          {
            foreignKeyName: "public_offers_marketplace_id_fkey"
            columns: ["marketplace_id"]
            isOneToOne: false
            referencedRelation: "marketplaces"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_offers_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      offers_archive: {
        Row: {
          barcode: string
          created_at: string | null
          expired_at: string | null
          id: string
          is_available: boolean
          marketplace_id: string | null
          price: number
          shipping_price: number | null
          store_id: string
          title: string | null
          url: string
        }
        Insert: {
          barcode: string
          created_at?: string | null
          expired_at?: string | null
          id?: string
          is_available: boolean
          marketplace_id?: string | null
          price: number
          shipping_price?: number | null
          store_id?: string
          title?: string | null
          url: string
        }
        Update: {
          barcode?: string
          created_at?: string | null
          expired_at?: string | null
          id?: string
          is_available?: boolean
          marketplace_id?: string | null
          price?: number
          shipping_price?: number | null
          store_id?: string
          title?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_offers_archive_barcode_fkey"
            columns: ["barcode"]
            isOneToOne: false
            referencedRelation: "barcodes"
            referencedColumns: ["barcode"]
          },
          {
            foreignKeyName: "public_offers_archive_marketplace_id_fkey"
            columns: ["marketplace_id"]
            isOneToOne: false
            referencedRelation: "marketplaces"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_offers_archive_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          created_at: string
          id: string
          image_url: string | null
          is_active: boolean | null
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name?: string
        }
        Relationships: []
      }
      shortcuts: {
        Row: {
          barcode: string
          id: string
          marketplace_id: string
          updated_at: string
          url: string
        }
        Insert: {
          barcode: string
          id?: string
          marketplace_id?: string
          updated_at?: string
          url: string
        }
        Update: {
          barcode?: string
          id?: string
          marketplace_id?: string
          updated_at?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "shortcuts_barcode_fkey"
            columns: ["barcode"]
            isOneToOne: false
            referencedRelation: "barcodes"
            referencedColumns: ["barcode"]
          },
          {
            foreignKeyName: "shortcuts_marketplace_id_fkey"
            columns: ["marketplace_id"]
            isOneToOne: false
            referencedRelation: "marketplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      stores: {
        Row: {
          created_at: string
          id: string
          is_my_store: boolean | null
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_my_store?: boolean | null
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          is_my_store?: boolean | null
          name?: string
        }
        Relationships: []
      }
      tasks: {
        Row: {
          description: string | null
          done_count: number | null
          ended_at: string | null
          error_count: number | null
          id: string
          started_at: string
          title: string
          total_count: number
        }
        Insert: {
          description?: string | null
          done_count?: number | null
          ended_at?: string | null
          error_count?: number | null
          id?: string
          started_at?: string
          title: string
          total_count: number
        }
        Update: {
          description?: string | null
          done_count?: number | null
          ended_at?: string | null
          error_count?: number | null
          id?: string
          started_at?: string
          title?: string
          total_count?: number
        }
        Relationships: []
      }
    }
    Views: {
      counters: {
        Row: {
          best_offer_distance_ratio_average: number | null
          online_offer_count: number | null
          store_is_my_store: boolean | null
          store_name: string | null
          winning_offer_count: number | null
        }
        Relationships: []
      }
      rankings: {
        Row: {
          best_offer_distance_ratio: number | null
          best_offer_price: number | null
          best_offer_shipping_price: number | null
          marketplace_name: string | null
          offer_barcode: string | null
          offer_created_at: string | null
          offer_price: number | null
          offer_rank: number | null
          offer_shipping_price: number | null
          offer_total_price: number | null
          product_created_at: string | null
          product_id: string | null
          product_image_url: string | null
          product_name: string | null
          store_is_my_store: boolean | null
          store_name: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_offers_barcode_fkey"
            columns: ["offer_barcode"]
            isOneToOne: false
            referencedRelation: "barcodes"
            referencedColumns: ["barcode"]
          },
        ]
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
