import { createClient } from "@supabase/supabase-js";

const API_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhqa3h1a3Bta2pjd3p4a2dmeHFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM0OTY3ODIsImV4cCI6MjA0OTA3Mjc4Mn0.hyR5yA18hKt5y7qGXBsRW0YQ-MOXneK5jrBC0aLtECg";

export const supabaseUrl = "https://hjkxukpmkjcwzxkgfxqm.supabase.co";
const supabaseKey = API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
