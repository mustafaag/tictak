import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from './components/Game';
import { createStore } from 'redux';
import rootReducer from './reducers/rootReducer';
import { Provider } from 'react-redux';

// ========================================
const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <Game />
  </Provider>
 ,
  document.getElementById('root')
);

