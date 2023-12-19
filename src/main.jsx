import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import TanStackProvider from "./providers/TanStackProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TanStackProvider>
      <App />
    </TanStackProvider>
  </React.StrictMode>
);
