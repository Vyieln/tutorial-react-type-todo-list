import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://mkvhafglfupjrlvysrok.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rdmhhZmdsZnVwanJsdnlzcm9rIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODM1MTIyMTYsImV4cCI6MTk5OTA4ODIxNn0.Ho432mC1tpHMCzPZddTDOkRjxJxZes0i0U8OWeZCFzc";

export const supabase = createClient(supabaseUrl, supabaseKey);

export const currentUser = supabase.auth.getUser();
export const session = supabase.auth.getSession();
