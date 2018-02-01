import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { applyMiddleware, Store, createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import { Switch, Route, Link } from "react-router-dom";
import { HashRouter } from 'react-router-dom'
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';
import * as asyncInitialState from 'redux-async-initial-state';
import testDriveApi from './test_drive/api/mockApi';
import Promise from "ts-promise";
import ManageTestDrive from './test_drive/components/ManageTestDrive';
import Home from './home/components/Home';
import rootReducer from './main/reducer';
import TestDriveContainer from './main/components/TestDriveContainer';
import logger from 'redux-logger';
import Prizes from './home/components/Prizes';
import Video from './home/components/Video';
import LeaderBoardContainer from './leader_board/components/LeaderBoardContainer';
import Profile from './profile/components/Profile';
import MyProfile from './profile/components/MyProfile';
import Services from './common/services/services';
import OnBoarding from './onboarding/components/OnBoarding';
const initialState = {};

// const loadStore = (currentState) => {
//   return new Promise(resolve => {
//     testDriveApi.getTestDrives().then((data) => {
//       resolve({
//         ...currentState,
//         testDriveState: {
//           ...currentState.testDriveState,
//           testDrives: data,
//           loading: false
//         }
//       });
//     });
//   });
// }

const store: Store<any> = createStore(rootReducer,
  compose(applyMiddleware(
    // asyncInitialState.middleware(loadStore),
    thunkMiddleware,
    promiseMiddleware(),
    logger
  )));

let user = Services.getUserProfileProperties();
let application;
if (user.eliteProfileID) {
  application = (<Provider store={store}>
    <HashRouter basename="/" >
      <div>
        <Switch>
          <Route exact path="/testdrive" component={ManageTestDrive} />
          <Route exact path="/testdrives" component={TestDriveContainer} />
          <Route exact path="/testdrive/:id" component={ManageTestDrive} />
          <Route exact path="/leaderboard" component={LeaderBoardContainer} />
          <Route exact path="/video" component={Video} />
          <Route exact path="/prizes" component={Prizes} />
          <Route exact path="/profile/:id" component={Profile} />
          <Route exact path="/myprofile" component={MyProfile} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </HashRouter>
  </Provider>)
} else {
  application = (<Provider store={store}>
    <HashRouter basename="/" >
      <div>
        <Switch>
          <Route exact path="/" component={OnBoarding} />
        </Switch>
      </div>
    </HashRouter>
  </Provider>)
}

ReactDOM.render(
  application,
  document.getElementById('app')
);