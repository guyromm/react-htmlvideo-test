import {createStore} from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const rootReducer = (s,n) => {
  let rt = (s===undefined?{}:s);
  if (['seekProgress',
       'loadProgress',
       'duration',
       'videoURL',
       'videoLoading',
       'errorGettingVideo',
      ].includes(n.type)) {
    rt[n.type]=n[n.type]
  }
  if (['videoURL','errorGettingVideo'].includes(n.type)) delete rt.videoLoading;
  return rt;

}

const store = createStore(rootReducer)
ReactDOM.render(
      <Provider store={store}>  
    <React.StrictMode>

       <App/>
    </React.StrictMode>
    </Provider>,
  
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
