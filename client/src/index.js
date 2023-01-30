import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

//redux
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import reducers from "./reducers";

const root = ReactDOM.createRoot(document.getElementById("root"));

const store = createStore(reducers, compose(applyMiddleware(thunk)));

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
