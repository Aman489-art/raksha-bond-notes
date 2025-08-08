export type UserMessage = {
  id: string;
  username: string;
  body: string;
  createdAt: string;
  authorId?: string; // owner identifier
};

const STORAGE_KEY = "rakhi-messages";

export function getMessages(): UserMessage[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as UserMessage[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

import { getClientId } from "@/features/rakhi/userStore";

export function addMessage(input: { username: string; body: string }): UserMessage {
  const newMsg: UserMessage = {
    id: crypto.randomUUID(),
    username: input.username,
    body: input.body,
    createdAt: new Date().toISOString(),
    authorId: getClientId(),
  };
  const all = getMessages();
  const next = [newMsg, ...all];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return newMsg;
}

export function getMyMessages(): UserMessage[] {
  const all = getMessages();
  const me = getClientId();
  return all.filter((m) => m.authorId === me);
}

export function editMessage(input: { id: string; body: string }): UserMessage | null {
  const all = getMessages();
  const me = getClientId();
  const idx = all.findIndex((m) => m.id === input.id);
  if (idx === -1) return null;
  const msg = all[idx];
  if (msg.authorId !== me) return null; // not owner
  const updated: UserMessage = { ...msg, body: input.body };
  const next = [...all];
  next[idx] = updated;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return updated;
}

export function deleteMessage(id: string): boolean {
  const all = getMessages();
  const me = getClientId();
  const idx = all.findIndex((m) => m.id === id);
  if (idx === -1) return false;
  if (all[idx].authorId !== me) return false; // not owner
  const next = [...all.slice(0, idx), ...all.slice(idx + 1)];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return true;
}
