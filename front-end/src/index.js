import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import AuthProvider from './components/AuthProvider.js';



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <AuthProvider>
    <App />
  </AuthProvider>
  /* </React.StrictMode> */
);

<script src="https://unpkg.com/react-router-dom/umd/react-router-dom.min.js"></script>;
