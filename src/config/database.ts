import { createClient } from '@supabase/supabase-js'
import type { Database } from '../integrations/supabase/types'

// Supabase connection configuration
const supabaseUrl = "https://xlximnzppcikepzzkfmy.supabase.co"
const supabaseKey = process.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhseGltbnpwcGNpa2VwenprZm15Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYxMTA1ODcsImV4cCI6MjA1MTY4NjU4N30.Lcib5UX-YGq1oaorQNwOGvuBYGsbUjdNljzG4vz7moI"

// Initialize Supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseKey)

// Helper function to test the connection
export const testConnection = async () => {
  try {
    const { data, error } = await supabase
      .from('todos')
      .select('count')
      .single()
    
    if (error) {
      console.error('Database connection error:', error.message)
      return false
    }
    
    console.log('Successfully connected to Supabase database')
    return true
  } catch (err) {
    console.error('Failed to connect to database:', err)
    return false
  }
}