import { createClient } from '@supabase/supabase-js';

// Define the database schema. This is a minimal definition based on usage in the app.
export interface Database {
  public: {
    Tables: {
      waitlist: {
        Row: {
          id: number;
        };
        Insert: {
          id: number;
        };
        Update: {
          id?: number;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

// These values are provided by the user and are safe to be exposed in a client-side application.
const supabaseUrl = 'https://ujircqusvnwzslaseehi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVqaXJjcXVzdm53enNsYXNlZWhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0OTgxNjEsImV4cCI6MjA2ODA3NDE2MX0.xNXBoXnq-K1HcictI2U0xzpkLKIZYM_jG5c6AKA9pYg';

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL and Key must be provided.");
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
