import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { BrowserRouter as Router } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

// reducer context imports :

import { StateProvider } from "./context/StateProvider";
import { appInitialState } from "./context/initialState";
import reducer from "./context/reducer";

console.log(appInitialState);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <StateProvider initialState={appInitialState} reducer={reducer}>
        <App />
      </StateProvider>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
