export const LETTER_MESSAGES: string[] = [
  "This Raksha Bandhan, I just want you to know that you are not only my sister but also my best friend. I am blessed to have you in my life. Happy Rakhi!",
  "Thank you for always standing by me, supporting me, and loving me unconditionally. Wishing you all the happiness in the world this Raksha Bandhan.",
  "Your love and care have shaped me into who I am today. On this Rakhi, I promise to always protect and cherish you.",
  "No matter how far we are, our bond will always remain strong. Wishing you a joyful and blessed Raksha Bandhan.",
  "You are the light of my life and the reason I smile. May our bond grow stronger with each passing day. Happy Rakhi!",
  "From childhood fights to grown-up laughs, we’ve shared it all. Here’s to more memories together. Happy Raksha Bandhan!",
  "You are my guide, my friend, and my partner in crime. I am lucky to have you in my life. Wishing you endless joy this Rakhi.",
  "Your smile means the world to me. On this Raksha Bandhan, I pray for your health, happiness, and success.",
  "Every Rakhi reminds me of the beautiful bond we share. Thank you for being you!",
  "No matter how much we tease each other, deep down, I will always be there to protect you. Happy Rakhi!",
  "Your love is my strength, and your happiness is my goal. Have a wonderful Raksha Bandhan!",
  "Life is better with you in it. This Rakhi, I send you my heartfelt love and blessings.",
  "You are my forever friend, my confidant, and my family. Wishing you all the love this Raksha Bandhan.",
  "The bond we share is unbreakable, and I promise to always stand by you. Happy Rakhi!",
  "Thank you for making my life brighter with your presence. May you always be happy and healthy.",
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
