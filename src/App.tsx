import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {TonConnectUIProvider} from "@tonconnect/ui-react";

import {
  HomePage,
  CreateProfilePage,
  AddProfilePhotoPage,
  TellUsMorePage,
  SuggestionPage,
} from "./pages";

import "./App.css";

function App() {
  return (
      <TonConnectUIProvider manifestUrl="https://1616-185-135-84-36.ngrok-free.app/manifest.json">
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
      </TonConnectUIProvider>
  );
}

export default App;
