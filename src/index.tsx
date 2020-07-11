import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { SWRConfig } from 'swr';

import "./index.css";
import App from "./Components/App";
import configureStore from './store';
import { SW_INIT, SW_UPDATE } from './store/types';
import * as serviceWorker from "./serviceWorker";
// import { askPermissionToRecieveNotifications } from "./services/firebase";

const store = configureStore();

const swrConfig = {
  refreshInterval: 3000,
  fetcher: (args: any) => fetch(args).then((res: any) => res.json())
};

ReactDOM.render(
  <React.StrictMode>
    <SWRConfig value={swrConfig}>
      <Provider store={store}>
        <App/>
      </Provider>
    </SWRConfig>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register({
  onSuccess: (registration) => {
    console.log('serviceWorker.onSuccess: ', registration);
    store.dispatch({ type: SW_INIT });
  },
  onUpdate: registration => {
    console.log('serviceWorker.onUpdate: ', registration);
    store.dispatch({ type: SW_UPDATE, payload: registration })
  },
});

// if (!localStorage.getItem("notification-token")) {
//   askPermissionToRecieveNotifications();
// }
// console.log('notification-token: ', localStorage.getItem('notification-token'));
