import React from 'react';
import { useHistory } from "react-router-dom";
import logo from './mylogo.png';

import styled from 'styled-components';
const AdminNavbar = () => {
    const history = useHistory();
    const handleClick = (path) => {
        history.push(path);
    }


   
    return (
       <MainContainer>
  <nav class="navbar navbar-expand-lg navbar-dark bg-black">
 <img src={logo} alt="My logo"  style={{ height: 80, width: 80, borderColor: 'gray', borderWidth: 2,  marginBottom: 10 , marginleft:10} }/>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
    
  </button>
 
  <div class="collapse navbar-collapse" id="navbarSupportedContent">

    <ul class="navbar-nav mr-auto">
      
    <li onClick={() => handleClick("/users")} className="nav-item active">
                        <a className="nav-link" href="#">Home</a>
                    </li>
                    <li onClick={() => handleClick("/admin/employees/")} className="nav-item active">
                        <a className="nav-link" href="#">Emoployee</a>
                    </li>
                    <li onClick={() => handleClick("/admin/employees/CreateEmployee")} className="nav-item active">
                        <a className="nav-link" href="#">Create Employee</a>
                    </li>

                    <li onClick={() => handleClick("/admin/employees/")} className="nav-item active">
                        <a className="nav-link" href="#">Emoployee all</a>
                    </li>
                    <li onClick={() => handleClick("/admin/employees/")} className="nav-item active">
                        <a className="nav-link" href="#">Emoployee update</a>
                    </li>
    </ul>
  </div>

  <button type="button" class="butt" onClick={() => handleClick("/admin/employees/Login")}>Login</button>
   <button type="button" class="butt1" onClick={() => handleClick("/admin/employees/Signup")}>Sign up</button>
  
</nav>
</MainContainer>
    );
}

export default AdminNavbar;

const MainContainer = styled.header`
background: black;


.butt{
  display:inline-block;
  border:1px solid #fff;
  border-radius:67px;
  font-weight:400px;
  width:120px;
  height:40px;
  float:right;
  background:#3571f2;
  color:white;
  margin: 4px 4px;
}

.butt1{
  
  display:inline-block;
  border:1px solid #fff;
  border-radius:67px;
  font-weight:400px;
  width:120px;
  height:40px;
  float:right;
  background:#3571f2;
  color:white;
  margin: 4px 4px;
   
}
`;
