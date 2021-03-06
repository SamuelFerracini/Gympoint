import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';
import SignIn from '../pages/SignIn';

import Students from '../pages/Students';
import StudentsRegister from '../pages/Students/Register';
import StudentsModify from '../pages/Students/Modify';

import Plans from '../pages/Plans';
import PlanRegister from '../pages/Plans/Register';
import PlanModify from '../pages/Plans/Modify';

import Enrolments from '../pages/Enrolments';
import EnrolmentRegister from '../pages/Enrolments/Register';
import EnrolmentModify from '../pages/Enrolments/Modify';

import HelpOrders from '../pages/HelpOrders';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/students" exact component={Students} isPrivate />
      <Route path="/students/register" component={StudentsRegister} isPrivate />
      <Route path="/students/:id" component={StudentsModify} isPrivate />

      <Route path="/plans" exact component={Plans} isPrivate />
      <Route path="/plans/register" component={PlanRegister} isPrivate />
      <Route path="/plans/:id" component={PlanModify} isPrivate />

      <Route path="/enrolments" exact component={Enrolments} isPrivate />
      <Route
        path="/enrolments/register"
        component={EnrolmentRegister}
        isPrivate
      />
      <Route path="/enrolments/:id" component={EnrolmentModify} isPrivate />

      <Route path="/help-orders" component={HelpOrders} isPrivate />
    </Switch>
  );
}
