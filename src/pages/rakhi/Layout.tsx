import { Link, Outlet } from "react-router-dom";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";

const RakhiLayout = () => {
  return (
    <div className="min-h-screen bg-peach">
      <Helmet>
        <title>Raksha Bandhan Gift | amanmishra.com</title>
        <meta name="description" content="Raksha Bandhan Gift experience with heartfelt letters and messages." />
        <link rel="canonical" href="https://amanmishra.com/rakshabandhan_gift" />
      </Helmet>

      <header className="container mx-auto px-4 py-4 flex items-center justify-end">
        <Link to="/rakshabandhan_gift/messages" aria-label="View messages">
          <Button variant="secondary" size="icon" className="rounded-full shadow-md hover:shadow-lg transition-shadow">
            <MessageSquare className="h-5 w-5" />
          </Button>
        </Link>
      </header>

      <main className="container mx-auto px-4 pb-12">
        <Outlet />
      </main>
    </div>
  );
};

export default RakhiLayout;
