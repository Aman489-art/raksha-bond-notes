import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createMessage } from "@/features/rakhi/messageApi";
import { setSessionUsername } from "@/features/rakhi/userStore";
import { toast } from "@/components/ui/use-toast";

const RakhiSendMessage = () => {
  const { username } = useParams();
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const safeName = (username ?? "").trim();

  const handleSend = async () => {
    const body = message.trim();
    if (!safeName || !body || submitting) return;
    try {
      setSubmitting(true);
      setSessionUsername(safeName);
      await createMessage({ username: safeName, body });
      setMessage("");
      toast({ title: "Message sent", description: "Your message is now visible to everyone." });
    } catch (e) {
      console.error(e);
      toast({ title: "Something went wrong", description: "Please try again.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
    navigate(`/rakshabandhan_gift/send/${encodeURIComponent(safeName)}`);
  };
  return (
    <section className="min-h-[70vh] flex items-center justify-center">
      <Helmet>
        <title>Send a Message | Raksha Bandhan Gift</title>
        <meta name="description" content="Write and send your heartfelt message." />
        <link rel="canonical" href={`https://amanmishra.com/rakshabandhan_gift/send/${encodeURIComponent(safeName || '')}`}/>
      </Helmet>
      <div className="w-full max-w-2xl space-y-4">
        <h1 className="sr-only">Write your message</h1>
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your message here..."
          rows={8}
          className="w-full"
          aria-label="Write your message"
        />
        <p className="text-sm text-muted-foreground">Your message will be visible to everyone.</p>
        <Button variant="peach" onClick={handleSend} disabled={!message.trim() || !safeName || submitting} className="w-full font-comic text-base">
          {submitting ? "Sending..." : "Send Message"}
        </Button>
      </div>
    </section>
  );
};

export default RakhiSendMessage;
