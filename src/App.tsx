import { BrowserRouter as Router } from "react-router-dom";
import { THEME, TonConnectUIProvider } from "@tonconnect/ui-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.css";
import { UserProfileProvider } from "./context/UserProfileContext";
import { UserProvider } from "./context/UserContext";
import AppRoutes from "./AppRoutes";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TonConnectUIProvider
        manifestUrl="https://33f7839febb6546c.ngrok.app/tonconnect-manifest.json"
        uiPreferences={{ theme: THEME.DARK }}
      >
        <UserProvider>
          <UserProfileProvider>
            <Router>
              <AppRoutes />
            </Router>
          </UserProfileProvider>
        </UserProvider>
      </TonConnectUIProvider>
    </QueryClientProvider>
  );
}

export default App;
