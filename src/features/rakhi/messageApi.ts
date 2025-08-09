import { getSupabaseClient } from "@/lib/supabaseClient";
import { addMessage as addLocalMessage, getMessages as getLocalMessages, type UserMessage } from "@/features/rakhi/messageStore";
import { getClientId } from "@/features/rakhi/userStore";

// Table schema expected in Supabase (public.messages):
// id: uuid (primary key, default gen_random_uuid())
// username: text
// body: text
// author_id: text
// created_at: timestamptz (default now())

const TABLE = "messages";

export async function fetchMessages(): Promise<UserMessage[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return getLocalMessages();
  const { data, error } = await supabase
    .from(TABLE)
    .select("id, username, body, author_id, created_at")
    .order("created_at", { ascending: false });
  if (error || !data) {
    console.warn("Falling back to local messages:", error?.message);
    return getLocalMessages();
  }
  return data.map((row: any) => ({
    id: row.id,
    username: row.username ?? "",
    body: row.body ?? "",
    createdAt: row.created_at ?? new Date().toISOString(),
    authorId: row.author_id ?? undefined,
  }));
}

export async function createMessage(input: { username: string; body: string }): Promise<UserMessage> {
  const supabase = getSupabaseClient();
  const base: UserMessage = {
    id: crypto.randomUUID(),
    username: input.username,
    body: input.body,
    createdAt: new Date().toISOString(),
    authorId: getClientId(),
  };

  if (!supabase) {
    return addLocalMessage(input);
  }

  const { data, error } = await supabase
    .from(TABLE)
    .insert({
      id: base.id,
      username: base.username,
      body: base.body,
      author_id: base.authorId,
      created_at: base.createdAt,
    })
    .select()
    .single();

  if (error || !data) {
    console.error("Supabase insert failed, saving locally:", error?.message);
    return addLocalMessage(input);
  }

  return {
    id: data.id,
    username: data.username,
    body: data.body,
    createdAt: data.created_at,
    authorId: data.author_id,
  } satisfies UserMessage;
}
