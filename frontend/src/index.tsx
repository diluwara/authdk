import React from "react";

import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store } from "./store";
// import { initFullStory } from "utilities/full-story";
import "./index.scss";

//For dynamic config variables importing - making window variable typesafe to access env key
//we access window.env in runtime so to avoid typechecking, declaring key globally
declare global {
  interface EnvironmentVariable {
    REACT_APP_BASE_URL: string;
    REACT_APP_BASE_BFF_WEB_URL: string;
    APPLICATION_ID: string;
    ENABLE_FULL_STORY: boolean;
    FULLSTORY_ORG_ID: string;
  }

  interface Window {
    env: EnvironmentVariable;
  }
}

// window.env = {
//   REACT_APP_BASE_URL: process.env.REACT_APP_BASE_URL || "",
//   REACT_APP_BASE_BFF_WEB_URL: process.env.REACT_APP_BASE_BFF_WEB_URL || "",
//   APPLICATION_ID: process.env.APPLICATION_ID || "",
//   ENABLE_FULL_STORY: process.env.REACT_APP_ENABLE_FULL_STORY === "true",
//   FULLSTORY_ORG_ID: process.env.REACT_APP_FULLSTORY_ORG_ID || "",
// };

// initFullStory();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
