import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { SWRConfig } from 'swr';

import "./index.css";
import App from "./Components/App";
import configureStore from './store';
import AppCtxProvider from './context';

const store = configureStore();

const swrConfig = {
  refreshInterval: 3000,
  fetcher: (args: any) => fetch(args).then((res: any) => res.json())
};

ReactDOM.render(
  <React.StrictMode>
    <SWRConfig value={swrConfig}>
      <AppCtxProvider>
        <Provider store={store}>
          <App/>
        </Provider>
      </AppCtxProvider>
    </SWRConfig>
  </React.StrictMode>,
  document.getElementById("root")
);
