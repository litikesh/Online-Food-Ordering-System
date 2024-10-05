import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import { BrowserRouter as Router } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./store";
import "./component/styles.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
    >
      <Router>
        <App />
      </Router>
    </SnackbarProvider>
  </Provider>
);
