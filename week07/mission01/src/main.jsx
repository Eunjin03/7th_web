import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { LoginContext, LoginContextProvider } from "./context/useLogin.jsx";

createRoot(document.getElementById("root")).render(
  <LoginContextProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </LoginContextProvider>
);
