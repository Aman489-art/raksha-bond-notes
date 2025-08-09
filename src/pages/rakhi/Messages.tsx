import { Helmet } from "react-helmet-async";
import { getMessages } from "@/features/rakhi/messageStore";
import { Card, CardContent } from "@/components/ui/card";
import { getClientId } from "@/features/rakhi/userStore";

const RakhiMessages = () => {
  const all = getMessages();
  const me = getClientId();
  const messages = [...all].sort((a, b) => {
    const aMine = a.authorId === me ? 0 : 1;
    const bMine = b.authorId === me ? 0 : 1;
    if (aMine !== bMine) return aMine - bMine;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <section className="py-6">
      <Helmet>
        <title>Messages | Raksha Bandhan Gift</title>
        <meta name="description" content="Messages sent by loved ones." />
        <link rel="canonical" href="https://amanmishra.com/rakshabandhan_gift/messages" />
      </Helmet>
      <h1 className="text-2xl font-semibold mb-4 text-foreground">Messages</h1>
      {messages.length === 0 ? (
        <p className="text-muted-foreground">No messages yet. Be the first to send a heartfelt note!</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {messages.map((m) => (
            <Card key={m.id} className="overflow-hidden border-0 shadow-sm">
              <div className="bg-gradient-to-br from-peach to-primary/10 p-4">
                <p className="text-sm font-medium">{m.username}</p>
              </div>
              <CardContent className="p-4">
                <p className="whitespace-pre-wrap break-words leading-relaxed">{m.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
};

export default RakhiMessages;
