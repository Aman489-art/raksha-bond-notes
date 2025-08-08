import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { UserMessage, getMyMessages, editMessage, deleteMessage } from "@/features/rakhi/messageStore";
import { getSessionUsername } from "@/features/rakhi/userStore";

const MyMessages = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<UserMessage[]>(() => getMyMessages());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const username = getSessionUsername();

  const startEdit = (m: UserMessage) => {
    setEditingId(m.id);
    setDraft(m.body);
  };

  const saveEdit = () => {
    const body = draft.trim();
    if (!editingId || !body) return;
    editMessage({ id: editingId, body });
    setMessages(getMyMessages());
    setEditingId(null);
  };

  const onDelete = (id: string) => {
    if (window.confirm("Delete this message? This action cannot be undone.")) {
      deleteMessage(id);
      setMessages(getMyMessages());
    }
  };

  const goToNewMessage = () => {
    if (username) {
      navigate(`/rakshabandhan_gift/send/${encodeURIComponent(username)}`);
    } else {
      navigate("/rakshabandhan_gift");
    }
  };

  return (
    <section className="py-6">
      <Helmet>
        <title>My Messages | Raksha Bandhan Gift</title>
        <meta name="description" content="View, edit, or delete your messages." />
        <link rel="canonical" href="https://amanmishra.com/rakshabandhan_gift/my-messages" />
      </Helmet>

      <h1 className="text-2xl font-semibold mb-4 text-foreground">My Messages</h1>

      {messages.length === 0 ? (
        <div className="space-y-4">
          <p className="text-muted-foreground">You haven’t sent any messages yet.</p>
          <Button variant="peach" className="font-comic text-base" onClick={goToNewMessage}>
            Leave a new message
          </Button>
        </div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            {messages.map((m) => (
              <Card key={m.id} className="overflow-hidden border-0 shadow-sm">
                <div className="flex items-center justify-between bg-gradient-to-br from-peach to-primary/10 p-4">
                  <p className="text-sm font-medium">{m.username}</p>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" aria-label="Message actions">
                        <MoreHorizontal className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => startEdit(m)}>Edit</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onDelete(m.id)} className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardContent className="p-4">
                  {editingId === m.id ? (
                    <div className="space-y-3">
                      <Textarea
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        rows={6}
                        className="w-full"
                        aria-label="Edit your message"
                      />
                      <div className="flex justify-end gap-2">
                        <Button variant="secondary" onClick={() => setEditingId(null)}>Cancel</Button>
                        <Button variant="peach" onClick={saveEdit} className="font-comic text-base">Save</Button>
                      </div>
                    </div>
                  ) : (
                    <p className="whitespace-pre-wrap break-words leading-relaxed">{m.body}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-6">
            <Button variant="peach" className="font-comic text-base" onClick={goToNewMessage}>
              Leave a new message
            </Button>
          </div>
        </>
      )}
    </section>
  );
};

export default MyMessages;
