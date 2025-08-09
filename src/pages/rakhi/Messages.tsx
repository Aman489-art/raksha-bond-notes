import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { fetchMessages } from "@/features/rakhi/messageApi";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getClientId } from "@/features/rakhi/userStore";

const RakhiMessages = () => {
  const me = getClientId();
  const { data, isLoading } = useQuery({ queryKey: ["messages"], queryFn: fetchMessages });
  const messages = (data ?? []).slice().sort((a, b) => {
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
      {isLoading ? (
        <p className="text-muted-foreground">Loading messages...</p>
      ) : messages.length === 0 ? (
        <p className="text-muted-foreground">No messages yet. Be the first to send a heartfelt note!</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {messages.map((m) => (
            <Card key={m.id} className="overflow-hidden border-0 shadow-sm">
              <div className="bg-gradient-to-br from-peach to-primary/10 p-4">
                <p className="text-sm font-medium flex items-center gap-2">
                  {m.username}
                  {m.authorId === me && <Badge variant="secondary" className="h-5 px-2">You</Badge>}
                </p>
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
