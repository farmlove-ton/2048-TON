import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { HomePage, CreateProfilePage } from "./pages";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-profile" element={<CreateProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
