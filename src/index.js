import React from "react";
import { HashRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import "macro-css";

ReactDOM.render(
  <React.StrictMode>
    <HashRouter >
      <App />
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
