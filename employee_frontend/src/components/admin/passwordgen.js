import React, { useState } from "react";
import { PasswordService } from "../../services/PasswordService";
import './passwordgen.css';

let Passwodgen =()=>{
let [state,setState] =useState({
   generatedPassword :'',
   passwordLength :20,
   Symbol:false,
   number: false,
   lower:false,
   upper:false


});

let updateInput =(event)=>{
    

    setState({
        ...state,
        [event.target.name]:event.target.value

    })}
    let submit =(event)=>{
    event.preventDefault();
    //let randomLower =String.fromCharCode(Math.floor(Math.random()*26)+97);
    //console.log(randomLower)
    let passwordObj=PasswordService.getPasswordObj(state);
    //console.log(passwordObj);
    let thePassword = PasswordService.genaratePassword(passwordObj,state.passwordLength)
    console.log(thePassword);
    setState({...state,generatedPassword:thePassword})
        }
    let updateCheck =(event)=>{
    

        setState({
            ...state,
            [event.target.name]:event.target.checked
    
        })
};
    return(
        <React.Fragment>
          <h2>password Gen</h2>  
          <div className="container mt">
              <div className="row">
                  <div className="col-md-4">
                      <div className="card show-lg">
                          <div className="card-header bg-waring p-3">
                              <p className="h4">password Generator</p>
                          </div>
                          <div className="card-body bg-waring">
                              <form onSubmit={submit}>
                                  <div className="mb-2">
                                      <div className="input-group">
                                          <span className="input-group-text"> password</span>
                                           <input
                                           value={state.generatedPassword}
                                           onChange={updateInput}
                                           name='generatedPassword'
                                           type="text" className="form-control" placeholder="Generated Password"></input>
                                           <span className="input-group-text"><i className="fa fa-clipbord"/></span>
                                      </div>
                                      <div className="mb-2">
                                      <div className="input-group">
                                        
                                           <input 
                                           required={true}
                                            value={state.passwordLength}
                                            onChange={updateInput}
                                            name='passwordLength'
                                           type="number" className="form-control" placeholder="Password Length"></input>
                                           <span className="input-group-text">Password Length</span>
                                      </div>
                                      </div>
                                      <div className="mb-2">
                                      <div className="input-group">

                                           <span className="input-group-text bg-white">
                                           <input
                                           value={state.Symbol}
                                           name='symbol'
                                            onChange={updateCheck} 
                                            type="checkbox" className="form-check-input"></input>
                                           </span>

                                           <input type="text" disabled ={true}className="form-control" placeholder="Symbols"></input>
                                      </div>


                                      </div>

                                      <div className="mb-2">
                                      <div className="input-group">
                                        
                                          
                                           <span className="input-group-text bg-white">
                                           <input 
                                           
                                           value={state.number}
                                           name='number'
                                            onChange={updateCheck} type="checkbox" className="form-check-input"></input>
                                           </span>

                                           <input type="text" disabled ={true}className="form-control" placeholder="Number"></input>
                                      </div>
                                      </div>
                                      <div className="mb-2">
                                      <div className="input-group">
                                        
                                          
                                           <span className="input-group-text bg-white">
                                           <input 
                                           value={state.lower}
                                           name='lower'
                                            onChange={updateCheck} 
                                           type="checkbox" className="form-check-input"></input>
                                           </span>

                                           <input type="text" disabled ={true}className="form-control" placeholder="Lovercase Letters"></input>
                                      </div>
                                      </div>
                                      <div className="mb-2">
                                      <div className="input-group">
                                        
                                          
                                           <span className="input-group-text bg-white">
                                           <input 
                                           value={state.upper}
                                           name='upper'
                                            onChange={updateCheck} 
                                           type="checkbox" className="form-check-input"></input>
                                           </span>

                                           <input type="text" disabled ={true}className="form-control" placeholder="Uppercase Letters"></input>
                                      </div>
                                      </div>
                                      <div className="mb-2">
                                          <input type="submit" value="Generate" className="btn-outline-dark"/>
                                      </div>


                                  </div>
                              </form>
                          </div>
                      </div>
                  </div>
              </div>

          </div>
        </React.Fragment>
    )
};
export default Passwodgen;























