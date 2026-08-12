import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import Router from '@/Router';
import { Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

interface AppProps {
  /**
   * Route to render when there is no browser location — set by the
   * prerenderer. Undefined in the browser, where wouter reads window.location.
   */
  ssrPath?: string;
}

function App({ ssrPath }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter
          base={import.meta.env.BASE_URL.replace(/\/$/, '')}
          ssrPath={ssrPath}
        >
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
