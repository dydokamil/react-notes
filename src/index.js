import React from 'react';
import ReactDOM from 'react-dom';
import logger from 'redux-logger';
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';

import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import reducer from './reducers';
import saga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(logger, sagaMiddleware));

sagaMiddleware.run(saga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
