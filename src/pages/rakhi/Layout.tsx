import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { MessageSquare, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";

const RakhiLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleToggleMessages = () => {
    if (location.pathname.endsWith("/messages")) {
      navigate(-1);
    } else {
      navigate("/rakshabandhan_gift/messages");
    }
  };

  const handleToggleMyMessages = () => {
    if (location.pathname.endsWith("/my-messages")) {
      navigate(-1);
    } else {
      navigate("/rakshabandhan_gift/my-messages");
    }
  };

  return (
    <div className="min-h-screen bg-peach">
      <Helmet>
        <title>Raksha Bandhan Gift | amanmishra.com</title>
        <meta name="description" content="Raksha Bandhan Gift experience with heartfelt letters and messages." />
        <link rel="canonical" href="https://amanmishra.com/rakshabandhan_gift" />
      </Helmet>

      <header className="container mx-auto px-4 py-4 flex items-center justify-end">
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full shadow-md hover:shadow-lg transition-shadow"
            aria-label={location.pathname.endsWith("/messages") ? "Close messages" : "View messages"}
            onClick={handleToggleMessages}
          >
            <MessageSquare className="h-5 w-5" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full shadow-md hover:shadow-lg transition-shadow"
            aria-label={location.pathname.endsWith("/my-messages") ? "Close my messages" : "Manage my messages"}
            onClick={handleToggleMyMessages}
          >
            <Pencil className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 pb-12">
        <Outlet />
      </main>
    </div>
  );
};

export default RakhiLayout;
