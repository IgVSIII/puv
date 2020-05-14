import React from 'react';
import Registration from '../registration'
import Main from '../main'
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/puv/' component={Registration} />
        <Route path='/main' component={Main} />      
      </Switch>
    </div>
  );
}

export default App;
