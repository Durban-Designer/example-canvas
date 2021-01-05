// packages
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
// misc imports
import rootReducer from './reducers/rootReducer.js';
import { register } from './serviceWorker';
// pages
import App from './App.js';

const store = createStore(rootReducer);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

register();
