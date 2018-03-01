// @flow weak

/* eslint-disable no-process-env */
import React, {
  Component
}                               from 'react';
// import PropTypes                from 'prop-types';
// import {
//   // BrowserRouter as Router,
//   browserHistory,
//   HashRouter as Router,
//   Switch,
//   Route
// }                               from 'react-router-dom';

// import { Router, Route, browserHistory } from 'react-router';
import { BrowserRouter, Route } from 'react-router-dom';


import { Provider }             from 'react-redux';
// import { syncHistoryWithStore } from 'react-router-redux';
// import configureStore           from './redux/store/configureStore';
// import { createBrowserHistory } from 'history';
import thunk                    from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import  reducer                 from './redux/reducers';

import { createHashHistory } from 'history';

import { syncHistoryWithStore } from 'react-router-redux';


import Entry from './components/screens/SwitchEntryPoint';
import Doctor from './components/screens/DoctorScreen';
import Pharmacist from './components/screens/PharmacistScreen';
import IoT from './components/screens/IoTScreen';
// import Test from './components/TestComponent';


const store = createStore(
  reducer,
  applyMiddleware(thunk)
);


const history = createHashHistory()


class Root extends Component {
  render() {
    console.log('inside root');
    return (
      <Provider store={store}>
          <BrowserRouter>
            <div>
             <Route exact path='/' component={Entry} />
             <Route path='/pharmacist' component={Pharmacist} />
             <Route path='/doctor' component={Doctor} />
             <Route path='/iot' component={IoT} />
            </div>
         </BrowserRouter>
      </Provider>
    );
  }
}

export default Root;
