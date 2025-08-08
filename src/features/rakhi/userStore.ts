export const CLIENT_ID_KEY = "rakhi-client-id";
const SESSION_USERNAME_KEY = "rakhi-username";

export function getClientId(): string {
  try {
    let id = localStorage.getItem(CLIENT_ID_KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(CLIENT_ID_KEY, id);
    }
    return id;
  } catch {
    // Fallback to a volatile ID if storage is unavailable
    return `volatile-${crypto.randomUUID()}`;
  }
}

export function getSessionUsername(): string {
  try {
    return sessionStorage.getItem(SESSION_USERNAME_KEY) ?? "";
  } catch {
    return "";
  }
}

export function setSessionUsername(name: string) {
  try {
    sessionStorage.setItem(SESSION_USERNAME_KEY, name);
  } catch {
    // ignore
  }
}
