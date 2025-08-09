import { createClient, SupabaseClient } from "@supabase/supabase-js";

let cached: SupabaseClient | null = null;

function resolveConfig(): { url: string; anonKey: string } | null {
  const w = window as any;
  // Common places Lovable/Supabase integrations may expose keys
  const metaUrl = (document.querySelector('meta[name="supabase-url"]') as HTMLMetaElement | null)?.content;
  const metaKey = (document.querySelector('meta[name="supabase-anon-key"]') as HTMLMetaElement | null)?.content;

  const url = w.__SUPABASE_URL__ || w.SUPABASE_URL || w.VITE_SUPABASE_URL || metaUrl;
  const anonKey = w.__SUPABASE_ANON_KEY__ || w.SUPABASE_ANON_KEY || w.VITE_SUPABASE_ANON_KEY || metaKey;

  if (url && anonKey) return { url, anonKey };
  return null;
}

export function getSupabaseClient(): SupabaseClient | null {
  try {
    if (cached) return cached;
    const cfg = resolveConfig();
    if (!cfg) return null;
    cached = createClient(cfg.url, cfg.anonKey);
    return cached;
  } catch {
    return null;
  }
}

export function hasSupabase(): boolean {
  return !!getSupabaseClient();
}
