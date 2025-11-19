export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      ai_consumption_logs: {
        Row: {
          api_calls: number | null
          cost_usd: number | null
          created_at: string | null
          feature: string
          id: string
          metadata: Json | null
          operation_type: string
          tokens_used: number | null
        }
        Insert: {
          api_calls?: number | null
          cost_usd?: number | null
          created_at?: string | null
          feature: string
          id?: string
          metadata?: Json | null
          operation_type: string
          tokens_used?: number | null
        }
        Update: {
          api_calls?: number | null
          cost_usd?: number | null
          created_at?: string | null
          feature?: string
          id?: string
          metadata?: Json | null
          operation_type?: string
          tokens_used?: number | null
        }
        Relationships: []
      }
      inventory_forecast: {
        Row: {
          calculated_at: string | null
          confidence_level: string
          current_stock: number
          days_until_stockout: number | null
          forecast_date: string
          id: string
          predicted_demand: number
          product_code: string
          reorder_alert: boolean | null
          suggested_reorder_qty: number | null
        }
        Insert: {
          calculated_at?: string | null
          confidence_level: string
          current_stock: number
          days_until_stockout?: number | null
          forecast_date: string
          id?: string
          predicted_demand: number
          product_code: string
          reorder_alert?: boolean | null
          suggested_reorder_qty?: number | null
        }
        Update: {
          calculated_at?: string | null
          confidence_level?: string
          current_stock?: number
          days_until_stockout?: number | null
          forecast_date?: string
          id?: string
          predicted_demand?: number
          product_code?: string
          reorder_alert?: boolean | null
          suggested_reorder_qty?: number | null
        }
        Relationships: []
      }
      order_rate_limit: {
        Row: {
          attempt_count: number | null
          created_at: string | null
          id: string
          ip_address: string
          last_attempt_at: string | null
        }
        Insert: {
          attempt_count?: number | null
          created_at?: string | null
          id?: string
          ip_address: string
          last_attempt_at?: string | null
        }
        Update: {
          attempt_count?: number | null
          created_at?: string | null
          id?: string
          ip_address?: string
          last_attempt_at?: string | null
        }
        Relationships: []
      }
      orders: {
        Row: {
          created_at: string
          customer_district: string
          customer_lastname: string
          customer_name: string
          customer_phone: string
          id: string
          order_code: string
          product_code: string
          product_color: string
          product_name: string
          product_price: number
          recommended_by: string | null
          source: string | null
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          customer_district: string
          customer_lastname: string
          customer_name: string
          customer_phone: string
          id?: string
          order_code: string
          product_code: string
          product_color: string
          product_name: string
          product_price: number
          recommended_by?: string | null
          source?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          customer_district?: string
          customer_lastname?: string
          customer_name?: string
          customer_phone?: string
          id?: string
          order_code?: string
          product_code?: string
          product_color?: string
          product_name?: string
          product_price?: number
          recommended_by?: string | null
          source?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      product_similarity: {
        Row: {
          calculated_at: string | null
          id: string
          product_id_1: string
          product_id_2: string
          similarity_score: number
        }
        Insert: {
          calculated_at?: string | null
          id?: string
          product_id_1: string
          product_id_2: string
          similarity_score: number
        }
        Update: {
          calculated_at?: string | null
          id?: string
          product_id_1?: string
          product_id_2?: string
          similarity_score?: number
        }
        Relationships: []
      }
      products: {
        Row: {
          avg_days_to_restock: number | null
          cantidad_stock: number | null
          categoria: string
          created_at: string | null
          id: string
          imagen_url: string | null
          nombre_producto: string
          precio: number
          product_code: string
          total_recommendations: number | null
          total_vendido: number | null
          total_views: number | null
          updated_at: string | null
        }
        Insert: {
          avg_days_to_restock?: number | null
          cantidad_stock?: number | null
          categoria: string
          created_at?: string | null
          id?: string
          imagen_url?: string | null
          nombre_producto: string
          precio: number
          product_code: string
          total_recommendations?: number | null
          total_vendido?: number | null
          total_views?: number | null
          updated_at?: string | null
        }
        Update: {
          avg_days_to_restock?: number | null
          cantidad_stock?: number | null
          categoria?: string
          created_at?: string | null
          id?: string
          imagen_url?: string | null
          nombre_producto?: string
          precio?: number
          product_code?: string
          total_recommendations?: number | null
          total_vendido?: number | null
          total_views?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_interactions: {
        Row: {
          action: string
          created_at: string | null
          id: string
          product_code: string
          session_id: string
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          id?: string
          product_code: string
          session_id: string
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          id?: string
          product_code?: string
          session_id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_order_rate_limit: {
        Args: {
          client_ip: string
          max_attempts?: number
          window_hours?: number
        }
        Returns: boolean
      }
      generate_order_code: { Args: never; Returns: string }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
