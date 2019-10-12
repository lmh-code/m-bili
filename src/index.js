import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import * as serviceWorker from './serviceWorker';
import App from './components/App';
import Login from './components/Login';

import {
  Router,
  Route,
  Switch
} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';
import history from './projectTools/history';

import request from './utils/request'
React.Component.prototype.$http = request;

ReactDOM.render(
  <Provider store={store}>
		<Router history={history}>
      <Switch>
        <Route exact path='/login' component={Login}/>
        <Route component={App}/>
      </Switch>
		</Router>
	</Provider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
