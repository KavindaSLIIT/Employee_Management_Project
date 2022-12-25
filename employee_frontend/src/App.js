import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import AdminContainer from './components/admin/AdminContainer';
import UserContainer from './components/users/UserContainer';
import Footer from './components/shared/footer/Footer';

import AllEmployeeForUser from './components/employees/employee_views/user/AllForUser';

import AdminNavbar from './components/shared/navigators/AdminNavbar';
function App() {

  return (
    <React.Fragment>
      <Router>
     
      <AdminNavbar />
        <Switch>
          <Route path="/admin">
            <AdminContainer />
          </Route>
          <Route exact path="/">
            <AllEmployeeForUser />
          </Route>
          <Route path="/users">
            <UserContainer/>
          </Route>
        </Switch>
        <Footer/>
      </Router>

    </React.Fragment>
    
  );
}

export default App;
