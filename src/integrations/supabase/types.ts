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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      about_content: {
        Row: {
          created_at: string
          description: string
          id: string
          mission_text: string
          mission_text2: string
          mission_title: string
          tagline: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string
          id?: string
          mission_text?: string
          mission_text2?: string
          mission_title?: string
          tagline?: string
          title?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          mission_text?: string
          mission_text2?: string
          mission_title?: string
          tagline?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      about_sectors: {
        Row: {
          description: string
          icon: string
          id: string
          name: string
          sort_order: number
        }
        Insert: {
          description?: string
          icon?: string
          id?: string
          name: string
          sort_order?: number
        }
        Update: {
          description?: string
          icon?: string
          id?: string
          name?: string
          sort_order?: number
        }
        Relationships: []
      }
      about_values: {
        Row: {
          id: string
          sort_order: number
          text: string
          title: string
        }
        Insert: {
          id?: string
          sort_order?: number
          text?: string
          title: string
        }
        Update: {
          id?: string
          sort_order?: number
          text?: string
          title?: string
        }
        Relationships: []
      }
      articles: {
        Row: {
          banner_image: string
          banner_images: string[] | null
          category: string
          content: string
          created_at: string
          date: string
          excerpt: string
          id: string
          read_time: string
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          banner_image?: string
          banner_images?: string[] | null
          category?: string
          content?: string
          created_at?: string
          date?: string
          excerpt?: string
          id?: string
          read_time?: string
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          banner_image?: string
          banner_images?: string[] | null
          category?: string
          content?: string
          created_at?: string
          date?: string
          excerpt?: string
          id?: string
          read_time?: string
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      contact_content: {
        Row: {
          availability: string
          created_at: string
          description: string
          email: string
          id: string
          office: string
          tagline: string
          title: string
          updated_at: string
        }
        Insert: {
          availability?: string
          created_at?: string
          description?: string
          email?: string
          id?: string
          office?: string
          tagline?: string
          title?: string
          updated_at?: string
        }
        Update: {
          availability?: string
          created_at?: string
          description?: string
          email?: string
          id?: string
          office?: string
          tagline?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      footer_content: {
        Row: {
          copyright_text: string
          created_at: string
          id: string
          updated_at: string
        }
        Insert: {
          copyright_text?: string
          created_at?: string
          id?: string
          updated_at?: string
        }
        Update: {
          copyright_text?: string
          created_at?: string
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      footer_links: {
        Row: {
          id: string
          label: string
          sort_order: number
          url: string
        }
        Insert: {
          id?: string
          label?: string
          sort_order?: number
          url?: string
        }
        Update: {
          id?: string
          label?: string
          sort_order?: number
          url?: string
        }
        Relationships: []
      }
      hero_slides: {
        Row: {
          created_at: string
          id: string
          image: string
          label: string
          sort_order: number
        }
        Insert: {
          created_at?: string
          id?: string
          image: string
          label?: string
          sort_order?: number
        }
        Update: {
          created_at?: string
          id?: string
          image?: string
          label?: string
          sort_order?: number
        }
        Relationships: []
      }
      site_config: {
        Row: {
          created_at: string
          favicon: string
          id: string
          logo_image: string
          logo_text: string
          logo_type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          favicon?: string
          id?: string
          logo_image?: string
          logo_text?: string
          logo_type?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          favicon?: string
          id?: string
          logo_image?: string
          logo_text?: string
          logo_type?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
