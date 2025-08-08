export const LETTER_MESSAGES: string[] = [
  // TODO: Replace with real messages provided by you in the next prompt.
  "May this Raksha Bandhan bring endless joy, laughter, and the sweetest memories to cherish forever.",
];

function simpleHash(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

export function pickLetterForUsername(username: string): string {
  if (!LETTER_MESSAGES.length) return "With love and blessings on this beautiful day.";
  const index = simpleHash(username || "guest") % LETTER_MESSAGES.length;
  return LETTER_MESSAGES[index];
}
