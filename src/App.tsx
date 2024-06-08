import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { HomePage, CreateProfilePage } from "./pages";

import "./App.css";
import { AddProfilePhotos } from "./pages/AddProfilePhotos";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-profile" element={<CreateProfilePage />} />
        <Route path="/add-profile-photos" element={<AddProfilePhotos />} />
      </Routes>
    </Router>
  );
}

export default App;
