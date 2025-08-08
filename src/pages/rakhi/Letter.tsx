import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { pickLetterForUsername } from "@/features/rakhi/letters";

const RakhiLetter = () => {
  const { username } = useParams();
  const navigate = useNavigate();

  const safeName = (username ?? "").trim();
  const letter = useMemo(() => pickLetterForUsername(safeName), [safeName]);

  const goToSend = () => {
    if (!safeName) {
      navigate("/rakshabandhan_gift");
      return;
    }
    navigate(`/rakshabandhan_gift/send/${encodeURIComponent(safeName)}`);
  };

  return (
    <section className="min-h-[70vh] flex items-center justify-center">
      <Helmet>
        <title>Letter for {safeName || "You"} | Raksha Bandhan Gift</title>
        <meta name="description" content={`A heartfelt Raksha Bandhan letter for ${safeName || 'you'}.`} />
        <link rel="canonical" href={`https://amanmishra.com/rakshabandhan_gift/letter/${encodeURIComponent(safeName || '')}`}/>
      </Helmet>
      <div className="w-full max-w-2xl space-y-4">
        <h1 className="sr-only">Raksha Bandhan Letter</h1>
        <Card className="rounded-lg">
          <CardContent className="p-6 space-y-4">
            <p className="text-lg leading-relaxed">
              <span className="font-medium">Hey my lovely sister {safeName || ""},</span>
            </p>
            <p className="text-base leading-relaxed whitespace-pre-wrap">{letter}</p>
          </CardContent>
        </Card>
        <Button variant="peach" onClick={goToSend} className="w-full font-comic text-base">
          Send Message
        </Button>
      </div>
    </section>
  );
};

export default RakhiLetter;
