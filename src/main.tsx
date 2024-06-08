import React from "react";
import ReactDOM from "react-dom/client";
import WebApp from "@twa-dev/sdk";

import App from "./App.tsx";
import "./index.css";

WebApp.ready();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
