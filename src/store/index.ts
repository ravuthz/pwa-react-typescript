import { createStore } from 'redux';

import rootReducer from './reducers';

const initialState = {
  serviceWorkerInitialized: false,
  serviceWorkerUpdated: false,
  serviceWorkerRegistration: null,
}

function configureStore() {
  return createStore(rootReducer, initialState);
}

export default configureStore;