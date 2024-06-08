import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import {
  HomePage,
  CreateProfilePage,
  AddProfilePhotoPage,
  TellUsMorePage,
} from "./pages";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-profile" element={<CreateProfilePage />} />
        <Route path="/tell-us-more" element={<TellUsMorePage />} />
        <Route path="/add-photo" element={<AddProfilePhotoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
