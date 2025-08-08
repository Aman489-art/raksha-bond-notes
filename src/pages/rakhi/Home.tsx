import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const RakhiHome = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleEnter = () => {
    const trimmed = username.trim();
    if (!trimmed) return;
    navigate(`/rakshabandhan_gift/letter/${encodeURIComponent(trimmed)}`);
  };

  return (
    <section className="min-h-[70vh] flex items-center justify-center">
      <Helmet>
        <title>Raksha Bandhan Gift - Home | amanmishra.com</title>
        <meta name="description" content="Enter your name to receive a heartfelt Raksha Bandhan letter." />
        <link rel="canonical" href="https://amanmishra.com/rakshabandhan_gift" />
      </Helmet>
      <div className="w-full max-w-md space-y-4">
        <h1 className="text-center text-3xl font-semibold text-foreground">Raksha Bandhan Gift</h1>
        <div className="space-y-3">
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your name"
            aria-label="Enter your name"
          />
          <Button
            variant="peach"
            onClick={handleEnter}
            className="w-full font-comic text-base"
          >
            Enter
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RakhiHome;
