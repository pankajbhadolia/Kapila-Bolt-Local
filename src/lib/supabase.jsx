import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ecqpnibayatkqdicbbsu.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVjcXBuaWJheWF0a3FkaWNiYnN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM5NzkwOTIsImV4cCI6MjA0OTU1NTA5Mn0.XaD5JktxNvrzvGnpa_gG7vWKDnJRRnIpZq4_EPiSrrk'

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Helper functions
const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) throw error
    return user
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

const getUserProfile = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error getting user profile:', error)
    return null
  }
}

export { supabase, getCurrentUser, getUserProfile }
