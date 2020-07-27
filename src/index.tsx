import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';

import "./index.css";
import App from "./Components/App";
import configureStore from './store';
import AppCtxProvider from './context';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <AppCtxProvider>
      <Provider store={store}>
        <App/>
      </Provider>
    </AppCtxProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
