import React from 'react';
import {
    Switch,
    Route,
} from "react-router-dom";

import AllemployeeContainer from '../employees/employee_views/user/AllForUser';

const  UserContainer= () => {
  
    return (<React.Fragment>
     
            <Switch>
                <Route path="/">
                    <AllemployeeContainer />
                </Route>    
            </Switch>
    </React.Fragment>);
}

export default UserContainer;