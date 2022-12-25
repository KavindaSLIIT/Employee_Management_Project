import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import AdminEmployeeManager from '../employees/AdminEmployeeManager';
import AdminPassword from './passwordgen'

const AdminContainer = () => {
    return (<React.Fragment>
      
        <div className="container">
            <Router>     
                <Switch>
                    <Route path="/admin/employees">
                        <AdminEmployeeManager />
                    </Route>
                    <Route exact path="/">
                    </Route>
                    <Route exact path="/admin">
                    </Route>
                    <Route exact path="/admin/passwordgen">
                    <AdminPassword/>
               </Route>
                </Switch>
            </Router>
        </div>
    </React.Fragment>);
}

export default AdminContainer;