import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AppProvider } from "./store/ContextStore"; // Import the context provider
import App from "./App";
import './index.css'
ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <AppProvider>
          <App />
        </AppProvider>
      </BrowserRouter>
    </HelmetProvider>
  //</React.StrictMode>
);

