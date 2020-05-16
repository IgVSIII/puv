import React from 'react';
import Registration from '../registration'
import Main from '../main'
import Photo from '../photos/photo'
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/puv/' component={Registration} />
        <Route path='/puv/main/' component={Main} />      
        <Route path='/puv/photo/:photoId' component={Photo} />  
      </Switch>
    </div>
  );
}

export default App;
