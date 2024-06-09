import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {THEME, TonConnectUIProvider} from "@tonconnect/ui-react";

import {
  HomePage,
  CreateProfilePage,
  AddProfilePhotoPage,
  TellUsMorePage,
  SuggestionPage,
} from "./pages";

import "./App.css";
import { UserProfileProvider } from "./context/UserProfileContext";

function App() {
  return (
      <TonConnectUIProvider
          manifestUrl="https://33f7839febb6546c.ngrok.app/tonconnect-manifest.json"
          uiPreferences={{theme: THEME.DARK}}
      >
    <UserProfileProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create-profile" element={<CreateProfilePage />} />
            <Route path="/tell-us-more" element={<TellUsMorePage />} />
            <Route path="/add-photo" element={<AddProfilePhotoPage />} />
            <Route path="/suggestion" element={<SuggestionPage />} />
            <Route path="/suggestion/profile" element={<SuggestionPage />} />
          </Routes>
        </Router>
    </UserProfileProvider>
      </TonConnectUIProvider>
  );
}

export default App;
