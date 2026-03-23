import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ccjqinopksbomvmxsiwm.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjanFpbm9wa3Nib212bXhzaXdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM2NDM0NzgsImV4cCI6MjA4OTIxOTQ3OH0.okzXwDMhMrlaZQztUvQoSVRKQXttL5Lp7NV1Slzv36M'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function getProfiles() {
  const { data, error } = await supabase
    .from('profiles')
    .select('email, role')
  
  if (error) {
    console.error(error)
    return
  }
  
  console.log(JSON.stringify(data, null, 2))
}

getProfiles()
