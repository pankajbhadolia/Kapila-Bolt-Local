import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ecqpnibayatkqdicbbsu.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVjcXBuaWJheWF0a3FkaWNiYnN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM5NzkwOTIsImV4cCI6MjA0OTU1NTA5Mn0.XaD5JktxNvrzvGnpa_gG7vWKDnJRRnIpZq4_EPiSrrk'

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})
