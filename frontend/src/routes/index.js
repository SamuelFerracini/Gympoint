import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import SignIn from '../pages/SignIn';
import Students from '../pages/Students';
import RegisterStudent from '../pages/RegisterStudent';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/students" exact component={Students} isPrivate />
      <Route path="/students/register" component={RegisterStudent} isPrivate />
    </Switch>
  );
}
