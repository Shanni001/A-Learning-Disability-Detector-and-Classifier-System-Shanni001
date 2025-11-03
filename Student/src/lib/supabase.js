//import { createClient } from '@supabase/supabase-js'

//const supabaseUrl = 'https://klqzoiracjgpafcqlxrb.supabase.co'
//const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtscXpvaXJhY2pncGFmY3FseHJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxNjQ2MjksImV4cCI6MjA3NDc0MDYyOX0.sy2vWrWG9dhsdMNvkYXrmnkXBxYnT1l6oz86gRMMbqQ'
//export const supabase = createClient(supabaseUrl, supabaseKey)




import { createClient } from '@supabase/supabase-js';

//const supabaseUrl = 'https://klqzoiracjgpafcqlxrb.supabase.co';
//const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtscXpvaXJhY2pncGFmY3FseHJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxNjQ2MjksImV4cCI6MjA3NDc0MDYyOX0.sy2vWrWG9dhsdMNvkYXrmnkXBxYnT1l6oz86gRMMbqQ';


const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseUrl, supabaseAnonKey);




//const supabaseKey = process.env.SUPABASE_KEY
