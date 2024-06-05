import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fcvwgfvkkameiatiruuh.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjdndnZnZra2FtZWlhdGlydXVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc1MDI3OTcsImV4cCI6MjAzMzA3ODc5N30.zCNMH7RsoxHyAh7m8WpRyNSzZ5R2ZbLjnh4NLneOR1g'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})