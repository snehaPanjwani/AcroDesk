import { useState, useRef } from "react";
import {addUserData} from './reduxconfig/UserSlice';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import webService from "./services/WebService"

export default function Login()
{

  const [msg,setMsg] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const emailRef = useRef();
  const passRef = useRef();

  const login = async (evt)=>{
    evt.preventDefault();
    const obj = {
      email : emailRef.current.value,
      password : passRef.current.value
    }
    const response = await webService.postCall(webService.URLS.LOGIN,obj)
    
    if(response.status)
    {
      dispatch(addUserData(response.data))
      evt.target.reset();
      navigate(`/${response.data.role}/home`)
    }
    setMsg(response.msg);
  }
    return <>
        <section className="page-heading">
            <div className="container">
            <div className="row">
                <div className="col-lg-12">
                <div className="header-text">
                    <h4>Sign-in User</h4>
                    <h1>User Login</h1>
                </div>
                </div>
            </div>
            </div>
        </section>

        <section className="contact-us">
        <div className="container">
          <div className="row">
            <form id="contact" onSubmit={login}>
            <div className="row">
              <div className="col-lg-12">
                <div className="section-heading">
                  <h6>Login Here</h6>                  
                </div>
              </div>
              <div className="col-lg-12">
                <fieldset>
                  <input type="email" ref={emailRef} placeholder="Email" required/>
                </fieldset>
              </div>
              <div className="col-lg-12">
                <fieldset>
                   <input type="password" ref={passRef} placeholder="Password" required/>
                </fieldset>
              </div>
             
              <div className="col-lg-12">
                <fieldset>
                  <b className="text-danger">{msg}</b>
                  &nbsp;
                  <button type="submit" id="form-submit" className="main-gradient-button">Login</button>
                </fieldset>
              </div>
            </div>
          </form>
          </div>
        </div>
        </section>
    </>
}