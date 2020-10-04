import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import './assets/styles/global.scss'
import { TaskManager } from './pages/TaskManager';

export class App extends Component {

  render() {

    return (
      <div className="App">

        <main className="app-main">
          <Switch>
            <Route component={TaskManager} path='/' />
          </Switch>
        </main>
      </div>
    )
  }
}


