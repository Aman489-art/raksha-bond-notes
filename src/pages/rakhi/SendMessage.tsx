import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { addMessage } from "@/features/rakhi/messageStore";
import { setSessionUsername } from "@/features/rakhi/userStore";

const RakhiSendMessage = () => {
  const { username } = useParams();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const safeName = (username ?? "").trim();

  const handleSend = () => {
    const body = message.trim();
    if (!safeName || !body) return;
    setSessionUsername(safeName);
    addMessage({ username: safeName, body });
    setMessage("");
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
        <Button variant="peach" onClick={handleSend} className="w-full font-comic text-base">
          Send Message
        </Button>
      </div>
    </section>
  );
};

export default RakhiSendMessage;
