import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader'
import configureStore from './config/store';
import App from './App/ConnectedApp'
import 'normalize.css/normalize.css'
import './App/_.scss'

const store = configureStore( window.__INITIAL_STATE__ );
const NODE_ENV = store.getState().environment.NODE_ENV;

render(
  <Provider store={ store }>
    <BrowserRouter>
		{ NODE_ENV === 'production' ?
			// don't include AppContainer component in production
			// used for hot-reloads in webpack
			<Route path="/" component={ App }/> :
			<AppContainer><Route path="/" component={ App }/></AppContainer>
		}
    </BrowserRouter>
  </Provider>,
  document.getElementById('App')
);
