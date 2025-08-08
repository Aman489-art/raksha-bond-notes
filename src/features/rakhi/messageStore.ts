export type UserMessage = {
  id: string;
  username: string;
  body: string;
  createdAt: string;
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

export function addMessage(input: { username: string; body: string }): UserMessage {
  const newMsg: UserMessage = {
    id: crypto.randomUUID(),
    username: input.username,
    body: input.body,
    createdAt: new Date().toISOString(),
  };
  const all = getMessages();
  const next = [newMsg, ...all];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return newMsg;
}
