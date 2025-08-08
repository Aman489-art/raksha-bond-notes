import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import RakhiLayout from "./pages/rakhi/Layout";
import RakhiHome from "./pages/rakhi/Home";
import RakhiLetter from "./pages/rakhi/Letter";
import RakhiSendMessage from "./pages/rakhi/SendMessage";
import RakhiMessages from "./pages/rakhi/Messages";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/rakshabandhan_gift" element={<RakhiLayout />}>
              <Route index element={<RakhiHome />} />
              <Route path="letter/:username" element={<RakhiLetter />} />
              <Route path="send/:username" element={<RakhiSendMessage />} />
              <Route path="messages" element={<RakhiMessages />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
