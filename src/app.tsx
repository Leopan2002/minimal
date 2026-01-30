import 'src/global.css';

import { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';

import { usePathname } from 'src/routes/hooks';

import { SettingsProvider } from 'src/contexts/settings-context';


// ----------------------------------------------------------------------

type AppProps = {
  children: React.ReactNode;
};

export default function App({ children }: AppProps) {
  useScrollToTop();

  return (
    <HelmetProvider>
      <SettingsProvider>
        {children}
      </SettingsProvider>
    </HelmetProvider>
  );
}

// ----------------------------------------------------------------------

function useScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
